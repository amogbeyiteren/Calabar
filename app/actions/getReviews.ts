// Importing the Prisma client from the 'prismadb' module
import prisma from "@/app/libs/prismadb";

// Defining an interface for the input parameters of the function
export interface IReviewsParams {
  listingId: string;
}

// Exporting the function as the default export
export default async function getReviews(params: IReviewsParams) {
  try {
    // Destructuring the input parameters into separate variables
    const { listingId } = params;

    // Query the database to find reviews for the given listingId
    const reviews = await prisma.review.findMany({
      where: {
        listingId
      },
      include: {
        user: true // Include the user associated with each review
      },
      orderBy: {
        createdAt: 'desc' // Order the reviews by createdAt timestamp in descending order
      }
    });

    // Map the results to a new array with 'createdAt' timestamp converted to ISO string format
    const safeReviews = reviews.map((review) => ({
      ...review,
      createdAt: review.createdAt.toISOString(),
    }));

    // Return the resulting array
    return safeReviews;
  } catch (error: any) {
    // If an error occurs, re-throw it
    throw new Error(error);
  }
}
