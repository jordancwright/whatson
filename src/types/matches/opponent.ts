import { Participant } from './participant';

export class Opponent {
    number: number;
    participant: Participant;
    result: number;
    score: string;
    forfeit: boolean;
}