import { LogoSet } from './logoSet';
import { TeamPlayer } from './teamPlayer';
import { CompetitorFields } from './competitorFields';

export class Competitor {
    id: string;
    name: string;
    logo: LogoSet;
    country: string;
    lineup: TeamPlayer[]
    custom_fields: CompetitorFields[]
    email: string;
    check_in: string;

}