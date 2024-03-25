import { Listing, Reservation, User, Review } from "@prisma/client";

// Define SafeListing, SafeReservation, and SafeUser types
export type SafeListing = Omit<Listing, "createdAt"> & {
  createdAt: string;
};

export type SafeReservation = Omit<
  Reservation,
  "createdAt" | "startDate" | "endDate" | "listing"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing;
};

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

// Modify SafeReview to reflect the changes in SafeUser and SafeListing
export type SafeReview = Omit<
  Review,
  "createdAt" | "userId" | "listingId" | "user" | "listing"
> & {
  createdAt: string;
  userId: string;
  listingId: string;
  user: SafeUser;
  listing: SafeListing;
};
