import React from 'react'
import HeadWithLogo from '../HeadWithLogo'
import { Link } from 'react-router-dom'
import h1 from '../../assets/aries.jpg'
import h2 from '../../assets/taurus.jpg'
import h3 from '../../assets/gemini.jpg'
import h4 from '../../assets/cancer.jpg'
import h5 from '../../assets/leo.jpg'
import h6 from '../../assets/vigro.jpg'
import h7 from '../../assets/libra.jpg'
import h8 from '../../assets/scropio.jpg'
import h9 from '../../assets/sagittarius.jpg'
import h10 from '../../assets/caprion.jpg'
import h11 from '../../assets/aquarius.jpg'
import h12 from '../../assets/prices.jpg'




const HoroscopeBanner = ({ data, title }) => {
    const imgdata = [
        h1, h2, h3, h4, h5, h6, h7, h8, h9, h10, h11, h12
    ]

    return (
        <section className='py-10'>
            <HeadWithLogo title={title} />
            <div className='container grid  md:grid-cols-2 gap-4'>
                {data && data.length > 0 ? data.map((horoscope, index) => (
                    <Link to={`/horoscopes/${horoscope.type}/${horoscope.title.split(" ")[0].toLowerCase()}`} key={index}>
                        <div  className='border flex gap-3 group items-center hover:scale-102 transition-all duration-500 hover:shadow border-primary p-4 rounded-lg shadow-md'>
                            <div>
                                <img src={imgdata[index]} className='w-20 group-hover:rotate-360 duration-500 transition-all rounded-full' alt="" />
                            </div>
                            <div>
                                <h3 className='text-xl font-semibold mb-2'>{horoscope.title.charAt(0).toUpperCase() + horoscope.title.slice(1)} </h3>
                                <p>{horoscope.description}</p>
                            </div>

                        </div>
                    </Link>
                )) : (
                    <p className='col-span-3 text-center'>No horoscope data available.</p>
                )}
            </div>
        </section>
    )
}

export default HoroscopeBanner
