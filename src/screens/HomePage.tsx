

import { Navigate } from 'react-router-dom';
import useAuthStore from '../AuthStore';
import Conversations from '../components/Conversations';
import NavBar from '../components/NavBar';
import { useState } from 'react';
import AddConversation from '../components/AddConversation';



const Home = () => {
  const isLoggedIn = useAuthStore(s => s.isLoggedIn)
  // const user = useAuthStore(s => s.cuser)
  const [clicked, setClicked] = useState(false)
  const [activePage, setActivePage] = useState<'chats' | 'contacts'>('chats');





  if (!isLoggedIn) return (<Navigate to={'/'}></Navigate>)





  if (!clicked)
    return (

      <div style={{paddingTop:'104px'}}>
        <NavBar setActivePage={setActivePage} activePage={activePage}/>



     <Conversations activePage={activePage}/> 

    
        <button className="btn btn--primary btn-add-user" onClick={() => setClicked(true)}>add contact</button>
      </div>
    )
  else
    return (
  <>
  
      <div className="p-2"> 
        <AddConversation onclick={() => setClicked(false)} />
        
      </div>
  
  </>

    )







}

export default Home