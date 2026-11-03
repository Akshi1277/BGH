# BRAHM Global Holdings — SEO Plan (non-brand growth)

Prepared 3 Nov 2026. Scope: brahmglobalholdings.com (main site). ENIF and 7AURIGA
are covered only where they link to / from the main site.

Keyword volumes below are **not measured** (no keyword tool connected). Validate each
target in Google Keyword Planner or Search Console before writing; treat the lists as
hypotheses ordered by fit, not by traffic.

---

## 1. Where we are (baseline, GSC, Aug–Oct 2026)

| Metric | Baseline |
|---|---|
| Clicks (3 months) | 81 |
| Impressions (3 months) | 1.56k |
| Avg. position | 8.7 |
| Indexed pages (main domain) | 5 real pages (+ ENIF subdomain pending) |
| Non-brand clicks | ~0 — "holding company" 139 impressions, 0 clicks |
| Click geography | India 90%, UK not in top 5 |
| Brand CTR ("brahm global holdings") | ~21% (28/134) — low for an exact brand query |

**Diagnosis**
1. The site has 5 indexable pages. There is nothing for Google to rank for any search
   other than the company's name. This is the main constraint — not technical SEO.
2. Brand confusion: impressions for "brahm group", "brahm property group",
   "brahm company" show Google is unsure which Brahm you are.
3. Trust signals are thin for a holding company: Gmail contact address, only LinkedIn
   in `sameAs`, no Companies House link, no named leadership on-page (to confirm).
4. Market signal mismatch: schema says London/GB only; traffic is Indian. Targeting
   both markets needs explicit signals for each.

## 2. Who the main site is for

| Audience | What they search | Owned by |
|---|---|---|
| Founders/owners open to selling or partnering | "sell my business to a holding company", "permanent capital", "alternative to private equity" | Main site |
| Investors / strategic partners | "UK venture builder", "venture studio London", "holding company India UK" | Main site |
| Clients for services | "AI software development company", "brand strategy agency" | ENIF / 7AURIGA sites, not main |
| Talent | "careers venture builder London" | Main site (low priority) |

Rule: the main site targets **ownership/partnership** intent. Service-buyer keywords
belong to the operating companies' sites so they don't compete with each other.

## 3. Keyword themes (to validate)

**A. Model / category (UK + India)**
- venture builder UK · venture studio London · company builder
- holding company UK · private holding company · diversified holding company
- holding company India UK / Indo-British holding company
- permanent capital vs private equity · long-term ownership

**B. Founder intent (highest commercial value, low volume)**
- sell my business to a holding company (UK / India)
- business acquisition criteria · we acquire businesses in {sector}
- alternative to private equity for founders

**C. Sector pages (one per sector the group actually operates in)**
- {sector} holding company / {sector} venture builder — technology, education,
  sport, hospitality, luxury consumer (from the site's own sector list)

**D. Brand disambiguation (fixes the 21% CTR)**
- BRAHM Global Holdings Ltd · BRAHM Global Holdings London · BRAHM Global Holdings India
- "brahm group" — do not try to rank; just make the snippet unmistakable.

## 4. Site structure

```
/                         Home (brand)
/about                    Mandate, leadership, governance, company number
/approach                 How we build / acquire — permanent capital, no 3–5yr exit   [new]
/acquisitions             What we buy/invest in, criteria, process, founder contact    [new]
/sectors                  Hub (dir already exists in src/app, empty)                    [new]
/sectors/{sector}         technology, sport, education, hospitality, communications, luxury [new]
/portfolio                All companies: TPL, LSAA, Alayn, ENIF, 7AURIGA, Hannah Pixels                [new — dir exists, empty]
/insights                 Articles (Phase 2)                                            [new]
/insights/{slug}
/contact
/7auriga
/privacy
```
`/enif` stays a redirect to the subdomain. Empty route folders `invest`, `portfolio`,
`sectors`, `services` already exist in `src/app` — reuse `portfolio` and `sectors`;
`invest` can host /acquisitions content (or redirect to it).

**Internal linking**: every sector page → its portfolio company (ENIF, 7AURIGA,
TPL…) and back. Home → /approach, /acquisitions, /portfolio, /sectors. Each article → one
key page (/acquisitions or a sector page). Footer on ENIF/7AURIGA → "A BRAHM Global
Holdings company" link to the main site.

## 5. UK + India: how to signal both

- **Do not** create /en-gb and /en-in copies — same language, thin duplication.
- Put both markets in the content: "headquartered in London, operating in the UK and
  India" on home/about, with both offices listed (Mumbai address added to schema and
  /contact on 3 Nov 2026).
- If the Indian office is a separate legal entity, add its name/CIN and model it as a
  `subOrganization`.
