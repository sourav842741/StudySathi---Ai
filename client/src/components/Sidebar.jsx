import React from 'react'
import { FiCheckCircle, FiHelpCircle, FiFileText, FiLayers } from "react-icons/fi"

function Sidebar({ result }) {
  if (
    !result ||
    !result.subTopics ||
    !result.questions ||
    !result.questions.short ||
    !result.questions.long
  ) {
    return null
  }

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-5 space-y-6 text-stone-900">
      
      {/* Header */}
      <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
        <span className="text-lg">📌</span>
        <div>
          <h3 className="text-sm font-bold text-stone-900">Quick Exam Summary</h3>
          <p className="text-[11px] text-stone-500">Key focus areas & weightage</p>
        </div>
      </div>

      {/* Exam Importance */}
      {result.importance && (
        <div className="rounded-xl bg-amber-50 border border-amber-200 p-3.5">
          <p className="text-xs font-bold text-amber-900 uppercase tracking-wide flex items-center gap-1.5 mb-1">
            <span>🔥</span>
            <span>Exam Importance</span>
          </p>
          <p className="text-xs font-semibold text-amber-800 leading-relaxed">
            {result.importance}
          </p>
        </div>
      )}

      {/* Sub Topics by Priority */}
      <section className="space-y-3">
        <p className="text-xs font-bold text-stone-700 uppercase tracking-wide">
          Sub Topics by Priority
        </p>

        {Object.entries(result.subTopics).map(([star, topics]) => (
          <div
            key={star}
            className="rounded-xl bg-stone-50 border border-stone-200 p-3.5 space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-800">
                ⭐ {star}
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white border border-stone-200 text-stone-600">
                Key Topics
              </span>
            </div>

            <ul className="text-xs text-stone-700 space-y-1.5 pl-3 list-disc marker:text-stone-400">
              {topics.map((t, i) => (
                <li key={i} className="leading-snug">{t}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Expected Questions */}
      <section className="space-y-3 pt-2 border-t border-stone-100">
        <p className="text-xs font-bold text-stone-700 uppercase tracking-wide flex items-center gap-1.5">
          <FiHelpCircle className="w-3.5 h-3.5 text-stone-500" />
          <span>Expected Questions</span>
        </p>

        {/* Short Questions */}
        <div className="rounded-xl bg-stone-50 border border-stone-200 p-3.5 space-y-2">
          <p className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-stone-700"></span>
            <span>Short Answer (2–3 Marks)</span>
          </p>
          <ul className="text-xs text-stone-700 space-y-1.5 pl-3 list-disc marker:text-stone-400">
            {result.questions.short.map((t, i) => (
              <li key={i} className="leading-snug">{t}</li>
            ))}
          </ul>
        </div>

        {/* Long Questions */}
        <div className="rounded-xl bg-stone-50 border border-stone-200 p-3.5 space-y-2">
          <p className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-stone-700"></span>
            <span>Long Answer (5+ Marks)</span>
          </p>
          <ul className="text-xs text-stone-700 space-y-1.5 pl-3 list-disc marker:text-stone-400">
            {result.questions.long.map((t, i) => (
              <li key={i} className="leading-snug">{t}</li>
            ))}
          </ul>
        </div>

        {/* Diagram Question */}
        {result.questions.diagram && (
          <div className="rounded-xl bg-emerald-50/70 border border-emerald-200 p-3.5 space-y-1.5">
            <p className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
              <span>📊</span>
              <span>Diagram / Workflow Question</span>
            </p>
            <p className="text-xs text-emerald-800 leading-snug pl-1">
              {result.questions.diagram}
            </p>
          </div>
        )}

      </section>

    </div>
  )
}

export default Sidebar
