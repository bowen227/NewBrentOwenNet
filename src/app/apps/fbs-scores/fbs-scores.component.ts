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
  public data;
  public week;
  public keys = [];
  public names = [];
  public games = [];
  public gamesURL = "https://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard";

  ngOnInit(): void {
    this.sortData();
  }

  public sortData() {
    this.getData().subscribe(data => {
      console.log(data);
      this.week = data['week'].number;
      this.data = data;
      for (const key in this.data) {
        if (Object.prototype.hasOwnProperty.call(this.data, key)) {
          const element = this.data[key];
          if (element.length > 4) {
            this.names.push(element);
          }
        }
      }
      console.log(this.names);
      this.names.map(item => {
        item.map(i => {
          // console.log(i);
            let game = {
              date: i.date,
              homeTeam: i['competitions'][0]['competitors'][0]['team'].abbreviation,
              awayTeam: i['competitions'][0]['competitors'][1]['team'].abbreviation,
              homeScore: i['competitions'][0]['competitors'][0].score,
              awayScore: i['competitions'][0]['competitors'][1].score 
            }
            this.games.push(game);
        });
      })
    });
  }

  public getData() {
    return this.http.get(this.gamesURL).pipe(map(res => res as JSON));
  }

}
