import { getTwoRandomTeamsNames } from "src/utils/helpers/matches"
import { Match, MatchesMap } from "src/utils/interfaces/matches"

let matchesCache: MatchesMap | null = null

export const getMatchesMap = async (): Promise<[MatchesMap, boolean]> => {
    if (matchesCache) {
        return [matchesCache, false]
    }
    let response: MatchesMap = {}
    let error: boolean = false
    try {
        const result = await fetch('https://www.dontouch.ch/json/cc.json')
        const data = await result.json()
        response = data.doc[0].data.matches as MatchesMap
        matchesCache = response
    } catch (e) {
        error = true
    }
    return [response, error]
}

export const deleteMatches = async (matchIds: string[]): Promise<boolean> => {
    // fake promise to simulate async call
    await new Promise((resolve) => {
        setTimeout(() => {resolve(true) }, 1000)
    })

    // remove matches from cache
    if (!matchesCache) return false
    matchesCache = Object.keys(matchesCache).reduce((acc: MatchesMap, matchKey) => {
        if (matchesCache && !matchIds.includes(matchKey)) acc[matchKey] = matchesCache[matchKey]
        return acc
    }, {})

    return true
}

export const addMatch = async (): Promise<boolean> => {
    // fake promise to simulate async call
    await new Promise((resolve) => {
        setTimeout(() => {resolve(true) }, 1000)
    })

    // add match to cache
    if (!matchesCache) return false
    const allIDS = Object.keys(matchesCache).map(el => Number(el))
    allIDS.sort()
    const newMatchID = allIDS.length > 0 ? allIDS[allIDS.length - 1] + 1 : 23639961
    const date = new Date()
    const teamNames = getTwoRandomTeamsNames(matchesCache)
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log(tz);
    const match: Match = {
        teams: {
            away: { name: teamNames[0] },
            home: { name: teamNames[1] }
        },
        time: {
            date: date.toLocaleDateString('it-IT'),
            time: `${date.getHours()}:${date.getMinutes()}`,
            uts: date.getTime() / 1000
        },
        result: {
            away: Math.floor(Math.random() * 5),
            home: Math.floor(Math.random() * 5),
        }
    }
    matchesCache[newMatchID] = match

    return true
}