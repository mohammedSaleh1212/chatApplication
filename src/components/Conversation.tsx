import { addDoc, collection, doc, limit, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../config'
import useAuthStore from '../AuthStore'
import { useNavigate, useParams } from 'react-router-dom'
import '../styles/conversation.css'
import Contact from './Contact'

const Conversation = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const user = useAuthStore(s => s.cuser)
  const [formValue, setFormValue] = useState('')
  const [chatMessages, setChatMessages] = useState<any[]>([])


  const parentDocRef = doc(collection(db, "conversations"), id);
  const messageRef = collection(parentDocRef, "messages")

  const handleSendMessage = async (event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    event.preventDefault()
    if (formValue.trim() === "") {
      alert("Enter valid message");
      return;
    }
    setFormValue("")
    const { uid, displayName, photoURL } = user!

    await addDoc(messageRef, {
      text: formValue,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      uid: uid
    });


  }


  useEffect(() => {

    const q = query(
      messageRef,
      orderBy("createdAt", "desc"),
      limit(50)
    );
    const unsubscribe: any = onSnapshot(q, (QuerySnapshot) => {
      const fetchedMessages = QuerySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      const sortedMessages = fetchedMessages.sort(
        (a: any, b: any) => a.createdAt - b.createdAt
      );
      // setMessage(sortedMessages);
      console.log(fetchedMessages)
      setChatMessages(sortedMessages)
    });
    return () => unsubscribe;
  }, []);

  return (
    <>
      <div className="conversation-container ">
        <div className="fixed-top d-flex align-items-center px-2" style={{ background: 'white' }}>
          <i className="bi bi-arrow-left fs-2 text-black" role='button' onClick={() => navigate('/chatApplication/home')}></i>
          <Contact id={id!} />
        </div>



        <div className="messages-container d-flex flex-column gap-2  mx-2">

          {chatMessages && chatMessages.map(cm => <div className={`message-box ${cm.uid === user!.uid ? 'sent-message' : 'recieved-message'}`} key={cm.id}>{cm.text}</div>)}
        </div>

        <form className="send-message d-flex  fixed-bottom" onSubmit={handleSendMessage}>
          <input
            className='form-control input'
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
          />
          <button className='btn btn--primary m-0' type="submit" >Send</button>
        </form>
      </div>



    </>
  )
}


export default Conversation