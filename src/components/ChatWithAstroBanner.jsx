import React from 'react'
import ChatCard from './ChatCard'

const ChatWithAstroBanner = () => {
    const astrologers = [
        {
            name: "Athena",
            specialty: "Tarot",
            languages: "English, Hindi",
            experience: "10 Years",
            rating: 5,
            totalOrders: 3151,
            price: 6,
            originalPrice: 32,
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
            isOnline: true
        },
        {
            name: "Rohan",
            specialty: "Vedic Astrology",
            languages: "Hindi, English",
            experience: "8 Years",
            rating: 4.8,
            totalOrders: 2140,
            price: 5,
            originalPrice: 25,
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop",
            isOnline: false
        },
        {
            name: "Meera",
            specialty: "Palmistry",
            languages: "Hindi",
            experience: "12 Years",
            rating: 4.9,
            totalOrders: 4021,
            price: 7,
            originalPrice: 30,
            image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=150&h=150&fit=crop",
            isOnline: true
        },
        {
            name: "Arjun",
            specialty: "Numerology",
            languages: "English, Hindi",
            experience: "6 Years",
            rating: 4.6,
            totalOrders: 1890,
            price: 4,
            originalPrice: 20,
            image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop",
            isOnline: true
        },
        {
            name: "Sanya",
            specialty: "Love Astrology",
            languages: "Hindi, English",
            experience: "9 Years",
            rating: 4.7,
            totalOrders: 2567,
            price: 6,
            originalPrice: 28,
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop",
            isOnline: false
        },
        {
            name: "Kabir",
            specialty: "Kundli Matching",
            languages: "Hindi",
            experience: "15 Years",
            rating: 5,
            totalOrders: 5200,
            price: 8,
            originalPrice: 35,
            image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop",
            isOnline: true
        },
        {
            name: "Ananya",
            specialty: "Career Guidance",
            languages: "English, Hindi",
            experience: "7 Years",
            rating: 4.5,
            totalOrders: 1432,
            price: 5,
            originalPrice: 22,
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
            isOnline: true
        },
        {
            name: "Vikram",
            specialty: "Horoscope Reading",
            languages: "Hindi, English",
            experience: "11 Years",
            rating: 4.8,
            totalOrders: 3105,
            price: 6,
            originalPrice: 27,
            image: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=150&h=150&fit=crop",
            isOnline: false
        },
        {
            name: "Pooja",
            specialty: "Tarot",
            languages: "English, Hindi",
            experience: "5 Years",
            rating: 4.4,
            totalOrders: 987,
            price: 3,
            originalPrice: 18,
            image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop",
            isOnline: true
        },
        {
            name: "Rahul",
            specialty: "Vastu",
            languages: "Hindi",
            experience: "14 Years",
            rating: 4.9,
            totalOrders: 4678,
            price: 7,
            originalPrice: 34,
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
            isOnline: true
        }
    ];

    return ( 
        <section>
            <div className="container">

                <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mt-10'>

                    {
                        astrologers.map(ele => (
                            <ChatCard {...ele} />
                        ))
                    }
                </div>
            </div>

        </section>
    )
}

export default ChatWithAstroBanner
