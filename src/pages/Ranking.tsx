import React from "react"
import { Navigate } from "react-router-dom"
import {Trophy, Award, Medal} from 'lucide-react'
import { useAuth } from "../hooks/useAuth"
import Navbar from "../components/Navbar"

export default function Ranking() {
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
            Ranking Escolar 🏆
          </h1>
          <p className="text-gray-600">
            Veja os alunos mais bem pontuados da escola!
          </p>
        </div>

        {/* Top 3 Podium */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* 2nd Place */}
          <div className="bg-gradient-to-br from-gray-300 to-gray-400 rounded-xl p-6 text-white transform md:translate-y-8">
            <div className="text-center">
              <Medal className="w-16 h-16 mx-auto mb-3" />
              <p className="text-2xl font-bold mb-1">2º Lugar</p>
              <p className="text-sm opacity-80">Aguardando dados</p>
            </div>
          </div>

          {/* 1st Place */}
          <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl p-6 text-white shadow-xl">
            <div className="text-center">
              <Trophy className="w-20 h-20 mx-auto mb-3" />
              <p className="text-3xl font-bold mb-1">1º Lugar</p>
              <p className="text-sm opacity-80">Aguardando dados</p>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl p-6 text-white transform md:translate-y-12">
            <div className="text-center">
              <Award className="w-14 h-14 mx-auto mb-3" />
              <p className="text-2xl font-bold mb-1">3º Lugar</p>
              <p className="text-sm opacity-80">Aguardando dados</p>
            </div>
          </div>
        </div>

        {/* Ranking List */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Classificação Completa
          </h2>
          
          <div className="text-center py-12">
            <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Nenhum aluno cadastrado ainda</p>
            <p className="text-sm text-gray-400 mt-2">
              O ranking será atualizado conforme os alunos ganharem pontos
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}