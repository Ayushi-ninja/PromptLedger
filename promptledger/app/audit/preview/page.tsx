'use client'

import { useEffect, useState } from 'react'
import { runAudit } from '@/lib/auditEngine'
import { AuditInput, AuditResult } from '@/types/audit'

export default function PreviewPage() {
  const [result, setResult] = useState<AuditResult | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('audit-input')
    if (saved) {
      const input: AuditInput = JSON.parse(saved)
      setResult(runAudit(input))
    }
  }, [])

  if (!result) return <p className="p-8">No audit data found. Go back and fill the form.</p>

  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Your Audit Results</h1>
      <p className="text-2xl text-green-600 font-bold mb-8">
        Save ${result.totalMonthlySavings}/mo · ${result.totalAnnualSavings}/yr
      </p>
      {result.tools.map(tool => (
        <div key={tool.toolId} className="border rounded-lg p-4 mb-4">
          <div className="flex justify-between">
            <span className="font-medium">{tool.toolName}</span>
            <span className="text-green-600">-${tool.monthlySavings}/mo</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">{tool.reason}</p>
        </div>
      ))}
    </main>
  )
}