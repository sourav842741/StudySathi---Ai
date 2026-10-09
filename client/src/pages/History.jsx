import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { serverUrl } from '../App'
import { AnimatePresence, motion } from "motion/react"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FiMenu, FiX, FiPlus, FiBookOpen, FiClock, FiChevronRight } from "react-icons/fi"
import FinalResult from '../components/FinalResult'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function History() {
  const [topics, setTopics] = useState([])
  const navigate = useNavigate()
  const { userData } = useSelector((state) => state.user)
  const credits = userData?.credits ?? 0
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [activeNoteId, setActiveNoteId] = useState(null)
  const [selectedNote, setSelectedNote] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get(serverUrl + "/api/notes/getnotes", { withCredentials: true })
        setTopics(Array.isArray(res.data) ? res.data : [])
        // auto-select first note if available
        if (Array.isArray(res.data) && res.data.length > 0) {
          openNotes(res.data[0]._id)
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchNotes()
  }, [])

  const openNotes = async (noteId) => {
    setLoading(true)
    setActiveNoteId(noteId)
    try {
      const res = await axios.get(serverUrl + `/api/notes/${noteId}`, { withCredentials: true })
      setSelectedNote(res.data.content)
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (window.innerWidth >= 1024) {
      setIsSidebarOpen(true)
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#fbfbf9] text-stone-900 flex flex-col justify-between">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-6">
        
        {/* Header bar */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200">
          <div>
            <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight">
              📚 Past Study Notes
            </h1>
            <p className="text-xs text-stone-500 mt-0.5">
              Review and export your previously generated study materials
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 rounded-xl bg-white border border-stone-300 text-stone-700 cursor-pointer"
            >
              {isSidebarOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </button>

            <button
              onClick={() => navigate("/notes")}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-stone-900 hover:bg-stone-800 text-white transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <FiPlus className="w-3.5 h-3.5" />
              <span>New Notes</span>
            </button>
          </div>
        </div>

        {/* 2-Column Library Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Notes Sidebar Drawer / List */}
          <div
            className={`
              lg:col-span-4 bg-white rounded-2xl border border-stone-200 shadow-xs p-5
              ${isSidebarOpen ? "block" : "hidden lg:block"}
            `}
          >
            <div className="flex items-center justify-between mb-4 border-b border-stone-100 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-700">
                Your Library ({topics.length})
              </span>
              <button
                onClick={() => navigate("/notes")}
                className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold cursor-pointer"
              >
                + Create
              </button>
            </div>

            {topics.length === 0 && (
              <div className="py-8 text-center text-xs text-stone-400">
                <p>No notes created yet.</p>
                <button
                  onClick={() => navigate("/notes")}
                  className="mt-2 text-stone-800 font-semibold underline cursor-pointer"
                >
                  Create your first note
                </button>
              </div>
            )}

            <div className="space-y-2.5 max-h-[68vh] overflow-y-auto pr-1">
              {topics.map((t) => {
                const isSelected = activeNoteId === t._id
                return (
                  <div
                    key={t._id}
                    onClick={() => openNotes(t._id)}
                    className={`
                      p-3.5 rounded-xl border transition-all cursor-pointer text-left
                      ${isSelected
                        ? "bg-emerald-50/80 border-emerald-300 shadow-xs"
                        : "bg-stone-50 hover:bg-stone-100/70 border-stone-200"
                      }
                    `}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className={`text-xs font-bold line-clamp-1 ${isSelected ? "text-emerald-950" : "text-stone-900"}`}>
                        {t.topic}
                      </p>
                      <FiChevronRight className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${isSelected ? "text-emerald-700" : "text-stone-400"}`} />
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {t.classLevel && (
                        <span className="px-2 py-0.5 rounded-md bg-stone-200/70 text-stone-700 text-[10px] font-medium">
                          {t.classLevel}
                        </span>
                      )}
                      {t.examType && (
                        <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[10px] font-medium">
                          {t.examType}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 mt-2 text-[10px] text-stone-500 font-medium">
                      {t.revisionMode && <span>⚡ 5-min recap</span>}
                      {t.includeDiagram && <span>📊 Diagram</span>}
                      {t.includeChart && <span>📈 Chart</span>}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Note Content Viewer */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-stone-200 shadow-xs p-6 sm:p-8 min-h-[68vh]">
            {loading && (
              <div className="h-96 flex flex-col items-center justify-center gap-3 text-stone-500">
                <span className="w-6 h-6 border-2 border-stone-300 border-t-stone-800 rounded-full animate-spin"></span>
                <p className="text-xs font-medium">Loading study notes...</p>
              </div>
            )}

            {!loading && !selectedNote && (
              <div className="h-96 flex flex-col items-center justify-center text-center text-stone-400">
                <FiBookOpen className="w-10 h-10 mb-2 text-stone-300" />
                <p className="text-sm font-semibold text-stone-600">No note selected</p>
                <p className="text-xs text-stone-400 mt-1">Select a topic from your library to view its content.</p>
              </div>
            )}

            {!loading && selectedNote && (
              <FinalResult result={selectedNote} />
            )}
          </div>

        </div>

      </main>

      <Footer />
    </div>
  )
}

export default History
