import { Component, OnInit } from '@angular/core';
import { IContact } from '../Object/contact.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  postUrl = 'https://my-json-server.typicode.com/hgkitagawa/Jserver/contact';
  //postUrl = 'http://localhost:3000/contact';

  contactList = Array<IContact>();
  editMainData:IContact;
  editOrigData:IContact;
  editting = false;

  created = false;
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.onGetPost();
  }

  getNewIdNumber(){
    var max=0;
    for(var i=0;i<this.contactList.length;i++){
      console.log(this.contactList[i].id>=max);
      if(this.contactList[i].id>=max){
        max=this.contactList[i].id+1;
      }
    }
    return max;
  }

  //CRUD
  onCreatePost(postData){
    //send http request
    var newContact = new IContact(0,postData.value['fullname'],postData.value['email'],postData.value['contact']);
    console.log(newContact);
    
    newContact.id = this.getNewIdNumber();


    return this.http.post(this.postUrl,newContact)
    .subscribe(responseData => {
      this.contactList.push(newContact);
      this.created=true;
      setTimeout(()=>{ this.created=false;},4000);
      postData.reset();
    })
  }

  onEditPost(postData){
    //send http request
    var newContact = new IContact(this.editMainData.id,postData.value['fullname'],postData.value['email'],postData.value['contact']);
    
    return this.http.patch(this.postUrl+"/"+newContact.id,newContact)
    .subscribe(responseData => {
      this.editting = false;
      this.editMainData = new IContact(0,"","","");
    })
  }

  editCard(data){
    this.editMainData = data;
    this.editOrigData = new IContact(this.editMainData.id,this.editMainData.name, this.editMainData.email, this.editMainData.contact);
    this.editting = true;
  }

  cancelEdit(){
    this.editMainData.name = this.editOrigData.name;
    this.editMainData.contact = this.editOrigData.contact;
    this.editMainData.email = this.editOrigData.email;
    this.editting=false;
  }

  onGetPost(){
    this.contactList = [];
    this.http.get(this.postUrl)
    .pipe(map(responseData => {
        return responseData;
    }))
    .subscribe(posts => {
      for(let i in posts){
        this.contactList.push(new IContact(posts[i]['id'],posts[i]['name'],posts[i]['email'],posts[i]['contact']));
      }
    });
  }

  deleteEvent(target){
    if(confirm("You are about to delete: "+target.name)){
      this.deleteContact(target.id).subscribe(()=>{ 
        for(var i=0;i<this.contactList.length;i++){
          if(target == this.contactList[i]){
            this.contactList.splice(i,1);
          }
        }
      })
    }
  }

  deleteContact(target){
    return this.http.delete(this.postUrl+"/"+target);
  }

}
