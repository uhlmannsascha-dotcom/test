/* =================================================================
   HEAD OF PRODUCTION OPERATING SYSTEM
   Single-file vanilla JS app. Manual-first, API-ready, localStorage persistence.
   Future: swap Store with REST/ERP/MES/PowerBI by replacing load()/save() calls.
   ================================================================= */

/* ---------------- Storage Layer (swap for Raspberry Pi REST later) -------- */
const STORE_KEY = 'hop_os_v1';
const Store = {
  load(){ try { return JSON.parse(localStorage.getItem(STORE_KEY)) || null } catch(e){ return null } },
  save(d){ try { localStorage.setItem(STORE_KEY, JSON.stringify(d)) } catch(e){} },
  reset(){ localStorage.removeItem(STORE_KEY) }
};

/* ---------------- Seed Data (from Xal prototype, expanded) --------------- */
function seed(){
  return {
    meta:{ version:1, lastEdit:null },
    executiveConfig:{
      sections:[
        {id:'strategy', label:'STRATEGY', enabled:true, kpis:['activeInitiatives','criticalInitiatives','delayedInitiatives','totalBenefits']},
        {id:'operations', label:'OPERATIONS', enabled:true, kpis:['oee','otd','leadTime','capacity','scrap','throughput']},
        {id:'finance', label:'FINANCE', enabled:true, kpis:['budget','forecast','realizedSavings','workingCapital','roi']},
        {id:'people', label:'PEOPLE', enabled:true, kpis:['sickLeave','turnover','openPositions','skillCoverage']},
        {id:'risk', label:'RISK', enabled:true, kpis:['supplierRisk','machineRisk','qualityRisk','strategicRisk']}
      ]
    },
    initiatives:[
      {id:'SH-01',title:'Unified ERP Cloud Backbone (D365)',category:'ERP & IT',priority:'Sehr hoch',status:'In Bearbeitung',progress:15,benefit:950,cost:4,owner:'Head of Operations / ERP Lead',timeline:'2026-10-01 – 2027-01-29',evolution:'Genesis / Custom',delayed:false,critical:true},
      {id:'SH-02',title:'End-to-End Prozessanalyse & Feinsteuerung (AT/SLO)',category:'Produktion & Planung',priority:'Hoch',status:'Offen',progress:0,benefit:320,cost:0,owner:'Leitung Produktionsplanung',timeline:'2027-02-01 – 2027-04-30',evolution:'Custom Built',delayed:false,critical:false},
      {id:'SH-03',title:'Agentic AI im ERP-Umfeld (XALAX)',category:'ERP & IT',priority:'Mittel',status:'Offen',progress:0,benefit:180,cost:25,owner:'ERP Lead / XALAX',timeline:'2027-03-01 – 2027-12-31',evolution:'Genesis',delayed:false,critical:false},
      {id:'SH-04',title:'Schnittstellenklärung Sales/R&D/QM',category:'Organisation',priority:'Hoch',status:'Offen',progress:0,benefit:450,cost:10,owner:'Operations & Sales Leads',timeline:'2026-10-01 – 2026-12-31',evolution:'Product',delayed:false,critical:false},
      {id:'SH-05',title:'Sales Forecasting & S&OP (TOP PRIO)',category:'Produktion & Planung',priority:'Sehr hoch',status:'In Bearbeitung',progress:20,benefit:850,cost:30,owner:'Bernd Grega / S&OP Team',timeline:'2026-10-01 – 2027-02-26',evolution:'Product',delayed:true,critical:true},
      {id:'SH-06',title:'Lean Management Ausbildung & Reaktivierung',category:'Kultur & Qualifikation',priority:'Hoch',status:'Geplant',progress:10,benefit:120,cost:18,owner:'Operations Lead',timeline:'2026-09-21 – 2026-12-16',evolution:'Product',delayed:false,critical:false},
      {id:'SH-09',title:'Improvement ELPRO (Elektronikfertigung SMED)',category:'Produktion & Technik',priority:'Hoch',status:'In Bearbeitung',progress:30,benefit:280,cost:45,owner:'Fertigungsleitung ELPRO',timeline:'2026-08-01 – 2027-03-31',evolution:'Commodity / Utility',delayed:false,critical:false},
      {id:'SH-12',title:'UNICO Matrix Production Cells (Graz/SLO)',category:'Produktion & Technik',priority:'Hoch',status:'Geplant',progress:5,benefit:600,cost:120,owner:'Fertigungsleitung',timeline:'2027-01-01 – 2027-12-31',evolution:'Custom Built',delayed:true,critical:false},
      {id:'SH-17',title:'Nearshoring & Buffer Inventory (EU Dual-Sourcing)',category:'Supply Chain',priority:'Hoch',status:'In Bearbeitung',progress:25,benefit:420,cost:80,owner:'Supply Chain Lead',timeline:'2026-11-01 – 2027-05-31',evolution:'Product',delayed:false,critical:false}
    ],
    workPackages:[
      {id:'AP-01',ref:'SH-01',title:'D365 Cloud Cutover & Hypercare Graz',lead:'Head of Operations',site:'AT (Graz)',start:'2026-10-01',end:'2027-01-31',status:'In Bearbeitung',progress:15},
      {id:'AP-07',ref:'SH-05',title:'S&OP Prozess-Standardisierung & Forecasting Pilot',lead:'S&OP Projektteam',site:'AT (Graz)',start:'2026-10-01',end:'2027-02-28',status:'In Bearbeitung',progress:25},
      {id:'AP-09',ref:'SH-09',title:'SMED Rüstzeit-Reduktion Elektronikfertigung',lead:'Fertigungsleitung ELPRO',site:'AT (Graz)',start:'2026-08-01',end:'2027-03-31',status:'In Bearbeitung',progress:30}
    ],
    /* KPI Engine + Dictionary share definitions */
    kpis:[
      {id:'oee',name:'OEE',section:'operations',unit:'%',value:74.2,target:82,warning:78,critical:70,owner:'Plant Manager',frequency:'Daily',source:'Manual',formula:'Availability × Performance × Quality',definition:'Overall Equipment Effectiveness',businessMeaning:'Gesamteffektivität der Anlagen',direction:'higher',enabled:true,history:[{t:'2026-09-01',v:72.4},{t:'2026-09-08',v:73.1},{t:'2026-09-15',v:74.2}]},
      {id:'otd',name:'OTD',section:'operations',unit:'%',value:91,target:97,warning:93,critical:88,owner:'Logistics',frequency:'Daily',source:'Manual',formula:'On-time deliveries / total deliveries',definition:'On-Time Delivery',businessMeaning:'Liefertermintreue',direction:'higher',enabled:true,history:[{t:'2026-09-01',v:89},{t:'2026-09-08',v:90},{t:'2026-09-15',v:91}]},
      {id:'leadTime',name:'Lead Time',section:'operations',unit:'d',value:11.4,target:8,warning:10,critical:13,owner:'Production Planning',frequency:'Weekly',source:'Manual',formula:'Avg order-to-ship days',definition:'Auftragsdurchlaufzeit',businessMeaning:'Durchlaufzeit Auftrag→Versand',direction:'lower',enabled:true,history:[{t:'2026-09-01',v:12},{t:'2026-09-08',v:11.8},{t:'2026-09-15',v:11.4}]},
      {id:'capacity',name:'Capacity Utilization',section:'operations',unit:'%',value:86,target:88,warning:80,critical:75,owner:'Plant Manager',frequency:'Weekly',source:'Manual',formula:'Used capacity / available capacity',definition:'Kapazitätsauslastung',businessMeaning:'Nutzung verfügbare Kapazität',direction:'higher',enabled:true,history:[]},
      {id:'scrap',name:'Scrap Rate',section:'operations',unit:'%',value:2.1,target:1.5,warning:2,critical:3,owner:'Quality',frequency:'Daily',source:'Manual',formula:'Scrap units / produced units',definition:'Ausschussquote',businessMeaning:'Ausschuss in %',direction:'lower',enabled:true,history:[]},
      {id:'throughput',name:'Throughput',section:'operations',unit:'u/h',value:240,target:280,warning:250,critical:220,owner:'Plant Manager',frequency:'Daily',source:'Manual',formula:'Units produced / hour',definition:'Produktionsrate',businessMeaning:'Ausbringung pro Stunde',direction:'higher',enabled:true,history:[]},
      {id:'budget',name:'Budget',section:'finance',unit:'k€',value:954,target:1250,warning:1000,critical:800,owner:'CFO',frequency:'Monthly',source:'Manual',formula:'Σ approved spend',definition:'Budget Verbrauch',businessMeaning:'Verbrauchtes Budget',direction:'higher',enabled:true,history:[]},
      {id:'forecast',name:'Forecast',section:'finance',unit:'M€',value:1.85,target:1.6,warning:1.7,critical:1.5,owner:'CFO',frequency:'Monthly',source:'Manual',formula:'Σ projected benefit',definition:'Projizierter Nutzen',businessMeaning:'Erwarteter EBIT-Beitrag',direction:'higher',enabled:true,history:[]},
      {id:'realizedSavings',name:'Realized Savings',section:'finance',unit:'k€',value:420,target:1600,warning:800,critical:400,owner:'CFO',frequency:'Quarterly',source:'Manual',formula:'Σ realized benefit',definition:'Realisierte Einsparungen',businessMeaning:'Tatsächlich erzielter Nutzen',direction:'higher',enabled:true,history:[]},
      {id:'workingCapital',name:'Working Capital',section:'finance',unit:'M€',value:6.2,target:5.5,warning:6,critical:7,owner:'CFO',frequency:'Monthly',source:'Manual',formula:'Current assets - current liabilities',definition:'Working Capital',businessMeaning:'Umlaufvermögen',direction:'lower',enabled:true,history:[]},
      {id:'roi',name:'ROI',section:'finance',unit:'%',value:118,target:150,warning:120,critical:100,owner:'CFO',frequency:'Quarterly',source:'Manual',formula:'(Gain-Cost)/Cost',definition:'Return on Investment',businessMeaning:'Rendite der Initiativen',direction:'higher',enabled:true,history:[]},
      {id:'sickLeave',name:'Sick Leave Rate',section:'people',unit:'%',value:5.2,target:4,warning:5,critical:7,owner:'HR',frequency:'Monthly',source:'Manual',formula:'Sick days / available days',definition:'Krankstandsquote',businessMeaning:'Abwesenheit durch Krankheit',direction:'lower',enabled:true,history:[]},
      {id:'turnover',name:'Employee Turnover',section:'people',unit:'%',value:8.4,target:6,warning:8,critical:12,owner:'HR',frequency:'Quarterly',source:'Manual',formula:'Leavers / headcount',definition:'Fluktuationsrate',businessMeaning:'Mitarbeiterfluktuation',direction:'lower',enabled:true,history:[]},
      {id:'openPositions',name:'Open Positions',section:'people',unit:'',value:12,target:5,warning:10,critical:20,owner:'HR',frequency:'Weekly',source:'Manual',formula:'Count open requisitions',definition:'Offene Stellen',businessMeaning:'Anzahl offener Positionen',direction:'lower',enabled:true,history:[]},
      {id:'skillCoverage',name:'Skill Coverage',section:'people',unit:'%',value:72,target:90,warning:80,critical:70,owner:'HR',frequency:'Quarterly',source:'Manual',formula:'Trained workers / required',definition:'Skill-Abdeckung',businessMeaning:'Qualifikationsabdeckung',direction:'higher',enabled:true,history:[]},
      {id:'supplierRisk',name:'Supplier Risks',section:'risk',unit:'',value:3,target:1,warning:2,critical:4,owner:'Supply Chain',frequency:'Weekly',source:'Manual',formula:'Count high-risk suppliers',definition:'Lieferantenrisiken',businessMeaning:'Anzahl kritischer Lieferanten',direction:'lower',enabled:true,history:[]},
      {id:'machineRisk',name:'Machine Risks',section:'risk',unit:'',value:2,target:1,warning:2,critical:4,owner:'Maintenance',frequency:'Weekly',source:'Manual',formula:'Count critical machines',definition:'Maschinenrisiken',businessMeaning:'Anzahl kritischer Anlagen',direction:'lower',enabled:true,history:[]},
      {id:'qualityRisk',name:'Quality Risks',section:'risk',unit:'',value:2,target:1,warning:2,critical:4,owner:'Quality',frequency:'Weekly',source:'Manual',formula:'Count open quality escalations',definition:'Qualitätsrisiken',businessMeaning:'Offene Qualitäts-Eskalationen',direction:'lower',enabled:true,history:[]},
      {id:'strategicRisk',name:'Strategic Risks',section:'risk',unit:'',value:1,target:1,warning:2,critical:3,owner:'Head of Production',frequency:'Monthly',source:'Manual',formula:'Count strategic risks',definition:'Strategische Risiken',businessMeaning:'Strategische Risikofelder',direction:'lower',enabled:true,history:[]}
    ],
    /* Derived executive metric ids */
    scorecard:[
      {perspective:'Finance',initiatives:['SH-01','SH-05'],targets:[{kpi:'roi',target:150},{kpi:'realizedSavings',target:1600}]},
      {perspective:'Customer',initiatives:['SH-17','SH-04'],targets:[{kpi:'otd',target:97}]},
      {perspective:'Internal Processes',initiatives:['SH-02','SH-09','SH-12'],targets:[{kpi:'oee',target:82},{kpi:'leadTime',target:8},{kpi:'scrap',target:1.5}]},
      {perspective:'People & Learning',initiatives:['SH-06'],targets:[{kpi:'skillCoverage',target:90},{kpi:'turnover',target:6}]}
    ],
    okrs:[
      {id:'OKR-1',objective:'Become the most reliable production organization',keyResults:[
        {id:'KR-1',text:'OTD 92% → 97%',kpi:'otd',baseline:92,target:97,current:91},
        {id:'KR-2',text:'Lead Time -30%',kpi:'leadTime',baseline:16,target:11.2,current:11.4},
        {id:'KR-3',text:'OEE +10%',kpi:'oee',baseline:67,target:73.7,current:74.2},
        {id:'KR-4',text:'Scrap -20%',kpi:'scrap',baseline:2.6,target:2.08,current:2.1}
      ]}
    ],
    valueRealization:[
      {id:'SH-01',title:'ERP D365',planned:950,realized:120},
      {id:'SH-05',title:'S&OP Forecasting',planned:850,realized:200},
      {id:'SH-09',title:'ELPRO SMED',planned:280,realized:90},
      {id:'SH-12',title:'Matrix Cells',planned:600,realized:10},
      {id:'SH-17',title:'Nearshoring',planned:420,realized:0}
    ],
    risks:[
      {id:'R-01',name:'Single-source critical electronic components',category:'Supplier Risks',probability:4,impact:5,owner:'Supply Chain Lead',mitigation:'EU dual-sourcing SH-17',residual:3},
      {id:'R-02',name:'D365 cutover data loss',category:'Cyber Risks',probability:2,impact:5,owner:'ERP Lead',mitigation:'Full backup & hypercare',residual:2},
      {id:'R-03',name:'Coating line unplanned downtime',category:'Machine Availability',probability:3,impact:4,owner:'Maintenance',mitigation:'IoT predictive maintenance SH-13',residual:2},
      {id:'R-04',name:'Solder joint defects (SMD)',category:'Quality Risks',probability:3,impact:3,owner:'Quality',mitigation:'AOI vision inspection SH-23',residual:2},
      {id:'R-05',name:'Skilled worker shortage',category:'People Risks',probability:4,impact:4,owner:'HR',mitigation:'Green Belt & ILUO SH-06/SH-15',residual:3},
      {id:'R-06',name:'Key customer escalation - delayed project',category:'Customer Escalations',probability:3,impact:5,owner:'Head of Production',mitigation:'S&OP cadence SH-05',residual:3}
    ],
    impactMap:[
      {initiative:'SH-17',impacts:['otd','leadTime','supplierRisk','workingCapital']},
      {initiative:'SH-05',impacts:['otd','leadTime','capacity','strategicRisk']},
      {initiative:'SH-09',impacts:['oee','scrap','throughput']},
      {initiative:'SH-12',impacts:['leadTime','capacity','throughput']},
      {initiative:'SH-01',impacts:['roi','budget','strategicRisk']},
      {initiative:'SH-06',impacts:['skillCoverage','turnover','sickLeave']}
    ],
    reports:[
      {id:'prodPerf',name:'Production Performance Report',entries:[]},
      {id:'dailyMgmt',name:'Daily Management Report',entries:[]},
      {id:'oeeDash',name:'OEE Dashboard',entries:[]},
      {id:'capacity',name:'Capacity Planning Dashboard',entries:[]},
      {id:'supplier',name:'Supplier Performance Dashboard',entries:[]},
      {id:'inventory',name:'Inventory Dashboard',entries:[]},
      {id:'quality',name:'Quality Dashboard',entries:[]},
      {id:'financial',name:'Financial Performance Dashboard',entries:[]}
    ]
  };
}

