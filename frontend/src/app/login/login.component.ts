import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginStatus:string;
  login = new FormGroup({
    userName: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
  })
  get userName(){
    return this.login.get('userName');
  }
  get password(){
    return this.login.get('password');
  }

  constructor( private router: Router, private http: HttpClient) { }

  ngOnInit(){}

  onSubmit()
  {
      this.http.post("http://localhost:8080/api/user/login/"+this.login.value.userName+"/"+this.login.value.password).subscribe(data =>{
      console.log(data);
      this.loginStatus = data.result;
      console.log();
      if(data.result === "loggedIn"){
        sessionStorage.setItem('loggedIn', 'true');
        console.log("loggedIn");
         this.router.navigate(['/users']);
      }
    },error=>console.log(error));
  }

}
