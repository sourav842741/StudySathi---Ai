import React, { useEffect } from 'react'
import { motion } from "motion/react"
import { FiAlertTriangle, FiArrowLeft, FiRefreshCw } from "react-icons/fi"
import { getCurrentUser } from '../services/api'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function PaymentFailed() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    getCurrentUser(dispatch)
  }, [dispatch])

  return (
    <div className="min-h-screen bg-[#fbfbf9] text-stone-900 flex flex-col justify-between">
      <Navbar />

      <main className="max-w-md mx-auto px-6 py-16 flex-1 flex items-center justify-center w-full">
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-8 text-center space-y-5 w-full">
          <div className="w-16 h-16 rounded-full bg-red-50 text-red-600 border border-red-200 flex items-center justify-center text-3xl mx-auto">
            <FiAlertTriangle />
          </div>

          <div className="space-y-1.5">
            <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight">
              Payment Incomplete
            </h1>
            <p className="text-xs text-stone-600 leading-relaxed">
              The payment was not completed or was cancelled. No charges were made to your card.
            </p>
          </div>

          <div className="pt-2 space-y-2">
            <button
              onClick={() => navigate("/pricing")}
              className="w-full py-3 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <FiRefreshCw className="w-4 h-4" />
              <span>Try Again</span>
            </button>

            <button
              onClick={() => navigate("/")}
              className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <FiArrowLeft className="w-4 h-4" />
              <span>Return to Dashboard</span>
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default PaymentFailed
