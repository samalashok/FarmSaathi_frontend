import React, { useContext, useEffect} from 'react'
import '../style/navbar.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Context, UpdateContext } from './ContextData'
import axios from 'axios'


export default function Navbar() {
    const dark = "#202124"
    // const light = "#bfbfbf"
    const light = "#cccccc"
    console.log('render')

    const navigate = useNavigate();
    const { handleSetData } = useContext(UpdateContext)
    const { carts } = useContext(Context)
    const logout = () => {
        alert('Logged out, See you again');
        if (carts && carts.length > 0) storeDataToDB();
        localStorage.clear();
        navigate('/');
        // window.location.reload(false);
    }
    function storeDataToDB() {
        axios.post('https://farm-saathi-backend.vercel.app/api/addCartToDB', { email: localStorage.getItem('email'), data: carts })
            .then().catch(err => console.error(err));
    }
    let cartData = []
    if (JSON.parse(localStorage.getItem('carts'))) cartData = JSON.parse(localStorage.getItem('carts'));
    useEffect(() => {
        if (cartData) {
            handleSetData({ data: cartData })
        }
        // eslint-disable-next-line
    }, [])


    //theme dark-light
    const { handleMode } = useContext(UpdateContext)
    const { mode } = useContext(Context)

    //searchbar logic
    const { listItem } = useContext(Context)
    const { searchText } = useContext(Context)
    const { handleSearch } = useContext(UpdateContext)
    return (
        <div className="header-div" style={{ backgroundColor: mode && dark, color: mode && light, boxShadow: mode && "0 3px 6px 0 #323233" }}>
            <div className="img-div" >
                <Link to="/"><img className="logo-img" src={"https://i.postimg.cc/MTW9bGT2/logo-main.png"} alt="" /></Link>
                <Link to="/" className="logo-name-a" style={{ color: mode && light }}>Farm Saathi</Link>
            </div>
            {
                localStorage.getItem('authToken') &&
                <div className="user-welcome user-div" >
                    <p>Hi, {localStorage.getItem('name').toUpperCase().split(' ')[0]}</p>
                </div>
            }
            <div className="search-div">
                <input id="search-bar" type="text" name="ss" value={searchText} placeholder="Search for equipments" style={{ backgroundColor: mode && light }} onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        navigate('/search')
                    }
                }} onChange={(e) => handleSearch(e.target.value)} />
                <i className="fa-solid fa-magnifying-glass" onClick={()=>navigate('/search')}></i>
                <ul className='search-drop-down' style={{ backgroundColor: mode && light, color: mode && dark }}>
                    {searchText && listItem.filter((it) => {
                        return searchText && it.toLowerCase().includes(searchText.toLowerCase())
                    }).map((it) => {
                        return searchText && <li onClick={(e)=>{
                            handleSearch(it.toString());
                            navigate('/search')
                        }} value={it}>{it}</li>
                    })}
                </ul>
            </div>
            <div className="nav-div" >
                <NavLink to="/" style={{ color: mode && light }}>Home</NavLink>
                <NavLink to="/account" style={{ color: mode && light }}>My Account</NavLink>
                <NavLink to="/about" style={{ color: mode && light }}>About Us</NavLink>
            </div>
            <div className="mode-div" >
                <i className="fa-regular fa-sun light-mode-logo"></i>
                <label className="switch">
                    <input type="checkbox" onClick={handleMode} />
                    <span className="slider round"></span>
                </label>
                <i className="fa-solid fa-moon dark-mode-logo" style={{ color: mode && light }}></i>
            </div>
            <div className="btn-div" >
                {
                    localStorage.getItem('authToken') ?
                        <>
                            <Link to='/cart' id="btn2" className="btn cart-btn" style={{ backgroundColor: mode && light, color: mode && "#212121" }} ><i className="fa-solid fa-cart-shopping"></i><span>Cart</span>
                                {carts.length > 0 && <p className="badge-cart">{carts.length}</p>}
                            </Link>
                            <Link to='' style={{ backgroundColor: mode && light, color: mode && "#212121" }} onClick={logout} className="btn"><i
                                className="fa-solid fa-user"></i><span>Log Out</span>
                            </Link>
                        </>
                        : <Link to='/login' style={{ backgroundColor: mode && light, color: mode && "#212121" }} className="btn" ><i
                            className="fa-solid fa-user"></i><span>Log In</span></Link>
                }
            </div>
            <div className="profile-div">
                <Link className="profile-bar" to="/account"><i className="fa-regular fa-user profile-icon"></i>
                    {localStorage.getItem('authToken') ? localStorage.getItem('name').toUpperCase().split(' ')[0] : "Profile"}</Link>

            </div>
        </div>
    )
}
