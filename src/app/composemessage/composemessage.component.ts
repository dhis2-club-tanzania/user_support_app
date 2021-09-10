import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { dataElementGroupReducer } from '@iapps/ngx-dhis2-data-filter/lib/store/reducers/data-element-group.reducer';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { NotificationComponent } from '../notification/notification.component';
import { DhisdataService } from '../services/dhisdata.service';
import { MessageserviceService } from '../services/messageservice.service';
import { OrganizationUnitsService } from '../services/organization-units.service';
import { UserGroupsService } from '../services/user-groups.service';
import { makeID } from '../shared/helpers/make-id.helper';

@Component({
  selector: 'app-composemessage',
  templateUrl: './composemessage.component.html',
  styleUrls: ['./composemessage.component.css']
})
export class ComposemessageComponent implements OnInit {

  @ViewChild ('text') text
  @ViewChild ('subject') subject


  private = false;
  composefeedback = false
  myForm: FormGroup;
  durationInSeconds = 2;


  receiver=""

  favoriteSeason: string;
 types: string[] = ['private', 'feedback'];
  user: '';
  unitsuser: any;

 

  constructor(
    public fb: FormBuilder,
    public users : DhisdataService,
    private httpClient: NgxDhis2HttpClientService,
    private userunits : OrganizationUnitsService,
    private usergroup : UserGroupsService,
    private messages : NgxDhis2HttpClientService,
    private  _snackBar : MatSnackBar
  ) { }

  ngOnInit() :void{
    this. reactiveForm()
    this.fetchUsers()
    this.getorgunits()
    this.getusergroup()
    // this.userget()
  }

   


  reactiveForm() {
    this.myForm =  this.fb.group({

       subject : ['',[Validators.required]],
       text : ['',[Validators.required]],
       user: ['',[Validators.required,]],
       feedtype : ['',[Validators.required]],
     

    })
       
  }

  submitForm(){

    // const messagePayload = {
    //   id: makeID(),
    //     " from " : "",
    //     "subject":  this.myForm.get("subject").value,
    //     "text": this.myForm.get("text").value,
    //     "users": [],
    //     "userGroups": [
    //      {"id": "QYrzIjSfI8z"}
    //     ],
    //     "organisationUnits": [""],
    //     "status": "OPEN",
    //     "url": "api/messagesConversation"

    //   }

    

    const messagePayload = {
      "id" : makeID(),
      "subject": this.myForm.get('subject').value,
      "text":this.myForm.get('text').value,
      "messageType" : this.myForm.get("feedtype").value,
      // "users": [
      //   {
      //     "id": "",
      //   },
      
      // ],
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
   
    
      // this.messages.post('users.json', messagePayload).subscribe(
      //   (response) => console.log(response),
      //   (error) => console.log(error)
      // )
      this.messages.post('messageConversations?messageType=PRIVATE&messageConversationStatus=OPEN', messagePayload).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      )
  
    
      console.log(this.myForm.value)
  
     }
  
     public errorHandling = (control: string, error: string) => {
      return this.myForm.controls[control].hasError(error);
    }

  openSnackBar(){
    this._snackBar.openFromComponent(NotificationComponent, {
      duration: this.durationInSeconds * 1000,
    });

  }

  fetchUsers() {
    return this.users.getUsers().subscribe((data: {}) => {
         
       console.log(data)

       this.user = data ['users']
      })    
  }
    getorgunits(){
      return this.userunits.getorganizationunits().subscribe((data) =>{
        console.log(data)

        this.unitsuser = data ;
      })
    }

    getusergroup(){
      return this.usergroup.getuserGroups().subscribe((data)=>{
        console.log(data)
      })
    }

    onpredictingrequesttextarea( event : any ){

      console.log(event)

    }
    onpredictingrequestsubject(event : any ){
      console.log(event)
    }

}
