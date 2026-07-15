import { getRoundOf16,
    getQuarterFinals,
    getSemiFinals,
    getFinal,
    getTournamentWinner,
    getKnockoutQualifiers,
    getPlayerAwards,
    // Utility exposed for advanced users
    getStageMatches } from 'fifa-wc-22';

    
    console.log("🏆 FIFA 2022 World Cup Module Initialized\n");

    const winner = await getTournamentWinner();
    console.log(`🌟 TOURNAMENT WINNER: ${winner}\n`);

    console.log("--- FINAL SCORE ---");
    const finalMatch = await getFinal();
    console.log(finalMatch[0] || "Data not available");

    console.log("\n--- SEMI-FINALS ---");
    const semis = await getSemiFinals();
    if (semis.length > 0) {
        console.table(semis);
    } else {
        console.log("Data not available");
    }

    console.log("\n--- TOURNAMENT AWARDS ---");
    console.log(getPlayerAwards());
    
    console.log("\n--- KNOCKOUT QUALIFIERS ---");
    const qualifiers = await getKnockoutQualifiers();
    console.log(qualifiers.length > 0 ? qualifiers.join(', ') : "Data not available");
