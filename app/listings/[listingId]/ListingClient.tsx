'use client'

// Import necessary dependencies and types
import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { Range } from "react-date-range";
import { useRouter } from "next/navigation";
import { differenceInDays, eachDayOfInterval } from 'date-fns';

import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";

import Container from "@/app/components/Container";
import { categories, centers } from "@/app/components/navbar/Categories";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingReservation from "@/app/components/listings/ListingReservation";
import ReviewsSection from "@/app/components/listings/ReviewSection";

// Initial and default date ranges to be used
const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
};

// Define the ListingClientProps interface with reviews property
interface ListingClientProps {
  listing: SafeListing & {
    user: SafeUser;
  };
  reservations?: SafeReservation[];
  reviews: any[]; // Adjust the type as per the actual type of reviews
  currentUser?: SafeUser | null;
}

// Define the ListingClient component
const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  reservations = [],
  reviews = [], // Initialize reviews with an empty array
  currentUser
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  // Logic to find disabled dates
  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate)
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  // Memoized category and center based on listing
  const category = useMemo(() => {
     return categories.find((items) => items.label === listing.category);
  }, [listing.category]);

  const center = useMemo(() => {
    return centers.find((items) => items.label === listing.center);
  }, [listing.center]);

  // State and handlers for reservation creation
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const onCreateReservation = useCallback(() => {
      if (!currentUser) {
        return loginModal.onOpen();
      }
      setIsLoading(true);

      axios.post('/api/reservations', {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id
      })
      .then(() => {
        toast.success('Listing reserved!');
        setDateRange(initialDateRange);
        router.push('/trips');
      })
      .catch(() => {
        toast.error('Something went wrong.');
      })
      .finally(() => {
        setIsLoading(false);
      })
  },
  [
    totalPrice, 
    dateRange, 
    listing?.id,
    router,
    currentUser,
    loginModal
  ]);

  // Effect to calculate total price based on selected date range
  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(
        dateRange.endDate, 
        dateRange.startDate
      );
      
      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

  // Handler for payment success
  const handlePaymentSuccess = useCallback(() => {
    onCreateReservation(); // Trigger reservation creation logic
  }, [onCreateReservation]);

  // Render the component
  return ( 
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="">
          {/* ListingHead component */}
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />

          <div className="flex gap-6"></div>

          <div className="mt-6">
            {/* ListingInfo component */}
            <ListingInfo
              user={listing.user}
              category={category}
              center={center}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
              phoneNumber={listing.phoneNumber}
            />

            <div className="order-first mb-10 md:order-last md:col-span-3">
              {/* ListingReservation component */}
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                onPaymentSuccess={handlePaymentSuccess}
                disabled={isLoading}
                disabledDates={disabledDates}
              />

              {/* ReviewsSection component */}
              <ReviewsSection reviews={reviews} />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
 
export default ListingClient;
