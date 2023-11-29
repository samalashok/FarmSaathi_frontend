import React, { useEffect, useState, useContext } from 'react'
import '../style/account.css'
import { useNavigate,Link } from 'react-router-dom'
import OrderCard from './OrderCard';
import axios from 'axios';
import { Context } from './ContextData';
import AddressCard from './AddressCard';

export default function Account() {
    const { mode } = useContext(Context)
    // const dark = "#202124"
    // const light = "#bfbfbf"
    const dark = "#202124"
    const light = "#cccccc"
    
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [payments, setPayments] = useState([]);
    const [address, setAddress] = useState([]);
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
            axios.post('https://farm-saathi-backend.vercel.app/api/getAddress', {
                email: localStorage.getItem('email')
            }).then((response) => {
                setAddress(response.data)
            }).catch((error) => console.log(error))
        }
        // eslint-disable-next-line
    }, [])

    return (
        <div className='account-main'>
            <div className="user-details-main" style={{ backgroundColor: mode && light, color: mode && dark }}>
                <h3 className='acc-heading'>User Profile</h3>
                <hr></hr>
                <div className="profile-main">
                    <p>Name:<span>{localStorage.getItem('name')}</span></p>
                    <p>Email:<span>{localStorage.getItem('email')}</span></p>
                    <p>Phone:<span>{localStorage.getItem('phone')}</span></p>
                </div>
                <Link to="/forgotPass" className='chng-pass btn btn-warning'>Change Password</Link>
            </div>
            <div className="order-details-main" style={{ backgroundColor: mode && light, color: mode && dark }}>
                <h3>Order History</h3>
                <hr></hr>
                <table className="order-table" style={{ color: mode && dark }}>
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
            <div className="address-details-main" style={{ backgroundColor: mode && light, color: mode && dark }}>
                <h3>Saved Addresses:</h3>
                <hr></hr>
                <div className='address-dtl'>
                    {
                        address.map((data, i) => {
                            return <AddressCard key={i} data={data} type={false} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}
