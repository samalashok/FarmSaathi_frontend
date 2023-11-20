import React, { useContext } from 'react'
import '../style/mycart.css'
import { Context } from './ContextData'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Summary(props) {
    const cartData = JSON.parse(localStorage.getItem('carts'))
    const addressData = JSON.parse(localStorage.getItem('address'))
    //order summary logic
    const { carts } = useContext(Context);
    let tp = 0, sp = 0, ti = 0, st = 0;
    for (let i = 0; i < carts.length; i++) {
        const obj = carts[i];
        ti += parseInt(obj.quantity);
        tp += (parseInt(new Date(obj.retDate) - new Date(obj.delDate)) / (1000 * 60 * 60 * 24) * obj.price * obj.quantity)
        sp += parseInt(obj.quantity * 200)
    }
    st = tp + sp;

    const sumObj = {
        totalPrice: tp,
        shippingPrice: sp,
        totalItems: ti,
        subTotal: st
    };
    const nav = useNavigate()
    const onclick = async () => {
        if (props.title === 'Payment') {
            const name = localStorage.getItem('name')
            const email = localStorage.getItem('email')
            const phone = localStorage.getItem('phone')
            // console.log(sumObj.subTotal)
            const rand = await axios.get('https://www.random.org/strings/?num=1&len=20&digits=on&upperalpha=on&loweralpha=on&unique=on&format=plain&rnd=new').then(({ data }) => data).catch(err => err)
            const order = await axios.post('https://farm-saathi-backend.vercel.app/checkout/createOrder', {
                amount: parseFloat(sumObj.subTotal), receipt: `FS${name.substring(0, 3)}${email.substring(0, 3)}${rand}`
            }).then((result) => result.data.order).catch(err => console.log(err))
            // console.log(order)
            if (order) {
                const options = {
                    key: "rzp_test_ORMbGCBejAkUwU",
                    amount: parseInt(order.amount),
                    currency: "INR",
                    name: "FarmSaathi pvt_ltd",
                    description: "Product_rental_transaction",
                    image: "https://i.postimg.cc/MTW9bGT2/logo-main.png",
                    order_id: order.id,
                    handler: async function (response) {
                        alert('Payment Successful');
                        const paymetDetails = {
                            payment_id: response.razorpay_payment_id,
                            order_id: response.razorpay_order_id,
                            signature: response.razorpay_signature,
                            amount: parseInt(order.amount)
                        }
                        await axios.post('https://farm-saathi-backend.vercel.app/checkout/storeOrder', {
                            email: email,
                            order_details: order,
                            cart_details: cartData,
                            status: "success",
                            address_details: addressData
                        })
                        await axios.post('https://farm-saathi-backend.vercel.app/checkout/storePayment', { ...paymetDetails, email: email })
                        await axios.post('https://farm-saathi-backend.vercel.app/api/deleteCartData', { email: email })
                        localStorage.setItem('carts', JSON.stringify([]))
                        localStorage.setItem('address', JSON.stringify({}))
                        nav('/')
                        window.location.reload(false)
                    },
                    prefill: {
                        "name": name,
                        "email": email,
                        "contact": phone
                    },
                    notes: {
                        "address": "Raipur, CG, India"
                    },
                    theme: {
                        "color": "#3399cc"
                    },
                    timeout: 300
                };
                const rpay = window.Razorpay(options);
                rpay.open();
                rpay.on('payment.failed', function (response) {
                    axios.post('https://farm-saathi-backend.vercel.app/checkout/storeOrder', {
                        email: email,
                        order_details: order,
                        cart_details: cartData,
                        status: "failed",
                        address_details: addressData
                    })
                    alert('payment failed, Please try again');
                    nav('/cart')
                })
            }
            else {
                alert("order could not be generated")
            }
        }
        else {
            nav('/shipping')
        }
    }

    return (
        <div className="summary-main">
            <div className="heading-name-summ">
                <h4>Order Summary</h4>
            </div>
            <hr></hr>
            <div className="heading-name-inner">
                <h5>Total Items:</h5>
                <h6><i className="fa-solid fa-indian-rupee-sign"></i>&nbsp;{sumObj.totalItems}</h6>
            </div>
            <hr></hr>
            <div className="heading-name-inner">
                <h5>Total Price:</h5>
                <h6><i className="fa-solid fa-indian-rupee-sign"></i>&nbsp;{sumObj.totalPrice}</h6>
            </div>
            <hr></hr>
            <div className="heading-name-inner">
                <h5>Tax & Shipping cost:</h5>
                <h6><i className="fa-solid fa-indian-rupee-sign"></i>&nbsp;{sumObj.shippingPrice}</h6>
            </div>
            <hr></hr>
            <div className="heading-name-inner">
                <h5>Sub Total:</h5>
                <h6><i className="fa-solid fa-indian-rupee-sign"></i>&nbsp;{sumObj.subTotal}</h6>
            </div>
            <hr></hr>
            { }
            {props.title === 'Checkout' ? cartData && cartData.length > 0 ? <button onClick={onclick} className="btn btn-primary">Proceed to {props.title}</button> : <button onClick={onclick} className="btn btn-primary" disabled>Proceed to {props.title}</button> : localStorage.getItem('address') ? <button onClick={onclick} className="btn btn-primary">Proceed to {props.title}</button> : <button onClick={onclick} className="btn btn-primary" disabled>Proceed to {props.title}</button>}
        </div>
    )
}
