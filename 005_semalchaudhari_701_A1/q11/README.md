wc-2022-stats 🏆

A complete, lightweight Node.js module for fetching, parsing, and calculating statistics from the 2022 FIFA World Cup.

This package automatically fetches historical match data and provides simple, promise-based functions to get match results, knockout stage trees, tournament winners, and official player awards.

Installation

Install the package via npm:

npm install wc-2022-stats


Note: This package uses modern ES Modules. Ensure your project's package.json includes "type": "module".

Usage

Import the functions you need directly from the package:

import { 
    getTournamentWinner, 
    getFinal, 
    getSemiFinals, 
    getPlayerAwards, 
    getKnockoutQualifiers 
} from 'wc-2022-stats';

async function run() {
    // Get the ultimate tournament winner
    const winner = await getTournamentWinner();
    console.log(`Tournament Winner: ${winner}`); // Argentina

    // Get the final match details and score
    const finalMatch = await getFinal();
    console.log(finalMatch[0]);

    // Get the official player awards (Golden Boot, etc.)
    const awards = getPlayerAwards();
    console.log(`Golden Boot: ${awards.goldenBoot.player} (${awards.goldenBoot.goals} goals)`);

    // Get all 16 teams that qualified for the knockout stage
    const qualifiers = await getKnockoutQualifiers();
    console.log("Qualified Teams:", qualifiers.join(', '));
}

run();


API Reference

All match-fetching functions are asynchronous and return Promises. The data is cached in-memory after the first request to ensure lightning-fast performance on subsequent calls.

Match Functions

getRoundOf16(): Returns an array of all Round of 16 match objects.

getQuarterFinals(): Returns an array of all Quarter-final match objects.

getSemiFinals(): Returns an array of all Semi-final match objects.

getFinal(): Returns an array containing the Final match object.

getStageMatches(stageName): Advanced utility to fetch matches by a specific string name.

Tournament Functions

getTournamentWinner(): Returns the name of the winning country (String).

getKnockoutQualifiers(): Returns an array of the 16 teams that escaped the group stages.

Static Data

getPlayerAwards(): Returns an object containing the official 2022 FIFA World Cup awards (Golden Boot, Top Scorer, Most Assists, Golden Ball, Golden Glove, Young Player, and Fair Play Award). (Synchronous)

Data Source

Match data is securely fetched and parsed from the open-source openfootball repository.

License

ISC