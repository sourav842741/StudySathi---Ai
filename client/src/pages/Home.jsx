import React from 'react'
import Navbar from '../components/Navbar'
import { motion } from "motion/react"
import img from "../assets/img1.png"
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import { FiArrowRight, FiBookOpen, FiFileText, FiLayers, FiDownload, FiCheckCircle } from 'react-icons/fi'

function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#fbfbf9] text-stone-900 flex flex-col justify-between">
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-16 lg:pt-16 lg:pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-100 border border-stone-200 text-stone-700 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            Focused study companion for exam prep
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-900 leading-[1.12]">
            Smart, structured notes <br className="hidden sm:inline" />
            <span className="text-emerald-700">crafted for your exams</span>
          </h1>

          <p className="text-lg text-stone-600 leading-relaxed max-w-xl">
            Transform lengthy textbook topics into clean, revision-ready outlines. Get clear concept breakdowns, auto-generated flow diagrams, and probable exam questions.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => navigate("/notes")}
              className="px-6 py-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-base shadow-xs hover:shadow transition-all flex items-center gap-2.5 cursor-pointer"
            >
              <span>Create Notes Now</span>
              <FiArrowRight className="w-4 h-4 text-stone-400" />
            </button>

            <button
              onClick={() => navigate("/history")}
              className="px-6 py-3.5 rounded-xl bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 font-semibold text-base transition-colors cursor-pointer"
            >
              <span>Past Notes</span>
            </button>
          </div>

          <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-stone-500 font-medium">
            <div className="flex items-center gap-1.5">
              <FiCheckCircle className="text-emerald-700 w-4 h-4" />
              <span>50 Free Credits</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FiCheckCircle className="text-emerald-700 w-4 h-4" />
              <span>Printable PDF Format</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FiCheckCircle className="text-emerald-700 w-4 h-4" />
              <span>CBSE, JEE, NEET & College Syllabi</span>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Preview */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-2xl border border-stone-200 p-3 shadow-md">
            <div className="overflow-hidden rounded-xl bg-stone-50 border border-stone-100">
              <img
                src={img}
                alt="StudySathi AI Preview"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>

      </section>

      {/* Feature Section */}
      <section className="bg-white border-y border-stone-200 py-16">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              Everything you need for exam revision
            </h2>
            <p className="text-stone-600 text-sm mt-2">
              Designed specifically to cut out fluff and focus strictly on high-yield, marks-fetching topics.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<FiBookOpen className="w-5 h-5 text-emerald-700" />}
              title="Exam Notes"
              des="High-yield exam-oriented notes, categorized definitions, and step-by-step concepts."
            />
            <FeatureCard
              icon={<FiFileText className="w-5 h-5 text-amber-700" />}
              title="Project Notes"
              des="Structured documentation and clean summary outlines for projects and assignments."
            />
            <FeatureCard
              icon={<FiLayers className="w-5 h-5 text-stone-700" />}
              title="Diagrams & Charts"
              des="Visual concept architectures and data charts automatically drawn for clarity."
            />
            <FeatureCard
              icon={<FiDownload className="w-5 h-5 text-teal-700" />}
              title="PDF Downloads"
              des="Clean, single-click printable study sheets formatted for easy reading on paper or screen."
            />
          </div>

        </div>
      </section>

      {/* How it Works / Workflow */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            How StudySathi AI works
          </h2>
          <p className="text-stone-600 text-sm mt-2">
            Three simple steps to exam-ready study material
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StepCard
            step="01"
            title="Enter Topic & Syllabus"
            des="Type in any topic, chapter, or exam target (like Class 10, JEE, NEET, or University exams)."
          />
          <StepCard
            step="02"
            title="Configure Options"
            des="Toggle 5-minute revision mode, concept diagrams, or comparison charts as needed."
          />
          <StepCard
            step="03"
            title="Study & Export"
            des="Read structured notes with important questions, or export directly to clean PDF."
          />
        </div>
      </section>

      <Footer />
    </div>
  )
}

function FeatureCard({ icon, title, des }) {
  return (
    <div className="rounded-2xl p-6 bg-stone-50 border border-stone-200/80 hover:border-stone-300 transition-colors">
      <div className="w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center mb-4 shadow-xs">
        {icon}
      </div>
      <h3 className="text-base font-bold text-stone-900 mb-1.5">{title}</h3>
      <p className="text-stone-600 text-xs leading-relaxed">{des}</p>
    </div>
  )
}

function StepCard({ step, title, des }) {
  return (
    <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs relative">
      <span className="text-2xl font-extrabold text-stone-300 mb-2 block">{step}</span>
      <h3 className="text-base font-bold text-stone-900 mb-2">{title}</h3>
      <p className="text-stone-600 text-xs leading-relaxed">{des}</p>
    </div>
  )
}

export default Home
