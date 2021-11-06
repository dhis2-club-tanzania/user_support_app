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
   datastream : any 

  getmessages() {

        if (this.datastream){
          this.datastream.unsubscribe();
        }
   this.datastream = this.messages.getPrivateFeedback().subscribe((data: MessageConversation[]) => {
      console.log(data);
    
      // this.messageConversation = JSON.parse(JSON.stringify(data));

      this.messagedata = data;

      // setTimeout(()=>{ this.getmessages(),6000});
   
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

  

  getdatastoreobject(){
     return this.datastore.getdastoreobject().subscribe((data: any)=> {                     
         console.log(data)
         this.objectdata = data
      });
  }

  acceptorgunits(){
       
    const payload = [
      {
        "lastUpdated": "2017-05-22T15:21:48.515",
        "id": "Rp268JB6Ne4",
        "href": "https://play.dhis2.org/2.36.3/api/33/organisationUnits/Rp268JB6Ne4",
        "level": 4,
        "created": "2012-02-17T15:54:39.987",
        "name": "Adonkia CHP",
        "shortName": "Adonkia CHP",
        "code": "OU_651071",
        "leaf": true,
        "path": "/ImspTQPwCqd/at6UHUQatSo/qtr8GGlm4gg/Rp268JB6Ne4",
        "sharing": {
          "external": false,
          "users": {
            
          },
          "userGroups": {
            
          }
        },
        "displayFormName": "Adonkia CHP",
        "favorite": false,
        "dimensionItemType": "ORGANISATION_UNIT",
        "displayName": "Adonkia CHP",
        "displayShortName": "Adonkia CHP",
        "externalAccess": false,
        "periodOffset": 0,
        "openingDate": "2010-01-01T00:00:00.000",
        "dimensionItem": "Rp268JB6Ne4",
        "parent": {
          "id": "qtr8GGlm4gg"
        },
        "access": {
          "read": true,
          "update": true,
          "externalize": false,
          "delete": true,
          "write": true,
          "manage": true
        },
        "children": [
          
        ],
        "translations": [
          
        ],
        "organisationUnitGroups": [
          {
            "id": "f25dqv3Y7Z0"
          }
        ],
        "ancestors": [
          {
            "id": "ImspTQPwCqd"
          },
          {
            "id": "at6UHUQatSo"
          },
          {
            "id": "qtr8GGlm4gg"
          }
        ],
        "userGroupAccesses": [
          
        ],
        "attributeValues": [
          
        ],
        "users": [
          
        ],
        "userAccesses": [
          
        ],
        "dataSets": [
          {
            "id": "Y8gAn9DfAGU"
          },
          {
            "id": "pBOMPrpg1QX"
          },
          
         ],
        "legendSets": [
          
        ],
        "programs": [
          {
            "id": "q04UBOqq3rp"
          },
         
          {
            "id": "lxAQ7Zs9VYR"
          },
         
        ],
        "favorites": [
          
        ]
      }
    ]
  
    this.datsetsupdate.put('metadata.json',payload).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
      )

    
  }

}
