import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { runAudit } from '@/lib/auditEngine'
import { AuditInput } from '@/types/audit'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

function generateId(): string {
  return Math.random().toString(36).substring(2, 9) + Date.now().toString(36)
}

function generateFallbackSummary(result: ReturnType<typeof runAudit>): string {
  const topTool = result.tools
    .filter(t => t.monthlySavings > 0)
    .sort((a, b) => b.monthlySavings - a.monthlySavings)[0]

  if (result.alreadyOptimal) {
    return `Your AI stack is well-optimized. You're spending $${result.tools.reduce((s, t) => s + t.currentSpend, 0)}/mo across ${result.tools.length} tools with no major inefficiencies detected. Keep an eye on seat counts as your team grows.`
  }

  return `This audit found $${result.totalMonthlySavings}/mo in potential savings across your AI stack — $${result.totalAnnualSavings} annually. Your biggest opportunity is ${topTool?.toolName}: ${topTool?.reason} Acting on these recommendations could meaningfully reduce your AI overhead without sacrificing capability.`
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const input: AuditInput = body.input

    // Run audit engine
    const auditResult = runAudit(input)
    const publicUrlId = generateId()

    // Generate AI summary
    let summary = ''
    try {
      const message = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 200,
        messages: [
          {
            role: 'user',
            content: `You are a CFO advisor reviewing an AI tool spend audit. Write a single paragraph of exactly 80-100 words summarizing this audit for a ${input.teamSize}-person team focused on ${input.useCase} work. Be direct, specific, and use the actual numbers. Do not use bullet points. Do not start with "I".

Audit data:
- Total monthly savings found: $${auditResult.totalMonthlySavings}
- Total annual savings: $${auditResult.totalAnnualSavings}
- Tools audited: ${auditResult.tools.map(t => `${t.toolName} (${t.currentPlan}, $${t.currentSpend}/mo)`).join(', ')}
- Top recommendation: ${auditResult.tools.sort((a, b) => b.monthlySavings - a.monthlySavings)[0]?.reason}

Write the paragraph now:`
          }
        ]
      })
      summary = message.content[0].type === 'text' ? message.content[0].text : generateFallbackSummary(auditResult)
    } catch {
      summary = generateFallbackSummary(auditResult)
    }

    // Save to Supabase
    const { error } = await supabase.from('audits').insert({
      public_url_id: publicUrlId,
      audit_input: input,
      audit_result: { ...auditResult, summary },
    })

    if (error) throw error

    return NextResponse.json({
      auditResult: { ...auditResult, summary },
      publicUrlId,
    })
  } catch (err) {
    console.error('Audit API error:', err)
    return NextResponse.json({ error: 'Failed to process audit' }, { status: 500 })
  }
}