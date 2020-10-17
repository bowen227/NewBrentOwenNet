import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Game } from './game';



@Component({
  selector: 'app-fbs-scores',
  templateUrl: './fbs-scores.component.html',
  styleUrls: ['./fbs-scores.component.css']
})
export class FbsScoresComponent implements OnInit {

  constructor(private http: HttpClient) { }
  public data: Observable<Game[]>;
  public week;
  public keys = [];
  public names = [];
  public games = [];
  public gamesURL = "https://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard";

  ngOnInit(): void {
    this.getData().subscribe(data => {
      console.log(data);
      this.week = data['week'].number;
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const element = data[key];
          if (element.length > 4) {
            this.names.push(element);
          }
        }
      }
      this.sortData();
    });
  }

  public sortData() {
    this.names.map(item => {
      item.map(i => {
          let game: Game = {
            date: i.date,
            homeTeam: i['competitions'][0]['competitors'][0]['team'].abbreviation,
            awayTeam: i['competitions'][0]['competitors'][1]['team'].abbreviation,
            homeScore: i['competitions'][0]['competitors'][0].score,
            awayScore: i['competitions'][0]['competitors'][1].score,
            status: i['status']['type']['shortDetail'],
            // SITUATION SOMETIMES BLANK NEED TO HANDLE THIS
            situation: i['competitions'][0]['situation']['downDistanceText']
          }
          this.games.push(game as Game);
      });
    });
  }

  public getData() {
    return this.http.get(this.gamesURL).pipe(map(res => res as JSON));
  }

}
