import '../Styles/index.css'
import sale from '../assets/sale.jpeg'
import rent from '../assets/rent.jpeg'
import Footer from "./Footer.jsx";
import Navbar from "./Navbar.jsx";
import {useNavigate} from "react-router-dom";
function LandingPage() {
    const navigate = useNavigate();


  return (
      <div>
          <Navbar/>

          <h1 className="text-5xl text-center hover:text-red-500 mb-12 mt-5 ">Add or Rent a Home</h1>


          <div className="flex justify-center content-center mb-28">
              <div className="  bg-gray-300 card card-compact w-96  shadow-xl">
                  <img src={sale} className="px-3 py-3 rounded-2xl " alt="Rental"/>
                  <div className="card-body">
                      <h2 className="card-title">Sell!</h2>
                      <p>Want to add your house for rental? We got you covered!</p>
                      <div className="card-actions justify-end">
                          <button className="btn btn-primary" onClick={()=>{navigate("/login")}}>Add House</button>
                      </div>
                  </div>
              </div>
              <div className=" ml-28 card bg-gray-300 card-compact w-96  shadow-xl">
                  <img src={rent} className="px-3 py-3 rounded-xl " alt="Rental"/>
                  <div className="card-body">
                      <h2 className="card-title">Rent!</h2>
                      <p>Feel free to rent a house in our huge collection of properties</p>
                      <div className="card-actions justify-end">
                          <button className="btn btn-primary" onClick={()=>{navigate("/login")}}>Rent Now</button>
                      </div>
                  </div>
              </div>
          </div>

<Footer/>
      </div>

  )
}

export default LandingPage
