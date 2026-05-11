# Metrics

## North Star Metric

**Audits completed per week**

Why: An audit completed means a user got value from the tool. It's the moment 
the product works. Everything else — emails captured, consultations booked, 
deals closed — flows downstream from this number. If audits completed grows, 
revenue follows. If it stalls, nothing else matters.

Not "visits" (too shallow — doesn't mean the tool worked).
Not "emails captured" (too narrow — misses users who got value but didn't convert).
Not "DAU" (wrong for a tool people use once a quarter).

## 3 Input Metrics That Drive the North Star

**1. Landing page → audit start rate**
What percentage of visitors click "Run My Audit" and fill in at least one tool.
Target: >40%. If below 30%, the landing page copy or form friction is the problem.

**2. Audit start → audit completion rate**
What percentage of users who start the form actually submit it.
Target: >65%. Drop-off here means the form is too long or confusing.

**3. Share URL clicks per audit**
How many people click the shared result link per audit generated.
Target: >0.3 (i.e. 1 in 3 audits gets shared). This is the viral coefficient.

## What to Instrument First

1. Page view on `/` (landing)
2. Click on "Run My Audit" button
3. Form submission (audit start)
4. Results page load (audit complete)
5. Email capture form submission
6. Share URL copy button click
7. `/audit/[id]` page view (viral loop working)

Use Posthog or Plausible — both have generous free tiers and work with Next.js.

## Pivot Trigger

If after 500 audits the consultation booking rate is below 1% 
(i.e. fewer than 5 consultations booked), the audit logic is not surfacing 
compelling enough savings to motivate action. At that point, 
reconsider either the audit engine thresholds or the Credex CTA copy.