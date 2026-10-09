import React from 'react'

const ComponentHead = ({heading="",title = "" , className = ""}) => {
  return (
    <div className={`text-center ${className}`}>
        <h3 className='font-bold'>{heading}</h3>
        <p className='text-md text-gray-500'>{title}</p>
    </div>
  )
}

export default ComponentHead
