import React from 'react'

export default function Category({name, imgSrc}) {
  return (
    <div style={{margin:"5px",border:"px solid black",textWrap:"nowrap", display:"flex",flexDirection:"column", justifyContent:"center", alignItems:"center", width:"180px", height:"180px", overflow:"hidden"}}>
        <img src={imgSrc} style={{borderRadius:"50%", width:"100px", height:"100px"}}  alt="" />
        <h2>{name}</h2>
    </div>
  )
}
