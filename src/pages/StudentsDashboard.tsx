
import { Navigate } from "react-router-dom"
import {Trophy, TrendingUp, Award, Clock} from 'lucide-react'
import { useAuth } from "../hooks/useAuth"
import Navbar from "../components/Navbar"

export default function StudentDashboard() {
  const { user, isAuthenticated, isStudent } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/" />
  }

  if (!isStudent) {
    return <Navigate to="/teacher" />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Olá, {user?.userName}! 👋
          </h1>
          <p className="text-gray-600">Acompanhe seu progresso e conquistas</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total de Pontos</p>
                <p className="text-3xl font-bold text-blue-600">0</p>
              </div>
              <Trophy className="w-12 h-12 text-blue-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Pontos Este Mês</p>
                <p className="text-3xl font-bold text-green-600">0</p>
              </div>
              <TrendingUp className="w-12 h-12 text-green-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Posição no Ranking</p>
                <p className="text-3xl font-bold text-yellow-600">-</p>
              </div>
              <Award className="w-12 h-12 text-yellow-500 opacity-20" />
            </div>
          </div>
        </div>

        {/* Student Profile Card */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Meu Perfil</h2>
          
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-4xl text-white font-bold">
                {user?.userName?.charAt(0).toUpperCase()}
              </span>
            </div>

            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-1">
                {user?.userName}
              </h3>
              <p className="text-gray-600 mb-3">Turma: A ser configurada</p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-gray-600">
                  <Trophy className="w-4 h-4 mr-1 text-blue-600" />
                  <span className="text-sm">0 pontos totais</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-1 text-green-600" />
                  <span className="text-sm">Membro desde hoje</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Atividade Recente
          </h2>
          
          <div className="text-center py-12">
            <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Nenhuma atividade registrada ainda</p>
            <p className="text-sm text-gray-400 mt-2">
              Seus ganhos e perdas de pontos aparecerão aqui
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}