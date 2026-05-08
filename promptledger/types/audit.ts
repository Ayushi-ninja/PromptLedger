export type ToolId =
  | 'cursor'
  | 'github_copilot'
  | 'claude'
  | 'anthropic_api'
  | 'chatgpt'
  | 'openai_api'
  | 'gemini'
  | 'windsurf'

export type UseCase = 'coding' | 'writing' | 'data' | 'research' | 'mixed'

export type ToolEntry = {
  toolId: ToolId
  plan: string
  monthlySpend: number
  seats: number
}

export type AuditInput = {
  tools: ToolEntry[]
  teamSize: number
  useCase: UseCase
}


export type RecommendationType = 
  | 'downgrade'      // cheaper plan, same vendor
  | 'switch'         // different tool entirely
  | 'keep'           // already optimal
  | 'credits'        // buy through Credex instead

export type ToolAuditResult = {
  toolId: string
  toolName: string
  currentPlan: string
  currentSpend: number
  seats: number
  recommendation: RecommendationType
  recommendedPlan?: string
  recommendedTool?: string
  projectedSpend: number
  monthlySavings: number
  reason: string
}

export type AuditResult = {
  auditId: string
  createdAt: string
  input: AuditInput
  tools: ToolAuditResult[]
  totalMonthlySavings: number
  totalAnnualSavings: number
  highSavings: boolean        // true if >$500/mo savings
  alreadyOptimal: boolean     // true if <$100/mo savings
}