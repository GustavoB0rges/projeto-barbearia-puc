import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn : 'root'
})
export class AuthService {

  private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn') || ('false'));

  setLoginStatus(value) {
    this.loggedInStatus = value;
    localStorage.setItem('loggedIn', 'true');
  }

  get LoginStatus() {
    return JSON.parse(localStorage.getItem('loggedIn') || 
    this.loggedInStatus.toString());
  }

  sinUpUser(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  logInUser(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }
}
