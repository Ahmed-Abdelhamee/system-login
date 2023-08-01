import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LinksGuard implements CanActivate {
  canActivate( route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
    return ( sessionStorage.getItem("userRole") == "admin" ? true :false ); // we write a condition for access the link
  }
  
}
