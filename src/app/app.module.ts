import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { HttpRequestService } from './service/http-request.service';
import { CustomMaterialModule } from './core/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { DxChartModule,  DxSelectBoxModule } from 'devextreme-angular';
import {FlexLayoutModule} from '@angular/flex-layout';
import 'hammerjs';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    HttpClientModule,
    BrowserModule, IonicModule.forRoot(),
    AppRoutingModule, BrowserAnimationsModule,
    Ng2GoogleChartsModule,
    DxChartModule,
    DxSelectBoxModule,
    FlexLayoutModule,
    IonicStorageModule.forRoot()],
  providers: [
    HttpRequestService,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
