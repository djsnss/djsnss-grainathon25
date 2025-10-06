import React from 'react'

const Card = ({ item }) => {
  return (
    <div className='relative w-52 h-72 bg-black bg-opacity-50 backdrop-blur-md border-2 border-white rounded-lg overflow-hidden flex items-center justify-center'>
      <img
        src={`/assets/${item.dept}.png`}
        alt="cards"
        className='absolute top-0 left-0 w-full h-full object-cover z-0'
      />
      <div className="absolute bottom-0 left-0 w-full p-2 flex flex-col items-center z-10">
        <h2 className="text-white font-bold text-lg">{item.dept}</h2>
        <p className="text-white">{item.comm}</p>
        <p className="text-white">{item.quantity}</p>
      </div>
    </div>
  )
}

export default Card;
