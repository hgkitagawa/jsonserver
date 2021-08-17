import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IContact } from '../Object/contact.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {
  postUrl = 'https://my-json-server.typicode.com/hgkitagawa/Jserver/contact';
  //postUrl = 'http://localhost:3000/contact';

  userID = 0;
  editing = false;

  userData:IContact = new IContact(0,"","","");
  originalData:IContact;

  constructor(private route:ActivatedRoute, private http:HttpClient, private router:Router) { }

  ngOnInit(): void {
    this.userID = this.route.snapshot.params['id'];
    this.onGetPost();
  }

  editMode(){
    this.editing = true;
  }

  returnToContactList(){
    this.router.navigate(['/']);
  }

  updateUser(){
    //send http request
    return this.http.patch(this.postUrl+"/"+this.userID,this.userData)
    .subscribe(responseData => {
      this.editing=false;
    })
  }

  cancelEdit(){
    this.userData.name = this.originalData.name;
    this.userData.email = this.originalData.email;
    this.userData.contact = this.originalData.contact;
    this.editing = false;
  }

  onGetPost(){
    this.http.get(this.postUrl+"/"+this.userID)
    .pipe(map(responseData => {
        return responseData;
    }))
    .subscribe(posts => {
        this.userData = new IContact(posts['id'],posts['name'],posts['email'],posts['contact']);
        this.originalData = new IContact(posts['id'],posts['name'],posts['email'],posts['contact']);
    });
  }

  removeContact(){
    if(confirm("You are about to delete: "+this.userData['name'])){
      this.deleteContact().subscribe(()=>{this.returnToContactList()});
    }
  }       

  deleteContact(){
    return this.http.delete(this.postUrl+"/"+this.userID);
  }
  

}
