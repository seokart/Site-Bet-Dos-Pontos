import { Link, useLocation, useNavigate } from "react-router-dom"
import { Trophy, Star, Gift, Award, History, Home, LogOut, LogIn } from "lucide-react"
import { useAuth } from "../contexts/AuthContext" // ✅ IMPORTAR

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout, isAuthenticated } = useAuth() // ✅ USAR O CONTEXT

  function handleLogout() {
    logout()
    navigate("/")
  }

  const isActive = (path: string) => location.pathname === path
  const isAdmin = user?.role === "PROFESSOR"

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <Link to="/" className="flex items-center space-x-2">
            <Trophy className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Sistema de Pontos</span>
          </Link>

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
                    isActive("/rewards")
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Gift className="w-4 h-4 mr-2" />
                  Loja
                </Link>

                <Link
                  to="/ranking"
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition ${
                    isActive("/ranking")
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Award className="w-4 h-4 mr-2" />
                  Ranking
                </Link>

                <Link
                  to="/history"
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition ${
                    isActive("/history")
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <History className="w-4 h-4 mr-2" />
                  Histórico
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                <div className="hidden md:flex flex-col items-end">
                  <span className="text-sm font-medium text-gray-900">{user?.name}</span>
                  <span className="text-xs text-gray-500">
                    {isAdmin ? "Professor" : "Aluno"}
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate("/login")}
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