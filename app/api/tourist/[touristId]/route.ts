import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import verifyAdmin from "@/app/actions/verifyAdmin"; // Import function to check admin role

interface IParams {
  touristCenterId?: string;
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
  const user = await verifyAdmin(request); // Check if user is admin

  if (!user) {
    return NextResponse.error();
  }

  const { touristCenterId } = params;

  if (!touristCenterId || typeof touristCenterId !== "string") {
    return NextResponse.error();
  }

  try {
    const deletedTouristCenter = await prisma.touristCenter.delete({
      where: {
        id: touristCenterId,
      },
    });

    if (!deletedTouristCenter) {
      return NextResponse.error();
    }

    return NextResponse.json(deletedTouristCenter);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
