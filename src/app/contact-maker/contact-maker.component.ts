import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { IContact } from '../Object/contact.model';

@Component({
  selector: 'app-contact-maker',
  templateUrl: './contact-maker.component.html',
  styleUrls: ['./contact-maker.component.css']
})
export class ContactMakerComponent implements OnInit {

  @Output() addEvent:EventEmitter<IContact> = new EventEmitter();
  @Output() editEvent:EventEmitter<IContact> = new EventEmitter();
  @Output() cancelEvent:EventEmitter<IContact> = new EventEmitter();
  @Input() public edit:boolean;
  @Input() public editData:IContact;

  constructor() { }


  ngOnInit(): void {
  }

  addContact(data){
    this.addEvent.emit(data);
  }

  cancelEdit(){
    this.cancelEvent.emit();
  }

  saveEdit(data){
    this.editEvent.emit(data);
  }

}
