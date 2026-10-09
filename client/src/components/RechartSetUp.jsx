import React from 'react'
import {
  Bar,
  BarChart,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts"

function RechartSetUp({ charts }) {
  if (!charts || charts.length === 0) return null

  // Clean, human-readable chart palette: Emerald, Amber, Dark Slate, Terracotta, Teal
  const COLORS = ["#059669", "#d97706", "#334155", "#ea580c", "#0f766e"]

  return (
    <div className="space-y-6">
      {charts.map((chart, index) => (
        <div key={index} className="border border-stone-200 rounded-xl p-5 bg-white shadow-xs">
          <div className="flex items-center justify-between mb-4 border-b border-stone-100 pb-2">
            <h4 className="font-bold text-stone-900 text-sm flex items-center gap-2">
              <span>📊</span>
              <span>{chart.title}</span>
            </h4>
            <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
              {chart.type} Chart
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              {chart.type === "bar" && (
                <BarChart data={chart.data} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#57534e' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#57534e' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      borderColor: '#e7e5e4',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {chart.data.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              )}

              {chart.type === "line" && (
                <LineChart data={chart.data} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#57534e' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#57534e' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      borderColor: '#e7e5e4',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#059669"
                    strokeWidth={2.5}
                    dot={{ fill: '#059669', strokeWidth: 2 }}
                  />
                </LineChart>
              )}

              {chart.type === "pie" && (
                <PieChart>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      borderColor: '#e7e5e4',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Pie
                    data={chart.data}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={95}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  >
                    {chart.data.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>
      ))}
    </div>
  )
}

export default RechartSetUp
