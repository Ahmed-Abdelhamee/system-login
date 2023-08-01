import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  roleLink:any="";
  constructor(private route : Router) {
    
   }

  ngOnInit(): void {
      this.roleLink=(sessionStorage.getItem("userRole")) ? sessionStorage.getItem("userRole")?.toString() : ""
  }

  logOut(){
    this.route.navigate([""])
    localStorage.setItem("userRole","")
    sessionStorage.setItem("userRole","")
    setTimeout(()=>{location.reload()},200)

  }

}
