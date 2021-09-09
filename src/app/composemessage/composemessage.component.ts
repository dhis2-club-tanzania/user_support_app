import { sequence } from '@angular/animations';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { dataElementGroupReducer } from '@iapps/ngx-dhis2-data-filter/lib/store/reducers/data-element-group.reducer';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { ClassifierService } from '../classifier.service';
import { NotificationComponent } from '../notification/notification.component';
import { DhisdataService } from '../services/dhisdata.service';
import { makeID } from '../shared/helpers/make-id.helper';

@Component({
  selector: 'app-composemessage',
  templateUrl: './composemessage.component.html',
  styleUrls: ['./composemessage.component.css']
})


export class ComposemessageComponent implements OnInit {

  @ViewChild('input') input
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
    private classifier:ClassifierService,
    

    private  _snackBar : MatSnackBar
  ) { 

  }


  ngOnInit() :void{
    this. reactiveForm()
    this.fetchUsers()
    this.geteventvalue(this.myForm.get('text').value)
    this.loadingModel();
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
    this.classifier.loadModel();

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
      "subject": this.myForm.get('subject').value,
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
   geteventvalue(event : any ){
    
    return console.log(event)
    

   }

   loadingModel(){
     const input = this.myForm.get('text').value;
     const word = this.classifier.word_preprocessor(input);
     const sequence = this.classifier.make_sequences(word);
     this.classifier.loadModel();


   }

}
