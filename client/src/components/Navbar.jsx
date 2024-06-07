import { Link } from 'react-router-dom';
import axios from "axios";
import {useEffect,useState} from "react";
import {useNavigate} from "react-router-dom";
import logo from "../assets/logo.png"


function Navbar() {




    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const storedUserData = localStorage.getItem("userData");
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        } else {
            axios.get("https://quizlinx.onrender.com/isAuth", {
                headers: {
                    "x-access-token": localStorage.getItem("token"),
                }
            })
                .then((response) => {
                    console.log(response.data);

                    if (response.data.result && response.data.result.length > 0) {
                        const userData = response.data.result[0];
                        setUserData(userData);
                        localStorage.setItem("userData", JSON.stringify(userData));
                    } else {
                        console.error('No user details found in the response');
                    }
                })
                .catch((error) => {
                    console.error('An unexpected error occurred:', error.message);
                });
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        setUserData(null);
        navigate('/');
    };







    return (
        <div className="navbar bg-gray-200 h-24">
            <div className="flex-1">
                <a className="btn btn-ghost text-2xl">Comfort Rents</a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li className="pr-8 flex">
                        {userData ? (
                            <button className="font-bold" onClick={handleLogout}>
                                Logout
                            </button>
                        ) : (
                            <Link to="/login"
                                  style={{textDecoration: 'none'}}>
                                <button className="font-bold">Login</button>
                            </Link>
                        )}
                    </li>
                    <li className="pr-8 flex">

                        {userData && userData.name && (
                            <div className="flex">
                                <div className="avatar">
                                    <div
                                        className="w-7 h-7 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img src={logo}/>
                                    </div>
                                </div>
                                <p className="text-teal-500 font-bold ml-3">{userData.name}</p>
                            </div>
                        )}
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default Navbar