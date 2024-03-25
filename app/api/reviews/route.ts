import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { listingId, rating, comment } = body;

  // Validate required fields
  if (!listingId || !rating) {
    return NextResponse.error();
  }

  // Ensure listing exists
  const existingListing = await prisma.listing.findUnique({
    where: { id: listingId },
  });

  if (!existingListing) {
    return NextResponse.error();
  }

  // Create the review
  const review = await prisma.review.create({
    data: {
      userId: currentUser.id,
      listingId,
      rating: parseInt(rating, 10),
      comment,
    },
    include: {
      user: true,
      listing: true,
    },
  });

  return NextResponse.json(review);
}
