import React from 'react'

const Card = ({ item }) => {
  return (
    <div className='relative w-56 h-72 bg-black bg-opacity-50 backdrop-blur-md border-2 border-white rounded-lg overflow-hidden flex items-center justify-center'>
      <img
        src={`/assets/${item.dept}.png`}
        alt="cards"
        className='absolute top-0 left-0 w-full h-full object-cover z-0'
      />
      <p className="z-10 absolute top-0 left-0 text-center w-full text-4xl font-arcade text-white">{item.comm}</p>
      <p className="z-10 absolute bottom-0 left-0 text-center w-full text-3xl font-arcade text-white">Score: {item.quantity}Kg</p>
    </div>
  )
}

export default Card;
