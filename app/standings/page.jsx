'use client'
import React, { useEffect, useState } from 'react'
import DivisionTable from '@/components/DivisionTable'
import teams from '@/data/Teams'
import Loader from '@/components/SpinnerWithoutText'



const page = () => {

    const teamList = new teams();
    const [loading, setLoading] = useState(true);
    const [seasonHasStandings, setSeasonHasStandings] = useState(false);

    const [atlanticDivision, setatlanticDivision] = useState([]);
    const [metropolitanDivision, setmetropolitanDivision] = useState([]);
    const [centralDivision, setcentralDivision] = useState([]);
    const [pacificDivision, setpacificDivision] = useState([]);

    // Function to fill different division's state with team objects
    function fillDivision(division) {


        const teamObjects = teamList.getTeamByDivision(division.name);
        const teamListFromDivision = division.standings.entries;


        for (let i = 0; i < teamListFromDivision.length; i++) {
            // Get the team name from the data provided by ESPN
            let reqTeamAddrevation = teamListFromDivision[i].team.abbreviation;
            // Find the team object that matches the team name from the teamList made by me
            let reqTeamObject = teamObjects.find(team => team.getId() === reqTeamAddrevation);

            // If the team object is found, set its position and points
            if (reqTeamObject) {
                reqTeamObject.setPoints(teamListFromDivision[i].stats[8].value);
                reqTeamObject.setTotalMatchesPlayed(teamListFromDivision[i].stats[4].value);
            }
        }

        // Sort teams by points in descending order
        teamObjects.sort((a, b) => b.getPoints() - a.getPoints());

        //Give pos to each team
        for (let index = 0; index < teamObjects.length; index++) {
            let pos = index + 1;
            teamObjects[index].setPosition(pos);
        }

        if (division.name === "Atlantic Division") {
            setatlanticDivision(teamObjects);

        }
        else if (division.name === "Metropolitan Division") {
            setmetropolitanDivision(teamObjects);
        }
        else if (division.name === "Central Division") {
            setcentralDivision(teamObjects);
        }
        else if (division.name === "Pacific Division") {
            setpacificDivision(teamObjects);
        }
    }

    async function fetchStandings() {
        const res = await fetch('/api/nhl-standings');
        const data = await res.json();

        // Get the latest season data
        const latestSeason = data.seasons[0];

        //Get the regular season data of the latest season
        const regularSeason = latestSeason.types[1];

        // Find the team standings for the regular season

        // Check if the regular season has standings
        const seasonHasStandings = regularSeason.hasStandings;
        setSeasonHasStandings(seasonHasStandings);

        if (seasonHasStandings) {
            const atlanticDivisionTeams = data.children[0].children[0];
            const MetropolitanDivisionTeams = data.children[0].children[1];
            const centralDivisionTeams = data.children[1].children[0];
            const pacificDivisionTeams = data.children[1].children[1];


            fillDivision(atlanticDivisionTeams);
            fillDivision(MetropolitanDivisionTeams);
            fillDivision(centralDivisionTeams);
            fillDivision(pacificDivisionTeams);
        }

        setLoading(false);
    }

    useEffect(() => {
        fetchStandings();
    }, [])


    if (loading) {
        return <Loader />
    }

    if (!seasonHasStandings) {
        return (
            <>
                <div className='min-h-screen flex items-center justify-center'>
                    <div className='flex gap-7 flex-col items-center justify-center'>
                        <h2 className='font-bold text-center text-2xl py-2'>No Standings Found For The Latest Season</h2>
                        <div className='flex flex-col items-center mb-3 gap-1'>
                            <p className='font-bold'>
                                This season has no standings
                            </p>

                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <div className="tables">
            <div className="Eastern conference">
                <h3 className='font-bold text-center text-lg pb-2'>Eastern Conference</h3>
                <div className='flex flex-col gap-2 md:flex-row justify-center md:gap-20 flex-wrap'>

                    <DivisionTable title="Atlantic Division" teams={atlanticDivision} />
                    <DivisionTable title="Metropolitan Division" teams={metropolitanDivision} />
                </div>
            </div>


            <div className="h-1 opacity-10 bg-white my-4"></div>


            <div className="Western conference">
                <h3 className='font-bold text-center text-lg pb-2'>Western Conference</h3>
                <div className='flex mb-2 flex-col gap-2 md:flex-row justify-center md:gap-20 flex-wrap'>
                    <DivisionTable title="Central Division" teams={centralDivision} />
                    <DivisionTable title="Pacific Division" teams={pacificDivision} />
                </div>
            </div>

        </div>
    )
}

export default page