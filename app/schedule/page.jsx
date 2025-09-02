'use client'
import React, { useEffect, useState } from 'react'
import Spinner from '@/components/SpinnerWithText';
import teams from '@/data/Teams';
import ScheduleCard from '@/components/ScheduleCard';


const schedule = () => {

  const teamList = new teams;
  const [gamesToDisplay, setGamesToDisplay] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchSchedule() {
    const res = await fetch('/api/nhl-schedule');
    const data = await res.json();

    let games = [];

    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      let scheduleTeam1 = teamList.getTeamByName(element.team1);
      let scheduleTeam2 = teamList.getTeamByName(element.team2);

      const gameObject = {
        id: element.id,
        date: element.date,
        team1: scheduleTeam1,
        team2: scheduleTeam2,
        time: element.time
      }

      games.push(gameObject);
    }

    setGamesToDisplay(games);
    setLoading(false);
  }

  useEffect(() => {
    fetchSchedule();
  }, [])

  if (loading) {
    return <Spinner />
  }

  return (
    <div className='flex items-center justify-center my-2'>
      <div className='w-[60%] md:w-[80%]'>
        <div className='flex flex-col gap-2 w-full'>
          {
            gamesToDisplay.map(
              (match) =>
                <ScheduleCard key={match.id} match={match} />

            )
          }
        </div>
      </div>
    </div>
  )
}

export default schedule