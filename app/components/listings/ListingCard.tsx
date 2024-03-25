'use client'
import { useState, useCallback, useMemo } from 'react';
import { FaStar } from 'react-icons/fa';
import { useRouter } from 'next/navigation'; // Change import to 'next/router' for useRouter
import axios from 'axios';
import Image from 'next/image';
import { format } from 'date-fns';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import useCountries from '@/app/hooks/useCountries';
import HeartButton from '../HeartButton';
import Button from '../Button';

import { SafeListing, SafeReservation, SafeUser } from '@/app/types';

interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
  reviews?: Review[]; // Make reviews optional
  showAddReviewButton?: boolean; // New prop to control the visibility of the "Add Review" button
}

interface Review {
  id: string;
  userId: string;
  listingId: string;
  rating: number;
  comment?: string;
  createdAt: string;
  user: SafeUser;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = '',
  currentUser,
  reviews,
  showAddReviewButton = false, // Set default value for showAddReviewButton prop
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();
  const location = getByValue(data.locationValue);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) return;
      onAction?.(actionId);
    },
    [disabled, onAction, actionId]
  );

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleReviewSubmit = async () => {
    try {
      const response = await axios.post('/api/reviews', {
        listingId: data.id,
        rating,
        comment,
      });
      closeModal();
      toast.success('Review added successfully!');
    } catch (error) {
      toast.error('Failed to add review. Please try again later.');
    }
  };

  const price = useMemo(() => {
    if (reservation) return reservation.totalPrice;
    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) return null;
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);
    return `${format(start, 'PP')} - ${format(end, 'PP')}`;
  }, [reservation]);

  const handleClick = () => {
    if (!showAddReviewButton) {
      router.push(`/listings/${data.id}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="col-span-1 cursor-pointer group"
    >
      <div className="col-span-1 cursor-pointer group flex flex-col gap-2">
        <div className="aspect-square relative overflow-hidden rounded-xl">
          <Image
            fill
            className="object-cover h-full w-full group-hover:scale-110 transition"
            src={data.imageSrc}
            alt="Listing"
          />
          <div className="absolute top-3 right-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="font-semibold text-lg">{data.title}</div>
        <div className="font-light flex justify-between text-sm text-neutral-700">
          <div className="text-green-600 font-semibold">
            {reservationDate || data.category}
          </div>
          <div>
            {location?.region}, {location?.label}
          </div>
        </div>
        <div className="flex gap-1 items-center">
          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              className="text-yellow-400"
              onClick={() => setRating(index + 1)}
            />
          ))}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">₦ {price}</div>
          {!reservation && <div className="font-light">a day</div>}
        </div>
        {showAddReviewButton && ( // Conditionally render the "Add Review" button based on the showAddReviewButton prop
          <Button small label="Add Review" onClick={openModal} />
        )}
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
        {modalIsOpen && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                &#8203;
              </span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">
                        Add Review For This Property
                      </h3>
                      <div className="mt-2">
                        <p className='text-sm mb-1'>Give A Rating</p>
                        <div className="flex items-center mb-4">
                          {[...Array(5)].map((_, index) => (
                            <FaStar
                              key={index}
                              className={`text-xl cursor-pointer ${
                                index < rating ? 'text-yellow-400' : 'text-gray-400'
                              }`}
                              onClick={() => setRating(index + 1)}
                            />
                          ))}
                        </div>
                        <textarea
                          placeholder="Enter your review here..."
                          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 mb-4"
                          rows={4}
                          value={comment}
                          onChange={(e) => setComment
                            (e.target.value)}
                            ></textarea>
                            </div>
                            </div>
                            </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button
                                             onClick={handleReviewSubmit}
                                             className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                           >
                            Submit
                            </button>
                            <button
                                             onClick={closeModal}
                                             className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                           >
                            Cancel
                            </button>
                            </div>
                            </div>
                            </div>
                            </div>
                            )}
                            </div>
                            </div>
                            );
                            };
                            
                            export default ListingCard;
