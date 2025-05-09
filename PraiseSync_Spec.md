# PraiseSync Spec

**PraiseSync will launch as the first “Sunday-service toolkit” that lets a volunteer plan a set-list, file CCLI® usage, schedule the team, and push a print-ready (or mobile) bulletin in < 5 minutes.**
The spec below translates that vision into a build-ready blueprint for your two-person engineering crew, honoring Netlify/Supabase free-tier ceilings, bullet-proof security, and the \$19 / \$29 seat-based pricing you approved.

---

## 1 · Product scope & success targets

| Goal       | Metric                    | 18-mo target                      |
| ---------- | ------------------------- | --------------------------------- |
| Time saved | Bulletin prep < 30 min/wk | 80 % of churches                  |
| Adoption   | Paying churches           | 140 (110 Complete + 30 Essential) |
| Revenue    | MRR                       | \$3 k                             |
| Perf       | p95 full-page load        | ≤ 400 ms                          |

*Bulletin generation and CCLI auto-reporting are MVP features; analytics and bilingual bulletins defer to v2.*

---

## 2 · System architecture

```
         ┌──────────────┐   Edge (≤50 ms CPU)   ┌───────────────┐
 React → │ Next.js 14   │ ────────────────────→ │  Supabase REST│
 Client   │  App Router │ ←─ RSC / ISR cache ── │  & Realtime   │
         └──────────────┘                      └───────────────┘
               │  Lambda (PDF)   POST /cron      │ Edge Fn (CCLI)
               ▼                                 ▼
         ┌────────────────┐                ┌────────────┐
         │AWS Lambda ARM  │   presigned →  │  CCLI API  │
         │Bulletin render │ ←──────────────│ Auto-Report│
         └────────────────┘                └────────────┘
```

* **Netlify Free** → 100 GB bandwidth, 300 build-min, 125 k Lambda, 1 M Edge invocations. ([Netlify][1], [Netlify][2])
* **Supabase Free** → 500 MB Postgres, 5 GB egress, 50 k MAU. ([Supabase][3])
* **AWS Lambda** → 1 M free req/mo then \$0.20/M, Graviton2 instances give 20–34 % price/perf gain. ([Amazon Web Services, Inc.][4], [Amazon Web Services, Inc.][5])

Scaling triggers and cost escalators are pre-configured in the budget sheet (see §9).

---

## 3 · Data model (Supabase)

| Table              | Key columns                                   | Notes                           |
| ------------------ | --------------------------------------------- | ------------------------------- |
| **churches**       | id, name, plan\_tier                          | RLS: user.uid() ∈ admins        |
| **users**          | id, church\_id, role                          | roles: admin, volunteer, viewer |
| **services**       | id, church\_id, date, sermon\_title           |                                 |
| **setlist\_items** | service\_id, song\_id, key, order             |                                 |
| **bulletins**      | service\_id, pdf\_url, html\_url, updated\_at |                                 |

Row-Level-Security enforces tenant isolation (`church_id = auth.uid()`) and limits admin seats per plan. ([Supabase][6])

---

## 4 · API contracts (Swagger snippets)

* **POST /api/setlist** → body: `{service_id, theme}` → returns GPT-suggested songs list.
* **POST /api/bulletin** → `{service_id, template_id}` → returns `{pdf_url, html_url}` (presigned).
* **POST /cron/ccli-report** (Supabase Edge, nightly) → pushes JSON to CCLI; logs success.
* **POST /webhooks/stripe** → verifies signature, updates `plan_tier`.
* **POST /webhooks/twilio-status** → stores SMS delivery receipts.

CCLI auto-report cadence mirrors Planning Center’s weekly push. ([Planning Center][7])

---

## 5 · Frontend specification

### Tech & tooling

* **Next.js 14** App Router, React Server Components, Tailwind.
* Bundle budget: **≤ 150 kB** initial JS; track with **@next/bundle-analyzer**. ([Next.js by Vercel - The React Framework][8])
* Accessibility: achieve WCAG 2.1-AA contrast ratios (≥ 4.5:1 for text). ([W3C][9])

### Core flows

1. **Onboarding wizard** → church, licence#, choose plan, import first service.
2. **Dashboard** tabs: *Schedule*, *Set-List*, *Bulletins*, *Reports*.
3. **Generate bulletin** button → optimistic UI → polls `/api/bulletin`.
4. **Performance targets:** p95 TTFB ≤ 100 ms Edge; Largest Contentful Paint ≤ 2 s 3G.

### Instrumentation

All CTA clicks emit `{event, church_id, ts}` to Supabase `events` for funnel analysis.

---

## 6 · Backend specification

* **Supabase Edge Functions**

  * `ccli-report.ts`: cron at 02:00 ET; retry with expo back-off; error alert via PagerDuty.
  * `song-import.ts`: nightly pull from SongSelect CSV (requires partner key).
* **Bulletin render**

  * AWS Lambda ARM, Node 18, Puppeteer-core; 256 MB / 30 sec timeout.
  * Cost at 4 PDFs/week/church ≈ \$0.0002 each. ([Amazon Web Services, Inc.][4])
* **Stripe Billing**

  * Price objects: `essential_19`, `complete_29`, `seat_pack_10`.
  * Enable **Smart Retries** to cut involuntary churn \~8 %. ([Documentation][10])
* **Twilio**

  * A2P 10DLC SMS segment cost \$0.0079 outbound. ([Twilio Help Center][11], [Twilio][12])
  * Daily spend cap \$5.

---

## 7 · Security & compliance

