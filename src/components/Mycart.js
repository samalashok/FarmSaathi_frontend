import React, { useContext, useEffect, useState } from 'react'
import '../style/mycart.css'
import {UpdateContext } from './ContextData'
import ItemInfo from './ItemInfo';
import Summary from './Summary';


export default function Mycart() {

    const cartData = JSON.parse(localStorage.getItem('carts'))

    //icrement-decrement
    const [count, setCount] = useState(0)
    useEffect(() => {
        setCount(cartData.length)
    }, [cartData.length]);


    const { handleSetData } = useContext(UpdateContext)
    useEffect(() => {
        handleSetData({ data: JSON.parse(localStorage.getItem('carts')) });
        // eslint-disable-next-line
    }, []);

    
    return (
        <div className='shopping-cart-main'>
            < div className='cart-main' >
                <div className="heading-name">
                    <h2>Shopping Cart</h2>
                    <h2>{count} Items</h2>
                </div>
                <hr></hr>
                {cartData && cartData.length > 0 ? <table className="table table-borderless">
                    <thead>
                        <tr>
                            <th scope="col">No.</th>
                            <th scope="col">Product Details</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Rent Date</th>
                            <th scope="col">Price/day</th>
                            <th scope="col">Total Price</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {
                            cartData.map((it, i) => {
                                return (
                                    <ItemInfo key={i} item={
                                        {
                                            id: it.id,
                                            slno: i + 1,
                                            name: it.name,
                                            price: it.price,
                                            quantity: it.quantity,
                                            img: it.img,
                                            retDate: it.retDate,
                                            delDate: it.delDate
                                        }

                                    } />
                                )
                            })
                        }
                    </tbody>
                </table> :
                    <div className="empty-cart">
                        <p>Your Cart is Empty</p>
                        <img className='cart-img-empty' src={'https://i.postimg.cc/bNMSs7RF/Screenshot-2023-11-11-145617.png'} alt="" />
                    </div>
                }
            </div >
            <Summary title="Checkout"/>
        </div >
    )
}
