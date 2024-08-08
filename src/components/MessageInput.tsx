import React , { useState } from "react"
import { db } from "../config"
import useAuthStore from "../AuthStore"
import { addDoc, collection, serverTimestamp } from "firebase/firestore";



const MessageInput = () => {
  const user  = useAuthStore(s=>s.cuser)
    const [message,setMessage] = useState('')
    const handleSendMessage = async(event:React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    event.preventDefault()
    if (message.trim() === "") {
        alert("Enter valid message");
        return;
      }
      const {uid ,displayName,photoURL} = user!
      await addDoc(collection(db, "message"), {
        text: message,
        name: displayName,
        avatar: photoURL,
        createdAt: serverTimestamp(),
        uid,
      });
      setMessage("")

    }
  return (
    <>
    <form className="send-message" onSubmit={handleSendMessage}>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit" >Send</button>
    </form>
    </>
  )
}

export default MessageInput