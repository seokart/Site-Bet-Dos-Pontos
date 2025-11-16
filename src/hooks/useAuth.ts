// src/hooks/useAuth.ts
import { useState, useEffect, useCallback } from "react"
import { lumi, LumiUser } from "../lib/lumi"

export function useAuth() {
  const [user, setUser] = useState<LumiUser | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!lumi) {
      setLoading(false)
      return
    }

    // tenta carregar o usuário atual
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

    // escuta mudanças de autenticação
    const unsubscribe = lumi.auth.onAuthChange(
      ({ isAuthenticated, user }: { isAuthenticated: boolean; user: unknown }) => {
        setIsAuthenticated(isAuthenticated)
        setUser(isAuthenticated && user && typeof user === "object" ? (user as LumiUser) : null)
      }
    )

    return () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        unsubscribe && unsubscribe()
      } catch {
        // ignore
      }
    }
  }, [])

  // signIn: aceita (email, password) OU nenhum argumento (fallback para fluxo padrão)
  const signIn = useCallback(
    async (email?: string, password?: string) => {
      if (!lumi) {
        setError("Serviço de autenticação indisponível.")
        return null
      }

      setError(null)
      try {
        // se email e password vierem, usa-os; senão tenta fluxo padrão do sdk (se existir)
        const result = await lumi.auth.login(email, password)
        if (result && typeof result === "object") {
          setUser(result as LumiUser)
          setIsAuthenticated(true)
        }
        return result
      } catch (err) {
        setError("Erro ao autenticar.")
        setIsAuthenticated(false)
        console.error(err)
        return null
      }
    },
    []
  )

  const signOut = useCallback(async () => {
    if (!lumi) return
    try {
      await lumi.auth.logout()
    } finally {
      setUser(null)
      setIsAuthenticated(false)
    }
  }, [])

  const isAdmin = Boolean(user?.userRole === "ADMIN")
  const isStudent = Boolean(user?.userRole === "USER")

  return {
    user,
    isAuthenticated,
    loading,
    error,
    signIn, // assinatura: (email?: string, password?: string) => Promise<unknown>
    signOut,
    isAdmin,
    isStudent,
  }
}
