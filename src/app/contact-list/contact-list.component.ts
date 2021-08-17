import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { IContact } from '../Object/contact.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  @Input() public list;
  @Output() eventDelete:EventEmitter<IContact> = new EventEmitter();
  @Output() eventEdit:EventEmitter<IContact> = new EventEmitter();
created = false;
timeOut;
contactList = Array<IContact>();

  ngOnInit(){
  }

  constructor(private http:HttpClient, private router:Router){}


  deleteContact(id){
    this.eventDelete.emit(id);
  }

  editContact(id){
    this.eventEdit.emit(id);
  }


}
