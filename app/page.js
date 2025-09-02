import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div className="flex justify-center h-[44vh] items-center flex-col gap-5">
        <div className="font-bold text-2xl flex justify-center gap-2">
          NHL Playoff Path Finder
          <img width={34} src="/hockey.png" alt="" />
        </div>

        <p className='text-center mx-2 md:m-0'>
          Track NHL match schedules, view live team standings, and simulate the best playoff scenarios for your favorite team with this interactive NHL Playoff Path Finder.
        </p>

        <Link href={"/simulator"}>
          <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 hover:cursor-pointer">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
              Start Here
            </span>
          </button>
        </Link>
      </div>

      <div className="h-1 opacity-10 bg-white"></div>

      <div className="container mx-auto">
        <div className="font-bold text-2xl text-center gap-2 my-14">
          Different options
        </div>
        <div className="options flex justify-around gap-5 my-4">

          <Link href="/schedule" className="group hover:cursor-pointer">
            <div className="schedule flex flex-col items-center justify-center gap-2">
              <img
                src="/schedule.gif"
                alt="Schedule"
                width={150}
                className="
                  bg-gray-900 rounded-full p-7
                  transition-transform duration-300 ease-[cubic-bezier(.2,.8,.2,1)]
                  transform-gpu origin-center
                  group-hover:scale-105            /* enlarge only on hover */
                "
              />
              <p
                className="
                  font-bold
                  transition-transform duration-300 ease-[cubic-bezier(.2,.8,.2,1)]
                  transform-gpu origin-center
                  group-hover:scale-105            /* label grows with the circle */
                "
              >
                View Schedule
              </p>
            </div>
          </Link>

          <Link href="/simulator" className="group hover:cursor-pointer">
            <div className="schedule flex flex-col items-center justify-center gap-2">
              <img
                src="/simulation.gif"
                alt="Simulations"
                width={150}
                className="
                  bg-gray-900 rounded-full p-7
                  transition-transform duration-300 ease-[cubic-bezier(.2,.8,.2,1)]
                  transform-gpu origin-center
                  group-hover:scale-105            /* enlarge only on hover */
                "
              />
              <p
                className="
                  font-bold
                  transition-transform duration-300 ease-[cubic-bezier(.2,.8,.2,1)]
                  transform-gpu origin-center
                  group-hover:scale-105            /* label grows with the circle */
                "
              >
                Run Simulations
              </p>
            </div>
          </Link>

          <Link href="/standings" className="group hover:cursor-pointer">
            <div className="schedule flex flex-col items-center justify-center gap-2">
              <img
                src="/position.gif"
                alt="Standings"
                width={150}
                className="
                  bg-gray-900 rounded-full p-7
                  transition-transform duration-300 ease-[cubic-bezier(.2,.8,.2,1)]
                  transform-gpu origin-center
                  group-hover:scale-105            /* enlarge only on hover */
                "
              />
              <p
                className="
                  font-bold
                  transition-transform duration-300 ease-[cubic-bezier(.2,.8,.2,1)]
                  transform-gpu origin-center
                  group-hover:scale-105            /* label grows with the circle */
                "
              >
                View Standings
              </p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
