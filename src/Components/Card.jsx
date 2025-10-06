import React from 'react'

const Card = ({ item }) => {
  return (
    <div>
      <h2>{item.dept}</h2>
      <img src= {`/assets/${item.dept}.png`} alt="" />
      <p>{item.comm}</p>
      <p>{item.qunatity}</p>
    </div>
  )
}

export default Card;