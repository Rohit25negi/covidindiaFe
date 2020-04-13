import { Component, OnInit } from '@angular/core';

import {CoviddataserviceService} from '../coviddataservice.service'
import {StateCovid} from '../utils/state_covid_model'


@Component({
  selector: 'app-statetable',
  templateUrl: './statetable.component.html',
  styleUrls: ['./statetable.component.css']
})
export class StatetableComponent implements OnInit {

  constructor(private _covidData: CoviddataserviceService) { }
  stateCovidData: StateCovid[]

  fillData(data){
    this.stateCovidData = data
  }

  ngOnInit(): void {
    this._covidData.getLatestData().subscribe(data => this.fillData(data))
  }
  

}
