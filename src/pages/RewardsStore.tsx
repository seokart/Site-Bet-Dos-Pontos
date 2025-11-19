import { Navigate } from "react-router-dom"
import { Gift, ShoppingCart, X, Check } from "lucide-react"
import Navbar from "../components/Navbar"
import { useAuth } from "../contexts/AuthContext"
import { useState, useEffect } from "react"
import { getRewards, getStudents, saveStudents, Reward, Student } from "../data/mockData"
import toast from "react-hot-toast"

export default function RewardsStore() {
  const { user, isAuthenticated } = useAuth()
  const [rewards, setRewards] = useState<Reward[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null)
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  useEffect(() => {
    setRewards(getRewards())
    setStudents(getStudents())
  }, [])

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  const currentStudent = students.find(s => s.email === user?.email)

  const filteredRewards = selectedCategory === "all" 
    ? rewards 
    : rewards.filter(r => r.category === selectedCategory)

  const handleRedeemClick = (reward: Reward) => {
    if (!currentStudent || currentStudent.points < reward.points) {
      toast.error("❌ Pontos insuficientes!")
      return
    }
    setSelectedReward(reward)
    setShowConfirmModal(true)
  }

  const handleConfirmRedeem = () => {
    if (!selectedReward || !currentStudent) return

    const updatedStudents = students.map(s => 
      s.id === currentStudent.id 
        ? { ...s, points: s.points - selectedReward.points }
        : s
    )

    saveStudents(updatedStudents)
    setStudents(updatedStudents)
    
    toast.success(`🎉 Você resgatou: ${selectedReward.name}!`)
    setShowConfirmModal(false)
    setSelectedReward(null)
  }

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case "cantina": return "🍽️"
      case "material": return "📚"
      case "extra": return "⭐"
      default: return "🎁"
    }
  }

  const getCategoryColor = (category: string) => {
    switch(category) {
      case "cantina": return "from-orange-500 to-red-500"
      case "material": return "from-blue-500 to-cyan-500"
      case "extra": return "from-purple-500 to-pink-500"
      default: return "from-gray-500 to-gray-600"
    }
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

        {/* Saldo de Pontos */}
        {currentStudent && (
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 mb-8 text-white shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-blue-100 mb-1">Seu Saldo</p>
                <p className="text-4xl font-bold">{currentStudent.points} pontos</p>
              </div>
              <Gift className="w-16 h-16 opacity-20" />
            </div>
          </div>
        )}

        {/* Filtros de Categoria */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              selectedCategory === "all"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            🎁 Todas
          </button>
          <button
            onClick={() => setSelectedCategory("cantina")}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              selectedCategory === "cantina"
                ? "bg-orange-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            🍽️ Cantina
          </button>
          <button
            onClick={() => setSelectedCategory("material")}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              selectedCategory === "material"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            📚 Materiais
          </button>
          <button
            onClick={() => setSelectedCategory("extra")}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              selectedCategory === "extra"
                ? "bg-purple-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            ⭐ Extras
          </button>
        </div>

        {/* Grid de Recompensas */}
        {filteredRewards.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12">
            <div className="text-center">
              <ShoppingCart className="w-20 h-20 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Nenhuma recompensa disponível
              </h3>
              <p className="text-gray-500">
                Aguarde o cadastro de novas recompensas pelos professores
              </p>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredRewards.map(reward => {
              const canAfford = currentStudent && currentStudent.points >= reward.points
              
              return (
                <div
                  key={reward.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden"
                >
                  <div className={`bg-gradient-to-r ${getCategoryColor(reward.category)} p-6 text-center`}>
                    <div className="text-6xl mb-2">{reward.icon}</div>
                    <span className="inline-block px-3 py-1 bg-white bg-opacity-30 rounded-full text-white text-xs font-semibold">
                      {getCategoryIcon(reward.category)} {reward.category.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">{reward.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{reward.description}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-blue-600">{reward.points}</span>
                      <span className="text-sm text-gray-500">pontos</span>
                    </div>

                    <button
                      onClick={() => handleRedeemClick(reward)}
                      disabled={!canAfford}
                      className={`w-full py-3 rounded-lg font-semibold transition ${
                        canAfford
                          ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl"
                          : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {canAfford ? "🎁 Resgatar" : "🔒 Pontos Insuficientes"}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Modal de Confirmação */}
      {showConfirmModal && selectedReward && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Confirmar Resgate</h3>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X size={24} />
              </button>
            </div>

            <div className="text-center mb-6">
              <div className="text-7xl mb-4">{selectedReward.icon}</div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">{selectedReward.name}</h4>
              <p className="text-gray-600 mb-4">{selectedReward.description}</p>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Custo</p>
                <p className="text-3xl font-bold text-blue-600">{selectedReward.points} pontos</p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-yellow-800">
                ⚠️ Após o resgate, você terá <strong>{currentStudent && currentStudent.points - selectedReward.points}</strong> pontos restantes.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleConfirmRedeem}
                className="flex-1 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
              >
                <Check className="w-5 h-5 inline mr-2" />
                Confirmar
              </button>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}