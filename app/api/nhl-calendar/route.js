import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const res = await fetch('https://site.api.espn.com/apis/site/v2/sports/hockey/nhl/scoreboard');
       

        if (!res.ok) {
            return NextResponse.json({ error: 'Failed to fetch NHL calendar' }, { status: 500 });
        }

        const data = await res.json();

        const fullCalendar = [];

        //This function stores each date from calendar to fullCalendar from 2025-09-20T07:00Z format to 20250920
        for (let i = 0; i < data.leagues[0].calendar.length; i++) {
            fullCalendar.push(data.leagues[0].calendar[i].split("T")[0]);
        }

        return NextResponse.json(fullCalendar);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}