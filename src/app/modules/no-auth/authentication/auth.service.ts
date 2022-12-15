import { Injectable } from '@angular/core';

@Injectable({
  providedIn : 'root'
})
export class AuthService {

  private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn') || ('false'));

    loggedIn(){
    let hasToken = false;
    if (localStorage.getItem('token') == 'secretToken'){
      hasToken = true;
    }
    return hasToken;
  }

  getToken(){
    return localStorage.getItem('token');
  }
}
