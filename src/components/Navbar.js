import React, { useContext, useEffect} from 'react'
import '../style/navbar.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Context, UpdateContext } from './ContextData'
import axios from 'axios'

export default function Navbar(props) {
    const navigate = useNavigate();
    const { handleSetData } = useContext(UpdateContext)
    const { carts } = useContext(Context)
    const logout = () => {
        alert('Logged out, See you again');
        if (carts && carts.length > 0) storeDataToDB();
        localStorage.clear();
        navigate('/');
        window.location.reload(false);
    }
    function storeDataToDB() {
        axios.post('http://localhost:5000/api/addCartToDB', { email: localStorage.getItem('email'), data: carts })
            .then().catch(err => console.error(err));
    }
    // setTimeout(() => {
    //     if (localStorage.getItem('authToken')) {
    //         logout();
    //     }
    // }, 1800000)
    let cartData = []
    if (JSON.parse(localStorage.getItem('carts'))) cartData = JSON.parse(localStorage.getItem('carts'));
    useEffect(() => {
        if (cartData) {
            handleSetData({ data: cartData })
        }
        // eslint-disable-next-line
    }, [])


    return (
            <div className="header-div" >
                <div className="img-div" >
                    <Link to="/"><img className="logo-img" src={"https://i.postimg.cc/MTW9bGT2/logo-main.png"} alt="" /></Link>
                    <Link to="/" className="logo-name-a">Farm Saathi</Link>
                </div>
                {
                    localStorage.getItem('authToken') &&
                    <div className="user-welcome user-div" >
                        <p>Hi, {localStorage.getItem('name').toUpperCase().split(' ')[0]}</p>
                    </div>
                }
                <div className="search-div">
                    <input id="search-bar" type="text" name="ss" placeholder="Search for equipments" />
                    <i className="fa-solid fa-magnifying-glass"></i>
                </div>
                <div className="nav-div" >
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/account">My Account</NavLink>
                    <NavLink to="/about" >About Us</NavLink>
                </div>
                <div className="mode-div" >
                    <i className="fa-regular fa-sun light-mode-logo"></i>
                    <label className="switch">
                        <input type="checkbox" />
                        <span className="slider round"></span>
                    </label>
                    <i className="fa-solid fa-sun dark-mode-logo"></i>
                </div>
                <div className="btn-div" >
                    {
                        localStorage.getItem('authToken') ?
                            <>
                                <Link to='/cart' id="btn2" className="btn cart-btn" ><i className="fa-solid fa-cart-shopping"></i><span>Cart</span>
                                    {carts.length > 0 && <p className="badge-cart">{carts.length}</p>}
                                </Link>
                                <Link to='' onClick={logout} className="btn"><i
                                    className="fa-solid fa-user"></i><span>Log Out</span>
                                </Link>
                            </>
                            : <Link to='/login' className="btn" ><i
                                className="fa-solid fa-user"></i><span>Log In</span></Link>
                    }
                </div>
                <div className="profile-div">
                    <Link className="profile-bar"to="/account"><i className="fa-regular fa-user profile-icon"></i>
                   {localStorage.getItem('authToken')?localStorage.getItem('name').toUpperCase().split(' ')[0]: "Profile"}</Link>
                    
                </div>
            </div>
    )
}
