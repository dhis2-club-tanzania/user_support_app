import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';

import { observable } from 'rxjs';
import { DatastoreService } from 'src/app/services/datastore.service';
import { DhisdataService } from 'src/app/services/dhisdata.service';
import { MessageserviceService } from 'src/app/services/messageservice.service';
import { OrganizationUnitsService } from 'src/app/services/organization-units.service';
import { makeID } from 'src/app/shared/helpers/make-id.helper';
import { MessageConversation } from 'src/app/shared/messageconversation';

@Component({
  selector: 'app-privatefeedback',
  templateUrl: './privatefeedback.component.html',
  styleUrls: ['./privatefeedback.component.css'],
})
export class PrivatefeedbackComponent implements OnInit {
  messageConversation: MessageConversation;
  displaymessage = false;
  textmessages = '';
  loadingprivate = false;
  sender = '';
  started = false;
 

  msg: any[] = [];
  count: number;
  step = 0;
  myForm: FormGroup;
  status: string;
  objectdata : any 

  setStep(index: number) {
    this.step = index;
  }

  gettext(event: Event) {
    this.displaymessage = true;

    return (this.textmessages = (<HTMLTextAreaElement>event.target).value);
  }

  messagedata: MessageConversation[];

  constructor(
    public messages: MessageserviceService,
    public fb: FormBuilder,
    private sendmessages: NgxDhis2HttpClientService,
    // public users: DhisdataService,
    public feedback :  NgxDhis2HttpClientService,  
    public datastore: DatastoreService,
    private datsetsupdate: NgxDhis2HttpClientService,
    private units : OrganizationUnitsService
    
  ) {}

  ngOnInit() {
    this.getmessages();

    this.reactiveForm();
    // this.getsender();
    this.rejectrequest("")

    this.getdatastoreobject()
  }
  getmessages() {


    return this.messages.getPrivateFeedback().subscribe((data: MessageConversation[]) => {
      console.log(data);
    
      // this.messageConversation = JSON.parse(JSON.stringify(data));

      this.messagedata = data;
      this.count = this.messagedata.length;

      this.count = this.count;
    });
  }

  reactiveForm() {
    this.myForm = this.fb.group({
      text: ['', [Validators.required]],
      subject: ['', [Validators.required]],
    });
  
  }

  submitForm() {
    const messagePayload = {
      subject: this.myForm.get('text').value,
      text: this.myForm.get('text').value,
      users: [
        {
          id: 'OYLGMiazHtW',
        },
        {
          id: 'N3PZBUlN8vq',
        },
      ],
      userGroups: [
        {
          id: 'ZoHNWQajIoe',
        },
      ],
      organisationUnits: [
        {
          id: 'DiszpKrYNg8',
        },
      ],
    };

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
    this.sendmessages
      .post('messageConversations/qXF4GmtZZrE', messagePayload)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );

    console.log(this.myForm.value);
  }

  public errorHandling = (control: string, error: string) => {
    return this.myForm.controls[control].hasError(error);
  };

  
 rejectrequest( messageid : number | string) {
      
     return this.messages.deletemessage(messageid)
   
  }

  acceptrequest(){

      const dataapproavalpayload = [
        
        {
          "info": {
            "id": "DiszpKrYNg8",
            "code": "OU_559",
            "name": "Ngelehun CHC",
            "shortName": "Ngelehun CHC",
            "parentName": "Badjia",
            "level": 4,
            "levelName": "Facility",
            "openingDate": "1970-01-01T00:00:00.000",
            "longitude": -11.4197,
            "latitude": 8.1039
          },
          "attributes": [
            {
              "id": "n2xYlNbsfko",
              "label": "NGO ID",
              "value": "GHE51"
            },
            {
              "id": "xqWyz9jNCA5",
              "label": "TZ code",
              "value": "NGE54"
            }
          ],
          "groupSets": [
            {
              "id": "Bpx0589u8y0",
              "label": "Facility Ownership",
              "value": "Public facilities"
            },
            {
              "id": "J5jldMd8OHv",
              "label": "Facility Type",
              "value": "CHC"
            }
          ],
          "dataItems": [
            {
              "id": "WUg3MYWQ7pt",
              "label": "Total Population",
              "value": 3503
            },
            {
              "id": "DTVRnCGamkV",
              "label": "Total population < 1 year",
              "value": 140
            },
            {
              "id": "vg6pdjObxsm",
              "label": "Population of women of child bearing age (WRA)",
              "value": 716
            },
            {
              "id": "Uvn6LCg7dVU",
              "label": "ANC 1 Coverage",
              "value": 368.2
            },
            {
              "id": "eTDtyyaSA7f",
              "label": "FIC <1y",
              "value": 291.4
            }
          ]
        }
      ]

      

      
    
    
  }

  getdatastoreobject(){
     return this.datastore.getdastoreobject().subscribe((data: any)=> {                     
         console.log(data)
         this.objectdata = data
      });
  }
}
