import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ForgotPassword() {
    const [flag, setFlag] = useState(false)
    const [pass, setPass] = useState()

    const resetPass = () => {
        axios.post('https://farm-saathi-backend.vercel.app/auth/verifyOtp', { email: localStorage.getitem('email'), password: pass }).then(({ data }) => {
            if (data.success) {
                alert("password reset successful, You can Login Now!!!")
            }
            else {
                alert("something went wrong")
            }
        }).catch((err) => (err))
    }
    const sendOtp = () => {
        axios.post('https://farm-saathi-backend.vercel.app/auth/forgotPass', { email: localStorage.getitem('email') }).then(({ data }) => {
            alert(data.msg)
            if (data.success) {
                setFlag(true)
            }
        }).catch((err) => (err))
    }

    return (
        <div className="forgot-main text-center">
            <div className="card-header h5 text-white bg-primary">Password Reset</div>
            <div className="card-body px-5">
                <p className="card-text py-2">
                    An OTP will be sent to the given email id.
                </p>
                <div className="form-outline">
                    <label className="form-label" for="typeEmail">Email input</label>
                    <input type="email" id="typeEmail" className="form-control my-3" placeholder='e.g. demo@gmail.com' />
                </div>
                {flag && <input type="text" className="form-control my-3" placeholder='e.g. 897547' />}
                {flag && <input type='password' className="form-control my-3" onChange={(e)=>{
                    setPass(e.target.value);
                }} name="password" value={pass} placeholder="Password" required />}
                {flag ? <Link to="" className="btn btn-primary w-100" onClick={resetPass}>Reset password</Link> : <Link to="" className="btn btn-primary w-100" onClick={sendOtp}>Send Otp</Link>}
                <div className="d-flex justify-content-between mt-4">
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Signup</Link>
                </div>
            </div>
        </div>
    )
}
