import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { user } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  constructor(private au:Auth,private auth:AuthService,private dataSrv:DataService , private formbuilder:FormBuilder,private toastr:ToastrService) { }

  addUser=this.formbuilder.group({
    role:["",Validators.required],
    email:["",Validators.required],
    pass:["",[Validators.required,Validators.minLength(6)]],
  })
  changeBoss=this.formbuilder.group({
    name:["",Validators.required],
  })
  // arrays & variables
  arr:user[]=[];
  keys:string[]=[];
  
  theDate :Date =new Date();
  sum:string="";

  showItem:user={ game: "" , timeFrom:"", timeTo:"", time:"", cost:"", date:"", T_ID:"", M_ID:"", Y_ID:"", Uid:"" }

  todayDate:string=new Date().toLocaleDateString();
  item_deleted_key:string="";
  basic_delete_btn:boolean=true;
  Deleted_btns:boolean=false;

  ngOnInit(): void {
    this.dataSrv.getRequests().subscribe(data =>{
      for (let key in data) {
        let element = data[key];
        this.arr.push(element)
      }
    })
    this.dataSrv.getBossName().subscribe(data =>{
      for (const key in data) {
        this.changeBoss.patchValue({
          name:data[key]
        })
      }
    })
  }

  get BossName(){
    return this.changeBoss.get("nsme")?.value!
  }

  specifyArray(type:string){
    this.arr=[];
    this.dataSrv.getRequests().subscribe(data =>{
      let temp=0;
      for (let key in data) {
        let element = data[key];
        if( type === "day" && element.date.split("/")[1] == this.theDate.getDate().toString()){
          this.arr.push(element)
          temp += Number(element.cost)
        }else if( type === "month" && element.date.split("/")[0] == (this.theDate.getMonth()+1).toString() && element.date.split("/")[2] == this.theDate.getFullYear().toString()){
          this.arr.push(element)
          temp += Number(element.cost)
        }else if( type === "year" && element.date.split("/")[2] == this.theDate.getFullYear().toString()){
          this.arr.push(element)
          temp += Number(element.cost)
        }
        this.sum=(temp).toFixed(2).toString()
      }
    })
  }

  submitUser(){
    this.checkUserValidation();
  }
  checkUserValidation(){
    if(this.addUser.invalid || this.addUser.get("role")?.value == "default" || this.addUser.get("role")?.value == ""){
      if(this.addUser.get("role")?.value=="default" || this.addUser.get("role")?.value == ""){
        this.toastr.error("invalid user")
      }else if( this.addUser.get("pass")?.value?.length! < 6 ){
        this.toastr.error("at least 6 letters","invalid pass")
      }else{
        this.toastr.error("invalid email")
      }
    }else{
        this.auth.setUser(this.addUser.value)
    }
  }

  // -------------set =>  adding user or change boss --------------
  showModalForm:boolean=true;
  setFormData(formType:string){
    if(formType=="addUser"){
      this.showModalForm=true;
    }else{
      this.showModalForm=false;
    }
  }
  submitBoss(){
    this.dataSrv.UpdateBossName(this.changeBoss.value);
    this.toastr.success("name updated successfully")
  }

  // show function
  show(item:user){
    this.showItem=item;
    this.dataSrv.getRequests().subscribe(data =>{
      for(let key in data){
        if(item.Uid === data[key].Uid && item.T_ID == data[key].T_ID && item.game==data[key].game)
        this.item_deleted_key=key;
      }
    })
    // control button in modal
    this.basic_delete_btn=true;
    this.Deleted_btns=false;
    if(item.date == this.todayDate){
      this.basic_delete_btn=false;
    }else{
      this.basic_delete_btn=true;
    }
  }
  show_Deleted_btns(){
    this.Deleted_btns=true;
  }
  deleteItem(){
      this.dataSrv.deleteItem(this.item_deleted_key)
      setTimeout(() => {
        location.reload()
      }, 1000);
  }

}