/* ---------------- State & Helpers ---------------- */
let S = Store.load() || seed();
if(!S.executiveConfig) S = seed(); // migrate guard
let activeTab = 'executive';
let toastMsg = null;
let editing = {}; // generic edit buffer per module

function persist(){ S.meta.lastEdit = new Date().toISOString(); Store.save(S); }
function setTab(t){ activeTab=t; render(); }
function showToast(m){ toastMsg=m; render(); clearTimeout(window.__t); window.__t=setTimeout(()=>{toastMsg=null;render();},2200); }
function $(id){ return document.getElementById(id); }
function el(html){ const d=document.createElement('div'); d.innerHTML=html.trim(); return d.firstChild; }
function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

function statusOf(kpi){
  const v=kpi.value, t=kpi.target, w=kpi.warning, c=kpi.critical;
  if(kpi.direction==='higher'){
    if(v>=t) return 'ok'; if(v>=w) return 'warn'; return 'crit';
  } else {
    if(v<=t) return 'ok'; if(v<=w) return 'warn'; return 'crit';
  }
}
function statusColor(s){ return s==='ok'?'emerald':s==='warn'?'amber':'rose'; }
function statusBadge(s){ const c=statusColor(s); const lbl={ok:'On Target',warn:'Warning',crit:'Critical'}[s]; return `<span class="text-[10px] px-1.5 py-0.5 rounded border bg-${c}-500/10 text-${c}-400 border-${c}-500/30">${lbl}</span>`; }

