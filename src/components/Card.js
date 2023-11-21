import React, { useState, useContext } from 'react'
import '../style/card.css'
import { Link, useNavigate } from 'react-router-dom'
import { Context, UpdateContext } from './ContextData';

export default function Card(props) {
    // const dark = "#202124"
    // const dark = "#616161"
    const light = "#cccccc"
    // const light = "#bfbfbf"
    const { mode } = useContext(Context)
    //date logic
    const curr = new Date();
    const delDay = 5;
    const minDelDate = new Date(new Date().setDate(curr.getDate() + delDay)).toISOString().split('T')[0]
    const minRetDate = new Date(new Date().setDate(curr.getDate() + delDay + 2)).toISOString().split('T')[0]



    const price = props.price;
    const [item, setItem] = useState(1);
    const [days, setDays] = useState(1);
    const total = item * days * price;
    const option = [1, 2, 3, 4, 5];

    const nav = useNavigate()

    const { handleAdd } = useContext(UpdateContext)

    const onclick = () => {
        if (localStorage.getItem('authToken'))
            handleAdd({ id: props.id, name: props.name, img: props.img, price: props.price, quantity: item, delDate: minDelDate, retDate: minRetDate })
        else {
            setTimeout(() => {
                nav('/login')
            }, 0)
        }
    }

    let cartData = []
    if (JSON.parse(localStorage.getItem('carts'))) cartData = JSON.parse(localStorage.getItem('carts'));




    return (
        <div className="card" style={{ backgroundColor: mode && light, color: mode && "#212121" }}>
            <img className="card-img-top" src={props.img} alt="" />
            <div className="card-body d-inline">
                <h5 className="card-title">{props.name}</h5>
                <p className="card-text" id='desc-text'>{props.desc}</p>
            </div>
            <div className="select" style={{ backgroundColor: mode &&light, color: mode && "#212121" }}>
                <div className="quant">
                    <p>Quantity: </p>
                    <select className="form-select" style={{ backgroundColor: mode && light, color: mode && "#212121" }} aria-label="Default select example" onChange={(e) => { setItem(e.target.value) }}
                        defaultValue={item}>
                        {
                            option.map((op, id) => <option key={id} value={op} >{op}</option>)
                        }
                    </select>
                </div>
                <div className="quant">
                    <p>No of Days: </p>
                    <select className="form-select" aria-label="Default select example" style={{ backgroundColor: mode && light, color: mode && "#212121" }} onChange={(e) => { setDays(e.target.value) }}
                        defaultValue={days}>
                        {
                            option.map((op, id) => <option key={id} value={op} >{op}</option>)
                        }
                    </select>
                </div>
                <hr className='hr'></hr>
            </div>
            <div className="price">
                {cartData.find(item => item.id === props.id) ? <Link to='/cart' style={{ backgroundColor: mode && "#2d4f73", color: mode && light }} className="btn btn-primary">Go to cart</Link> : <Link to='/' onClick={onclick} className="btn btn-primary" style={{ backgroundColor: mode && "#2d4f73", color: mode && light }}> Add to Cart</Link>}
                <p>Total Price:{total} <span>({props.price}/day)</span></p>
            </div>
        </div >
    )
}