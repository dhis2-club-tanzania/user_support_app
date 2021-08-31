import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { dataElementGroupReducer } from '@iapps/ngx-dhis2-data-filter/lib/store/reducers/data-element-group.reducer';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { NotificationComponent } from '../notification/notification.component';
import { DhisdataService } from '../services/dhisdata.service';
import { makeID } from '../shared/helpers/make-id.helper';

@Component({
  selector: 'app-composemessage',
  templateUrl: './composemessage.component.html',
  styleUrls: ['./composemessage.component.css']
})
export class ComposemessageComponent implements OnInit {
  private = false;
  composefeedback = false
  myForm: FormGroup;
  durationInSeconds = 2;
  messages: any;

  receiver=""

  favoriteSeason: string;
 types: string[] = ['private', 'feedback'];
  user: '';

 

  constructor(
    public fb: FormBuilder,
    public users : DhisdataService,
    private httpClient: NgxDhis2HttpClientService,

    private  _snackBar : MatSnackBar
  ) { }

  ngOnInit() :void{
    this. reactiveForm()
    this.fetchUsers()
    // this.userget()
  }

   


  reactiveForm() {
    this.myForm =  this.fb.group({

       subject : ['',[Validators.required]],
       text : ['',[Validators.required]],
       user: ['',[Validators.required,]],
     

    })
        throw new Error('Method not implemented.');
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
   
    
      this.messages.post('messageConversitions.json', messagePayload).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      )
      this.messages.post('https://play.dhis2.org/2.36.3/api/36/messageConversations/qXF4GmtZZrE?internal=false', messagePayload).subscribe(
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
      //  userget(){
      //    return this.httpClient.get('users').subscribe((data)=>{
      //      console.warn(data)

      //    })
      //  }

  // fetchUsers() {
  //   return this.users.getUsers().subscribe((data: {}) => {
  //         console.log(data)
  //         // this.receiver = data ['users']
  //     })    
  // }

}
