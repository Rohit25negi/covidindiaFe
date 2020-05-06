import { Component, OnInit } from '@angular/core';
import {CoviddataserviceService} from '../coviddataservice.service'

import { element } from 'protractor';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};



declare var d3:any
declare var Datamap:any
@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {


  public chartOptions: Partial<ChartOptions>;

  title = 'covidindiaFe';
  constructor(private _covidDataService: CoviddataserviceService){
this.chartOptions = {
      series: [
      ],
      chart: {
        height: 400,
        type: "area"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      xaxis: {
        type: "datetime",
        categories: [

        ]
      },
      tooltip: {
        x: {
          format: "dd/MM/yy"
        }
      }
    };
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
  state_name_id_map = {
"Andaman and Nicobar Islands": "AN",
"Andhra Pradesh": "AP",
"Arunachal Pradesh": "AR",
"Assam": "AS",
"Bihar": "BR",
"Chhattisgarh": "CT",
"Puducherry": "PY",
"Punjab": "PB",
"Rajasthan": "RJ",
"Sikkim": "SK",
"Tamil Nadu": "TN",
"Chandigarh": "CH",
"Telengana": "TS",
"Tripura": "TR",
"Uttar Pradesh": "UP",
"Uttarakhand": "UK",
"West Bengal": "WB",
"Odisha": "OD",
"Dadara and Nagar Havelli": "DN",
"Daman and Diu": "DD",
"Goa": "GA",
"Gujarat": "GJ",
"Haryana": "HR",
"Himachal Pradesh": "HP",
"Jammu and Kashmir": "JK",
"Jharkhand": "JH",
"Karnataka": "KA",
"Kerala": "KL",
"Lakshadweep": "LD",
"Madhya Pradesh": "MP",
"Maharashtra": "MH",
"Manipur": "MN",
"Meghalaya": "ML",
"Mizoram": "MZ",
"Nagaland": "NL",
"Delhi": "DL",
  }
  columnName = [
    {id: '0', label: 'Date', type: 'string'},
    {id: '1', label: 'Total Cases', type: 'number'},
    {id: '2', label: 'Recovered Cases', type: 'number'},
    {id: '3', label: 'Deaths', type: 'number'},
  ]
  ffff = {}
  fill_keys = {}
  draw_map(map_data){

    var maximum = 0;

    map_data.forEach(element => {
      if(element.confirmed_corona_cases>maximum) {
        maximum = element.confirmed_corona_cases
      }
      this.mapData.push(
        [element.state_name , element.confirmed_corona_cases]
      )
    });

    var batchSize = Math.floor(maximum/6);
    

    this.ffff = {
      1: '#fff5f0',
      2:'#fdd5c3',
      3:'#fca487',
      4: '#fa7052',
      5: '#e8392c',
      6: '#bc171c',
      
    }
    var fillingColors = {defaultFill:'white'}
    let upperBound = batchSize, lowerBound=1
    for(let i=1; i<=5; i++){
      fillingColors[`${lowerBound} - ${upperBound}`] = this.ffff[i]
      this.fill_keys[i] = `${lowerBound} - ${upperBound}`
        lowerBound = upperBound+1
        upperBound +=batchSize
    }

    fillingColors[`${lowerBound}+`] = this.ffff[6]
    this.fill_keys[6] = `${lowerBound}+`
    
    var d3DataMaps = {}
    console.log(fillingColors)
    this.mapData.forEach(element => {
      let stateId = this.state_name_id_map[element[0]]
      var colorCode = Math.ceil(element[1]/batchSize);
      colorCode = colorCode > 6 ? 6: colorCode
      d3DataMaps[stateId] = {
        fillKey: this.fill_keys[colorCode],
        total_confirmed: element[1]
      }
    })
  

    console.log(d3DataMaps)
    var bubble_map = new Datamap({
      element: document.getElementById('india'),
      scope: 'india',
      responsive:true, 
      geographyConfig: {
        popupOnHover: true,
        highlightOnHover: true,
        borderColor: '#fa7052',
        borderWidth: 1,
        highlightBorderWidth: 2,
        highlightBorderOpacity:1,
        highlightFillColor: function(data) {
          if (data.fillKey) {
              return fillingColors[data.fillKey];
          }
          return '#FC8D59';
      },
        highlightBorderColor: '#bc171c',
        popupTemplate: function(geo, data) {
              
              var x = [
                '<div class="hoverinfo"><strong>',
                `Total ${data.total_confirmed} confirmed cases in ${data.geo} `,
                '</strong></div>'].join('')
  
  return x;
},
          dataUrl: 'https://rawgit.com/Anujarya300/bubble_maps/master/data/geography-data/india.topo.json'
          //dataJson: topoJsonData
      },
      fills: fillingColors,
      data: d3DataMaps,
      setProjection: function (element) {
          var projection = d3.geo.mercator()
              .center([96.9629, 10.5937]) // always in [East Latitude, North Longitude]
              .scale(element.clientWidth+300).translate([(element.clientWidth+300) / 2, (300+element.clientWidth) / 2]);
          var path = d3.geo.path().projection(projection);
          return { path: path, projection: projection };
      }
  });
  let bubbles = [
            

  ]
  
  Datamap.prototype.resize = function () {

    var self = this;
    var options = self.options;

    if (options.responsive) {
        var newsize = options.element.clientWidth,
            oldsize = d3.select(options.element).select('svg').attr('data-width');
        if(newsize<650)
            newsize += 100
        d3.select(options.element).select('svg').selectAll('g').attr('transform', 'scale(' + (newsize / oldsize) + ')');
    }
}
bubble_map.resize();
// d3.select(window).on('resize', function() {
//   bubble_map.resize();
// });

// Alternatively with jQuery

  }

  getFormatedDate(d){
    var year = d.getFullYear()
    var month = (d.getMonth()+1).toString().padStart(2,'0')
    var date = (d.getDate()).toString().padStart(2,'0')

    return `${year}-${month}-${date}`
  }
  plotLineGraph(dailyData){
    var categories =[],total_confirmed = [],total_death =[],total_recovered=[];

    dailyData.forEach(element => {
      categories.push(element.date),
      total_confirmed.push(element.total_corona_cases);
      total_death.push(element.deaths_corona_cases);
      total_recovered.push(element.recovered_corona_cases);

      this.lineData.push(
        [element.date,  element.total_corona_cases,element.recovered_corona_cases, element.deaths_corona_cases],
      )
    });
    
    this.chartOptions.xaxis = {
      type: "datetime",
      'categories': categories
    };
    this.chartOptions.series = [{name:'total confirmed', data:total_confirmed}, {name:'total death', data:total_death},{name:'total recovered',data:total_recovered}]
    // window.ApexCharts.exec("chart-quarter", "updateSeries", this.chartOptions.series);
    console.log(this.chartOptions)
  }
  ngOnInit(){


   
    var today = new Date()
    this._covidDataService.getLatestData().subscribe(data => this.draw_map(data))
    
    this._covidDataService.getDailyTrend(this.getFormatedDate(this.getMonday(today)), this.getFormatedDate(today)).subscribe(data => this.plotLineGraph(data))

  


  }
  
}