import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, X, Loader2 } from 'lucide-react';
import { doc, addDoc, collection, updateDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import toast from 'react-hot-toast';

const ReviewModal = ({ isOpen, onClose, order }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !order) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    setIsSubmitting(true);
    try {
      const { submitReview } = await import('../../../services/api');
      
      await submitReview(
        order.id,
        order.professionalId,
        order.homeownerId,
        rating,
        comment
      );

      // Optional callback to update UI immediately
      if (order.onReviewSubmitted) {
        order.onReviewSubmitted();
      }

      toast.success('Review submitted successfully!');
      onClose();
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error('Failed to submit review');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-slate-800">Rate your experience</h2>
            <p className="text-sm text-slate-500 mt-1">How was the service provided by {order.provider?.name}?</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setRating(star)}
                  className="p-1 transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-10 h-10 transition-colors ${
                      star <= (hoveredRating || rating)
                        ? 'fill-[#c9a765] text-[#c9a765]'
                        : 'text-slate-200'
                    }`}
                  />
                </button>
              ))}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Write a review <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tell others about your experience..."
                className="w-full h-32 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl resize-none outline-none focus:border-[#1f3b6c] focus:ring-2 focus:ring-[#1f3b6c]/10 transition-all text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || rating === 0}
              className={`w-full py-3.5 rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-all ${
                isSubmitting || rating === 0
                  ? 'bg-slate-300 cursor-not-allowed'
                  : 'bg-[#1f3b6c] hover:bg-[#152a4f] hover:shadow-lg hover:-translate-y-0.5'
              }`}
            >
              {isSubmitting ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</>
              ) : (
                'Submit Review'
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ReviewModal;
