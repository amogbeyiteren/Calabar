import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import getReviews, { IReviewsParams } from "@/app/actions/getReviews";
import getReservations from "@/app/actions/getReservations";

import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";

import ListingClient from "./ListingClient";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  const reviewsParams: IReviewsParams = {
    listingId: params.listingId || "", // Ensure listingId is provided or set a default value
  };

  const [reviews, reservations, currentUser] = await Promise.all([
    getReviews(reviewsParams),
    getReservations(params),
    getCurrentUser(),
  ]);

  return (
    <ClientOnly>
      <ListingClient
        listing={listing}
        reviews={reviews}
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default ListingPage;
