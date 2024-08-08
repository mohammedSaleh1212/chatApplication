import { addDoc, collection,  limit, onSnapshot, orderBy, query,  serverTimestamp } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../config'
import useAuthStore from '../AuthStore'
import '../styles/chatRoom.css'



// interface Message {
//   avatar: string
//   createdAt: Timestamp
//   name: string
//   text: string
//   uid: number
// }
const ChatRoom = () => {




  const user = useAuthStore(s => s.cuser)
  const [formValue, setFormValue] = useState('')
  const [chatMessages,setChatMessages] = useState<any[]>([])



  const handleSendMessage = async (event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    event.preventDefault()
    if (formValue.trim() === "") {
      alert("Enter valid message");
      return;
    }
    setFormValue("")
    const { uid, displayName, photoURL } = user!
    await addDoc(collection(db, "message"), {
      text: formValue,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      uid: uid 
    });


  }


  useEffect(() => {

    const q = query(
      collection(db, "message"),
      orderBy("createdAt", "desc"),
      limit(50)
    );
    const unsubscribe:any = onSnapshot(q, (QuerySnapshot) => {
const fetchedMessages =  QuerySnapshot.docs.map(doc =>({...doc.data(),id:doc.id}))
      const sortedMessages = fetchedMessages.sort(
        (a:any, b:any) => a.createdAt - b.createdAt
      );
      // setMessage(sortedMessages);
      console.log(fetchedMessages)
      setChatMessages(sortedMessages)
    });
    return () => unsubscribe;
  }, []);

  return (
    <>
<div className="container">

      <div>ChatRoom</div>
      <div className="messages-container d-flex flex-column gap-2">

{chatMessages && chatMessages.map(cm => <div className={`message-box ${cm.uid === user!.uid ?'sent-message':'recieved-message' }`} key={cm.id}>{cm.text}</div>)}
      </div>

      <form className="send-message" onSubmit={handleSendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        />
        <button type="submit" >Send</button>
      </form>
</div>
    

      
    </>
  )
}

export default ChatRoom








