import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { user } from '../interfaces/user.interface';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  user1:number=0;

  database:string=environment.firebase.databaseURL;

  constructor(private http:HttpClient,private toastr:ToastrService) { }

  getRequests():Observable<user[]>{
    return this.http.get<user[]>(`${this.database}/requests.json`)
  }

  getBossName():Observable<string[]>{
    return this.http.get<string[]>(`${this.database}/BossName.json`)
  }

  UpdateBossName(BossName:any){
    this.http.put(`${this.database}/BossName.json`,BossName).subscribe( ()=>{ location.reload()})
  }

  sendUserOneRequest(data:any){
    this.http.post(`${this.database}/requests.json`, data).subscribe()
  }
  
  sendUserTwoRequest(data:any){
    this.http.post(`${this.database}/requests.json`, data).subscribe()
  }

  deleteItem(key:string){
    this.http.delete(`${this.database}/requests/${key}.json`).subscribe();
    this.toastr.success("item Deleted successfully")
  }
   
}
