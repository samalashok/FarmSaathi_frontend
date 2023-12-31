import './style/app.css';
import './components/Navbar'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import Callus from './components/Callus';
import Terms from './components/Terms';
import About from './components/About';
import Carousel from './components/Carousel';
import Products from './components/Products';
import Signup from './components/Signup';
import Account from './components/Account';
import Mycart from './components/Mycart';
import Shipping from './components/Shipping';
import { useContext } from 'react';
import { Context } from './components/ContextData';
import Search from './components/Search';
import Password from './components/Password';

export default function App() {
  const { mode } = useContext(Context)
  return (
    <div className='main-div-app' style={{ backgroundColor: mode && "#202124" }}>
      <BrowserRouter>
        <Navbar />
        <Link title='Help & Support' className="fa-headset-main" to='/support'><i className="fa-solid fa-headset"></i></Link>
        <Routes>
          <Route path='/' element={
            <>
              <Carousel />
              <Products />
            </>}>
          </Route>
          <Route path='/login' element={
            <>
              <Login />
            </>
          }>
          </Route>
          <Route path='/signup' element={
            <>
              <Signup />
            </>
          }>
          </Route>
          <Route path='/account' element={
            <>
              <Account />
            </>
          }>
          </Route>
          <Route path='/terms' element={
            <>
              <Terms />
            </>
          }>
          </Route>
          <Route path='/about' element={
            <>
              <About />
            </>
          }>
          </Route>
          <Route path='/cart' element={
            <>
              <Mycart />
            </>
          }>
          </Route>
          <Route path='/shipping' element={
            <>
              <Shipping />
            </>
          }>
          </Route>
          <Route path='/support' element={
            <>
              <Callus />
            </>
          }>
          </Route>
          <Route path='/search' element={
            <>
              <Search />
            </>
          }>
          </Route>
          <Route path='/forgotpass' element={
            <>
              <Password />
            </>
          }>
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
