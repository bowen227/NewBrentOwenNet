import { Component, OnInit } from '@angular/core';
import { CovidService } from 'src/app/shared/covid.service';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-state-graph',
  templateUrl: './state-graph.component.html',
  styleUrls: ['./state-graph.component.css']
})
export class StateGraphComponent implements OnInit {
  public overview;
  public showBarGraph = false;
  public states = [];
  public initialState = "Alabama";
  public stateDeathPerc: number;
  public loading = false;

  public newData = [];

  // bar chart
  public barChartData: ChartDataSets[] = [];
  public barChartLegend = true;
  public barChartLabels: Label[] = [];
  public barChartOptions: any =  { responsive: true };
  public barChartType = 'bar';

  constructor(private service: CovidService) { }

  ngOnInit(): void {
    this.getOverViewData();
  }

  public getOverViewData() {
    this.loading = true;
    this.service.getOverView().subscribe(data => {
      // console.log(data);
      this.overview = data;
      this.addStates();
      // this.loading = false;
      this.sortData(this.initialState);
      this.loading = false;
    });
  }

  public addStates() {
    for (let i = 0; i < this.overview.length; i++) {
      const element = this.overview[i];
      this.states.push(element.state);
    }
    this.states.sort();
  }

  public sortData(state) {
    this.loading = true;
    this.newData = [];
    this.barChartLabels = [];
    for (let i = 0; i < this.overview.length; i++) {
      const element = this.overview[i];
      if (element.state == state) {
        this.barChartLabels.push(element.state);
        this.newData.push(
          { data: [element.cases], label: "Cases" },
          { data: [element.active], label: "Active" },
          { data: [element.deaths], label: "Deaths" },
          // { data: [element.tests], label: "Tests" }
        );
        this.barChartData = this.newData;
        this.stateDeathPerc = element.deaths / element.cases;
      }
    }
    this.loading = false;
    this.showBarGraph = true;
  }

}
