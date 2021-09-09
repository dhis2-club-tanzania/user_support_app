import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { Fn } from '@iapps/function-analytics';
import { MatDialog } from '@angular/material/dialog';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { RequestformComponent } from './requestform/requestform.component';
import { DhisdataService } from './services/dhisdata.service';
import { DatasetService } from './services/dataset.service';
import { WritefeedbackComponent } from './writefeedback/writefeedback.component';
import { MessageserviceService } from './services/messageservice.service';
import { CreateuserComponent } from './createuser/createuser.component';
import { ComposemessageComponent } from './composemessage/composemessage.component';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  pcount : number
  vcount : number
  scount : number
  tcount : number
  messagedata : any [  ] 
  
  hiddenp = false;
  hidden=false;
  step = 0;

  setStep(index: number) {
    this.step = index;
  }


 

  toggleBadgeVisibility() {
    this.hiddenp = !this.hiddenp;
  }
  toggleBadgeVisibilityv() {
    this.hidden = !this.hidden;
  }

  panelOpenState = false;
  
  title = "dhis2"

  constructor(
    private translate: TranslateService,
    private titleService: Title,
    public dialog : MatDialog,
    public   user: DhisdataService ,
    public dataset : DatasetService,
    public messages : MessageserviceService,
    
   ) {

    // this.pdata.count = this.privatecount
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate.use('en');

    // Set application title
    this.setTitle('Seed application');

    if (Fn) {
      Fn.init({
        baseUrl: '../../../'
      });
    }
  }
  ngOnInit() {
    this.getmessagesprivate()
    this.getmessagesticket()
    this.getmessagessystem()
    this.getmessagesvalidation()
  }  
  getdataset(){
  }
  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
openDialog(){
   this.dialog.open(ResetpasswordComponent);
 }
 openfeedback(){
  this.dialog.open(WritefeedbackComponent);
}
 openuserForm(){
   this.dialog.open(RequestformComponent);
 }
 openuserDialog(){
  this.dialog.open(CreateuserComponent);
}
opencomposeDialog(){
  this.dialog.open(ComposemessageComponent);
}

getmessagesprivate(){

  return this.messages.getPrivateFeedback().subscribe((data : {})=>{
      console.log(data)

      this.messagedata= data ['messageConversations']

      this.pcount = this.messagedata.length

      this.pcount = this.pcount

    })
    }
    getmessagesvalidation(){

      return this.messages.getValidationFeedback().subscribe((data : {})=>{
          console.log(data)
    
          this.messagedata= data ['messageConversations']
    
          this.vcount = this.messagedata.length
    
          this.vcount = this.vcount
    
        })
        }
        getmessagessystem(){

          return this.messages.getSystemFeedback().subscribe((data : {})=>{
              console.log(data)
        
              this.messagedata= data ['messageConversations']
        
              this.scount = this.messagedata.length
        
              this.scount = this.scount
        
            })
            }
            getmessagesticket(){

              return this.messages.getaFeedback().subscribe((data : {})=>{
                  console.log(data)
            
                  this.messagedata= data ['messageConversations']
            
                  this.tcount = this.messagedata.length
            
                  this.tcount = this.tcount
            
                })
                }
           
      
  
}

