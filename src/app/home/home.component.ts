import { Component, OnInit } from '@angular/core';
import { FormBuilder , Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { auth } from '../interfaces/auth.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  users:auth[]=[]

  constructor(private formbuilder:FormBuilder, private toastr: ToastrService,private auth:AuthService,private route:Router) {
    this.auth.getUsers().subscribe(data => {
      for(let key in data){
        this.users.push(data[key])
      }
    })
  }

  login=this.formbuilder.group({
    email:["",Validators.required],
    pass:["",[Validators.required,Validators.minLength(6)]],
  })
  // ----------------------------- freeTrial code ; ---------------------------
  freeTrial:boolean=true;
  date=new Date();
  ngOnInit(): void {
    if(this.date.getFullYear() == 2023 && this.date.getMonth()+1 == 9 && this.date.getDate() == 7){
      this.freeTrial = false;
    }
  }

  get email(){
    return this.login.get("email")?.value
  }
  get pass(){
    return this.login.get("pass")?.value
  }

  submit(){
    this.checkValidation();
  }
  checkValidation(){
    if(this.login.invalid){
      if( this.pass?.length! < 6 ){
        this.toastr.error("at least 6 letters","invalid pass")
      }else{
        this.toastr.error("invalid email")
      }
    }else{
      let login = false ;
      for(let i of this.users){
        if(i.email==this.email && i.pass==this.pass){
          login=true;
          this.toastr.success("login successfully")
          sessionStorage.setItem("userRole",i.role)
          setTimeout(()=>{location.reload()},1000)
          setTimeout(() => { this.route.navigate([i.role])}, 800);
        }
      }
      if(!login) {
        this.toastr.error("Login Error")
      }
    }
  }

}
