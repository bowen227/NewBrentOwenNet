import { Component, OnInit } from '@angular/core';
import { CovidService } from 'src/app/shared/covid.service';

@Component({
  selector: 'app-world-data',
  templateUrl: './world-data.component.html',
  styleUrls: ['./world-data.component.css']
})
export class WorldDataComponent implements OnInit {
  public worldData;
  public deathsToday;
  public deathPercentage;
  public recoveredPercentage;
  public newCases;
  public casesPerMillion;
  public isLoading: boolean;
  public mySubscription: any;
  
  public covidData = [];

  constructor(private service: CovidService) { }

  ngOnInit(): void {
    this.getData();
  }

  public getData() {
    try {
      this.isLoading = true;
      this.service.getCasesDeaths().subscribe(data => {
      this.worldData = data;
      this.sortData();
      })
    } catch (error) {
      console.error("Unable to retrive world data from the service...");
    }
    this.isLoading = false;
  }

  public sortData() {
    this.deathPercentage = this.worldData.deaths / this.worldData.cases;
    this.recoveredPercentage = this.worldData.recovered / this.worldData.cases;
    this.deathsToday = this.worldData.todayDeaths;
    this.newCases = this.worldData.todayCases;
    this.casesPerMillion = this.worldData.casesPerOneMillion;

    this.addCovidData();
  }

  public addCovidData() {
    this.covidData.push(
      {
        title: "Deaths Today",
        value: this.deathsToday
      },
      {
        title: "Death Percentage",
        value: this.deathPercentage,
        perc: true
      },
      {
        title: "Recovered",
        value: this.recoveredPercentage,
        perc: true
      },
      {
        title: "New Cases",
        value: this.newCases
      },
      {
        title: "Cases Per Million",
        value: this.casesPerMillion
      }
    );
  }

}
