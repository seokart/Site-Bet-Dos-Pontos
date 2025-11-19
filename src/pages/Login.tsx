import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [email, setEmail] = useState("")
  const [userName, setUserName] = useState("")
  const [role, setRole] = useState<"student" | "teacher">("student")

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()

    if (!email || !userName) {
      alert("Preencha todos os campos!")
      return
    }

    // ✅ CORRIGIDO: Define explicitamente o tipo
    const userData = {
      name: userName,
      email,
      role: (role === "student" ? "ALUNO" : "PROFESSOR") as "ALUNO" | "PROFESSOR"
    }

    login(userData)

    // Redireciona
    if (role === "student") {
      navigate("/student")
    } else {
      navigate("/teacher")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100"
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-900">
          🎓 Entrar no Sistema
        </h1>

        <label className="block mb-4">
          <span className="text-gray-700 font-semibold">Nome de Usuário</span>
          <input
            type="text"
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Ex: Maria Santos"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700 font-semibold">E-mail</span>
          <input
            type="email"
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="exemplo@email.com"
          />
        </label>

        <label className="block mb-6">
          <span className="text-gray-700 font-semibold">Você é:</span>
          <select
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            value={role}
            onChange={(e) => setRole(e.target.value as "student" | "teacher")}
          >
            <option value="student">👨‍🎓 Aluno</option>
            <option value="teacher">👨‍🏫 Professor</option>
          </select>
        </label>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Entrar
        </button>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            ← Voltar para home
          </button>
        </div>
      </form>
    </div>
  )
}