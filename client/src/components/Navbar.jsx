import React, { useState } from 'react'
import { AnimatePresence, motion } from "motion/react"
import logo from "../assets/logo.png"
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { serverUrl } from '../App'
import { setUserData } from '../redux/userSlice'
import { useNavigate, Link } from 'react-router-dom'
import { FiPlus, FiBookOpen, FiLogOut, FiCreditCard } from "react-icons/fi"

function Navbar() {
  const { userData } = useSelector((state) => state.user)
  const credits = userData?.credits ?? 0
  const [showCredits, setShowCredits] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSignOut = async () => {
    try {
      await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true })
      dispatch(setUserData(null))
      navigate("/auth")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-none border-b border-stone-200 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3 group">
          <img src={logo} alt="StudySathi AI" className="w-8 h-8 object-contain" />
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold tracking-tight text-stone-900 group-hover:text-emerald-800 transition-colors">
              StudySathi
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              AI
            </span>
          </div>
        </Link>

        {/* Navigation links & User actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => navigate("/notes")}
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-stone-700 hover:text-stone-900 px-3 py-1.5 rounded-lg hover:bg-stone-100 transition-colors"
          >
            <FiBookOpen className="w-4 h-4 text-stone-500" />
            <span>Generate Notes</span>
          </button>

          <button
            onClick={() => navigate("/history")}
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-stone-700 hover:text-stone-900 px-3 py-1.5 rounded-lg hover:bg-stone-100 transition-colors"
          >
            <span>Past Notes</span>
          </button>

          {/* Credits pill */}
          <div className="relative">
            <button
              onClick={() => {
                setShowCredits(!showCredits)
                setShowProfile(false)
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100/80 border border-amber-200/90 text-amber-900 text-sm font-semibold transition-colors cursor-pointer"
            >
              <span className="text-base">⚡</span>
              <span>{credits}</span>
              <span className="text-xs font-normal text-amber-800 hidden md:inline">credits</span>
              <span className="ml-1 w-5 h-5 rounded-full bg-amber-200/80 hover:bg-amber-300 flex items-center justify-center text-amber-900">
                <FiPlus className="w-3 h-3" />
              </span>
            </button>

            <AnimatePresence>
              {showCredits && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-72 bg-white rounded-2xl border border-stone-200 shadow-xl p-5 text-stone-900 z-50"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-stone-900">Available Credits</h4>
                    <span className="text-base font-bold text-amber-700">{credits}</span>
                  </div>
                  <p className="text-xs text-stone-600 mb-4 leading-relaxed">
                    Credits are used to create structured notes, interactive diagrams, and clean printable PDFs.
                  </p>
                  <button
                    onClick={() => {
                      setShowCredits(false)
                      navigate("/pricing")
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-medium text-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <FiCreditCard className="w-4 h-4" />
                    <span>Get More Credits</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowProfile(!showProfile)
                setShowCredits(false)
              }}
              className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 border border-stone-300 flex items-center justify-center text-stone-800 font-bold text-sm transition-colors cursor-pointer"
            >
              {userData?.name ? userData.name.slice(0, 1).toUpperCase() : "U"}
            </button>

            <AnimatePresence>
              {showProfile && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-56 bg-white rounded-2xl border border-stone-200 shadow-xl p-2 text-stone-900 z-50"
                >
                  <div className="px-3 py-2 border-b border-stone-100 mb-1">
                    <p className="text-sm font-semibold text-stone-900 truncate">{userData?.name}</p>
                    <p className="text-xs text-stone-500 truncate">{userData?.email}</p>
                  </div>

                  <button
                    onClick={() => {
                      setShowProfile(false)
                      navigate("/notes")
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-stone-700 hover:text-stone-900 hover:bg-stone-50 rounded-lg transition-colors text-left"
                  >
                    <FiBookOpen className="w-4 h-4 text-stone-500" />
                    <span>Create Notes</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowProfile(false)
                      navigate("/history")
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-stone-700 hover:text-stone-900 hover:bg-stone-50 rounded-lg transition-colors text-left"
                  >
                    <span className="text-stone-500">📁</span>
                    <span>Note History</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowProfile(false)
                      navigate("/pricing")
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-stone-700 hover:text-stone-900 hover:bg-stone-50 rounded-lg transition-colors text-left"
                  >
                    <FiCreditCard className="w-4 h-4 text-stone-500" />
                    <span>Pricing Plans</span>
                  </button>

                  <div className="h-px bg-stone-100 my-1" />

                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left"
                  >
                    <FiLogOut className="w-4 h-4 text-red-500" />
                    <span>Sign Out</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </header>
  )
}

export default Navbar
