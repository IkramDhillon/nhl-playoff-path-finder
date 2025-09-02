import React from 'react'
import teams from '@/data/Teams'
import DivisionList from '@/components/DivisionList';

const page = () => {
    const teamList = new teams();
    const atlanticDivision = teamList.getTeamByDivision("Atlantic Division");
    const metropolitanDivision = teamList.getTeamByDivision("Metropolitan Division");
    const pacificDivision = teamList.getTeamByDivision("Pacific Division");
    const centralDivision = teamList.getTeamByDivision("Central Division");


    return (
        <>

            <h2 className='font-bold text-center text-2xl py-2'>Select Your Favourite Team</h2>

            <div className="h-1 opacity-10 bg-white my-3"></div>

            <div className='flex flex-col gap-2 md:flex-row justify-center md:gap-20 flex-wrap'>

                <div className='md:w-[40%]'>
                    <DivisionList title={"Atlantic Division"} team0={atlanticDivision[0]} team1={atlanticDivision[1]} team2={atlanticDivision[2]} team3={atlanticDivision[3]} team4={atlanticDivision[4]} team5={atlanticDivision[5]} team6={atlanticDivision[6]} team7={atlanticDivision[7]} />
                </div>

                <div className='md:w-[40%]'>
                    <DivisionList title={"Metropolitan Division"} team0={metropolitanDivision[0]} team1={metropolitanDivision[1]} team2={metropolitanDivision[2]} team3={metropolitanDivision[3]} team4={metropolitanDivision[4]} team5={metropolitanDivision[5]} team6={metropolitanDivision[6]} team7={metropolitanDivision[7]} />
                </div>
            </div>
            <div className="h-1 opacity-10 bg-white my-3"></div>

            <div className='flex flex-col gap-2 md:flex-row justify-center md:gap-20 flex-wrap mb-3'>
                <div className='md:w-[40%]'>
                    <DivisionList title={"Central Division"} team0={centralDivision[0]} team1={centralDivision[1]} team2={centralDivision[2]} team3={centralDivision[3]} team4={centralDivision[4]} team5={centralDivision[5]} team6={centralDivision[6]} team7={centralDivision[7]} />
                </div>


                <div className='md:w-[40%]'>
                    <DivisionList title={"Pacific Division"} team0={pacificDivision[0]} team1={pacificDivision[1]} team2={pacificDivision[2]} team3={pacificDivision[3]} team4={pacificDivision[4]} team5={pacificDivision[5]} team6={pacificDivision[6]} team7={pacificDivision[7]} />
                </div>
            </div>
        </>
    )
}

export default page