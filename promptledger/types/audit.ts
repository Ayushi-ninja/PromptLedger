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