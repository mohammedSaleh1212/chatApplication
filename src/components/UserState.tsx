import  { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import useUserPresence from '../hooks/useUserPresence ';
import { db } from '../config';

const ChatApp = () => {
    const id="vHySbC0MIBT7mkkmL3IQgquu9Ft2"
  useUserPresence(id);
  const [userStatus, setUserStatus] = useState('offline');
//   const db = getFirestore();

  useEffect(() => {
    const userStatusFirestoreRef = doc(db, 'users', id);

    const unsubscribe = onSnapshot(userStatusFirestoreRef, (doc) => {
      if (doc.exists()) {
        setUserStatus(doc.data().state);
      }
    });

    return () => unsubscribe();
  }, [id, db]);

  return (
    <div>
      <h1>Chat Application</h1>
      <p>User is currently: {userStatus}</p>
      {/* Your chat application code */}
    </div>
  );
};

export default ChatApp;
