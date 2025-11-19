import { supabaseServer } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const supabase = await supabaseServer();
    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    try {
        const { password } = await request.json();

        if (!password || password.length < 6) {
            return NextResponse.json(
                { error: "Password must be at least 6 characters long" },
                { status: 400 }
            );
        }

        const { error } = await supabase.auth.updateUser({
            password: password,
        });

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error changing password:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
