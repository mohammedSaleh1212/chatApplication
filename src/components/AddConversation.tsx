import { addDoc, collection, getDocs, query, serverTimestamp, where } from 'firebase/firestore';
import { db } from '../config';
import useAuthStore from '../AuthStore';
import { useState } from 'react';
interface Props {
  onclick:() => void
}


const AddConversation = ({onclick}:Props) => {
  const [userId, setUserId] = useState('');//the id of the user we are trying to add 
  const user = useAuthStore(s => s.cuser)
  if (!user) return
  const handleAddUser = async (id:string) => {

    try {
      // Fetch the user data from the 'users' collection
      const q = query(collection(db, "users"), where("uid", "==", id));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0]; // Assuming there's only one document with this uid
        const userData = userDoc.data()

        // Add the conversation with the fetched user data
        await addDoc(collection(db, "conversations"), {
          initialedBy: user.uid,
          participantIds: [user.uid, id],
          initiatedAt: serverTimestamp(),
          lastUpdatedAt: serverTimestamp(),
          participants: [
            {
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
            },
            {
              displayName: userData.displayName,
              email: userData.email,
              photoURL: userData.photoURL,
            },
          ],
        });
      } else {
        console.error("No such user!");
      }
    } catch (error) {
      console.error("Error adding conversation: ", error);
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleAddUser(userId)

  }



  return (
    <>

    <i className="bi bi-arrow-left fs-2 text-black" role='button' onClick={ onclick}></i>


    <div className="p-4 form-container mx-auto">
      <form onSubmit={handleSubmit}>
        <label htmlFor="userId" className="form-label">User ID</label>
        <div className="d-flex gap-2">
          <input
           type="text"
            className="form-control input"
             id="userId" 
          aria-describedby="emailHelp"
           placeholder='Enter the user ID...'
           onChange={(e)=> setUserId(e.target.value.toString())}
           />
          <button type="submit" className='btn btn--primary m-0'>Add</button>

        </div>

      </form>

    </div>

    </>

  )
}

export default AddConversation