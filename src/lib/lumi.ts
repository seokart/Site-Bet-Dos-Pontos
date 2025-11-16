

// Tipagem da parte de autenticação do Lumi
interface LumiAuth {
  login: (email: string, password: string) => Promise<unknown>
  register: (email: string, password: string) => Promise<unknown>
  logout: () => Promise<void>
  getUser: () => Promise<unknown>
  onAuthChange: (
    callback: (params: { isAuthenticated: boolean; user: unknown }) => void
  ) => () => void
}

// Tipagem do SDK da Lumi
interface LumiSDK {
  auth: LumiAuth
}

// Obtém o SDK global carregado no index.html
const lumiGlobal = (window as unknown as { lumi?: unknown }).lumi

// Converte para o tipo correto, sem ANY
const lumi = lumiGlobal as LumiSDK

if (!lumiGlobal) {
  console.warn("⚠ Lumi SDK não foi carregado! Verifique o index.html")
}

export { lumi }