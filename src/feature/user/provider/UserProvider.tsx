'use client'

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'
import { User } from '../User'

export type UserContextType = {
  selectedUser: User | null
  setSelectedUser: Dispatch<SetStateAction<User | null>>
}

const initialState: UserContextType = {
  selectedUser: null,
  setSelectedUser: () => {},
}

type Props = { children: React.ReactNode }

const UserContext = createContext<UserContextType>(initialState)

export const UserProvider = ({ children }: Props) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  return (
    <UserContext.Provider value={{ selectedUser, setSelectedUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => useContext(UserContext)
