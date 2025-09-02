import React from 'react'
import Link from 'next/link';

const TeamButton = ({ team}) => {
    const teamButton = "flex h-20 border-2 border-black items-center justify-around rounded-lg bg-gray-900 hover:cursor-pointer hover:bg-gray-800 transition-all duration-300 ";
    const logoSize = 50;
    return (
        
        <Link href={`/teamPage/${team.getId()}`}>
            <div className={teamButton}>
                <img className='' width={logoSize} src={team.getLogo()} alt="" />
                <p>{team.getName()}</p>
            </div>
        </Link>
    )
}

export default TeamButton