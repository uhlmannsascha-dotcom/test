# Head of Production Operating System

A complete **Head of Production Operating System** — a single-file web app (HTML + vanilla JavaScript, no build step, no Python, no npm) with all 10 modules from the brief. Manual-first, API-ready for future ERP / MES / Power BI / D365 / Excel / Google Sheets / REST integration. Data is stored locally in the browser (`localStorage`); the storage layer is isolated so it can be swapped for a Raspberry Pi REST backend later without touching the screens.

## Run it

1. Open `index.html` with a double-click in any modern browser (Chrome, Edge, Firefox, Safari).
2. Done. No server, no install, no Python required.

(For a real URL / multi-device access, serve the folder from your Raspberry Pi with `python3 -m http.server 8080` or nginx.)

## Modules

1. **Executive Dashboard** — 30-second overview: Strategy, Operations, Finance, People, Risk. KPIs individually enable/disable/reorder/customize.
2. **Flexible KPI Engine** — manual entry + future API source, formula, owner, frequency (Daily/Weekly/Monthly/Quarterly), unit, target, warning & critical thresholds, historical trending.
3. **Balanced Scorecard** — Finance, Customer, Internal Processes, People & Learning; map initiatives to one or multiple perspectives; progress per perspective.
4. **OKR Management** — Objectives & Key Results; KRs link to KPIs; progress auto-calculated baseline → current → target.
5. **Value Realization Tracking** — Planned vs Realized benefits, Gap, Realization Rate %, traffic-light, benefits over time.
6. **Production Risk Compass** — 6 categories (Supplier, Machine, Quality, Cyber, People, Customer Escalations); Probability × Impact heatmap, mitigation, residual risk.
7. **Strategy Impact Map** — which initiative influences which KPI (matrix + detail view).
8. **KPI Dictionary** — full reference: definition, business meaning, formula, target, source, owner, frequency, traffic-light logic.
9. **Presentation Mode** — large typography, executive summaries, automatic status aggregation, slide navigation.
10. **Integrated User Guide** — built-in handbook, accessible from every screen via "? Help".

Plus **Operational Report placeholders** (Production Performance, Daily Management, OEE, Capacity, Supplier, Inventory, Quality, Financial) with manual entry + historical tracking from day one.

## Maturity journey

Manual → Semi-Automated → Fully Automated. The data model is already structured so future integrations plug in without redesigning screens.

## Data & export

- All data persists in `localStorage` (key `hop_os_v1`).
- **Export** button downloads the full dataset as JSON.
- CSV export available on KPI Engine, Risk Compass, KPI Dictionary.
- **Reset** restores seed defaults.

## Raspberry Pi (later)

Replace the `Store` object's `load`/`save` with `fetch()` calls to your Pi REST API. No screen changes needed.
