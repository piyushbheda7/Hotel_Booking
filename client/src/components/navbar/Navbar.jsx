import "./navbar.css"
import {Link, useNavigate} from "react-router-dom"
import { useContext , useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import Logout  from "../logout/Logout"

const Navbar = () => {

  const [logout, setlogout] = useState(false)

  const navigate = useNavigate() ;

  const handleRegister = ()=>{
    navigate("/register");
  }

  const handlelogin = ()=>{
    navigate("/login")
  }

  const logoutPopUp = ()=>{
    setlogout(!logout);
  }

  const { user } = useContext(AuthContext)

  return (
    <div className="navbar">
      <div className="navContainer">
      <Link to='/' style={{color:"inherit" , textDecoration:"none"}}>
        <span className="logo">Booking</span>
      </Link>
        {user ? <button className="userButton" onClick={logoutPopUp}>{user.username}</button> : <div className="navItems">
          <button className="navButton" onClick={handleRegister}>Register</button>
          <button className="navButton" onClick={handlelogin}>Login</button>
        </div>}
        { logout && <Logout />}
      </div>
    </div>
  )
}

export default Navbar