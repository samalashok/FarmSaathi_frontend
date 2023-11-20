import './App.css';
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
// import { ThemeProvider } from './components/ThemeContext';
import Context from './components/ContextData';
import Mycart from './components/Mycart';
import Shipping from './components/Shipping';

export default function App() {
  return (
    <Context>
      <div className='main-div-app'>
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
            </Routes>
            <Footer />
        </BrowserRouter>
      </div>
    </Context>

  );
}
