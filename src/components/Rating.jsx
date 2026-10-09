// import React from "react";

// function Rating({ rating = 0, ratingCount = 0 }) {
//   const roundedRating = Math.round(rating);

//   // Rating distribution calculate karne ke liye dummy logic
//   // Agar API se star-wise count aaye toh direct use karna
//   const total = ratingCount || 1;

//   const bars = [5, 4, 3, 2, 1].map((star) => {
//     const percent =
//       star === roundedRating ? (total / total) * 100 : 5; // fallback demo logic

//     return {
//       star,
//       percent,
//     };
//   });

//   return (
//     <div className="mx-auto mt-8 mb-10 bg-white rounded-3xl shadow-2xl p-8 border">
//       <div className="border rounded-xl p-4 w-full">
//         <h3 className="font-semibold mb-3">Rating & Reviews</h3>

//         <div className="flex gap-6">
//           {/* Left Rating Section */}
//           <div className="text-center">
//             <p className="text-3xl font-bold">{rating}</p>

//             <div className="flex justify-center">
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <span
//                   key={star}
//                   className={`text-sm ${
//                     star <= roundedRating
//                       ? "text-yellow-400"
//                       : "text-gray-300"
//                   }`}
//                 >
//                   ★
//                 </span>
//               ))}
//             </div>

//             <p className="text-xs text-gray-500 mt-1">
//               {ratingCount} total
//             </p>
//           </div>

//           {/* Right Progress Bars */}
//           <div className="flex-1 space-y-2">
//             {bars.map((b) => (
//               <div key={b.star} className="flex items-center gap-2">
//                 <span className="text-xs w-3">{b.star}</span>
//                 <div className="flex-1 h-2 bg-gray-100 rounded">
//                   <div
//                     className="h-2 rounded bg-yellow-400"
//                     style={{ width: `${b.percent}%` }}
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Rating;



// import React from "react";

// function Rating({ rating = 0, ratingCount = 0 }) {
//   const roundedRating = Math.round(rating);

//   const bars = [5, 4, 3, 2, 1].map((star) => {
//     let percent = 0;

//     if (ratingCount > 0 && star === roundedRating) {
//       percent = 100;
//     }

//     return {
//       star,
//       percent,
//     };
//   });

//   return (
//     <div className="mx-auto mt-8 mb-10 bg-white rounded-3xl shadow-2xl p-8 border">
//       <div className="border rounded-xl p-4 w-full">
//         <h3 className="font-semibold mb-3">Rating</h3>

//         <div className="flex gap-6">
//           {/* Left Side */}
//           <div className="text-center">
//             <p className="text-3xl font-bold">{rating}</p>

//             <div className="flex justify-center">
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <span
//                   key={star}
//                   className={`text-sm ${
//                     star <= roundedRating
//                       ? "text-yellow-400"
//                       : "text-gray-300"
//                   }`}
//                 >
//                   ★
//                 </span>
//               ))}
//             </div>

//             <p className="text-xs text-gray-500 mt-1">
//               {ratingCount} total
//             </p>
//           </div>

//           {/* Right Side Progress Bars */}
//           <div className="flex-1 space-y-2">
//             {bars.map((b) => (
//               <div key={b.star} className="flex items-center gap-2">
//                 <span className="text-xs w-3">{b.star}</span>

//                 <div className="flex-1 h-2 bg-gray-100 rounded">
//                   <div
//                     className="h-2 rounded bg-yellow-400 transition-all duration-500"
//                     style={{ width: `${b.percent}%` }}
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Rating;


import React from "react";

function Rating({ rating = 0, ratingCount = 0, ratingStats = {} }) {
  const roundedRating = Math.round(rating);

  const bars = [5, 4, 3, 2, 1].map((star) => {
    const count = ratingStats[star] || 0;

    const percent =
      ratingCount > 0 ? (count / ratingCount) * 100 : 0;

    return {
      star,
      percent,
    };
  });

  return (
    <div className="mx-auto mt-8 mb-10 bg-white rounded-3xl shadow-2xl p-8 border">
      <div className="border rounded-xl p-4 w-full">
        <h3 className="font-semibold mb-3">Rating</h3>

        <div className="flex gap-6">
          {/* Left Side */}
          <div className="text-center">
            <p className="text-3xl font-bold">{rating}</p>

            <div className="flex justify-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`text-sm ${
                    star <= roundedRating
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>

            <p className="text-xs text-gray-500 mt-1">
              {ratingCount} total
            </p>
          </div>

          {/* Right Side Progress Bars */}
         <div className="flex-1 space-y-2">
  {bars
    .filter((b) => b.percent > 0)
    .map((b) => (
      <div key={b.star} className="flex items-center gap-2">
        <span className="text-xs w-3">{b.star}</span>

        <div className="flex-1 h-2 bg-gray-100 rounded">
          <div
            className="h-2 rounded bg-yellow-400 transition-all duration-500"
            style={{ width: `${b.percent}%` }}
          />
        </div>

        <span className="text-xs w-10 text-right">
          {b.percent.toFixed(0)}%
        </span>
      </div>
    ))}
</div>
        </div>
      </div>
    </div>
  );
}

export default Rating;