import { NextResponse } from "next/server";

export async function GET() {
  try {
    const url = process.env.BENCHMARKS_API_URL;
    const token = process.env.BENCHMARKS_API_TOKEN;
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    // DEBUG: вернуть переменные и заголовки
    // return NextResponse.json({ url, headers, env_url: process.env.BENCHMARKS_API_URL, env_token: process.env.BENCHMARKS_API_TOKEN }, { status: 200 });

    if (!url) {
      throw new Error("BENCHMARKS_API_URL is not defined");
    }

    const response = await fetch(url, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      let debugBody = null;
      try {
        debugBody = await response.text();
      } catch {}
      return NextResponse.json(
        {
          error: "Failed to fetch benchmark metrics",
          url,
          headers,
          env_url: process.env.BENCHMARKS_API_URL,
          env_token: process.env.BENCHMARKS_API_TOKEN,
          status: response.status,
          statusText: response.statusText,
          responseBody: debugBody,
        },
        { status: 500 }
      );
    }

    const data = await response.json();

    return NextResponse.json(data, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch benchmark metrics (exception)",
        details: String(error),
        env_url: process.env.BENCHMARKS_API_URL,
        env_token: process.env.BENCHMARKS_API_TOKEN,
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
