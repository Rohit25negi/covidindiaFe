import { Component, OnInit } from '@angular/core';
import {CoviddataserviceService} from '../coviddataservice.service'

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  title = 'covidindiaFe';
  constructor(private _covidDataService: CoviddataserviceService){

  }

  getMonday(d) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
    return new Date(d.setDate(diff));
  }
   type = 'GeoChart';
   width = 550;
   height = 400;
   mapData = []
   options =  {
    region: 'IN', // Africa
    displayMode: 'regions',
  resolution: 'provinces',
  colorAxis: {colors: ['#FCE5D9', '#FF5800']},
  };

  lineData = []

  Loptions =  {  
    pointSize:5, 
    hAxis: {
       title: 'Date'
    },
    vAxis:{
       title: 'Count'
    },
    curveType: 'function',
    legend: { position: 'bottom' }
 };

  columnName = [
    {id: '0', label: 'Date', type: 'string'},
    {id: '1', label: 'Total Cases', type: 'number'},
    {id: '2', label: 'Recovered Cases', type: 'number'},
    {id: '3', label: 'Deaths', type: 'number'},
  ]
  draw_map(map_data){
    map_data.forEach(element => {
      this.mapData.push(
        [element.state_name=='Odisha'?'Orissa':element.state_name , element.confirmed_corona_cases -(element.recovered_corona_cases+element.deaths_corona_cases)]
      )
    });
  }

  getFormatedDate(d){
    var year = d.getFullYear()
    var month = (d.getMonth()+1).toString().padStart(2,'0')
    var date = (d.getDate()).toString().padStart(2,'0')

    return `${year}-${month}-${date}`
  }
  plotLineGraph(dailyData){
    
    dailyData.forEach(element => {
      this.lineData.push(
        [element.date,  element.total_corona_cases,element.recovered_corona_cases, element.deaths_corona_cases],
      )
    });
  }
  ngOnInit(){
    var today = new Date()
    this._covidDataService.getLatestData().subscribe(data => this.draw_map(data))
    
    this._covidDataService.getDailyTrend(this.getFormatedDate(this.getMonday(today)), this.getFormatedDate(today)).subscribe(data => this.plotLineGraph(data))

  


  }
  
}