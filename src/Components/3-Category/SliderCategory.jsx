import React from 'react'
import Category from './Category'

export default function SliderCategory() {
  return (
    <div style={{marginTop:"30px", display:"flex", justifyContent:"center "}}>
        <Category imgSrc={'/img/img1.jpg'} name={'Elastic'} />
        <Category imgSrc={'/img/img2.jpg'} name={'Eyelet'} />
        <Category imgSrc={'/img/img3.jpg'} name={'Medallions'} />
        <Category imgSrc={'/img/img4.jpg'} name={'Appliques'} />
        <Category imgSrc={'/img/img5.jpg'} name={'Wholesale'} />
        <Category imgSrc={'/img/img1.jpg'} name={'Lace'} />
        {/* <Category imgSrc={'/img/img2.jpg'} name={'fabric'} />
        <Category imgSrc={'/img/img3.jpg'} name={'lace'} />
        <Category imgSrc={'/img/img4.jpg'} name={'fabric'} />
        <Category imgSrc={'/img/img5.jpg'} name={'lace'} /> */}

    </div>
  )
}
