
import { Navigate } from "react-router-dom"
import {Users, TrendingUp, Gift, Award} from 'lucide-react'
import { useAuth } from "../hooks/useAuth"
import Navbar from "../components/Navbar"

export default function TeacherDashboard() {
  const { user, isAuthenticated, isAdmin } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/" />
  }

  if (!isAdmin) {
    return <Navigate to="/student" />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Painel do Professor 👨‍🏫
          </h1>
          <p className="text-gray-600">
            Bem-vindo, {user?.userName}! Gerencie pontos e recompensas
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total de Alunos</p>
                <p className="text-3xl font-bold text-blue-600">0</p>
              </div>
              <Users className="w-10 h-10 text-blue-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Pontos Dados Hoje</p>
                <p className="text-3xl font-bold text-green-600">0</p>
              </div>
              <TrendingUp className="w-10 h-10 text-green-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Recompensas</p>
                <p className="text-3xl font-bold text-yellow-600">0</p>
              </div>
              <Gift className="w-10 h-10 text-yellow-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Resgates</p>
                <p className="text-3xl font-bold text-purple-600">0</p>
              </div>
              <Award className="w-10 h-10 text-purple-500 opacity-20" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Ações Rápidas</h2>
            
            <div className="space-y-3">
              <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-left font-medium">
                + Atribuir Pontos a Aluno
              </button>
              <button className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-left font-medium">
                - Retirar Pontos de Aluno
              </button>
              <button className="w-full px-4 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition text-left font-medium">
                🎁 Cadastrar Nova Recompensa
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Gerenciamento
            </h2>
            
            <div className="space-y-3">
              <button className="w-full px-4 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition text-left font-medium">
                📊 Ver Todos os Alunos
              </button>
              <button className="w-full px-4 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition text-left font-medium">
                📈 Relatório de Pontuações
              </button>
              <button className="w-full px-4 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition text-left font-medium">
                🏆 Ver Ranking Completo
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Atividade Recente do Sistema
          </h2>
          
          <div className="text-center py-12">
            <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Nenhuma atividade registrada ainda</p>
            <p className="text-sm text-gray-400 mt-2">
              As pontuações e resgates aparecerão aqui
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}