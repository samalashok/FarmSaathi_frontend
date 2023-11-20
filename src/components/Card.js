import React, { useState, useContext } from 'react'
import '../style/card.css'
import { Link, useNavigate } from 'react-router-dom'
import { UpdateContext } from './ContextData';

export default function Card(props) {
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
        <div className="card">
            <img className="card-img-top" src={props.img} alt="" />
            <div className="card-body d-inline">
                <h5 className="card-title">{props.name}</h5>
                <p className="card-text" id='desc-text'>{props.desc}</p>
            </div>
            <div className="select">
                <div className="quant">
                    <p>Quantity: </p>
                    <select className="form-select" aria-label="Default select example" onChange={(e) => { setItem(e.target.value) }}
                        defaultValue={item}>
                        {
                            option.map((op, id) => <option key={id} value={op} >{op}</option>)
                        }
                    </select>
                </div>
                <div className="quant">
                    <p>No of Days: </p>
                    <select className="form-select" aria-label="Default select example" onChange={(e) => { setDays(e.target.value) }}
                        defaultValue={days}>
                        {
                            option.map((op, id) => <option key={id} value={op} >{op}</option>)
                        }
                    </select>
                </div>
                <hr className='hr'></hr>
            </div>
            <div className="price">
                {cartData.find(item => item.id === props.id) ? <Link to='/cart' style={{ backgroundColor: '#4b9bc4' }} className="btn btn-primary">Go to cart</Link> : <Link to='/' onClick={onclick} className="btn btn-primary">Add to Cart</Link>}
                <p>Total Price:{total} <span>({props.price}/day)</span></p>
            </div>
        </div>
    )
}