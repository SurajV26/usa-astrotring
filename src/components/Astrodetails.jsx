import { GetSingleAstro } from "@/redux/slice/AstroAuth";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ReviewsSection from "./ReviewsSection";

const Astrodetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { singleAstro } = useSelector((state) => state.astroAuth);

    const astro = Array.isArray(singleAstro)
        ? singleAstro[0]
        : singleAstro;

    useEffect(() => {
        if (id) {
            dispatch(GetSingleAstro(id));
        }
    }, [id, dispatch]);

    if (!astro) {
        return (
            <div className="flex justify-center items-center h-screen text-lg font-semibold">
                Loading...
            </div>
        );
    }
    const bars = [
        { star: 5, width: "w-full", color: "bg-green-500" },
        { star: 4, width: "w-4/5", color: "bg-blue-500" },
        { star: 3, width: "w-3/5", color: "bg-gray-300" },
        { star: 2, width: "w-2/5", color: "bg-gray-200" },
        { star: 1, width: "w-1/5", color: "bg-gray-200" },
    ];
    return (
        <section className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 py-10">
            <div className="max-w-6xl mx-auto px-4">

                {/* ================= MAIN CARD ================= */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 border">

                    <div className="grid md:grid-cols-3 gap-10">

                        {/* ========= LEFT SIDE (IMAGE) ========= */}
                        <div className="flex flex-col items-center">
                            <div className="w-72 h-80 rounded-3xl overflow-hidden shadow-xl">
                                <img
                                    src={astro?.profile_image}
                                    alt="astro"
                                    className="w-full h-full object-cover hover:scale-105 transition duration-300"
                                />
                            </div>

                            <div className="mt-4">
                                {astro?.is_online ? (
                                    <span className="px-4 py-1 bg-green-100 text-green-600 rounded-full text-xs font-semibold">
                                        🟢 Online Now
                                    </span>
                                ) : (
                                    <span className="px-4 py-1 bg-red-100 text-red-500 rounded-full text-xs font-semibold">
                                        🔴 Offline
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* ========= RIGHT SIDE (DETAILS) ========= */}
                        <div className="md:col-span-2 space-y-4">

                            <h2 className="text-3xl font-bold text-gray-800">
                                {astro?.name}
                            </h2>

                            {/* Rating */}
                            <div className="flex items-center gap-3">
                                <div className="flex">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span
                                            key={star}
                                            className={`text-lg ${star <= Math.round(astro?.rating || 0)
                                                ? "text-yellow-400"
                                                : "text-gray-300"
                                                }`}
                                        >
                                            ★
                                        </span>
                                    ))}
                                </div>
                                <span className="text-sm text-gray-500">
                                    ({astro?.rating_count || 0} Reviews)
                                </span>
                            </div>

                            {/* Info Grid */}
                            <div className="grid sm:grid-cols-2 gap-4 mt-4 text-sm text-gray-600">

                                <div>
                                    <span className="font-semibold">Expertise:</span><br />
                                    {astro?.expertise?.join(", ")}
                                </div>

                                <div>
                                    <span className="font-semibold">Languages:</span><br />
                                    {astro?.languages?.join(", ")}
                                </div>

                                <div>
                                    <span className="font-semibold">Category:</span><br />
                                    {astro?.category?.join(", ")}
                                </div>

                                <div>
                                    <span className="font-semibold">Experience:</span><br />
                                    {astro?.experience} Years
                                </div>
                            </div>

                            {/* Pricing Card */}
                            <div className="mt-6 bg-gray-50 rounded-2xl p-5 border">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-green-600 font-semibold">
                                            $ {astro?.chat_price}/min (Chat)
                                        </p>
                                        <p className="text-blue-600 font-semibold">
                                            $ {astro?.call_price}/min (Call)
                                        </p>
                                    </div>

                                    <div className="flex gap-3">
                                        <button className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-full shadow-md transition">
                                            Start Chat
                                        </button>

                                        <button
                                            disabled={!astro?.is_online}
                                            className={`px-5 py-2 rounded-full shadow-md transition ${astro?.is_online
                                                ? "bg-blue-500 hover:bg-blue-600 text-white"
                                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                                }`}
                                        >
                                            Start Call
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* About */}
                            <div className="mt-6">
                                <h3 className="font-semibold text-lg mb-2">
                                    About Me
                                </h3>
                                <p className="text-gray-600 leading-relaxed text-sm">
                                    {astro?.about ||
                                        "Professional astrologer helping people with clarity, guidance and spiritual insight through Vedic astrology."}
                                </p>
                            </div>

                        </div>

                    </div>
                </div>




                <ReviewsSection astrologerId={id} />
            </div>
        </section>
    );
};

export default Astrodetails;
