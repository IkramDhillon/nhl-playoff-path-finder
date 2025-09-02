import { NextResponse } from 'next/server';

export async function GET(req) {
    try {

        //Fetch the NHL calendar from our own API route
        const res = await fetch(new URL('/api/nhl-calendar', req.url), {cache: 'no-store'});

        if (!res.ok) {
            return NextResponse.json({ error: 'Failed to fetch NHL calendar' }, { status: 500 });
        }

        const calendar = await res.json();

        //Array to hold all games
        const allGames = [];
        const perDatePromises = [];


        for (let i = 0; i < calendar.length; i++) {
            const date = calendar[i].replaceAll("-", "").trim();


            const promise = fetch(`https://site.api.espn.com/apis/site/v2/sports/hockey/nhl/scoreboard?dates=${date}`)
                .then(async (res) => {
                    if (!res.ok) {
                        console.error(`Failed to fetch data for ${date}`);
                        return [];
                    }

                    const data = await res.json();
                    const allGamesInThatDay = data.events;
                    
                    for (let index = 0; index < allGamesInThatDay.length; index++) {
                        const game = allGamesInThatDay[index];

                        if (game.season.slug === "regular-season") {

                            const gameObject = {
                                id: game.id,
                                date: calendar[i],
                                team1: game.competitions[0].competitors[0].team.displayName,
                                team2: game.competitions[0].competitors[1].team.displayName,
                                time: game.status.type.shortDetail.split("-")[1],
                                completed: game.status.type.completed
                            }

                            allGames.push(gameObject);
                        }

                    }
                }
                )

             .catch( (err) => {
                console.error(`Error fetching for ${date}:`, err.message);
            });

            perDatePromises.push(promise);
        }


        await Promise.allSettled(perDatePromises);
        
        allGames.sort((a,b) => a.date.localeCompare(b.date));

        return NextResponse.json(allGames);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
