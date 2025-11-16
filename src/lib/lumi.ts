// src/lib/lumi.ts

// Tipagem mínima e segura do usuário que o app usa
export interface LumiUser {
  id: string
  email?: string
  name?: string
  userName?: string
  userRole?: string
  [key: string]: unknown
}

// Tipagem da parte de autenticação do Lumi (sem any)
interface LumiAuth {
  // Aqui definimos login opcionalmente com email/senha
  // Mas aceitamos também um fluxo sem argumentos (para compatibilidade)
  login: (email?: string, password?: string) => Promise<unknown>
  register?: (email: string, password: string) => Promise<unknown>
  logout: () => Promise<void>
  getUser: () => Promise<unknown>
  // callback recebe isAuthenticated e user
  onAuthChange: (
    callback: (params: { isAuthenticated: boolean; user: unknown }) => void
  ) => () => void
}

// SDK mínimo
interface LumiSDK {
  auth: LumiAuth
  // se no futuro usar db/storage, tipar aqui
}

// Pega SDK global (carregado via <script> no index.html)
const lumiGlobal = (window as unknown as { lumi?: unknown }).lumi

// converte para o tipo seguro
const lumi = lumiGlobal as LumiSDK | undefined

if (!lumi) {
  console.warn("⚠ Lumi SDK não foi carregado! Verifique o index.html")
}

export { lumi }
