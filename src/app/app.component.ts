import { Component } from '@angular/core';
import { ToornamentApiService } from './app.service';

import { Tournament } from '../types/tournaments/tournament';
import { Match } from '../types/matches/match';
import { Opponent } from '../types/matches/opponent';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ToornamentApiService]
})

export class AppComponent {
  location: Location;

  constructor(location: Location) {this.location = location;}

  isActive(routeName:string): boolean {
    return routeName === this.location.path();
  }
}