* JWT validation via Supabase; all functions re-check `church_id`.
* No card data stored—Stripe handles PCI.
* Access logs retained 30 days; GDPR delete route `/api/self-delete`.
* Contrast & focus indicators meet WCAG 2.1 AA. ([W3C][9])

---

## 8 · Pricing & plan logic

| Plan            | \$/mo | Admin seats | Features                                                                          |
| --------------- | ----- | ----------- | --------------------------------------------------------------------------------- |
| **Essential**   | \$19  | 1           | Set-lists, scheduler, **watermark-free bulletins (3 templates)**, CSV CCLI export |
| **Complete**    | \$29  | 3           | All Essential + **CCLI auto-report**, Twilio SMS, template designer               |
| **Seat add-on** | +\$10 | +3 seats    |                                                                                   |

Bulletins stay watermark-free even at \$19 to neutralize WorshipTools’ \$0 anchor and underscore the USP. ([WorshipTools][13])

---

## 9 · Performance & cost budgets

| Resource          | Free tier                                 | 140-church usage | Head-room |
| ----------------- | ----------------------------------------- | ---------------- | --------- |
| Netlify bandwidth | 100 GB/mo ([Netlify][1])                  | \~40 GB          | 60 %      |
| Netlify functions | 125 k/mo ([Netlify][2])                   | \~30 k           | 76 %      |
| Supabase DB       | 500 MB ([Supabase][3])                    | \~150 MB         | 70 %      |
| Lambda reqs       | 1 M free ([Amazon Web Services, Inc.][4]) | \~24 k           | 97 %      |

Alerts fire at 80 % threshold.

---

## 10 · KPIs & analytics

* **Activation A0:** first bulletin **or** first CCLI CSV within 7 days (target ≥ 70 %).
* **Weekly engagement:** ≥ 1 bulletin generated.
* **Infra cost/church:** ≤ \$0.50.
* **Churn:** ≤ 4 %/mo.

Supabase SQL dashboard with Grafana panels pre-created.

---

## 11 · Development timeline (solo founder + 2 contractors)

| Sprint (2 wk) | Frontend tasks                | Backend tasks                  |
| ------------- | ----------------------------- | ------------------------------ |
| 1             | Repo, auth, Figma tokens      | Schema, RLS                    |
| 2             | Set-List UI, theme GPT call   | SongSelect import fn           |
| 3             | Bulletin UI, PDF poll         | Lambda render, S3 storage      |
| 4             | Scheduler drag-drop           | Twilio SMS, seat enforcement   |
| 5             | Pricing screen, Stripe portal | Stripe webhooks, Smart Retries |
| 6             | CCLI settings UI              | Edge cron auto-report          |
| 7             | QA, Lighthouse, a11y          | Observability, alerts          |
| 8             | Public launch + docs          |                                |

---

## 12 · Acceptance criteria (DoD snippet)

* Any route lacking Lighthouse perf ≥ 90, a11y ≥ 90 fails CI.
* Bundle-analyzer JSON ≤ 150 kB initial; else PR blocked.
* Cron job error rate > 0.1 % aborts deploy.

---

## 13 · Appendices

* ER-diagram PNG
* Swagger YAML
* Figma component library link
* Cost calculator sheet

---

With this spec, your **Next-JS Frontend Designer** and **Serverless Backend Designer** can clone the repo and begin Sprint 1, confident that every dependency, limit, and KPI is nailed down to Elon-style engineering minimalism and Zuckerberg-level metric rigor.

[1]: https://www.netlify.com/pricing/?utm_source=chatgpt.com "Pricing and Plans | Netlify"
[2]: https://www.netlify.com/blog/introducing-netlify-free-plan/?utm_source=chatgpt.com "Introducing Netlify's Free plan"
[3]: https://supabase.com/pricing?utm_source=chatgpt.com "Pricing & Fees - Supabase"
[4]: https://aws.amazon.com/lambda/pricing/?utm_source=chatgpt.com "Serverless Computing – AWS Lambda Pricing"
[5]: https://aws.amazon.com/blogs/aws/aws-lambda-functions-powered-by-aws-graviton2-processor-run-your-functions-on-arm-and-get-up-to-34-better-price-performance/?utm_source=chatgpt.com "AWS Lambda Functions Powered by AWS Graviton2 Processor"
[6]: https://supabase.com/docs/guides/platform/billing-on-supabase?utm_source=chatgpt.com "About billing on Supabase"
[7]: https://www.planningcenter.com/blog/2023/09/auto-report-your-songs-to-ccli-in-services?utm_source=chatgpt.com "Auto-report your songs to CCLI in Services - Planning Center"
[8]: https://nextjs.org/docs/app/building-your-application/optimizing/package-bundling?utm_source=chatgpt.com "Optimizing: Package Bundling - Next.js"
[9]: https://www.w3.org/TR/WCAG21/?utm_source=chatgpt.com "Web Content Accessibility Guidelines (WCAG) 2.1 - W3C"
[10]: https://docs.stripe.com/billing/revenue-recovery/smart-retries?utm_source=chatgpt.com "Automate payment retries - Stripe Documentation"
[11]: https://help.twilio.com/articles/1260803965530-What-pricing-and-fees-are-associated-with-the-A2P-10DLC-service-?utm_source=chatgpt.com "What pricing and fees are associated with the A2P 10DLC service?"
[12]: https://www.twilio.com/en-us/sms/pricing/us?utm_source=chatgpt.com "SMS Pricing in United States for Text Messaging | Twilio"
[13]: https://www.worshiptools.com/en-us/planning?utm_source=chatgpt.com "Planning by WorshipTools"
