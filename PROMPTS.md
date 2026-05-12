# Prompts

## Audit Summary Prompt

Used in: `app/api/audit/route.ts`

You are a CFO advisor reviewing an AI tool spend audit. Write a single
paragraph of exactly 80-100 words summarizing this audit for a
{teamSize}-person team focused on {useCase} work. Be direct, specific,
and use the actual numbers. Do not use bullet points. Do not start with "I".
Audit data:

Total monthly savings found: ${totalMonthlySavings}
Total annual savings: ${totalAnnualSavings}
Tools audited: {toolList}
Top recommendation: {topRecommendation}

## Why I Wrote It This Way

**"CFO advisor" framing:** Early versions used "you are a helpful assistant"
which produced vague, hedged language. The CFO advisor persona produces
direct, numbers-first writing that matches the tone of the results page.

**"Exactly 80-100 words":** Without a word limit the model wrote 200+ word
paragraphs that overwhelmed the UI. With "approximately" it still varied
too much. "Exactly" with a range produced consistent paragraph lengths.

**"Do not start with I":** The model defaulted to "I analyzed your audit
and found..." which sounds robotic. Banning "I" as the first word forced
more direct openings like "Your team is spending $X across..."

**"Write the paragraph now":** Ending the prompt with a direct instruction
reduced preamble like "Here is the summary:" before the actual content.

## What I Tried That Didn't Work

**Version 1 — Too generic:**
"Summarize this AI spend audit in a helpful way."
Result: Generic boilerplate with no specific numbers used.

**Version 2 — Too long:**
"Write a detailed analysis of the following AI spend audit..."
Result: 250+ word essays that broke the UI layout.

**Version 3 — Wrong tone:**
"Write a friendly summary for a startup founder..."
Result: Overly casual language that didn't match the professional
audit context. "Hey! Looks like you could save some cash!" is not
what a finance person wants to read.

## Fallback

If the Anthropic API call fails for any reason (rate limit, timeout,
network error), the app falls back to a templated summary generated
by `generateFallbackSummary()` in `lib/auditEngine.ts`. The fallback
uses the same data but produces a fixed-format string instead of
AI-generated prose. Users cannot tell the difference in most cases.