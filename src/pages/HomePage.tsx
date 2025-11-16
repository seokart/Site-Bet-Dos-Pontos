import { useNavigate } from "react-router-dom"
import {Trophy, Star, Gift, Award, TrendingUp, Users} from 'lucide-react'
import { useAuth } from "../hooks/useAuth"
import Navbar from "../components/Navbar"

export default function HomePage() {
  const navigate = useNavigate()
  const { isAuthenticated, isAdmin, signIn } = useAuth()

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate(isAdmin ? "/teacher" : "/student")
    } else {
      signIn()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Navbar />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Trophy className="w-24 h-24 text-blue-600 animate-bounce" />
              <Star className="w-8 h-8 text-yellow-500 absolute -top-2 -right-2 animate-pulse" />
            </div>
          </div>

          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Sistema Escolar de Pontos
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Uma plataforma gamificada para motivar alunos através de pontos por presença,
            participação, empenho e entrega de atividades.
          </p>

          <button
            onClick={handleGetStarted}
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transform hover:scale-105 transition shadow-lg"
          >
            {isAuthenticated ? "Ir para Dashboard" : "Começar Agora"}
            <Award className="w-5 h-5 ml-2" />
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-blue-100 rounded-full">
                <TrendingUp className="w-10 h-10 text-blue-600" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
              Ganhe Pontos
            </h3>
            <p className="text-gray-600 text-center">
              Acumule pontos por presença em aula, participação, empenho e entrega de
              atividades. Quanto mais você se dedica, mais pontos você ganha!
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-yellow-100 rounded-full">
                <Gift className="w-10 h-10 text-yellow-600" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
              Troque por Recompensas
            </h3>
            <p className="text-gray-600 text-center">
              Use seus pontos para resgatar recompensas incríveis: produtos da cantina,
              materiais escolares e privilégios especiais!
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-green-100 rounded-full">
                <Users className="w-10 h-10 text-green-600" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
              Ranking Escolar
            </h3>
            <p className="text-gray-600 text-center">
              Compete com seus colegas e veja sua posição no ranking geral da escola.
              Quem será o aluno destaque do mês?
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-20 bg-white rounded-2xl shadow-xl p-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Como Funciona?
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-blue-600 mb-4">Para Alunos:</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-2">1.</span>
                  Faça login e acesse seu perfil pessoal
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-2">2.</span>
                  Ganhe pontos por bom comportamento e desempenho
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-2">3.</span>
                  Acompanhe seu histórico de pontos em tempo real
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-2">4.</span>
                  Troque seus pontos por recompensas na loja
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-2">5.</span>
                  Veja sua posição no ranking escolar
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-green-600 mb-4">
                Para Professores:
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 font-bold mr-2">1.</span>
                  Acesse o painel administrativo
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 font-bold mr-2">2.</span>
                  Atribua ou retire pontos dos alunos
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 font-bold mr-2">3.</span>
                  Registre motivos para cada pontuação
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 font-bold mr-2">4.</span>
                  Visualize histórico completo de todos os alunos
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 font-bold mr-2">5.</span>
                  Cadastre e gerencie recompensas disponíveis
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}