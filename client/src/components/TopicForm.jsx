import React, { useEffect, useState } from 'react'
import { motion } from "motion/react"
import { generateNotes } from '../services/api'
import { useDispatch } from 'react-redux'
import { updateCredits } from '../redux/userSlice'
import { FiBook, FiAward, FiBookmark, FiZap, FiCheck, FiArrowRight } from "react-icons/fi"

function TopicForm({ setResult, setLoading, loading, setError }) {
  const [topic, setTopic] = useState("")
  const [classLevel, setClassLevel] = useState("")
  const [examType, setExamType] = useState("")
  const [revisionMode, setRevisionMode] = useState(false)
  const [includeDiagram, setIncludeDiagram] = useState(false)
  const [includeChart, setIncludeChart] = useState(false)
  const [progress, setProgress] = useState(0)
  const [progressText, setProgressText] = useState("")
  const dispatch = useDispatch()

  const handleSubmit = async () => {
    if (!topic.trim()) {
      setError("Please enter the topic name")
      return
    }
    setError("")
    setLoading(true)
    setResult(null)
    try {
      const result = await generateNotes({
        topic,
        classLevel,
        examType,
        revisionMode,
        includeDiagram,
        includeChart
      })
      
      setResult(result.data)
      setLoading(false)
      setClassLevel("")
      setTopic("")
      setExamType("")
      setIncludeChart(false)
      setRevisionMode(false)
      setIncludeDiagram(false)

      if (typeof result.creditsLeft === "number") {
        dispatch(updateCredits(result.creditsLeft))
      }
    } catch (error) {
      console.log(error)
      setError("Failed to generate notes. Please check connection and try again.")
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!loading) {
      setProgress(0)
      setProgressText("")
      return
    }
    let value = 0

    const interval = setInterval(() => {
      value += Math.random() * 8

      if (value >= 95) {
        value = 95
        setProgressText("Finalizing high-yield study notes…")
        clearInterval(interval)
      } else if (value > 70) {
        setProgressText("Formatting questions and diagrams…")
      } else if (value > 40) {
        setProgressText("Extracting core concepts and definitions…")
      } else {
        setProgressText("Analyzing topic and syllabus…")
      }

      setProgress(Math.floor(value))
    }, 700)

    return () => clearInterval(interval)
  }, [loading])

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-6 sm:p-8 space-y-6 text-stone-900">
      
      {/* Form Header */}
      <div className="border-b border-stone-100 pb-4">
        <h2 className="text-xl font-bold text-stone-900">Generate New Study Notes</h2>
        <p className="text-xs text-stone-500 mt-1">
          Provide your topic details below to create structured, exam-oriented study notes.
        </p>
      </div>

      {/* Input Fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Topic Input */}
        <div className="space-y-1.5 md:col-span-1">
          <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
            <FiBook className="text-stone-500 w-3.5 h-3.5" />
            <span>Topic / Chapter *</span>
          </label>
          <input
            type="text"
            className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 focus:bg-white transition-all"
            placeholder="e.g. Photosynthesis, SQL Joins"
            onChange={(e) => setTopic(e.target.value)}
            value={topic}
            disabled={loading}
          />
        </div>

        {/* Class Level */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
            <FiBookmark className="text-stone-500 w-3.5 h-3.5" />
            <span>Class / Grade Level</span>
          </label>
          <input
            type="text"
            className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 focus:bg-white transition-all"
            placeholder="e.g. Class 10, B.Tech 2nd Year"
            onChange={(e) => setClassLevel(e.target.value)}
            value={classLevel}
            disabled={loading}
          />
        </div>

        {/* Exam Type */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
            <FiAward className="text-stone-500 w-3.5 h-3.5" />
            <span>Exam Target / Board</span>
          </label>
          <input
            type="text"
            className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 focus:bg-white transition-all"
            placeholder="e.g. CBSE, JEE, University"
            onChange={(e) => setExamType(e.target.value)}
            value={examType}
            disabled={loading}
          />
        </div>

      </div>

      {/* Feature Toggles */}
      <div className="pt-2 border-t border-stone-100">
        <p className="text-xs font-semibold text-stone-700 mb-3">Customization Options</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          <ToggleCard
            icon="⚡"
            label="5-Min Revision Mode"
            desc="Condensed bullet points for quick recap"
            checked={revisionMode}
            onChange={() => setRevisionMode(!revisionMode)}
            disabled={loading}
          />

          <ToggleCard
            icon="📊"
            label="Concept Diagrams"
            desc="Visual flowcharts and system diagrams"
            checked={includeDiagram}
            onChange={() => setIncludeDiagram(!includeDiagram)}
            disabled={loading}
          />

          <ToggleCard
            icon="📈"
            label="Comparison Charts"
            desc="Bar or pie charts for data metrics"
            checked={includeChart}
            onChange={() => setIncludeChart(!includeChart)}
            disabled={loading}
          />

        </div>
      </div>

      {/* Submit Action */}
      <div className="pt-2">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`
            w-full py-3.5 px-6 rounded-xl font-semibold text-sm
            flex items-center justify-center gap-2.5 transition-all
            ${loading
              ? "bg-stone-100 text-stone-400 border border-stone-200 cursor-not-allowed"
              : "bg-stone-900 hover:bg-stone-800 text-white shadow-xs hover:shadow cursor-pointer"
            }
          `}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-stone-400 border-t-stone-800 rounded-full animate-spin"></span>
              <span>Synthesizing Exam Notes...</span>
            </div>
          ) : (
            <>
              <span>Generate Notes with AI</span>
              <FiArrowRight className="w-4 h-4 text-stone-400" />
            </>
          )}
        </button>
      </div>

      {/* Clean Loading Progress Bar */}
      {loading && (
        <div className="pt-3 space-y-2 border-t border-stone-100">
          <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
            <div
              className="h-full bg-emerald-600 transition-all duration-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-xs text-stone-500">
            <span className="font-medium text-stone-700">{progressText}</span>
            <span className="font-mono font-semibold text-stone-900">{progress}%</span>
          </div>
          
          <p className="text-[11px] text-stone-400 text-center">
            AI note compilation typically takes 20–40 seconds. Please keep this tab open.
          </p>
        </div>
      )}

    </div>
  )
}

function ToggleCard({ icon, label, desc, checked, onChange, disabled }) {
  return (
    <div
      onClick={!disabled ? onChange : undefined}
      className={`
        p-3.5 rounded-xl border transition-all cursor-pointer select-none flex items-start justify-between gap-2
        ${checked
          ? "bg-emerald-50/70 border-emerald-300 shadow-xs"
          : "bg-stone-50 hover:bg-stone-100/70 border-stone-200"
        }
        ${disabled ? "opacity-60 cursor-not-allowed" : ""}
      `}
    >
      <div className="space-y-0.5">
        <div className="flex items-center gap-1.5">
          <span className="text-sm">{icon}</span>
          <span className={`text-xs font-bold ${checked ? "text-emerald-900" : "text-stone-800"}`}>
            {label}
          </span>
        </div>
        <p className="text-[11px] text-stone-500 leading-tight">{desc}</p>
      </div>

      <div
        className={`
          w-5 h-5 rounded-md flex items-center justify-center border transition-colors mt-0.5 shrink-0
          ${checked
            ? "bg-emerald-600 border-emerald-600 text-white"
            : "bg-white border-stone-300"
          }
        `}
      >
        {checked && <FiCheck className="w-3.5 h-3.5" />}
      </div>
    </div>
  )
}

export default TopicForm
