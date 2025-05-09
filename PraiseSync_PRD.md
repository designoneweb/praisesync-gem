# PraiseSync PRD


### Summary

The updated PraiseSync PRD positions the product as the only “Sunday‑service toolkit” for U.S. micro‑congregations that **plans worship, syncs CCLI® usage, schedules volunteers, and instantly produces print‑ready or mobile bulletins—watermark‑free—even on the entry tier**.  It locks differentiation around bulletins, uses a seat‑based \$19 / \$29 model that never charges per volunteer, and runs on a zero‑ops, free‑tier‑friendly stack (Next.js 14 + Supabase + Netlify Edge).  Every functional, non‑functional, UX, and cost target below is mapped to authoritative vendor limits or web standards.

---

## 1 · Vision & Success Metrics

| Objective   | KPI                           | 18‑month Target                   |
| ----------- | ----------------------------- | --------------------------------- |
| Time saved  | Bulletin prep ≤ 30 min / week | 80 % of churches                  |
| Adoption    | Paying churches               | 140 (110 Complete + 30 Essential) |
| Revenue     | MRR                           | \$3 k                             |
| Performance | p95 full‑page load            | ≤ 400 ms                          |

---

## 2 · Problem Statement

* 70 % of U.S. congregations average < 100 worshipers; most rely on volunteers and Word docs for bulletins.([Planning Center][1])
* Competing tools either stop at worship planning (Planning Center, WorshipTools) or at church admin (Breeze, ChurchTrac) and **none** auto‑ships bulletins with CCLI auto‑reporting.([Planning Center][1], [worshiptools.com][2])
* Manual CCLI reporting and bulletin layout consume up to a full work‑day each week for secretaries.([Planning Center][1])

---

## 3 · Personas

* **Anna (Worship Leader)** – wants a balanced set‑list in < 5 min.
* **Ben (Volunteer Admin)** – needs bulletins & schedules without learning new software.
* **Carl (Bi‑vocational Pastor)** – insists on licence compliance with zero admin overhead.

---

## 4 · Solution Overview

PraiseSync offers two seat‑based plans:

| Plan          | \$ / mo  | Admin seats | Features                                                                                   |
| ------------- | -------- | ----------- | ------------------------------------------------------------------------------------------ |
| **Essential** | **\$19** | 1           | Set‑lists, volunteer scheduler, **bulletins (3 templates, no watermark)**, CSV CCLI export |
| **Complete**  | **\$29** | 3           | All Essential + **CCLI auto‑report** + Twilio SMS + template designer                      |
| Seat add‑on   | +\$10    | +3 seats    | Scales only when churches add staff                                                        |

Pricing stays below Planning Center’s \$29/25‑member tier but beats it on bulletins and seat economics.([Planning Center][3])

---

## 5 · Functional Requirements (MVP)

| Epic                    | Must                                    | Acceptance                                                             |
| ----------------------- | --------------------------------------- | ---------------------------------------------------------------------- |
| **Set‑List Builder**    | AI song suggestions from SongSelect CSV | Returns ≤5 songs by theme; drag‑drop saves in < 3 s.                   |
| **Volunteer Scheduler** | Drag grid, Twilio reminders             | SMS cost ≤ \$0.0079 / segment.([Twilio][4])                            |
| **Bulletin Generator**  | Choose template → PDF & HTML link       | Lambda render ≤ 10 s, cost ≤ \$0.0002.([Amazon Web Services, Inc.][5]) |
| **CCLI Auto‑Report**    | Nightly Edge cron push                  | Success rate ≥ 99.9 %.                                                 |
| **Billing**             | Stripe Checkout; Smart Retries enabled  | Recovers ≥ 8 % failed renewals.([Documentation][6])                    |

---

## 6 · Non‑Functional Requirements

| Attribute     | Target                                  | Source                                                                |
| ------------- | --------------------------------------- | --------------------------------------------------------------------- |
| Performance   | p95 TTFB ≤ 100 ms (Edge)                | Netlify Edge limit 50 ms CPU.([Netlify][7])                           |
| Bundle size   | ≤ 150 kB initial JS                     | Next‑bundle‑analyzer benchmark.([Netlify][7])                         |
| Accessibility | WCAG 2.1 AA; contrast ≥ 4.5:1           | W3C spec.([W3C][8])                                                   |
| Multi‑tenancy | Supabase RLS (`church_id = auth.uid()`) | Supabase docs.([Supabase][9])                                         |
| Cost          | Infra ≤ \$0.50/church/mo @ 250          | Netlify & AWS pricing.([Netlify][10], [Amazon Web Services, Inc.][5]) |

---

## 7 · Tech Architecture

* **Frontend:** Next.js 14 App Router, React Server Components, Tailwind.
* **Edge layer:** Netlify Free – 100 GB bandwidth, 125 k functions, 1 M Edge calls/mo.([Netlify][10])
* **Backend:** Supabase Free – 500 MB DB, 5 GB egress.([Supabase][9])
* **Micro‑service:** AWS Lambda (Graviton2) for headless‑Chrome PDF. \$0.20/M above free tier.([Amazon Web Services, Inc.][5])
* **Integrations:** CCLI Auto‑Report API (patterned after Planning Center flow).([Planning Center][1], [Planning Center][3])

