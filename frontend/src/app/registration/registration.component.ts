import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  error:string;

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
  }

  registration = new FormGroup({
    email: new FormControl('',[Validators.required]),
    userName: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
  })

  get email(){
    return this.registration.get('email');
  }
  get userName(){
    return this.registration.get('userName');
  }
  get password(){
    return this.registration.get('password');
  }

  onSubmit(){
      this.http.post("http://localhost:8080/api/user/register/"+this.registration.value.email+"/"+this.registration.value.userName+"/"+this.registration.value.password).subscribe(data => {
        console.log(data);
        if(data.result === "Account Created"){
          this.router.navigate(['/login']);
        }
        else{
          this.error = "User Already Existed !";
        }
      },error=>console.log(error));
  }

}
