import React from 'react'
import faviconlogo from "@/assets/border.png";

const HeadWithLogo = ({ time, title, className = "" }) => {
    return (
        <div className={`text-center relative mb-30 ${className} `}>
            <div className=''>
                <h2 >{title}</h2>
                {time && <p>Check your {time}'s horoscope</p>}
            </div>
            <div className='h-[2px] w-full   ' >
                <img src={faviconlogo} alt="Logo" className='mx-auto  h-[100px]' />
            </div>
        </div>
    )
}

export default HeadWithLogo
