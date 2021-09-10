import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgxDhis2HttpClientModule } from '@iapps/ngx-dhis2-http-client';
import { NgxDhis2MenuModule } from '@iapps/ngx-dhis2-menu';
import { EffectsModule } from '@ngrx/effects';
import {
  RouterStateSerializer,
  StoreRouterConnectingModule, DefaultRouterStateSerializer
} from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {MatSidenavModule} from '@angular/material/sidenav';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { RoutingModule } from './app.routes';
import { RouterModule } from '@angular/router';
import { CoreModule, RouteSerializer } from './core';
import { effects } from './store/effects';
import { metaReducers, reducers } from './store/reducers';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { SharedModule } from './shared/shared.module';
import {MatDialogModule} from '@angular/material/dialog';

import { RequestformComponent } from './requestform/requestform.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BottomSheetOverviewExampleComponent } from './bottom-sheet-overview-example/bottom-sheet-overview-example.component';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';

import {MatTreeModule} from '@angular/material/tree';

import { NotificationComponent } from './notification/notification.component';
import { CreateuserComponent } from './createuser/createuser.component';
import { UserfeedbackComponent } from './userfeedback/userfeedback.component';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { WritefeedbackComponent } from './writefeedback/writefeedback.component';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';
import { SystemfeedbackComponent } from './userfeedback/systemfeedback/systemfeedback.component';
import { ValidatiofeebackComponent } from './userfeedback/validatiofeeback/validatiofeeback.component';
import { PrivatefeedbackComponent } from './userfeedback/privatefeedback/privatefeedback.component';
import { ComposemessageComponent } from './composemessage/composemessage.component';
import { DatasetComponent } from './dataset/dataset.component';
// import * as tf from '@tensorflow/tfjs';









// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}



@NgModule({
  declarations: [AppComponent, ResetpasswordComponent, RequestformComponent, BottomSheetOverviewExampleComponent, NotificationComponent, CreateuserComponent, UserfeedbackComponent, WritefeedbackComponent, SystemfeedbackComponent, ValidatiofeebackComponent, PrivatefeedbackComponent, ComposemessageComponent, DatasetComponent],
  imports: [
    MatPaginatorModule,
    FormsModule,
    MatToolbarModule,
    ReactiveFormsModule,                                                                                                                    
    MatBottomSheetModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatDialogModule,
    SharedModule,
    FlexLayoutModule ,
    BrowserModule,
    HttpClientModule,
    MatExpansionModule,
    RoutingModule,
    MatTreeModule,
    CoreModule,
    BrowserAnimationsModule,
    MatBadgeModule,
    RouterModule.forRoot([
      { path: '',
      
      
       redirectTo: '/privatefeedback',
      
       pathMatch: 'full' 
    
    },
      { path : 'reset' , 

      component: ResetpasswordComponent
    },
    { path : 'user' , 

    component: CreateuserComponent
  },
  { path : 'feedback' , 

  component: WritefeedbackComponent
},
    { path : 'form' , 
      
    component: RequestformComponent
  },
  { path : 'userfeedback' , 
      
  component: UserfeedbackComponent
},
{ path : 'privatefeedback' , 
      
component: PrivatefeedbackComponent
},
{ path : 'systemfeedback' , 
      
component: SystemfeedbackComponent
},
{ path : 'validationfeedback' , 
      
component: ValidatiofeebackComponent
},
 
    ]),
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(effects),
    NgxDhis2HttpClientModule.forRoot({
     
      version: 1,
      namespace: 'iapps',
      models: {
        organisationUnits: 'id,level',
        organisationUnitLevels: 'id,level',
        organisationUnitGroups: 'id'
      }
    }),
    /**
     * Menu  module
     */
    NgxDhis2MenuModule,

    /**
     * Translation module
     */
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),

    /**
     * @ngrx/router-store keeps router state up-to-date in the store
     */
    StoreRouterConnectingModule.forRoot({ serializer: DefaultRouterStateSerializer }),

    !environment.production ? StoreDevtoolsModule.instrument() : [],

    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    })
  ],
  providers: [{ provide: RouterStateSerializer, useClass: RouteSerializer}],
  bootstrap: [AppComponent]
})
export class AppModule {}
