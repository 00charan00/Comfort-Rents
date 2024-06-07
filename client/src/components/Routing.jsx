import {BrowserRouter, Routes, Route} from "react-router-dom";

import Login from '../Auth/Login.jsx';
import Register from '../Auth/Register.jsx';
import LandingPage from './LandingPage.jsx';
import MainHome from "./MainHome.jsx";
import Rent from "./Rent.jsx";



function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/register' element={<Register />}></Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/' element={<LandingPage />}></Route>
                <Route path='/home' element={<MainHome />}></Route>
                <Route path='/rent' element={<Rent />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Routing;