function kpiById(id){ return S.kpis.find(k=>k.id===id); }
function initById(id){ return S.initiatives.find(i=>i.id===id); }
function kpiName(id){ const k=kpiById(id); return k?k.name:id; }
function kpiUnit(id){ const k=kpiById(id); return k?k.unit:''; }
function fmt(v,u){ if(v==null||v==='') return '–'; return (typeof v==='number'? (Number.isInteger(v)?v:(Math.round(v*100)/100)) : v)+(u?(' '+u):''); }

/* Executive derived metrics */
function execMetric(id){
  switch(id){
    case 'activeInitiatives': return S.initiatives.filter(i=>i.status==='In Bearbeitung').length;
    case 'criticalInitiatives': return S.initiatives.filter(i=>i.critical).length;
    case 'delayedInitiatives': return S.initiatives.filter(i=>i.delayed).length;
    case 'totalBenefits': return S.initiatives.reduce((a,i)=>a+(i.benefit||0),0);
    default: { const k=kpiById(id); return k?k.value:'–'; }
  }
}
function execMetricLabel(id){
  const map={activeInitiatives:'Active',criticalInitiatives:'Critical',delayedInitiatives:'Delayed',totalBenefits:'Total Benefits €k'};
  if(map[id]) return map[id]; const k=kpiById(id); return k?k.name:id;
}
function execMetricStatus(id){
  if(['activeInitiatives','criticalInitiatives','delayedInitiatives','totalBenefits'].includes(id)) return 'ok';
  const k=kpiById(id); return k?statusOf(k):'ok';
}

/* ---------------- Layout / Shell ---------------- */
function shell(){
  const tabs=[
    {id:'executive',label:'Executive',icon:'▣'},
    {id:'kpi',label:'KPI Engine',icon:'📊'},
    {id:'scorecard',label:'Scorecard',icon:'⚖'},
    {id:'okr',label:'OKRs',icon:'◎'},
    {id:'value',label:'Value Tracking',icon:'€'},
    {id:'risk',label:'Risk Compass',icon:'⚠'},
    {id:'impact',label:'Impact Map',icon:'🔗'},
    {id:'dictionary',label:'KPI Dictionary',icon:'📖'},
    {id:'reports',label:'Reports',icon:'📄'},
    {id:'guide',label:'User Guide',icon:'?'},
    {id:'presentation',label:'Presentation',icon:'🎬'}
  ];
  const nav=tabs.map(t=>`<button onclick="setTab('${t.id}')" class="px-3 py-2 rounded-lg font-medium text-xs transition ${activeTab===t.id?'bg-cyan-600 text-white shadow shadow-cyan-950':'text-slate-400 hover:text-slate-200 hover:bg-slate-900'}"><span class="mr-1.5">${t.icon}</span>${t.label}</button>`).join('');
  const view=renderView();
  return `
  <div class="min-h-screen flex flex-col">
    <header class="sticky top-0 z-30 bg-slate-900/90 backdrop-blur border-b border-slate-800 px-4 py-3 flex items-center justify-between gap-4">
      <div class="flex items-center gap-3 shrink-0">
        <div class="w-9 h-9 rounded-lg bg-cyan-600 flex items-center justify-center font-bold text-white shadow-lg shadow-cyan-900/50">H</div>
        <div>
          <div class="flex items-center gap-2"><h1 class="text-base font-bold tracking-tight">Head of Production OS</h1>
          <span class="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 font-mono">v1 · Manual-first</span></div>
          <p class="text-xs text-slate-400">Executive Production Operations & Strategy Platform</p>
        </div>
      </div>
      <nav class="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 gap-0.5 overflow-x-auto max-w-full">${nav}</nav>
      <div class="flex items-center gap-2 shrink-0">
        <button onclick="exportAll()" title="Export JSON" class="px-2.5 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs border border-slate-700">⇩ Export</button>
        <button onclick="confirmReset()" title="Reset" class="px-2.5 py-2 bg-slate-800 hover:bg-rose-900 rounded-lg text-xs border border-slate-700">⟲ Reset</button>
      </div>
    </header>
    <main class="flex-1 p-4 md:p-6 max-w-[1400px] w-full mx-auto fade">
      ${view}
    </main>
    <footer class="border-t border-slate-800 px-6 py-3 text-xs text-slate-500 flex justify-between">
      <span>Head of Production Operating System · Storage: localStorage (Raspberry Pi REST-ready)</span>
      <span>Maturity: <span class="text-cyan-400">Manual</span> → Semi-Automated → Fully Automated</span>
    </footer>
    ${toastMsg?`<div class="toast fixed bottom-6 right-6 z-50 bg-slate-800 border border-cyan-600 text-slate-100 px-4 py-3 rounded-lg shadow-xl text-sm">${esc(toastMsg)}</div>`:''}
  </div>`;
}

function renderView(){
  switch(activeTab){
    case 'executive': return viewExecutive();
    case 'kpi': return viewKpiEngine();
    case 'scorecard': return viewScorecard();
    case 'okr': return viewOkr();
    case 'value': return viewValue();
    case 'risk': return viewRisk();
    case 'impact': return viewImpact();
    case 'dictionary': return viewDictionary();
    case 'reports': return viewReports();
    case 'guide': return viewGuide();
    case 'presentation': return viewPresentation();
    default: return viewExecutive();
  }
}

function confirmReset(){ if(confirm('Reset all data to seed defaults? This cannot be undone.')){ Store.reset(); S=seed(); showToast('Reset to defaults'); render(); } }
function exportAll(){ download('hop_os_export.json', JSON.stringify(S,null,2)); showToast('Exported full dataset'); }
function download(name, content){ const b=new Blob([content],{type:'text/plain'}); const a=document.createElement('a'); a.href=URL.createObjectURL(b); a.download=name; a.click(); }
function csvExport(name, rows){ if(!rows.length) return; const k=Object.keys(rows[0]); const csv=k.join(',')+'\n'+rows.map(r=>k.map(c=>{let s=r[c]==null?'':String(r[c]); s=s.replace(/"/g,'""'); if(/[",\n]/.test(s)) s='"'+s+'"'; return s;}).join(',')).join('\n'); download(name,csv); showToast('CSV exported'); }

/* ---------------- Help Button (reusable) ---------------- */
function helpBtn(topic){ return `<button onclick="setTab('guide'); setTimeout(()=>{document.getElementById('guide-'+ '${topic}')?.scrollIntoView()},50)" class="text-slate-500 hover:text-cyan-400 text-xs">? Help</button>`; }

/* ---------------- Module 1: Executive Dashboard ---------------- */
function viewExecutive(){
  const sections=S.executiveConfig.sections.filter(s=>s.enabled);
  const blocks=sections.map(sec=>{
    const cards=sec.kpis.map(kid=>{
      const v=execMetric(kid), st=execMetricStatus(kid);
      const isMoney=kid==='totalBenefits';
      return `<div class="bg-slate-900/70 border border-slate-800 rounded-xl p-4 hover:border-slate-700 transition">
        <div class="text-[10px] uppercase text-slate-500 font-bold">${esc(execMetricLabel(kid))}</div>
        <div class="text-2xl font-bold text-white mt-1.5">${isMoney?('€'+v):fmt(v,kpiUnit(kid))}</div>
        <div class="mt-2">${statusBadge(st)}</div>
      </div>`;
    }).join('');
    return `<div>
      <div class="flex items-center justify-between mb-2">
        <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400">${sec.label}</h3>
        ${helpBtn(sec.id)}
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">${cards}</div>
    </div>`;
  }).join('');
  const headline = `<div class="bg-gradient-to-r from-cyan-900/40 to-slate-900 border border-cyan-800/40 rounded-2xl p-5 mb-6">
    <div class="flex items-center justify-between flex-wrap gap-3">
      <div><h2 class="text-lg font-bold">30-Second Executive Overview</h2><p class="text-xs text-slate-400 mt-1">Head of Production snapshot — all KPIs manually editable, API-ready for ERP/MES/Power BI.</p></div>
      <div class="flex gap-2">
        <button onclick="execCustomize()" class="px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs border border-slate-700">⚙ Customize KPIs</button>
        <button onclick="setTab('presentation')" class="px-3 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold">🎬 Presentation Mode</button>
      </div>
    </div>
  </div>`;
  return headline + `<div class="space-y-6">${blocks}</div>`;
}

