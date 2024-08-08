

import { Navigate, useNavigate } from 'react-router-dom';
import useAuthStore from '../AuthStore';
import ChatRoom from '../components/ChatRoom';



const Home = () => {
  const isLoggedIn = useAuthStore(s => s.isLoggedIn)
  const user = useAuthStore(s=>s.cuser)

  const logOut = useAuthStore(s => s.logout)

  const navigate = useNavigate()


  const handleLogOut = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    logOut()
    navigate('/')
  }
  if(!isLoggedIn) return(<Navigate to={'/'}></Navigate>)
  return (
    <section>

      <p>home page people</p>
      <button className="btn btn-primary" onClick={handleLogOut}>sign out</button>
      <div>{isLoggedIn ? 'yes' : 'false'}</div>
      <p>hello {user!.displayName}</p>
      <ChatRoom />
    </section>
  )




}

export default Home