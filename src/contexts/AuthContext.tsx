import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { supabase } from '@/lib/supabase'

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
    // Verificar sessão do Supabase ao carregar
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const supabaseUser = session.user
        const userData: User = {
          id: supabaseUser.id,
          name: supabaseUser.user_metadata?.name || 'Usuário',
          email: supabaseUser.email || '',
          createdAt: supabaseUser.created_at
        }
        setUser(userData)
        localStorage.setItem('alphacut-user', JSON.stringify(userData))
      } else {
        // Fallback para localStorage se não houver sessão do Supabase
        const savedUser = localStorage.getItem('alphacut-user')
        if (savedUser) {
          setUser(JSON.parse(savedUser))
        }
      }
    })

    // Escutar mudanças na autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const supabaseUser = session.user
        const userData: User = {
          id: supabaseUser.id,
          name: supabaseUser.user_metadata?.name || 'Usuário',
          email: supabaseUser.email || '',
          createdAt: supabaseUser.created_at
        }
        setUser(userData)
        localStorage.setItem('alphacut-user', JSON.stringify(userData))
      } else {
        setUser(null)
        localStorage.removeItem('alphacut-user')
      }
    })

    return () => subscription.unsubscribe()
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

  const logout = async () => {
    await supabase.auth.signOut()
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
