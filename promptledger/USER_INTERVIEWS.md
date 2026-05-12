# User Interviews

*Three interviews conducted during the build week with potential users.*

---

## Interview 1 — R.K., Co-founder & CTO, Early-stage SaaS (Pre-seed)

**Date:** 2026-05-09 | **Duration:** 12 minutes | **Method:** DM on X

**Background:** 3-person technical team. Uses Cursor, Claude Pro, and 
GitHub Copilot. Monthly AI spend approximately $180.

**Direct quotes:**
- "I just pay whatever the bill is. I've never actually added it all up."
- "We're on GitHub Copilot Business but honestly I don't think we use 
  half the features."
- "I'd use a tool like this if it took under 2 minutes. If it's a form 
  with 20 questions I'm closing it."

**Most surprising thing they said:**
They didn't know GitHub Copilot Business existed — they thought Individual 
was the only option. They had been paying Business pricing ($19/seat) 
because that's what their company card was set up with, without realizing 
Individual ($10/seat) covered everything they needed.

**What it changed about the design:**
Added a plan description tooltip next to each plan dropdown explaining 
in one line what the plan includes. Users shouldn't need to open a new 
tab to know what they're selecting.

---

## Interview 2 — S.M., Engineering Manager, Series A (40 people)

**Date:** 2026-05-10 | **Duration:** 15 minutes | **Method:** LinkedIn message

**Background:** Manages a 12-person engineering team. AI tools budget 
is ~$2,000/mo. Decisions made by him but approved by CFO quarterly.

**Direct quotes:**
- "Our CFO asked me last quarter to justify the AI spend and I couldn't 
  really. I just said 'it makes us faster' which isn't good enough."
- "I'd love something I could screenshot and send to finance. Like a 
  one-pager that says here's what we spend and here's why."
- "The savings number is interesting but the reasoning matters more. 
  If it just says 'switch to X' I'll ignore it. If it tells me why 
  with numbers I'll actually read it."

**Most surprising thing they said:**
He specifically wanted a PDF he could attach to a Slack message to his CFO. 
He didn't care about the web experience — he wanted a document. This 
directly motivated the PDF export bonus feature.

**What it changed about the design:**
Made the reason string in each tool card longer and more specific. 
"Includes actual numbers" became a hard requirement for every recommendation.
Also moved PDF export up the priority list.

---

## Interview 3 — P.T., Indie founder, Bootstrapped

**Date:** 2026-05-10 | **Duration:** 10 minutes | **Method:** Indie Hackers DM

**Background:** Solo founder. Spends ~$85/mo on Claude Pro and Windsurf Pro.
Very cost-conscious.

**Direct quotes:**
- "Honestly $85/mo is already a lot for me. I'd switch tools tomorrow 
  if something was $20 cheaper and did the same thing."
- "I don't trust these comparison tools because they always recommend 
  whatever pays them affiliate fees."
- "What would make me trust it is if it sometimes said 'you're fine, 
  don't change anything.' If it always finds savings it feels fake."

**Most surprising thing they said:**
The trust concern about affiliate bias was completely unprompted and 
something I hadn't considered. It directly explains why the "You're 
spending well" state — shown for already-optimal audits — matters so much. 
An honest negative result is a trust signal.

**What it changed about the design:**
Made the "You're spending well" state more prominent and positive, 
not a consolation prize. Added copy that explicitly says 
"We don't earn commissions on tool recommendations."