- Article topics split by market (e.g. UK founder succession vs Indian family-business
  succession) rather than one generic piece.
- Links/mentions from both ecosystems (UK: Companies House, UK press, British-Indian
  business councils; India: Indian startup/business media).

## 6. Trust & entity fixes (do first — cheap, fixes brand CTR)

1. Replace `brahmglobalholdings@gmail.com` with an @brahmglobalholdings.com address
   (site + schema).
2. Show legal name, company number and registered office on /about and footer; link
   the Companies House record.
3. Expand `sameAs`: Companies House, Crunchbase, each portfolio company site.
4. Add `subOrganization` entries (ENIF, 7AURIGA, TPL, LSA, Alayn) to the Organization
   schema; each operating site declares `parentOrganization` back.
5. Named leadership with photos and short bios on /about (`Person` schema).
6. Review `alternateName` — "Brahm" alone is ambiguous and invites mixing with other
   Brahm companies; keep full-form variants only.
7. Google Business Profile for the London office, if there is a staffed address.

## 7. Content calendar

Cadence: 2 pieces/month is realistic and enough at this size. Quality > volume.

| Month | Build | Write |
|---|---|---|
| Nov 2026 | Trust fixes (§6) · /about upgrade | — |
| Dec 2026 | /acquisitions · /approach | "Venture builder vs holding company vs private equity" |
| Jan 2027 | /portfolio · /sectors hub · /sectors/technology | "Selling your business to a long-term owner (UK)" |
| Feb 2027 | /sectors/education · /sectors/sport | "Family business succession in India: options beyond a sale" |
| Mar 2027 | /sectors/hospitality · /sectors/communications | Case study: how ENIF was built inside the group |
| Apr 2027 | /sectors/luxury-consumer · /insights hub | "What permanent capital means for founders" |
| May–Jun 2027 | Review GSC queries, refresh top pages | 2 articles chosen from real query data |

Each article: named author with bio, a specific point of view, real examples from the
group — not generic explainers (those won't beat established finance sites).

## 8. Roadmap & KPIs

| Phase | When | Done when |
|---|---|---|
| 1 Foundation | Nov 2026 | Trust/entity fixes live; www + sitemap fixes validated in GSC |
| 2 Core pages | Dec 2026 – Feb 2027 | /acquisitions, /approach, /portfolio, /sectors + 3 sector pages indexed |
| 3 Content | Mar – Jun 2027 | All sector pages, 8–10 articles, internal linking complete |
| 4 Authority | Jul – Dec 2027 | Press mentions, partner/directory links in UK + India, refresh cycle |

| KPI | Now | 3 mo (Feb 27) | 6 mo (May 27) | 12 mo (Nov 27) |
|---|---|---|---|---|
| Indexed pages (main site) | 5 | 12 | 20 | 30+ |
| Brand query CTR | 21% | 40% | 50% | 60% |
| Non-brand clicks / month | ~0 | 5 | 30 | 100+ |
| Non-brand queries with impressions | few | 50 | 150 | 400 |
| UK share of clicks | <3% | 10% | 20% | 30% |
| Founder / partner enquiries from organic | 0 | track | 1–2 / mo | 3–5 / mo |

These targets are directional for a new, low-authority domain; revise after the first
3 months of real data.

## 9. Risks

- **Thin pages**: sector pages with two paragraphs will land in "Crawled – not
  indexed". Each needs real substance (what we own, why, how we operate in it).
- **Claims**: acquisition criteria, offices and figures must be true; this is a
  holding company — credibility is the product.
- **Cannibalisation**: don't write service pages on the main site that compete with
  ENIF / 7AURIGA.
- **Measurement**: set up a GSC filter for non-brand queries (exclude "brahm", "enif",
  "auriga") so progress is visible.

## Decisions (answered 3 Nov 2026)

- **The group builds its own companies AND buys / invests in existing ones** (confirmed
  with leadership). Keep `/acquisitions` and theme B ("sell my business" / founder
  intent) — highest-value audience. Existing "create, acquire and scale" copy is accurate.
  /acquisitions criteria (confirmed): all sectors · any size or stage · majority stake
  or minority investment · UK and India · enquiries handled directly by the CEO via
  brahmglobalholdings@gmail.com.
- **Offices**: London HQ + Mumbai (Bandra West), with a verified Google Business
  Profile. Mumbai address added to Organization schema and the contact page.
- **Sector pages to build** (real companies only):
  technology → ENIF · sport → Talent Pro League · education → London School of
  Academics & Arts (LSAA) · hospitality → Alayn · brand & communications → 7AURIGA ·
  luxury consumer → Hannah Pixels (luxury print & packaging, confirmed group company).
