// app/api/content/route.js
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // Prevent caching so data is always fresh

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function GET() {
    try {
        const today = new Date().toISOString();

        // 1. Run Supabase queries in parallel for speed
        const [eventsResult, galleryResult] = await Promise.all([
            supabase.from('events').select('*').order('date', { ascending: false }),
            supabase.from('gallery_items').select('*').order('display_order', { ascending: true })
        ]);

        // Check for errors
        if (eventsResult.error) throw eventsResult.error;
        if (galleryResult.error) throw galleryResult.error;

        const allEvents = eventsResult.data;
        const gallery = galleryResult.data;

        // 2. Process Events (Server-side filtering is faster)
        const upcoming = allEvents
            .filter(e => e.date >= today)
            .reverse(); // Show soonest event first

        const past = allEvents
            .filter(e => e.date < today); // Show newest past event first

        // 3. Return consolidated data
        return NextResponse.json({
            events: { upcoming, past },
            gallery
        });

    } catch (error) {
        console.error('Content API Error:', error);
        return NextResponse.json({
            events: { upcoming: [], past: [] },
            gallery: []
        }, { status: 500 });
    }
}