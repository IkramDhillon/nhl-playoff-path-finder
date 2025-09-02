import React from 'react'


const DivisionTable = ({ title, teams }) => {
    return (
        <div className="border-2 border-gray-700 rounded-lg p-2">
            <h4 className='font-bold text-center'>{title}n</h4>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                Team name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                points
                            </th>

                        </tr>
                    </thead>
                    <tbody>

                        {
                            teams.map((team) => (
                                <tr key={team.getId()} className="border-b border-gray-200 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                        <div className='flex items-center gap-2'>
                                            {team.getPosition()}. 
                                            <img className='w-8 h-8' src={team.getLogo()} alt={team.getName()} />
                                            {team.getName()}
                                        </div>
                                    </th>
                                    <td className="px-6 py-4 text-center">
                                        {team.getPoints()}
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default DivisionTable