'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-black/60 backdrop-blur-sm border-b border-white/10">
      <div className="flex h-16 items-center justify-between px-3">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
          <img className=" w-8 h-8 md:w-10 md:h-10" src="/hockey.png" alt="" />
          <h1 className="font-bold text-xl md:text-2xl">PlayoffPathfinder</h1>
        </Link>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center">
          <Link href="/schedule" className="group">
            <button className="hover:cursor-pointer relative inline-flex items-center justify-center p-0.5 mb-0 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                Schedule
              </span>
            </button>
          </Link>
          <Link href="/standings" className="group">
            <button className="hover:cursor-pointer relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                Standings
              </span>
            </button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          aria-label="Menu"
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => setOpen(o => !o)}
        >
          {/* simple hamburger svg */}
          <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true" className="fill-white">
            <path d="M3 6h18v2H3zM3 11h18v2H3zM3 16h18v2H3z" />
          </svg>
        </button>
      </div>
      {/* Mobile dropdown */}
      <div
        className={`
          md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-in
          ${open ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}
          border-t border-white/10
        `}
      >
        <div className="px-3 py-2 flex flex-col gap-2 bg-black/95 backdrop-blur">
          <Link href="/schedule" onClick={() => setOpen(false)}>
            <button className="w-full hover:cursor-pointer relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
              <span className="w-full text-center relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                Schedule
              </span>
            </button>
          </Link>
          <Link href="/standings" onClick={() => setOpen(false)}>
            <button className="w-full hover:cursor-pointer relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
              <span className="w-full text-center relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                Standings
              </span>
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}