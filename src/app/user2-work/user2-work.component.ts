import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-user2-work',
  templateUrl: './user2-work.component.html',
  styleUrls: ['./user2-work.component.scss']
})
export class User2WorkComponent implements OnInit {

  constructor(private formbuilder:FormBuilder,private dataSrv:DataService) { }

  date:Date=new Date();
  arr:any[]=[];
  today:number=0;
  month:number=0;
  year:number=0;

  ngOnInit(): void {
    this.dataSrv.getRequests().subscribe(data =>{
      for (const key in data) {
        const element = data[key];
        this.arr.push(element)
      }
      this.today=this.arr.filter(ele => ele.date.split("/")[1] === (this.date.getDate()).toString() && ele.Uid=="user2" ).length;
      this.month= this.arr.filter(ele => ele.date.split("/")[0] === (this.date.getMonth()+1).toString() && ele.Uid=="user2" && ele.date.split("/")[2] == (this.date.getFullYear()).toString() ).length;
      this.year= this.arr.filter(ele => ele.date.split("/")[2] === (this.date.getFullYear()).toString() && ele.Uid=="user2" ).length;
    })
  }

  gameData=this.formbuilder.group({
    game:["",Validators.required],
    timeFrom:[""],
    timeTo:[""],
    cost:["",Validators.required],
    date:[this.date.toLocaleDateString()],
    time:[this.date.toLocaleTimeString()],
    T_ID:[""],
    M_ID:[""],
    Y_ID:[""],
    Uid:["user2"]
  })

  get game(){
    return this.gameData.get("game")?.value
  }
  get cost(){
    return this.gameData.get("cost")?.value
  }
  get datee(){
    return this.gameData.get("date")?.value
  }
  get time(){
    return this.gameData.get("time")?.value
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

  game1(){
    this.gameData.patchValue({
      game:'لعبة هوائية 10ج' ,
      cost: " 10 ",
      T_ID:(++this.today ).toString(),
      M_ID:(++this.month ).toString(),
      Y_ID:(++this.year ).toString(),
    })
    this.dataSrv.sendUserTwoRequest(this.gameData.value)
    this.arr.push(this.gameData.value)
  }
  
  game2(){
    this.gameData.patchValue({
      game:'لعبة هوائية 5ج' ,
      cost: " 5 ",
      T_ID:(++this.today ).toString(),
      M_ID:(++this.month ).toString(),
      Y_ID:(++this.year ).toString(),
    })
    this.dataSrv.sendUserTwoRequest(this.gameData.value)
    this.arr.push(this.gameData.value)
  }
  
  print(){
    window.print();
    location.reload()
  }

}
