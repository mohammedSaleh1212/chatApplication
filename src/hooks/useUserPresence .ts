import { useEffect } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db, realtimeDb } from '../config';
import { onDisconnect, onValue, ref, set } from 'firebase/database';

const useUserPresence = (userId:string) => {
  useEffect(() => {
    const userStatusDatabaseRef = ref(realtimeDb, `/status/${userId}`);
    const userStatusFirestoreRef = doc(db, 'users', userId);

    const isOfflineForDatabase = {
      state: 'offline',
      last_changed: new Date().toISOString(),
    };

    const isOnlineForDatabase = {
      state: 'online',
      last_changed: new Date().toISOString(),
    };

    const isOfflineForFirestore = {
      state: 'offline',
      last_changed: new Date().toISOString(),
    };

    const isOnlineForFirestore = {
      state: 'online',
      last_changed: new Date().toISOString(),
    };

    onValue(ref(realtimeDb, '.info/connected'), (snapshot) => {
      if (snapshot.val() === false) {
        return;
      }

      onDisconnect(userStatusDatabaseRef).set(isOfflineForDatabase).then(() => {
        set(userStatusDatabaseRef, isOnlineForDatabase);
        updateDoc(userStatusFirestoreRef, isOnlineForFirestore);
      });
    });

    return () => {
      set(userStatusDatabaseRef, isOfflineForDatabase);
      updateDoc(userStatusFirestoreRef, isOfflineForFirestore);
    };
  }, [userId]);
};

export default useUserPresence;
