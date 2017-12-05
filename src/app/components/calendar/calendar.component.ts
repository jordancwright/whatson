import { Component } from '@angular/core';
import { ToornamentApiService } from '../../app.service';

import { Tournament } from '../../../types/tournaments/tournament';
import { Match } from '../../../types/matches/match';
import { Opponent } from '../../../types/matches/opponent';

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [ToornamentApiService]
})

export class CalendarComponent {
  title = 'calendar';
  tickerDisciplineIds: string[] = ['hearthstone', 'counterstrike_go', 'leagueoflegends', 'overwatch', 'supersmashbros', 'supersmashbros_melee', 'rocketleague', 'halo5_guardians', 'dota2'];
  displayNames: string[] = ['Hearthstone', 'CS:GO', 'League of Legends', 'Overwatch', 'Smash 4', 'Melee', 'Rocket League', 'Halo 5', 'DOTA 2'];
  gameNameMap: Map<String, String> = new Map();

  results: Tournament[];
  testTournament: Tournament;
  tournamentMatches: Match[];

  asyncMatchMap: Map<string, Match[]> = new Map();
  matchMap: Map<string, Match[]>;

  liveAndSoonMatches: Match[];
  matchList: Match[];

  constructor(private apiService: ToornamentApiService) { }

  public ngOnInit(): any {
    let date = new Date().toISOString().slice(0, -14);

    var startDate: Date = this.getDateForTickerMatches(0);
    var endDate: Date = this.getDateForTickerMatches(7);
    console.log(startDate);
    console.log(endDate);
    var start: string = startDate.toISOString().slice(0, -14);
    var end: string = endDate.toISOString().slice(0, -14);

    console.log(start);
    console.log(end);

    this.tickerDisciplineIds.forEach((element, index, array) => {
      this.apiService.getFeaturedMatchesForDisciplineInDateRange(element, start, end).then((response) => {
        this.asyncMatchMap.set(this.displayNames[index], response);
        console.log(response);
        if(this.asyncMatchMap.size === this.tickerDisciplineIds.length) {
          this.matchMap = this.asyncMatchMap;
        }
      });
    });
  }

  converToLocalTime(dateTime: string): string {
    let returnDate = new Date(dateTime);
    let tempString = returnDate.toUTCString();
    returnDate = new Date(tempString);
    let timeAndZone = returnDate.toString().slice(-10, -1);
    let hours = timeAndZone.slice(0, 2);
    let hoursInt = returnDate.getHours();
    let minutesInt = returnDate.getMinutes();
    let hoursInt12 = ((hoursInt + 11) % 12 + 1);
    let minutesString = minutesInt.toString() === '0' ? '00' : minutesInt.toString();
    let ampm = hoursInt >= 12 ? 'PM' : 'AM';

    let timeString = hoursInt12.toString() + ':' + minutesString + ' ' + ampm;
    return timeString;
  }

  getNormalDate(dateTime: string): string {
    let date = new Date(dateTime);
    let dayString = date.getDate().toString();
    if (parseInt(dayString) < 10) {
      dayString = '0' + dayString;
    }

    let monthString = (date.getMonth() + 1).toString();

    console.log(date);
    console.log(date.getMonth());
    return monthString + '/' + dayString + '/' + date.getFullYear().toString();
  }

  makeGetRequest(): void {
    this.apiService.getFeaturedTournaments().then((response) => {
      this.results = response;
      console.log(this.results);
      console.log(this.results[1]);
      this.testTournament = this.results[1];
    });
  }

  checkWinner(match: Match): string[] {
    let classList = [];
    if (match.status !== 'completed') {
      classList[0] = null;
      classList[1] = null;
      return classList;
    } else {
      classList[0] = match.opponents[0].score > match.opponents[1].score ? 'winner' : 'loser';
      classList[1] = match.opponents[1].score > match.opponents[0].score ? 'winner' : 'loser';

      if (classList[0] === classList[1]) {
        classList[0] = 'tie';
        classList[1] = 'tie';
        return classList
      }
    }

    return classList;
  }

  getMatchesForTournament(): void {
    this.apiService.getMatchesForTournament(this.testTournament.id).then((response) => {
      this.tournamentMatches = response;
      console.log(this.tournamentMatches);
    });
  }

  private getDateForTickerMatches(daysToAdd: number): Date {
    var returnDate: Date = new Date();
    returnDate.setDate(returnDate.getDate() + daysToAdd);
    returnDate.setHours(0);
    returnDate.setMinutes(0);
    returnDate.setSeconds(0);
    returnDate.setMilliseconds(0);
    return returnDate;
  }

  getMatchesForLiveUpcomingTicker(): void {
    var startDate: Date = this.getDateForTickerMatches(-1);
    var endDate: Date = this.getDateForTickerMatches(3);
    var start: string = startDate.toISOString().slice(0, -14);
    var end: string = endDate.toISOString().slice(0, -14);
    console.log(start);
    console.log(end);
    this.liveAndSoonMatches = [];
    this.tickerDisciplineIds.forEach(element => {
      console.log(element);
      this.apiService.getFeaturedMatchesForDisciplineInDateRange(element, start, end).then((result) => {
        this.liveAndSoonMatches = this.liveAndSoonMatches.concat(result);
        console.log(this.liveAndSoonMatches);
      });
    });
    console.log(this.liveAndSoonMatches);
  }


}
