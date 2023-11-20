import React, { useState } from 'react'

export default function OrderCard({data}) {
    const date=new Date(data.date)
    const today=new Date();
    const [accord, setAccord] = useState(false)
    // console.log(date,today)
    const dateDiff=parseInt((new Date(today) - new Date(date)) / (1000 * 60 * 60 * 24))
    // console.log(dateDiff)
    return (
        <>
            <tr className='order-card-main'>
                <td>
                    #{data.id}
                </td>
                <td>
                    <img src={data.img} style={{ height: '1.5rem', width: '2rem' }} alt="" /> {data.items>1 &&<span className='more-items'>+ {data.items-1} more</span>}
                </td>
                <td>
                    {parseInt(data.price)/100}
                </td>
                <td>
                    {data.status}
                </td>
                <td>
                    {data.status==='success'?dateDiff===0?'order placed':dateDiff===1?'waiting for pickup':dateDiff===2?'order shipped':dateDiff===3?'order shipped':dateDiff===4?'out for delivery':dateDiff===5?'deliverd':'waiting for return':'order not placed'}
                </td>
                <td>
                    {accord ? <i className="fa-solid fa-chevron-up" onClick={() => {
                        setAccord(d => !d)
                    }}></i> : <i className="fa-solid fa-chevron-down" onClick={() => {
                        setAccord(d => !d)
                    }}></i>}
                </td>
            </tr>
            {accord && <div className="details-div-main">
                {"hello"}
            </div>}
        </>
    )
}
