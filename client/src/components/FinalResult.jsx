import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import MermaidSetup from './MermaidSetup'
import RechartSetUp from './RechartSetUp'
import { downloadPdf } from '../services/api'
import { FiDownload, FiZap, FiBookOpen, FiHelpCircle, FiCheck } from 'react-icons/fi'

const markDownComponents = {
  h1: ({ children }) => (
    <h1 className="text-xl font-bold text-stone-900 mt-6 mb-3 border-b border-stone-200 pb-2">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-lg font-bold text-stone-900 mt-5 mb-2.5">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-base font-semibold text-stone-800 mt-4 mb-2">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-stone-700 text-sm leading-relaxed mb-3">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc ml-5 space-y-1.5 text-stone-700 text-sm marker:text-emerald-700 mb-3">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal ml-5 space-y-1.5 text-stone-700 text-sm marker:text-stone-700 mb-3">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="leading-relaxed">{children}</li>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-stone-900">{children}</strong>
  ),
  code: ({ children }) => (
    <code className="px-1.5 py-0.5 rounded bg-stone-100 text-stone-800 font-mono text-xs border border-stone-200">
      {children}
    </code>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-stone-300 pl-4 py-1 my-3 text-stone-600 italic text-sm">
      {children}
    </blockquote>
  )
}

function FinalResult({ result }) {
  const [quickRevision, setQuickRevision] = useState(false)
  const [downloading, setDownloading] = useState(false)

  if (
    !result ||
    !result.subTopics ||
    !result.questions ||
    !result.questions.short ||
    !result.questions.long ||
    !result.revisionPoints
  ) {
    return null
  }

  const handleDownload = async () => {
    try {
      setDownloading(true)
      await downloadPdf(result)
    } catch (e) {
      console.error(e)
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="space-y-8 bg-white text-stone-900">
      
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <h2 className="text-2xl font-extrabold text-stone-900 tracking-tight">
            📘 Study Material
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Structured exam guide ready for reading and revision
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => setQuickRevision(!quickRevision)}
            className={`
              px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer border
              ${quickRevision
                ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                : "bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-300"
              }
            `}
          >
            <FiZap className="w-3.5 h-3.5" />
            <span>{quickRevision ? "Exit 5-Min Mode" : "5-Min Quick Recap"}</span>
          </button>

          <button
            onClick={handleDownload}
            disabled={downloading}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-stone-900 hover:bg-stone-800 text-white shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-70"
          >
            <FiDownload className="w-3.5 h-3.5" />
            <span>{downloading ? "Preparing PDF..." : "Download PDF"}</span>
          </button>
        </div>
      </div>

      {/* 5-Min Revision View (When active) */}
      {quickRevision && (
        <section className="rounded-2xl bg-emerald-50/70 border border-emerald-200 p-6 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚡</span>
            <div>
              <h3 className="font-bold text-emerald-900 text-base">
                Exam Quick Revision Summary
              </h3>
              <p className="text-xs text-emerald-700">
                Core high-yield points for last-minute review
              </p>
            </div>
          </div>

          <ul className="space-y-2.5 pl-5 list-disc marker:text-emerald-700 text-stone-800 text-sm">
            {result.revisionPoints.map((point, i) => (
              <li key={i} className="leading-relaxed">
                {point}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Detailed Notes View (Standard) */}
      {!quickRevision && (
        <>
          {/* Sub Topics */}
          <section className="space-y-3">
            <SectionBadge icon="⭐" title="Sub Topic Breakdown" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(result.subTopics).map(([star, topics]) => (
                <div
                  key={star}
                  className="rounded-xl bg-stone-50 border border-stone-200 p-4 space-y-1.5"
                >
                  <p className="text-xs font-bold text-stone-900">
                    {star} Priority
                  </p>
                  <ul className="text-xs text-stone-700 space-y-1 pl-4 list-disc marker:text-stone-400">
                    {topics.map((t, i) => (
                      <li key={i}>{t}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Detailed Markdown Notes */}
          <section className="space-y-3">
            <SectionBadge icon="📝" title="Comprehensive Notes" />
            <div className="bg-stone-50/50 border border-stone-200 rounded-2xl p-6 sm:p-8">
              <ReactMarkdown components={markDownComponents}>
                {result.notes}
              </ReactMarkdown>
            </div>
          </section>
        </>
      )}

      {/* Concept Diagrams */}
      {result.diagram?.data && (
        <section className="space-y-3">
          <SectionBadge icon="📊" title="Concept Architecture & Flow Diagram" />
          <MermaidSetup diagram={result.diagram?.data} />
          <p className="text-xs text-stone-400 italic">
            Diagram synthesized automatically for visual understanding.
          </p>
        </section>
      )}

      {/* Comparison Charts */}
      {result.charts?.length > 0 && (
        <section className="space-y-3">
          <SectionBadge icon="📈" title="Visual Data & Comparison Charts" />
          <RechartSetUp charts={result.charts} />
        </section>
      )}

      {/* Important Questions */}
      <section className="space-y-4 pt-4 border-t border-stone-200">
        <SectionBadge icon="❓" title="Probable Exam Questions & Practice" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl bg-stone-50 border border-stone-200 p-4 space-y-2">
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wide">
              Short Answer Questions (2–3 Marks)
            </h4>
            <ul className="text-xs text-stone-700 space-y-1.5 pl-4 list-disc marker:text-stone-400">
              {result.questions.short.map((q, i) => (
                <li key={i}>{q}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl bg-stone-50 border border-stone-200 p-4 space-y-2">
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wide">
              Long Answer Questions (5+ Marks)
            </h4>
            <ul className="text-xs text-stone-700 space-y-1.5 pl-4 list-disc marker:text-stone-400">
              {result.questions.long.map((q, i) => (
                <li key={i}>{q}</li>
              ))}
            </ul>
          </div>
        </div>

        {result.questions.diagram && (
          <div className="rounded-xl bg-emerald-50/70 border border-emerald-200 p-4 space-y-1">
            <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wide">
              Diagram Question
            </h4>
            <p className="text-xs text-emerald-800 leading-relaxed">
              {result.questions.diagram}
            </p>
          </div>
        )}
      </section>

    </div>
  )
}

function SectionBadge({ icon, title }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-100 border border-stone-200 text-stone-800 font-bold text-xs uppercase tracking-wide">
      <span>{icon}</span>
      <span>{title}</span>
    </div>
  )
}

export default FinalResult
