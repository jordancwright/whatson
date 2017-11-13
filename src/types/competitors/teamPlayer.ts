import { CompetitorFields } from './competitorFields';

export class TeamPlayer {
    name: string;
    country: string;
    custom_fields: CompetitorFields[];
    email: string;
    custom_private_fields: CompetitorFields[];
}