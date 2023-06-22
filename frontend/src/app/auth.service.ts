import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  IsLoggedIn(){
    return sessionStorage.getItem('loggedIn');
  }
}
