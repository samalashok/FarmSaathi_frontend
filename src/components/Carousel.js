import React, { useEffect, useState } from 'react'
import '../style/carousel.css'
import axios from 'axios';
import { Context } from './ContextData'
import { useContext } from 'react';

export default function Carousel() {
    const [images, setImages] = useState([]);
    useEffect(() => {
        axios.get('https://farm-saathi-backend.vercel.app/api/getImages').then(result => setImages(result.data)).catch(error => error)
    }, []);
    let i = 0;
    const { mode } = useContext(Context)
    return (
        <div className="carousel" style={{ backgroundColor: mode && "#202124" }}>
            <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" style={{ border: mode && "0.15rem solid #d6d6d6" }}>
                <div className="carousel-inner">
                    {
                        images.map((img, id) => {
                            i++;
                            if (i === 1)
                                return (<div key={i} className="carousel-item active" style={{ border: mode && "none" }}>
                                    <img src={img.link} className="d-block w-100" alt="..." />
                                </div>)
                            else return (<div key={i} className="carousel-item" style={{ border: mode && "none" }}>
                                <img src={img.link} className="d-block w-100" alt="..." />
                            </div>)
                        })
                    }
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" ></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span className="carousel-control-next-icon"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}