function execCustomize(){
  const sec= S.executiveConfig.sections;
  const rows=sec.map((s,i)=>`
    <div class="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-lg p-3 mb-2">
      <div class="flex items-center gap-3">
        <span class="text-slate-500 cursor-grab" title="drag to reorder">⠿</span>
        <span class="font-semibold text-sm">${esc(s.label)}</span>
        <span class="text-[10px] text-slate-500">${s.kpis.length} KPIs</span>
      </div>
      <div class="flex items-center gap-2">
        <button onclick="execToggleSec(${i})" class="text-xs px-2 py-1 rounded ${s.enabled?'bg-emerald-900 text-emerald-400':'bg-slate-800 text-slate-500'}">${s.enabled?'Enabled':'Disabled'}</button>
        <button onclick="execReorder(${i},-1)" class="px-2 py-1 text-xs bg-slate-800 rounded">↑</button>
        <button onclick="execReorder(${i},1)" class="px-2 py-1 text-xs bg-slate-800 rounded">↓</button>
        <button onclick="execEditKpis(${i})" class="px-2 py-1 text-xs bg-cyan-700 text-white rounded">Edit KPIs</button>
      </div>
    </div>`).join('');
  showModal('Customize Executive Dashboard', `
    <p class="text-xs text-slate-400 mb-3">Enable/disable sections, reorder, and choose which KPIs appear in each section.</p>
    ${rows}
    <div class="mt-4 flex gap-2"><button onclick="closeModal()" class="px-3 py-2 bg-slate-700 rounded-lg text-xs">Done</button></div>
  `);
}
function execToggleSec(i){ S.executiveConfig.sections[i].enabled=!S.executiveConfig.sections[i].enabled; persist(); execCustomize(); render(); }
function execReorder(i,dir){ const a=S.executiveConfig.sections; const j=i+dir; if(j<0||j>=a.length) return; [a[i],a[j]]=[a[j],a[i]]; persist(); execCustomize(); render(); }
function execEditKpis(i){
  const sec=S.executiveConfig.sections[i];
  const all=S.kpis.map(k=>`<label class="flex items-center gap-2 text-xs py-1"><input type="checkbox" ${sec.kpis.includes(k.id)?'checked':''} onchange="execToggleKpi(${i},'${k.id}',this.checked)"> ${esc(k.name)} <span class="text-slate-500">(${k.unit})</span></label>`).join('');
  const derived=`<label class="flex items-center gap-2 text-xs py-1"><input type="checkbox" ${sec.kpis.includes('activeInitiatives')?'checked':''} onchange="execToggleKpi(${i},'activeInitiatives',this.checked)"> Active Initiatives (derived)</label>
  <label class="flex items-center gap-2 text-xs py-1"><input type="checkbox" ${sec.kpis.includes('criticalInitiatives')?'checked':''} onchange="execToggleKpi(${i},'criticalInitiatives',this.checked)"> Critical Initiatives (derived)</label>
  <label class="flex items-center gap-2 text-xs py-1"><input type="checkbox" ${sec.kpis.includes('delayedInitiatives')?'checked':''} onchange="execToggleKpi(${i},'delayedInitiatives',this.checked)"> Delayed Initiatives (derived)</label>
  <label class="flex items-center gap-2 text-xs py-1"><input type="checkbox" ${sec.kpis.includes('totalBenefits')?'checked':''} onchange="execToggleKpi(${i},'totalBenefits',this.checked)"> Total Benefits €k (derived)</label>`;
  showModal('Edit KPIs — '+esc(sec.label), `<div class="grid grid-cols-2 gap-3 max-h-[60vh] overflow-auto">${derived}${all}</div><div class="mt-4"><button onclick="closeModal()" class="px-3 py-2 bg-slate-700 rounded-lg text-xs">Done</button></div>`);
}
function execToggleKpi(i,kid,on){ const sec=S.executiveConfig.sections[i]; if(on){ if(!sec.kpis.includes(kid)) sec.kpis.push(kid);} else { sec.kpis=sec.kpis.filter(x=>x!==kid);} persist(); }

/* ---------------- Modal helper ---------------- */
function showModal(title, body){
  const m=document.createElement('div');
  m.id='modal-root'; m.className='modal-bg fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4';
  m.innerHTML=`<div class="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-auto shadow-2xl">
    <div class="flex items-center justify-between px-5 py-3 border-b border-slate-800 sticky top-0 bg-slate-900"><h3 class="font-bold">${title}</h3>
    <button onclick="closeModal()" class="text-slate-400 hover:text-white text-xl leading-none">×</button></div>
    <div class="p-5">${body}</div></div>`;
  document.body.appendChild(m);
}
function closeModal(){ const m=document.getElementById('modal-root'); if(m) m.remove(); }

/* ---------------- Module 2: Flexible KPI Engine ---------------- */
function viewKpiEngine(){
  const rows=S.kpis.map((k,i)=>{
    const st=statusOf(k);
    const freq=k.frequency;
    const hist=(k.history||[]).slice(-8).map(h=>h.v).join(' → ');
    return `<tr class="hover:bg-slate-900/50">
      <td class="py-3 px-4 font-semibold text-cyan-400">${esc(k.name)}</td>
      <td class="py-3 px-4 text-xs text-slate-500">${k.section}</td>
      <td class="py-3 px-4 font-bold text-white text-center">${fmt(k.value,k.unit)}</td>
      <td class="py-3 px-4 text-center text-slate-300">${fmt(k.target,k.unit)}</td>
      <td class="py-3 px-4 text-center">${statusBadge(st)}</td>
      <td class="py-3 px-4 text-xs text-slate-400">${k.owner}</td>
      <td class="py-3 px-4"><span class="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">${freq}</span></td>
      <td class="py-3 px-4"><span class="text-[10px] px-2 py-0.5 rounded ${k.source==='Manual'?'bg-amber-900 text-amber-400':'bg-emerald-900 text-emerald-400'}">${k.source}</span></td>
      <td class="py-3 px-4 text-right"><button onclick="kpiEdit(${i})" class="text-xs px-2 py-1 bg-slate-800 hover:bg-cyan-700 rounded">Edit</button></td>
    </tr>`;
  }).join('');
  return `<div class="space-y-4">
    <div class="flex items-center justify-between"><div><h2 class="text-lg font-bold">Flexible KPI Engine</h2><p class="text-xs text-slate-400 mt-1">Manual entry now · API-ready later (ERP/MES/Power BI/D365). Each KPI: formula, owner, frequency, thresholds, history.</p></div>
    <div class="flex gap-2">${helpBtn('kpi')}<button onclick="kpiAdd()" class="px-3 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold">+ Add KPI</button>
    <button onclick="csvExport('kpis.csv',S.kpis)" class="px-3 py-2 bg-slate-800 rounded-lg text-xs border border-slate-700">CSV</button></div></div>
    <div class="overflow-x-auto bg-slate-900/60 border border-slate-800 rounded-xl">
      <table class="w-full text-left text-xs"><thead><tr class="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase tracking-wider">
        <th class="py-3 px-4">KPI</th><th class="py-3 px-4">Section</th><th class="py-3 px-4 text-center">Current</th><th class="py-3 px-4 text-center">Target</th><th class="py-3 px-4 text-center">Status</th><th class="py-3 px-4">Owner</th><th class="py-3 px-4">Freq.</th><th class="py-3 px-4">Source</th><th class="py-3 px-4 text-right">Action</th></tr></thead>
      <tbody class="divide-y divide-slate-800/70">${rows}</tbody></table>
    </div></div>`;
}
function kpiEdit(i){
  const k=S.kpis[i];
  const fields=[
    ['name','Name','text'],['section','Section','text'],['unit','Unit','text'],['value','Current Value','number'],
    ['target','Target','number'],['warning','Warning Threshold','number'],['critical','Critical Threshold','number'],
    ['owner','Owner','text'],['frequency','Update Frequency (Daily/Weekly/Monthly/Quarterly)','text'],
    ['source','Source (Manual / API:ERP / API:MES...)','text'],['formula','Formula','text'],
    ['direction','Direction (higher/lower)','text'],['definition','Definition','text'],['businessMeaning','Business Meaning','text']
  ];
  const inputs=fields.map(f=>`<label class="block text-xs text-slate-400 mb-1">${f[1]}<input id="kf-${f[0]}" type="${f[2]}" value="${esc(k[f[0]]==null?'':k[f[0]])}" class="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm mt-1"></label>`).join('');
  const hist=(k.history||[]).map((h,hi)=>`<div class="flex gap-2 items-center mb-1"><input value="${h.t}" id="kh-t-${hi}" class="bg-slate-950 border border-slate-700 rounded px-2 py-1 text-xs" placeholder="date"><input value="${h.v}" id="kh-v-${hi}" type="number" class="bg-slate-950 border border-slate-700 rounded px-2 py-1 text-xs w-24"><button onclick="kpiDelHist(${i},${hi})" class="text-rose-400 text-xs">×</button></div>`).join('');
  showModal('Edit KPI — '+esc(k.name), `<div class="grid grid-cols-2 gap-3">${inputs}</div>
    <div class="mt-4"><div class="text-xs font-bold text-slate-400 mb-2">Historical Trending (date → value)</div>${hist}
    <button onclick="kpiAddHist(${i})" class="text-xs text-cyan-400 mt-2">+ add data point</button></div>
    <div class="mt-4 flex gap-2"><button onclick="kpiSave(${i})" class="px-3 py-2 bg-cyan-600 rounded-lg text-xs font-semibold text-white">Save</button>
    <button onclick="kpiDelete(${i})" class="px-3 py-2 bg-rose-700 rounded-lg text-xs">Delete KPI</button>
    <button onclick="closeModal()" class="px-3 py-2 bg-slate-700 rounded-lg text-xs">Cancel</button></div>`);
}
function kpiSave(i){
  const k=S.kpis[i];
  ['name','section','unit','owner','frequency','source','formula','direction','definition','businessMeaning'].forEach(f=>{const v=$('kf-'+f).value; if(v!==''||f==='unit'||f==='formula'||f==='definition'||f==='businessMeaning') k[f]=v;});
  ['value','target','warning','critical'].forEach(f=>{const v=$('kf-'+f).value; k[f]=v===''?null:Number(v);});
  k.history=k.history||[];
  const n=k.history.length;
  for(let h=0;h<n;h++){ const t=$('kh-t-'+h)?.value, v=$('kh-v-'+h)?.value; if(t!==undefined) k.history[h]={t,v:v===''?null:Number(v)}; }
  persist(); closeModal(); render(); showToast('KPI saved');
}
function kpiAddHist(i){ S.kpis[i].history=S.kpis[i].history||[]; S.kpis[i].history.push({t:new Date().toISOString().slice(0,10),v:0}); persist(); kpiEdit(i); }
function kpiDelHist(i,h){ S.kpis[i].history.splice(h,1); persist(); kpiEdit(i); }
function kpiDelete(i){ if(!confirm('Delete this KPI?')) return; S.kpis.splice(i,1); persist(); closeModal(); render(); showToast('KPI deleted'); }
function kpiAdd(){
  const id='kpi-'+Date.now().toString().slice(-5);
  S.kpis.push({id,name:'New KPI',section:'operations',unit:'',value:0,target:0,warning:0,critical:0,owner:'',frequency:'Daily',source:'Manual',formula:'',direction:'higher',definition:'',businessMeaning:'',enabled:true,history:[]});
  persist(); render(); kpiEdit(S.kpis.length-1);
}

