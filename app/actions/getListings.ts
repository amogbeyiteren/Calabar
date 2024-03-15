// Importing the Prisma client from the 'prismadb' module
import prisma from "@/app/libs/prismadb";

// Defining an interface for the input parameters of the function
export interface IListingsParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

// Exporting the function as the default export
export default async function getListings(params: IListingsParams) {
  try {
    // Destructuring the input parameters into separate variables
    const {
      userId,
      roomCount, 
      guestCount, 
      bathroomCount, 
      locationValue,
      startDate,
      endDate,
      category,
    } = params;

    // Initializing the 'query' object with empty object
    let query: any = {};

    // If a userId is provided, add it to the query object
    if (userId) {
      query.userId = userId;
    }

    // If a category is provided, add it to the query object
    if (category) {
      query.category = category;
    }

    // If a roomCount is provided, add it to the query object as a greater than or equal to condition
    if (roomCount) {
      query.roomCount = {
        gte: +roomCount
      }
    }

    // If a guestCount is provided, add it to the query object as a greater than or equal to condition
    if (guestCount) {
      query.guestCount = {
        gte: +guestCount
      }
    }

    // If a bathroomCount is provided, add it to the query object as a greater than or equal to condition
    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount
      }
    }

    // If a locationValue is provided, add it to the query object
    if (locationValue) {
      query.locationValue = locationValue;
    }

    // If both startDate and endDate are provided, add a NOT condition to exclude the listings that have overlapping reservations
    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate }
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate }
              }
            ]
          }
        }
      }
    }

    // Query the database using the 'query' object and order the results by createdAt timestamp in descending order
    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Map the results to a new array with 'createdAt' timestamp converted to ISO string format
    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    // Return the resulting array
    return safeListings;
  } catch (error: any) {
    // If an error occurs, re-throw it
    throw new Error(error);
  }
}
