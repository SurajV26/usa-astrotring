// import React, { useState, useMemo, useEffect } from "react";

// const ReviewsSection = () => {
//   // Selected rating state
//   const [selectedRating, setSelectedRating] = useState("All");
// const [reviews, setReviews] = useState([]);
// const [loading, setLoading] = useState(false);
// const [error, setError] = useState(null); 
//   // Reviews Data

//   // Filter Logic (optimized with useMemo)
// useEffect(() => {
//   const fetchReviews = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const response = await fetch(
//         "https://astro.astrotring.com/api/reviews"
//       );

//       if (!response.ok) {
//         throw new Error("Failed to fetch reviews");
//       }

//       const data = await response.json();

//       console.log("API Response:", data);

//       // ⚠ check karo data structure
//       // agar data.data me reviews hain
//       setReviews(data.data);

//     } catch (err) {
//       console.error("Error:", err);
//       setError("Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchReviews();
// }, []);


// const filteredReviews = useMemo(() => {
//   if (selectedRating === "All") return reviews;
//   return reviews.filter(
//     (review) => review.rating === Number(selectedRating)
//   );
// }, [selectedRating, reviews]);

//   return (
//     <div className="bg-white rounded-3xl shadow-2xl p-8 border mt-10">
      
//       {/* Header */}
//     <div className="flex items-center justify-between border-b pb-3 mb-5 w-full">
  
//   {/* Left Side */}
//   <h3 className="text-xl font-semibold">
//     Reviews
//   </h3>

//   {/* Right Side */}
//   <div className="w-[120px] flex justify-end">
//     <select
//       value={selectedRating}
//       onChange={(e) => setSelectedRating(e.target.value)}
//       className="w-full text-sm text-gray-600 border px-3 py-1 rounded-lg hover:bg-gray-100 transition"
//     >
//       <option value="All">All Ratings</option>
//       <option value="5">5 Star</option>
//       <option value="4">4 Star</option>
//       <option value="3">3 Star</option>
//       <option value="2">2 Star</option>
//       <option value="1">1 Star</option>
//     </select>
//   </div>

// </div>
//       {/* Reviews List */}
//     {loading ? (
//   <p className="text-center py-5">Loading...</p>
// ) : error ? (
//   <p className="text-red-500 text-center py-5">{error}</p>
// ) : filteredReviews.length === 0 ? (
//   <p className="text-gray-500 text-center py-5">
//     No Reviews Found
//   </p>
// ) : (
//   filteredReviews.map((review) => (
//     <div
//       key={review.id}
//       className="border-b pb-4 mb-4 last:border-none"
//     >
//       <div className="flex items-center gap-3">
        
//         {/* Avatar */}
//         <div className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-700 font-semibold">
//           {review.name?.charAt(0)}
//         </div>

//         {/* Name & Date */}
//         <div className="flex-1">
//           <p className="font-medium">{review.name}</p>
//           <p className="text-xs text-gray-500">
//             {new Date(review.created_at).toDateString()}
//           </p>
//         </div>

//         {/* Stars */}
//         <div className="flex text-yellow-400 text-sm">
//           {[1, 2, 3, 4, 5].map((star) => (
//             <span key={star}>
//               {star <= review.rating ? "★" : "☆"}
//             </span>
//           ))}
//         </div>
//       </div>

//       {/* Message */}
//       <p className="text-gray-700 text-sm mt-3 ml-12">
//         {review.message}
//       </p>
//     </div>
//   ))
// )}
//     </div>
//   );
// };

// export default ReviewsSection;

// import React, { useState, useEffect } from "react";

