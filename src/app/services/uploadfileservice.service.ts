import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';

@Injectable({
  providedIn: 'root'
})
export class UploadfileserviceService {

  constructor( ) { }

  postFile(file : File){
    return this

  }
}
