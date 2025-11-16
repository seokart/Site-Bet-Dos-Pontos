
import { Navigate } from "react-router-dom"
import {History, TrendingUp, TrendingDown} from 'lucide-react'
import { useAuth } from "../hooks/useAuth"
import Navbar from "../components/Navbar"

export default function PointsHistory() {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/" />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Histórico de Pontos 📊
          </h1>
          <p className="text-gray-600">
            Acompanhe todas as movimentações de pontos
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex space-x-4 mb-8">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium">
            Todos
          </button>
          <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 flex items-center">
            <TrendingUp className="w-4 h-4 mr-2" />
            Ganhos
          </button>
          <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 flex items-center">
            <TrendingDown className="w-4 h-4 mr-2" />
            Perdas
          </button>
        </div>

        {/* History List */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Movimentações Recentes
          </h2>
          
          <div className="text-center py-12">
            <History className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Nenhuma movimentação registrada</p>
            <p className="text-sm text-gray-400 mt-2">
              O histórico de ganhos e perdas de pontos aparecerá aqui
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}