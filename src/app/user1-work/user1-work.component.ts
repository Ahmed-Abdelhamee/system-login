import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../services/data.service';
import { user } from '../interfaces/user.interface';

@Component({
  selector: 'app-user1-work',
  templateUrl: './user1-work.component.html',
  styleUrls: ['./user1-work.component.scss']
})
export class User1WorkComponent implements OnInit {

  constructor(private formbuilder:FormBuilder, private toastr: ToastrService,private dataSrv:DataService) { }
  

  arr:any[]=[]
  date :Date=new Date;
  show:any;
  openModal:boolean=false;
  today:number=0;
  month:number=2;
  year:number=10;

  BossName:string="";

  gameData=this.formbuilder.group({
    game:["",Validators.required],
    timeFrom:["",Validators.required],
    timeTo:["",Validators.required],
    date:[this.date.toLocaleDateString()],
    time:[this.date.toLocaleTimeString()],
    cost:["",],
    T_ID:[""],
    M_ID:[""],
    Y_ID:[""],
    Uid:["user1"]
  })

  ngOnInit(): void {
    this.dataSrv.getRequests().subscribe(data =>{
      for (const key in data) {
        const element = data[key];
        this.arr.push(element)
      }
      this.today=this.arr.filter(ele => ele.date.split("/")[1] == (this.date.getDate()).toString() && ele.Uid=="user1"  ).length;
      this.month= this.arr.filter(ele => ele.date.split("/")[0] == (this.date.getMonth()+1).toString() && ele.Uid=="user1" && ele.date.split("/")[2] == (this.date.getFullYear()).toString() ).length;
      this.year= this.arr.filter(ele => ele.date.split("/")[2] == (this.date.getFullYear()).toString() && ele.Uid=="user1"  ).length;
    })   
  }
  
  get game(){
    return this.gameData.get("game")?.value
  }
  get timeFrom(){
    return this.gameData.get("timeFrom")?.value
  }
  get time(){
    return this.gameData.get("time")?.value
  }
  get timeTo(){
    return this.gameData.get("timeTo")?.value
  }
  get datee(){
    return this.gameData.get("date")?.value
  }
  get cost(){
    return this.gameData.get("cost")?.value
  }
  get T_ID(){
    return this.gameData.get("T_ID")?.value
  }
  get M_ID(){
    return this.gameData.get("M_ID")?.value
  } 
  get Y_ID(){
    return this.gameData.get("Y_ID")?.value
  } 

  submit(){
    this.checkValidation();
    this.dataSrv.getBossName().subscribe(data =>{
      for (const key in data) {
          this.BossName=data[key]
      }
    })
  }

  checkValidation(){
    if(this.gameData.invalid || this.game == "default" || this.game == ""){
      if(this.game=="default" || this.game == ""){
        this.toastr.error("ادخل اللعبة للعميل","invalid game")
      }else if( this.timeFrom =="" ){
        this.toastr.error("ادخل وقت بدء الحجز","invalid timeTo")
      }else if( this.timeTo  =="" ){
        this.toastr.warning("ادخل وقت نهاية الحجز","invalid time From")
      }
      this.openModal=false;
    }else{
      this.openModal=true;
      this.setCost();
      this.gameData.patchValue({
        T_ID:(++this.today ).toString(),
        M_ID:(++this.month ).toString(),
        Y_ID:(++this.year ).toString(),
      })
      this.dataSrv.sendUserOneRequest(this.gameData.value);
      this.arr.push(this.gameData.value)
    }
  }

  setCost(){
    let timeF=this.timeFrom?.split(":")!;
    let timeT=this.timeTo?.split(":")!;
      this.gameData.patchValue({
        cost: (( ( 
          (   (Number(timeT[0])>=Number(timeF[0])) ?   (Math.abs(Number(timeT[0]) - Number(timeF[0])))   :    ( Math.abs( 24 - Number(timeF[0]) + Number(timeT[0])) )   )  * 10 )  + Math.abs(( ( Number(timeT[1]) - Number(timeF[1]) ) / 60 ) * 10 ) ).toFixed(2) ).toString()
      })
      this.makeValidTime()
  }

  makeValidTime(){
    let setTimeFrom="", setTimeTo=""; 
    if(Number(this.timeFrom?.split(":")[0]) >= 12){
      setTimeFrom=(Number(this.timeFrom?.split(":")[0]) > 12) ? `${(Number(this.timeFrom?.split(":")[0])-12).toFixed() }:${(this.timeFrom?.split(":")[1])} PM  ` : `${this.timeFrom} PM  `
      }else{
        setTimeFrom=`${this.timeFrom} AM  `
      }
      if(Number(this.timeTo?.split(":")[0]) >= 12){
        setTimeTo=(Number(this.timeTo?.split(":")[0]) > 12) ? `${(Number(this.timeTo?.split(":")[0])-12).toFixed() }:${(this.timeTo?.split(":")[1])} PM  ` : `${this.timeTo} PM  `
      }else{
        setTimeTo=`${this.timeTo} AM  `
      }
      this.gameData.patchValue({
        timeFrom:setTimeFrom,
        timeTo:setTimeTo
      })
  }

  print(){
    window.print();
  }
}

