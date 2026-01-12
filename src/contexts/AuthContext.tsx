import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  name: string
  email: string
  photo?: string
  createdAt: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, name: string) => void
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Carregar usuário do localStorage
    const savedUser = localStorage.getItem('alphacut-user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const login = (email: string, name: string) => {
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      createdAt: new Date().toISOString()
    }
    setUser(newUser)
    localStorage.setItem('alphacut-user', JSON.stringify(newUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('alphacut-user')
    localStorage.removeItem('alphacut-subscription')
    localStorage.removeItem('alphacut-analyses')
    localStorage.removeItem('alphacut-habits')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
