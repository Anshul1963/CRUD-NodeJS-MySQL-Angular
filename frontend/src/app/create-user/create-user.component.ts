import { User } from '../user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  user: User = new User();
  submitted = false;
  formData = new FormData();
  imageFile;

  addForm = new FormGroup({
    name: new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z]+$')]),
    email: new FormControl('',[Validators.required,Validators.email]),
    mobile: new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
    address: new FormControl('',[Validators.required]),
    state: new FormControl('',[Validators.required]),
    gender: new FormControl('',[Validators.required]),
    message: new FormControl('',[Validators.required]),
    newsletter: new FormControl(),
    image: new FormControl(),
  })

  get name(){
    return this.addForm.get('name');
  }
  get email(){
    return this.addForm.get('email');
  }
  get mobile(){
    return this.addForm.get('mobile');
  }
  get address(){
    return this.addForm.get('address');
  }
  get state(){
    return this.addForm.get('state');
  }
  get gender(){
    return this.addForm.get('gender');
  }
  get message(){
    return this.addForm.get('message');
  }
  get newsletter(){
    return this.addForm.get('newsletter');
  }

  uploadFile(event: any){
     this.imageFile = event.target.files ? event.target.files[0] : '';
    // console.log(this.imageFile);
  }

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() { }


  onSubmit(event : any) {
    event.preventDefault();
    this.formData = new FormData(event.target);
    this.formData.append('location', this.imageFile.name);
    
    console.log(this.formData.get('image'));
    // console.log(this.formData.get('location'));

    this.http.post("http://localhost:8080/api/user/add",this.formData).subscribe((resultData:any) => {
      console.log(resultData);
      this.gotoList();
    })
       
  }

  gotoList() {
    this.router.navigate(['/users']);
  }
}