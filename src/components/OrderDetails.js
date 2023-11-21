import React from 'react'
import '../style/order.css'
export default function OrderDetails({ or }) {
  //progress bar logic
  const today = new Date();
  const delday = new Date(or.delDate)
  const retday = new Date(or.retDate)
  const datediff = parseInt((new Date(or.delDate) - new Date()) / (1000 * 60 * 60 * 24))
  let prog={width:"8%"}
  console.log(datediff)
  if(today>new Date(or.retDate)){
    prog={width:"100%"}
  }
  else if(datediff===-1){
    prog={width:"80%"}
  }
  else if(datediff===-2){
    prog={width:"90%"}
  }
  else if(datediff<-2){
    prog={width:"95%"}
  }
  else if(datediff===0){
    prog={width:"70%"}
  }
  else if(datediff===1){
    prog={width:"55%"}
  }
  else if(datediff===2){
    prog={width:"35%"}
  }
  else if(datediff===3){
    prog={width:"15%"}
  }
  else if(datediff>3){
    prog={width:"8%"}
  }
  return (
    <div className='item-wise'>
      <img className='img-name' src={or.img} alt="" style={{ height: "5rem", width: "7rem", padding: "0.4rem" }} />
      <div className="item-name">
        <span>{or.name}</span>
        <span>Qty: {or.quantity}</span>
        <span>Days: {parseInt(new Date(or.retDate) - new Date(or.delDate)) / (1000 * 60 * 60 * 24)}</span>
        <span>Cost: <i className="fa-solid fa-indian-rupee-sign"></i>{or.quantity * or.price * (parseInt(new Date(or.retDate) - new Date(or.delDate)) / (1000 * 60 * 60 * 24))}</span>
      </div>
      <div className='track-name'>
        <span>Track Order:</span>
      </div>
      <div className='prog-name-bar'>
        <div class="progress">
          <div class="progress-bar"  style={prog}>
          </div>
        </div>
        <div class="progress-name" >
          <span>order placed</span>
          <span>order shipped</span>
          <span>delivered</span>
          <span>returned</span>
        </div>
      </div>
    </div>
  )
}
