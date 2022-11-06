import { Match, MatchesMap, MatchTableRow } from "src/utils/interfaces/matches";

export function matchesToTableData (matches: MatchesMap): MatchTableRow[] {
    return Object.keys(matches).map((matchId) => {
        const targetMatch: Match = matches[matchId]
        const [date, time] = getDateAndTimeFromMatch(targetMatch)
        return {
        id: matchId,
        teams: `${targetMatch.teams.home.name} - ${targetMatch.teams.away.name}`,
        result: `${targetMatch.result.home} - ${targetMatch.result.away}`,
        date,
        time
    }}).sort((a, b) => Number(b.id) - Number(a.id))
}

export const getTwoRandomTeamsNames = (matches: MatchesMap): [string, string] => {
    const randomMatch = matches[Object.keys(matches)[Math.floor(Math.random() * Object.keys(matches).length)]]
    return [randomMatch.teams.home.name, randomMatch.teams.away.name]
}

export const getDateAndTimeFromMatch = (match: Match): [string, string] => {
    const date = new Date(match.time.uts * 1000)
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
    return [date.toLocaleDateString('it-IT'), `${date.getHours()}:${minutes}`]
}