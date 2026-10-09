import React, { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

mermaid.initialize({
  startOnLoad: false,
  theme: "neutral",
  themeVariables: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "13px",
    primaryColor: "#f5f5f4",
    primaryBorderColor: "#78716c",
    primaryTextColor: "#1c1917",
    lineColor: "#57534e"
  }
})

const cleanMermaidChart = (diagram) => {
  if (!diagram) return ""

  let clean = diagram
    .replace(/\r\n/g, "\n")
    .trim()

  if (!clean.startsWith("graph")) {
    clean = `graph TD\n${clean}`
  }

  return clean
}

const autoFixNodes = (diagram) => {
  let index = 0
  const used = new Map()

  return diagram.replace(/\[(.*?)\]/g, (match, label) => {
    const key = label.trim()

    if (used.has(key)) {
      return used.get(key)
    }

    index++
    const id = `N${index}`
    const node = `${id}["${key}"]`

    used.set(key, node)
    return node
  })
}

function MermaidSetup({ diagram }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!diagram || !containerRef.current) return

    const renderDiagram = async () => {
      try {
        containerRef.current.innerHTML = ""

        const uniqueId = `mermaid-${Math.random()
          .toString(36)
          .substring(2, 9)}`

        const safeChart = autoFixNodes(cleanMermaidChart(diagram))
        const { svg } = await mermaid.render(uniqueId, safeChart)

        containerRef.current.innerHTML = svg
      } catch (error) {
        console.error("Mermaid render failed:", error)
      }
    }

    renderDiagram()
  }, [diagram])

  return (
    <div className="bg-white border border-stone-200 rounded-xl p-5 overflow-x-auto shadow-xs">
      <div ref={containerRef} className="flex justify-center" />
    </div>
  )
}

export default MermaidSetup
