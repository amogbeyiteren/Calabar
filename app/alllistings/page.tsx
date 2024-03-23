import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import EmptyState from "@/app/components/EmptyState";

import getListings, { IListingsParams } from "@/app/actions/getListings";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "../components/ClientOnly";

interface HomeProps {
  searchParams: IListingsParams;
}

const page = async ({ searchParams }: HomeProps) => {
  // Move dynamic data retrieval outside of try/catch
  const listingsPromise = getListings(searchParams);
  const currentUserPromise = getCurrentUser();

  try {
    // Await the promises inside try block
    const listings = await listingsPromise;
    const currentUser = await currentUserPromise;

    if (listings.length === 0) {
      return (
        <ClientOnly>
          <EmptyState showReset />
        </ClientOnly>
      );
    }

    return (
      <ClientOnly>
        <Container>
          <div
            className="
              pt-24
              grid
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              xl:grid-cols-5
              2xl:grid-cols-5
              gap-8
            "
          >
            {listings.map((listing: any) => (
              <ListingCard
                currentUser={currentUser}
                key={listing.id}
                data={listing}
              />
            ))}
          </div>
        </Container>
      </ClientOnly>
    );
  } catch (error) {
    // Handle errors here if necessary
    console.error('Error occurred while fetching data:', error);
    return (
      <div>
        <p>Error occurred while fetching data. Please try again later.</p>
      </div>
    );
  }
};

export default page;
