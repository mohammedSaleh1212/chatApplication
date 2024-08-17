import '../styles/contact.css'
import defaultImage from '../assets/defaultImg.jpeg'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../AuthStore'
const Contact = ({ id, className, lastMessage,name }: { id: string, className?: string, lastMessage?: string,name?:string }) => {
    const user  = useAuthStore(s=>s.cuser)
    const navigate = useNavigate()
    if(!user) return
    return (
        <>
            <div className={`contact-wrapper ${className!}`} onClick={(event) => {
                event.preventDefault()
                navigate(`/chatApplication/conversation/${id}/${name}`)

            }}>
                <div className="contact">
                    <img className='contact__image account-image' src={defaultImage} alt="" />
                    <h2 className='contact__name'>{name}</h2>

                </div>
                <div className={`last-message`}>{lastMessage}</div>
            </div>
        </>

    )
}

export default Contact