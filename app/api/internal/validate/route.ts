import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (Object.values(body as {
      [key: string]: string
    }).some((value: string) => value.length > 100)) {
      return NextResponse.json({ error: { en: "Input too large" } }, { status: 400 });
    }
    const res = await fetch(`${process.env.EMAIL_SERVICE_URL}/validate_email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ error: { en: 'Internal Server Error' } }, { status: 500 });
  }
}