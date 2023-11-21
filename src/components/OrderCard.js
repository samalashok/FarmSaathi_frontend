import React, { useState } from 'react'
import '../style/order.css'
import OrderDetails from './OrderDetails';
export default function OrderCard({ data, order, payment }) {
    const [accord, setAccord] = useState(false)
    const succCol = data.status === 'success' ? { color: "green", margin: "auto 0" } : { color: "red", margin: "auto 0" }
    let pay = { id: "", date: "" }
    let totalq = 0
    let totala = 0
    for (let i = 0; i < payment.length; i++) {
        const p = payment[i]
        if (p.order_id === data.id) {
            pay = { id: p.payment_id, date: p.date.toString().split("T")[0] }
            break;
        }
    }
    console.log(order)
    for (let i = 0; i < order.cart_details.length; i++) {
        const o = order.cart_details[i]
        totalq += parseInt(o.quantity)
        totala += parseInt(o.quantity) * (parseInt(o.price) * parseInt(new Date(o.retDate) - new Date(o.delDate)) / (1000 * 60 * 60 * 24))
    }

    return (
        <>
            <tr className='order-card-main'>
                <td>
                    #{data.id}
                </td>
                <td>
                    {data.date.toString().split("T")[0]}
                </td>
                <td>
                    <img src={data.img} style={{ height: '1.5rem', width: '2rem' }} alt="" /> {data.items > 1 && <span onClick={() => {
                        data.status === 'success' && setAccord(d => !d)
                    }} className='more-items'>+ {data.items - 1} more</span>}
                </td>
                <td>
                    {parseInt(data.price) / 100}
                </td>
                <td>
                    <p style={succCol}>{data.status}</p>
                </td>
                <td>
                    {data.status === 'success' ? accord ? <i className="fa-solid fa-chevron-up" onClick={() => {
                        setAccord(d => !d)
                    }}></i> : <i className="fa-solid fa-chevron-down" onClick={() => {
                        setAccord(d => !d)
                    }}></i> : ""}
                </td>
            </tr>
            {accord && data.status === 'success' && <tr className="details-div-main">
                <td colspan="6">
                    <div className='reciept-div'>
                        <div className='receipt-det'>
                            <span>Receipt</span>
                            <span>Id: &nbsp; {order.order_details.receipt}</span>
                        </div>
                        <hr />
                        {order.cart_details.map((or, i) =>
                            <OrderDetails or={or} />
                        )}
                        <div className='pay-det'>
                            <div className='pay-head'>Payment Details:<hr /></div>
                            <div className='pay-det-one'>
                                <span>Order Id: &nbsp;{data.id}</span>
                                <span>Payment Id: &nbsp;{pay.id}</span>
                                <span>Date: &nbsp;{pay.date}</span>
                            </div>
                            <div className='pay-det-one'>
                                <span>Total: &nbsp;<i className="fa-solid fa-indian-rupee-sign"></i>{totala}</span>
                                <span>Shipping & Tax: &nbsp;<i className="fa-solid fa-indian-rupee-sign"></i>{totalq * 200}</span>
                                <span>Sub Total: &nbsp;<i className="fa-solid fa-indian-rupee-sign"></i>{data.price / 100}</span>
                            </div>
                        </div>
                    </div>
                </td>
            </tr >}
        </>
    )
}
