import { useState } from 'react';
import { Star } from 'lucide-react';

const RatingModal = ({ isOpen, onClose, providerName, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-all duration-300">
      <div 
        className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl transform transition-all duration-300 scale-100"
        dir="ltr"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Rate Service</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        <div className="flex flex-col items-center mb-6">
          <p className="text-gray-600 mb-6 text-center text-sm md:text-base">
            How would you rate <span className="font-bold text-[#12376B]">{providerName}</span>'s service?
          </p>
          <div className="flex gap-2 flex-row-reverse">
            {[...Array(5)].map((_, index) => {
              const starValue = 5 - index; // Reversing the order for RTL if needed, but since it's flex-row-reverse it maps nicely. Actually, let's keep it simple.
              return (
                <button
                  type="button"
                  key={starValue}
                  className={`transition-all duration-200 ${
                    starValue <= (hover || rating) ? "text-[#c9a765] scale-110" : "text-gray-200"
                  }`}
                  onClick={() => setRating(starValue)}
                  onMouseEnter={() => setHover(starValue)}
                  onMouseLeave={() => setHover(rating)}
                >
                  <Star className={`w-10 h-10 md:w-12 md:h-12 ${starValue <= (hover || rating) ? 'fill-[#c9a765]' : ''}`} />
                </button>
              );
            })}
          </div>
          <span className="text-sm text-gray-500 mt-3 h-5">
            {rating === 5 && 'Excellent'}
            {rating === 4 && 'Very Good'}
            {rating === 3 && 'Good'}
            {rating === 2 && 'Fair'}
            {rating === 1 && 'Poor'}
          </span>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Add a comment (Optional)
          </label>
          <textarea
            className="w-full border border-gray-200 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-[#c9a765] focus:border-transparent resize-none text-sm"
            rows="4"
            placeholder="Share your experience with the service..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          ></textarea>
        </div>

        <button
          onClick={() => {
            onSubmit({ rating, review });
            onClose();
            // Optional: reset state
            setRating(0);
            setReview('');
          }}
          disabled={rating === 0}
          className={`w-full py-4 rounded-2xl font-bold text-white transition-all duration-300 ${
            rating > 0 
              ? 'bg-[#c9a765] hover:bg-[#b89551] shadow-lg shadow-[#c9a765]/30' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default RatingModal;
