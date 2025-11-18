import { useState, useEffect } from "react"
import { auth } from "../lib/firebase"
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  createUserWithEmailAndPassword
} from "firebase/auth"

export function useAuth() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  async function signIn(email: string, password: string) {
    return await signInWithEmailAndPassword(auth, email, password)
  }

  async function signUp(email: string, password: string) {
    return await createUserWithEmailAndPassword(auth, email, password)
  }

  async function signOut() {
    return await firebaseSignOut(auth)
  }

  return {
    user,
    loading,
    isAuthenticated: !!user,
    signIn,
    signUp,
    signOut
  }
}
