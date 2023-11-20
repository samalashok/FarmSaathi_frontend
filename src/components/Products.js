import React from 'react'
import Card from './Card'
import axios from 'axios';
import { useEffect, useState } from 'react';
import '../style/products.css'

export default function Products() {
    const [products, setProducts] = useState([])
    useEffect(() => {
        axios.get('http://localhost:5000/api/getProducts').then((products) => {
            setProducts(products.data)
        }).catch((err) => (err))
    }, [])
    return (
        <div className='cards'>
            <h3 className='heading'>Our Products: </h3>
            <div className="prods">
            {products.map((prod, i) => {
                return (<Card className='card-in' id={prod._id} key={i} name={prod.name} desc={prod.desc} price={prod.price} brand={prod.brand} img={prod.img} />)
            })}
            </div>
            <p className='disclaim-prod'><i className="fa-solid fa-circle-exclamation"></i>The price shown above may not be the final price. It's only for getting an idea.</p>
        </div>
    )
}