/* ---------------- Module 3: Balanced Scorecard ---------------- */
function viewScorecard(){
  const persp=S.scorecard.map((p,pi)=>{
    const inits=p.initiatives.map(id=>{const it=initById(id); return it?`<div class="text-xs bg-slate-900 border border-slate-800 rounded p-2 flex justify-between"><span class="font-mono text-cyan-400">${id}</span><span class="text-slate-300">${esc(it.title)}</span><span>${it.progress}%</span></div>`:'';}).join('');
    const tgts=p.targets.map(t=>{const k=kpiById(t.kpi); if(!k) return ''; const st=statusOf(k); return `<div class="flex items-center justify-between text-xs py-1"><span>${esc(k.name)}</span><span class="text-slate-400">${fmt(k.value,k.unit)} / ${fmt(t.target,k.unit)}</span>${statusBadge(st)}</div>`;}).join('');
    const avgProg=p.initiatives.reduce((a,id)=>{const it=initById(id);return a+(it?it.progress:0);},0)/(p.initiatives.length||1);
    return `<div class="bg-slate-900/70 border border-slate-800 rounded-xl p-5">
      <div class="flex items-center justify-between mb-3"><h3 class="font-bold text-cyan-400">${esc(p.perspective)}</h3>
      <div class="text-2xl font-bold">${Math.round(avgProg)}%</div></div>
      <div class="w-full bg-slate-800 rounded-full h-2 mb-4"><div class="bg-cyan-500 h-2 rounded-full" style="width:${avgProg}%"></div></div>
      <div class="text-[10px] uppercase text-slate-500 mb-1">Linked Initiatives</div>${inits}
      <div class="text-[10px] uppercase text-slate-500 mt-3 mb-1">KPI Targets</div>${tgts}
      <button onclick="scorecardEdit(${pi})" class="mt-3 text-xs px-2 py-1 bg-slate-800 rounded">Edit perspective</button>
    </div>`;
  }).join('');
  return `<div class="space-y-4">
    <div class="flex items-center justify-between"><div><h2 class="text-lg font-bold">Balanced Scorecard</h2><p class="text-xs text-slate-400 mt-1">Combine strategic initiatives with 4 perspectives. Map initiatives to one or multiple perspectives.</p></div>
    <div class="flex gap-2">${helpBtn('scorecard')}<button onclick="setTab('impact')" class="px-3 py-2 bg-slate-800 rounded-lg text-xs border border-slate-700">Impact Map</button></div></div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">${persp}</div></div>`;
}
function scorecardEdit(pi){
  const p=S.scorecard[pi];
  const initChecks=S.initiatives.map(it=>`<label class="flex items-center gap-2 text-xs py-1"><input type="checkbox" ${p.initiatives.includes(it.id)?'checked':''} onchange="scorecardToggleInit(${pi},'${it.id}',this.checked)"> <span class="font-mono text-cyan-400">${it.id}</span> ${esc(it.title)}</label>`).join('');
  showModal('Edit Perspective — '+esc(p.perspective), `<div class="text-xs text-slate-400 mb-2">Map initiatives to this perspective:</div>${initChecks}
    <div class="mt-4"><button onclick="closeModal()" class="px-3 py-2 bg-slate-700 rounded-lg text-xs">Done</button></div>`);
}
function scorecardToggleInit(pi,id,on){ const p=S.scorecard[pi]; if(on){if(!p.initiatives.includes(id))p.initiatives.push(id);} else {p.initiatives=p.initiatives.filter(x=>x!==id);} persist(); scorecardEdit(pi); render(); }

/* ---------------- Module 4: OKR Management ---------------- */
function viewOkr(){
  const okr=S.okrs.map((o,oi)=>{
    const krs=o.keyResults.map((kr,ki)=>{
      const prog=kr.target===kr.baseline?0:Math.max(0,Math.min(100,Math.round((kr.current-kr.baseline)/(kr.target-kr.baseline)*100)));
      const k=kpiById(kr.kpi); const dir=k?k.direction:'higher'; const onTrack=(dir==='higher'?kr.current>=kr.target:kr.current<=kr.target);
      return `<div class="bg-slate-900 border border-slate-800 rounded-lg p-3">
        <div class="flex justify-between text-xs"><span class="font-mono text-cyan-400">${kr.id}</span><span>${prog}%</span></div>
        <div class="text-sm mt-1">${esc(kr.text)}</div>
        <div class="text-xs text-slate-500 mt-1">Baseline ${kr.baseline} → Current <b class="text-white">${kr.current}</b> → Target ${kr.target} ${k?('('+k.unit+')'):''}</div>
        <div class="w-full bg-slate-800 rounded-full h-1.5 mt-2"><div class="${onTrack?'bg-emerald-500':'bg-amber-500'} h-1.5 rounded-full" style="width:${prog}%"></div></div>
        <button onclick="okrEditKr(${oi},${ki})" class="mt-2 text-xs px-2 py-1 bg-slate-800 rounded">Edit</button>
      </div>`;
    }).join('');
    return `<div class="bg-slate-900/70 border border-slate-800 rounded-xl p-5">
      <div class="flex items-center justify-between"><div><span class="text-xs font-mono text-cyan-400">${o.id}</span><h3 class="font-bold mt-1">${esc(o.objective)}</h3></div>
      <button onclick="okrAddKr(${oi})" class="text-xs px-2 py-1 bg-cyan-700 text-white rounded">+ KR</button></div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">${krs}</div></div>`;
  }).join('');
  return `<div class="space-y-4">
    <div class="flex items-center justify-between"><div><h2 class="text-lg font-bold">OKR Management</h2><p class="text-xs text-slate-400 mt-1">Objectives & Key Results. Strategic areas & work packages contribute to Key Results. Progress auto-calculated.</p></div>
    <div class="flex gap-2">${helpBtn('okr')}<button onclick="okrAdd()" class="px-3 py-2 bg-cyan-600 text-white rounded-lg text-xs font-semibold">+ Objective</button></div></div>
    ${okr}</div>`;
}
function okrEditKr(oi,ki){ const kr=S.okrs[oi].keyResults[ki];
  showModal('Edit Key Result', `<label class="block text-xs text-slate-400 mb-1">Text<input id="okr-text" value="${esc(kr.text)}" class="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm"></label>
    <div class="grid grid-cols-3 gap-2">
      <label class="block text-xs text-slate-400">Baseline<input id="okr-base" type="number" value="${kr.baseline}" class="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-2 text-sm"></label>
      <label class="block text-xs text-slate-400">Current<input id="okr-cur" type="number" value="${kr.current}" class="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-2 text-sm"></label>
      <label class="block text-xs text-slate-400">Target<input id="okr-tgt" type="number" value="${kr.target}" class="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-2 text-sm"></label>
    </div>
    <label class="block text-xs text-slate-400 mt-2">Linked KPI<select id="okr-kpi" class="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm">${S.kpis.map(k=>`<option value="${k.id}" ${kr.kpi===k.id?'selected':''}>${esc(k.name)}</option>`).join('')}</select></label>
    <div class="mt-4 flex gap-2"><button onclick="okrSaveKr(${oi},${ki})" class="px-3 py-2 bg-cyan-600 text-white rounded-lg text-xs">Save</button><button onclick="okrDelKr(${oi},${ki})" class="px-3 py-2 bg-rose-700 rounded-lg text-xs">Delete</button><button onclick="closeModal()" class="px-3 py-2 bg-slate-700 rounded-lg text-xs">Cancel</button></div>`);
}
function okrSaveKr(oi,ki){ const kr=S.okrs[oi].keyResults[ki]; kr.text=$('okr-text').value; kr.baseline=Number($('okr-base').value); kr.current=Number($('okr-cur').value); kr.target=Number($('okr-tgt').value); kr.kpi=$('okr-kpi').value; persist(); closeModal(); render(); showToast('KR updated'); }
function okrDelKr(oi,ki){ S.okrs[oi].keyResults.splice(ki,1); persist(); closeModal(); render(); }
function okrAddKr(oi){ S.okrs[oi].keyResults.push({id:'KR-'+Date.now().toString().slice(-4),text:'New Key Result',kpi:S.kpis[0]?.id||'',baseline:0,target:100,current:0}); persist(); render(); }
function okrAdd(){ S.okrs.push({id:'OKR-'+Date.now().toString().slice(-4),objective:'New Objective',keyResults:[]}); persist(); render(); showToast('Objective added'); }

