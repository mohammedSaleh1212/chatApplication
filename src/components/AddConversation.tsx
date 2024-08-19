import { addDoc, collection, getDocs, query, serverTimestamp, where } from 'firebase/firestore';
import { db } from '../config';
import useAuthStore from '../AuthStore';
import { useState } from 'react';
import '../styles/addConversation.css'

interface Props {
  onclick: () => void;
}

const AddConversation = ({ onclick }: Props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  // const [searchType, setSearchType] = useState<'id' | 'name'>('id'); // New state for search type
  const user = useAuthStore((s) => s.cuser);

  if (!user) return null;

  const handleSearch = async () => {
    setIsLoading(true);
    const conversationsRef = collection(db, "conversations");
    const conversationQuery = query(
      conversationsRef,
      where("participantIds", "array-contains", user.uid)
    );

    const conversationSnapshot = await getDocs(conversationQuery);
    setSearchResults([]);

    try {
      let q;
      if (searchTerm.includes("@")) {
        q = query(collection(db, "users"), where("email", "==", searchTerm), where("uid", "!=", user.uid));
      } else {
        q = query(collection(db, "users"), where("displayName", ">=", searchTerm), where("displayName", "<=", searchTerm + '\uf8ff'), where("uid", "!=", user.uid));
      }

      const querySnapshot = await getDocs(q);
      const results: any[] = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // Check for existing conversations
      const updatedResults = await Promise.all(results.map(async (result) => {
        // console.log(conversationSnapshot)
        conversationSnapshot.forEach(cs => console.log(cs.data()))
        let conversationExists = false;

        conversationSnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.participantIds.includes(result.uid)) {
            conversationExists = true;
          }
        });

        return { ...result, conversationExists };
      }));
      console.log(updatedResults)
      setSearchResults(updatedResults);
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

      <div className="p-4  mx-auto" style={{ maxWidth: '50rem' }}>
        <form onSubmit={handleSubmit}>


          {/* <label htmlFor="searchTerm" className="form-label">Enter User email or name</label> */}
          <div className="d-flex gap-2">
            <input
              type="text"
              className="form-control input"
              id="searchTerm"
              placeholder={`Search users by email or name`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
          <ul className=" mt-3 p-0">
            {searchResults.map((result) => (
              <li key={result.id} className="contact-item d-flex justify-content-between align-items-center mb-3" >
                {result.displayName}

                {!result.conversationExists && (
                  <button className='btn btn--primary m-0' onClick={() => handleAddUser(result.uid)}>Add to contacts</button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default AddConversation;