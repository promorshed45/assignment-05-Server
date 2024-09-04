import Review, { TReview } from "./review.model";

const createReview = async (payload: TReview) => {
  const result = await Review.create(payload);
  return result;
};

const getAllReviews = async () => {
  const reviews = await Review.find().populate('userId');
  return reviews;
};

export const reviewService = {
  createReview,
  getAllReviews,
};
