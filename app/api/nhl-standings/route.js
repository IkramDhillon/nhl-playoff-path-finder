import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://site.web.api.espn.com/apis/v2/sports/hockey/nhl/standings?seasontype=2&type=0&level=3');

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch NHL standings' }, { status: 500 });
    }

    const data = await res.json();
 
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}