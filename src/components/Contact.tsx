import '../styles/contact.css'
import defaultImage from '../assets/defaultImg.jpeg'
import { useNavigate } from 'react-router-dom'
const Contact = ({id,className}:{id:string,className?:string}) => {
    const navigate = useNavigate()
  return (
    <div className={`contact ${className}`}  onClick={(event) => {
        event.preventDefault()
        navigate(`/chatApplication/conversation/${id}`)
        
    }}>
        <img className='contact__image account-image' src={defaultImage} alt="" />
        <h2 className='contact__name'>{id}</h2>
    </div>

)
}

export default Contact