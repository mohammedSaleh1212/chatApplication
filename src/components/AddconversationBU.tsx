// import { addDoc, collection, getDocs, query, serverTimestamp, where } from 'firebase/firestore';
// import { db } from '../config';
// import useAuthStore from '../AuthStore';
// import { useState } from 'react';
// interface Props {
//   onclick:() => void
// }


// const AddConversation = ({onclick}:Props) => {
//   const [userId, setUserId] = useState('');//the id of the user we are trying to add 
//   const [isLoading,setIsLoading] = useState(false)
//   const user = useAuthStore(s => s.cuser)
//   if (!user) return


//   const handleAddUser = async (id:string) => { 
//     setIsLoading(true)

//     try {
//       // Fetch the user data from the 'users' collection
//       const q = query(collection(db, "users"), where("uid", "==", id));
//       const querySnapshot = await getDocs(q);

//       if (!querySnapshot.empty) {
//         const userDoc = querySnapshot.docs[0]; // Assuming there's only one document with this uid
//         const userData = userDoc.data()

//         // Add the conversation with the fetched user data

//         await addDoc(collection(db, "conversations"), {
//           initialedBy: user.uid,
//           participantIds: [user.uid, id],
//           initiatedAt: serverTimestamp(),
//           lastUpdatedAt: serverTimestamp(),
//           participants: [
//             {
//               displayName: user.displayName,
//               email: user.email,
//               photoURL: user.photoURL,
//             },
//             {
//               displayName: userData.displayName,
//               email: userData.email,
//               photoURL: userData.photoURL,
//             },
//           ],
//         });
        
        
//       } else {
//         console.error("No such user!");
//       }
//     } catch (error) {
//       console.error("Error adding conversation: ", error);
//     }
//     setIsLoading(false)
//   };
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     handleAddUser(userId)

//   }



//   return (
//     <>

//     <i className="bi bi-arrow-left fs-2 text-black" role='button' onClick={ onclick}></i>


//     <div className="p-4 form-container mx-auto">
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="userId" className="form-label">User ID</label>
//         <div className="d-flex gap-2">
//           <input
//            type="text"
//             className="form-control input"
//              id="userId" 
//           aria-describedby="emailHelp"
//            placeholder='Enter the user ID...'
//            onChange={(e)=> setUserId(e.target.value.toString())}
//            />
//           <button type="submit" className='btn btn--primary m-0'>
//             {isLoading ?<div className="spinner-border" style={{height:'1rem',width:'1rem', fontSize:'.5rem',marginInline:'8px'}} role="status"></div>:'Add'}
            
//             </button>

//         </div>

//       </form>

//     </div>

//     </>

//   )
// }

// export default AddConversation

import { addDoc, collection, getDocs, query, serverTimestamp, where } from 'firebase/firestore';
import { db } from '../config';
import useAuthStore from '../AuthStore';
import { useState } from 'react';

interface Props {
  onclick: () => void;
}

const AddConversation = ({ onclick }: Props) => {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchType, setSearchType] = useState<'id' | 'name'>('id'); // New state for search type
  const user = useAuthStore((s) => s.cuser);

  if (!user) return null;

  const handleSearch = async () => {
    setIsLoading(true);
    setSearchResults([]);

    try {
      let q;
      if (searchType === 'id') {
        q = query(collection(db, "users"), where("uid", "==", inputValue));
      } else {
        q = query(collection(db, "users"), where("displayName", ">=", inputValue), where("displayName", "<=", inputValue + '\uf8ff'));
      }

      const querySnapshot = await getDocs(q);
      const results = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSearchResults(results);
    } catch (error) {
      console.error("Error fetching users: ", error);
    }

    setIsLoading(false);
  };

  const handleAddUser = async (id: string) => {
    setIsLoading(true);

    try {
      // Fetch the user data from the 'users' collection
      const userDoc = await getDocs(query(collection(db, "users"), where("uid", "==", id)));

      if (!userDoc.empty) {
        const userData = userDoc.docs[0].data();

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
    
    setIsLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <>
      <i className="bi bi-arrow-left fs-2 text-black" role='button' onClick={onclick}></i>

      <div className="p-4 form-container mx-auto">
        <form onSubmit={handleSubmit}>
          <label htmlFor="searchType" className="form-label">Search By</label>
          <select
            id="searchType"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value as 'id' | 'name')}
            className="form-select mb-2"
          >
            <option value="id">User ID</option>
            <option value="name">User Name</option>
          </select>

          <label htmlFor="inputValue" className="form-label">Enter User {searchType === 'id' ? 'ID' : 'Name'}</label>
          <div className="d-flex gap-2">
            <input
              type="text"
              className="form-control input"
              id="inputValue"
              placeholder={`Enter the user ${searchType === 'id' ? 'ID' : 'Name'}...`}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit" className='btn btn--primary m-0'>
              {isLoading ? (
                <div className="spinner-border" style={{ height: '1rem', width: '1rem', fontSize: '.5rem', marginInline: '8px' }} role="status"></div>
              ) : (
                'Search'
              )}
            </button>
          </div>
        </form>

        {searchResults.length > 0 && (
          <ul className="list-group mt-3">
            {searchResults.map((result) => (
              <li key={result.id} className="list-group-item d-flex justify-content-between align-items-center">
                {result.displayName}
                <button 
                  className='btn btn--primary'
                  onClick={() => handleAddUser(result.uid)}
                >
                  Add
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default AddConversation;