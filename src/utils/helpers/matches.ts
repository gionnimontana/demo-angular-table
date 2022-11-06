import { Match, MatchesMap, MatchTableRow } from "src/utils/interfaces/matches";

export function matchesToTableData (matches: MatchesMap): MatchTableRow[] {
    return Object.keys(matches).map((matchId) => {
        const targetMatch: Match = matches[matchId]
        return {
        id: matchId,
        teams: `${targetMatch.teams.home.name} - ${targetMatch.teams.away.name}`,
        date: targetMatch.time.date,
        time: targetMatch.time.time,
        result: `${targetMatch.result.home} - ${targetMatch.result.away}`
    }}).sort((a, b) => Number(b.id) - Number(a.id))
}