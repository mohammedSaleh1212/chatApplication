import { collection, query, where, getDocs } from "firebase/firestore";
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
    async function getConversationsByUserId() {
        if (!user) return
        try {
            const q = query(collection(db, "conversations"), where("participantIds", "array-contains", user.uid));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                querySnapshot.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data());
                });
                const fetchedContacts = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
                console.log(fetchedContacts)

                setConversations(fetchedContacts)
            } else {
                console.log("No matching documents.");
            }
        } catch (error) {
            console.error("Error getting documents:", error);
        }
    }
    useEffect(() => {
        getConversationsByUserId()
    }, [])
    return (

        <div className="contacts">
 
            {conversations ? conversations.map(conversation =>  <Contact key={conversation.id} id={conversation.id}></Contact>):''}


        </div>




    )
}

export default Conversations