import React, { useEffect, useState } from 'react'
import '../style/account.css'
import { useNavigate } from 'react-router-dom'
import OrderCard from './OrderCard';
import axios from 'axios';

export default function Account() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [payments, setPayments] = useState([]);
    useEffect(() => {
        if (!localStorage.getItem('authToken')) {
            navigate('/login')
        }
        else {
            axios.post('https://farm-saathi-backend.vercel.app/account/getOrders', { email: localStorage.getItem('email') }).then((res) => {
                const arr = res.data;
                arr.sort((a, b) => a.date > b.date ? -1 : 1);
                setOrders(arr);
            }).catch(err => console.log(err))
            axios.post('https://farm-saathi-backend.vercel.app/account/getPayments', { email: localStorage.getItem('email') }).then((res) => {
                const arr = res.data;
                arr.sort((a, b) => a.date > b.date ? -1 : 1);
                setPayments(arr);
            }).catch(err => console.log(err))
        }
        // eslint-disable-next-line
    }, [])

    return (
        <div className='account-main'>
            <div className="user-details-main">
                <h3 className='acc-heading'>User Profile</h3>
                <hr></hr>
                <div className="profile-main">
                    <p>Name:<span>{localStorage.getItem('name')}</span></p>
                    <p>Email:<span>{localStorage.getItem('email')}</span></p>
                    <p>Phone:<span>{localStorage.getItem('phone')}</span></p>
                </div>
                <button className='chng-pass btn btn-warning'>Change Password</button>
            </div>
            <div className="order-details-main">
                <h3>Order History</h3>
                <hr></hr>
                <table className="order-table">
                    <thead>
                        <tr>
                            <th scope="col">Order id</th>
                            <th scope="col">Date: </th>
                            <th scope="col">Items</th>
                            <th scope="col">Price </th>
                            <th scope="col">Payment Status</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divide">
                        {
                            orders.map((order, i) => {
                                return <OrderCard data={{
                                    id: order.order_details.id,
                                    img: order.cart_details[0].img,
                                    items: order.cart_details.length,
                                    price: order.order_details.amount,
                                    status: order.status,
                                    date: order.date
                                }} order={order}
                                    payment={payments} key={i}
                                />
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div className="address-details-main">

            </div>
        </div>
    )
}
