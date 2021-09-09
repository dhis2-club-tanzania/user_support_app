import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { MessageConversation } from '../shared/messageconversation';
export interface User {
  subject : string
  text : string
}
@Injectable({
  providedIn: 'root'
})
export class MessageserviceService {

  messageconversation:  Observable<MessageConversation[]>

   

  
  user : String;


  constructor( public provider : HttpClient , private feedback :  NgxDhis2HttpClientService) { 

  

    
  }

  


getaFeedback(){
       
  return this.feedback.get('messageConversations.json?fields=*,assignee%5Bid%2C%20displayName%5D,messages%5B*%2Csender%5Bid%2CdisplayName%5D,attachments%5Bid%2C%20name%2C%20contentLength%5D%5D,userMessages%5Buser%5Bid%2C%20displayName%5D%5D&filter=messageType:eq:TICKET')
  .pipe(
    retry(1),
    catchError(this.httpError)
     )
 
}

getPrivateFeedback(): Observable<MessageConversation[]> {
       
  return this.feedback.get('messageConversations.json?fields=*,assignee%5Bid%2C%20displayName%5D,messages%5B*%2Csender%5Bid%2CdisplayName%5D,attachments%5Bid%2C%20name%2C%20contentLength%5D%5D,userMessages%5Buser%5Bid%2C%20displayName%5D%5D&filter=messageType:eq:PRIVATE')
  .pipe(
    retry(1),
    map((res) => res?.messageConversations),
    catchError(this.httpError)
     )
 
}

getSystemFeedback(){
       
  return this.feedback.get('messageConversations.json?fields=*,assignee%5Bid%2C%20displayName%5D,messages%5B*%2Csender%5Bid%2CdisplayName%5D,attachments%5Bid%2C%20name%2C%20contentLength%5D%5D,userMessages%5Buser%5Bid%2C%20displayName%5D%5D&filter=messageType:eq:SYSTEM')
  .pipe(
    retry(1),
    catchError(this.httpError)
     )
 
}
getValidationFeedback(){
       
  return this.feedback.get('messageConversations.json?fields=*,assignee%5Bid%2C%20displayName%5D,messages%5B*%2Csender%5Bid%2CdisplayName%5D,attachments%5Bid%2C%20name%2C%20contentLength%5D%5D,userMessages%5Buser%5Bid%2C%20displayName%5D%5D&filter=messageType:eq:VALIDATION_RESULT')
  .pipe(
    retry(1),
    catchError(this.httpError)
     )
 
}

deletemessage(messageid : number | string){
  return this.feedback.delete('messageConversations/'+messageid+'.json?fields=id')
} 

create(users) {
  this.feedback.post('users.json',this.user)
  .pipe(
    retry(1),
    catchError(this.httpError)
  )
} 


httpError(error) {
  let msg = '';
 if(error.error instanceof ErrorEvent) {
    // client side error
    msg = error.error.message;
  } else {       // server side error
   msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
}
  console.log(msg);
  return throwError(msg);
}


}
