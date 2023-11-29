import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function ForgotPassword() {
    const [flag, setFlag] = useState(false)
    const [pass, setPass] = useState()
    const [email, setEmail] = useState()
    const [otp, setOtp] = useState()
    const [user, setUser] = useState(false)
    const navigate = useNavigate()
    const resetPass = () => {
        axios.post('https://farm-saathi-backend.vercel.app/auth/verifyOtp', { email, otp, password: pass }).then(({ data }) => {
            alert(data.msg)
            if (data.success) navigate('/login')
        }).catch((err) => (err))
    }
    const sendOtp = () => {
        axios.post('https://farm-saathi-backend.vercel.app/auth/forgotPass', { email }).then(({ data }) => {
            alert(data.msg)
            if (data.success) {
                setFlag(true)
            }
        }).catch((err) => (err))
    }

    useEffect(() => {
        if (JSON.stringify(localStorage.getItem('authToken')))
            setUser(true)
    }, [])
    return (
        <div className="forgot-main text-center">
            <div className="card-header h5 text-white bg-primary">Password Reset</div>
            <div className="card-body px-5">
                <p className="card-text py-2">
                    An OTP will be sent to the given email id.
                </p>
                <div className="form-outline">
                    <label className="form-label" htmlFor="typeEmail">Email input</label>
                    {user ? <input type="email" id="typeEmail" className="form-control my-3" placeholder='e.g. demo@gmail.com' value={localStorage.getItem('email')} readOnly /> : flag ? <input type="email" id="typeEmail" className="form-control my-3" placeholder='e.g. demo@gmail.com' readOnly /> : <input type="email" id="typeEmail" className="form-control my-3" placeholder='e.g. demo@gmail.com' onChange={(e) => {
                        setEmail(e.target.value);
                    }} />}
                </div>
                {flag && <input type="text" value={otp} className="form-control my-3" placeholder='enter otp' onChange={(e) => {
                    setOtp(e.target.value);
                }} />}
                {flag && <input type='password' className="form-control my-3" onChange={(e) => {
                    setPass(e.target.value);
                }} name="password" value={pass} placeholder="new password" required />}
                {flag ? <Link to="" className="btn btn-primary w-100" onClick={resetPass}>Reset password</Link> : <Link to="" className="btn btn-primary w-100" onClick={sendOtp}>Send Otp</Link>}
                <div className="d-flex justify-content-between mt-4">
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Signup</Link>
                </div>
            </div>
        </div>
    )
}
