import { NextResponse } from "next/server";

const couriers = [
  { code: "jnt", name: "J&T Express", supports_cod: true },
  { code: "spx", name: "SPX Express", supports_cod: true },
  { code: "self_pickup", name: "Self Pickup", supports_cod: false },
];

export async function GET() {
  return NextResponse.json({ success: true, data: couriers });
}
