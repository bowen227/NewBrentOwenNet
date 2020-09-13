import { Component, OnInit } from '@angular/core';
import { CovidService } from 'src/app/shared/covid.service';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';

@Component({
  selector: 'app-us-breakdown',
  templateUrl: './us-breakdown.component.html',
  styleUrls: ['./us-breakdown.component.css']
})
export class UsBreakdownComponent implements OnInit {
  public usTotals;
  public l = [];
  public pos = [];
  public neg = [];
  public d = [];
  public t = [];
  public h = [];
  public died = [];
  public newData = [];
  public isLoading: boolean;

  // line chart
  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartOptions: { responsive: true };

  constructor(private service: CovidService) { }

  ngOnInit(): void {
    this.getUsTotals();
  }

  public getUsTotals() {
    this.isLoading = true;
    this.service.getUsaTotals()
    .subscribe(data => {
      // console.log(data);
      this.usTotals = data;
      for (let i = 0; i < this.usTotals.length; i++) {
        const element = this.usTotals[i];
        this.l.push(String(element.date).slice(4, 8));
        this.pos.push(element.positive);
        this.neg.push(element.negative);
        this.d.push(element.total);
        this.t.push(element.totalTestResults);
        this.h.push(element.hospitalizedCurrently);
        this.died.push(element.death);
      }
      this.lineChartLabels = this.l.reverse();
      this.newData.push({ data: this.pos.reverse(), label: "Positive" });
      this.newData.push({ data: this.neg.reverse(), label: "Negative" });
      // this.newData.push({ data: this.d.reverse(), label: "Total" });
      // this.newData.push({ data: this.t.reverse(), label: "Total Tested" });
      // this.newData.push({ data: this.h.reverse(), label: "Hospitalized" });
      this.lineChartData = this.newData;
      // console.log(this.lineChartData);
      // console.log("Percent died US: " + this.died[0] / this.d[0] * 100);
    });
    this.isLoading = false;
  }

}
