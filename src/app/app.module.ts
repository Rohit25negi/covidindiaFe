import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { TopViewComponent } from './top-view/top-view.component';
import { ChartsComponent } from './charts/charts.component';
import {CoviddataserviceService} from './coviddataservice.service'
import {HttpClientModule} from '@angular/common/http';
import { StatetableComponent } from './statetable/statetable.component'
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CountUpModule } from 'ngx-countup';
import { HeadersectionComponent } from './headersection/headersection.component';
import {NgApexchartsModule} from 'ng-apexcharts';
import { TabledirectiveDirective } from './tabledirective.directive';

@NgModule({
  declarations: [
    AppComponent,
    TopViewComponent,
    ChartsComponent,
    StatetableComponent,
    HeadersectionComponent,
    TabledirectiveDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GoogleChartsModule.forRoot('AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'),
    NgbModule,
    CountUpModule,
    NgApexchartsModule
  ],
  providers: [CoviddataserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