/* ---------------- Module 5: Value Realization Tracking ---------------- */
function viewValue(){
  const rows=S.valueRealization.map((v,i)=>{
    const rate=v.planned?Math.round(v.realized/v.planned*100):0;
    const gap=v.planned-v.realized;
    const light=rate>=80?'ok':rate>=40?'warn':'crit';
    const it=initById(v.id);
    return `<tr class="hover:bg-slate-900/50">
      <td class="py-3 px-4 font-mono text-cyan-400">${esc(v.id)}</td>
      <td class="py-3 px-4 font-semibold">${esc(it?it.title:v.title)}</td>
      <td class="py-3 px-4 text-right">€${v.planned}k</td>
      <td class="py-3 px-4 text-right text-emerald-400">€${v.realized}k</td>
      <td class="py-3 px-4 text-right text-rose-400">€${gap}k</td>
      <td class="py-3 px-4 text-center font-bold">${rate}%</td>
      <td class="py-3 px-4 text-center">${statusBadge(light)}</td>
      <td class="py-3 px-4"><div class="w-full bg-slate-800 rounded-full h-2"><div class="bg-${statusColor(light)}-500 h-2 rounded-full" style="width:${Math.min(100,rate)}%"></div></div></td>
      <td class="py-3 px-4 text-right"><button onclick="valueEdit(${i})" class="text-xs px-2 py-1 bg-slate-800 rounded">Edit</button></td>
    </tr>`;
  }).join('');
  const totPlanned=S.valueRealization.reduce((a,v)=>a+v.planned,0);
  const totReal=S.valueRealization.reduce((a,v)=>a+v.realized,0);
  const totRate=totPlanned?Math.round(totReal/totPlanned*100):0;
  return `<div class="space-y-4">
    <div class="flex items-center justify-between"><div><h2 class="text-lg font-bold">Value Realization Tracking</h2><p class="text-xs text-slate-400 mt-1">Business impact, not project completion. Planned vs realized benefits, gap, realization rate, traffic light.</p></div>
    ${helpBtn('value')}</div>
    <div class="grid grid-cols-3 gap-3"><div class="bg-slate-900 border border-slate-800 rounded-xl p-4"><div class="text-[10px] text-slate-500">Total Planned</div><div class="text-2xl font-bold">€${totPlanned}k</div></div>
    <div class="bg-slate-900 border border-slate-800 rounded-xl p-4"><div class="text-[10px] text-slate-500">Total Realized</div><div class="text-2xl font-bold text-emerald-400">€${totReal}k</div></div>
    <div class="bg-slate-900 border border-slate-800 rounded-xl p-4"><div class="text-[10px] text-slate-500">Realization Rate</div><div class="text-2xl font-bold text-cyan-400">${totRate}%</div></div></div>
    <div class="overflow-x-auto bg-slate-900/60 border border-slate-800 rounded-xl"><table class="w-full text-left text-xs"><thead><tr class="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase">
      <th class="py-3 px-4">ID</th><th class="py-3 px-4">Initiative</th><th class="py-3 px-4 text-right">Planned</th><th class="py-3 px-4 text-right">Realized</th><th class="py-3 px-4 text-right">Gap</th><th class="py-3 px-4 text-center">Rate</th><th class="py-3 px-4 text-center">Status</th><th class="py-3 px-4">Progress</th><th class="py-3 px-4 text-right">Action</th></tr></thead>
      <tbody class="divide-y divide-slate-800/70">${rows}</tbody></table></div></div>`;
}
function valueEdit(i){ const v=S.valueRealization[i];
  showModal('Edit Value — '+esc(v.id), `<div class="grid grid-cols-2 gap-3">
    <label class="block text-xs text-slate-400">Title<input id="v-title" value="${esc(v.title)}" class="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm"></label>
    <label class="block text-xs text-slate-400">Initiative ID<input id="v-id" value="${esc(v.id)}" class="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm"></label>
    <label class="block text-xs text-slate-400">Planned Benefits (k€)<input id="v-planned" type="number" value="${v.planned}" class="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm"></label>
    <label class="block text-xs text-slate-400">Realized Benefits (k€)<input id="v-realized" type="number" value="${v.realized}" class="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm"></label>
    </div><div class="mt-4 flex gap-2"><button onclick="valueSave(${i})" class="px-3 py-2 bg-cyan-600 text-white rounded-lg text-xs">Save</button><button onclick="closeModal()" class="px-3 py-2 bg-slate-700 rounded-lg text-xs">Cancel</button></div>`);
}
function valueSave(i){ const v=S.valueRealization[i]; v.title=$('v-title').value; v.id=$('v-id').value; v.planned=Number($('v-planned').value); v.realized=Number($('v-realized').value); persist(); closeModal(); render(); showToast('Value saved'); }

/* ---------------- Module 6: Production Risk Compass ---------------- */
const RISK_CATS=['Supplier Risks','Machine Availability','Quality Risks','Cyber Risks','People Risks','Customer Escalations'];
function viewRisk(){
  const cells=[];
  for(let p=1;p<=5;p++)for(let im=1;im<=5;im++)cells.push({p,im});
  const heat=cells.map(c=>{const n=S.risks.filter(r=>r.probability===c.p&&r.impact===c.im).length;const sev=c.p*c.im;const color=sev>=15?'bg-rose-600':sev>=8?'bg-amber-500':sev>=3?'bg-yellow-500/70':'bg-emerald-600/70';const names=S.risks.filter(r=>r.probability===c.p&&r.impact===c.im).map(r=>r.name).join(', ');return `<div title="${esc(names)}" class="${color} rounded text-[10px] flex items-center justify-center font-bold text-white/90 ${n?'ring-2 ring-white/30':''}">${n||''}</div>`;}).join('');
  const list=S.risks.map((r,i)=>{const sev=r.probability*r.impact;const res=sev<8?'ok':sev<15?'warn':'crit';
    return `<div class="bg-slate-900 border border-slate-800 rounded-xl p-4">
      <div class="flex justify-between"><span class="font-mono text-xs text-cyan-400">${esc(r.id)}</span>${statusBadge(res)}</div>
      <h4 class="font-semibold mt-1 text-sm">${esc(r.name)}</h4>
      <div class="text-xs text-slate-500 mt-1">${r.category}</div>
      <div class="grid grid-cols-2 gap-2 mt-3 text-xs">
        <div>Probability: <b class="text-white">${r.probability}/5</b></div><div>Impact: <b class="text-white">${r.impact}/5</b></div>
        <div>Residual: <b class="text-white">${r.residual}/5</b></div><div>Owner: ${esc(r.owner)}</div></div>
      <div class="text-xs text-slate-400 mt-2 border-t border-slate-800 pt-2"><b>Mitigation:</b> ${esc(r.mitigation)}</div>
      <button onclick="riskEdit(${i})" class="mt-2 text-xs px-2 py-1 bg-slate-800 rounded">Edit</button></div>`;
  }).join('');
  return `<div class="space-y-4">
    <div class="flex items-center justify-between"><div><h2 class="text-lg font-bold">Production Risk Compass</h2><p class="text-xs text-slate-400 mt-1">Probability × Impact heatmap. Categories: Supplier, Machine, Quality, Cyber, People, Customer Escalations.</p></div>
    <div class="flex gap-2">${helpBtn('risk')}<button onclick="riskAdd()" class="px-3 py-2 bg-cyan-600 text-white rounded-lg text-xs font-semibold">+ Add Risk</button>
    <button onclick="csvExport('risks.csv',S.risks)" class="px-3 py-2 bg-slate-800 rounded-lg text-xs border border-slate-700">CSV</button></div></div>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
        <h3 class="text-xs font-bold uppercase text-slate-400 mb-3">Heatmap (Probability × Impact)</h3>
        <div class="grid grid-cols-5 gap-1.5 w-48 mx-auto">${heat}</div>
        <div class="flex justify-between text-[10px] text-slate-500 mt-2 w-48 mx-auto"><span>Impact 1</span><span>5</span></div>
        <div class="text-[10px] text-slate-500 mt-3">Probability rows top→bottom 1→5. Cell color = severity (green→red).</div>
      </div>
      <div class="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-3">${list}</div>
    </div></div>`;
}
function riskEdit(i){ const r=S.risks[i];
  showModal('Edit Risk — '+esc(r.id), `<label class="block text-xs text-slate-400">Name<input id="r-name" value="${esc(r.name)}" class="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm"></label>
    <label class="block text-xs text-slate-400 mt-2">Category<select id="r-cat" class="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm">${RISK_CATS.map(c=>`<option ${r.category===c?'selected':''}>${c}</option>`).join('')}</select></label>
    <div class="grid grid-cols-3 gap-2 mt-2">
      <label class="block text-xs text-slate-400">Probability (1-5)<input id="r-prob" type="number" min="1" max="5" value="${r.probability}" class="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-2 text-sm"></label>
      <label class="block text-xs text-slate-400">Impact (1-5)<input id="r-imp" type="number" min="1" max="5" value="${r.impact}" class="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-2 text-sm"></label>
      <label class="block text-xs text-slate-400">Residual (1-5)<input id="r-res" type="number" min="1" max="5" value="${r.residual}" class="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-2 text-sm"></label></div>
    <label class="block text-xs text-slate-400 mt-2">Owner<input id="r-owner" value="${esc(r.owner)}" class="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm"></label>
    <label class="block text-xs text-slate-400 mt-2">Mitigation<input id="r-mit" value="${esc(r.mitigation)}" class="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm"></label>
    <div class="mt-4 flex gap-2"><button onclick="riskSave(${i})" class="px-3 py-2 bg-cyan-600 text-white rounded-lg text-xs">Save</button><button onclick="riskDelete(${i})" class="px-3 py-2 bg-rose-700 rounded-lg text-xs">Delete</button><button onclick="closeModal()" class="px-3 py-2 bg-slate-700 rounded-lg text-xs">Cancel</button></div>`);
}
function riskSave(i){ const r=S.risks[i]; r.name=$('r-name').value; r.category=$('r-cat').value; r.probability=Number($('r-prob').value); r.impact=Number($('r-imp').value); r.residual=Number($('r-res').value); r.owner=$('r-owner').value; r.mitigation=$('r-mit').value; persist(); closeModal(); render(); showToast('Risk saved'); }
function riskDelete(i){ if(!confirm('Delete risk?'))return; S.risks.splice(i,1); persist(); closeModal(); render(); }
function riskAdd(){ S.risks.push({id:'R-'+Date.now().toString().slice(-4),name:'New Risk',category:RISK_CATS[0],probability:3,impact:3,owner:'',mitigation:'',residual:3}); persist(); render(); showToast('Risk added'); }

