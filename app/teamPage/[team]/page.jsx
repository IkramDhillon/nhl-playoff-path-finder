'use client'
import React, { use } from 'react'
import { useEffect, useState } from 'react';
import teams from '@/data/Teams';
import DivisionTable from '@/components/DivisionTable';
import Link from 'next/link';
import SpinnerNoText from '@/components/SpinnerWithoutText';
import SpinnerText from '@/components/SpinnerWithText';
import MatchCard from '@/components/MatchCard';

const Team = ({ params }) => {

  const totalGamesPerTeam = 82;
  let userTeamRemainingGames = totalGamesPerTeam;

  const resolvedParams = use(params);
  const teamID = resolvedParams.team;
  const teamList = new teams();
  const reqTeam = teamList.getTeamById(teamID);
  const [seasonEnded, setSeasonEnded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingWithText, setLoadingWithText] = useState(false);
  const [gamesToDisplay, setGamesToDisplay] = useState([]);
  const [simulationCompleted, setSimulationCompleted] = useState(false);
  const [pointsTied, setPointsTied] = useState(false);
  const [gamesSimulated, setGamesSimulated] = useState(0);

  const [seasonHasStandings, setSeasonHasStandings] = useState(false);
  const [userTeamPos, setUserTeamPos] = useState(0);

  // Show table after fetching data
  const [showContent, setshowContent] = useState(false);

  // State to hold teams in Divisions
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

    // Sort teams by points in descending order and give pos
    sortAndGivePos(teamObjects);
    setUserTeamPos(reqTeam.getPosition());

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

  function checkSeasonEnded(endDate) {
    const currentDate = new Date().toISOString().split('T')[0];  // Get current date in YYYY-MM-DD format

    // check if the season has ended
    if (currentDate > endDate.split('T')[0]) {
      setSeasonEnded(true);
    }
  }


  async function fetchStandings() {
    const res = await fetch('/api/nhl-standings');
    const data = await res.json();

    // Get the latest season data
    const latestSeason = data.seasons[0];

    //Get the regular season data of the latest season
    const regularSeason = latestSeason.types[1];

    // Get the end date of the regular season
    const endDate = regularSeason.endDate;
    if (endDate) {
      // Check if the season has ended
      checkSeasonEnded(endDate);
    }

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
    // Set showContent to true after fetching data after some time interval
    const timer = setTimeout(() => {
      setshowContent(true);
    }, 400);

  }, []);

  ///////////////////Helper Function///////////////////////////////
  function sortAndGivePos(division) {
    // Sort teams by points in descending order
    division.sort((a, b) => b.getPoints() - a.getPoints());

    //Give pos to each team
    for (let index = 0; index < division.length; index++) {
      let pos = index + 1;
      division[index].setPosition(pos);
    }
  }



  function randomTeamWinBy2Points(team1, team2) {
    const randomNum = Math.floor(Math.random() * 2) + 1;
    let winningTeam;

    if (randomNum === 1) {
      team1.incrementPointsBy2();
      winningTeam = team1;
    } else {
      team2.incrementPointsBy2();
      winningTeam = team2;
    }

    return winningTeam;
  }


  function findTeam(atlanticTeams, metropolitanTeams, centralTeams, pacificTeams, teamToFind) {

    //Make a shallow copy of team objects
    let allTeams = [...atlanticTeams, ...metropolitanTeams, ...centralTeams, ...pacificTeams];

    return allTeams.find(team => team.getName() === teamToFind);

  }

  function clashExistInQualiyingPos(atlanticTeams, metropolitanTeams, centralTeams, pacificTeams, reqDivision, userTeam) {

    let result = [];

    //If clash exist in qualifying position
    let clashExist = false;

    //Make a shallow copy of team objects
    let allTeams = [...atlanticTeams, ...metropolitanTeams, ...centralTeams, ...pacificTeams];
    let userTeamDivision = allTeams.filter(team => team.getDivision() === reqDivision);
    let index = 0;
    let nextIndex = 1;


    //Insert in the array all teams with equal points
    do {
      if (userTeamDivision[index].getPoints() === userTeamDivision[nextIndex].getPoints()) {
        if (!result.includes(userTeamDivision[index])) {
          result.push(userTeamDivision[index]);
        }
        if (!result.includes(userTeamDivision[nextIndex])) {

          result.push(userTeamDivision[nextIndex]);
        }

      }

      index++;
      nextIndex++;
    } while (nextIndex < userTeamDivision.length);

    //Qualifying positions have a tie
    if (result.length > 0 && result[0].getPosition() <= 3) {

      //Gets the range of equal points team that can go in direct qualifying position but require tie breaker rules
      let qualifyingPosRange = result.filter(team => team.getPoints() === result[0].getPoints());
      if (qualifyingPosRange.includes(userTeam)) {
        clashExist = true;
      }

      let remainingTeams = result.filter(team => team.getPoints() !== result[0].getPoints());
      if (remainingTeams.length > 0 && remainingTeams[0].getPosition <= 3) {
        //If there are still teams remaining that are in qualifying positions and have equal points
        qualifyingPosRange = remainingTeams.filter(team => team.getPoints() === remainingTeams[0].getPoints());
        if (qualifyingPosRange.includes(userTeam)) {
          clashExist = true;
        }
      }
    }

    return clashExist;

  }

  ///////////////////Functions for simulation

  async function startSimulation() {
    setLoadingWithText(true);

    //Fetch the schedule for the latest season

    const res = await fetch('/api/nhl-schedule');
    const data = await res.json();


    //Start greedy simulation on remaining games of schedule
    const remainingGames = data.filter((game) => game.completed === false);

    startGreedySimulation(remainingGames);

    setGamesSimulated(remainingGames.length);
    setLoadingWithText(false);
  }


  function startGreedySimulation(remainingGames) {
    let atlanticTeams = [...atlanticDivision];
    let metropolitanTeams = [...metropolitanDivision];
    let centralTeams = [...centralDivision];
    let pacificTeams = [...pacificDivision];
    let completedGames = [];
    let userFinalPos = 0;

    //Before starting find the remaining matches of users team
    let userTeamFromTable = findTeam(atlanticTeams, metropolitanTeams, centralTeams, pacificTeams, reqTeam.getName());
    let matchesPlayed = userTeamFromTable.getMatches();
    userTeamRemainingGames = totalGamesPerTeam - matchesPlayed;

    for (let index = 0; index < remainingGames.length; index++) {
      let team1 = findTeam(atlanticTeams, metropolitanTeams, centralTeams, pacificTeams, remainingGames[index].team1);
      let team2 = findTeam(atlanticTeams, metropolitanTeams, centralTeams, pacificTeams, remainingGames[index].team2);


      //This is important because we need updated points and current pos data of user team which will be used in comparisons
      let userTeamFromTable = findTeam(atlanticTeams, metropolitanTeams, centralTeams, pacificTeams, reqTeam.getName());

      let winningTeam;

      if (team1.getName() === reqTeam.getName()) {
        // If team1 is the user’s selected team (reqTeam), award them a win (2 points).
        team1.incrementPointsBy2();
        winningTeam = team1;
        userTeamRemainingGames--;


      } else if (team2.getName() === reqTeam.getName()) {
        // If team2 is the user’s selected team, award them the win.
        team2.incrementPointsBy2();
        winningTeam = team2;
        userTeamRemainingGames--;


      } else if ((team1.getDivision() === reqTeam.getDivision()) && !(team2.getDivision() === reqTeam.getDivision())) {
        // If team1 is in the same division as the user’s team (but isn't the user’s team), and team2 is not —
        // I want to avoid giving points to rivals in the same division,
        // so I let the out-of-division team (team2) win.
        team2.incrementPointsBy2();
        winningTeam = team2;

      } else if (!(team1.getDivision() === reqTeam.getDivision()) && (team2.getDivision() === reqTeam.getDivision())) {
        // Same as above, but reversed roles: team2 is a divisional rival (not the user’s team), team1 is not.
        // So we let team1 win to hurt the rival’s playoff chances.
        team1.incrementPointsBy2();
        winningTeam = team1;

      } else if ((team1.getDivision() === reqTeam.getDivision()) && (team2.getDivision() === reqTeam.getDivision())) {
        // Both teams are in the same division as the user’s team (but neither is the user’s team).
        // In this case, we should decide using a greedy approach which team winning helps the user’s team more 

        let userTeamMaxReachablePoints = userTeamFromTable.getPoints() + (userTeamRemainingGames * 2);
        // ─── Scenario 1: Both teams are ranked above (better than) the user’s team goal of this is to keep the 3rd that is qualifying pos points as low or reachable as possible
        if ((team1.getPosition() < userTeamFromTable.getPosition()) && (team2.getPosition() < userTeamFromTable.getPosition())) {

          if (team1.getPoints() !== team2.getPoints()) {
            //Choose which team is stronger and which is weaker
            let stronger = team1;
            let weaker = team2;

            if (team2.getPoints() > team1.getPoints()) {
              stronger = team2;
              weaker = team1;
            }

            if (stronger.getPosition() === 3 && weaker.getPosition() >= 4) {
              //contest is of 3rd and 4th position
              if (userTeamMaxReachablePoints < stronger.getPoints()) {
                //if user cant reach 3rd even with every game let 4th win to keep 3rd threshold as low as possible 
                weaker.incrementPointsBy2();
                winningTeam = weaker;
              } else if ((weaker.getPoints() - userTeamFromTable.getPoints() <= 2) || ((weaker.getPosition() + 1) === userTeamFromTable.getPosition())) {
                //user can reach 3rd position  is on 5th position and reaching 4th is possible with only one win so let the stronger team win to get to 4th position as quickly as possible 
                if (userTeamMaxReachablePoints < (stronger.getPoints() + 2)) {
                  //if winning of stronger will close users doors to 3rd dont let it win
                  weaker.incrementPointsBy2();
                  winningTeam = weaker;
                } else {
                  stronger.incrementPointsBy2();
                  winningTeam = stronger;
                }
              } else {
                //Reaching 3rd is possible but cant reach 4th with only one win so let 4th win to keep the 3rd place bar lower
                weaker.incrementPointsBy2();
                winningTeam = weaker;
              }
            } else {
              //teams are not on 3rd and 4th position
              // Let the stronger rival win
              if (team1.getPoints() > team2.getPoints()) {
                team1.incrementPointsBy2();
                winningTeam = team1;
              } else if (team1.getPoints() < team2.getPoints()) {
                team2.incrementPointsBy2();
                winningTeam = team2;
              }
            }
          } else {
            // If they’re tied on points, pick a random winner
            winningTeam = randomTeamWinBy2Points(team1, team2);
          }

        }

        // ─── Scenario 2: Both teams are ranked below (worse than) the user’s team
        else if ((team1.getPosition() > userTeamFromTable.getPosition()) && (team2.getPosition() > userTeamFromTable.getPosition())) {
          // Let the weaker rival win to minimize the threat from below
          if (team1.getPoints() > team2.getPoints()) {
            team2.incrementPointsBy2();
            winningTeam = team2;
          } else if (team1.getPoints() < team2.getPoints()) {
            team1.incrementPointsBy2();
            winningTeam = team1;
          } else {
            // If they’re tied on points, pick a random winner
            winningTeam = randomTeamWinBy2Points(team1, team2);
          }

        }

        // ─── Scenario 3: team1 is below the user and team2 is above the user
        else if ((team1.getPosition() > userTeamFromTable.getPosition()) && (team2.getPosition() < userTeamFromTable.getPosition())) {
          // Let team1 (the weaker threat) win to hurt the stronger rival if user have games available that it can win to cross the weaker rival
          if (userTeamRemainingGames != 0) {
            if (team1.getPoints() < team2.getPoints()) {
              team1.incrementPointsBy2();
              winningTeam = team1;
            } else {
              // If they’re tied on points, pick a random winner
              winningTeam = randomTeamWinBy2Points(team1, team2);
            }
          } else {
            //All games of users team have been completed so we should hold our place and let the team above us win
            if (team1.getPoints() < team2.getPoints()) {
              team2.incrementPointsBy2();
              winningTeam = team2;
            } else {
              // If they’re tied on points, pick a random winner
              winningTeam = randomTeamWinBy2Points(team1, team2);
            }
          }

        }

        // ─── Scenario 4: team1 is above the user and team2 is below the user
        else if ((team1.getPosition() < userTeamFromTable.getPosition()) && (team2.getPosition() > userTeamFromTable.getPosition())) {
          // Let team2 (the weaker threat) win to hurt the stronger rival if user have games available that it can win to cross the weaker rival
          if (userTeamRemainingGames != 0) {
            if (team2.getPoints() < team1.getPoints()) {
              team2.incrementPointsBy2();
              winningTeam = team2;
            } else {
              // If they’re tied on points, pick a random winner
              winningTeam = randomTeamWinBy2Points(team1, team2);
            }
          } else {
            //All games of users team have been completed so we should hold our place and let the team above us win
            if (team2.getPoints() < team1.getPoints()) {
              team1.incrementPointsBy2();
              winningTeam = team1;
            } else {
              // If they’re tied on points, pick a random winner
              winningTeam = randomTeamWinBy2Points(team1, team2);
            }
          }
        }



      } else {
        // Neither team is in the same division as the user’s team.
        // Their result has minimal playoff impact on the user, so choose the winner randomly.
        winningTeam = randomTeamWinBy2Points(team1, team2);
      }

      //Sort every division in descending order before completion
      sortAndGivePos(atlanticTeams);
      sortAndGivePos(metropolitanTeams);
      sortAndGivePos(centralTeams);
      sortAndGivePos(pacificTeams);

      const gameObject = {
        id: remainingGames[index].id,
        date: remainingGames[index].date,
        team1: team1,
        team2: team2,
        winner: winningTeam,
        time: remainingGames[index].time
      }

      completedGames.push(gameObject);
    }

    //Find final pos of users team
    let userTeam = findTeam(atlanticTeams, metropolitanTeams, centralTeams, pacificTeams, reqTeam.getName());
    userFinalPos = userTeam.getPosition();


    //Check if their is a tie of points in directly qualifying positions
    let clashExist = clashExistInQualiyingPos(atlanticTeams, metropolitanTeams, centralTeams, pacificTeams, reqTeam.getDivision(), userTeam);

    setatlanticDivision(atlanticTeams);
    setmetropolitanDivision(metropolitanTeams);
    setcentralDivision(centralTeams);
    setpacificDivision(pacificTeams);
    setGamesToDisplay(completedGames);
    setUserTeamPos(userFinalPos);
    setPointsTied(clashExist);
    setSimulationCompleted(true);

  }

  if (loadingWithText) {
    return <SpinnerText />
  }

  if (loading) {
    return <SpinnerNoText />
  }

  if (!reqTeam) {
    return <h2 className='font-bold text-center text-2xl py-2'>No Team Found</h2>;
    ;
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

              <Link href={`/randomSim/${teamID}`}>
                <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 hover:cursor-pointer">
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-800 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                    Click to start random simulation for next season schedule
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </>
    )

  }

  return (
    <>
      <div className={`transition-opacity ease-in duration-800 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        <h2 className='font-bold text-center text-2xl py-2'>Points tables</h2>

        <div className="h-1 opacity-10 bg-white my-3"></div>

        {showContent && (
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
              <div className='flex flex-col gap-2 md:flex-row justify-center md:gap-20 flex-wrap'>
                <DivisionTable title="Central Division" teams={centralDivision} />
                <DivisionTable title="Pacific Division" teams={pacificDivision} />
              </div>
            </div>

          </div>


        )}

        <div className="h-1 opacity-10 bg-white my-3"></div>

        {seasonEnded && (
          <div className='flex flex-col items-center mb-3 gap-1'>
            <p className='font-bold'>
              The latest season has ended
            </p>
            <div className='flex gap-1 justify-center items-center'>
              <img className='w-8 h-8' src={reqTeam.getLogo()} alt="" />
              <p> {reqTeam.getName()} have finished this season</p>
            </div>


            <Link href={`/randomSim/${teamID}`}>
              <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 hover:cursor-pointer">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-800 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                  Click to start random simulation for next season schedule
                </span>
              </button>
            </Link>
          </div>
        )}

        {
          (!seasonEnded && !simulationCompleted) && (
            <div className='flex flex-col justify-center items-center gap-2'>
              <div className='flex gap-1 justify-center items-center'>
                <img className='w-8 h-8' src={reqTeam.getLogo()} alt="" />
                <p> {reqTeam.getName()} is currently at position: <span className='font-semibold'>{userTeamPos}</span></p>
              </div>

              <p className="text-center md:text-lg">
                The algorithm will now run on the remaining games of schedule, aiming to position <span className="font-semibold">{reqTeam.getName()}</span> in at least 3rd place within the <span className="font-semibold">{reqTeam.getDivision()}</span> by the end of the season to secure playoff qualification.
              </p>


              <button onClick={startSimulation} className="ml-1.5 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 hover:cursor-pointer">
                <span className="relative  px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-800 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                  Start Simulation
                </span>
              </button>

            </div>
          )
        }

        {
          (simulationCompleted) &&
          (<div className='flex flex-col gap-2 items-center justify-center w-full mb-2'>
            <h3 className='text-xl font-bold'>Simulation</h3>

            <p className="text-center md:text-lg mb-2">
              {`After simulating all remaining games, the ${reqTeam.getName()} finished in position: ${userTeamPos} `}
            </p>

            {
              (!pointsTied) &&
              <p className="text-center md:text-lg mb-2">
                {
                  (userTeamPos <= 3)
                    ? "Success! The algorithm placed your team in the top three—securing a direct playoff position without needing a wild-card entry."
                    : "Unfortunately, the algorithm fell short of a top-three finish, meaning your team must rely on a wild-card playoff entry."
                }
              </p>
            }

            {
              (pointsTied) &&
              <p className="text-center md:text-lg mb-2">
                The algorithm has matched your team's points with those of the top three teams; however, a tie exists among the top three qualifying positions, and {reqTeam.getName()} shares the same score. As a result, {reqTeam.getName()}'s direct qualification will be decided according to tie-breaker rules.
              </p>


            }

            <p className="text-center md:text-lg mb-2">
              There’s also a quick random simulation for next season—pick any number of games and see where {reqTeam.getName()} could finish. It’s a simple way to try different what-if lengths without changing this run.
            </p>

            <Link href={`/randomSim/${teamID}`}>
              <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 hover:cursor-pointer">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-800 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                  Click to start random simulation for next season schedule
                </span>
              </button>
            </Link>

            <p className="text-center md:text-lg">
              Below is the detailed game results of the remaining {gamesSimulated} games in simulation that resulted in this final standing:
            </p>


            <div className='md:w-[80%]'>
              <div className='flex flex-col gap-2 w-full'>
                {
                  gamesToDisplay.map((match) => (
                    <MatchCard key={match.id} match={match} />
                  ))
                }

              </div>
            </div>
          </div >
          )

        }

      </div>

    </>
  )
}

export default Team