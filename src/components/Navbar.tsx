// src/components/Navbar.tsx
import { Link, useLocation } from "react-router-dom"
import { Trophy, Star, Gift, Award, History, Home, LogOut, LogIn } from "lucide-react"
import { useAuth } from "../hooks/useAuth"

export default function Navbar() {
  const location = useLocation()
  const { user, isAuthenticated, isAdmin, signIn, signOut } = useAuth()

  const isActive = (path: string) => location.pathname === path

  // wrapper usado pelo botão "Entrar" — evita passar signIn direto ao onClick
  const handleSignIn = async () => {
    // estratégia simples: prompt (substitua por modal/página de login depois)
    const email = prompt("Digite seu email:")
    const password = prompt("Digite sua senha:")
    if (email && password) {
      await signIn(email, password)
    } else {
      // se o usuário não preencher, você pode tentar signIn() sem argumentos
      await signIn()
    }
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Trophy className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Sistema de Pontos</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition ${
                isActive("/") ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Home className="w-4 h-4 mr-2" />
              Início
            </Link>

            {isAuthenticated && (
              <>
                <Link
                  to={isAdmin ? "/teacher" : "/student"}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition ${
                    isActive(isAdmin ? "/teacher" : "/student")
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Star className="w-4 h-4 mr-2" />
                  {isAdmin ? "Painel Professor" : "Meu Perfil"}
                </Link>

                <Link
                  to="/rewards"
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition ${
                    isActive("/rewards") ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Gift className="w-4 h-4 mr-2" />
                  Loja
                </Link>

                <Link
                  to="/ranking"
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition ${
                    isActive("/ranking") ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Award className="w-4 h-4 mr-2" />
                  Ranking
                </Link>

                <Link
                  to="/history"
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition ${
                    isActive("/history") ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <History className="w-4 h-4 mr-2" />
                  Histórico
                </Link>
              </>
            )}
          </div>

          {/* Auth Section */}
          <div className="flex items-center space-x-3">
            {isAuthenticated && user ? (
              <>
                <div className="hidden md:flex flex-col items-end">
                  <span className="text-sm font-medium text-gray-900">{user.userName ?? user.name ?? user.email ?? "Usuário"}</span>
                  <span className="text-xs text-gray-500">{isAdmin ? "Professor" : "Aluno"}</span>
                </div>
                <button
                  onClick={signOut}
                  className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </button>
              </>
            ) : (
              <button
                onClick={handleSignIn}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Entrar
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
