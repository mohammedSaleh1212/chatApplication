import { create } from 'zustand'
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from '@firebase/auth'
import { firebase } from './config'
import { createUserWithEmailAndPassword, signOut,updateProfile,User } from 'firebase/auth'


interface Credentials {
  email: string
  password: string
}



interface AuthStore {
  cuser:  User | null
  isLoggedIn: boolean,
  loginError: string,
  login: (credentials: Credentials) => void,
  logout: () => void
  signUp: (credentials: Credentials,displayName:string,photoURL:string) => void
  unsubscribe: () => void,
  updateUser:(
    currentUser: User,
    displayName: string | null,
    photoURL: string | null
  ) => void


}

export const auth = getAuth(firebase)

const useAuthStore = create<AuthStore>((set) => ({

  cuser: auth.currentUser,
  isLoggedIn: Boolean(auth.currentUser),
  loginError: '',
  // Subscribe to auth state changes
  unsubscribe: onAuthStateChanged(auth, (user) => {
    set({ isLoggedIn: Boolean(user), cuser: user });
  }),

  login: async (credentials: Credentials) => {
    const { email, password } = credentials
    await signInWithEmailAndPassword(auth, email, password)

      .then(() => console.log(auth.currentUser))
      .catch((e) => {
        set({ loginError: e.message })
      })
  },
  logout: () => {
    signOut(auth)
  },
  signUp: async (credentials,displayName,photoURL) => {
    const { email, password } = credentials
    await createUserWithEmailAndPassword(auth, email, password)
    
      .then(userCredentials => updateProfile(userCredentials.user,{displayName:displayName,photoURL:photoURL}))
      .catch((e) => {
        set({ loginError: e.message })
      })
  },
  updateUser:async(currentUser,displayName,photoURL) => {
    await updateProfile(currentUser, {
      displayName,
      photoURL,
    });
  }
}))
export default useAuthStore
