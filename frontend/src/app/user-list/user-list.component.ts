import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"]
})
export class UserListComponent implements OnInit {
  displayA:any="none";
  URL:any;

  users: any;
  pageNo :number = 1;
  totalPages: number;
  

  constructor(private http: HttpClient,private router: Router) { }

  ngOnInit() {
    this.reloadData();
  }
  
  large(url:any){
    this.displayA = "block";
    this.URL = url;
    console.log(url);
  }
  hide(){
    this.displayA = "none";
  }

  search = new FormGroup({
    searchBy: new FormControl('',[Validators.required]),
    searchInput: new FormControl(),
  })

  get searchBy(){
    return this.search.get('searchBy');
  }


  reloadData() {
    this.http.get("http://localhost:8080/api/user/"+this.pageNo).subscribe((resultData: any)=>{
      this.users = resultData.data;
    });
  }


 // SEARCH
  onSubmit(){
    console.log(this.search.value);  
    if(this.search.value.searchInput === ""){
      this.reloadData();
    }
    if(this.search.value.searchBy.length !== 0 && this.search.value.searchInput.length > 2){ 
      this.http.get("http://localhost:8080/api/user/"+this.search.value.searchBy+"/"+this.search.value.searchInput).subscribe((resultData:any)=>{
        console.log(resultData);
        this.users = resultData.data;
      })
    }
  }


 //PREVIOUS PAGE
  reloadDataPrev() {
    if(this.pageNo != 1){
      this.pageNo = this.pageNo - 1;
      this.http.get("http://localhost:8080/api/user/"+this.pageNo).subscribe((resultData:any)=>{
        this.totalPages = resultData.pages;
        this.users = resultData.data;
      }) 
    }
  }


 //NEXT PAGE
  reloadDataNext() {
    if(this.pageNo != this.totalPages){
      this.pageNo = this.pageNo + 1;
      this.http.get("http://localhost:8080/api/user/"+this.pageNo).subscribe((resultData:any)=>{
        this.totalPages = resultData.pages;
        this.users = resultData.data;
      })
    }  
  }


 // DELETE USER
  deleteUser(id: string) {
    const res = confirm("Are yot sure?");
    if(res === true){
      this.http.delete("http://localhost:8080/api/user/delete/"+id).subscribe( data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
    }
    else{
      return;
    }
  }


 // UPDATE USER
  updateUser(id: string){
    this.router.navigate(['update', id]);
  }


 // SORTING
  nameNextOrder = 'asc';
  emailNextOrder = 'asc';
  mobileNextOrder = 'asc';
  addressNextOrder = 'asc';
  stateNextOrder = 'asc';
  genderNextOrder = 'asc';
  messageNextOrder = 'asc';
  SortBy = '';
  sort(sortBy: string,order:string){
    this.http.post("http://localhost:8080/api/user/sorting/"+sortBy+"/"+order,'').subscribe((result:any) => {
      this.SortBy = sortBy;
      this.users = result.data;
      if(sortBy == 'name' && order == 'asc'){
        this.nameNextOrder = 'desc';
      }
      else{
        this.nameNextOrder = 'asc';
      }
      if(sortBy == 'email' && order == 'asc'){
        this.emailNextOrder = 'desc';
      }
      else{
        this.emailNextOrder = 'asc';
      }
      if(sortBy == 'mobile' && order == 'asc'){
        this.mobileNextOrder = 'desc';
      }
      else{
        this.mobileNextOrder = 'asc';
      }
      if(sortBy == 'address' && order == 'asc'){
        this.addressNextOrder = 'desc';
      }
      else{
        this.addressNextOrder = 'asc';
      }
      if(sortBy == 'state' && order == 'asc'){
        this.stateNextOrder = 'desc';
      }
      else{
        this.stateNextOrder = 'asc';
      }
      if(sortBy == 'gender' && order == 'asc'){
        this.genderNextOrder = 'desc';
      }
      else{
        this.genderNextOrder = 'asc';
      }
      if(sortBy == 'message' && order == 'asc'){
        this.messageNextOrder = 'desc';
      }
      else{
        this.messageNextOrder = 'asc';
      }
    })
  }
}

