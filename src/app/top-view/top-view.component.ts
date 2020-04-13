import { Component, OnInit, Input, NgZone } from '@angular/core';
import {CoviddataserviceService} from '../coviddataservice.service'

@Component({
  selector: 'app-top-view',
  templateUrl: './top-view.component.html',
  styleUrls: ['./top-view.component.css']
})
export class TopViewComponent implements OnInit {
  total_active:number=0;
  total_deaths:number=0;
  total_recovers:number=0;


  sum_data(state_wise_data){
    state_wise_data.forEach(element => {
      this.total_active += (element.confirmed_corona_cases-(element.recovered_corona_cases+element.deaths_corona_cases))
      this.total_deaths += element.deaths_corona_cases
      this.total_recovers += element.recovered_corona_cases
    });

    
  }
  constructor(private _covidService: CoviddataserviceService, private _ngZone: NgZone) {

   }

  ngOnInit(): void {
    
    this._covidService.getLatestData().subscribe(data=>this.sum_data(data))
    this._ngZone.run(() => {});

  }

}
