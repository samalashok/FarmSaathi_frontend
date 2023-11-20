import React from 'react'
import '../style/callus.css'
import { useState } from 'react'
import axios from 'axios'

export default function Callus() {
    const style = {
        color: "red"
    }
    const [contact, setContact] = useState({ name: "", email: "", phone: "", msg: "" })
    const onchange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (localStorage.getItem('authToken')) {
            axios.post('https://farm-saathi-backend.vercel.app/api/contactUs', { ...contact, name: localStorage.getItem('name'), email: localStorage.getItem('email') }).then(res => {
                alert(res.data.msg);
                setContact({ name: "", email: "", phone: "", msg: "" })
            }).catch(err => { alert(err) })
        }
        else {
            axios.post('https://farm-saathi-backend.vercel.app/api/contactUs', { ...contact }).then(res => {
                alert(res.data.msg);
                setContact({ name: "", email: "", phone: "", msg: "" })
            }).catch(err => { alert(err) })
        }
    }
    return (
        <div className='main-div-call'>
            <h3 className='heading-main'>Contact Us:</h3>
            <div className="main-cnt">
                <div className="call-area">
                    <div className="part">
                        <h3><i className="fa-sharp fa-solid fa-phone" style={style}></i>Call Us</h3>
                        <p>+91-7325905357</p>
                    </div>
                    <div className="part">

                        <h3><i className="fa-solid fa-location-dot" style={style}></i>Location</h3>
                        <p>Raipur, Chhatisgarh, 492001</p>
                    </div>
                    <div className="part">
                        <h3><i className="fa-sharp fa-solid fa-clock" style={style}></i>Business Hours</h3>
                        <p>Mon - Fri : 10AM to 06PM</p>
                    </div>
                </div>
                <div className="form-div">
                    <form onSubmit={handleSubmit} id="form" className="form-block">
                        {localStorage.getItem('authToken') ? <input id="name" type="text" name='name' value={localStorage.getItem('name')} placeholder="Full Name" className="box" disabled /> : <input id="name" type="text" name='name' value={contact.name} onChange={onchange} placeholder="Full Name" className="box" required />}
                        {localStorage.getItem('authToken') ? <input id="email" type="email" name='email' value={localStorage.getItem('email')} placeholder="Email" className="box" disabled /> : <input id="email" type="email" name='email' value={contact.email} onChange={onchange} placeholder="Email" className="box" required />}
                        <input id="phone" name='phone' value={contact.phone} onChange={onchange} type="number" placeholder="Phone No" className="box" required />
                        <textarea id="msg" name="msg" value={contact.msg} onChange={onchange} className="box" cols="20" rows="3" placeholder="Any Message?" required></textarea>
                        <input type="submit" className="btn" value="Submit" name="submit" />
                    </form>
                </div>
            </div>
        </div>
    )
}
