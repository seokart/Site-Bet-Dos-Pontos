import { useState, useEffect } from "react"
import { lumi } from "../lib/lumi"

interface LumiUser {
  id: string
  email?: string
  name?: string
  userRole?: string
  [key: string]: unknown
}

export function useAuth() {
  const [user, setUser] = useState<LumiUser | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Carrega o usuário atual na inicialização
  useEffect(() => {
    lumi.auth
      .getUser()
      .then((currentUser: unknown) => {
        if (currentUser && typeof currentUser === "object") {
          setUser(currentUser as LumiUser)
          setIsAuthenticated(true)
        } else {
          setUser(null)
          setIsAuthenticated(false)
        }
      })
      .catch(() => {
        setUser(null)
        setIsAuthenticated(false)
      })
      .finally(() => setLoading(false))

    const unsubscribe = lumi.auth.onAuthChange(
      ({
        isAuthenticated,
        user,
      }: {
        isAuthenticated: boolean
        user: unknown
      }) => {
        setIsAuthenticated(isAuthenticated)
        setUser(isAuthenticated ? (user as LumiUser) : null)
      }
    )

    return unsubscribe
  }, [])

  // ⭐ Login agora com email e senha
  async function signIn(email: string, password: string) {
    try {
      setError(null)
      const loggedUser = await lumi.auth.login(email, password)

      if (loggedUser && typeof loggedUser === "object") {
        setUser(loggedUser as LumiUser)
        setIsAuthenticated(true)
      }
      return loggedUser
    } catch (err: unknown) {
      setError("Email ou senha inválidos.")
      setIsAuthenticated(false)
      console.error(err)
      return null
    }
  }

  // ⭐ Logout padrão
  async function signOut() {
    await lumi.auth.logout()
    setUser(null)
    setIsAuthenticated(false)
  }

  return {
    user,
    isAuthenticated,
    loading,
    error,
    signIn,
    signOut,
    isAdmin: user?.userRole === "ADMIN",
    isStudent: user?.userRole === "USER",
  }
}
