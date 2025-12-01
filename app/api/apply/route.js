// app/api/apply/route.js

import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server'; // Import NextResponse

export async function POST(req) {
    try {
        // This is a SERVER-ONLY Supabase client with admin privileges
        const supabaseAdmin = createClient(
            process.env.SUPABASE_URL,
            process.env.SUPABASE_SERVICE_ROLE_KEY,
            { auth: { persistSession: false } }
        );

        const body = await req.json();

        // Your validation is good!
        const required = ['name', 'email', 'phone', 'prn', 'branch', 'year', 'motivation'];
        for (const k of required) {
            if (!body[k]) {
                return NextResponse.json({ error: `${k} is required` }, { status: 400 });
            }
        }

        const insertObj = {
            name: body.name,
            email: body.email,
            phone: body.phone,
            prn: body.prn,
            branch: body.branch,
            year: body.year,
            motivation: body.motivation,
            experience: body.experience || null
        };

        const { error } = await supabaseAdmin.from('applications').insert(insertObj);

        if (error) {
            console.error('Supabase Insert Error:', error);

            // Check for the specific "duplicate key" error code
            if (error.code === '23505') {
                return NextResponse.json(
                    { message: 'A user with this PRN has already applied. if not you, DM us on our social media at bottom' },
                    { status: 409 } // 409 Conflict is the correct status for a duplicate
                );
            }

            // For all other database errors, return a generic server error
            return NextResponse.json(
                { message: 'Could not submit application due to a database error.' },
                { status: 500 }
            );
        }
        // Send a success response
        return NextResponse.json({ message: 'Application submitted successfully!' }, { status: 201 });

    } catch (e) {
        console.error('API Route Error:', e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}