import { Component, OnInit, ViewChildren, QueryList} from '@angular/core';

import {CoviddataserviceService} from '../coviddataservice.service'
import {StateCovid} from '../utils/state_covid_model'
import {TabledirectiveDirective, SortEvent} from '../tabledirective.directive';

@Component({
  selector: 'app-statetable',
  templateUrl: './statetable.component.html',
  styleUrls: ['./statetable.component.css']
})
export class StatetableComponent implements OnInit {

  constructor(private _covidData: CoviddataserviceService) { }
  stateCovidData: StateCovid[]
  @ViewChildren(TabledirectiveDirective) headers: QueryList<TabledirectiveDirective>;
  fillData(data){
    this.stateCovidData = data
    this.stateCovidData.sort(function(first, second) {
      return first['total_corona_cases']>second['total_corona_cases'] ? -1 : 1;
     });
   
     this.headers.forEach(header => {
      if (header.sortable == 'total_corona_cases') {
        header.direction = 'desc';
      }
    });
  }

  ngOnInit(): void {
    this._covidData.getLatestData().subscribe(data => this.fillData(data))
  }
  
  onSort({column, direction}: SortEvent){
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    
    console.log(column);
    console.log(direction);
    if((column != '' || column != undefined || column != null)&&direction!=''){
      
      this.stateCovidData.sort(function(first, second) {
        return first[column]>second[column] ? 1 : -1;
       });
      if(direction==='desc'){
        this.stateCovidData.reverse()
      }
    }
  }

}
