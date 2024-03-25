import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import EmptyState from "@/app/components/EmptyState";

import getListings, { IListingsParams } from "@/app/actions/getListings";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "@/app/components/ClientOnly";

interface HomeProps {
  searchParams: IListingsParams;
  params: any;
}

const Home = async ({ params, searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  // Decode the center parameter
  const decodedCenter = decodeURIComponent(params.center);

  console.log(decodedCenter);

  // Filter listings for the decoded center
  const filteredListings = listings.filter(
    (listing) => listing.center === decodedCenter
  );

  if (filteredListings.length === 0) {
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
          {filteredListings.map((listing) => (
            <ListingCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
              showAddReviewButton={false}
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
};

export default Home;
