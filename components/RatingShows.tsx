import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

// 1️⃣ define a type for props
interface RatingShowsProps {
  sortedRatings: {
    name: string;
    count: number;
  }[];
}

// 2️⃣ apply the type to the component
function RatingShows({ sortedRatings }: RatingShowsProps) {
  return (
    <ResponsiveContainer
      className="outline-0 border-0 "
      width="100%"
      height="100%"
    >
      <BarChart
        data={sortedRatings}
        layout="vertical"
        margin={{ top: 10, right: 0, left: 0, bottom: 35 }}
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
        <XAxis type="number" />
        <YAxis type="category" dataKey="name" tick={{ fontWeight: 600 }} />
        <Tooltip cursor={{ fill: "#642ee33a" }} />
        <Legend />
        <Bar dataKey="count" fill="#8E51FF" barSize={30} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default RatingShows;