/* ---------------- Module 7: Strategy Impact Map ---------------- */
function viewImpact(){
  const matrix=S.kpis.map(k=>{const inits=S.impactMap.filter(m=>m.impacts.includes(k.id)).map(m=>m.initiative);return {kpi:k,inits};});
  const grid=matrix.map(row=>{const cells=S.initiatives.map(it=>{const has=row.inits.includes(it.id);return `<td class="border border-slate-800 text-center ${has?'bg-cyan-600/30 text-cyan-300':'bg-slate-950'}">${has?'●':'·'}</td>`;}).join('');
    return `<tr><td class="py-2 px-3 text-xs font-semibold text-cyan-400 border border-slate-800">${esc(row.kpi.name)}</td>${cells}</tr>`;}).join('');
  const colHeads=S.initiatives.map(it=>`<th class="py-2 px-2 border border-slate-800 text-[10px] font-mono text-slate-400" title="${esc(it.title)}">${it.id}</th>`).join('');
  const detail=S.impactMap.map(m=>{const it=initById(m.initiative);const kpis=m.impacts.map(id=>kpiName(id)).join(', ');return `<div class="bg-slate-900 border border-slate-800 rounded-lg p-3"><div class="flex justify-between"><span class="font-mono text-cyan-400 text-xs">${m.initiative}</span><span class="text-[10px] text-slate-500">${esc(it?it.title:'')}</span></div><div class="text-xs mt-1"><b>Improves:</b> ${esc(kpis)}</div></div>`;}).join('');
  return `<div class="space-y-4">
    <div class="flex items-center justify-between"><div><h2 class="text-lg font-bold">Strategy Impact Map</h2><p class="text-xs text-slate-400 mt-1">Which initiative influences which KPI. Visual dependency mapping.</p></div>
    <div class="flex gap-2">${helpBtn('impact')}<button onclick="impactAdd()" class="px-3 py-2 bg-cyan-600 text-white rounded-lg text-xs font-semibold">+ Map</button></div></div>
    <div class="overflow-x-auto bg-slate-900/60 border border-slate-800 rounded-xl"><table class="border-collapse"><thead><tr><th class="py-2 px-3 border border-slate-800 text-[10px] uppercase text-slate-400">KPI \\ Initiative</th>${colHeads}</tr></thead><tbody>${grid}</tbody></table></div>
    <h3 class="text-xs font-bold uppercase text-slate-400 mt-2">Detail</h3><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">${detail}</div></div>`;
}
function impactAdd(){ const m={initiative:S.initiatives[0]?.id||'',impacts:[]};
  showModal('Add Impact Mapping', `<label class="block text-xs text-slate-400">Initiative<select id="im-init" class="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm">${S.initiatives.map(it=>`<option value="${it.id}">${it.id} — ${esc(it.title)}</option>`).join('')}</select></label>
    <div class="mt-2 text-xs text-slate-400">Improves KPIs:</div><div class="grid grid-cols-2 gap-1 mt-1">${S.kpis.map(k=>`<label class="text-xs flex items-center gap-2"><input type="checkbox" value="${k.id}"> ${esc(k.name)}</label>`).join('')}</div>
    <div class="mt-4 flex gap-2"><button onclick="impactSave()" class="px-3 py-2 bg-cyan-600 text-white rounded-lg text-xs">Save</button><button onclick="closeModal()" class="px-3 py-2 bg-slate-700 rounded-lg text-xs">Cancel</button></div>`);
  window.__im=m;
}
function impactSave(){ const m=window.__im; m.initiative=$('im-init').value; m.impacts=[...document.querySelectorAll('#modal-root input[type=checkbox]:checked')].map(c=>c.value); S.impactMap.push(m); persist(); closeModal(); render(); showToast('Impact mapping added'); }

/* ---------------- Module 8: KPI Dictionary ---------------- */
function viewDictionary(){
  const cards=S.kpis.map((k,i)=>{
    const tlogic=`${k.direction==='higher'?'≥ Target = On Target':'≤ Target = On Target'}; Warning: ${k.warning}; Critical: ${k.critical}`;
    return `<div class="bg-slate-900/70 border border-slate-800 rounded-xl p-5">
      <div class="flex justify-between"><h3 class="font-bold text-cyan-400">${esc(k.name)}</h3><span class="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">${k.frequency}</span></div>
      <div class="text-xs text-slate-400 mt-2 space-y-1.5">
        <div><span class="text-slate-500">Definition:</span> ${esc(k.definition)}</div>
        <div><span class="text-slate-500">Business Meaning:</span> ${esc(k.businessMeaning)}</div>
        <div><span class="text-slate-500">Formula:</span> <code class="bg-slate-950 px-1.5 py-0.5 rounded text-cyan-300">${esc(k.formula)}</code></div>
        <div><span class="text-slate-500">Target:</span> <b class="text-white">${fmt(k.target,k.unit)}</b></div>
        <div><span class="text-slate-500">Source:</span> ${esc(k.source)}</div>
        <div><span class="text-slate-500">Owner:</span> ${esc(k.owner)}</div>
        <div><span class="text-slate-500">Traffic Light Logic:</span> ${esc(tlogic)}</div>
      </div>
      <button onclick="setTab('kpi');setTimeout(()=>kpiEdit(${i}),50)" class="mt-3 text-xs px-2 py-1 bg-slate-800 rounded">Edit definition</button>
    </div>`;
  }).join('');
  return `<div class="space-y-4">
    <div class="flex items-center justify-between"><div><h2 class="text-lg font-bold">KPI Dictionary</h2><p class="text-xs text-slate-400 mt-1">Complete KPI reference library — definition, business meaning, formula, target, source, owner, frequency, traffic-light logic.</p></div>
    <div class="flex gap-2">${helpBtn('kpi')}<button onclick="csvExport('kpi_dictionary.csv',S.kpis)" class="px-3 py-2 bg-slate-800 rounded-lg text-xs border border-slate-700">CSV</button></div></div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">${cards}</div></div>`;
}

