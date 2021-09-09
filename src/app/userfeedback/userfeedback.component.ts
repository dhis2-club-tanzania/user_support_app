import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { MessageserviceService } from '../services/messageservice.service';
import { makeID } from '../shared/helpers/make-id.helper';




@Component({
  selector: 'app-userfeedback',
  templateUrl: './userfeedback.component.html',
  styleUrls: ['./userfeedback.component.css']
})
export class UserfeedbackComponent implements OnInit {

  step = 0;
  count: number;

  setStep(index: number) {
    this.step = index;
  }

messagedata : any [  ] 
myForm: FormGroup;


  constructor( public messages : MessageserviceService , 
               public fb: FormBuilder,
               private sendmessages :  NgxDhis2HttpClientService
               ) { }

  ngOnInit(){
   this.getmessages()
   this.deletemessage()
    
  }


  getmessages(){

    return this.messages.getaFeedback().subscribe((data : {})=>{
        console.log(data)

        this.messagedata= data ['messageConversations']
        this.count = this.messagedata.length
       })
      }

    deletemessage(){

      return this.messages.deletemessage("").subscribe((data : {})=>{
        console.log(data)
           })

    }

   
}
