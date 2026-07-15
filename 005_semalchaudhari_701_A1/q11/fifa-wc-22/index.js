import { pathToFileURL } from 'url';

/**
 * FIFA 2022 World Cup Node.js Module (wc-2022-stats)
 * * A complete wrapper for the 2022 World Cup.
 * Features: Matches, Knockout Stages, Winners, and Tournament Awards.
 */

const WC_2022_JSON_URL = 'https://raw.githubusercontent.com/openfootball/world-cup.json/master/2022/worldcup.json';

// In-memory cache to prevent fetching the JSON multiple times
let tournamentCache = null;

/**
 * Core engine: Fetches and caches the tournament data.
 * All other functions call this secretly in the background.
 */
async function loadTournamentData() {
    if (tournamentCache) return tournamentCache;

    try {
        const response = await fetch(WC_2022_JSON_URL);
        if (!response.ok) throw new Error('Failed to fetch data');
        tournamentCache = await response.json();
        return tournamentCache;
    } catch (error) {
        console.error("API Error:", error);
        return null;
    }
}

/**
 * Helper function to determine the winner of a specific match object.
 * Handles regular time, extra time, and penalty shootouts based on various API formats.
 */
function getMatchWinner(match, team1Name, team2Name) {
    // Format 1: match.score object with ft, et, p
    if (match.score) {
        // Check for penalty shootout first
        if (match.score.p) {
            return match.score.p[0] > match.score.p[1] ? team1Name : team2Name;
        }
        
        // Check full-time/extra-time score
        const score1 = match.score.et ? match.score.et[0] : (match.score.ft ? match.score.ft[0] : null);
        const score2 = match.score.et ? match.score.et[1] : (match.score.ft ? match.score.ft[1] : null);

        if (score1 !== null && score2 !== null) {
            if (score1 > score2) return team1Name;
            if (score2 > score1) return team2Name;
            return "Draw";
        }
    }
    
    // Format 2: flat score1 and score2 properties (used in some flat JSON structures)
    if (match.score1 !== undefined && match.score2 !== undefined) {
        if (match.score1 > match.score2) return team1Name;
        if (match.score2 > match.score1) return team2Name;
        return "Draw";
    }
    
    return "Unplayed";
}

/**
 * Gets all matches for a specific stage (e.g., "Round of 16", "Final")
 */
async function getStageMatches(stageName) {
    const data = await loadTournamentData();
    if (!data) return [];
    
    let stageMatches = [];
    
    // Safely parse the dataset based on different possible openfootball JSON structures
    if (data.rounds) {
        // Format 1: { rounds: [ { name: 'Round of 16', matches: [...] } ] }
        const stage = data.rounds.find(r => r.name.toLowerCase() === stageName.toLowerCase());
        if (stage && stage.matches) {
            stageMatches = stage.matches;
        }
    } else if (data.matches) {
        // Format 2: { matches: [ { round: 'Round of 16', ... } ] }
        stageMatches = data.matches.filter(m => m.round && m.round.toLowerCase() === stageName.toLowerCase());
    }

    return stageMatches.map(match => {
        // Handle variations in team object structure (can be an object with .name or a raw string)
        const team1 = match.team1?.name || match.team1 || "TBD";
        const team2 = match.team2?.name || match.team2 || "TBD";
        
        let scoreStr = 'TBD';
        let penalties = null;

        if (match.score) {
            scoreStr = match.score.ft ? `${match.score.ft[0]} - ${match.score.ft[1]}` : 'TBD';
            penalties = match.score.p ? `${match.score.p[0]} - ${match.score.p[1]}` : null;
        } else if (match.score1 !== undefined && match.score2 !== undefined) {
            scoreStr = `${match.score1} - ${match.score2}`;
        }

        return {
            date: match.date,
            teams: `${team1} vs ${team2}`,
            score: scoreStr,
            penalties: penalties,
            winner: getMatchWinner(match, team1, team2)
        };
    });
}

// ==========================================
// PUBLIC MODULE FUNCTIONS
// ==========================================

async function getRoundOf16() {
    return await getStageMatches("Round of 16");
}

async function getQuarterFinals() {
    return await getStageMatches("Quarter-finals");
}

async function getSemiFinals() {
    return await getStageMatches("Semi-finals");
}

async function getFinal() {
    return await getStageMatches("Final");
}

/**
 * Determines the ultimate winner of the tournament.
 */
async function getTournamentWinner() {
    const finalMatches = await getFinal();
    if (finalMatches.length === 0) return "Unknown / Data Not Found";
    
    return finalMatches[0].winner;
}

/**
 * Returns a list of all 16 teams that qualified for the knockout stages.
 */
async function getKnockoutQualifiers() {
    const roundOf16 = await getRoundOf16();
    const qualifiers = new Set();
    
    roundOf16.forEach(match => {
        const teams = match.teams.split(' vs ');
        qualifiers.add(teams[0]);
        qualifiers.add(teams[1]);
    });
    
    return Array.from(qualifiers);
}

/**
 
 * This function provides the official historical award data for the 2022 World Cup.
 */
function getPlayerAwards() {
    return {
        goldenBoot: { player: "Kylian Mbappé", country: "France", goals: 8 },
        topScorer: { player: "Kylian Mbappé", country: "France", goals: 8 },
        mostAssists: { 
            players: ["Lionel Messi", "Bruno Fernandes", "Antoine Griezmann", "Harry Kane", "Ivan Perišić"], 
            assists: 3 
        },
        goldenBall: { player: "Lionel Messi", country: "Argentina", note: "Best Overall Player" },
        goldenGlove: { player: "Emiliano Martínez", country: "Argentina", note: "Best Goalkeeper" },
        youngPlayer: { player: "Enzo Fernández", country: "Argentina" },
        fairPlayAward: { country: "England" }
    };
}

// ==========================================
// EXPORTING THE MODULE (ES Modules Syntax)
// ==========================================
export {
    getRoundOf16,
    getQuarterFinals,
    getSemiFinals,
    getFinal,
    getTournamentWinner,
    getKnockoutQualifiers,
    getPlayerAwards,
    // Utility exposed for advanced users
    getStageMatches 
};

