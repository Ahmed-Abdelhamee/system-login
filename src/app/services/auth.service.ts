import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Auth , createUserWithEmailAndPassword} from '@angular/fire/auth';
import { Database} from '@angular/fire/database'; 
import { Router } from '@angular/router';
// import { sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { auth } from '../interfaces/auth.interface';
import { user } from '../interfaces/user.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient , private database:Database, private route:Router, private toastr:ToastrService) {
   } 


// -------------------  special static login for the system  -----------------
  users:auth[]=[]
  getUsers():Observable<auth[]>{
    return this.http.get<auth[]>(`${this.database.app.options.databaseURL}/users.json`);
  }
  setUser(user:any){
    let userExist=false , userkey=""; 
    this.getUsers().subscribe(data=>{
      for(let key in data){
        if( data[key].email ===user.email){
          userExist=true;
          userkey=key;
        }
      }
      if(!userExist){
        this.http.post(`${this.database.app.options.databaseURL}/users.json`,user).subscribe();
        this.toastr.success("add User successfully")
        setTimeout(() => {
          location.reload()
        }, 1000);
       
      }else{
        this.http.put(`${this.database.app.options.databaseURL}/users/${userkey}.json`,user).subscribe();
        this.toastr.warning("user updated ");
      }
     })
  }
  
//---------------------------------------------------------------------------

  /// settings for real login
  /*
  register(email:string, pass:any,data:any){
    createUserWithEmailAndPassword(this.auth,email,pass).then(log=>{
      this.toastr.success('sign up successfully !','welcome')
      this.login( email, pass ) 
    }).catch(err =>{
      this.toastr.error("compelete your data or contact us");
    })
  }

  login(email:string, pass:any){
    signInWithEmailAndPassword( this.auth,email ,pass).then((log)=>{
    }).catch(err =>{
    })
  }**/
}
