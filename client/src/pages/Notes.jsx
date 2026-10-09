import React, { useState } from 'react'
import { motion } from "motion/react"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import TopicForm from '../components/TopicForm'
import Sidebar from '../components/Sidebar'
import FinalResult from '../components/FinalResult'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { FiBookOpen, FiArrowLeft, FiAlertCircle } from 'react-icons/fi'

function Notes() {
  const navigate = useNavigate()
  const { userData } = useSelector((state) => state.user)
  const credits = userData?.credits ?? 0
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState("")

  return (
    <div className="min-h-screen bg-[#fbfbf9] text-stone-900 flex flex-col justify-between">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-8">
        
        {/* Breadcrumb & Subheading */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-stone-500 mb-1">
              <button
                onClick={() => navigate("/")}
                className="hover:text-stone-900 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <FiArrowLeft className="w-3.5 h-3.5" />
                <span>Home</span>
              </button>
              <span>/</span>
              <span className="text-stone-900 font-semibold">Workspace</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              AI Note Generator
            </h1>
          </div>

          <button
            onClick={() => navigate("/history")}
            className="self-start sm:self-auto px-4 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <span>📚</span>
            <span>View Saved Notes</span>
          </button>
        </div>

        {/* Input Form */}
        <TopicForm
          loading={loading}
          setResult={setResult}
          setLoading={setLoading}
          setError={setError}
        />

        {/* Error notification */}
        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2">
            <FiAlertCircle className="w-4 h-4 text-red-500 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Empty State placeholder */}
        {!result && !loading && (
          <div className="py-16 rounded-2xl bg-white border border-dashed border-stone-300 flex flex-col items-center justify-center text-center px-4">
            <div className="w-12 h-12 rounded-2xl bg-stone-100 border border-stone-200 flex items-center justify-center text-xl mb-3">
              📖
            </div>
            <h3 className="text-sm font-bold text-stone-900 mb-1">
              No notes generated yet
            </h3>
            <p className="text-xs text-stone-500 max-w-sm leading-relaxed">
              Fill in your topic name, academic grade, and preferences above, then click Generate Notes.
            </p>
          </div>
        )}

        {/* Generated Result display */}
        {result && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Exam Sidebar Summary */}
            <div className="lg:col-span-4">
              <Sidebar result={result} />
            </div>

            {/* Right Column: Full Final Notes */}
            <div className="lg:col-span-8 bg-white rounded-2xl border border-stone-200 shadow-xs p-6 sm:p-8">
              <FinalResult result={result} />
            </div>

          </div>
        )}

      </main>

      <Footer />
    </div>
  )
}

export default Notes
