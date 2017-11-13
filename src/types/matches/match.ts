import { Vod } from './vod';
import { Opponent } from './opponent';
import { Stream } from './stream';
import { League } from './league';

export class Match {
    id: string;
    type: string;
    discipline: string;
    status: string;
    tournament_id: string;
    tournament: League;
    number: number;
    stage_number: number;
    group_number: number;
    round_number: number;
    date: Date;
    timezone: string;
    match_format: string;
    note: string;
    opponents: Opponent[];
    streams: Stream[];
    vods: Vod[];
    private_note: string;
}

