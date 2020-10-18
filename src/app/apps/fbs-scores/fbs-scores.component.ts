import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map, subscribeOn } from 'rxjs/operators';
import { Observable, from, observable, interval } from 'rxjs';
import { Game } from './game';
import { analyzeAndValidateNgModules } from '@angular/compiler';


@Component({
  selector: 'app-fbs-scores',
  templateUrl: './fbs-scores.component.html',
  styleUrls: ['./fbs-scores.component.css']
})
export class FbsScoresComponent implements OnInit {

  constructor(private http: HttpClient) { }
  public week;
  public games = [];
  public gamesURL = "https://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard";
  public newsURL = "http://site.api.espn.com/apis/site/v2/sports/football/college-football/news";

  ngOnInit(): void {

    this.sortData();
    
  }

  public getData(): Observable<any> {
    return this.http.get(this.gamesURL).pipe(map(res => res as JSON));
  }

  public sortData() {
    this.getData().subscribe(data => {
      this.week = data['week'].number;
      console.log(data['events']);
      data['events'].map(i => {
        if (i['competitions'][0]['situation']) {
          let game: Game = {
            date: i.date,
            homeTeam: i['competitions'][0]['competitors'][0]['team'].abbreviation,
            awayTeam: i['competitions'][0]['competitors'][1]['team'].abbreviation,
            homeScore: i['competitions'][0]['competitors'][0].score,
            awayScore: i['competitions'][0]['competitors'][1].score,
            status: i['status']['type']['shortDetail'],
            situation: i['competitions'][0]['situation']
          }
          this.games.push(game as Game);
        }

        if (!i['competitions'][0]['situation']) {
          let game: Game = {
            date: i.date,
            homeTeam: i['competitions'][0]['competitors'][0]['team'].abbreviation,
            awayTeam: i['competitions'][0]['competitors'][1]['team'].abbreviation,
            homeScore: i['competitions'][0]['competitors'][0].score,
            awayScore: i['competitions'][0]['competitors'][1].score,
            status: i['status']['type']['shortDetail'],
            situation: null
          }
          this.games.push(game as Game);
        }
      })
    })
  }

}