/* ---------------- Module 9: Presentation Mode ---------------- */
let presSlide=0;
function viewPresentation(){
  const slides=[
    {title:'Executive Summary',body:presSummary()},
    {title:'Strategy',body:presSection('strategy')},
    {title:'Operations',body:presSection('operations')},
    {title:'Finance',body:presSection('finance')},
    {title:'People',body:presSection('people')},
    {title:'Risk',body:presSection('risk')},
    {title:'OKR Progress',body:presOkr()},
    {title:'Value Realization',body:presValue()}
  ];
  const cur=slides[presSlide%slides.length];
  return `<div class="space-y-4">
    <div class="flex items-center justify-between"><h2 class="text-lg font-bold">Presentation Mode</h2>
      <div class="flex gap-2"><button onclick="presPrev()" class="px-3 py-2 bg-slate-800 rounded-lg text-xs">◀ Prev</button>
      <span class="text-xs text-slate-400 self-center">${(presSlide%slides.length)+1} / ${slides.length}</span>
      <button onclick="presNext(${slides.length})" class="px-3 py-2 bg-slate-800 rounded-lg text-xs">Next ▶</button>
      <button onclick="presSlide=0;render()" class="px-3 py-2 bg-slate-800 rounded-lg text-xs">Reset</button></div></div>
    <div class="bg-gradient-to-br from-slate-900 to-slate-950 border border-cyan-800/40 rounded-2xl p-10 min-h-[60vh] flex flex-col justify-center">
      <div class="text-cyan-400 text-sm font-bold uppercase tracking-widest mb-3">${esc(cur.title)}</div>
      <div class="text-4xl md:text-5xl font-bold leading-tight">${esc(cur.title)}</div>
      <div class="mt-8 text-xl md:text-2xl text-slate-300 leading-relaxed">${cur.body}</div>
    </div>
    <p class="text-xs text-slate-500 text-center">Use ◀ ▶ to navigate slides · Automatic status aggregation from live KPI data</p></div>`;
}
function presSummary(){
  const crit=S.kpis.filter(k=>statusOf(k)==='crit').length;
  const warn=S.kpis.filter(k=>statusOf(k)==='warn').length;
  const ok=S.kpis.filter(k=>statusOf(k)==='ok').length;
  return `<div class="space-y-3">
    <div>🟢 ${ok} KPIs on target · 🟡 ${warn} warning · 🔴 ${crit} critical</div>
    <div>Active initiatives: <b>${S.initiatives.filter(i=>i.status==='In Bearbeitung').length}</b></div>
    <div>Delayed: <b class="text-amber-400">${S.initiatives.filter(i=>i.delayed).length}</b> · Critical: <b class="text-rose-400">${S.initiatives.filter(i=>i.critical).length}</b></div>
    <div>Total expected benefits: <b>€${S.initiatives.reduce((a,i)=>a+(i.benefit||0),0)}k</b> · Realized: <b class="text-emerald-400">€${S.valueRealization.reduce((a,v)=>a+v.realized,0)}k</b></div>
  </div>`;
}
function presSection(sec){
  const cfg=S.executiveConfig.sections.find(s=>s.id===sec);
  if(!cfg) return '';
  return cfg.kpis.map(kid=>{const v=execMetric(kid),st=execMetricStatus(kid);const isMoney=kid==='totalBenefits';return `<div class="flex items-center justify-between border-b border-slate-800 py-3"><span>${esc(execMetricLabel(kid))}</span><span class="font-bold ${st==='ok'?'text-emerald-400':st==='warn'?'text-amber-400':'text-rose-400'}">${isMoney?('€'+v):fmt(v,kpiUnit(kid))}</span></div>`;}).join('');
}
function presOkr(){
  return S.okrs.map(o=>{const prog=o.keyResults.map(kr=>{const p=kr.target===kr.baseline?0:Math.round((kr.current-kr.baseline)/(kr.target-kr.baseline)*100);return `<div>${esc(kr.text)}: <b>${Math.max(0,Math.min(100,p))}%</b></div>`;}).join('');return `<div class="mb-4"><div class="text-cyan-300 font-bold">${esc(o.objective)}</div>${prog}</div>`;}).join('');
}
function presValue(){
  return S.valueRealization.map(v=>{const rate=v.planned?Math.round(v.realized/v.planned*100):0;return `<div class="flex justify-between border-b border-slate-800 py-2"><span>${esc(v.id)} ${esc(v.title)}</span><span>${rate}% (€${v.realized}k / €${v.planned}k)</span></div>`;}).join('');
}

function presPrev(){ if(presSlide>0) presSlide--; render(); }
function presNext(n){ presSlide=(presSlide+1)%n; render(); }

/* ---------------- Module 10: Integrated User Guide ---------------- */
function viewGuide(){
  const topics=[
    {id:'executive',t:'Executive Dashboard',b:'30-second overview with 5 sections (Strategy, Operations, Finance, People, Risk). Every KPI can be enabled, disabled, reordered and customized via "Customize KPIs". Manual entry first, API-ready for ERP/MES/Power BI. Best practice: keep only the 8–12 KPIs you actually review weekly.'},
    {id:'kpi',t:'KPI Engine & KPI Dictionary',b:'Each KPI supports: manual entry, future API source, formula, owner, update frequency (Daily/Weekly/Monthly/Quarterly), unit, target, warning & critical thresholds, plus historical trending. The Dictionary documents every KPI (definition, business meaning, formula, source, traffic-light logic).'},
    {id:'scorecard',t:'Balanced Scorecard',b:'Four perspectives: Finance, Customer, Internal Processes, People & Learning. Map initiatives to one or multiple perspectives via "Edit perspective". Progress shown per perspective.'},
    {id:'okr',t:'OKR Management',b:'Objectives contain Key Results. Each KR links to a KPI; progress auto-calculates from baseline → current → target. Example Objective: "Become the most reliable production organization" with KRs OTD 92→97%, Lead Time -30%, OEE +10%, Scrap -20%.'},
    {id:'risk',t:'Risk Management',b:'Production Risk Compass: 6 categories (Supplier, Machine, Quality, Cyber, People, Customer Escalations). Each risk has Probability, Impact, Owner, Mitigation, Residual. Heatmap visualizes severity (green→red).'},
    {id:'value',t:'Value Realization',b:'Per initiative: Planned vs Realized benefits, Gap, Realization Rate %, traffic-light. Focus on real business impact, not project completion.'},
    {id:'impact',t:'Strategy Impact Map',b:'Shows which initiative influences which KPI (e.g. SH-17 improves OTD, Lead Time, Supplier Risk, Inventory). Use for dependency mapping and prioritization.'},
    {id:'strategy',t:'Strategic Areas (SH) & Wardley Maps',b:'Strategic Areas (SH-01…) are the top-level transformation initiatives. Wardley Maps position them along an evolution axis (Genesis → Custom → Product → Commodity) to plan maturity shifts.'},
    {id:'wardley',t:'Wardley Maps',b:'A Wardley Map plots components by visibility (y) and evolution (x). It reveals what to commoditize, what to build custom, and where strategic improvement levers sit. Operational steps anchor the flow; strategic levers drive evolution.'},
    {id:'reports',t:'Operational Reports',b:'Future report placeholders (Production Performance, Daily Management, OEE, Capacity, Supplier, Inventory, Quality, Financial). Each supports manual data entry and historical tracking from day one — ready for later ERP/MES integration.'},
    {id:'maturity',t:'Maturity Journey',b:'Manual → Semi-Automated → Fully Automated. Start with manual entry; the data model is already structured so future REST/ERP/MES/D365/Excel/Google Sheets integrations can plug in without redesigning screens.'}
  ];
  const cards=topics.map(tp=>`<div id="guide-${tp.id}" class="bg-slate-900/70 border border-slate-800 rounded-xl p-5 scroll-mt-20">
    <h3 class="font-bold text-cyan-400">${esc(tp.t)}</h3><p class="text-xs text-slate-400 mt-2 leading-relaxed">${esc(tp.b)}</p></div>`).join('');
  return `<div class="space-y-4">
    <div class="flex items-center justify-between"><div><h2 class="text-lg font-bold">Integrated User Guide</h2><p class="text-xs text-slate-400 mt-1">Built-in handbook. Accessible from every screen via the "? Help" button.</p></div>
    <button onclick="setTab('executive')" class="px-3 py-2 bg-slate-800 rounded-lg text-xs">← Back to Dashboard</button></div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">${cards}</div></div>`;
}

/* ---------------- Operational Reports (placeholders, manual entry) ---------------- */
function viewReports(){
  const cards=S.reports.map((r,i)=>{const n=r.entries.length;
    const latest=r.entries.length?r.entries[r.entries.length-1]:null;
    return `<div class="bg-slate-900/70 border border-slate-800 rounded-xl p-5">
      <div class="flex justify-between"><h3 class="font-bold">${esc(r.name)}</h3><span class="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">${n} entries</span></div>
      ${latest?`<div class="text-xs text-slate-400 mt-2">Latest: <b class="text-white">${esc(latest.date)}</b> — ${esc(latest.note)}</div>`:`<div class="text-xs text-slate-600 mt-2 italic">No entries yet — ready for manual entry & historical tracking</div>`}
      <div class="flex gap-2 mt-3"><button onclick="reportAddEntry(${i})" class="text-xs px-2 py-1 bg-cyan-700 text-white rounded">+ Add Entry</button>
      <button onclick="reportView(${i})" class="text-xs px-2 py-1 bg-slate-800 rounded">View history</button></div>
    </div>`;}).join('');
  return `<div class="space-y-4">
    <div class="flex items-center justify-between"><div><h2 class="text-lg font-bold">Operational Reports (placeholders)</h2><p class="text-xs text-slate-400 mt-1">Data structures ready for future ERP/MES integration. Manual entry & historical tracking from day one.</p></div>
    ${helpBtn('reports')}</div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">${cards}</div></div>`;
}
function reportAddEntry(i){
  showModal('Add Entry — '+esc(S.reports[i].name), `<label class="block text-xs text-slate-400">Date<input id="re-date" type="date" value="${new Date().toISOString().slice(0,10)}" class="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm"></label>
    <label class="block text-xs text-slate-400 mt-2">Note / Value (manual)<textarea id="re-note" class="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm" rows="3"></textarea></label>
    <div class="mt-4 flex gap-2"><button onclick="reportSaveEntry(${i})" class="px-3 py-2 bg-cyan-600 text-white rounded-lg text-xs">Save</button><button onclick="closeModal()" class="px-3 py-2 bg-slate-700 rounded-lg text-xs">Cancel</button></div>`);
}
function reportSaveEntry(i){ S.reports[i].entries.push({date:$('re-date').value,note:$('re-note').value}); persist(); closeModal(); render(); showToast('Entry added'); }
function reportView(i){ const r=S.reports[i];
  const list=r.entries.length?r.entries.map(e=>`<div class="text-xs border-b border-slate-800 py-2"><b>${esc(e.date)}</b> — ${esc(e.note)}</div>`).join(''):'<div class="text-xs text-slate-600 italic">No entries yet.</div>';
  showModal('History — '+esc(r.name), list+'<div class="mt-4"><button onclick="closeModal()" class="px-3 py-2 bg-slate-700 rounded-lg text-xs">Close</button></div>');
}

/* ---------------- Render entry ---------------- */
function render(){ document.getElementById('app').innerHTML=shell(); }
window.addEventListener('DOMContentLoaded', ()=>{ render(); });
