import { NextResponse } from "next/server";
import { createPublicOrder } from "@/lib/services/order-service";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const result = await createPublicOrder(payload);
    if (result.duplicate) {
      return NextResponse.json({ success: true, duplicate: true, orderNo: result.orderNo }, { status: 200 });
    }
    return NextResponse.json({ success: true, orderNo: result.orderNo }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Invalid request", error: String(error) }, { status: 400 });
  }
}
