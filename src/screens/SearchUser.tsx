import React, {  useState } from 'react'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../config';

const SearchUser = () => {
    const [searchKey, setSearchKey] = useState<string>('')
    const [resultUsers, setResultUsers] = useState<any[]>([])

    // Load cached conversations from session storage
    const handleSearchUser = async (searchKey: string) => {

        const q = query(collection(db, "users"), where("displayName", "==", searchKey));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
            const fetchedContacts = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            
            console.log(fetchedContacts)
            setResultUsers(fetchedContacts)
        }


    }




    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        handleSearchUser(searchKey)
    }
    return (
        <>
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="searchQuery" className="form-label">username</label>
                    <input type="text" className="form-control input" id="searchQuery" onChange={(e) => setSearchKey(e.target.value)} />
                </div>
                <button type="submit" className='btn btn--primary ' >search</button>

            </form>
        </div>
        {resultUsers.map(resultUser => <div key={resultUser.uid}>{resultUser.displayName}</div>)}
        </>

    )
}

export default SearchUser