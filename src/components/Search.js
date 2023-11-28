import React from 'react'
import Card from './Card'
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import '../style/products.css'
import { Context} from './ContextData';
import { Link } from 'react-router-dom';

export default function Search() {
    const { searchText } = useContext(Context)
    // const dark = "#202124"
    const light = "#bfbfbf"
    const [products, setProducts] = useState([])
    useEffect(() => {
        // handleSearch('')
        axios.get('https://farm-saathi-backend.vercel.app/api/getProducts').then((products) => {
            setProducts(products.data)
        }).catch((err) => (err))
    }, [])
    // console.log(searchText)
    const { mode } = useContext(Context)
    return (
        <div className='cards'>
            <h3 className='heading' style={{ color: mode && light }}>Search Result: </h3>
            {searchText ? <><div className="prods">
                {products.filter((prod) => {
                    return prod.name.toLowerCase().includes(searchText.toLowerCase());
                }).map((prod, i) => {
                    return (<Card className='card-in' id={prod._id} key={i} name={prod.name} desc={prod.desc} price={prod.price} brand={prod.brand} img={prod.img} />)
                })}
            </div>
                <p className='disclaim-prod' style={{ color: mode && light }}><i className="fa-solid fa-circle-exclamation"></i>The price shown above may not be the final price. It's only for getting an idea.</p></> : <div style={{ color: mode && light }}>
                !!!Type something in the search box or go to <Link to="/">home page</Link>!!!
            </div>}
        </div>
    )
}
