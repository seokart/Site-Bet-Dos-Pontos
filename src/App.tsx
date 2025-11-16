import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import HomePage from "./pages/HomePage"
import StudentDashboard from "./pages/StudentDashboard"
import TeacherDashboard from "./pages/TeacherDashboard"
import RewardsStore from "./pages/RewardsStore"
import Ranking from "./pages/Ranking"
import PointsHistory from "./pages/PointsHistory"

function App() {
  return (
    <>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 5000,
          style: { background: "#363636", color: "#fff" },
          success: { style: { background: "#10b981" } },
          error: { style: { background: "#ef4444" } }
        }}
      />

      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/student" element={<StudentDashboard />} />
            <Route path="/teacher" element={<TeacherDashboard />} />
            <Route path="/rewards" element={<RewardsStore />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/history" element={<PointsHistory />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App