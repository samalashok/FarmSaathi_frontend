import React, { useEffect, useState, useContext } from 'react'
import Summary from './Summary'
import AddressCard from './AddressCard'
import NewAddress from './NewAddress'
import '../style/shipping.css'
import axios from 'axios'
import { Context, UpdateContext } from './ContextData'
import { useNavigate } from 'react-router-dom'

export default function Shipping() {

    const navigate = useNavigate()
    const { address } = useContext(Context)
    const { handleSetData, handleAddress } = useContext(UpdateContext)
    useEffect(() => {
        if (!localStorage.getItem('authToken')) {
            navigate('/login')
        }
        else {
            handleSetData({ data: JSON.parse(localStorage.getItem('carts')) });
            axios.post('https://farm-saathi-backend.vercel.app/api/getAddress', {
                email: localStorage.getItem('email')
            }).then((response) => {
                handleAddress(response.data)
            }).catch((error) => console.log(error))
        }
        // eslint-disable-next-line 
    }, [])

    const [active, setActive] = useState(0);
    const handleActive = (i) => {
        // console.log('shipping handle active',i)
        setActive(i)
    }
    return (
        <>
            <div className='shopping-cart-main'>
                < div className='cart-main' >
                    <h2>Shipping Detail</h2>
                    <hr></hr>
                    <div className="add-cards">
                        <div className="del-add-div">
                            <p className='del-head'>Delivery Address:</p>
                            <div className="add-cards-low">
                                {
                                    address.map((data, i) => {
                                        return <AddressCard key={i} onclick={() => handleActive(i)} isActive={i === active} data={data} type={true} />
                                    })
                                }
                            </div>
                        </div>
                        <div className="new-add-div">
                            <p className='del-head'>Add New Address:</p>
                            <NewAddress />
                        </div>
                    </div>
                </div >
                <Summary title="Payment" />
            </div >
        </>

    )
}
