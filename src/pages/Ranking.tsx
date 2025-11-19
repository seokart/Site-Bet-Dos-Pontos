import { Navigate } from "react-router-dom"
import { Trophy, Award, Medal, TrendingUp } from "lucide-react"
import Navbar from "../components/Navbar"
import { useAuth } from "../contexts/AuthContext"
import { useState, useEffect } from "react"
import { getStudents, Student } from "../data/mockData"

export default function Ranking() {
  const { user, isAuthenticated } = useAuth()
  const [students, setStudents] = useState<Student[]>([])

  useEffect(() => {
    const allStudents = getStudents()
    const sorted = allStudents.sort((a, b) => b.points - a.points)
    setStudents(sorted)
  }, [])

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  const currentStudent = students.find(s => s.email === user?.email)
  const currentPosition = students.findIndex(s => s.email === user?.email) + 1

  const getPodiumColor = (position: number) => {
    switch(position) {
      case 1: return "from-yellow-400 to-yellow-600"
      case 2: return "from-gray-300 to-gray-500"
      case 3: return "from-orange-400 to-orange-600"
      default: return "from-gray-400 to-gray-600"
    }
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

        {/* Sua Posição */}
        {currentStudent && (
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 mb-8 text-white shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-blue-100 mb-1">Sua Posição</p>
                <p className="text-4xl font-bold">#{currentPosition}</p>
              </div>
              <div className="text-right">
                <p className="text-blue-100 mb-1">Seus Pontos</p>
                <p className="text-4xl font-bold">{currentStudent.points}</p>
              </div>
            </div>
          </div>
        )}

        {/* Top 3 Podium */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* 2º Lugar */}
          {students[1] && (
            <div className="transform md:translate-y-8">
              <div className={`bg-gradient-to-br ${getPodiumColor(2)} rounded-xl p-6 text-white shadow-xl`}>
                <div className="text-center">
                  <Medal className="w-16 h-16 mx-auto mb-3" />
                  <p className="text-2xl font-bold mb-1">2º Lugar 🥈</p>
                  <div className="text-4xl mb-2">{students[1].avatar}</div>
                  <p className="font-semibold mb-1">{students[1].name}</p>
                  <p className="text-sm opacity-80 mb-2">{students[1].class}</p>
                  <p className="text-3xl font-bold">{students[1].points} pts</p>
                </div>
              </div>
            </div>
          )}

          {/* 1º Lugar */}
          {students[0] && (
            <div className="md:-mt-4">
              <div className={`bg-gradient-to-br ${getPodiumColor(1)} rounded-xl p-6 text-white shadow-2xl relative`}>
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                  👑 CAMPEÃO
                </div>
                <div className="text-center pt-4">
                  <Trophy className="w-20 h-20 mx-auto mb-3 animate-pulse" />
                  <p className="text-3xl font-bold mb-1">1º Lugar 🥇</p>
                  <div className="text-5xl mb-2">{students[0].avatar}</div>
                  <p className="font-bold text-lg mb-1">{students[0].name}</p>
                  <p className="text-sm opacity-80 mb-2">{students[0].class}</p>
                  <p className="text-4xl font-bold">{students[0].points} pts</p>
                </div>
              </div>
            </div>
          )}

          {/* 3º Lugar */}
          {students[2] && (
            <div className="transform md:translate-y-12">
              <div className={`bg-gradient-to-br ${getPodiumColor(3)} rounded-xl p-6 text-white shadow-xl`}>
                <div className="text-center">
                  <Award className="w-14 h-14 mx-auto mb-3" />
                  <p className="text-2xl font-bold mb-1">3º Lugar 🥉</p>
                  <div className="text-4xl mb-2">{students[2].avatar}</div>
                  <p className="font-semibold mb-1">{students[2].name}</p>
                  <p className="text-sm opacity-80 mb-2">{students[2].class}</p>
                  <p className="text-3xl font-bold">{students[2].points} pts</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Ranking Completo */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <TrendingUp className="w-6 h-6 mr-2 text-blue-600" />
            Classificação Completa
          </h2>

          <div className="space-y-3">
            {students.map((student, index) => {
              const isCurrentUser = student.email === user?.email
              
              return (
                <div
                  key={student.id}
                  className={`flex items-center justify-between p-4 rounded-lg transition ${
                    isCurrentUser
                      ? "bg-blue-100 border-2 border-blue-500 shadow-md"
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl ${
                      index === 0 ? "bg-yellow-100 text-yellow-700" :
                      index === 1 ? "bg-gray-200 text-gray-700" :
                      index === 2 ? "bg-orange-100 text-orange-700" :
                      "bg-gray-100 text-gray-600"
                    }`}>
                      {index + 1}
                    </div>
                    
                    <div className="text-4xl">{student.avatar}</div>
                    
                    <div>
                      <p className="font-bold text-gray-900">
                        {student.name}
                        {isCurrentUser && <span className="ml-2 text-blue-600 text-sm">(Você)</span>}
                      </p>
                      <p className="text-sm text-gray-600">{student.class}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">{student.points}</p>
                    <p className="text-sm text-gray-500">pontos</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}