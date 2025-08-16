import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    await req.json();
    // TODO: send email/store message
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}


