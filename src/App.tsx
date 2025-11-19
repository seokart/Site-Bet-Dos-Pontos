import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { AuthProvider } from "./contexts/AuthContext"
import HomePage from "./pages/HomePage"
import StudentsDashboard from "./pages/StudentsDashboard"
import TeacherDashboard from "./pages/TeacherDashboard"
import RewardsStore from "./pages/RewardsStore"
import Ranking from "./pages/Ranking"
import PointsHistory from "./pages/PointsHistory"
import Login from "./pages/Login"

function App() {
  return (
    <AuthProvider> {/* ✅ AuthProvider PRIMEIRO */}
      <Router>  {/* ✅ Router DENTRO do AuthProvider */}
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 5000,
            style: { background: "#363636", color: "#fff" },
            success: { style: { background: "#10b981" } },
            error: { style: { background: "#ef4444" } }
          }}
        />
        
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} /> 
            <Route path="/student" element={<StudentsDashboard />} />
            <Route path="/teacher" element={<TeacherDashboard />} />
            <Route path="/rewards" element={<RewardsStore />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/history" element={<PointsHistory />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App