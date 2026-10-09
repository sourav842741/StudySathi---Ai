import React from 'react'
import logo from "../assets/logo.png"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { serverUrl } from '../App'
import { setUserData } from '../redux/userSlice'

function Footer() {
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
    <footer className="border-t border-stone-200 bg-white mt-16 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <img src={logo} alt="StudySathi AI" className="h-7 w-7 object-contain" />
              <span className="text-base font-bold text-stone-900">
                StudySathi <span className="text-emerald-700">AI</span>
              </span>
            </div>
            <p className="text-xs text-stone-600 max-w-sm leading-relaxed">
              StudySathi AI is designed for students seeking clean, focused, high-yield study material without unnecessary distractions. Generate exam notes, diagrams, and print-ready PDFs.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">Workspace</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => navigate("/notes")}
                  className="text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
                >
                  Generate Notes
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/history")}
                  className="text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
                >
                  Past Notes History
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/pricing")}
                  className="text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
                >
                  Purchase Credits
                </button>
              </li>
            </ul>
          </div>

          {/* Account / Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">Support</h4>
            <ul className="space-y-2 text-xs">
              <li className="text-stone-600">sourav20975@gmail.com</li>
              <li>
                <button
                  onClick={handleSignOut}
                  className="text-red-600 hover:text-red-700 transition-colors cursor-pointer"
                >
                  Sign Out
                </button>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-stone-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} StudySathi AI. Built for smart exam prep.</p>
          <p className="text-stone-400">Strictly academic & study revision tool</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
