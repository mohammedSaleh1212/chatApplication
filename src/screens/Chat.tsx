



import { useEffect, useState } from "react";

import {db} from '../config'
import {
    query,
    orderBy,
    onSnapshot,
    limit,
    collection,
    serverTimestamp,
    addDoc,
  } from "firebase/firestore";
import useAuthStore from "../AuthStore";
// interface FetchedMessages {
//   avatar?:string
//   createdAt:Timestamp
//   id:string //the id of the message itself
//   name:string
//   text:string
//   uid:string //the id of the user who sent this message 
// }





const Chat = () => {
  const user = useAuthStore(s=>s.cuser)
  const [message,setMessage] = useState('')
  const [chatMessages,setChatMessages] = useState<any>([])
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
      uid:uid
    });
  
    setMessage("")

  }
    useEffect(() => {

        const q = query(
          collection(db, "message"),
          orderBy("createdAt", "desc"),
          limit(50)
        );
        const unsubscribe:any = onSnapshot(q, (QuerySnapshot) => {//whenever the data changes this callbacl is executed
          const fetchedMessages:any =[];
          QuerySnapshot.forEach((doc) => {
            fetchedMessages.push({ ...doc.data(), id: doc.id });
        
          })


          // //
          const sortedMessages = fetchedMessages.sort(
            (a:any, b:any) => a.createdAt - b.createdAt
          )
          setChatMessages(sortedMessages)
        console.log(fetchedMessages)
        });
        return () => unsubscribe;
      }, []);


    return (
      <>
      <form className="send-message" onSubmit={handleSendMessage}>
      <input
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit" >Send</button>
    </form>
    {chatMessages ? chatMessages.map((chatMessage:any,index:any) => <li key={index}>{chatMessage.text}</li>):''}
      </>

    )
}



export default Chat;
