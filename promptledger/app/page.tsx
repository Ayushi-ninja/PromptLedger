'use client'

import { useState } from 'react'
import { usePersistedForm } from '@/hooks/usePersistedForm'
import { TOOLS } from '@/lib/toolOptions'
import type { AuditInput, ToolEntry, UseCase } from '@/types/audit'
import { useRouter } from 'next/navigation'

const DEFAULT_FORM: AuditInput = {
  tools: [],
  teamSize: 1,
  useCase: 'coding',
}

export default function Home() {
  const [form, setForm, hydrated] = usePersistedForm<AuditInput>('audit-form', DEFAULT_FORM)
  const router = useRouter()

  const addTool = (toolId: string) => {
    if (form.tools.find(t => t.toolId === toolId)) return
    setForm(prev => ({
      ...prev,
      tools: [...prev.tools, { toolId: toolId as any, plan: '', monthlySpend: 0, seats: 1 }]
    }))
  }

  const removeTool = (toolId: string) => {
    setForm(prev => ({
      ...prev,
      tools: prev.tools.filter(t => t.toolId !== toolId)
    }))
  }

  const updateTool = (toolId: string, field: keyof ToolEntry, value: any) => {
    setForm(prev => ({
      ...prev,
      tools: prev.tools.map(t =>
        t.toolId === toolId ? { ...t, [field]: value } : t
      )
    }))
  }

  const handleSubmit = () => {
  if (form.tools.length === 0) {
    alert('Please add at least one AI tool.')
    return
  }

  const incomplete = form.tools.find(t => !t.plan)
  if (incomplete) {
    const name = TOOLS.find(t => t.id === incomplete.toolId)?.name
    alert(`Please select a plan for ${name}`)
    return
  }

  if (form.teamSize < 1) {
    alert('Team size must be at least 1.')
    return
  }

  localStorage.setItem('audit-input', JSON.stringify(form))
  router.push('/audit/preview')
}

  if (!hydrated) return null // prevent localStorage flash

  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">AI Spend Audit</h1>
      <p className="text-gray-500 mb-8">
        Find out if you're overpaying for AI tools. Free, instant, no login required.
      </p>

      {/* Team Info */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Your Team</h2>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm mb-1">Team size</label>
            <input
              type="number"
              min={1}
              value={form.teamSize}
              onChange={e => setForm(prev => ({ ...prev, teamSize: Number(e.target.value) }))}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm mb-1">Primary use case</label>
            <select
              value={form.useCase}
              onChange={e => setForm(prev => ({ ...prev, useCase: e.target.value as UseCase }))}
              className="w-full border rounded px-3 py-2"
            >
              <option value="coding">Coding</option>
              <option value="writing">Writing</option>
              <option value="data">Data</option>
              <option value="research">Research</option>
              <option value="mixed">Mixed</option>
            </select>
          </div>
        </div>
      </section>

      {/* Tool Selector */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Add your AI tools</h2>
        <div className="flex flex-wrap gap-2 mb-6">
          {TOOLS.map(tool => {
            const added = form.tools.find(t => t.toolId === tool.id)
            return (
              <button
                key={tool.id}
                onClick={() => added ? removeTool(tool.id) : addTool(tool.id)}
                className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
                  added
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-black'
                }`}
              >
                {added ? '✓ ' : '+ '}{tool.name}
              </button>
            )
          })}
        </div>

        {/* Per-tool fields */}
        {form.tools.map(toolEntry => {
          const toolDef = TOOLS.find(t => t.id === toolEntry.toolId)!
          return (
            <div key={toolEntry.toolId} className="border rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium">{toolDef.name}</h3>
                <button
                  onClick={() => removeTool(toolEntry.toolId)}
                  className="text-gray-400 hover:text-red-500 text-sm"
                >
                  Remove
                </button>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Plan</label>
                  <select
                    value={toolEntry.plan}
                    onChange={e => updateTool(toolEntry.toolId, 'plan', e.target.value)}
                    className="w-full border rounded px-2 py-1.5 text-sm"
                  >
                    <option value="">Select plan</option>
                    {toolDef.plans.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Monthly spend ($)</label>
                  <input
                    type="number"
                    min={0}
                    value={toolEntry.monthlySpend}
                    onChange={e => updateTool(toolEntry.toolId, 'monthlySpend', Number(e.target.value))}
                    className="w-full border rounded px-2 py-1.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Seats</label>
                  <input
                    type="number"
                    min={1}
                    value={toolEntry.seats}
                    onChange={e => updateTool(toolEntry.toolId, 'seats', Number(e.target.value))}
                    className="w-full border rounded px-2 py-1.5 text-sm"
                  />
                </div>
              </div>
            </div>
          )
        })}
      </section>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={form.tools.length === 0}
        className="w-full bg-black text-white py-3 rounded-lg font-medium 
                   hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition"
      >
        Run My Audit →
      </button>
    </main>
  )
}