// const ReviewsSection = ({ astrologerId }) => {
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const res = await fetch(
//           "https://astro.astrotring.com/api/reviews"
//         );

//         if (!res.ok) throw new Error("Network error");

//         const result = await res.json();

//         if (result.status && Array.isArray(result.data)) {

//           // 🔥 STRICT CONDITION
//           const onlyCurrentAstrologer = result.data.filter(
//             (item) =>
//               Number(item.astrologer_id) === Number(astrologerId)
//           );

//           setReviews(onlyCurrentAstrologer);
//         } else {
//           setReviews([]);
//         }

//       } catch (err) {
//         setError("Failed to load reviews");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (astrologerId) {
//       fetchReviews();
//     }
//   }, [astrologerId]);

//   const renderStars = (rating) =>
//     [...Array(5)].map((_, i) => (
//       <span key={i}>{i < rating ? "★" : "☆"}</span>
//     ));

//   return (
//     <div className="bg-white rounded-3xl shadow-xl p-6 border mt-10">

//       <h3 className="text-xl font-semibold mb-5">Reviews</h3>

//       {loading ? (
//         <p className="text-center py-5">Loading...</p>
//       ) : error ? (
//         <p className="text-red-500 text-center py-5">{error}</p>
//       ) : reviews.length === 0 ? (
//         <p className="text-gray-500 text-center py-5">
//           No Reviews Found
//         </p>
//       ) : (
//         reviews.map((review) => (
//           <div
//             key={review.id}
//             className="border-b pb-4 mb-4 last:border-none"
//           >
//             <div className="flex items-center gap-3">

//               <div className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-700 font-semibold">
//                 {(review.name || "A")[0].toUpperCase()}
//               </div>

//               <div className="flex-1">
//                 <p className="font-medium">
//                   {review.name}
//                 </p>
//                 <p className="text-xs text-gray-500">
//                   {review.created_at}
//                 </p>
//               </div>

//               <div className="text-yellow-400 text-sm">
//                 {renderStars(Number(review.rating))}
//               </div>
//             </div>

//             <p className="text-gray-700 text-sm mt-3 ml-12">
//               {review.review || "No comment provided"}
//             </p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default ReviewsSection;


// import React, { useState, useEffect, useMemo } from "react";

// const ReviewsSection = ({ astrologerId }) => {
//   const [reviews, setReviews] = useState([]);
//   const [visibleCount, setVisibleCount] = useState(10);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [selectedRating, setSelectedRating] = useState("All");

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const res = await fetch(
//           "https://astro.astrotring.com/api/reviews"
//         );

//         if (!res.ok) throw new Error("Network error");

//         const result = await res.json();

//         if (result.status && Array.isArray(result.data)) {
//           const onlyCurrentAstrologer = result.data.filter(
//             (item) =>
//               Number(item.astrologer_id) === Number(astrologerId)
//           );

//           setReviews(onlyCurrentAstrologer);
//         } else {
//           setReviews([]);
//         }
//       } catch (err) {
//         setError("Failed to load reviews");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (astrologerId) {
//       fetchReviews();
//     }
//   }, [astrologerId]);

//   // ✅ FILTERED REVIEWS LOGIC
//   const filteredReviews = useMemo(() => {
//     if (selectedRating === "All") return reviews;

//     return reviews.filter(
//       (review) => Number(review.rating) === Number(selectedRating)
//     );
//   }, [reviews, selectedRating]);

//   // ✅ Reset visible count when filter changes
//   useEffect(() => {
//     setVisibleCount(10);
//   }, [selectedRating]);

//   const renderStars = (rating) =>
//     [...Array(5)].map((_, i) => (
//       <span key={i}>{i < rating ? "★" : "☆"}</span>
//     ));

//   return (
//     <div className="bg-white rounded-3xl shadow-xl p-6 border mt-10">

//       <div className="flex items-center justify-between border-b pb-3 mb-5 w-full">
//         <h3 className="text-xl font-semibold">Reviews</h3>

//         <div className="w-[140px] flex justify-end">
//           <select
//             value={selectedRating}
//             onChange={(e) => setSelectedRating(e.target.value)}
//             className="w-full text-sm text-gray-600 border px-3 py-1 rounded-lg hover:bg-gray-100 transition"
//           >
//             <option value="All">All Ratings</option>
//             <option value="5">5 Star</option>
//             <option value="4">4 Star</option>
//             <option value="3">3 Star</option>
//             <option value="2">2 Star</option>
//             <option value="1">1 Star</option>
//           </select>
//         </div>
//       </div>

//       {loading ? (
//         <p className="text-center py-5">Loading...</p>
//       ) : error ? (
//         <p className="text-red-500 text-center py-5">{error}</p>
//       ) : filteredReviews.length === 0 ? (
//         <p className="text-gray-500 text-center py-5">
//           No Reviews Found
//         </p>
//       ) : (
//         <>
//           {filteredReviews.slice(0, visibleCount).map((review) => (
//             <div
//               key={review.id}
//               className="border-b pb-4 mb-4 last:border-none"
//             >
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-700 font-semibold">
//                   {(review.user_name || "A")[0].toUpperCase()}
//                 </div>

//                 <div className="flex-1">
//                   <p className="font-medium">
//                     {review.user_name || "Anonymous"}
//                   </p>
//                   <p className="text-xs text-gray-500">
//                     {review.created_at}
//                   </p>
//                 </div>

//                 <div className="text-yellow-400 text-sm">
//                   {renderStars(Number(review.rating))}
//                 </div>
//               </div>

//               <p className="text-gray-700 text-sm mt-3 ml-12">
//                 {review.review || "No comment provided"}
//               </p>
//             </div>
//           ))}

//           {visibleCount < filteredReviews.length && (
//             <div className="text-center mt-4">
//               <button
//                 onClick={() => setVisibleCount(prev => prev + 10)}
//                 className="px-5 py-2 bg-yellow-500 text-white rounded-lg text-sm hover:bg-yellow-600 transition"
//               >
//                 View More
//               </button>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default ReviewsSection;


import React, { useState, useEffect, useMemo } from "react";
import Rating from "./Rating";

const ReviewsSection = ({ astrologerId }) => {
  const [reviews, setReviews] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedRating, setSelectedRating] = useState("All");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          "https://backend.astrotring.com/api/reviews"
        );

        if (!res.ok) throw new Error("Network error");

        const result = await res.json();

        if (result.status && Array.isArray(result.data)) {
          const onlyCurrentAstrologer = result.data.filter(
            (item) =>
              Number(item.astrologer_id) === Number(astrologerId)
          );

          setReviews(onlyCurrentAstrologer);
        } else {
          setReviews([]);
        }
      } catch (err) {
        setError("Failed to load reviews");
      } finally {
        setLoading(false);
      }
    };

    if (astrologerId) {
      fetchReviews();
    }
  }, [astrologerId]);

  // ⭐ Average Rating
  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 0;

    const total = reviews.reduce(
      (sum, review) => sum + Number(review.rating),
      0
    );

    return (total / reviews.length).toFixed(1);
  }, [reviews]);

  // ⭐ Rating Distribution
  const ratingStats = useMemo(() => {
    const stats = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

    reviews.forEach((review) => {
      const r = Number(review.rating);
      if (stats[r] !== undefined) {
        stats[r] += 1;
      }
    });

    return stats;
  }, [reviews]);

  const totalRatings = reviews.length;

  // ⭐ Filter Logic
  const filteredReviews = useMemo(() => {
    if (selectedRating === "All") return reviews;

    return reviews.filter(
      (review) => Number(review.rating) === Number(selectedRating)
    );
  }, [reviews, selectedRating]);

  useEffect(() => {
    setVisibleCount(10);
  }, [selectedRating]);

  const renderStars = (rating) =>
    [...Array(5)].map((_, i) => (
      <span key={i}>{i < rating ? "★" : "☆"}</span>
    ));

  return (
    <>
      {/* Rating Summary */}
      <Rating
        rating={averageRating}
        ratingCount={totalRatings}
        ratingStats={ratingStats}
      />

      {/* Reviews Section */}
      <div className="bg-white rounded-3xl shadow-xl p-6 border mt-10">
        <div className="flex items-center justify-between border-b pb-3 mb-5 w-full">
          <h3 className="text-xl font-semibold">Reviews</h3>

          <div className="w-[140px] flex justify-end">
            <select
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
              className="w-full text-sm text-gray-600 border px-3 py-1 rounded-lg hover:bg-gray-100 transition"
            >
              <option value="All">All Ratings</option>
              <option value="5">5 Star</option>
              <option value="4">4 Star</option>
              <option value="3">3 Star</option>
              <option value="2">2 Star</option>
              <option value="1">1 Star</option>
            </select>
          </div>
        </div>

        {loading ? (
          <p className="text-center py-5">Loading...</p>
        ) : error ? (
          <p className="text-red-500 text-center py-5">{error}</p>
        ) : filteredReviews.length === 0 ? (
          <p className="text-gray-500 text-center py-5">
            No Reviews Found
          </p>
        ) : (
          <>
            {filteredReviews
              .slice(0, visibleCount)
              .map((review) => (
                <div
                  key={review.id}
                  className="border-b pb-4 mb-4 last:border-none"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-700 font-semibold">
                      {(review.user_name || "A")[0].toUpperCase()}
                    </div>

                    <div className="flex-1">
                      <p className="font-medium">
                        {review.user_name || "Anonymous"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {review.created_at}
                      </p>
                    </div>

                    <div className="text-yellow-400 text-sm">
                      {renderStars(Number(review.rating))}
                    </div>
                  </div>

                  <p className="text-gray-700 text-sm mt-3 ml-12">
                    {review.review || "No comment provided"}
                  </p>
                </div>
              ))}

            {visibleCount < filteredReviews.length && (
              <div className="text-center mt-4">
                <button
                  onClick={() =>
                    setVisibleCount((prev) => prev + 10)
                  }
                  className="px-5 py-2 bg-yellow-500 text-white rounded-lg text-sm hover:bg-yellow-600 transition"
                >
                  View More
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ReviewsSection;