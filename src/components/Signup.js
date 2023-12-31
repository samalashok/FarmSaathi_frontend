import React, { useContext } from 'react'
import { useState } from 'react'
import '../style/login.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Context } from './ContextData'

export default function Signup() {
    const light = "#cccccc"
    const dark = "#787878"
    const { mode } = useContext(Context)

    const [userDetails, setUserDetails] = useState({ name: "", email: "", phone: "", password: "", repassword: "" })

    const onchange = (e) => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value })
    }
    const nav = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        // const res = await fetch("https://farm-saathi-backend.vercel.app/api/createUser", {
        //     method: "POST",
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ name: userDetails.name, email: userDetails.email, password: userDetails.password, repassword: userDetails.repassword })
        // })
        // const json = await res.json();
        await axios.post('https://farm-saathi-backend.vercel.app/api/createUser', {
            name: userDetails.name, email: userDetails.email, phone: userDetails.phone, password: userDetails.password
        }).then((res) => {
            alert(res.data.msg);
            nav('/login')
        }).catch((err) => alert(err));
    }
    const [seePass, setSeePass] = useState(true)
    return (
        <div className="main-signup">
            <div className="wrapper wrapper-signup" style={{ backgroundColor: mode && dark, color: mode && light }}>
                <div className="form-container">
                    <div className="slide-controls">
                        <label htmlFor="signup" className="slide signup">Sign Up</label>
                        <div className="slider-tab"></div>
                    </div>
                    <div className="form-inner">
                        <form onSubmit={handleSubmit} className="signup signup-form">
                            <div className="field">
                                <input value={userDetails.name} type="text" name="name" placeholder="Full Name" onChange={onchange} style={{ backgroundColor: mode && light, color: mode && dark }} required />
                            </div>
                            <div className="field">
                                <input value={userDetails.email} type="email" name="email" placeholder="Email Address" onChange={onchange} style={{ backgroundColor: mode && light, color: mode && dark }} required />
                            </div>
                            <div className="field">
                                <input value={userDetails.phone} type="number1" name="phone" placeholder="Phone no" onChange={onchange} style={{ backgroundColor: mode && light, color: mode && dark }} required />
                            </div>
                            <div className="field">
                                {seePass ? <i onClick={() => setSeePass(d => !d)} className="fa-solid signup-eye fa-eye-slash" style={{ color: mode && dark }}></i> : <i onClick={() => setSeePass(p => !p)} className="fa-solid signup-eye fa-eye" style={{ color: mode && dark }}></i>}
                                <input value={userDetails.password} type={seePass ? "password" : "text"} name="password" placeholder="Password" onChange={onchange} style={{ backgroundColor: mode && light, color: mode && dark }} required />
                            </div>
                            {/* <div className="field">
                                <input value={userDetails.repassword} type="password" name="repassword" placeholder="Confirm password" onChange={onchange} required />
                            </div> */}
                            <button type="submit" class="btn field">Create account</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
