import React from "react"
import { Navigate } from "react-router-dom"
import {Gift, ShoppingCart} from 'lucide-react'
import { useAuth } from "../hooks/useAuth"
import Navbar from "../components/Navbar"

export default function RewardsStore() {
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
            Loja de Recompensas 🎁
          </h1>
          <p className="text-gray-600">
            Troque seus pontos por recompensas incríveis!
          </p>
        </div>

        {/* Categories */}
        <div className="flex space-x-4 mb-8">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium">
            Todas
          </button>
          <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300">
            Cantina
          </button>
          <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300">
            Materiais
          </button>
          <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300">
            Extras
          </button>
        </div>

        {/* Empty State */}
        <div className="bg-white rounded-xl shadow-md p-12">
          <div className="text-center">
            <ShoppingCart className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Loja em Breve!
            </h3>
            <p className="text-gray-500 mb-6">
              As recompensas serão cadastradas pelos professores
            </p>
            <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-lg text-gray-600">
              <Gift className="w-5 h-5 mr-2" />
              <span>0 recompensas disponíveis</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}