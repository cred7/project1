import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const home = await req.json();
  const { name, nam, names } = home;
  const homes = [
    { name: name, names: names, nam: nam },
    { name: name, names: names, nam: nam },
  ];
  console.log(homes);
  return NextResponse.json(homes);
}

export async function GET(): Promise<NextResponse> {
  return NextResponse.json("hello");
}
