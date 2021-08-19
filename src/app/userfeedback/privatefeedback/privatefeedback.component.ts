import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { observable } from 'rxjs';
import { DhisdataService } from 'src/app/services/dhisdata.service';
import { MessageserviceService } from 'src/app/services/messageservice.service';
import { makeID } from 'src/app/shared/helpers/make-id.helper';

@Component({
  selector: 'app-privatefeedback',
  templateUrl: './privatefeedback.component.html',
  styleUrls: ['./privatefeedback.component.css']
})
export class PrivatefeedbackComponent implements OnInit {
  displaymessage= false
  textmessages = ""
  loadingprivate = false
  sender="";
  started=false
  
  msg: any [] = []
  count : number
  step = 0;
  myForm: FormGroup;

  setStep(index: number) {
    this.step = index;
  }
     
  gettext( event : Event){

    this.displaymessage = true

    return this.textmessages  = (<HTMLTextAreaElement>event.target).value;

    


  }

messagedata : any [  ]




  constructor( public messages : MessageserviceService,
               public fb: FormBuilder,
               private sendmessages :  NgxDhis2HttpClientService,
               public users : DhisdataService
              
    ) { }

  ngOnInit(){
   this.getmessages()

   this.reactiveForm()
   this.getsender()
   
  
    
  }
  getsender(){
  
   if (this.users.getUsers().subscribe((data)=>{
  
      console.log(data)

    this.sender = data['users']
   })) 
    this.loadingprivate = true
  }

  getmessages(){

    return this.messages.getPrivateFeedback().subscribe((data : {})=>{
        console.log(data)

        this.messagedata= data ['messageConversations']
          this.count = this.messagedata.length

        this.count = this.count

      })
      }




      reactiveForm() {
        this.myForm =  this.fb.group({
             text : ['',[Validators.required]],
            subject : ['',[Validators.required]],
             
           
           })
            throw new Error('Method not implemented.');
      }
  
      submitForm(){


        const messagePayload = 
           

          {
            "subject": this.myForm.get('text').value,
            "text":this.myForm.get('text').value,
            "users": [
              {
                "id": "OYLGMiazHtW"
              },
              {
                "id": "N3PZBUlN8vq"
              }
            ],
            "userGroups": [
              {
                "id": "ZoHNWQajIoe"
              }
            ],
            "organisationUnits": [
              {
                "id": "DiszpKrYNg8"
              }
            ]
          }


        
  
        // const messagePayload = {
        //     //  id: makeID(),
        //     //   "messageType": "PRIVATE",
        //     //   "subject": this.myForm.get('text').value,
        //     //   "user": {
        //     //     "displayName": this.messagedata.values,
        //     //     "name": "Didier Konan",
        //     //     "id": "I9fMsY4pRKk",
        //     //     "username": "konan"
        //     //   }
        //      "sender" : '',
        //     " from " : "",
        //     "text": this.myForm.get("text").value,
        //     "users": [],
        //     "userGroups": [
        //      {"id": "QYrzIjSfI8z"}
        //     ],
        //     "organisationUnits": [""],
        //     "status": "OPEN",
        //     "url": "api/messagesConversation"
    
        //   }
       
        
          // this.sendmessages.post('messageConversations.json', messagePayload).subscribe(
          //   (response) => console.log(response),
          //   (error) => console.log(error)
          // )
          this.sendmessages.post('messageConversations/qXF4GmtZZrE', messagePayload).subscribe(
            (response) => console.log(response),
            (error) => console.log(error) 
          )
      
        
          console.log(this.myForm.value)
      
         }
      
         public errorHandling = (control: string, error: string) => {
          return this.myForm.controls[control].hasError(error);
        }


        deletemessages(){


        //   const messagePayload = {
        //     id: makeID(),
        //     "sender" : this.getmessages(),
        //    " from " : "",
        //    "text": this.myForm.get("text").value,
        //    "users": [],
        //    "userGroups": [
        //     {"id": "QYrzIjSfI8z"}
        //    ],
        //    "organisationUnits": [""],
        //    "status": "OPEN",
        //    "url": "api/messagesConversation/" +this.messagedata
   
        //  }

        //   return this.sendmessages.delete('messageConversations' + messagePayload.id + '.json',).subscribe( 
        //   (response) => console.log(response),
        //   (error) => console.log(error)
        //   )
        // }
    
}






}
