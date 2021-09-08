import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganizationUnitsService {

  constructor( private organizationunits : NgxDhis2HttpClientService ) { }

  // endEpoint='https://play.dhis2.org/2.35.6/api/organisationUnits.json?fields=dataSets,id,name'


  getorganizationunits(){
       
    return this.organizationunits.get('organisationUnits.json?fields=dataSets,id,name')
       
  }
  getorganizationunitsdatasets(orgUnitID: Number | String){
       
    return this.organizationunits.get('organisationUnits/'+orgUnitID+'.json?fields=dataSets,id,name')
       
  }

 

  

  // getOrganisationUnit(orgUnitID: Number | String) {
  //   return this.organizationunits.get(`https://play.dhis2.org/2.36.3/api/organisationUnits/${orgUnitID}.json?fields=id,name,dataSets=[id,name,periodType]`)
  //     .subscribe((response: Response) => response.json())
      
  // }

  private handleError (error: Response) {
    return Observable.throw(error || "Server Error");
  }


}