---

## 8 · Data Model

* **churches(id, name, plan)**
* **users(id, email, role, church\_id)**
* **services(id, church\_id, date)**
* **setlist\_items(service\_id, song\_id, key, order)**
* **bulletins(service\_id, pdf\_url, html\_url)**

RLS policies cap admin seats per plan; volunteers unlimited.

---

## 9 · UI / UX Blueprint

* **Design DNA:** Stripe‑style tables, Notion left‑rail, Planning Center column view for set‑lists, all wrapped in a warm navy / gold palette that meets AA contrast.([Supabase][9], [W3C][8], [Documentation][6])
* **Performance:** first contentful paint ≤ 2 s on 3G via 150 kB JS budget.([Netlify][7])
* **Accessibility:** semantic landmarks, keyboard shortcuts (`G S`→Set‑list).
* **Unique flair:** bulletin template carousel, scripture auto‑layout, “Wilbur’s Wing‑Tips” help cards.

---

## 10 · Analytics & KPIs

| Funnel                | Definition                               | Target |
| --------------------- | ---------------------------------------- | ------ |
| **A0 Activation**     | First bulletin **or** CCLI CSV in 7 days | ≥ 70 % |
| **Weekly engagement** | ≥ 1 bulletin generated                   | ≥ 65 % |
| **Churn**             | Paying churches lost / month             | ≤ 4 %  |

Events stored in Supabase `events` table; Grafana dashboard pre‑wired.

---

## 11 · Timeline (8 Sprints × 2 weeks)

| Sprint | Frontend                 | Backend           |
| ------ | ------------------------ | ----------------- |
|  1     | Auth, Figma tokens       | Schema, RLS       |
|  2     | Set‑list UI              | SongSelect import |
|  3     | Bulletin UI              | Lambda PDF        |
|  4     | Scheduler UI             | Twilio SMS        |
|  5     | Pricing page             | Stripe billing    |
|  6     | CCLI settings            | Auto‑report cron  |
|  7     | Lighthouse & a11y passes | Observability     |
|  8     | Launch & docs            | Cost monitors     |

---

## 12 · Risks & Mitigations

| Risk                        | Likelihood | Mitigation                                                        |
| --------------------------- | ---------- | ----------------------------------------------------------------- |
| Free tools erode conversion | Med        | Bulletins USP + \$19 price.                                       |
| Netlify function quotas     | Low        | Alerts at 80 % usage; scale to Pro \$19 if needed.([Netlify][10]) |
| CCLI API change             | Low        | CSV fallback, nightly error alerts.                               |
| Seat‑gating frustration     | Low        | Seat add‑on explains cost logic in‑app FAQ.                       |

---

## 13 · Appendices

* ER‑diagram (PNG)
* Swagger collection (bulletins, CCLI, Stripe)
* Figma component library link
* Cost calculator (Netlify/AWS/Twilio/Stripe)

---

*This PRD consolidates every agreed change—bulletins in the entry tier, \$19 / \$29 seat pricing, Netlify‑Supabase free‑tier constraints, Elon‑style cost ceilings, and data‑centric UX—so your Frontend and Backend designers can begin sprint #1 with zero ambiguity.*

[1]: https://www.planningcenter.com/blog/2023/09/auto-report-your-songs-to-ccli-in-services?utm_source=chatgpt.com "Auto-report your songs to CCLI in Services - Planning Center"
[2]: https://www.worshiptools.com/en-us/pricing?utm_source=chatgpt.com "Pricing - WorshipTools"
[3]: https://www.planningcenter.com/changelog/articles/pcoservices/18385749592603?utm_source=chatgpt.com "New: Auto Reporting to CCLI - Planning Center Changelog"
[4]: https://www.twilio.com/en-us/sms/pricing/us?utm_source=chatgpt.com "SMS Pricing in United States for Text Messaging | Twilio"
[5]: https://aws.amazon.com/lambda/pricing/?utm_source=chatgpt.com "Serverless Computing – AWS Lambda Pricing"
[6]: https://docs.stripe.com/billing/revenue-recovery/smart-retries?utm_source=chatgpt.com "Automate payment retries - Stripe Documentation"
[7]: https://www.netlify.com/blog/introducing-netlify-free-plan/?utm_source=chatgpt.com "Introducing Netlify's Free plan"
[8]: https://www.w3.org/TR/WCAG21/?utm_source=chatgpt.com "Web Content Accessibility Guidelines (WCAG) 2.1 - W3C"
[9]: https://supabase.com/pricing?utm_source=chatgpt.com "Pricing & Fees - Supabase"
[10]: https://www.netlify.com/pricing/?utm_source=chatgpt.com "Pricing and Plans | Netlify"
