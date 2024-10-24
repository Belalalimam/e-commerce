import React from 'react'

export default function Category({name}) {
  return (
    <div>
        <img src="https://picsum.photos/100/100" style={{borderRadius:"50%", width:"100px", height:"100px"}}  alt="" />
        <h2>{name}</h2>
    </div>
  )
}
