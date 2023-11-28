import React, {useState } from 'react'
import '../style/address.css';
export default function AddressCard(props) {
    const [dot, setDot] = useState(true)
    const clicked=()=> {
        setDot(c => !c);
    }
    if(props.isActive){
        localStorage.setItem('address',JSON.stringify({name:props.data.name,loc:props.data.loc,address:props.data.address1,phone:props.data.phone}))
    }
    // console.log(localStorage.getItem('address'))
    return (
        <div className='add-card-main-main'>
            <div style={props.isActive ? { filter: "blur(0.07rem)" } : { filter: "none" }} className='add-card-main'>
                <h6>{props.data.loc}</h6>
                <i onClick={clicked} className="fa-solid fa-ellipsis-vertical dots"></i>
                <h4>{props.data.name.toString().split(' ')[0]}</h4>
                <p className='add-detail'>{props.data.address1}</p>
                <h6>{props.data.phone}</h6>
               {props.type?props.isActive?<button type="button" className="btn btn-warning add-btn" disabled>Deliver Here</button>:<button onClick={props.onclick} type="button" className="btn btn-warning add-btn">Deliver Here</button> :""}
                <ul className='un-list' style={dot ? { display: 'none' } : { display: 'block' }}>
                    <li>default</li>
                    <hr></hr>
                    <li>edit</li>
                    <hr></hr>
                    <li>delete</li>
                </ul>
            </div>
            <i style={props.isActive ? { display: "block" } : { display: "none" }} className="fa-solid fa-check green-tick"></i>
        </div>
    )
}
