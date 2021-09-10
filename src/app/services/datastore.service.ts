import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';

@Injectable({
  providedIn: 'root'
})
export class DatastoreService {

  constructor(    private  datastorerequest : NgxDhis2HttpClientService) { 
   
  }


  getdastoreobject(){
   return this.datastorerequest.get('dataStore/UserSupportApp.json')
  }
}
