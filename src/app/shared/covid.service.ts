import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CovidService {
  public OverViewUrl = "https://corona.lmao.ninja/v2/states";
  public totalCasesDeathUrl = "https://corona.lmao.ninja/v2/all";
  public usTotals = "https://api.covidtracking.com/v1/us/daily.json";

  public responseCache = new Map()

  constructor(private http: HttpClient) { }

  public getCasesDeaths() {
    try {
      return this.http.get(this.totalCasesDeathUrl);
    } catch (error) {
      console.error("Unable to retrive total cases...");
    }
  }

  public getOverView() {
    try {
      return this.http.get(this.OverViewUrl);
    } catch (error) {
      console.error("Unable to retrive overview data...");
    }
  }

  public getUsaTotals(): Observable<any> {
    try {
      return this.http.get<any>(this.usTotals);
    } catch (error) {
      console.error("Unable to retrive USA data...");
    }
  }
}
