import React from 'react'
import Card from './Card'
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import '../style/products.css'
import { Context } from './ContextData';

export default function Products() {
    // const dark = "#202124"
    const light = "#bfbfbf"
    const [products, setProducts] = useState([])
    useEffect(() => {
        axios.get('https://farm-saathi-backend.vercel.app/api/getProducts').then((products) => {
        // axios.get('http://localhost:5000/api/getProducts').then((products) => {
            setProducts(products.data)
        }).catch((err) => (err))
    }, [])
    const { mode } = useContext(Context)
    return (
        <div className='cards'>
            <h3 className='heading' style={{ color: mode && light }}>Our Products: </h3>
            <div className="prods">
                {products.map((prod, i) => {
                    return (<Card className='card-in' id={prod._id} key={i} name={prod.name} desc={prod.desc} price={prod.price} brand={prod.brand} img={prod.img} />)
                })}
            </div>
            <p className='disclaim-prod' style={{ color: mode && light }}><i className="fa-solid fa-circle-exclamation"></i>The price shown above may not be the final price. It's only for getting an idea.</p>
        </div>
    )
}
