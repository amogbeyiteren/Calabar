import { FaUserCircle, FaStar } from 'react-icons/fa';
import { SafeReview } from '@/app/types';

interface ReviewsSectionProps {
  reviews: SafeReview[];
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews }) => {
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold mb-4">Reviews For This Property</h2>
      <div className="flex flex-col gap-4">
        {/* Display fetched reviews */}
        {reviews.map((review, index: number) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center mb-2">
              <FaUserCircle className="h-8 w-8 text-gray-500 mr-2" />
              <span className="font-semibold">{review.user.name}</span>
            </div>
            <div className="flex items-center mb-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, starIndex: number) => (
                  <FaStar
                    key={starIndex}
                    className={`h-5 w-5 text-yellow-400 ${
                      starIndex < review.rating ? 'text-yellow-500' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              {/* <span className="ml-2">{review.rating}</span> */}
            </div>
            <p>{review.comment}</p>
          </div>
        ))}
        {/* Display a message if no reviews */}
        {reviews.length === 0 && <p>No reviews found for this property.</p>}
      </div>
    </div>
  );
};

export default ReviewsSection;
