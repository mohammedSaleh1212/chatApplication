

import { Navigate } from 'react-router-dom';
import useAuthStore from '../AuthStore';
import Conversations from '../components/Conversations';
import NavBar from '../components/NavBar';
import { useState } from 'react';
import AddConversation from '../components/AddConversation';



const Home = () => {
  const isLoggedIn = useAuthStore(s => s.isLoggedIn)
  const user = useAuthStore(s => s.cuser)
  const [clicked, setClicked] = useState(false)





  if (!isLoggedIn) return (<Navigate to={'/'}></Navigate>)





  if (!clicked)
    return (

      <>
        <NavBar />

        <p>home page </p>
        <p>hello {user!.displayName}</p>

        <Conversations />
        <button className="btn btn--primary btn-add-user" onClick={() => setClicked(true)}>add user</button>
      </>
    )
  else
    return (
      <div className="p-2"> 
        <AddConversation onclick={() => setClicked(false)} />
      </div>
    )







}

export default Home