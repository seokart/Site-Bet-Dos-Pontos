import { Navigate } from "react-router-dom"
import { Users, TrendingUp, Gift, Award, Plus, Minus, X, Check } from "lucide-react"
import Navbar from "../components/Navbar"
import { useAuth } from "../contexts/AuthContext"
import { useState, useEffect } from "react"
import { getStudents, getRewards, getTransactions, saveStudents, saveRewards, addTransaction, Student, Reward } from "../data/mockData"
import toast from "react-hot-toast"

type ModalType = "add-points" | "remove-points" | "add-reward" | null

export default function TeacherDashboard() {
  const { user, isAuthenticated } = useAuth()
  
  const [students, setStudents] = useState<Student[]>([])
  const [rewards, setRewards] = useState<Reward[]>([])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [transactions, setTransactions] = useState<any[]>([])
  const [modalOpen, setModalOpen] = useState<ModalType>(null)
  
  // Estados para o modal de pontos
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [pointsAmount, setPointsAmount] = useState("")
  const [pointsReason, setPointsReason] = useState("")
  
  // Estados para o modal de recompensas
  const [rewardName, setRewardName] = useState("")
  const [rewardDescription, setRewardDescription] = useState("")
  const [rewardPoints, setRewardPoints] = useState("")
  const [rewardCategory, setRewardCategory] = useState<"cantina" | "material" | "extra">("cantina")
  const [rewardIcon, setRewardIcon] = useState("🎁")

  useEffect(() => {
    setStudents(getStudents())
    setRewards(getRewards())
    setTransactions(getTransactions())
  }, [])

  if (!isAuthenticated) return <Navigate to="/login" />
  if (user?.role !== "PROFESSOR") return <Navigate to="/student" />

  const handleOpenModal = (type: ModalType, student?: Student) => {
    setModalOpen(type)
    if (student) setSelectedStudent(student)
    setPointsAmount("")
    setPointsReason("")
  }

  const handleCloseModal = () => {
    setModalOpen(null)
    setSelectedStudent(null)
    setPointsAmount("")
    setPointsReason("")
    setRewardName("")
    setRewardDescription("")
    setRewardPoints("")
    setRewardIcon("🎁")
  }

  const handleAddPoints = () => {
    if (!selectedStudent || !pointsAmount || !pointsReason) {
      toast.error("Preencha todos os campos!")
      return
    }

    const amount = parseInt(pointsAmount)
    if (amount <= 0) {
      toast.error("Quantidade deve ser maior que zero!")
      return
    }

    const updatedStudents = students.map(s => 
      s.id === selectedStudent.id 
        ? { ...s, points: s.points + amount }
        : s
    )

    setStudents(updatedStudents)
    saveStudents(updatedStudents)

    addTransaction({
      studentId: selectedStudent.id,
      studentName: selectedStudent.name,
      points: amount,
      reason: pointsReason,
      teacherName: user?.name || "Professor",
      type: "add"
    })

    setTransactions(getTransactions())
    toast.success(`✅ ${amount} pontos adicionados para ${selectedStudent.name}!`)
    handleCloseModal()
  }

  const handleRemovePoints = () => {
    if (!selectedStudent || !pointsAmount || !pointsReason) {
      toast.error("Preencha todos os campos!")
      return
    }

    const amount = parseInt(pointsAmount)
    if (amount <= 0) {
      toast.error("Quantidade deve ser maior que zero!")
      return
    }

    const updatedStudents = students.map(s => 
      s.id === selectedStudent.id 
        ? { ...s, points: Math.max(0, s.points - amount) }
        : s
    )

    setStudents(updatedStudents)
    saveStudents(updatedStudents)

    addTransaction({
      studentId: selectedStudent.id,
      studentName: selectedStudent.name,
      points: -amount,
      reason: pointsReason,
      teacherName: user?.name || "Professor",
      type: "remove"
    })

    setTransactions(getTransactions())
    toast.success(`✅ ${amount} pontos removidos de ${selectedStudent.name}`)
    handleCloseModal()
  }

  const handleAddReward = () => {
    if (!rewardName || !rewardPoints) {
      toast.error("Preencha pelo menos o nome e pontos!")
      return
    }

    const points = parseInt(rewardPoints)
    if (points <= 0) {
      toast.error("Pontos devem ser maior que zero!")
      return
    }

    const newReward: Reward = {
      id: Date.now().toString(),
      name: rewardName,
      description: rewardDescription || "Sem descrição",
      points,
      category: rewardCategory,
      icon: rewardIcon,
      available: true
    }

    const updatedRewards = [...rewards, newReward]
    setRewards(updatedRewards)
    saveRewards(updatedRewards)

    toast.success(`✅ Recompensa "${rewardName}" cadastrada com sucesso!`)
    handleCloseModal()
  }

  const todayTransactions = transactions.filter(t => {
    const today = new Date().toDateString()
    const transDate = new Date(t.date).toDateString()
    return today === transDate
  })

  const pointsGivenToday = todayTransactions
    .filter(t => t.type === "add")
    .reduce((sum, t) => sum + t.points, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Painel do Professor 👨‍🏫
          </h1>
          <p className="text-gray-600">Bem-vindo, {user?.name}!</p>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total de Alunos</p>
                <p className="text-3xl font-bold text-blue-600">{students.length}</p>
              </div>
              <Users className="w-10 h-10 text-blue-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Pontos Dados Hoje</p>
                <p className="text-3xl font-bold text-green-600">{pointsGivenToday}</p>
              </div>
              <TrendingUp className="w-10 h-10 text-green-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Recompensas</p>
                <p className="text-3xl font-bold text-yellow-600">{rewards.length}</p>
              </div>
              <Gift className="w-10 h-10 text-yellow-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-500 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Ações Hoje</p>
                <p className="text-3xl font-bold text-purple-600">{todayTransactions.length}</p>
              </div>
              <Award className="w-10 h-10 text-purple-500 opacity-20" />
            </div>
          </div>
        </div>

        {/* Ações Rápidas */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Ações Rápidas</h2>

          <div className="grid md:grid-cols-3 gap-4">
            <button
              onClick={() => handleOpenModal("add-points")}
              className="flex items-center justify-center px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition shadow-lg hover:shadow-xl font-medium"
            >
              <Plus className="w-5 h-5 mr-2" />
              Atribuir Pontos
            </button>
            
            <button
              onClick={() => handleOpenModal("remove-points")}
              className="flex items-center justify-center px-6 py-4 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-lg hover:from-red-600 hover:to-rose-700 transition shadow-lg hover:shadow-xl font-medium"
            >
              <Minus className="w-5 h-5 mr-2" />
              Retirar Pontos
            </button>
            
            <button
              onClick={() => handleOpenModal("add-reward")}
              className="flex items-center justify-center px-6 py-4 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-lg hover:from-yellow-600 hover:to-orange-700 transition shadow-lg hover:shadow-xl font-medium"
            >
              <Gift className="w-5 h-5 mr-2" />
              Nova Recompensa
            </button>
          </div>
        </div>

        {/* Lista de Alunos */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Alunos Cadastrados</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Aluno</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Turma</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Pontos</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Ações</th>
                </tr>
              </thead>
              <tbody>
                {students.map(student => (
                  <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <span className="text-3xl mr-3">{student.avatar}</span>
                        <div>
                          <p className="font-semibold text-gray-900">{student.name}</p>
                          <p className="text-sm text-gray-500">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-700">{student.class}</td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold">
                        {student.points} pts
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => handleOpenModal("add-points", student)}
                        className="mr-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-sm font-medium"
                      >
                        + Pontos
                      </button>
                      <button
                        onClick={() => handleOpenModal("remove-points", student)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm font-medium"
                      >
                        - Pontos
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Atividades Recentes */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Atividades Recentes</h2>
          
          {transactions.length === 0 ? (
            <div className="text-center py-12">
              <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Nenhuma atividade registrada</p>
            </div>
          ) : (
            <div className="space-y-3">
              {transactions.slice(0, 10).map(transaction => (
                <div
                  key={transaction.id}
                  className={`p-4 rounded-lg border-l-4 ${
                    transaction.type === "add"
                      ? "bg-green-50 border-green-500"
                      : "bg-red-50 border-red-500"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-gray-900">
                        {transaction.type === "add" ? "➕" : "➖"} {transaction.studentName}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">{transaction.reason}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Por {transaction.teacherName} • {new Date(transaction.date).toLocaleString("pt-BR")}
                      </p>
                    </div>
                    <span
                      className={`text-xl font-bold ${
                        transaction.type === "add" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {transaction.type === "add" ? "+" : ""}{transaction.points}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal de Adicionar/Remover Pontos */}
      {(modalOpen === "add-points" || modalOpen === "remove-points") && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                {modalOpen === "add-points" ? "➕ Adicionar Pontos" : "➖ Remover Pontos"}
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X size={24} />
              </button>
            </div>

            {selectedStudent ? (
              <>
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <div className="flex items-center">
                    <span className="text-4xl mr-3">{selectedStudent.avatar}</span>
                    <div>
                      <p className="font-bold text-gray-900">{selectedStudent.name}</p>
                      <p className="text-sm text-gray-600">{selectedStudent.class} • {selectedStudent.points} pontos</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Quantidade de Pontos
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={pointsAmount}
                      onChange={(e) => setPointsAmount(e.target.value)}
                      placeholder="Ex: 50"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Motivo
                    </label>
                    <select
                      value={pointsReason}
                      onChange={(e) => setPointsReason(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Selecione o motivo</option>
                      {modalOpen === "add-points" ? (
                        <>
                          <option value="Presença em aula">Presença em aula</option>
                          <option value="Participação ativa">Participação ativa</option>
                          <option value="Entrega de atividade">Entrega de atividade</option>
                          <option value="Comportamento exemplar">Comportamento exemplar</option>
                          <option value="Ajuda aos colegas">Ajuda aos colegas</option>
                          <option value="Projeto excelente">Projeto excelente</option>
                          <option value="Nota alta na prova">Nota alta na prova</option>
                        </>
                      ) : (
                        <>
                          <option value="Falta de tarefa">Falta de tarefa</option>
                          <option value="Comportamento inadequado">Comportamento inadequado</option>
                          <option value="Desrespeito às regras">Desrespeito às regras</option>
                          <option value="Falta não justificada">Falta não justificada</option>
                          <option value="Atraso repetido">Atraso repetido</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={modalOpen === "add-points" ? handleAddPoints : handleRemovePoints}
                    className={`flex-1 py-3 rounded-lg font-semibold text-white transition ${
                      modalOpen === "add-points"
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-red-600 hover:bg-red-700"
                    }`}
                  >
                    <Check className="w-5 h-5 inline mr-2" />
                    Confirmar
                  </button>
                  <button
                    onClick={handleCloseModal}
                    className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
                  >
                    Cancelar
                  </button>
                </div>
              </>
            ) : (
              <div>
                <p className="text-gray-600 mb-4">Selecione um aluno:</p>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {students.map(student => (
                    <button
                      key={student.id}
                      onClick={() => setSelectedStudent(student)}
                      className="w-full flex items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition text-left"
                    >
                      <span className="text-3xl mr-3">{student.avatar}</span>
                      <div>
                        <p className="font-semibold text-gray-900">{student.name}</p>
                        <p className="text-sm text-gray-600">{student.class} • {student.points} pts</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal de Adicionar Recompensa */}
      {modalOpen === "add-reward" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">🎁 Nova Recompensa</h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nome da Recompensa
                </label>
                <input
                  type="text"
                  value={rewardName}
                  onChange={(e) => setRewardName(e.target.value)}
                  placeholder="Ex: Pizza da Cantina"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Descrição (opcional)
                </label>
                <input
                  type="text"
                  value={rewardDescription}
                  onChange={(e) => setRewardDescription(e.target.value)}
                  placeholder="Ex: Pizza individual da cantina"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Pontos Necessários
                </label>
                <input
                  type="number"
                  min="1"
                  value={rewardPoints}
                  onChange={(e) => setRewardPoints(e.target.value)}
                  placeholder="Ex: 100"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Categoria
                </label>
                <select
                  value={rewardCategory}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onChange={(e) => setRewardCategory(e.target.value as any)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                >
                  <option value="cantina">🍽️ Cantina</option>
                  <option value="material">📚 Material Escolar</option>
                  <option value="extra">⭐ Privilégio Extra</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Ícone (emoji)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={rewardIcon}
                    onChange={(e) => setRewardIcon(e.target.value)}
                    maxLength={2}
                    className="w-20 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-center text-2xl"
                  />
                  <div className="flex gap-2 flex-wrap flex-1">
                    {["🍕", "🍔", "🍟", "🧃", "🍫", "📓", "🖊️", "📚", "⏰", "🎮"].map(emoji => (
                      <button
                        key={emoji}
                        onClick={() => setRewardIcon(emoji)}
                        className="w-10 h-10 text-2xl hover:bg-gray-100 rounded-lg transition"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleAddReward}
                className="flex-1 py-3 bg-yellow-600 text-white rounded-lg font-semibold hover:bg-yellow-700 transition"
              >
                <Check className="w-5 h-5 inline mr-2" />
                Cadastrar
              </button>
              <button
                onClick={handleCloseModal}
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