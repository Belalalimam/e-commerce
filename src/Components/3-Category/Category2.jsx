
export default function ActionAreaCard() {
  return (
    <div style={{display:"flex", border:"0px solid red", width:"100%", overflow:"hidden"}}>
        <div style={{width:"250px" ,height:"200px", display:"flex", alignItems:"center", marginRight:"60px", marginLeft:"20px"}} >

            <div className="" style={{position:"relative"}}>
                <img src="https://picsum.photos/350/200" style={{opacity:".4"}} alt="" />
            </div>
            <div style={{position:"absolute", display:"flex", justifyContent:"space-between"}} className="card-body">
                
                <div style={{width:"200px", background:"white", borderBottomRightRadius:"20px", borderTopRightRadius:"20px", marginBlock:"20px"}}>
                    <div style={{color:"red"}}> 5% OFF </div>
                    <div>Hot deal on new items</div>
                <div><p>shop now ➡️ </p></div>
                </div>

                <div>
                    <img src="/img/packaging-with-eggs-top.jpg" width={100} height={100} alt="" />
                </div>
                
            </div>
        </div>
        <div style={{width:"250px" ,height:"200px", display:"flex", alignItems:"center", marginRight:"60px", marginLeft:"60px"}} >

            <div className="" style={{position:"relative"}}>
                <img src="https://picsum.photos/350/200" style={{opacity:".4"}} alt="" />
            </div>
            <div style={{position:"absolute", display:"flex", justifyContent:"space-between"}} className="card-body">
                
                <div style={{width:"200px", background:"white", borderBottomRightRadius:"20px", borderTopRightRadius:"20px", marginBlock:"20px"}}>
                    <div style={{color:"red"}}> 5% OFF </div>
                    <div>new arrivals</div>
                <div><p>shop now ➡️ </p></div>
                </div>

                <div>
                    <img src="/img/packaging-with-eggs-top.jpg" width={100} height={100} alt="" />
                </div>
                
            </div>
        </div>
        <div style={{width:"250px" ,height:"200px", display:"flex", alignItems:"center", marginRight:"60px", marginLeft:"60px"}} >

            <div className="" style={{position:"relative"}}>
                <img src="https://picsum.photos/350/200" style={{opacity:".4"}} alt="" />
            </div>
            <div style={{position:"absolute", display:"flex", justifyContent:"space-between"}} className="card-body">
                
                <div style={{width:"200px", background:"white", borderBottomRightRadius:"20px", borderTopRightRadius:"20px", marginBlock:"20px"}}>
                    <div style={{color:"red"}}> 5% OFF </div>
                    <div>Hot deal on new items</div>
                <div><p>shop now ➡️ </p></div>
                </div>

                <div>
                    <img src="/img/packaging-with-eggs-top.jpg" width={100} height={100} alt="" />
                </div>
                
            </div>
        </div>
    </div>
  );
}
