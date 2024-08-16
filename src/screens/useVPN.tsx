import { Link } from 'react-router-dom'

const useVPN = () => {
  return (
    <div>
        <h2>hello you probably need vpn to use this website</h2>
        <Link to={'/chatApplication/'}>continue to website</Link>
    </div>
  )
}

export default useVPN