import React, { useState, useEffect, useContext } from 'react'
import {UpdateContext } from './ContextData';

export default function ItemInfo({ item }) {
    //date logic
    const curr = new Date();
    const delDay = 5;
    const maxDay = 20;
    const minDelDate = new Date(new Date().setDate(curr.getDate() + delDay)).toISOString().split('T')[0]
    const maxDelDate = new Date(new Date().setDate(curr.getDate() + maxDay)).toISOString().split('T')[0]
    const minRetDate = new Date(new Date().setDate(curr.getDate() + delDay + 2)).toISOString().split('T')[0]
    const maxRetDate = new Date(new Date().setDate(curr.getDate() + maxDay + 2)).toISOString().split('T')[0]

    const [delDate, setDelDate] = useState(item.delDate);
    const [retDate, setRetDate] = useState(item.retDate);
    const [datediff, setDateDiff] = useState(parseInt(new Date(retDate) - new Date(delDate)) / (1000 * 60 * 60 * 24));


    //item-quantity change
    let [quantity, setQuantity] = useState(parseInt(item.quantity));

    const increment = () => setQuantity(q => q + 1)
    const decrement = () => setQuantity(q => q > 1 ? q - 1 : q)

    //delte itemfrom cart
    const { handleDelete } = useContext(UpdateContext)
    const onclick = () => {
        handleDelete({ id: item.id })
    }


    //totalprice
    const price = item.price;

    const total = quantity * datediff * price
    const onchange1 = (e) => {
        setDelDate(new Date(e.target.value).toISOString().split('T')[0])

    }
    const onchange2 = (e) => {
        setRetDate(new Date(e.target.value).toISOString().split('T')[0])
    }

    // update-cart
    const { handleUpdate } = useContext(UpdateContext);
    useEffect(() => {
        handleUpdate({ id: item.id, quantity: quantity, retDate: retDate, delDate: delDate });
        // eslint-disable-next-line
    }, [quantity, delDate, retDate])


    //checkdatelogic
    useEffect(() => {
        const checkDate = () => {
            if (new Date(delDate) > new Date(retDate)) {
                alert('enter correct date range')
                setDelDate(minDelDate)
                setRetDate(minRetDate)
            }
        }
        checkDate();
        setDateDiff(parseInt(new Date(retDate) - new Date(delDate)) / (1000 * 60 * 60 * 24))
    }, [delDate, retDate, minDelDate, minRetDate]);


    return (
        <tr>
            <th scope="row">{item.slno}</th>
            <td>
                <div className='p-details'>
                    <img src={item.img} alt="" />
                    <p>{item.name}</p>
                </div>
            </td>
            <td>
                <div className="s-wrapper">
                    <span className="minus" onClick={decrement}>-</span>
                    <span className="num" >{quantity}</span>
                    <span className="plus" onClick={increment} >+</span>
                </div>
                <button type="button" onClick={onclick} className="btn btn-danger delete-item">Delete Item</button>
            </td>
            <td>
                <div className='date-div'>
                    <p>From:<input className='date-in' onChange={onchange1} type='date' min={minDelDate} max={maxDelDate} value={delDate} /></p>
                    <p>To:<input className='date-in' onChange={onchange2} type='date' min={minRetDate} max={maxRetDate} value={retDate} /></p>
                </div>
            </td>
            <td>{item.price}</td>
            <td>{total}<p className='date-diff' >({datediff}&nbsp;days)</p></td>
        </tr>
    )
}
