import React from 'react'

const ScheduleCard = ({ match }) => {
    let logoSize = 30;

    return (
        <div className='flex flex-col md:flex-row md:h-20 border-2 border-black items-center justify-center md:justify-around rounded-lg bg-gray-900 hover:bg-gray-800 transition-all duration-300 gap-2 md:gap-0 p-3 md:p-0 text-center'>
            <span>{match.date}</span>
            <div className='w-full md:w-[40%] grid grid-cols-[1fr_auto_1fr] items-center gap-2'>
                <div className='flex gap-1 justify-center items-center'>
                    <img className='' width={logoSize} src={match.team1.getLogo()} alt="" />
                    {match.team1.getName()}
                </div>

                <p>vs</p>

                <div className='flex gap-1 justify-center items-center'>
                    <img className='' width={logoSize} src={match.team2.getLogo()} alt="" />
                    {match.team2.getName()}
                </div>

            </div>
            <div className='flex flex-col gap-1 justify-center items-center w-full md:w-[20%]'>
                <h3 className='text-lg font-semibold'>Time</h3>

                <p>{match.time}</p>

            </div>
        </div>
    )
}

export default ScheduleCard