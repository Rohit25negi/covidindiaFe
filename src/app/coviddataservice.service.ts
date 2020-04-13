import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StateCovid} from './utils/state_covid_model'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoviddataserviceService {

  API_URL:string ="/api/covid_data/latest_state_wise_data/?format=json" 

  constructor(private http: HttpClient) { }

  getLatestData(): Observable<StateCovid[]>{
    return  this.http.get<StateCovid[]>(this.API_URL)
  }

  getDailyTrend(start_date, end_date):Observable<Object[]>{
    start_date = "2020-04-04"
    var API_URL = `/api/covid_data/daily_trend/?format=json&start=${start_date}&end=${end_date}`
    return this.http.get<Object[]>(API_URL);
  }
}
