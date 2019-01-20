import { Tile } from './tile-interface';
export class CaseHelper {
    tiles: Tile[] = [
        { text: 'One', cols: 3, rows: 1, color: 'lightblue' },
        { text: 'Two', cols: 1, rows: 1, color: 'lightgreen' },
        { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
        { text: 'Four', cols: 1, rows: 1, color: '#DDBDF1' },
    ];
    types = [
        'Individual',
        'Couple',
        'Family',
        'Group'
    ];
    statuses = [
        'Open',
        'Closed Planned',
        'Closed Unplanned'
    ];
    referrals = [
        'Individual',
        'Couple',
        'Family',
        'Group'
    ];
    payers = [
        'Individual',
        'Couple',
        'Family',
        'Group'
    ];
    treatement_settings = [
        'Individual',
        'Couple',
        'Family',
        'Group'
    ];
    level_of_care = [
        'Individual',
        'Couple',
        'Family',
        'Group'
    ];
    tags = [
        'Individual',
        'Couple',
        'Family',
        'Group'
    ];
}
