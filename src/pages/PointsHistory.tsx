import { Navigate } from "react-router-dom"
import { History, TrendingUp, TrendingDown, Filter } from 'lucide-react'
import Navbar from "../components/Navbar"
import { useAuth } from "../contexts/AuthContext"
import { useState, useEffect } from "react"
import { getTransactions } from "../data/mockData"

export default function PointsHistory() {
  const { user, isAuthenticated } = useAuth()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [transactions, setTransactions] = useState<any[]>([])
  const [filter, setFilter] = useState<"all" | "add" | "remove">("all")

  useEffect(() => {
    const allTransactions = getTransactions()
    // Se for aluno, mostra apenas suas transações
    if (user?.role === "ALUNO") {
      const filtered = allTransactions.filter(t => t.studentName === user?.name)
      setTransactions(filtered)
    } else {
      // Professor vê tudo
      setTransactions(allTransactions)
    }
  }, [user])

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  const filteredTransactions = filter === "all" 
    ? transactions 
    : transactions.filter(t => t.type === filter)

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

        {/* Estatísticas */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total de Movimentações</p>
                <p className="text-3xl font-bold text-blue-600">{transactions.length}</p>
              </div>
              <History className="w-10 h-10 text-blue-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Pontos Ganhos</p>
                <p className="text-3xl font-bold text-green-600">
                  {transactions.filter(t => t.type === "add").reduce((sum, t) => sum + t.points, 0)}
                </p>
              </div>
              <TrendingUp className="w-10 h-10 text-green-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Pontos Perdidos</p>
                <p className="text-3xl font-bold text-red-600">
                  {Math.abs(transactions.filter(t => t.type === "remove").reduce((sum, t) => sum + t.points, 0))}
                </p>
              </div>
              <TrendingDown className="w-10 h-10 text-red-500 opacity-20" />
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex items-center gap-4 mb-8">
          <Filter className="w-5 h-5 text-gray-600" />
          <button
            onClick={() => setFilter("all")}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              filter === "all"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setFilter("add")}
            className={`px-6 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
              filter === "add"
                ? "bg-green-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            Ganhos
          </button>
          <button
            onClick={() => setFilter("remove")}
            className={`px-6 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
              filter === "remove"
                ? "bg-red-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <TrendingDown className="w-4 h-4" />
            Perdas
          </button>
        </div>

        {/* Lista de Transações */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Movimentações Recentes
          </h2>

          {filteredTransactions.length === 0 ? (
            <div className="text-center py-12">
              <History className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Nenhuma movimentação registrada</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredTransactions.map(transaction => (
                <div
                  key={transaction.id}
                  className={`p-4 rounded-lg border-l-4 ${
                    transaction.type === "add"
                      ? "bg-green-50 border-green-500"
                      : "bg-red-50 border-red-500"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-bold text-gray-900">
                        {transaction.type === "add" ? "➕" : "➖"} {transaction.studentName}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">{transaction.reason}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        Por {transaction.teacherName} • {new Date(transaction.date).toLocaleString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </p>
                    </div>
                    <span
                      className={`text-2xl font-bold ml-4 ${
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
    </div>
  )
}