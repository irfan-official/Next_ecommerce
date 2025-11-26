export interface Rating {
  name: string;
  count: number;
}

export interface ReviewComment {
  name: string;
  image: string;
  rating: number;
  comment: string;
}

export interface ProductReviews {
  ratings: Rating[];
  reviewComments: ReviewComment[];
}

const productReviews: ProductReviews = {
  ratings: [
    { name: "1 star", count: 150000 },
    { name: "2 star", count: 30000 },
    { name: "3 star", count: 70000 },
    { name: "4 star", count: 600000 },
    { name: "5 star", count: 3700000 },
  ],

  reviewComments: [
    {
      name: "Sophia Lee",
      image: "https://randomuser.me/api/portraits/women/12.jpg",
      rating: 5,
      comment:
        "Perfect fit for my golden retriever! The coat is soft, durable, and keeps him warm during walks.",
    },
    {
      name: "Ryan Carter",
      image: "https://randomuser.me/api/portraits/men/14.jpg",
      rating: 4,
      comment:
        "Great service and fitting accuracy. Wish they had more color options though!",
    },
    {
      name: "Emily Brown",
      image: "https://randomuser.me/api/portraits/women/29.jpg",
      rating: 5,
      comment:
        "Very professional fitting. My dog looks adorable and stays cozy even in freezing weather.",
    },
    {
      name: "Liam Johnson",
      image: "https://randomuser.me/api/portraits/men/17.jpg",
      rating: 4,
      comment:
        "The fabric quality is excellent. Delivery took a bit long but worth it.",
    },
    {
      name: "Olivia Smith",
      image: "https://randomuser.me/api/portraits/women/7.jpg",
      rating: 5,
      comment:
        "Highly recommended! Great experience and the team handled my anxious pup with care.",
    },
  ],
};

export default productReviews;
