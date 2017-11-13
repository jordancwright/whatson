import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Tournament } from '../types/tournaments/tournament';
import { Match } from '../types/matches/match';
import { Game } from '../types/games/game';
import { Competitor } from '../types/competitors/competitor';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class ToornamentApiService {

    baseUrl: string = 'https://api.toornament.com/v1/';

    constructor(private http: Http) { }

    createAuthHeaders(): Headers {
        let headers = new Headers();
        headers.append('X-Api-Key', 'bLqkJC9PcT5PQmd2bLZfqA6q9hCtWDyncUtgQG1yhlY');
        return headers;
    }

    getDisciplines(): Promise<Tournament[]> {
        return this.http.get(this.baseUrl + 'disciplines', { headers: this.createAuthHeaders() }).toPromise().then(response => response.json());
    }

    //Tournament endpoints
    getTournamentsInDateRange(startDate: string, endDate: string): Promise<Tournament[]> {
        return this.http.get(this.baseUrl + 'tournaments?after_start=' + startDate + '&before_end=' + endDate, { headers: this.createAuthHeaders() }).toPromise().then(response => response.json());
    }

    getFeaturedTournaments(): Promise<Tournament[]> {
        return this.http.get(this.baseUrl + 'tournaments?featured=1', { headers: this.createAuthHeaders() }).toPromise().then(response => response.json());
    }

    getTournamentsByDiscipline(discipline: string): Promise<Tournament> {
        return this.http.get(this.baseUrl + 'tournaments?discipline=' + discipline, { headers: this.createAuthHeaders() }).toPromise().then(response => response.json());
    }

    getTournamentById(tournamentId: string): Promise<Tournament> {
        return this.http.get(this.baseUrl + 'tournaments/' + tournamentId, { headers: this.createAuthHeaders() }).toPromise().then(response => response.json());
    }

    //Match endpoints
    getMatchesForTournament(tournamentId: string): Promise<Match[]> {
        return this.http.get(this.baseUrl + 'tournaments/' + tournamentId + '/matches', { headers: this.createAuthHeaders() }).toPromise().then(response => response.json());
    }

    getFeaturedMatchesForDiscipline(disciplineId: string): Promise<Match[]> {
        return this.http.get(this.baseUrl + 'disciplines/' + disciplineId + '/matches?featured=1', { headers: this.createAuthHeaders() }).toPromise().then(response => response.json());
    }

    getFeaturedMatchesForDisciplineInDateRange(disciplineId: string, startDate: string, endDate: string): Promise<Match[]> {
        return this.http.get(this.baseUrl + 'disciplines/' + disciplineId + '/matches?featured=1&after_date=' + startDate + '&before_date=' + endDate, { headers: this.createAuthHeaders() }).toPromise().then(response => response.json());
    }

    getFeaturedMatchesForDisciplineInDate(disciplineId: string, startDate: string): Promise<Match[]> {
        return this.http.get(this.baseUrl + 'disciplines/' + disciplineId + '/matches?featured=1&with_game=1&after_date=' + startDate, { headers: this.createAuthHeaders() }).toPromise().then(response => response.json());
    }

    getMatchDetails(tournamentId: string, matchId: string): Promise<Match> {
        return this.http.get(this.baseUrl + 'tournaments/' + tournamentId + '/matches/' + matchId, { headers: this.createAuthHeaders() }).toPromise().then(response => response.json());
    }

    getMatchResults(tournamentId: string, matchId: string): Promise<Match> {
        return this.http.get(this.baseUrl + 'tournaments/' + tournamentId + '/matches/' + matchId + '/result', { headers: this.createAuthHeaders() }).toPromise().then(response => response.json());
    }

    //Game endpoints

    getGamesForMatch(tournamentId: string, matchId: string): Promise<Game[]> {
        return this.http.get(this.baseUrl + 'tournaments/' + tournamentId + '/matches/' + matchId + '/result/games', { headers: this.createAuthHeaders() }).toPromise().then(response => response.json());
    }

    getGameDetails(tournamentId: string, matchId: string, gameNumber: string): Promise<Game> {
        return this.http.get(this.baseUrl + 'tournaments/' + tournamentId + '/matches/' + matchId + '/result/games/' + gameNumber, { headers: this.createAuthHeaders() }).toPromise().then(response => response.json());
    }

    getGameResults(tournamentId: string, matchId: string, gameNumber: string): Promise<Game> {
        return this.http.get(this.baseUrl + 'tournaments/' + tournamentId + '/matches/' + matchId + '/result/games/' + gameNumber + '/result', { headers: this.createAuthHeaders() }).toPromise().then(response => response.json());
    }

    //Participant endpoints
    getParticipantsInTournament(tournamentId: string): Promise<Competitor[]> {
        return this.http.get(this.baseUrl + 'tournaments/' + tournamentId + '/participants', { headers: this.createAuthHeaders() }).toPromise().then(response => response.json());
    }

    getParticipantDetails(tournamentId: string, participantId: string): Promise<Competitor> {
        return this.http.get(this.baseUrl + 'tournaments/' + tournamentId + '/participants/' + participantId, { headers: this.createAuthHeaders() }).toPromise().then(response => response.json());
    }

}