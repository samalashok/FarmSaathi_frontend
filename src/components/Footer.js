import React, { useContext } from 'react'
import "../style/footer.css"
import { Link } from 'react-router-dom'
import { Context } from './ContextData'
export default function Footer() {
    const light = "#cccccc"
    const { mode } = useContext(Context)
    return (
        <div className="footer">
            <div className="foot-cnt">
                <div className="part" id="part-1">
                    <h5>What are we?</h5>
                    <p style={{ color: mode && light }}>We are the new age revolutionaries, trying to make all kinds of farming as easy as possible.
                        We are proud to say that we can change the lives of each and every farmer in our country.
                        We are here to help, and provide all equipments for farming to make lifes easy. Farmers can
                        easily
                        rent/ buy
                        any available product at low cost and we will try to deliver asap.</p>
                </div>
                <div className="part" id="part-2">
                    <h5>Cities we operate on:</h5>
                    <ul style={{ color: mode && light }}>
                        <li>Delhi</li>
                        <li>Mumbai</li>
                        <li>Bhubaneshwar</li>
                        <li>Raipur</li>
                        <li>Kolkata</li>
                        <li>& 8 more.</li>
                    </ul>
                </div>
                <div className="part" id="part-3">
                    <h5> Services We Provide: </h5>
                    <ul style={{ color: mode && light }}>
                        <li>Rent any Tool/Machine</li>
                        <li>Buy any Tool/Machine</li>
                        <li>Check on road Prices</li>
                        <li>24*7 Assistance</li>
                        <li>Farmer Friendly Price</li>
                        <li>& many more.</li>
                    </ul>
                </div>
                <div className="part" id="part-4">
                    <h5>Our Address:</h5>
                    <p style={{ color: mode && light }}>At- Saraswati Nagar, PO/PS- Kota<br />Dist- Raipur, State- Chhatisgarh<br />Pin- 492001</p>
                    <h4 style={{ color: mode && light }}>Follow us on:</h4>
                    <div className='icons'>
                        <a id="facebook" className="btn btn-primary btn-floating m-1" href="#!" role="button"><i
                            className="fa fa-facebook-f"></i></a>
                        <a id="twitter" className="btn btn-primary btn-floating m-1" href="#!" role="button"><i
                            className="fab fa-twitter"></i></a>
                        <a id="gmail" className="btn btn-primary btn-floating m-1" href="#!" role="button"><i
                            className="fab fa-google"></i></a>
                        <a id="insta" className="btn btn-primary btn-floating m-1" href="#!" role="button"><i
                            className="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>
            <div className="cright" style={{ color: mode && light }}>
                <p style={{ color: mode && light }}><i className="fa-solid fa-copyright"></i> 2023 Copyright: The Farmers Company Pvt. Ltd. All rights
                    reserved.
                </p>
                <Link to="/terms" style={{ color: mode && light }}>Terms & Conditions</Link>
                <Link to="/about" style={{ color: mode && light }}>Know more.</Link>
            </div>
        </div>
    )
}
