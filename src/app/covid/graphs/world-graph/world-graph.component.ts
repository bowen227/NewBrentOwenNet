import { Component, OnInit } from '@angular/core';
import { CovidService } from 'src/app/shared/covid.service';
import { Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-world-graph',
  templateUrl: './world-graph.component.html',
  styleUrls: ['./world-graph.component.css']
})
export class WorldGraphComponent implements OnInit {
  public totalCasesDeaths;
  public cases;
  public deaths: number[] = [];
  public deathRate: number;

  // doughnut chart
  public doughnutChartData: MultiDataSet[] = [];
  public doughnutChartLabels: Label[] = ["Cases", "Deaths", "Recovered"];
  public doughnutChartType = "doughnut";

  constructor(private service: CovidService) { }

  ngOnInit(): void {
    this.getTotalCasesDeaths();
  }

  public getTotalCasesDeaths() {
    this.service.getCasesDeaths()
    .subscribe(data => {
      // console.log(data);
      this.totalCasesDeaths = data;
      for (const key in this.totalCasesDeaths) {
        if (this.totalCasesDeaths.hasOwnProperty(key)) {
          const element = this.totalCasesDeaths[key];
          if (key == "cases") {
            this.doughnutChartData.push(element);
          } if (key == "deaths") {
            this.doughnutChartData.push(element);
          } if (key == "recovered") {
            this.doughnutChartData.push(element);
          } 
          // console.log(this.doughnutChartData);
        }
      }
      this.deathRate = this.totalCasesDeaths.deaths / this.totalCasesDeaths.cases;
    });
  }

}
