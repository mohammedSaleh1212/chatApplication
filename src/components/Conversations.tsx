import { collection, query, where, onSnapshot } from "firebase/firestore";
import useAuthStore from "../AuthStore";
import { db } from "../config";
import { useEffect, useState } from "react";
import Contact from "./Contact";


// interface User{
//     displayName:string
//     email:string
//     photoURL:string
// }
// interface conversation {
//     // id:string
//     participants:User[]
//     participantIds:string[]
//     initialedBy:string
//     initiatedAt:Timestamp
//     lastUpdatedAt:Timestamp

// }

const Conversations = ({activePage}:{activePage:'chats'|'contacts'}) => {

    const [conversations, setConversations] = useState<any[]>([])
    const [chats,setChats] = useState<any[]>([])
    const user = useAuthStore(s => s.cuser)





    useEffect(() => {
        if (!user) return;
    // Load cached conversations from session storage
    const savedContacts = sessionStorage.getItem(`contacts_${user.uid}`);
    if (savedContacts !== null) {
      setConversations(JSON.parse(savedContacts));
    }  
    const savedChats = sessionStorage.getItem(`chats_${user.uid}`)
    if (savedChats !== null) {
      setChats(JSON.parse(savedChats));
    } 
    
        const q = query(collection(db, "conversations"), where("participantIds", "array-contains", user.uid));
        
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const fetchedContacts:any[] = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
          setConversations(fetchedContacts);
          const filteredContacts = fetchedContacts.filter(contact => contact.lastMessage && contact.lastMessage.trim() !== '');
          setChats(filteredContacts)

          sessionStorage.setItem(`contacts_${user.uid}`, JSON.stringify(fetchedContacts));
          sessionStorage.setItem(`chats_${user.uid}`, JSON.stringify(filteredContacts));
        }, (error) => {
          console.error("Error getting documents:", error);
        });
    
        return () => unsubscribe();
      }, [user]);


//end gpt


if(activePage==='contacts')
   return  (


<div className="contacts">
  {conversations?.map(({ id,  participantIds, participants }) => {
    const name = participantIds[0] === user?.uid ? participants[1].displayName : participants[0].displayName;
    return (
      <Contact
        key={id}
        id={id}
        name={name}
      />
    )
  })}
</div>




    )
    else return(

<div className="chats">
  {chats?.map(({ id, lastMessage, participantIds, participants }) => {
    const name = participantIds[0] === user?.uid ? participants[1].displayName : participants[0].displayName;
    return (
      <Contact
        key={id}
        id={id}
        lastMessage={lastMessage}
        name={name}
      />
    )
  })}
</div>

      
    )
}

export default Conversations