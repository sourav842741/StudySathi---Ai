import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from "motion/react"
import axios from 'axios'
import { serverUrl } from '../App'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { FiCheck, FiArrowLeft, FiShield, FiZap, FiRefreshCw } from "react-icons/fi"

function Pricing() {
  const navigate = useNavigate()
  const [selectedPrice, setSelectedPrice] = useState(200)
  const [paying, setPaying] = useState(false)
  const [payingAmount, setPayingAmount] = useState(null)

  const handlePaying = async (amount) => {
    try {
      setPayingAmount(amount)
      setPaying(true)
      const result = await axios.post(
        serverUrl + "/api/credit/order",
        { amount },
        { withCredentials: true }
      )

      if (result.data?.url) {
        window.location.href = result.data.url
      }
      setPaying(false)
    } catch (error) {
      setPaying(false)
      console.error(error)
    }
  }

  return (
    <div className="min-h-screen bg-[#fbfbf9] text-stone-900 flex flex-col justify-between">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-12">
        
        {/* Navigation & Header */}
        <div>
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 mb-6 cursor-pointer transition-colors"
          >
            <FiArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>

          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-700">
              Pay As You Go • No Recurring Subscription
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Recharge Your Study Credits
            </h1>
            <p className="text-sm text-stone-600 leading-relaxed">
              Use credits to generate comprehensive exam guides, flow diagrams, and download high-resolution revision PDFs.
            </p>
          </div>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          
          {/* Plan 1: Starter */}
          <PricingCard
            title="Starter"
            price="₹100"
            amount={100}
            credits="50 Credits"
            description="Perfect for a single unit or quick exam cram."
            features={[
              "50 AI study generation credits",
              "Exam-focused point breakdown",
              "Flow diagram & chart synthesis",
              "Printable PDF downloads"
            ]}
            selectedPrice={selectedPrice}
            setSelectedPrice={setSelectedPrice}
            onBuy={handlePaying}
            paying={paying}
            payingAmount={payingAmount}
          />

          {/* Plan 2: Popular (Recommended) */}
          <PricingCard
            popular
            title="Standard"
            price="₹200"
            amount={200}
            credits="120 Credits"
            badge="Most Popular"
            description="Best value for multi-subject semester revision."
            features={[
              "120 AI study generation credits",
              "20 bonus credits included",
              "5-Minute Exam Revision mode",
              "Priority note generation speed",
              "Unlimited PDF downloads"
            ]}
            selectedPrice={selectedPrice}
            setSelectedPrice={setSelectedPrice}
            onBuy={handlePaying}
            paying={paying}
            payingAmount={payingAmount}
          />

          {/* Plan 3: Pro */}
          <PricingCard
            title="Pro Learner"
            price="₹500"
            amount={500}
            credits="300 Credits"
            description="For comprehensive syllabus & competitive exam prep."
            features={[
              "300 AI study generation credits",
              "50 bonus credits included",
              "Comprehensive diagram rendering",
              "Deep question bank generation",
              "Highest generation priority"
            ]}
            selectedPrice={selectedPrice}
            setSelectedPrice={setSelectedPrice}
            onBuy={handlePaying}
            paying={paying}
            payingAmount={payingAmount}
          />

        </div>

        {/* Trust & Guarantee Banner */}
        <div className="rounded-2xl bg-white border border-stone-200 p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center shrink-0">
              <FiShield className="w-5 h-5 text-stone-700" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-stone-900">Secure Stripe Checkout</h4>
              <p className="text-[11px] text-stone-500 mt-0.5">256-bit encrypted card payments directly via Stripe.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
              <FiZap className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-stone-900">Instant Credit Top-Up</h4>
              <p className="text-[11px] text-stone-500 mt-0.5">Credits reflect on your account immediately upon completion.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
              <FiRefreshCw className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-stone-900">Credits Never Expire</h4>
              <p className="text-[11px] text-stone-500 mt-0.5">Use your balance anytime across terms without expiry dates.</p>
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  )
}

function PricingCard({
  title,
  price,
  amount,
  credits,
  description,
  features,
  popular,
  badge,
  selectedPrice,
  setSelectedPrice,
  onBuy,
  paying,
  payingAmount
}) {
  const isSelected = selectedPrice === amount
  const isPayingThisCard = paying && payingAmount === amount

  return (
    <div
      onClick={() => setSelectedPrice(amount)}
      className={`
        relative rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all cursor-pointer
        ${popular
          ? "bg-white border-2 border-emerald-600 shadow-md"
          : isSelected
          ? "bg-white border-2 border-stone-900 shadow-xs"
          : "bg-white border border-stone-200 hover:border-stone-300 shadow-xs"
        }
      `}
    >
      {badge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-emerald-700 text-white font-bold text-[10px] uppercase tracking-wider shadow-xs">
          {badge}
        </span>
      )}

      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold text-stone-900">{title}</h3>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700">
            {credits}
          </span>
        </div>

        <p className="text-xs text-stone-500 mb-6 leading-relaxed">{description}</p>

        <div className="mb-6 pb-6 border-b border-stone-100">
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-extrabold text-stone-900 tracking-tight">{price}</span>
            <span className="text-xs text-stone-500 font-medium">one-time</span>
          </div>
        </div>

        <ul className="space-y-3 mb-8">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2.5 text-xs text-stone-700">
              <span className="mt-0.5 w-4 h-4 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <FiCheck className="w-3 h-3" />
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        disabled={isPayingThisCard}
        onClick={(e) => {
          e.stopPropagation()
          onBuy(amount)
        }}
        className={`
          w-full py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer
          ${isPayingThisCard
            ? "bg-stone-200 text-stone-500 cursor-not-allowed"
            : popular
            ? "bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs"
            : "bg-stone-900 hover:bg-stone-800 text-white shadow-xs"
          }
        `}
      >
        {isPayingThisCard ? (
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 border-2 border-stone-400 border-t-stone-800 rounded-full animate-spin"></span>
            Redirecting to Stripe...
          </span>
        ) : (
          `Get ${credits}`
        )}
      </button>
    </div>
  )
}

export default Pricing
