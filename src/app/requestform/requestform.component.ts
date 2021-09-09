import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { NotificationComponent } from '../notification/notification.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrganizationUnitsService } from '../services/organization-units.service';
import { DatasetService } from '../services/dataset.service';
import { makeID } from '../shared/helpers/make-id.helper';
import {SelectionModel} from '@angular/cdk/collections';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {BehaviorSubject, empty, observable} from 'rxjs'
import { UserGroupsService } from '../services/user-groups.service';
@Component({
  selector: 'app-requestform',
  templateUrl: './requestform.component.html',
  styleUrls: ['./requestform.component.css']
})



export class RequestformComponent implements OnInit {


  @ViewChild('orgunit') orgunit
    
  all : any  
  slectedorgunit = ""
  checked = true;
  isDataAvailable = false;
  selectedunits = ''
  dataset : string 
  selecterdataset = ''
  loadingunits =false 
  myForm: FormGroup;
  durationInSeconds = 2;
  selectedgroup: any;

  orgunits = { name :" ", id : "" , dataSets : []}
  dsets = {id : "",displayName: ""}
  onOrgUnitSelect: any;
  loading: boolean;
  showFilter: boolean;
  isOrganizationUnitSelected: boolean;
  assignedDataSets: any;

  initialdataset : any []
  finaldataset : any []
  selecteedorgunit: any;

  selecteddatasets  = ''

  constructor( public units : OrganizationUnitsService ,
     public fb: FormBuilder ,
     private alldatasets : DatasetService,
     private request : NgxDhis2HttpClientService,
     private _snackBar: MatSnackBar,
     private usergroups : UserGroupsService,
  
     
     ) { }

  ngOnInit(): void {
    this.getunits()
    this.getdatasets()
    this.reactiveForm()
    this.getuserGroups()
    this.getdatastore()
    this.loopsets()
   
    this.getorgunitsdatasets()
  }
  
  reactiveForm() {
    this.myForm =  this.fb.group({

    organizationunit: ['',[Validators.required]],
    datasetsunit: ['',[Validators.required]],
    selecteddatasets : ['',[Validators.required]]
    
  })
     
  }
      

  // getorgunitsdatasets(){

  //   return this.units.getorganizationunits().subscribe((data)=>{
  //     console.log(data)
  //     const all = data['organisationUnits']
  //   })

  // }




  getunits(){
    this.isDataAvailable = true

       return this.units.getorganizationunits().subscribe((data : {}) =>{

        this.isDataAvailable = true
         
      console.log(data)

       this.selectedunits = data ['organisationUnits']
      
       })

  }



  getorgunitsdatasets(){
    this.isDataAvailable = true

       return this.units.getorganizationunits().subscribe((data : {}) =>{

        this.isDataAvailable = true
      
      console.log(data)

       this.selectedunits = data ['organisationUnits']
      
       })

  }

  getdatasets() {
  
    return this.alldatasets.getAllDataSets().subscribe((data)=>{
      this.isDataAvailable = true
      this.dataset = data ['dataSets']

      console.log(data)

    })


  }


  getuserGroups(){

    return this.usergroups.getuserGroups().subscribe (( data : {})=>{
      console.log(data)

      this.selectedgroup = data ['userGroups']

     
    })

  }

  loopsets(){
    for (let index = 0; index < this.myForm.get('datasetsunit').value.length; index++) {
    
      console.log(this.myForm.get('datasetsunit').value)
      
    }
  }



  submitForm(){

    const requestPayload =  {
       "id": makeID(),
      "subject":"REQUEST FOR APROVAL CHANGE IN DATASET",
      "text": "There is request to update datasets to ," +this.myForm.get('organizationunit').value+"  add the following data " + this.myForm.get('datasetsunit').value +" and remove the following "+this.myForm.get('datasetsunit').value ,
      "userGroups": [
        {
          "id": "QYrzIjSfI8z"
        }
      ]
    }

   

    const requestobject = 

    {
      "action": "Add "+this.myForm.get('datasetsunit').value +" form from "+this.myForm.get('organizationunit').value,
      "method": "PUT",
       "id": requestPayload.id,
      "payload": {
      "organisationUnits": 
          {
            "id": this.myForm.get('organizationunit').value,
            "dataSets": [{
               "name" : this.myForm.get('datasetsunit').value  
            }]
          },
        
        "periodType": "Monthly"
      },
      "status": "OPEN",
      "url": "api/organisationUnits/"+ this.myForm.get('organizationunit').value,
    }
    
    // {
    
    // //   "Action":"REQUEST FOR APROVAL CHANGE IN DATASET",
    // //   "datasets_added": this.myForm.get('datasetsunit').value,
    // //   "datasets_removed":  this.myForm.get('datasetsunit').value,
    // //   "organizationunit": +this.myForm.get('organizationunit').value,
    // //   "userGroups": [
    // //     {
    // //       "id": "QYrzIjSfI8z"
    // //     }
    // //   ]
    // // }
    

    console.log(this.myForm)

    this.request.post('users.json',requestPayload).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )

    
    this.request.post('messageConversations?messageType=PRIVATE&messageConversationStatus=OPEN',requestPayload).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )
    this.request.post('dataStore/UserSupportApp/'+requestPayload.id+'.json',requestobject).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )

  }


  // selectorgunit(event){


  //   this.selectingorgunit  = event

  //   console.log(this.selectingorgunit)
    

    

  // }

  


  openSnackBar(){
    this._snackBar.openFromComponent(NotificationComponent, {
      duration: this.durationInSeconds * 1000,
    });

  }

  selectingorgunit(event : any ) {
           for (let index = 0; index < event.length; index++) {
          
            return this.units.getorganizationunitsdatasets(event).subscribe(data => {

              console.log(data)
              this.selecteddatasets = data 
            })
         }
     
    
  } 
getdatastore(){
  return this.request.get('dataStore.json').subscribe((data)=>{
    console.log(data)
  })
}


}

function forEach(arg0: (element: any) => void) {
  throw new Error('Function not implemented.');
}

