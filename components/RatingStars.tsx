"use client";

import { useState } from "react";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

interface RatingProps {
  initialValue?: number; // 0 to 5 (supports halves)
  size?: number;
  onChange?: (rating: number) => void;
}

export default function RatingStars({
  initialValue = 0,
  size = 32,
  onChange,
}: RatingProps) {
  const [rating, setRating] = useState(initialValue);
  const [hover, setHover] = useState(0);

  // Detect click position for half vs full
  const handleClick = (e: React.MouseEvent, index: number) => {
    const { left, width } = (e.target as HTMLElement).getBoundingClientRect();
    const clickX = e.clientX - left;

    const newRating = clickX < width / 2 ? index - 0.5 : index;

    setRating(newRating);
    onChange?.(newRating);
  };

  // Detect hover half/full
  const handleHover = (e: React.MouseEvent, index: number) => {
    const { left, width } = (e.target as HTMLElement).getBoundingClientRect();
    const hoverX = e.clientX - left;

    const newHover = hoverX < width / 2 ? index - 0.5 : index;
    setHover(newHover);
  };

  return (
    <div className="flex gap-1 ">
      {[1, 2, 3, 4, 5].map((i) => {
        // which value to display (rating or hover)
        const display = hover || rating;

        const show =
          display >= i ? "full" : display >= i - 0.5 ? "half" : "empty";

        return (
          <span
            key={i}
            className="cursor-pointer"
            onMouseMove={(e) => handleHover(e, i)}
            onMouseLeave={() => setHover(0)}
            onClick={(e) => handleClick(e, i)}
          >
            {show === "full" && (
              <FaStar size={size} className="text-violet-400" />
            )}
            {show === "half" && (
              <FaStarHalfAlt size={size} className="text-violet-400" />
            )}
            {show === "empty" && (
              <FaRegStar size={size} className="text-violet-400" />
            )}
          </span>
        );
      })}
    </div>
  );
}
