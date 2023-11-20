import React, { useState } from 'react'
import '../style/newaddress.css'
import axios from 'axios'
export default function NewAddress() {
    const [address, setAddress] = useState({ name: "", phone: "", address1: "", address2: "", city: "", state: "", zip: "", loc: "" })
    const onchange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://farm-saathi-backend.vercel.app/api/setAddress', { ...address, email: localStorage.getItem('email') }).then(res => {
            window.location.reload(false);
        }).catch(err => console.log(err));
    }
    return (
        <form className='newadd-main' onSubmit={handleSubmit}>
            <div className="form-group form-gr-mr">
                <label htmlFor="inputName">Name</label>
                <input type="text" name="name" className="form-control" id="inputName" onChange={onchange} placeholder="e.g. Naveen Kumar" required />
            </div>
            <div className="form-group form-gr-mr">
                <label htmlFor="inputAddress">AddressLine 1</label>
                <input type="text" name="address1" className="form-control" id="inputAddress" onChange={onchange} placeholder="e.g. 1234 Main St" required />
            </div>
            <div className="form-group form-gr-mr">
                <label htmlFor="inputAddress2">AddressLine 2</label>
                <input type="text" name="address2" className="form-control" id="inputAddress2" onChange={onchange} placeholder="e.g. Apartment, studio, or floor" />
            </div>
            <div className="form-row city-state form-gr-mr">
                <div className="form-group col-md-3 form-gr-out">
                    <label htmlFor="inputCity">City</label>
                    <input type="text" name="city" className="form-control" id="inputCity" onChange={onchange} placeholder="e.g. Cuttack" required />
                </div>
                <div className="form-group col-md-3 form-gr-out">
                    <label htmlFor="inputState">State</label>
                    <input type="text" name="state" className="form-control" id="inputState" placeholder="e.g. Odisha"  onChange={onchange} required />
                </div>
                <div className="form-group col-md-3 form-gr-out">
                    <label htmlFor="inputZip">Zip</label>
                    <input type="text" name="zip" className="form-control" id="inputZip" placeholder="e.g. 452001" onChange={onchange} required />
                </div>
            </div>
            <div className="form-row city-state form-gr-mr">
                <div className="form-group col-md-3 form-gr-out">
                    <label htmlFor="inputPhone">Phone no</label>
                    <input type="number" name="phone" className="form-control phoneno" onChange={onchange} placeholder="e.g. 7325905357" id="inputPhone" required />
                </div>
                <div className="form-group col-md-3 form-gr-out">
                    <label htmlFor="inputPhone">Location</label>
                    <input type="text" name="loc" className="form-control phoneno" onChange={onchange} placeholder="e.g. Home, Office" id="inputType" required />
                </div>
            </div>
            <button type="submit" className=" new-add-btn">Continue</button>
        </form>
    )
}
