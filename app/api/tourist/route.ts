import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import verifyAdmin from "@/app/actions/verifyAdmin";

export async function POST(request: Request) {
  const user = await verifyAdmin(request); // Check if user is admin

  if (!user) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { name, location, image } = body; // Destructure required fields

  if (!name || !location) {
    return NextResponse.error();
  }

  try {
    const touristCenter = await prisma.touristCenter.create({
      data: {
        name,
        location,
        image, // Optional image field
      },
    });

    return NextResponse.json(touristCenter);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
