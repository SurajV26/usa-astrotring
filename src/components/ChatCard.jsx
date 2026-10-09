import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, IndianRupee, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ChatCard({ name,
    specialty,
    languages,
    experience,
    rating,
    totalOrders,
    price,
    originalPrice,
    image,
    isOnline }) {

    return (
        <Card className="w-full max-w-sm mx-auto hover:shadow-lg transition-shadow">
            <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row gap-4 items-top sm:items-center">
                    {/* Profile Image */}
                    <div className="relative flex-shrink-0 mx-auto sm:mx-0">
                        <Link to="/astro-details">
                        <img
                            src={image}
                            alt={name}
                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover"
                        />
                        </Link>
                        {isOnline && (
                            <div className="absolute top-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-center sm:text-left w-full">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                            <div>
                                <h4 className="font-semibold text-secondary">{name}</h4>
                                <p className="text-sm text-gray-600">{specialty}</p>
                                <p className="text-xs text-gray-500">{languages}</p>
                            </div>

                            {/* Chat Button - Desktop */}
                            <Button
                                variant="outline"
                                className="hidden sm:block text-green-600 border-green-600 hover:bg-green-50"
                            >
                                Chat
                            </Button>
                        </div>

                        {/* Rating and Experience */}
                        <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                    />
                                ))}
                            </div>
                            <span className="text-xs text-gray-600">{totalOrders} orders</span>
                        </div>

                        <div className="flex items-center justify-center sm:justify-start gap-1 text-sm text-gray-600 mb-3">
                            <Clock className="w-4 h-4" />
                            <span>Exp: {experience}</span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center justify-center sm:justify-start gap-2">
                            <div className="flex items-center text-green-600 font-semibold">
                                <IndianRupee className="w-4 h-4" />
                                <span>{price}/min</span>
                            </div>
                            <div className="flex items-center text-gray-400 line-through text-sm">
                                <IndianRupee className="w-3 h-3" />
                                <span>{originalPrice}</span>
                            </div>
                        </div>

                        {/* Chat Button - Mobile */}
                        <Button
                            variant="outline"
                            className="w-full mt-4 sm:hidden text-green-600 border-green-600 hover:bg-green-50"
                        >
                            Chat
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}