import { Match, MatchesMap } from "../interfaces/matches";
import { getDateAndTimeFromMatch, getTwoRandomTeamsNames, matchesToTableData } from "./matches";

describe('Matches Utils', () => {

    it('getDateAndTimeFromMatch should correctly format date accordly to Italian timezone', () => {
        const mockMatches: Match[] = [1577836800, 1877836800, 0].map(el => ({
            teams: {
            away: { name: 'away' },
            home: { name: 'home' }
            },
            time: {
                date: '2020-01-01',
                time: '12:00',
                uts: el
            },
            result: {
                away: 0,
                home: 0
            }
        }))
        expect(getDateAndTimeFromMatch(mockMatches[0])).toEqual([ '1/1/2020', '1:00' ]);
        expect(getDateAndTimeFromMatch(mockMatches[1])).toEqual([ '4/7/2029', '7:20' ]);
        expect(getDateAndTimeFromMatch(mockMatches[2])).toEqual([ '1/1/1970', '1:00' ]);
    });

    it('getTwoRandomTeamsNames should return 2 different names of known teams', () => {
        const mockMatches: MatchesMap = {
            '1': {
                teams: {
                away: { name: 'away1' },
                home: { name: 'home1' }
                },
                time: {
                    date: '2020-01-01',
                    time: '12:00',
                    uts: 1577836800
                },
                result: {
                    away: 0,
                    home: 0
                },
            },
            '2': {
                teams: {
                away: { name: 'away2' },
                home: { name: 'home2' }
                },
                time: {
                    date: '2020-01-01',
                    time: '12:00',
                    uts: 1577836800
                },
                result: {
                    away: 0,
                    home: 0
                }
            },
            '3': {
                teams: {
                away: { name: 'away3' },
                home: { name: 'home3' }
                },
                time: {
                    date: '2020-01-01',
                    time: '12:00',
                    uts: 1577836800
                },
                result: {
                    away: 0,
                    home: 0
                }
            }
        }
        const homeTeamIsValid = ['away1', 'away2', 'away3', 'home1', 'home2', 'home3'].includes(getTwoRandomTeamsNames(mockMatches)[0])
        const awayTeamIsValid = ['away1', 'away2', 'away3', 'home1', 'home2', 'home3'].includes(getTwoRandomTeamsNames(mockMatches)[1])
        const homeTeamIsDifferentFromAwayTeam = getTwoRandomTeamsNames(mockMatches)[0] !== getTwoRandomTeamsNames(mockMatches)[1]
        expect(homeTeamIsValid && awayTeamIsValid && homeTeamIsDifferentFromAwayTeam).toBeTrue()
    });
  
    it('matchesToTableData should correctly format matches data', () => {
        const mockMatches: MatchesMap = {
            '1': {
                teams: {
                away: { name: 'away1' },
                home: { name: 'home1' }
                },
                time: {
                    date: '2020-01-01',
                    time: '12:00',
                    uts: 1577836800
                },
                result: {
                    away: 0,
                    home: 0
                },
            },
            '2': {
                teams: {
                away: { name: 'away2' },
                home: { name: 'home2' }
                },
                time: {
                    date: '2020-01-01',
                    time: '12:00',
                    uts: 1577836800
                },
                result: {
                    away: 0,
                    home: 0
                }
            },
            '3': {
                teams: {
                away: { name: 'away3' },
                home: { name: 'home3' }
                },
                time: {
                    date: '2020-01-01',
                    time: '12:00',
                    uts: 1577836800
                },
                result: {
                    away: 0,
                    home: 0
                }
            }
        }
        const result = [
            { id: '3', teams: 'home3 - away3', result: '0 - 0', date: '1/1/2020', time: '1:00' },
            { id: '2', teams: 'home2 - away2', result: '0 - 0', date: '1/1/2020', time: '1:00' },
            { id: '1', teams: 'home1 - away1', result: '0 - 0', date: '1/1/2020', time: '1:00' }
        ]
        expect(matchesToTableData(mockMatches)).toEqual(result)
    });
  });
  