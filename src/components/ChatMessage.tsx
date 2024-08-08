import useAuthStore from "../AuthStore"


interface Props {
    text: string
    uid: string
    photoUrl: string


}
const ChatMessage = ({ text, uid, photoUrl }: Props) => {
    const user = useAuthStore(s => s.cuser)
    const messageClass = user != null && uid === user.uid ? 'sent' : 'received'

    return (



        <div className={`message ${messageClass}`}>
            <img src={photoUrl} />
            <p>{text}</p>
        </div>
    )
}

export default ChatMessage