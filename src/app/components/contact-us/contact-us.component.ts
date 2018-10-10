import { Component, OnInit } from '@angular/core';
import {Contact} from '../../interfaces/contact'

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {


  contact=new Contact('','','','');

  constructor() { }
  alertVisible=false;
  ngOnInit() {
    
  }

  send(){
    this.alertVisible=true
    setTimeout(()=>this.alertVisible=false,5000)
  }
}
