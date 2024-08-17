import { Link, useNavigate } from "react-router-dom"
import useAuthStore from "../AuthStore"
import defaultImage from '../assets/defaultImg.jpeg'
import Dropdown from "./DropDown"
import { useState } from "react"
import '../styles/navBar.css'

const NavBar = () => {
  const navigate = useNavigate()
  const logOut = useAuthStore(s => s.logout)
  const user = useAuthStore(s => s.cuser)
  const [dropDown, setDropDown] = useState(false)
  const handleLogOut = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    logOut()
    navigate('/chatApplication')
  }
  return (
    <nav className="navbar   fixed-top">
      <div className="container-fluid">
        <div className="account-name navbar-brand d-flex align-items-center gap-2">

          <img src={defaultImage} className="account-image" alt="" />
          <p className="m-0 user-name" >{user?.displayName}</p>
        </div>

        {/* <i className="border-0 p-0 bi bi-three-dots-vertical fs-2" role="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"></i> */}
        {/* <div className="collapse navbar-collapse" id="navbarNav"> */}
        {/* <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to={'#'}>Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={'#'}>Features</Link>
        </li>
        <li className="nav-item">
        <button className="btn btn--primary" onClick={handleLogOut}>sign out</button>
        </li>
  
      </ul> */}

        {/* </div> */}
        <i className="border-0 p-0 bi bi-three-dots-vertical fs-2" role="button" onClick={() => setDropDown(!dropDown)}></i>
        {/* {dropDown&&<Dropdown />} */}


      </div>

      
      <Dropdown visible={dropDown}/>
    </nav>

  )
}

export default NavBar