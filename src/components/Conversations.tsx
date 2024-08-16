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

const Conversations = () => {

    const [conversations, setConversations] = useState<any[]>([])
    const user = useAuthStore(s => s.cuser)
    // async function getConversationsByUserId() {

    //     // Check if contacts are in session storage

    //     if (!user) return
    //     const savedContacts = sessionStorage.getItem(`contacts_${user.uid}`);
    //     if (savedContacts !== null) {
    //         setConversations(JSON.parse(savedContacts));
    //     }
    //     try {
    //         const q = query(collection(db, "conversations"), where("participantIds", "array-contains", user.uid));
    //         const querySnapshot = await getDocs(q);

    //         if (!querySnapshot.empty) {
    //             querySnapshot.forEach((doc) => {
    //                 console.log(doc.id, " => ", doc.data());
    //             });
    //             const fetchedContacts = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))

    //             if (JSON.stringify(fetchedContacts) !== savedContacts) {
    //                 setConversations(fetchedContacts);
    //                 sessionStorage.setItem(`contacts_${user.uid}`, JSON.stringify(fetchedContacts));
    //             }
    //             // Save contacts to session storage
    //             // sessionStorage.setItem(`contacts_${user.uid}`, JSON.stringify(fetchedContacts));
    //         } else {
    //             console.log("No matching documents.");
    //         }
    //     } catch (error) {
    //         console.error("Error getting documents:", error);
    //     }



    // }
    // useEffect(() => {
    //     getConversationsByUserId()

    // }, [user])
    



    ///gpt




    useEffect(() => {
        if (!user) return;
    // Load cached conversations from session storage
    const savedContacts = sessionStorage.getItem(`contacts_${user.uid}`);
    if (savedContacts !== null) {
      setConversations(JSON.parse(savedContacts));
    }  
    
        const q = query(collection(db, "conversations"), where("participantIds", "array-contains", user.uid));
        
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const fetchedContacts = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
          setConversations(fetchedContacts);
          sessionStorage.setItem(`contacts_${user.uid}`, JSON.stringify(fetchedContacts));
        }, (error) => {
          console.error("Error getting documents:", error);
        });
    
        return () => unsubscribe();
      }, [user]);


//end gpt


    return (

<div className="contacts">
  {conversations?.map(({ id, lastMessage, participantIds, participants }) => {
    const name = participantIds[0] === user?.uid ? participants[1].displayName : participants[0].displayName;
    return (
      <Contact
        key={id}
        id={id}
        lastMessage={lastMessage}
        name={name}
      />
    );
  })}
</div>




    )
}

export default Conversations