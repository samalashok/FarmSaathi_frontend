import React from 'react'
import '../style/login.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import { Context, UpdateContext } from './ContextData'
import axios from 'axios'

export default function Login() {
    const light = "#cccccc"
    const dark = "#787878"
    const {mode}=useContext(Context)

    const { handleSetData } = useContext(UpdateContext)
    const [userDetails, setUserDetails] = useState({ email: "", password: "" })
    const [seePass, setSeePass] = useState(true)
    const navigate = useNavigate();
    const onchange = (e) => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('https://farm-saathi-backend.vercel.app/api/loginUser', {
            email: userDetails.email, password: userDetails.password
        }).then((res) => {
            alert(res.data.msg);
            if (res.data.authToken) {
                localStorage.clear();
                localStorage.setItem('authToken', res.data.authToken);
                localStorage.setItem('name', res.data.name);
                localStorage.setItem('email', res.data.email);
                localStorage.setItem('phone', res.data.phone);
                localStorage.setItem('carts', JSON.stringify([]));
                axios.post('https://farm-saathi-backend.vercel.app/api/getCartData', { email: localStorage.getItem('email') }).then(response => {
                    localStorage.setItem('carts', JSON.stringify(response.data[0].data));
                    handleSetData({ data: response.data[0].data });
                }).catch(err => (err))
                navigate('/');
            }
        }).catch((err) => alert(err));
    }

    return (
        <>
            <div className="wrapper" style={{backgroundColor: mode && dark, color: mode && light}}>
                <div className="form-container">
                    <div className="slide-controls">
                        <label htmlFor="login" className="slide login">Login</label>
                        <div className="slider-tab"></div>
                    </div>
                    <div className="form-inner">
                        <form onSubmit={handleSubmit} className="login login-form">
                            <div className="field">
                                <input type="email" onChange={onchange} name="email" value={userDetails.email} placeholder="Email Address" style={{backgroundColor: mode && light, color: mode && dark}} required />
                            </div>
                            <div className="field pass-field">
                                {seePass ? <i onClick={() => setSeePass(p => !p)} className="fa-solid fa-eye-slash"></i> : <i onClick={() => setSeePass(p => !p)} className="fa-solid fa-eye"></i>}
                                <input type={seePass ? 'password' : 'text'} onChange={onchange} name="password" value={userDetails.password} placeholder="Password" style={{backgroundColor: mode && light, color: mode && dark}} required />
                                {/* <i className="fa-solid fa-eye"></i> */}
                            </div>
                            <div className="pass-link">
                                <Link to="/" style={{ color: mode && light }}>Forgot password?</Link>
                            </div>
                            <button type="submit" class="btn field">Login</button>
                            <div className="signup-link">
                                Not a member? <Link to="/signup" style={{ color: mode && "#e3e3e3" }}>Signup now</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
