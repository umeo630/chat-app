'use client'

import { User, getAuth, onAuthStateChanged } from 'firebase/auth'
import { createContext, useContext, useEffect, useState } from 'react'

export type GlobalAuthState = {
  user: User | null | undefined
}

const initialState: GlobalAuthState = {
  user: undefined,
}

const AuthContext = createContext<GlobalAuthState>(initialState)

type Props = { children: React.ReactNode }

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<GlobalAuthState>(initialState)

  useEffect(() => {
    try {
      const auth = getAuth()
      return onAuthStateChanged(auth, (user) => setUser({ user }))
    } catch (error) {
      setUser(initialState)
      throw error
    }
  }, [])

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => useContext(AuthContext)
