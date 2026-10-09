import React, { useState } from 'react'
import { motion } from "motion/react"
import { FcGoogle } from "react-icons/fc"
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../utils/firebase'
import axios from "axios"
import { serverUrl } from '../App'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'
import logo from "../assets/logo.png"
import { FiCheckCircle, FiBookOpen, FiFileText, FiPieChart, FiDownload, FiArrowRight } from "react-icons/fi"

function Auth() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  const handleGoogleAuth = async () => {
    try {
      setLoading(true)
      setErrorMsg("")
      const response = await signInWithPopup(auth, provider)
      const user = response.user
      const name = user.displayName
      const email = user.email

      const result = await axios.post(
        serverUrl + "/api/auth/google",
        { name, email },
        { withCredentials: true }
      )
      dispatch(setUserData(result.data))
    } catch (error) {
      console.error(error)
      setErrorMsg("Sign-in failed. Please ensure third-party cookies/popups are allowed and try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#fbfbf9] text-stone-900 flex flex-col justify-between">
      
      {/* Top Header */}
      <header className="border-b border-stone-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="StudySathi AI" className="w-8 h-8 object-contain" />
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-stone-900">StudySathi</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                AI
              </span>
            </div>
          </div>
          <div className="text-xs text-stone-500 font-medium hidden sm:block">
            Exam Preparation & AI Study Notes
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center flex-1">
        
        {/* Left Side: Value Proposition & Auth Button */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-100 border border-stone-200 text-stone-700 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            Exam-focused revision and structured notes engine
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-900 leading-[1.12]">
            Smart study notes, <br className="hidden sm:inline" />
            <span className="text-emerald-700">structured for exams</span>
          </h1>

          <p className="text-lg text-stone-600 leading-relaxed max-w-xl">
            Stop spending hours organizing fragmented textbook chapters. Generate high-yield revision summaries, flow diagrams, question banks, and clean PDFs in seconds.
          </p>

          {/* Call to action */}
          <div className="pt-2 space-y-4">
            <button
              onClick={handleGoogleAuth}
              disabled={loading}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-base shadow-sm hover:shadow transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <FcGoogle className="w-5 h-5 bg-white rounded-full p-0.5" />
              <span>{loading ? "Signing in..." : "Continue with Google"}</span>
              <FiArrowRight className="w-4 h-4 text-stone-400" />
            </button>

            {errorMsg && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                {errorMsg}
              </div>
            )}

            <div className="flex items-center gap-2 text-xs font-medium text-stone-600 pt-1">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span><strong>50 free credits</strong> granted on registration. No credit card required.</span>
            </div>
          </div>

          {/* Quick trust metrics */}
          <div className="pt-6 border-t border-stone-200 grid grid-cols-3 gap-4 max-w-lg">
            <div>
              <p className="text-2xl font-bold text-stone-900">50+</p>
              <p className="text-xs text-stone-500 mt-0.5">Free starter credits</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-stone-900">100%</p>
              <p className="text-xs text-stone-500 mt-0.5">Exam oriented syllabus</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-stone-900">1-Click</p>
              <p className="text-xs text-stone-500 mt-0.5">Instant PDF downloads</p>
            </div>
          </div>

        </div>

        {/* Right Side: Feature Highlights */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">What you get</h3>
            
            <FeatureRow
              icon={<FiBookOpen className="w-5 h-5 text-emerald-700" />}
              title="Exam-Targeted Summaries"
              description="High-yield concepts, definitions, and formulas broken down point-by-point."
            />

            <FeatureRow
              icon={<FiPieChart className="w-5 h-5 text-amber-700" />}
              title="Interactive Flow Diagrams"
              description="Automated system architectures, timelines, and decision trees for complex topics."
            />

            <FeatureRow
              icon={<FiFileText className="w-5 h-5 text-stone-700" />}
              title="Expected Exam Questions"
              description="Short and long questions with model answers categorized by probability."
            />

            <FeatureRow
              icon={<FiDownload className="w-5 h-5 text-teal-700" />}
              title="Clean Printable PDFs"
              description="Cleanly typeset lecture-ready PDF files formatted for study and prints."
            />
          </div>

        </div>

      </main>

      {/* Clean Minimal Footer */}
      <footer className="border-t border-stone-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-6 text-center text-xs text-stone-500">
          © {new Date().getFullYear()} StudySathi AI • Built for focused, distraction-free learning.
        </div>
      </footer>

    </div>
  )
}

function FeatureRow({ icon, title, description }) {
  return (
    <div className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-stone-50 transition-colors border border-transparent hover:border-stone-100">
      <div className="mt-0.5 p-2 rounded-lg bg-stone-100 border border-stone-200/60">
        {icon}
      </div>
      <div>
        <h4 className="text-sm font-semibold text-stone-900">{title}</h4>
        <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

export default Auth
