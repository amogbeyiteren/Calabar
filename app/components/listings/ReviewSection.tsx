import { FaUserCircle } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';

const ReviewsSection = () => {
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold mb-4">Reviews For This Property</h2>
    <div className="flex flex-col gap-4">
      {/* Sample review 1 */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center mb-2">
          <FaUserCircle className="h-8 w-8 text-gray-500 mr-2" />
          <span className="font-semibold">James Agogo</span>
        </div>
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <FaStar key={index} className="h-5 w-5 text-yellow-400" />
            ))}
          </div>
          <span className="ml-2">4.5</span>
        </div>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vulputate ipsum eu nibh consectetur, eget laoreet ipsum aliquet.</p>
      </div>

      {/* Sample review 2 */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center mb-2">
          <FaUserCircle className="h-8 w-8 text-gray-500 mr-2" />
          <span className="font-semibold">Mary Adams</span>
        </div>
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <FaStar key={index} className="h-5 w-5 text-yellow-400" />
            ))}
          </div>
          <span className="ml-2">4.0</span>
        </div>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vulputate ipsum eu nibh consectetur, eget laoreet ipsum aliquet.</p>
      </div>

      {/* Sample review 3 */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center mb-2">
          <FaUserCircle className="h-8 w-8 text-gray-500 mr-2" />
          <span className="font-semibold">Kunle Anayo</span>
        </div>
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <FaStar key={index} className="h-5 w-5 text-yellow-400" />
            ))}
          </div>
          <span className="ml-2">3.5</span>
        </div>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vulputate ipsum eu nibh consectetur, eget laoreet ipsum aliquet.</p>
      </div>
    </div>
    </div>
  );
};

export default ReviewsSection;
