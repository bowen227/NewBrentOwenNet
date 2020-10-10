import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-fbs-scores',
  templateUrl: './fbs-scores.component.html',
  styleUrls: ['./fbs-scores.component.css']
})
export class FbsScoresComponent implements OnInit {

  constructor(private http: HttpClient) { }
  public games;
  public keys = [];
  public names = [];
  public gamesURL = "https://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard";

  ngOnInit(): void {
    this.sortData();
  }

  public sortData() {
    this.getData().subscribe(data => {
      this.games = data
      for (const key in this.games) {
        if (Object.prototype.hasOwnProperty.call(this.games, key)) {
          const element = this.games[key];
          this.keys.push(element);
          this.keys.forEach(item => {
            this.names.push(item);
          });
        }
      }
    });
  }

  public getData() {
    return this.http.get(this.gamesURL).pipe(map(res => res as JSON));
  }

}
