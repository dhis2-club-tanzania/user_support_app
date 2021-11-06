import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadserviceService {

  constructor(private upload :  NgxDhis2HttpClientService) {}



  postFile(fileToUpload: File) {

    return this.upload.post('')
}

  
}
