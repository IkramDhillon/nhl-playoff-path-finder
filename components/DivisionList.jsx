import React from 'react'
import TeamButton from './TeamButton'

const DivisionList = ({ title, team0, team1, team2, team3, team4, team5, team6, team7 }) => {
    return (
        <div className='Metropolitan Division flex flex-col items-center border-2 border-gray-900 rounded-lg p-2'>

            <h3 className='font-bold text-lg pb-2'>{title}</h3>

           

                <div className='flex flex-col gap-2 w-full'>

                    <TeamButton team={team0} />
                    <TeamButton team={team1} />
                    <TeamButton team={team2} />
                    <TeamButton team={team3} />
                    <TeamButton team={team4} />
                    <TeamButton team={team5} />
                    <TeamButton team={team6} />
                    <TeamButton team={team7} />

                </div>

          

        </div>
    )
}

export default DivisionList