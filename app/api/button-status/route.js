export const dynamic = 'force-dynamic';

import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

function getSupabaseClient() {
    return createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_ANON_KEY,
        { auth: { persistSession: false } }
    );
}

// Public GET function: Reads the status from the dedicated table
export async function GET() {
    try {
        const supabase = getSupabaseClient();
        const { data, error } = await supabase
            .from('enrollment_status')
            .select('enabled')
            .limit(1)
            .single();

        if (error) {
            // PGRST116 (No rows found) might mean the table is empty.
            if (error.code === 'PGRST116' || error.message.includes('No rows found')) {
                // Default to true if the table is empty
                return NextResponse.json({ enabled: true });
            }
            throw error;
        }

        // The data object will be { enabled: true/false }
        return NextResponse.json({ enabled: data.enabled });

    } catch (error) {
        console.error('GET Error:', error);
        // Fallback to enabled on server error
        return NextResponse.json({ enabled: true }, { status: 200 });
    }
}

// Admin POST function: Updates the status in the dedicated table
export async function POST(req) {
    try {
        // --- ADMIN KEY CHECK ---
        const adminKey = req.headers.get('x-admin-key');
        if (adminKey !== process.env.ADMIN_KEY) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const supabaseAdmin = createClient(
            process.env.SUPABASE_URL,
            process.env.SUPABASE_SERVICE_ROLE_KEY,
            { auth: { persistSession: false } }
        );

        // Get the new state from the request body
        const { enabled } = await req.json(); // Expecting { "enabled": true/false }

        const { error } = await supabaseAdmin
            .from('enrollment_status')
            .update({ enabled: enabled })
            .eq('id', 1); // Assuming you always update the first (and only) row

        if (error) {
            throw error;
        }

        return NextResponse.json({ ok: true });

    } catch (error) {
        console.error('POST Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}