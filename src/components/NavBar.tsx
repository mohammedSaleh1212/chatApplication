// import { useNavigate } from "react-router-dom"
import useAuthStore from "../AuthStore"
import defaultImage from '../assets/defaultImg.jpeg'
import Dropdown from "./DropDown"
import { useState } from "react"
import '../styles/navBar.css'

const NavBar = ({setActivePage,activePage}:{setActivePage:(x:'chats'|'contacts') => void,activePage:'chats'|'contacts'}) => {
  // const navigate = useNavigate()
  // const logOut = useAuthStore(s => s.logout)
  const user = useAuthStore(s => s.cuser)
  const [dropDown, setDropDown] = useState(false)
  // const handleLogOut = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  //   e.preventDefault()
  //   logOut()
  //   navigate('/chatApplication')
  // }
  return (
    <nav className="navbar gap-3  fixed-top p-0">
      <div className="container-fluid">
        <div className="account-name navbar-brand d-flex align-items-center gap-2">

          <img src={defaultImage} className="account-image" alt="" />
          <p className="m-0 user-name" >{user?.displayName}</p>
        </div>



        <i className="border-0 p-0 bi bi-three-dots-vertical fs-2" role="button" onClick={() => setDropDown(!dropDown)}></i>


      </div>
      <div className="navbar-tabs-container nav-tabs container-fluid justify-content-around">
            <a className={activePage==='chats' ?'nav-tab active':'nav-tab'} style={{color:'white'}} 

            onClick={() =>setActivePage('chats')}
              >Chats
              </a>
            <a className={activePage==='contacts'?'nav-tab active':'nav-tab'} style={{color:'white'}} 
              
              onClick={() =>setActivePage('contacts')}
              >
                Contacts
              
              
              </a>


      </div>



      <Dropdown visible={dropDown} />
    </nav>

  )
}

export default NavBar