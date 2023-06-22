import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  id: string;
  user: any;

  constructor(private route: ActivatedRoute,private router: Router,private http: HttpClient) { }

  ngOnInit() {

    this.id = this.route.snapshot.params['id'];
    console.log("id:"+this.id);
      this.http.get("http://localhost:8080/api/singleuser/"+this.id).subscribe(data => {
        this.user = data.res[0];
        // console.log(data.res[0]);
      }, error => console.log(error));
  }

  updateUser() {
      this.http.put("http://localhost:8080/api/user/update/"+this.id,this.user).subscribe(data =>{
        console.log(data);
        this.gotoList();
      }, error => console.log(error));
  }

  onSubmit() {
    this.updateUser();    
  }

  gotoList() {
    this.router.navigate(['/users']);
  }
}