import React, { useEffect } from 'react'
import { motion } from "motion/react"
import { FiCheckCircle, FiArrowRight } from "react-icons/fi"
import { getCurrentUser } from '../services/api'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function PaymentSuccess() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    getCurrentUser(dispatch)
    const t = setTimeout(() => {
      navigate("/")
    }, 4000)
    return () => clearTimeout(t)
  }, [dispatch, navigate])

  return (
    <div className="min-h-screen bg-[#fbfbf9] text-stone-900 flex flex-col justify-between">
      <Navbar />

      <main className="max-w-md mx-auto px-6 py-16 flex-1 flex items-center justify-center w-full">
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-8 text-center space-y-5 w-full">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center text-3xl mx-auto">
            <FiCheckCircle />
          </div>

          <div className="space-y-1.5">
            <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight">
              Payment Successful!
            </h1>
            <p className="text-xs text-stone-600 leading-relaxed">
              Your credits have been added to your account balance. You can now generate more AI study guides.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => navigate("/notes")}
              className="w-full py-3 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Go to Note Generator</span>
              <FiArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[11px] text-stone-400 mt-3">Redirecting automatically in a few seconds...</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default PaymentSuccess
