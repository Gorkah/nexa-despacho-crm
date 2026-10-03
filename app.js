(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const eur = (n, d = 2) => {
    const [i, f] = Math.abs(n).toFixed(d).split(".");
    return (n < 0 ? "−" : "") + i.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + (f ? "," + f : "") + " €";
  };
  const num = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  /* ------------------------------------------------------------------ icons */
  const I = {
    home: '<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
    inbox: '<path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',
    help: '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/>',
    tasks: '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2M12 11h4M12 16h4M8 11h.01M8 16h.01"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    chat: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
    send: '<path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
    upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>',
    bank: '<path d="M3 22h18M6 18v-7M10 18v-7M14 18v-7M18 18v-7M12 2l9 5H3z"/>',
    chart: '<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68 1.65 1.65 0 0 0 10 3.17V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
    import: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M12 18v-6M9 15l3 3 3-3"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    checks: '<path d="M18 6 7 17l-5-5M22 10l-7.5 7.5L13 16"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    sparkles: '<path d="M12 3l1.9 5.8L20 10l-6.1 1.2L12 17l-1.9-5.8L4 10l6.1-1.2z"/><path d="M19 15l.6 1.9 1.9.6-1.9.6L19 20l-.6-1.9-1.9-.6 1.9-.6z"/>',
    alert: '<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0zM12 9v4M12 17h.01"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
    whatsapp: '<path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9z"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',
    fileText: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>',
    image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/>',
    chevronRight: '<path d="m9 18 6-6-6-6"/>',
    chevronLeft: '<path d="m15 18-6-6 6-6"/>',
    chevronDown: '<path d="m6 9 6 6 6-6"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    filter: '<path d="M22 3H2l8 9.46V19l4 2v-8.54z"/>',
    zoom: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3M11 8v6M8 11h6"/>',
    rotate: '<path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><path d="M21 3v5h-5"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
    logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    edit: '<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    menu: '<path d="M3 12h18M3 6h18M3 18h18"/>',
    more: '<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
    zap: '<path d="M13 2 3 14h9l-1 8 10-12h-9z"/>',
    trending: '<path d="m22 7-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/>',
    euro: '<path d="M4 10h12M4 14h9M19 6a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12c0 4.4 3.5 8 7.8 8 2 0 3.8-.8 5.2-2"/>',
    layers: '<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/>',
    paperclip: '<path d="m21.4 11.1-9.2 9.2a6 6 0 0 1-8.5-8.5l9.2-9.2a4 4 0 0 1 5.7 5.7l-9.2 9.2a2 2 0 0 1-2.8-2.8l8.5-8.5"/>',
    lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    refresh: '<path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5"/>',
    plug: '<path d="M12 22v-5M9 8V2M15 8V2M18 8v5a6 6 0 0 1-12 0V8z"/>',
    target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    archive: '<rect x="2" y="3" width="20" height="5" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8M10 12h4"/>',
    copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
    building: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  };
  const svg = (n) => `<svg viewBox="0 0 24 24" aria-hidden="true">${I[n] || ""}</svg>`;
  const ic = (n, cls = "") => `<i class="ico ${cls}">${svg(n)}</i>`;
  const hydrate = (root = document) => $$("[data-i]", root).forEach((el) => { if (!el.innerHTML) el.innerHTML = svg(el.dataset.i); });

  document.body.insertAdjacentHTML("afterbegin", `<svg width="0" height="0" style="position:absolute"><defs>
    <linearGradient id="g-ring" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#22e3f2"/><stop offset="1" stop-color="#3b82f6"/></linearGradient>
    <linearGradient id="g-line" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#06b6d4"/><stop offset="1" stop-color="#2563eb"/></linearGradient>
    <linearGradient id="g-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#22e3f2" stop-opacity=".28"/><stop offset="1" stop-color="#22e3f2" stop-opacity="0"/></linearGradient>
    <linearGradient id="g-spark" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#22e3f2" stop-opacity=".3"/><stop offset="1" stop-color="#22e3f2" stop-opacity="0"/></linearGradient>
    <linearGradient id="g-bar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#22d3ee"/><stop offset="1" stop-color="#2563eb"/></linearGradient>
  </defs></svg>`);

  /* ------------------------------------------------------------------- data */
  const TEC = {
    LG: { n: "Laura Garriga", c: "#06b6d4", rol: "Responsable" },
    MP: { n: "Marc Puig", c: "#6366f1", rol: "Técnico" },
    NS: { n: "Núria Soler", c: "#f59e0b", rol: "Técnica" },
    JV: { n: "Jordi Vidal", c: "#10b981", rol: "Técnico" },
  };
  const av = (k, cls = "") => `<span class="av ${cls}" style="--c:${TEC[k].c}" title="${TEC[k].n}">${k}</span>`;
  const initials = (s) => s.replace(/,.*$/, "").split(/\s+/).filter((w) => /^[A-ZÀ-Ú]/.test(w)).slice(0, 2).map((w) => w[0]).join("");
  const colors = ["#0891b2", "#2563eb", "#7c3aed", "#db2777", "#ea580c", "#059669", "#0d9488", "#4f46e5"];
  const cav = (c, cls = "") => `<span class="av ${cls}" style="--c:${colors[c.id % colors.length]}">${initials(c.n)}</span>`;

  const CLI = [
    { id: 1, n: "Talleres Puig, SL", nif: "B65432187", tipo: "Sociedad", t: "MP", pct: 60, pend: ["3 tickets", "Extracto Sabadell"], av: 4, avEst: "leido", dias: 4, est: "curso", canal: "whatsapp", idi: "es", per: "Trimestral", vf: "en_proceso", tel: "+34 612 445 901" },
    { id: 2, n: "Marta Soler Ribas", nif: "47821563K", tipo: "Autónoma", t: "LG", pct: 100, pend: [], av: 1, avEst: "leido", dias: 4, est: "ok", canal: "whatsapp", idi: "ca", per: "Trimestral", vf: "adaptado", tel: "+34 655 120 334" },
    { id: 3, n: "Construccions Vall, SL", nif: "B17283946", tipo: "Sociedad", t: "MP", pct: 40, pend: ["Facturas emitidas", "Extracto BBVA"], av: 4, avEst: "entregado", dias: 4, est: "curso", canal: "email", idi: "ca", per: "Trimestral", vf: "sin_adaptar", tel: "+34 972 210 554" },
    { id: 4, n: "Bar Ca l'Anna", nif: "38912475P", tipo: "Autónomo", t: "NS", pct: 0, pend: ["Facturas recibidas", "Tickets", "Extracto CaixaBank"], av: 4, avEst: "entregado", dias: 4, est: "sin", canal: "whatsapp", idi: "ca", per: "Trimestral", vf: "desconocido", tel: "+34 690 334 012" },
    { id: 5, n: "Dental Sarrià, SLP", nif: "B66123987", tipo: "Sociedad", t: "LG", pct: 100, pend: [], av: 2, avEst: "leido", dias: 4, est: "ok", canal: "email", idi: "es", per: "Trimestral", vf: "adaptado", tel: "+34 932 040 118" },
    { id: 6, n: "Distribucions Ebre, SA", nif: "A43219876", tipo: "Sociedad", t: "JV", pct: 75, pend: ["Extracto Santander"], av: 3, avEst: "leido", dias: 4, est: "curso", canal: "whatsapp", idi: "es", per: "Mensual", vf: "adaptado", tel: "+34 977 551 230" },
    { id: 7, n: "Fusteria Ripoll, SL", nif: "B55667788", tipo: "Sociedad", t: "NS", pct: 20, pend: ["Facturas recibidas", "Tickets", "Extracto Sabadell"], av: 4, avEst: "enviado", dias: 4, est: "ext", canal: "whatsapp", idi: "ca", per: "Trimestral", vf: "sin_adaptar", tel: "+34 619 778 201" },
    { id: 8, n: "Arquitectura Mas i Font, SLP", nif: "B62918374", tipo: "Sociedad", t: "LG", pct: 90, pend: ["Tickets"], av: 3, avEst: "leido", dias: 4, est: "curso", canal: "email", idi: "ca", per: "Trimestral", vf: "en_proceso", tel: "+34 933 118 420" },
    { id: 9, n: "Botiga Andorra, SL", nif: "L712345B", tipo: "Sociedad · AD", t: "JV", pct: 100, pend: [], av: 1, avEst: "leido", dias: 4, est: "ok", canal: "whatsapp", idi: "ca", per: "Trimestral · IGI", vf: "no_aplica", tel: "+376 812 345" },
    { id: 10, n: "Jordi Camps Vidal", nif: "39184726M", tipo: "Autónomo", t: "LG", pct: 85, pend: ["2 tickets gasolina"], av: 3, avEst: "leido", dias: 4, est: "curso", canal: "whatsapp", idi: "es", per: "Trimestral", vf: "adaptado", tel: "+34 644 902 117" },
    { id: 11, n: "Pintures Montseny, SL", nif: "B08876543", tipo: "Sociedad", t: "MP", pct: 100, pend: [], av: 4, avEst: "leido", dias: 4, est: "ext", canal: "email", idi: "es", per: "Trimestral", vf: "en_proceso", tel: "+34 938 441 009" },
    { id: 12, n: "Clínica Vet Gràcia, SLP", nif: "B67012399", tipo: "Sociedad", t: "JV", pct: 50, pend: ["Facturas recibidas", "Extracto ING"], av: 3, avEst: "leido", dias: 4, est: "curso", canal: "whatsapp", idi: "es", per: "Trimestral", vf: "adaptado", tel: "+34 628 115 730" },
  ];
  const cli = (id) => CLI.find((c) => c.id === +id) || CLI[0];
  const EST = { ok: ["Completo", "t-ok"], curso: ["En curso", "t-info"], sin: ["Sin respuesta", "t-bad"], ext: ["Extemporáneo", "t-warn"] };
  const VF = { adaptado: ["Adaptado", "t-ok"], en_proceso: ["En proceso", "t-warn"], sin_adaptar: ["Sin adaptar", "t-bad"], no_aplica: ["No aplica", "t-mute"], desconocido: ["Desconocido", "t-mute"] };

  const PROP = [
    { id: 1042, c: 2, prov: "Endesa Energía, SAU", nif: "A81948077", num: "PMR509N0045021", fecha: "23/09/2026", total: 498.88, cta: "628", ctaN: "Suministros", conf: "alta", mot: [], src: "whatsapp", q: 97 },
    { id: 1043, c: 10, prov: "Repsol Estación 4312", nif: "A28047223", num: "T-88412", fecha: "18/09/2026", total: 62.4, cta: "628", ctaN: "Combustible", conf: "revisar", mot: ["Ticket"], src: "whatsapp", q: 81 },
    { id: 1044, c: 1, prov: "Amazon EU SARL", nif: "LU26375245", num: "ES6FYK2A1AEUI", fecha: "11/09/2026", total: 149.99, cta: "602", ctaN: "Otros aprov.", conf: "revisar", mot: ["Intracomunitaria"], src: "email", q: 88 },
    { id: 1045, c: 5, prov: "Vodafone España, SAU", nif: "A80907397", num: "VF-26-0918221", fecha: "01/09/2026", total: 72.6, cta: "629", ctaN: "Comunicaciones", conf: "alta", mot: [], src: "email", q: 99 },
    { id: 1046, c: 8, prov: "Gestió Integral Vallès, SL", nif: "B66551209", num: "2026/0412", fecha: "29/09/2026", total: 1815.0, cta: "623", ctaN: "Serv. profesionales", conf: "revisar", mot: ["Proveedor nuevo"], src: "email", q: 76 },
    { id: 1047, c: 6, prov: "Makro Autoservicio Mayorista", nif: "A28647451", num: "0412/88123", fecha: "27/09/2026", total: 2374.18, cta: "600", ctaN: "Compras", conf: "alta", mot: [], src: "whatsapp", q: 96 },
    { id: 1048, c: 3, prov: "Fontaneria Bosch, SL", nif: "B17998812", num: "F-2026-188", fecha: "22/09/2026", total: 3630.0, cta: "607", ctaN: "Trabajos otras emp.", conf: "revisar", mot: ["Posible ISP"], src: "email", q: 84 },
    { id: 1049, c: 12, prov: "Iberdrola Clientes, SAU", nif: "A95758389", num: "21260918003341", fecha: "18/09/2026", total: 312.47, cta: "628", ctaN: "Suministros", conf: "alta", mot: [], src: "whatsapp", q: 98 },
    { id: 1050, c: 1, prov: "Mutua Universal", nif: "G08166812", num: "MU-55120", fecha: "30/09/2026", total: 96.0, cta: "625", ctaN: "Primas de seguros", conf: "alta", mot: [], src: "whatsapp", q: 95 },
    { id: 1051, c: 8, prov: "Google Ireland Ltd", nif: "IE6388047V", num: "5287766123", fecha: "30/09/2026", total: 11.5, cta: "629", ctaN: "Comunicaciones", conf: "revisar", mot: ["Intracomunitaria", "ISP"], src: "email", q: 91 },
    { id: 1052, c: 10, prov: "Telefónica de España, SAU", nif: "A82018474", num: "TA6CZ0145521", fecha: "05/09/2026", total: 54.45, cta: "629", ctaN: "Comunicaciones", conf: "alta", mot: [], src: "whatsapp", q: 99 },
    { id: 1053, c: 6, prov: "Material Oficina Barna, SL", nif: "B63320198", num: "MOB-7781", fecha: "14/09/2026", total: 233.1, cta: "629", ctaN: "Material oficina", conf: "revisar", mot: ["No cuadra 1,00 €"], src: "email", q: 72 },
    { id: 1054, c: 12, prov: "Correos y Telégrafos, SA", nif: "A83052407", num: "CX-2026-99812", fecha: "21/09/2026", total: 18.9, cta: "629", ctaN: "Otros servicios", conf: "alta", mot: [], src: "whatsapp", q: 94 },
    { id: 1055, c: 2, prov: "Holded Technologies, SL", nif: "B66465870", num: "HLD-2026-55120", fecha: "01/09/2026", total: 36.3, cta: "629", ctaN: "Software", conf: "alta", mot: [], src: "email", q: 99 },
    { id: 1056, c: 3, prov: "Bricomart, SAU", nif: "A84406289", num: "TK 0021-3381", fecha: "12/09/2026", total: 87.35, cta: "602", ctaN: "Otros aprov.", conf: "revisar", mot: ["Ticket"], src: "whatsapp", q: 79 },
    { id: 1057, c: 5, prov: "Henry Schein España, SA", nif: "A28779411", num: "HS-910233", fecha: "19/09/2026", total: 1288.0, cta: "600", ctaN: "Compras", conf: "alta", mot: [], src: "email", q: 97 },
  ];
  const prop = (id) => PROP.find((p) => p.id === +id) || PROP[0];

  const CONV = [
    { id: 1, c: 4, est: "escalada", motivo: "Requerimiento de Hacienda", last: "M'ha arribat una carta d'Hisenda, què faig?", t: "10:42", unread: 2,
      msgs: [
        ["day", "Ayer"],
        ["bot", "Bon dia Anna! Soc l'assistent automàtic de Garriga & Associats. Us falten les factures rebudes, els tiquets i l'extracte de CaixaBank del 3T.", "18:02"],
        ["in", "D'acord, demà us ho envio", "18:40"],
        ["day", "Hoy"],
        ["in", "M'ha arribat una carta d'Hisenda, què faig?", "10:41"],
        ["file", "carta_AEAT.jpg", "10:41"],
        ["sys", "Escalado a Laura Garriga · palabra clave «Hisenda» + documento de la AEAT"],
        ["bot", "Gràcies, Anna. Ho passo ara mateix a la Laura, que t'escriurà avui mateix.", "10:42"],
      ],
      resumen: "La clienta ha recibido una carta de la AEAT (foto adjunta, parece un requerimiento de información del modelo 303 del 2T). Sigue sin enviar la documentación del 3T: faltan facturas recibidas, tickets y extracto de CaixaBank." },
    { id: 2, c: 7, est: "escalada", motivo: "Criterio fiscal", last: "Em puc desgravar la furgoneta nova?", t: "09:15", unread: 1,
      msgs: [["day", "Hoy"], ["in", "Em puc desgravar la furgoneta nova? L'he comprat aquest mes", "09:14"], ["sys", "Escalado a Núria Soler · consulta de criterio fiscal"], ["bot", "Bona pregunta! Això ho ha de mirar la Núria amb detall. Li passo i et respon ella.", "09:15"]],
      resumen: "Pregunta por la deducibilidad de una furgoneta comprada en octubre (afecta al 4T). Requiere criterio: uso exclusivo de la actividad, IVA e amortización." },
    { id: 3, c: 10, est: "bot", last: "Perfecto, os los mando ahora", t: "08:51", unread: 0,
      msgs: [["day", "Hoy"], ["in", "Hola, ¿me falta algo para el trimestre?", "08:47"], ["bot", "Hola Jordi. Solo nos faltan 2 tickets de gasolina de septiembre. Puedes mandarlos por aquí mismo.", "08:47"], ["in", "Perfecto, os los mando ahora", "08:51"]] },
    { id: 4, c: 2, est: "bot", last: "Moltes gràcies!", t: "Ayer", unread: 0,
      msgs: [["day", "Ayer"], ["in", "Quan es presenta l'IVA?", "17:20"], ["bot", "El model 303 del 3T es presenta abans del 20 d'octubre. La teva documentació ja està completa.", "17:20"], ["in", "Moltes gràcies!", "17:21"]] },
    { id: 5, c: 1, est: "bot", last: "📎 3 imágenes", t: "Ayer", unread: 0,
      msgs: [["day", "Ayer"], ["file", "IMG_2041.jpg", "12:03"], ["file", "IMG_2042.jpg", "12:03"], ["file", "IMG_2043.jpg", "12:03"], ["bot", "Recibido: 3 facturas de proveedor. Sigue pendiente: 3 tickets y el extracto del Sabadell.", "12:05"]] },
    { id: 6, c: 5, est: "cerrada", last: "Gracias, Laura", t: "Lun", unread: 0,
      msgs: [["day", "Lunes"], ["in", "¿Podéis mandarme el resumen del IVA del trimestre?", "10:02"], ["sys", "Escalado a Laura Garriga · petición de informe"], ["tec", "Hola Carme, te lo envío por email esta tarde.", "11:30"], ["in", "Gracias, Laura", "11:31"]] },
  ];

  const TASKS = [
    { col: "hoy", tipo: "llamar", c: 4, txt: "Llamar: 4 avisos sin respuesta y requerimiento AEAT", due: "Hoy", t: "NS", pri: "alta" },
    { col: "hoy", tipo: "escalado", c: 4, txt: "Responder consulta escalada (carta de Hisenda)", due: "Hoy 14:00", t: "LG", pri: "alta" },
    { col: "hoy", tipo: "llamar", c: 7, txt: "Llamar: falta toda la documentación del 3T", due: "Hoy", t: "NS", pri: "alta" },
    { col: "hoy", tipo: "asignar", c: null, txt: "Asignar documento de +34 611 902 448 (no registrado)", due: "Hoy", t: "LG", pri: "media" },
    { col: "semana", tipo: "fallo", c: 3, txt: "Email de aviso 4 rebotado: buzón lleno", due: "Lun 19", t: "MP", pri: "media" },
    { col: "semana", tipo: "ext", c: 11, txt: "Entrega extemporánea registrada el 15/10 · revisar recargo", due: "Lun 19", t: "MP", pri: "media" },
    { col: "semana", tipo: "escalado", c: 7, txt: "Responder: deducción de furgoneta", due: "Mar 20", t: "NS", pri: "baja" },
    { col: "hecho", tipo: "llamar", c: 6, txt: "Llamada hecha: envía extracto Santander el lunes", due: "Ayer", t: "JV", pri: "baja" },
    { col: "hecho", tipo: "asignar", c: 8, txt: "Documento asignado a Arquitectura Mas i Font", due: "Ayer", t: "LG", pri: "baja" },
  ];
  const TT = { llamar: ["phone", "bg-info", "Llamar"], escalado: ["chat", "bg-violet", "Consulta escalada"], asignar: ["help", "bg-warn", "Asignar documento"], fallo: ["alert", "bg-bad", "Fallo de envío"], ext: ["clock", "bg-warn", "Extemporáneo"] };

  const ROUTES_META = [
    ["Trabajo", [["panel", "Panel", "home"], ["bandeja", "Bandeja", "inbox", "128"], ["sin-asignar", "Sin asignar", "help", "5", true], ["tareas", "Tareas", "tasks", "7"]]],
    ["Clientes", [["clientes", "Cartera", "users"], ["conversaciones", "Conversaciones", "chat", "3", true], ["avisos", "Avisos", "send", "2"]]],
    ["Contabilidad", [["exportaciones", "Exportaciones", "download"], ["conciliacion", "Conciliación", "bank"]]],
    ["Análisis", [["metricas", "Métricas", "chart"]]],
    ["Sistema", [["config", "Configuración", "settings"], ["importar", "Importar cartera", "import"]]],
  ];

  /* --------------------------------------------------------------- helpers */
  const ph = ({ crumb, title, sub, actions = "" }) => `<div class="ph"><div>${crumb ? `<div class="ph__crumb">${crumb}</div>` : ""}<h1>${title}</h1>${sub ? `<p>${sub}</p>` : ""}</div><div class="ph__actions">${actions}</div></div>`;
  const kpi = ({ label, icon, val, unit = "", delta, up = true, spark }) => `<div class="card kpi"><div class="kpi__label"><span class="kpi__ic">${ic(icon)}</span>${label}</div><div class="kpi__val">${val}${unit ? `<small>${unit}</small>` : ""}</div>${delta ? `<span class="kpi__delta ${up ? "up" : "down"}">${ic(up ? "trending" : "chevronDown", "ico--sm")} ${delta}</span>` : ""}${spark ? sparkline(spark) : ""}</div>`;
  const sparkline = (v) => {
    const w = 96, h = 36, max = Math.max(...v), min = Math.min(...v);
    const pts = v.map((y, i) => [(i / (v.length - 1)) * w, h - 4 - ((y - min) / (max - min || 1)) * (h - 8)]);
    const d = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join("");
    return `<svg class="kpi__spark" viewBox="0 0 ${w} ${h}"><path class="area" d="${d}L${w},${h}L0,${h}Z"/><path d="${d}"/></svg>`;
  };
  const prog = (p, cls = "") => `<div class="prog"><div class="prog__bar ${p === 100 ? "ok" : p < 30 ? "bad" : cls}"><i style="--p:${p}%"></i></div><b>${p}%</b></div>`;
  const tag = ([t, c], plain) => `<span class="tag ${c} ${plain ? "tag--plain" : ""}">${t}</span>`;
  const ticks = (e) => e === "leido" ? `<span style="color:#0891b2">${ic("checks", "ico--sm")}</span>` : e === "entregado" ? `<span class="faint">${ic("checks", "ico--sm")}</span>` : `<span class="faint">${ic("check", "ico--sm")}</span>`;
  const srcIc = (s) => s === "whatsapp" ? `<span class="lrow__ic bg-ok" style="width:28px;height:28px">${ic("whatsapp", "ico--sm")}</span>` : `<span class="lrow__ic bg-info" style="width:28px;height:28px">${ic("mail", "ico--sm")}</span>`;
  const confTag = (p) => p.conf === "alta" ? `<span class="tag t-ok">Alta · ${p.q}%</span>` : `<span class="tag t-warn">Revisar · ${p.q}%</span>`;

  /* ------------------------------------------------------------------ views */
  const V = {};

  V.panel = () => {
    const pct = 71;
    const C = 2 * Math.PI * 52;
    return `
    ${ph({ title: "Buenos días, Laura", sub: "Escenario de demo · 16 de octubre de 2026 · cierre del 3T", actions: `<div class="seg"><button class="is-on">Todo el despacho</button><button>Mi cartera</button></div><button class="btn btn--ghost btn--sm" data-toast="Informe del trimestre generado en PDF">${ic("download")} Informe</button>` })}
    <section class="hero">
      <div style="position:relative;z-index:1">
        <span class="hero__kicker">Cierre 3T 2026 · el 20 de octubre</span>
        <h2>Faltan 4 días y el 71 % de la cartera ya está completa.</h2>
        <p>Nexa ha enviado 1.284 avisos y procesado 3.917 documentos este trimestre. Quedan 45 clientes sin respuesta: la lista de llamadas ya está priorizada por riesgo.</p>
        <div class="hero__actions"><a href="#/tareas" class="btn btn--primary">${ic("phone")} Lista de llamadas</a><a href="#/bandeja" class="btn btn--ghost">${ic("inbox")} Validar 128 propuestas</a></div>
      </div>
      <div class="hero__stats">
        <div class="ring"><svg width="128" height="128"><circle class="bg" cx="64" cy="64" r="52"/><circle class="fg" cx="64" cy="64" r="52" stroke-dasharray="${C}" stroke-dashoffset="${C}" data-off="${C * (1 - pct / 100)}"/></svg><div class="ring__c"><b>${pct}%</b><small>completos</small></div></div>
        <div class="hero__mini">
          <div><i style="background:#34d399"></i><b>256</b> Completos</div>
          <div><i style="background:#60a5fa"></i><b>59</b> En curso</div>
          <div><i style="background:#f87171"></i><b>45</b> Sin respuesta</div>
          <div><i style="background:#fbbf24"></i><b>12</b> Extemporáneos</div>
        </div>
      </div>
    </section>

    <div class="grid g-4 mt">
      ${kpi({ label: "Horas recuperadas esta semana", icon: "clock", val: "41,5", unit: "h", delta: "+12 % vs semana anterior", spark: [18, 22, 25, 24, 31, 37, 41.5] })}
      ${kpi({ label: "Documentos procesados (3T)", icon: "fileText", val: "3.917", delta: "512 hoy", spark: [120, 180, 260, 410, 640, 510, 512] })}
      ${kpi({ label: "Propuestas por validar", icon: "inbox", val: "128", unit: "· 34 revisar", delta: "−58 desde ayer", spark: [260, 240, 220, 200, 186, 150, 128] })}
      ${kpi({ label: "Validadas sin corrección", icon: "target", val: "87", unit: "%", delta: "+4 pts este mes", spark: [74, 76, 79, 81, 83, 85, 87] })}
    </div>

    <div class="grid g-main mt">
      <div class="card card--flush">
        <div class="card__head"><div><h3>Pendientes por cliente</h3><p>Documentación del 3T · ordenado por riesgo</p></div><a href="#/clientes" class="btn btn--ghost btn--sm">Ver cartera ${ic("chevronRight")}</a></div>
        <div class="toolbar">
          <label class="field-s">${ic("search")}<input placeholder="Buscar cliente o NIF" /></label>
          <select class="select"><option>Todos los técnicos</option><option>Laura Garriga</option><option>Marc Puig</option><option>Núria Soler</option><option>Jordi Vidal</option></select>
          <div class="seg"><button class="is-on">Todos</button><button>Sin respuesta</button><button>En curso</button><button>Completos</button></div>
        </div>
        <div style="overflow-x:auto"><table class="tbl">
          <thead><tr><th>Cliente</th><th>Técnico</th><th>Checklist</th><th>Pendiente</th><th>Último aviso</th><th>Estado</th><th></th></tr></thead>
          <tbody>${[...CLI].sort((a, b) => a.pct - b.pct).slice(0, 8).map((c) => `
            <tr data-href="#/cliente/${c.id}">
              <td><div class="cell-main">${cav(c)}<div><b>${c.n}</b><small>${c.nif}</small></div></div></td>
              <td>${av(c.t)}</td>
              <td>${prog(c.pct)}</td>
              <td>${c.pend.length ? `<span class="chip">${c.pend[0]}</span>` + (c.pend.length > 1 ? ` <span class="chip">+${c.pend.length - 1}</span>` : "") : `<span class="faint">—</span>`}</td>
              <td class="nowrap">${c.pct === 100 ? `<span class="faint">—</span>` : `<span class="chip">${ic(c.canal === "whatsapp" ? "whatsapp" : "mail")} Aviso ${c.av} ${ticks(c.avEst)}</span>`}</td>
              <td>${tag(EST[c.est])}</td>
              <td><button class="icon-btn" data-toast="Llamando a ${c.n}… (${c.tel})">${ic("phone")}</button></td>
            </tr>`).join("")}</tbody>
        </table></div>
      </div>

      <div class="grid" style="align-content:start">
        <div class="card"><div class="card__head"><h3>Avance por técnico</h3><span class="tag t-ai tag--plain">${ic("sparkles", "ico--sm")} Previsión: 94 % el día 20</span></div>
          <div class="card__body" style="display:grid;gap:16px">
            ${[["LG", 84, 90], ["MP", 66, 92], ["NS", 52, 88], ["JV", 79, 90]].map(([k, p, n]) => `<div style="display:flex;align-items:center;gap:12px">${av(k)}<div style="flex:1"><div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:6px"><b>${TEC[k].n}</b><span class="mono muted">${n} clientes</span></div>${prog(p)}</div></div>`).join("")}
          </div></div>
        <div class="card card--flush"><div class="card__head"><h3>En directo</h3><span class="tag t-ok">Nexa activo</span></div>
          <div class="card__body" style="padding:18px 20px"><ul class="tl" id="live"></ul></div></div>
      </div>
    </div>`;
  };

  const LIVE = [
    ["Factura Endesa contabilizada como 628", "Marta Soler · validada en lote", "#059669"],
    ["3 imágenes recibidas por WhatsApp", "Talleres Puig · clasificadas en 14 s", "#0891b2"],
    ["Consulta escalada a Laura", "Bar Ca l'Anna · requerimiento AEAT", "#7c3aed"],
    ["Aviso 4 entregado", "Construccions Vall · email", "#2563eb"],
    ["Posible ISP detectada", "Fontaneria Bosch → Construccions Vall", "#f59e0b"],
    ["Lote L-0233 generado (27 asientos)", "Arquitectura Mas i Font · A3", "#059669"],
  ];

  const propRows = (list) => list.map((p) => { const c = cli(p.c); return `
    <tr data-href="#/validar/${p.id}">
      <td onclick="event.stopPropagation()"><input type="checkbox" class="cbx" data-sel="${p.id}" /></td>
      <td><div class="cell-main">${srcIc(p.src)}<div><b>${p.prov}</b><small>${p.nif}</small></div></div></td>
      <td><div class="cell-main">${cav(c)}<span>${c.n}</span></div></td>
      <td class="mono muted">${p.num}</td>
      <td class="mono">${p.fecha}</td>
      <td class="amount right">${eur(p.total)}</td>
      <td><span class="acct"><b>${p.cta}</b>${p.ctaN}</span></td>
      <td>${confTag(p)}</td>
      <td>${p.mot.map((m) => `<span class="tag t-warn tag--plain">${m}</span>`).join(" ") || `<span class="faint">—</span>`}</td>
      <td><span class="faint">${ic("chevronRight")}</span></td>
    </tr>`; }).join("");

  V.bandeja = () => {
    const alta = PROP.filter((p) => p.conf === "alta"), rev = PROP.filter((p) => p.conf !== "alta");
    const head = `<thead><tr><th><input type="checkbox" class="cbx" data-selall /></th><th>Proveedor</th><th>Cliente</th><th>Nº factura</th><th>Fecha</th><th class="right">Total</th><th>Cuenta propuesta</th><th>Confianza</th><th>Motivos</th><th></th></tr></thead>`;
    return `
    ${ph({ title: "Bandeja de validación", sub: "La IA propone, tu equipo decide. Valida en bloque lo seguro y revisa solo lo dudoso.", actions: `<div class="seg"><button>Mi cartera</button><button class="is-on">Todo</button></div><a href="#/exportaciones" class="btn btn--dark btn--sm">${ic("download")} Exportar validadas</a>` })}
    <div class="grid g-4">
      ${kpi({ label: "Confianza alta", icon: "checks", val: "94", delta: "Listas para validar en bloque" })}
      ${kpi({ label: "Para revisar", icon: "alert", val: "34", delta: "ISP, tickets, proveedores nuevos", up: false })}
      ${kpi({ label: "Validadas hoy", icon: "check", val: "212", delta: "Tiempo medio 9,4 s / factura" })}
      ${kpi({ label: "Reglas aprendidas", icon: "sparkles", val: "1.846", delta: "+38 esta semana" })}
    </div>
    <div class="card card--flush mt">
      <div style="padding:0 16px"><div class="tabs" style="margin:0;border:0">
        <button class="is-on" data-tab="alta" data-group="bj">${ic("checks", "ico--sm")} Confianza alta <span class="count">94</span></button>
        <button data-tab="rev" data-group="bj">${ic("alert", "ico--sm")} Revisar <span class="count" style="background:var(--warn-bg);color:var(--warn)">34</span></button>
        <button data-tab="val" data-group="bj">${ic("check", "ico--sm")} Validadas hoy <span class="count">212</span></button>
      </div></div>
      <div class="toolbar">
        <label class="field-s">${ic("search")}<input placeholder="Proveedor, NIF, nº de factura…" /></label>
        <select class="select"><option>Todos los clientes</option>${CLI.map((c) => `<option>${c.n}</option>`).join("")}</select>
        <select class="select"><option>Todos los canales</option><option>WhatsApp</option><option>Email</option><option>Subida manual</option></select>
        <button class="btn btn--ghost btn--sm">${ic("filter")} Más filtros</button>
        <span class="toolbar__sp"></span>
        <div class="keys"><span><kbd>V</kbd> validar</span><span><kbd>R</kbd> rechazar</span><span><kbd>↓</kbd> siguiente</span></div>
      </div>
      <div class="pane is-on" data-pane="alta" data-group="bj"><div style="overflow-x:auto"><table class="tbl">${head}<tbody>${propRows(alta)}</tbody></table></div></div>
      <div class="pane" data-pane="rev" data-group="bj"><div style="overflow-x:auto"><table class="tbl">${head}<tbody>${propRows(rev)}</tbody></table></div></div>
      <div class="pane" data-pane="val" data-group="bj"><div class="empty"><div class="empty__ic">${ic("checks", "ico--lg")}</div><h3>212 facturas validadas hoy</h3><p style="margin-top:6px">Pendientes de exportar a A3: 97 · <a href="#/exportaciones" class="btn--link">Ir a exportaciones</a></p></div></div>
    </div>
    <div class="bulk" id="bulk"><span><b id="selN">0</b> seleccionadas</span><button class="btn btn--primary btn--sm" data-toast="Propuestas validadas · reglas contables actualizadas">${ic("checks")} Validar seleccionadas</button><button class="btn btn--ghost btn--sm" data-toast="Asignado a otro técnico">${ic("users")} Reasignar</button><button class="icon-btn" style="color:#9fb3bd" data-clearsel>${ic("x")}</button></div>`;
  };

  V.validar = (id) => {
    const p = prop(id), c = cli(p.c);
    const total = p.total, base = +(id == 1042 ? 412.3 : total / 1.21).toFixed(2), cuota = +(total - base).toFixed(2);
    const isp = p.mot.some((m) => /ISP|Intra/.test(m));
    const idx = PROP.indexOf(p), prev = PROP[(idx - 1 + PROP.length) % PROP.length].id, next = PROP[(idx + 1) % PROP.length].id;
    const f = (k, label, val, q, extra = "") => `<div class="fld" data-f="${k}"><span>${label}</span><input value="${val}" ${extra}/><div class="conf ${q < 85 ? "l" : q < 95 ? "m" : ""}" title="Confianza ${q}%"><i style="--p:${q}%"></i></div></div>`;
    return `
    ${ph({ crumb: `<a href="#/bandeja">Bandeja</a> ${ic("chevronRight", "ico--sm")} Propuesta P-${p.id}`, title: p.prov, sub: `${c.n} · recibida por ${p.src === "whatsapp" ? "WhatsApp" : "email"} el 14/10 a las 09:42 · procesada en 18 s`,
      actions: `<a class="icon-btn" href="#/validar/${prev}" title="Anterior">${ic("chevronLeft")}</a><a class="icon-btn" href="#/validar/${next}" title="Siguiente">${ic("chevronRight")}</a><button class="btn btn--danger btn--sm" data-toast="Propuesta rechazada · motivo registrado">${ic("x")} Rechazar</button><a class="btn btn--primary btn--sm" href="#/validar/${next}" data-toast="Asiento validado · regla ${p.nif} → ${p.cta} reforzada">${ic("check")} Validar y siguiente</a>` })}
    <div class="split">
      <div class="viewer">
        <div class="viewer__bar"><button class="icon-btn">${ic("zoom")}</button><button class="icon-btn">${ic("rotate")}</button><span class="chip">Página 1 / 1</span><span class="sp"></span><span class="chip mono">${ic("lock")} sha256 3f9a…c21e</span><button class="icon-btn" title="Descargar original">${ic("download")}</button></div>
        <div class="viewer__stage">
          <div class="paper">
            <div class="pp" style="top:6%;left:7.5%;width:44%"><div class="paper__logo">${p.prov.split(/[ ,]/)[0].toLowerCase()}</div><div class="paper__muted">${p.prov}<br/>C/ Ribera del Loira, 60 · 28042 Madrid</div><div class="pl"><b>NIF ${p.nif}</b></div></div>
            <div class="pp" style="top:6%;right:7.5%;text-align:right"><div style="font-weight:800;font-size:3.6cqw;letter-spacing:.06em">FACTURA</div><div class="paper__muted">Original</div></div>
            <div class="pp pbox" style="top:20%;left:52%;width:40.5%"><div class="paper__muted">Cliente</div><b>${c.n}</b><div>NIF ${c.nif}</div><div class="paper__muted">C/ Gran de Gràcia, 112 · 08012 Barcelona</div></div>
            <div class="pp" style="top:33.6%;left:7.5%;width:44%"><div class="pl">Nº factura: <b>${p.num}</b></div><div class="pl">Fecha: <b>${p.fecha}</b></div><div class="pl paper__muted">Periodo: 01/08/2026 – 31/08/2026</div></div>
            <div class="pp" style="top:48%;left:7.5%;width:85%"><table><thead><tr><th>Concepto</th><th style="text-align:right">Importe</th></tr></thead><tbody>
              <tr><td>${p.ctaN} · ${p.prov.split(",")[0]}</td><td style="text-align:right">${eur(base * 0.82)}</td></tr>
              <tr><td>Servicios adicionales</td><td style="text-align:right">${eur(base * 0.15)}</td></tr>
              <tr><td>Otros conceptos</td><td style="text-align:right">${eur(base * 0.03)}</td></tr></tbody></table></div>
            <div class="pp" style="top:70%;left:52%;width:40.5%"><div class="pl prow"><span>Base imponible</span><span>${eur(base)}</span></div><div class="pl prow"><span>IVA 21 %</span><span>${eur(cuota)}</span></div><div class="pl prow ptot"><span>TOTAL</span><span>${eur(total)}</span></div></div>
            ${isp ? `<div class="pp" style="top:84%;left:7.5%;width:85%;color:#b45309;font-weight:600">Operación con inversión del sujeto pasivo · art. 84.Uno.2º LIVA</div>` : ""}
            <div class="pp paper__muted" style="top:92%;left:7.5%;width:85%">Inscrita en el Registro Mercantil. Factura emitida conforme al RD 1619/2012.</div>
            <div class="hl" data-h="emisor" style="top:5%;left:6%;width:47%;height:12.5%"></div>
            <div class="hl" data-h="nif" style="top:13.2%;left:6.5%;width:32%;height:3.8%"></div>
            <div class="hl" data-h="receptor" style="top:19%;left:51%;width:42.5%;height:12%"></div>
            <div class="hl" data-h="num" style="top:33.2%;left:6.5%;width:46%;height:3.8%"></div>
            <div class="hl" data-h="fecha" style="top:36.6%;left:6.5%;width:46%;height:3.8%"></div>
            <div class="hl" data-h="base" style="top:69.6%;left:51%;width:42.5%;height:3.8%"></div>
            <div class="hl" data-h="cuota" style="top:73%;left:51%;width:42.5%;height:3.8%"></div>
            <div class="hl" data-h="total" style="top:76.4%;left:51%;width:42.5%;height:5%"></div>
            ${isp ? `<div class="hl is-warn" style="top:83.4%;left:6.5%;width:87%;height:4%"></div>` : ""}
          </div>
        </div>
      </div>

      <div class="grid" style="align-content:start">
        ${p.conf === "alta" ? `<div class="why">${ic("sparkles")}<div><b>Confianza alta · ${p.q} %</b><span class="muted">Proveedor con 14 facturas anteriores en ${c.n}, siempre en la cuenta ${p.cta}. Los importes cuadran y el NIF es válido.</span></div></div>`
          : `<div class="why" style="background:var(--warn-bg);border-color:#f6d9a8">${ic("alert")}<div><b>Necesita tu criterio</b><span class="muted">${p.mot.join(" · ")}. ${isp ? "Se propone autorrepercusión (472/477) pero debes confirmarla." : p.mot[0] === "Ticket" ? "Factura simplificada: revisa si el IVA es deducible." : p.mot[0] === "Proveedor nuevo" ? "Primera factura de este proveedor: la cuenta se ha sugerido por el concepto." : "Base + IVA no coincide con el total del documento."}</span></div></div>`}
        <div class="card">
          <div class="card__head"><h3>Datos extraídos</h3><span class="tag t-ai tag--plain">${ic("sparkles", "ico--sm")} Extraído por IA</span></div>
          <div class="card__body fields" style="padding:10px">
            ${f("emisor", "Emisor", p.prov, 99)}
            ${f("nif", "NIF emisor", p.nif, 99)}
            ${f("receptor", "Receptor", `${c.n} · ${c.nif}`, 98)}
            ${f("num", "Nº factura", p.num, 97)}
            ${f("fecha", "Fecha expedición", p.fecha, 99)}
            ${f("base", "Base imponible", eur(base), 96)}
            ${f("cuota", "IVA 21 %", eur(cuota), 95)}
            ${f("total", "Total", eur(total), p.mot[0]?.startsWith("No cuadra") ? 62 : 99)}
          </div>
        </div>
        <div class="card">
          <div class="card__head"><h3>Asiento propuesto</h3><div class="flags">${p.mot.map((m) => `<span class="tag t-warn tag--plain">${m}</span>`).join("")}<span class="chip">${ic("calendar")} 3T 2026</span></div></div>
          <div class="card__body">
            <div class="asiento"><table>
              <thead><tr><th>Cuenta</th><th>Concepto</th><th class="right">Debe</th><th class="right">Haber</th></tr></thead>
              <tbody>
                <tr><td><span class="acct"><b>${p.cta}</b>${p.ctaN}</span></td><td class="muted">Fra. ${p.num}</td><td class="amount right">${eur(base)}</td><td></td></tr>
                <tr><td><span class="acct"><b>472</b>HP IVA soportado</span></td><td class="muted">IVA 21 %</td><td class="amount right">${eur(cuota)}</td><td></td></tr>
                ${isp ? `<tr><td><span class="acct"><b>477</b>HP IVA repercutido</span></td><td class="muted">Autorrepercusión</td><td></td><td class="amount right">${eur(cuota)}</td></tr>` : ""}
                <tr><td><span class="acct"><b>400${String(p.id).slice(-4)}</b>${p.prov.split(",")[0]}</span></td><td class="muted">Proveedor</td><td></td><td class="amount right">${eur(isp ? base : total)}</td></tr>
              </tbody>
              <tfoot><tr><td colspan="2">Cuadrado ${ic("check", "ico--sm")}</td><td class="amount right">${eur(total)}</td><td class="amount right">${eur(total)}</td></tr></tfoot>
            </table></div>
            <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap"><button class="btn btn--ghost btn--xs">${ic("plus")} Añadir línea</button><button class="btn btn--ghost btn--xs">${ic("refresh")} Recalcular</button><button class="btn btn--ghost btn--xs">${ic("eye")} Ver 14 facturas anteriores</button></div>
          </div>
          <div class="stickybar"><div class="keys"><span><kbd>V</kbd> validar</span><span><kbd>R</kbd> rechazar</span><span><kbd>E</kbd> editar cuenta</span></div><span class="sp"></span><button class="btn btn--danger btn--sm" data-toast="Propuesta rechazada">Rechazar</button><a class="btn btn--primary btn--sm" href="#/validar/${next}" data-toast="Asiento validado">${ic("check")} Validar</a></div>
        </div>
      </div>
    </div>`;
  };

  V["sin-asignar"] = () => {
    const D = [
      ["+34 611 902 448", "whatsapp", "No registrado", "t-bad", "Foto de factura · Ferretería Sants", "Talleres Puig, SL", 82, "Hoy 10:12"],
      ["info@cateringdelmar.cat", "email", "Remitente desconocido", "t-bad", "PDF · Factura 2026/0388", "Clínica Vet Gràcia, SLP", 91, "Hoy 09:03"],
      ["+34 612 445 901", "whatsapp", "NIF receptor no coincide", "t-warn", "Factura a nombre de Puig Motor, SL", null, 0, "Ayer 18:44"],
      ["oficina@masifont.cat", "email", "Periodo cerrado (2T)", "t-warn", "Factura de 28/06/2026", "Arquitectura Mas i Font, SLP", 99, "Ayer 12:30"],
      ["+34 690 334 012", "whatsapp", "Ilegible", "t-mute", "Foto borrosa · se ha pedido otra", "Bar Ca l'Anna", 95, "Ayer 09:51"],
    ];
    return `
    ${ph({ title: "Sin asignar", sub: "Documentos que Nexa no ha podido asociar con seguridad a un cliente o periodo. Nunca se descartan solos.", actions: `<button class="btn btn--ghost btn--sm">${ic("upload")} Subir escaneados</button>` })}
    <div class="grid g-3">${D.map(([from, canal, mot, mc, what, sug, q, when], i) => `
      <div class="card" style="overflow:hidden">
        <div style="height:150px;background:linear-gradient(135deg,#eef5f8,#e3eef3);display:grid;place-items:center;position:relative">
          <div style="width:96px;height:130px;background:#fff;border-radius:4px;box-shadow:0 10px 24px -10px rgba(0,0,0,.3);transform:rotate(${[-4, 3, -2, 5, -6][i]}deg);padding:10px;display:grid;gap:5px;align-content:start${mot === "Ilegible" ? ";filter:blur(1.6px)" : ""}">
            <i style="height:8px;width:50%;background:#0a6e5c;border-radius:2px"></i>${'<i style="height:4px;background:#e5e5e5;border-radius:2px"></i>'.repeat(9)}<i style="height:6px;width:60%;margin-left:auto;background:#bbb;border-radius:2px"></i>
          </div>
          <span class="tag ${mc}" style="position:absolute;top:12px;left:12px">${mot}</span>
          <span class="chip" style="position:absolute;top:12px;right:12px;background:#fff">${ic(canal === "whatsapp" ? "whatsapp" : "mail")} ${when}</span>
        </div>
        <div class="card__body" style="display:grid;gap:12px">
          <div><b>${what}</b><div class="muted mono" style="font-size:12px">${from}</div></div>
          ${sug ? `<div class="why" style="padding:10px 12px">${ic("sparkles")}<div style="font-size:13px"><b>Sugerencia: ${sug}</b><span class="muted">Coincidencia ${q} % por NIF y proveedor habitual</span></div></div>` : `<div class="why" style="padding:10px 12px;background:var(--soft);border-color:var(--line)">${ic("help")}<div style="font-size:13px"><b>Sin sugerencia</b><span class="muted">El NIF no pertenece a ningún cliente de la cartera</span></div></div>`}
          <div style="display:flex;gap:8px">${sug ? `<button class="btn btn--primary btn--sm" style="flex:1" data-toast="Documento asignado a ${sug}">${ic("check")} Asignar</button>` : ""}<button class="btn btn--ghost btn--sm" style="flex:1">${ic("users")} Elegir cliente</button><button class="icon-btn" title="Descartar" data-toast="Documento archivado como «No contabilizable»">${ic("archive")}</button></div>
        </div>
      </div>`).join("")}</div>`;
  };

  V.tareas = () => {
    const col = (k, title, cls) => { const L = TASKS.filter((t) => t.col === k); return `
      <div class="card" style="background:${k === "hecho" ? "#fbfdfe" : "#fff"}">
        <div class="card__head"><h3 style="display:flex;gap:8px;align-items:center"><span class="tag ${cls} tag--plain">${L.length}</span>${title}</h3><button class="icon-btn">${ic("plus")}</button></div>
        <div class="card__body" style="display:grid;gap:10px;padding:14px">${L.map((t) => { const [i, b, l] = TT[t.tipo]; const c = t.c ? cli(t.c) : null; return `
          <div class="card" style="padding:14px;box-shadow:none;${k === "hecho" ? "opacity:.6" : ""}">
            <div style="display:flex;gap:10px;align-items:center;margin-bottom:10px"><span class="lrow__ic ${b}" style="width:30px;height:30px">${ic(i, "ico--sm")}</span><span class="muted" style="font-size:12px;font-weight:600">${l}</span><span style="margin-left:auto">${t.pri === "alta" ? '<span class="tag t-bad tag--plain">Alta</span>' : t.pri === "media" ? '<span class="tag t-warn tag--plain">Media</span>' : '<span class="tag t-mute tag--plain">Baja</span>'}</span></div>
            <b style="display:block;font-weight:600;line-height:1.4">${t.txt}</b>
            ${c ? `<a href="#/cliente/${c.id}" class="muted" style="font-size:12.5px">${c.n}</a>` : `<span class="muted" style="font-size:12.5px">Sin cliente</span>`}
            <div style="display:flex;align-items:center;gap:8px;margin-top:12px">${av(t.t)}<span class="chip">${ic("clock")} ${t.due}</span><span style="margin-left:auto;display:flex;gap:4px">${k !== "hecho" ? `<button class="icon-btn" data-toast="Tarea completada">${ic("check")}</button>` : ""}<button class="icon-btn">${ic("more")}</button></span></div>
          </div>`; }).join("")}</div>
      </div>`; };
    return `${ph({ title: "Tareas", sub: "Lo que Nexa no puede hacer solo: llamadas, consultas con criterio y documentos por asignar.", actions: `<div class="seg"><button class="is-on">Todas</button><button>Mías</button></div><button class="btn btn--primary btn--sm">${ic("plus")} Nueva tarea</button>` })}
      <div class="grid g-3" style="align-items:start">${col("hoy", "Hoy", "t-bad")}${col("semana", "Esta semana", "t-warn")}${col("hecho", "Hechas", "t-ok")}</div>`;
  };

  V.clientes = () => `
    ${ph({ title: "Cartera de clientes", sub: "360 clientes con contabilidad · 4 técnicos", actions: `<a href="#/importar" class="btn btn--ghost btn--sm">${ic("import")} Importar CSV</a><button class="btn btn--primary btn--sm">${ic("plus")} Nuevo cliente</button>` })}
    <div class="grid g-4">
      ${kpi({ label: "Clientes activos", icon: "users", val: "360", delta: "+6 este trimestre", spark: [330, 336, 341, 349, 352, 354, 360] })}
      ${kpi({ label: "Por WhatsApp", icon: "whatsapp", val: "312", unit: "· 87 %", delta: "Canal preferido" })}
      ${kpi({ label: "VeriFactu listos", icon: "shield", val: "62", unit: "%", delta: "51 sin adaptar", up: false })}
      ${kpi({ label: "Clientes en Andorra", icon: "globe", val: "14", delta: "IGI trimestral y semestral" })}
    </div>
    <div class="card card--flush mt">
      <div class="toolbar">
        <label class="field-s" style="min-width:300px">${ic("search")}<input placeholder="Buscar por nombre, NIF o teléfono" /></label>
        <select class="select"><option>Todos los técnicos</option>${Object.values(TEC).map((t) => `<option>${t.n}</option>`).join("")}</select>
        <select class="select"><option>Todos los tipos</option><option>Autónomos</option><option>Sociedades</option></select>
        <select class="select"><option>VeriFactu: todos</option><option>Adaptado</option><option>En proceso</option><option>Sin adaptar</option></select>
        <span class="toolbar__sp"></span><span class="muted" style="font-size:12.5px">Mostrando 12 de 360</span>
      </div>
      <div style="overflow-x:auto"><table class="tbl">
        <thead><tr><th>Cliente</th><th>Tipo</th><th>Técnico</th><th>Canal</th><th>Periodicidad</th><th>Checklist 3T</th><th>VeriFactu</th><th>Estado</th><th></th></tr></thead>
        <tbody>${CLI.map((c) => `<tr data-href="#/cliente/${c.id}">
          <td><div class="cell-main">${cav(c)}<div><b>${c.n}</b><small>${c.nif}</small></div></div></td>
          <td class="muted">${c.tipo}</td>
          <td><div class="cell-main">${av(c.t)}<span class="muted">${TEC[c.t].n.split(" ")[0]}</span></div></td>
          <td><span class="chip">${ic(c.canal === "whatsapp" ? "whatsapp" : "mail")} ${c.canal === "whatsapp" ? "WhatsApp" : "Email"} · ${c.idi.toUpperCase()}</span></td>
          <td class="muted">${c.per}</td>
          <td>${prog(c.pct)}</td>
          <td>${tag(VF[c.vf])}</td>
          <td>${tag(EST[c.est])}</td>
          <td><span class="faint">${ic("chevronRight")}</span></td>
        </tr>`).join("")}</tbody>
      </table></div>
    </div>`;

  V.cliente = (id) => {
    const c = cli(id);
    const items = [
      ["Facturas emitidas", "Recibidas 34 · última el 12/10", true],
      ["Facturas recibidas", c.pend.includes("Facturas recibidas") ? "Pendiente · 4 avisos enviados" : "Recibidas 58 · última el 14/10", !c.pend.includes("Facturas recibidas")],
      ["Tickets", c.pend.some((p) => /ticket/i.test(p)) ? "Pendiente · faltan 3" : "Recibidos 21", !c.pend.some((p) => /ticket/i.test(p))],
      ["Extracto bancario · Sabadell ****4021", c.pend.some((p) => /Extracto/.test(p)) ? "Pendiente · N43 o PDF" : "N43 recibido el 03/10", !c.pend.some((p) => /Extracto/.test(p))],
      ["Nóminas y seguros sociales", "No aplica este trimestre", null],
    ];
    const P = PROP.filter((p) => p.c === c.id);
    return `
    ${ph({ crumb: `<a href="#/clientes">Cartera</a> ${ic("chevronRight", "ico--sm")} ${c.n}`, title: "", actions: "" }).replace("<h1></h1>", "")}
    <div class="card">
      <div class="client-head">
        ${cav(c, "av--xl")}
        <div><h1>${c.n}</h1><div class="chips"><span class="chip mono">${c.nif}</span><span class="chip">${ic("building")} ${c.tipo}</span><span class="chip">${ic(c.canal === "whatsapp" ? "whatsapp" : "mail")} ${c.tel}</span><span class="chip">${ic("globe")} ${c.idi === "ca" ? "Català" : "Castellano"}</span><span class="chip">${av(c.t)} ${TEC[c.t].n}</span></div></div>
        <div class="client-head__stats"><div><b>${c.pct}%</b><small>Checklist 3T</small></div><div><b>${P.length * 7 + 41}</b><small>Docs este trimestre</small></div><div><b>${tag(EST[c.est])}</b><small>Estado</small></div></div>
      </div>
      <div style="display:flex;gap:8px;padding:0 22px 18px;flex-wrap:wrap">
        <button class="btn btn--primary btn--sm" data-toast="Mensaje enviado por ${c.canal === "whatsapp" ? "WhatsApp" : "email"}">${ic("send")} Enviar mensaje</button>
        <button class="btn btn--ghost btn--sm">${ic("upload")} Subir documento</button>
        <button class="btn btn--ghost btn--sm" data-toast="Informe de entregas generado (PDF con fechas y hash)">${ic("fileText")} Informe de entregas</button>
        <button class="btn btn--ghost btn--sm" data-toast="Pre-cierre ejecutado: 2 alertas">${ic("zap")} Ejecutar pre-cierre</button>
        <button class="btn btn--ghost btn--sm">${ic("phone")} Llamar</button>
      </div>
    </div>
    <div class="tabs mt">
      ${[["res", "Resumen"], ["docs", "Documentos", 41 + P.length * 7], ["msg", "Mensajes"], ["reg", "Reglas contables", 63], ["pre", "Pre-cierre", 2], ["dat", "Datos"]].map(([k, l, n], i) => `<button data-tab="${k}" data-group="cl" class="${i ? "" : "is-on"}">${l}${n ? ` <span class="count">${n}</span>` : ""}</button>`).join("")}
    </div>

    <div class="pane is-on" data-pane="res" data-group="cl"><div class="grid g-main">
      <div class="card"><div class="card__head"><div><h3>Checklist del 3T 2026</h3><p>Fecha límite 20/10/2026 · plantilla «${/Autónom/.test(c.tipo) ? "Autónomo estimación directa" : "SL estándar"}»</p></div><button class="btn btn--ghost btn--sm">${ic("edit")} Editar checklist</button></div>
        <div class="card__body">${items.map(([n, d, ok]) => `<div class="check-item"><span class="tick ${ok === null ? "bg-info" : ok ? "bg-ok" : "bg-warn"}">${ic(ok === null ? "x" : ok ? "check" : "clock")}</span><div><b>${n}</b><small>${d}</small></div><span class="sp"></span>${ok === false ? `<button class="btn btn--ghost btn--xs" data-toast="Recordatorio enviado">${ic("send")} Reclamar</button>` : ok === null ? `<span class="tag t-mute tag--plain">No aplica</span>` : `<span class="tag t-ok tag--plain">Recibido</span>`}</div>`).join("")}</div></div>
      <div class="grid" style="align-content:start">
        <div class="card"><div class="card__head"><h3>Actividad</h3></div><div class="card__body"><ul class="tl">
          <li style="--c:#059669"><b>3 facturas recibidas por WhatsApp</b><small>14/10 · 09:42 · acuse enviado</small></li>
          <li style="--c:#2563eb"><b>Aviso 4 leído</b><small>15/10 · 09:31</small></li>
          <li style="--c:#7c3aed"><b>Consulta respondida por el asistente</b><small>13/10 · 18:02 · «¿qué me falta?»</small></li>
          <li style="--c:#2563eb"><b>Aviso 3 entregado + tarea de llamada</b><small>10/10 · 09:30</small></li>
          <li style="--c:#0891b2"><b>Lote L-0230 exportado a A3</b><small>08/10 · Marc Puig</small></li>
        </ul></div></div>
        <div class="card"><div class="card__head"><h3>VeriFactu</h3>${tag(VF[c.vf])}</div><div class="card__body kv"><div><span>Programa de facturación</span><b>${c.vf === "adaptado" ? "Holded" : "Factusol 2019"}</b></div><div><span>Obligado desde</span><b>${/Sociedad/.test(c.tipo) ? "01/01/2027" : "01/07/2027"}</b></div><div><span>Último aviso informativo</span><b>02/10/2026</b></div></div></div>
      </div>
    </div></div>

    <div class="pane" data-pane="docs" data-group="cl"><div class="card card--flush"><table class="tbl"><thead><tr><th>Documento</th><th>Tipo</th><th>Canal</th><th>Recibido</th><th>Estado</th><th class="right">Total</th></tr></thead><tbody>
      ${(P.length ? P : PROP.slice(0, 4)).map((p, i) => `<tr data-href="#/validar/${p.id}"><td><div class="cell-main"><span class="lrow__ic bg-info" style="width:30px;height:30px">${ic("fileText", "ico--sm")}</span><div><b>${p.prov}</b><small>${p.num}</small></div></div></td><td class="muted">Factura recibida</td><td>${srcIc(p.src)}</td><td class="mono">${14 - i}/10/2026 09:${42 - i}</td><td>${i ? '<span class="tag t-ok">Contabilizada</span>' : '<span class="tag t-info">Propuesta</span>'}</td><td class="amount right">${eur(p.total)}</td></tr>`).join("")}
      <tr><td><div class="cell-main"><span class="lrow__ic bg-ok" style="width:30px;height:30px">${ic("bank", "ico--sm")}</span><div><b>Extracto N43 · Sabadell</b><small>01/07 – 30/09/2026</small></div></div></td><td class="muted">Norma 43</td><td>${srcIc("email")}</td><td class="mono">03/10/2026 11:20</td><td><span class="tag t-ok">Importado</span></td><td class="amount right">142 mov.</td></tr>
    </tbody></table></div></div>

    <div class="pane" data-pane="msg" data-group="cl"><div class="card"><div class="card__body"><ul class="tl">
      ${[["Aviso 4", "15/10 09:31", "leido"], ["Acuse: 3 facturas recibidas", "14/10 09:43", "leido"], ["Aviso 3", "10/10 09:30", "leido"], ["Aviso 2", "05/10 09:30", "entregado"], ["Aviso 1 (aprobado por Laura)", "01/10 09:30", "leido"]].map(([t, d, e]) => `<li><div style="display:flex;justify-content:space-between;gap:12px"><div><b>${t}</b><small>${d} · ${c.canal === "whatsapp" ? "WhatsApp · plantilla aviso_" + (c.idi) : "Email"}</small></div>${ticks(e)}</div><div class="tpl__bub" style="margin-top:8px;max-width:560px">Hola ${c.n.split(/[ ,]/)[0]}, para cerrar el 3T nos falta: <b>${c.pend.join(", ") || "nada"}</b>. Puedes enviarlo por aquí mismo. Fecha límite: 20/10.</div></li>`).join("")}
    </ul></div></div></div>

    <div class="pane" data-pane="reg" data-group="cl"><div class="card card--flush"><table class="tbl"><thead><tr><th>Proveedor / cliente</th><th>NIF</th><th>Cuenta</th><th>IVA habitual</th><th>Origen</th><th>Usos</th><th>Última vez</th></tr></thead><tbody>
      ${PROP.slice(0, 7).map((p, i) => `<tr><td><b>${p.prov}</b></td><td class="mono muted">${p.nif}</td><td><span class="acct"><b>${p.cta}</b>${p.ctaN}</span></td><td class="mono">21 %</td><td>${i % 3 === 2 ? '<span class="tag t-violet tag--plain">Corrección</span>' : '<span class="tag t-mute tag--plain">Histórico</span>'}</td><td class="mono">${[14, 9, 22, 6, 3, 11, 31][i]}</td><td class="mono muted">${["14/10", "02/10", "30/09", "28/09", "21/09", "18/09", "12/09"][i]}</td></tr>`).join("")}
    </tbody></table></div></div>

    <div class="pane" data-pane="pre" data-group="cl"><div class="grid g-2">
      <div class="card"><div class="card__head"><h3>Alertas de pre-cierre</h3><span class="tag t-warn">2 alertas</span></div><div class="card__body" style="padding:0">
        <div class="lrow"><span class="lrow__ic bg-warn">${ic("trending")}</span><div class="lrow__main"><b>Base de IVA soportado +184 % vs 3T 2025</b><small>Compra de maquinaria (Fra. 2026/311) · comprobar si es inmovilizado</small></div><button class="btn btn--ghost btn--xs">Revisar</button></div>
        <div class="lrow"><span class="lrow__ic bg-bad">${ic("copy")}</span><div class="lrow__main"><b>Posible duplicado</b><small>Makro 0412/88123 y 0412/88124 · mismo importe y fecha</small></div><button class="btn btn--ghost btn--xs">Comparar</button></div>
        <div class="lrow"><span class="lrow__ic bg-ok">${ic("check")}</span><div class="lrow__main"><b>Sin documentos pendientes de contabilizar</b><small>Todo lo recibido tiene asiento validado</small></div></div>
      </div></div>
      <div class="card"><div class="card__head"><h3>Borrador modelo 303 · 3T</h3><span class="chip">Solo informativo</span></div><div class="card__body kv">
        <div><span>Base IVA repercutido 21 %</span><b class="amount">48.210,40 €</b></div><div><span>Cuota repercutida</span><b class="amount">10.124,18 €</b></div><div><span>Base IVA soportado</span><b class="amount">31.884,12 €</b></div><div><span>Cuota soportada deducible</span><b class="amount">6.695,67 €</b></div>
        <div style="border-top:1px solid var(--line);padding-top:10px;margin-top:4px"><span><b>Resultado</b></span><b class="amount" style="font-size:18px;color:var(--accent)">3.428,51 €</b></div>
      </div></div>
    </div></div>

    <div class="pane" data-pane="dat" data-group="cl"><div class="card"><div class="card__body form">
      <div class="f-row"><label class="f"><span>Razón social</span><input value="${c.n}" /></label><label class="f"><span>NIF</span><input value="${c.nif}" /></label></div>
      <div class="f-row"><label class="f"><span>Teléfono WhatsApp</span><input value="${c.tel}" /></label><label class="f"><span>Emails reconocidos</span><input value="administracio@${c.n.split(/[ ,']/)[0].toLowerCase()}.cat" /></label></div>
      <div class="f-row"><label class="f"><span>Técnico</span><select>${Object.values(TEC).map((t) => `<option ${t.n === TEC[c.t].n ? "selected" : ""}>${t.n}</option>`).join("")}</select></label><label class="f"><span>Código de empresa en A3</span><input value="00${c.id}48" /></label></div>
      <div class="f-row"><label class="f"><span>Periodicidad</span><select><option>Trimestral</option><option>Mensual</option><option>Semestral (AD)</option></select></label><label class="f"><span>Idioma</span><select><option ${c.idi === "es" ? "selected" : ""}>Castellano</option><option ${c.idi === "ca" ? "selected" : ""}>Català</option></select></label></div>
      <div class="setting"><div><b>Recordatorios automáticos</b><small>Avisos los días 1, 5, 10 y 15 del mes de presentación</small></div><label class="switch"><input type="checkbox" checked /><i></i></label></div>
      <div style="display:flex;gap:8px"><button class="btn btn--primary btn--sm" data-toast="Cliente guardado">Guardar cambios</button><button class="btn btn--danger btn--sm" style="margin-left:auto">Suprimir cliente (RGPD)</button></div>
    </div></div></div>`;
  };

  let convSel = 1;
  const chatHTML = (cv) => {
    const c = cli(cv.c);
    return `
      <div class="chat__head">${cav(c, "av--lg")}<div><b>${c.n}</b><small>${c.tel} · ${cv.est === "escalada" ? `<span style="color:var(--violet);font-weight:600">Escalada · ${cv.motivo}</span>` : cv.est === "cerrada" ? "Cerrada" : '<span style="color:var(--ok);font-weight:600">Atendida por el asistente</span>'}</small></div><span class="sp"></span>
        <button class="btn btn--ghost btn--sm">${ic("phone")} Llamar</button>${cv.est === "escalada" ? `<button class="btn btn--ghost btn--sm" data-toast="Conversación devuelta al asistente">${ic("sparkles")} Devolver al asistente</button>` : `<button class="btn btn--ghost btn--sm">${ic("user")} Tomar control</button>`}<button class="icon-btn">${ic("more")}</button></div>
      <div class="chat__body">${cv.msgs.map(([k, t, h]) => k === "day" ? `<span class="day">${t}</span>` : k === "sys" ? `<div class="sys">${ic("alert", "ico--sm")} ${t}</div>`
        : k === "file" ? `<div class="bub bub--in"><div class="bub__file">${ic("image")}<div><b style="font-size:13px">${t}</b><div class="faint" style="font-size:11px">Clasificado: ${/carta/.test(t) ? "Otro · AEAT" : "Factura recibida"}</div></div></div><small>${h}</small></div>`
        : `<div class="bub bub--${k}">${k === "bot" ? `<div class="bub__who">${ic("sparkles", "ico--sm")} Asistente Nexa</div>` : k === "tec" ? `<div class="bub__who">Laura Garriga</div>` : ""}${t}<small>${h} ${k !== "in" ? ticks("leido") : ""}</small></div>`).join("")}</div>
      ${cv.est !== "cerrada" ? `<div class="composer__ai"><span class="faint" style="font-size:12px;display:flex;gap:6px;align-items:center">${ic("sparkles", "ico--sm")} Respuestas sugeridas:</span>${(cv.c === 4 ? ["Hola Anna, envia'm una foto de la carta sencera i ho mirem avui", "Et truco en 10 minuts", "No et preocupis, és un requeriment d'informació"] : ["Te lo miro y te digo hoy", "¿Me pasas la factura de compra?", "Llámame cuando puedas"]).map((s) => `<button class="sugg">${s}</button>`).join("")}</div>
      <div class="composer"><button class="icon-btn">${ic("paperclip")}</button><textarea placeholder="Escribe como ${TEC.LG.n}… (se envía por WhatsApp)"></textarea><button class="btn btn--primary" data-demo="send-chat" aria-label="Enviar mensaje de demostración">${ic("send")}</button></div>` : ""}`;
  };
  const ctxHTML = (cv) => { const c = cli(cv.c); return `
      ${cv.resumen ? `<div class="ctx-card" style="background:linear-gradient(135deg,rgba(34,227,242,.1),rgba(37,99,235,.05));border-color:rgba(8,145,178,.2)"><h4>${ic("sparkles")} Resumen para el técnico</h4><p style="font-size:13px;line-height:1.55">${cv.resumen}</p></div>` : ""}
      <div class="ctx-card"><h4>${ic("user")} Cliente</h4><div class="kv"><div><span>NIF</span><b class="mono">${c.nif}</b></div><div><span>Técnico</span><b>${TEC[c.t].n}</b></div><div><span>Idioma</span><b>${c.idi === "ca" ? "Català" : "Castellano"}</b></div><div><span>Checklist 3T</span><b>${c.pct}%</b></div></div><a href="#/cliente/${c.id}" class="btn btn--ghost btn--sm" style="width:100%;margin-top:12px">Abrir ficha</a></div>
      <div class="ctx-card"><h4>${ic("clock")} Pendiente</h4>${c.pend.length ? c.pend.map((p) => `<div class="chip" style="margin:0 6px 6px 0">${p}</div>`).join("") : '<span class="muted">Nada pendiente</span>'}</div>
      <div class="ctx-card"><h4>${ic("shield")} Ventana de WhatsApp</h4><p class="muted" style="font-size:12.5px">Abierta 22 h 18 min más. Fuera de ella se usará la plantilla aprobada <span class="mono">respuesta_tecnico</span>.</p></div>`; };

  V.conversaciones = () => `
    ${ph({ title: "Conversaciones", sub: "El asistente responde lo de siempre. Lo que necesita criterio te llega aquí, resumido.", actions: `<div class="seg"><button class="is-on">Todas</button><button>Escaladas <span class="count" style="background:var(--violet-bg);color:var(--violet);padding:0 6px;border-radius:9px">2</span></button><button>Asistente</button><button>Cerradas</button></div>` })}
    <div class="grid g-4" style="margin-bottom:18px">
      ${kpi({ label: "Resueltas sin técnico", icon: "sparkles", val: "68", unit: "%", delta: "Objetivo ≥ 60 %" })}
      ${kpi({ label: "Consultas esta semana", icon: "chat", val: "214", delta: "+31 %" })}
      ${kpi({ label: "Tiempo de respuesta", icon: "zap", val: "6", unit: "s", delta: "Asistente 24/7" })}
      ${kpi({ label: "Escaladas abiertas", icon: "alert", val: "2", delta: "1 de prioridad alta", up: false })}
    </div>
    <div class="card inbox">
      <div class="inbox__list">
        <div class="toolbar"><label class="field-s" style="min-width:0;flex:1">${ic("search")}<input placeholder="Buscar conversación" /></label></div>
        ${CONV.map((cv) => { const c = cli(cv.c); return `<div tabindex="0" role="button" class="conv ${cv.id === convSel ? "is-on" : ""}" data-conv="${cv.id}">${cav(c, "av--lg")}<div class="conv__main"><div class="conv__top"><b>${c.n}</b><small>${cv.t}</small></div><p>${cv.last}</p>${cv.est === "escalada" ? `<span class="tag t-violet">${cv.motivo}</span>` : cv.est === "bot" ? `<span class="tag t-ai tag--plain">${ic("sparkles", "ico--sm")} Asistente</span>` : `<span class="tag t-mute tag--plain">Cerrada</span>`}${cv.unread ? `<span class="dot-badge" style="position:static;display:inline-block;margin-left:6px;border:0">${cv.unread}</span>` : ""}</div></div>`; }).join("")}
      </div>
      <div class="chat" id="chat">${chatHTML(CONV.find((c) => c.id === convSel))}</div>
      <div class="inbox__ctx" id="ctx">${ctxHTML(CONV.find((c) => c.id === convSel))}</div>
    </div>`;

  V.avisos = () => {
    const recip = ["LG", "MP", "NS", "JV"];
    return `
    ${ph({ title: "Avisos", sub: "Reclamaciones de documentación, acuses y comunicaciones a clientes.", actions: `<button class="btn btn--ghost btn--sm">${ic("eye")} Vista previa del calendario</button><button class="btn btn--primary btn--sm">${ic("plus")} Aviso informativo</button>` })}
    <div class="tabs">
      <button class="is-on" data-tab="apr" data-group="av">Pendientes de aprobación <span class="count">2</span></button>
      <button data-tab="cal" data-group="av">Calendario</button>
      <button data-tab="env" data-group="av">Enviados <span class="count">1.284</span></button>
    </div>
    <div class="pane is-on" data-pane="apr" data-group="av"><div class="grid g-2">
      ${[["VeriFactu · aviso informativo", "51 clientes «Sin adaptar»", "t-violet", "Hola {{nombre}}, a partir del <em>01/01/2027</em> tu programa de facturación tendrá que cumplir VeriFactu. Según nuestros datos usas <em>{{programa_facturacion}}</em>. ¿Hablamos esta semana para revisarlo?", "Creado por Laura · hoy 08:12"],
        ["Aviso 1 · periodo mensual septiembre", "38 clientes mensuales", "t-info", "Hola {{nombre}}, para cerrar <em>septiembre</em> nos falta: <em>{{pendientes}}</em>. Puedes enviarlo por aquí mismo. Fecha límite: <em>{{fecha_limite}}</em>.", "Generado por Nexa · 01/10 07:00"]].map(([t, n, c, body, by]) => `
        <div class="card"><div class="card__head"><div><h3>${t}</h3><p>${by}</p></div><span class="tag ${c}">${n}</span></div>
          <div class="card__body" style="display:grid;gap:14px">
            <div class="seg" style="justify-self:start"><button class="is-on">${ic("whatsapp", "ico--sm")} WhatsApp · ES</button><button>CA</button><button>${ic("mail", "ico--sm")} Email</button></div>
            <div class="tpl" style="background:#eef4f6"><div class="tpl__bub" style="max-width:88%;justify-self:end">${body}</div><small class="faint mono" style="justify-self:end">Plantilla Meta aprobada · utility</small></div>
            <div style="display:flex;align-items:center;gap:10px"><div class="av-stack">${recip.map((k) => av(k)).join("")}</div><span class="muted" style="font-size:12.5px">Se enviará L–V 9:00–19:00 · ~${n.split(" ")[0]} mensajes · coste estimado ${eur(+n.split(" ")[0] * 0.03)}</span></div>
            <div style="display:flex;gap:8px"><button class="btn btn--primary btn--sm" data-toast="Aprobado: ${n} en cola de envío">${ic("check")} Aprobar y enviar</button><button class="btn btn--ghost btn--sm">${ic("edit")} Editar</button><button class="btn btn--ghost btn--sm">${ic("users")} Ver destinatarios</button><button class="btn btn--danger btn--sm" style="margin-left:auto">Cancelar</button></div>
          </div></div>`).join("")}
    </div></div>
    <div class="pane" data-pane="cal" data-group="av"><div class="card"><div class="card__head"><div><h3>Octubre 2026 · presentación del 3T</h3><p>Días de aviso configurados y fecha límite</p></div><a href="#/config" class="btn btn--ghost btn--sm">${ic("settings")} Configurar</a></div>
      <div class="card__body"><div style="display:grid;grid-template-columns:repeat(7,1fr);gap:8px">${["L", "M", "X", "J", "V", "S", "D"].map((d) => `<div class="faint mono" style="text-align:center;font-size:11px">${d}</div>`).join("")}${Array.from({ length: 3 }, () => "<div></div>").join("")}${Array.from({ length: 31 }, (_, i) => { const d = i + 1, on = [1, 5, 12, 15].includes(d), lim = d === 20, today = d === 16; return `<div style="height:74px;border-radius:12px;border:1px solid ${lim ? "#f3c9c9" : "var(--line)"};padding:8px;background:${on ? "linear-gradient(135deg,rgba(34,227,242,.14),rgba(37,99,235,.08))" : lim ? "var(--bad-bg)" : "#fff"};${today ? "box-shadow:0 0 0 2px var(--accent)" : ""}"><b class="mono" style="font-size:12px">${d}</b>${on ? `<div class="tag t-ai tag--plain" style="margin-top:6px;height:20px;font-size:10.5px">Aviso ${[1, 5, 12, 15].indexOf(d) + 1}</div>` : ""}${lim ? `<div class="tag t-bad tag--plain" style="margin-top:6px;height:20px;font-size:10.5px">«El 20»</div>` : ""}${d === 12 ? `<div class="faint" style="font-size:10px;margin-top:2px">(10 era sáb.)</div>` : ""}</div>`; }).join("")}</div></div></div></div>
    <div class="pane" data-pane="env" data-group="av"><div class="card card--flush"><table class="tbl"><thead><tr><th>Cliente</th><th>Tipo</th><th>Canal</th><th>Enviado</th><th>Estado</th><th>Aprobado por</th></tr></thead><tbody>
      ${CLI.slice(0, 9).map((c, i) => `<tr><td><div class="cell-main">${cav(c)}<b>${c.n}</b></div></td><td>Aviso ${c.av}</td><td><span class="chip">${ic(c.canal === "whatsapp" ? "whatsapp" : "mail")} ${c.canal === "whatsapp" ? "WhatsApp" : "Email"}</span></td><td class="mono">15/10 09:${30 + i}</td><td>${i === 2 ? '<span class="tag t-bad">Fallido · buzón lleno</span>' : c.avEst === "leido" ? '<span class="tag t-ok">Leído</span>' : '<span class="tag t-info">Entregado</span>'}</td><td>${i % 3 ? '<span class="tag t-ai tag--plain">Automático</span>' : av("LG")}</td></tr>`).join("")}
    </tbody></table></div></div>`;
  };

  V.exportaciones = () => `
    ${ph({ title: "Exportaciones", sub: "Asientos validados listos para importar en A3ASESOR. Nada se escribe en el programa contable sin ti.", actions: `<span class="chip">${ic("plug")} Formato: A3 · fichero de enlace</span>` })}
    <div class="grid g-side">
      <div class="card card--flush"><div class="card__head"><h3>Lotes</h3><div class="seg"><button class="is-on">Todos</button><button>Pendientes de confirmar</button></div></div>
        <table class="tbl"><thead><tr><th>Lote</th><th>Cliente</th><th>Asientos</th><th>Generado</th><th>Estado</th><th></th></tr></thead><tbody>
        ${[["L-0234", 9, 12, "15/10 17:02", "contabilizado", "JV"], ["L-0233", 8, 27, "15/10 12:40", "generado", "LG"], ["L-0232", 2, 18, "14/10 19:15", "descargado", "LG"], ["L-0231", 5, 42, "14/10 10:03", "contabilizado", "LG"], ["L-0230", 1, 9, "08/10 16:22", "anulado", "MP"]].map(([l, c, n, d, e, t]) => `
          <tr><td class="mono"><b>${l}</b></td><td><div class="cell-main">${cav(cli(c))}<span>${cli(c).n}</span></div></td><td class="mono">${n}</td><td><div class="cell-main">${av(t)}<span class="mono muted">${d}</span></div></td>
          <td>${e === "contabilizado" ? '<span class="tag t-ok">Contabilizado</span>' : e === "generado" ? '<span class="tag t-info">Generado</span>' : e === "descargado" ? '<span class="tag t-warn">Descargado · sin confirmar</span>' : '<span class="tag t-mute">Anulado</span>'}</td>
          <td class="right nowrap">${e === "generado" || e === "descargado" ? `<button class="btn btn--ghost btn--xs">${ic("download")} SUENLACE.DAT</button> <button class="btn btn--ok btn--xs" data-toast="Lote ${l} marcado como contabilizado">${ic("check")} Confirmar</button>` : `<button class="icon-btn">${ic("more")}</button>`}</td></tr>`).join("")}
        </tbody></table></div>
      <div class="grid" style="align-content:start">
        <div class="card"><div class="card__head"><h3>Listo para exportar</h3><span class="tag t-info">97 asientos</span></div><div class="card__body" style="padding:0">
          ${[[6, 54], [1, 31], [10, 12]].map(([c, n]) => `<div class="lrow">${cav(cli(c))}<div class="lrow__main"><b>${cli(c).n}</b><small>${n} asientos validados</small></div><button class="btn btn--primary btn--xs" data-toast="Lote generado para ${cli(c).n}">${ic("download")} Generar</button></div>`).join("")}
        </div></div>
        <div class="card" style="background:var(--ink);color:#dce9ee;border-color:transparent"><div class="card__body"><span class="hero__kicker">Cómo funciona</span><ol style="margin-top:12px;display:grid;gap:10px;padding-left:18px;list-style:decimal;color:#a9bdc7;font-size:13px"><li>Genera el lote del cliente.</li><li>Impórtalo en A3 (Utilidades → Enlace contable).</li><li>Confirma aquí para marcarlo como contabilizado.</li></ol></div></div>
      </div>
    </div>`;

  V.conciliacion = () => {
    const M = [
      ["18/09", "Transf. Distribucions Ebre", 1210, "ok", "Fra. 2026/311 · Distribucions Ebre", "Casado por importe y fecha"],
      ["19/09", "Recibo Endesa Energía", -498.88, "ok", "Fra. PMR509N0045021 · Endesa", "Casado por importe y referencia"],
      ["21/09", "Comisión mantenimiento", -12.5, "ok", "Asiento 626 Servicios bancarios", "Regla recurrente"],
      ["22/09", "TPV ventas 22/09", 2384.6, "ai", "3 facturas emitidas (F-0921..F-0923)", "IA · suma exacta · confianza media"],
      ["25/09", "Transferencia a Fontaneria Bosch", -3630, "ai", "Fra. F-2026-188 · Fontaneria Bosch", "IA · nombre en concepto"],
      ["27/09", "Cargo tarjeta ****8812", -184.2, "none", null, "Sin documento"],
      ["29/09", "Seguros Sociales TGSS", -1442.31, "ok", "Asiento 476 · Seg. Sociales", "Regla recurrente"],
      ["30/09", "Ingreso efectivo", 600, "none", null, "Sin documento"],
    ];
    return `
    ${ph({ title: "Conciliación bancaria", sub: "El punteo llega casi hecho. Confirma lo propuesto y resuelve solo lo raro.", actions: `<select class="select"><option>Talleres Puig, SL</option>${CLI.slice(1).map((c) => `<option>${c.n}</option>`).join("")}</select><select class="select"><option>572001 · Sabadell ****4021</option><option>572002 · CaixaBank ****7710</option></select><button class="btn btn--primary btn--sm" data-toast="N43 importado: 142 movimientos, 0 duplicados, saldo cuadrado">${ic("upload")} Subir N43</button>` })}
    <div class="grid g-4">
      ${kpi({ label: "Movimientos 3T", icon: "bank", val: "142", delta: "Saldo final cuadrado" })}
      ${kpi({ label: "Punteados", icon: "checks", val: "131", unit: "· 92 %", delta: "+18 hoy" })}
      ${kpi({ label: "Propuestos por IA", icon: "sparkles", val: "7", delta: "Pendientes de confirmar" })}
      ${kpi({ label: "Sin documento", icon: "help", val: "4", delta: "Pedir al cliente", up: false })}
    </div>
    <div class="card mt"><div class="card__head"><div><h3>Septiembre 2026</h3><p>Movimientos del banco ↔ facturas y asientos</p></div><div class="prog" style="width:280px"><div class="prog__bar"><i style="--p:92%"></i></div><b>92%</b></div></div>
      <div class="card__body"><div class="recon">
        <div>${M.map(([d, c, a]) => `<div class="mv"><span class="lrow__ic ${a < 0 ? "bg-bad" : "bg-ok"}" style="width:32px;height:32px">${ic("bank", "ico--sm")}</span><div><b style="font-weight:600">${c}</b><div class="faint mono" style="font-size:11.5px">${d}/2026 · N43</div></div><span class="mv__amt ${a < 0 ? "neg" : "pos"}">${eur(a)}</span></div>`).join("")}</div>
        <div class="link-col">${M.map(([, , , s]) => `<div class="link ${s}"><span>${ic(s === "ok" ? "check" : s === "ai" ? "sparkles" : "help", "ico--sm")}</span></div>`).join("")}</div>
        <div>${M.map(([, , a, s, doc, why]) => s === "none" ? `<div class="mt-card ghost">${ic("help", "ico--sm")} Sin documento · <button class="btn--link btn" data-toast="Pedido al cliente por WhatsApp">Pedir al cliente</button> · <button class="btn--link btn">Crear asiento</button></div>`
          : `<div class="mt-card"><div style="flex:1"><b style="font-weight:600">${doc}</b><div class="faint" style="font-size:12px">${why}</div></div>${s === "ai" ? `<button class="btn btn--ok btn--xs" data-toast="Casación confirmada">${ic("check")}</button><button class="btn btn--ghost btn--xs">${ic("x")}</button>` : '<span class="tag t-ok tag--plain">Casado</span>'}</div>`).join("")}</div>
      </div></div></div>`;
  };

  const lineChart = ({ v, labels, base, goal, max, unit = "" }) => {
    const W = 640, H = 240, pl = 40, pr = 16, pt = 16, pb = 30, iw = W - pl - pr, ih = H - pt - pb;
    const x = (i) => pl + (i / (v.length - 1)) * iw, y = (n) => pt + ih - (n / max) * ih;
    const d = v.map((n, i) => `${i ? "L" : "M"}${x(i)},${y(n)}`).join("");
    const grid = [0, .25, .5, .75, 1].map((f) => `<line class="gl" x1="${pl}" x2="${W - pr}" y1="${y(max * f)}" y2="${y(max * f)}"/><text class="ax" x="${pl - 8}" y="${y(max * f) + 4}" text-anchor="end">${Math.round(max * f)}${unit}</text>`).join("");
    return `<svg class="chart" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none">${grid}
      ${base != null ? `<line class="base" x1="${pl}" x2="${W - pr}" y1="${y(base)}" y2="${y(base)}"/><text class="ax" x="${W - pr}" y="${y(base) - 6}" text-anchor="end" style="fill:#dc2626">Línea base ${base}${unit}</text>` : ""}
      ${goal != null ? `<line class="goal" x1="${pl}" x2="${W - pr}" y1="${y(goal)}" y2="${y(goal)}"/><text class="ax" x="${W - pr}" y="${y(goal) - 6}" text-anchor="end" style="fill:#059669">Objetivo ≤ ${goal}${unit}</text>` : ""}
      <path class="ar" d="${d}L${x(v.length - 1)},${pt + ih}L${pl},${pt + ih}Z"/><path class="ln" d="${d}"/>
      ${v.map((n, i) => `<circle class="pt" cx="${x(i)}" cy="${y(n)}" r="4"/>`).join("")}
      ${labels.map((l, i) => `<text class="ax" x="${x(i)}" y="${H - 8}" text-anchor="middle">${l}</text>`).join("")}</svg>`;
  };
  const barChart = (v, hi = []) => {
    const W = 640, H = 200, pb = 22, max = Math.max(...v), bw = W / v.length;
    return `<svg class="chart" style="height:200px" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none">${v.map((n, i) => { const h = (n / max) * (H - pb - 10); return `<rect class="bar ${hi.length && !hi.includes(i) ? "dim" : ""}" x="${i * bw + 3}" y="${H - pb - h}" width="${bw - 6}" height="${h}" rx="4"/>`; }).join("")}${[1, 5, 10, 15, 20, 25, 30].map((d) => `<text class="ax" x="${(d - 1) * bw + bw / 2}" y="${H - 6}" text-anchor="middle">${d}</text>`).join("")}</svg>`;
  };

  V.metricas = () => `
    ${ph({ title: "Métricas e impacto", sub: "Lo que Nexa ha cambiado en el despacho, medido contra la línea base de la auditoría.", actions: `<div class="seg"><button>4 semanas</button><button class="is-on">Trimestre</button><button>Año</button></div><button class="btn btn--ghost btn--sm" data-toast="Informe para socios generado">${ic("download")} Informe para socios</button>` })}
    <div class="grid g-4">
      ${kpi({ label: "OBJ-01 · Reclamar documentación", icon: "send", val: "4,2", unit: "h/semana", delta: "Base 20 h · −79 %", spark: [20, 19.5, 18, 12, 9, 7, 5.5, 4.2] })}
      ${kpi({ label: "OBJ-02 · Tiempo por factura", icon: "clock", val: "0,4", unit: "min", delta: "Base 1 min · −60 %", spark: [1, .95, .8, .7, .6, .5, .45, .4] })}
      ${kpi({ label: "OBJ-03 · Completos antes del día 10", icon: "target", val: "64", unit: "%", delta: "Base 31 % · +33 pts", spark: [31, 33, 38, 45, 52, 58, 61, 64] })}
      ${kpi({ label: "OBJ-04 · Consultas sin técnico", icon: "chat", val: "68", unit: "%", delta: "Objetivo ≥ 60 %", spark: [0, 22, 35, 48, 55, 61, 66, 68] })}
    </div>
    <div class="grid g-main mt">
      <div class="card"><div class="card__head"><div><h3>Horas semanales reclamando documentación</h3><p>Todo el equipo · desde el arranque del piloto</p></div><div class="legend"><span><i style="background:var(--accent)"></i>Real</span><span><i style="background:var(--bad)"></i>Línea base</span><span><i style="background:var(--ok)"></i>Objetivo</span></div></div>
        <div class="card__body">${lineChart({ v: [20, 19.5, 18, 12, 9, 7, 5.5, 4.2], labels: ["S34", "S35", "S36", "S37", "S38", "S39", "S40", "S41"], base: 20, goal: 5, max: 24, unit: " h" })}</div></div>
      <div class="card" style="background:var(--ink);color:#e8f3f7;border-color:transparent;position:relative;overflow:hidden">
        <div class="card__body" style="display:grid;gap:18px">
          <span class="hero__kicker">Retorno estimado 3T</span>
          <div><div style="font:700 46px var(--display);color:var(--cyan);letter-spacing:-.03em">26.430 €</div><p style="color:#9fb3bd">1.258 h recuperadas × 21 €/h</p></div>
          <div style="display:grid;gap:12px">${[["Contabilizar facturas", 540, 100], ["Reclamar documentación", 268, 50], ["Punteo bancario", 236, 44], ["Consultas repetidas", 214, 40]].map(([n, h, p]) => `<div><div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:6px;color:#cfe0e7"><span>${n}</span><span class="mono">${h} h</span></div><div class="ia-meter__bar" style="margin:0"><i style="--p:${p}%"></i></div></div>`).join("")}</div>
          <div style="display:flex;gap:16px;padding-top:14px;border-top:1px solid rgba(255,255,255,.1)"><div><b style="font:700 22px var(--display);color:#fff">2,9</b><div style="color:#9fb3bd;font-size:12px">técnicos liberados</div></div><div><b style="font:700 22px var(--display);color:#fff">+86</b><div style="color:#9fb3bd;font-size:12px">clientes sin contratar</div></div><div><b style="font:700 22px var(--display);color:#fff">318 €</b><div style="color:#9fb3bd;font-size:12px">coste del sistema / mes</div></div></div>
        </div></div>
    </div>
    <div class="grid g-3 mt">
      <div class="card"><div class="card__head"><div><h3>Documentos por día · octubre</h3><p>Pico en los días de aviso</p></div></div><div class="card__body">${barChart([180, 120, 90, 40, 410, 320, 210, 160, 120, 60, 30, 380, 290, 240, 512, 480, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 4, 11, 14, 15])}</div></div>
      <div class="card"><div class="card__head"><h3>Calidad de la IA</h3><span class="chip">Evaluación 14/10</span></div><div class="card__body" style="display:flex;gap:22px;align-items:center"><div class="donut"><div><b>72%</b><small>confianza alta</small></div></div><div class="kv" style="flex:1"><div><span>Tipo de documento</span><b class="mono">98,4 %</b></div><div><span>Campos críticos</span><b class="mono">96,1 %</b></div><div><span>Cuenta correcta</span><b class="mono">91,7 %</b></div><div><span>Recall ISP/intra</span><b class="mono" style="color:var(--ok)">100 %</b></div><div><span>Coste / documento</span><b class="mono">0,016 €</b></div></div></div></div>
      <div class="card card--flush"><div class="card__head"><h3>Por técnico</h3></div><table class="tbl"><thead><tr><th>Técnico</th><th>Validadas</th><th>Sin corrección</th><th>s / factura</th></tr></thead><tbody>${[["LG", 1120, 91, 7.8], ["MP", 940, 84, 11.2], ["NS", 610, 82, 12.9], ["JV", 870, 89, 8.6]].map(([k, n, p, s]) => `<tr><td><div class="cell-main">${av(k)}<span>${TEC[k].n.split(" ")[0]}</span></div></td><td class="mono">${num(n)}</td><td class="mono">${p} %</td><td class="mono">${s}</td></tr>`).join("")}</tbody></table></div>
    </div>`;

  V.config = () => `
    ${ph({ title: "Configuración", sub: "Garriga & Associats · instancia dedicada en la UE (Frankfurt)" })}
    <div class="tabs">${[["des", "Despacho"], ["usr", "Usuarios"], ["tpl", "Plantillas de mensajes"], ["chk", "Checklists"], ["cal", "Calendario fiscal"], ["ia", "IA y límites"], ["base", "Línea base"], ["int", "Integraciones"]].map(([k, l], i) => `<button data-tab="${k}" data-group="cf" class="${i ? "" : "is-on"}">${l}</button>`).join("")}</div>

    <div class="pane is-on" data-pane="des" data-group="cf"><div class="grid g-2">
      <div class="card"><div class="card__head"><h3>Calendario de avisos</h3></div><div class="card__body" style="display:grid;gap:18px">
        <div><div class="muted" style="font-size:12.5px;font-weight:600;margin-bottom:10px">Días del mes de presentación</div><div class="day-chips">${[1, 3, 5, 8, 10, 12, 15, 18, 20].map((d) => `<span class="day-chip ${[1, 5, 10, 15].includes(d) ? "on" : ""} ${d === 20 ? "lim" : ""}">${d}</span>`).join("")}</div></div>
        <div class="f-row"><label class="f"><span>Entrega extemporánea a partir del día</span><input value="15" /></label><label class="f"><span>Horario de envío</span><input value="L–V · 09:00 – 19:00" /></label></div>
        <div class="setting"><div><b>Aprobar el primer aviso de cada periodo</b><small>Recomendado durante los 3 primeros periodos</small></div><label class="switch"><input type="checkbox" checked /><i></i></label></div>
        <div class="setting"><div><b>Crear tarea de llamada desde el aviso 3</b><small>Se asigna al técnico del cliente</small></div><label class="switch"><input type="checkbox" checked /><i></i></label></div>
      </div></div>
      <div class="card"><div class="card__head"><h3>Despacho</h3></div><div class="card__body form">
        <label class="f"><span>Nombre comercial</span><input value="Garriga & Associats Assessors" /></label>
        <div class="f-row"><label class="f"><span>Programa contable</span><select><option>A3ASESOR</option><option>a3innuva</option><option>Sage 50</option><option>Contasol</option></select></label><label class="f"><span>Conservación de documentos</span><select><option>6 años</option><option>10 años</option></select></label></div>
        <label class="f"><span>Buzón de documentación</span><input value="documentacio@garriga-associats.cat" /></label>
        <label class="f"><span>Número de WhatsApp Business</span><input value="+34 930 001 220 · verificado" /></label>
      </div></div>
    </div></div>

    <div class="pane" data-pane="usr" data-group="cf"><div class="card card--flush"><div class="card__head"><h3>Usuarios</h3><button class="btn btn--primary btn--sm">${ic("plus")} Invitar</button></div><table class="tbl"><thead><tr><th>Persona</th><th>Rol</th><th>Cartera</th><th>2FA</th><th>Último acceso</th><th></th></tr></thead><tbody>
      ${[["LG", "Responsable", 90, "Hoy 08:02"], ["MP", "Técnico", 92, "Hoy 08:40"], ["NS", "Técnica", 88, "Hoy 09:11"], ["JV", "Técnico", 90, "Ayer 18:30"]].map(([k, r, n, l]) => `<tr><td><div class="cell-main">${av(k, "av--lg")}<div><b>${TEC[k].n}</b><small>${TEC[k].n.split(" ")[0].toLowerCase()}@garriga-associats.cat</small></div></div></td><td><select class="select"><option>${r}</option><option>Administrador</option><option>Administrativo</option></select></td><td class="mono">${n} clientes</td><td><span class="tag t-ok">TOTP activo</span></td><td class="mono muted">${l}</td><td><button class="icon-btn">${ic("more")}</button></td></tr>`).join("")}
      <tr><td><div class="cell-main"><span class="av av--lg" style="--c:#64748b">MR</span><div><b>Montse Roca</b><small>recepcio@garriga-associats.cat</small></div></div></td><td><select class="select"><option>Administrativo</option></select></td><td class="muted">—</td><td><span class="tag t-warn">Pendiente</span></td><td class="mono muted">Invitada</td><td><button class="icon-btn">${ic("more")}</button></td></tr>
    </tbody></table></div></div>

    <div class="pane" data-pane="tpl" data-group="cf"><div class="grid g-3">
      ${[["aviso_1", "Primer aviso", "Hola {{nombre}}, ya podemos preparar el <em>{{periodo}}</em>. Nos falta: <em>{{pendientes}}</em>. Envíalo por aquí mismo."], ["aviso_4", "Último aviso (día 15)", "{{nombre}}, el plazo acaba el <em>{{fecha_limite}}</em> y aún falta <em>{{pendientes}}</em>. Si llega más tarde quedará registrado como entrega fuera de plazo."], ["acuse", "Acuse de entrega", "Recibido, {{nombre}}: <em>{{recibido}}</em>. Sigue pendiente: <em>{{pendientes}}</em>."], ["reenvio_ilegible", "Foto ilegible", "No hemos podido leer la última foto. ¿Puedes repetirla con buena luz y sin cortar los bordes?"], ["bienvenida_bot", "Presentación del asistente", "Soy el asistente automático de <em>{{despacho}}</em>. Si lo necesitas, te paso con tu técnico."], ["respuesta_tecnico", "Respuesta del técnico", "{{nombre}}, te escribe <em>{{tecnico}}</em>: <em>{{texto}}</em>"]].map(([k, n, b]) => `
        <div class="tpl"><div style="display:flex;justify-content:space-between;align-items:center"><div><b>${n}</b><div class="mono faint" style="font-size:11.5px">${k}</div></div><span class="tag t-ok">Meta aprobada</span></div><div class="seg" style="justify-self:start"><button class="is-on">ES</button><button>CA</button></div><div class="tpl__bub">${b}</div><button class="btn btn--ghost btn--xs" style="justify-self:start">${ic("edit")} Editar</button></div>`).join("")}
    </div></div>

    <div class="pane" data-pane="chk" data-group="cf"><div class="grid g-3">
      ${[["Autónomo estimación directa", 142, ["Facturas emitidas", "Facturas recibidas", "Tickets", "Extracto por cuenta"]], ["SL estándar", 168, ["Facturas emitidas", "Facturas recibidas", "Tickets", "Extracto por cuenta", "Nóminas y SS"]], ["Andorra · IGI", 14, ["Factures emeses", "Factures rebudes", "Extracte bancari", "Declaració IGI"]]].map(([n, u, it]) => `<div class="card"><div class="card__head"><div><h3>${n}</h3><p>${u} clientes</p></div><button class="icon-btn">${ic("edit")}</button></div><div class="card__body">${it.map((x) => `<div class="check-item"><span class="tick bg-ai">${ic("layers")}</span><b>${x}</b><span class="sp"></span><span class="tag t-mute tag--plain">Obligatorio</span></div>`).join("")}<button class="btn btn--ghost btn--xs">${ic("plus")} Añadir documento</button></div></div>`).join("")}
    </div></div>

    <div class="pane" data-pane="cal" data-group="cf"><div class="card card--flush"><div class="card__head"><h3>Calendario fiscal 2026–2027</h3><button class="btn btn--ghost btn--sm">${ic("refresh")} Cargar calendario AEAT 2027</button></div><table class="tbl"><thead><tr><th>Ámbito</th><th>Periodo</th><th>Modelos</th><th>Fecha límite</th><th>Estado</th></tr></thead><tbody>
      ${[["ES", "3T 2026", "303 · 111 · 115 · 130", "20/10/2026", "En curso"], ["AD", "3T 2026", "IGI trimestral", "20/10/2026", "En curso"], ["ES", "Octubre 2026", "303 mensual · SII", "30/11/2026", "Próximo"], ["ES", "4T 2026", "303 · 111 · 115 · 130", "30/01/2027", "Próximo"], ["ES", "Anual 2026", "390 · 190 · 180 · 347", "30/01/2027 · 02/03/2027", "Próximo"], ["ES", "VeriFactu sociedades", "—", "01/01/2027", "Normativa"], ["ES", "VeriFactu resto", "—", "01/07/2027", "Normativa"]].map(([a, p, m, f, e]) => `<tr><td><span class="chip">${a}</span></td><td><b>${p}</b></td><td class="mono muted">${m}</td><td class="mono">${f}</td><td>${e === "En curso" ? '<span class="tag t-info">En curso</span>' : e === "Normativa" ? '<span class="tag t-violet">Normativa</span>' : '<span class="tag t-mute">Próximo</span>'}</td></tr>`).join("")}
    </tbody></table></div></div>

    <div class="pane" data-pane="ia" data-group="cf"><div class="grid g-2">
      <div class="card"><div class="card__head"><h3>Límites de gasto</h3><span class="chip">Hoy 8,40 €</span></div><div class="card__body" style="display:grid;gap:16px">
        <label class="f"><span>Límite diario de IA · 25 €</span><input type="range" min="5" max="100" value="25" style="padding:0;height:6px;accent-color:#0891b2" /></label>
        <div class="setting"><div><b>Pausar el asistente al llegar al límite</b><small>Las consultas se escalan al técnico</small></div><label class="switch"><input type="checkbox" checked /><i></i></label></div>
        <div class="setting"><div><b>Avisar al 80 %</b><small>Email a administración</small></div><label class="switch"><input type="checkbox" checked /><i></i></label></div>
      </div></div>
      <div class="card"><div class="card__head"><h3>Modelos y prompts</h3><span class="tag t-ok">Evaluación superada</span></div><div class="card__body kv">
        <div><span>Clasificación (IA-01)</span><b class="mono">ligero · p-v3</b></div><div><span>Extracción (IA-02)</span><b class="mono">gama media · p-v5</b></div><div><span>Propuesta contable (IA-03)</span><b class="mono">gama media · p-v4</b></div><div><span>Asistente (IA-05)</span><b class="mono">gama media · p-v2</b></div><div><span>Región de proceso</span><b>UE · Frankfurt</b></div><div><span>Uso de datos para entrenar</span><b style="color:var(--ok)">No</b></div>
        <button class="btn btn--ghost btn--sm" style="margin-top:8px" data-toast="Evaluación lanzada sobre 300 casos dorados">${ic("zap")} Ejecutar evaluación</button>
      </div></div>
    </div></div>

    <div class="pane" data-pane="base" data-group="cf"><div class="card"><div class="card__head"><div><h3>Línea base medida en la auditoría</h3><p>Se compara automáticamente en Métricas</p></div></div><div class="card__body form">
      ${[["OBJ-01 · Horas/semana reclamando documentación", "20", "≤ 5"], ["OBJ-02 · Minutos por factura", "1,0", "−50 %"], ["OBJ-03 · % completos antes del día 10", "31 %", "+30 pts"], ["OBJ-04 · % consultas sin técnico", "0 %", "≥ 60 %"]].map(([n, b, o]) => `<div class="f-row" style="grid-template-columns:2fr 1fr 1fr;align-items:end"><label class="f"><span>Indicador</span><input value="${n}" disabled /></label><label class="f"><span>Valor base</span><input value="${b}" /></label><label class="f"><span>Objetivo</span><input value="${o}" /></label></div>`).join("")}
    </div></div></div>

    <div class="pane" data-pane="int" data-group="cf"><div class="grid g-3">
      ${[["whatsapp", "WhatsApp Business", "+34 930 001 220 · 6 plantillas aprobadas", "Conectado", "t-ok"], ["mail", "Microsoft 365", "documentacio@garriga-associats.cat", "Conectado", "t-ok"], ["fileText", "A3ASESOR", "Exportación por fichero de enlace", "Configurado", "t-ok"], ["link", "Holded", "3 clientes autorizados", "Conectado", "t-ok"], ["bank", "Norma 43", "Subida manual o por email", "Activo", "t-ok"], ["plug", "n8n", "Ingesta de email y tareas programadas", "Operativo", "t-ok"]].map(([i, n, d, e, c]) => `<div class="card"><div class="card__body" style="display:flex;gap:14px;align-items:flex-start"><span class="lrow__ic bg-ai" style="width:44px;height:44px">${ic(i)}</span><div style="flex:1"><b>${n}</b><div class="muted" style="font-size:12.5px">${d}</div><div style="margin-top:10px;display:flex;gap:8px;align-items:center"><span class="tag ${c}">${e}</span><button class="btn btn--link btn" style="font-size:12.5px">Gestionar</button></div></div></div></div>`).join("")}
    </div></div>`;

  V.importar = () => `
    ${ph({ crumb: `<a href="#/clientes">Cartera</a> ${ic("chevronRight", "ico--sm")} Importar`, title: "Importar cartera", sub: "Carga los clientes desde un CSV exportado de A3 o de vuestro Excel." })}
    <div class="card"><div class="card__body">
      <div class="steps"><div class="step done"><span class="step__n">${ic("check", "ico--sm")}</span><b>Subir fichero</b></div><div class="step done"><span class="step__n">${ic("check", "ico--sm")}</span><b>Mapear columnas</b></div><div class="step cur"><span class="step__n">3</span><b>Revisar</b></div><div class="step"><span class="step__n">4</span><b>Confirmar</b></div></div>
      <div class="grid g-side">
        <div>
          <div class="grid g-3" style="margin-bottom:18px">
            <div class="card kpi" style="box-shadow:none"><div class="kpi__label"><span class="kpi__ic bg-ok">${ic("check")}</span>Listos</div><div class="kpi__val">348</div></div>
            <div class="card kpi" style="box-shadow:none"><div class="kpi__label"><span class="kpi__ic bg-warn">${ic("refresh")}</span>Actualizan existentes</div><div class="kpi__val">9</div></div>
            <div class="card kpi" style="box-shadow:none"><div class="kpi__label"><span class="kpi__ic bg-bad">${ic("alert")}</span>Con errores</div><div class="kpi__val">5</div></div>
          </div>
          <div class="card card--flush"><div class="card__head"><h3>Filas con errores</h3><button class="btn btn--ghost btn--sm">${ic("download")} Descargar errores</button></div><table class="tbl"><thead><tr><th>Fila</th><th>Cliente</th><th>Campo</th><th>Problema</th><th></th></tr></thead><tbody>
            ${[[12, "Fusteria Ripoll SL", "nif", "Dígito de control inválido (B5566778X)"], [57, "Joan Mir Puig", "telefono", "No es un número E.164"], [103, "Dental Sarrià, SLP", "nif", "Duplicado en la fila 41"], [211, "Vins del Priorat, SL", "tecnico_email", "No existe el usuario «pere@…»"], [340, "Botiga Escaldes", "periodicidad", "Semestral solo para clientes de Andorra"]].map(([r, n, f, m]) => `<tr><td class="mono">${r}</td><td><b>${n}</b></td><td><span class="chip mono">${f}</span></td><td style="color:var(--bad)">${m}</td><td><button class="btn btn--ghost btn--xs">${ic("edit")} Corregir</button></td></tr>`).join("")}
          </tbody></table></div>
        </div>
        <div class="grid" style="align-content:start">
          <div class="drop" style="padding:22px"><div class="empty__ic" style="margin-bottom:10px">${ic("fileText", "ico--lg")}</div><b>cartera_garriga_2026.csv</b><div class="muted" style="font-size:12.5px">362 filas · 12 columnas · UTF-8</div><button class="btn btn--link btn" style="margin-top:8px">Cambiar fichero</button></div>
          <div class="card"><div class="card__head"><h3>Mapeo de columnas</h3><span class="tag t-ai tag--plain">${ic("sparkles", "ico--sm")} Detectado</span></div><div class="card__body" style="padding:10px 18px">${[["CIF/NIF", "nif"], ["Nombre", "razon_social"], ["Móvil", "telefono_whatsapp"], ["Email", "emails"], ["Gestor", "tecnico_email"], ["Cod. A3", "codigo_empresa"]].map(([a, b]) => `<div class="map-row"><span class="chip mono" style="justify-content:center">${a}</span><span class="faint" style="text-align:center">→</span><span class="chip mono" style="justify-content:center;background:#effafc;color:var(--accent)">${b}</span><span style="color:var(--ok)">${ic("check", "ico--sm")}</span></div>`).join("")}</div></div>
          <button class="btn btn--primary" data-toast="348 clientes importados · 9 actualizados">Importar 357 clientes ${ic("chevronRight")}</button>
        </div>
      </div>
    </div></div>`;

  const loginHTML = (step) => `
    <div class="login__art">
      <a class="side__brand" href="#/login" style="padding:0"><img src="assets/logo-nexavision.jpg" alt="" width="40" height="40" /><div><b style="color:#fff">Nexa<span>Despacho</span></b><small style="color:#8ea3ad">by NexaVision AI</small></div></a>
      <div class="login__float">
        <div><span class="lrow__ic" style="width:30px;height:30px;background:rgba(52,211,153,.15);color:#34d399">${ic("check", "ico--sm")}</span>Endesa → 628 · validada</div>
        <div><span class="lrow__ic" style="width:30px;height:30px;background:rgba(34,227,242,.15);color:#22e3f2">${ic("send", "ico--sm")}</span>Aviso 2 enviado a 84 clientes</div>
        <div><span class="lrow__ic" style="width:30px;height:30px;background:rgba(251,191,36,.15);color:#fbbf24">${ic("alert", "ico--sm")}</span>Posible ISP · revisar</div>
      </div>
      <h2>El trimestre, <span>sin perseguir a nadie</span>.</h2>
      <ul>
        <li>${ic("check")} La documentación se pide sola y queda registrada con fecha</li>
        <li>${ic("check")} La IA propone el asiento; tu equipo valida</li>
        <li>${ic("check")} Datos alojados en la UE · acceso con doble factor</li>
      </ul>
    </div>
    <div class="login__form"><div class="login__box">
      ${step === 1 ? `
        <span class="tag t-ai tag--plain">${ic("shield", "ico--sm")} Garriga &amp; Associats</span>
        <h1>Entra en tu despacho</h1><p class="muted">Accede con tu cuenta del equipo.</p>
        <div class="form" style="margin-top:24px">
          <label class="f"><span>Email</span><input value="laura@garriga-associats.cat" /></label>
          <label class="f"><span>Contraseña</span><input type="password" value="••••••••••••" /></label>
          <div style="display:flex;justify-content:space-between;font-size:13px"><label style="display:flex;gap:8px;align-items:center"><input type="checkbox" class="cbx" checked /> Recordar este equipo</label><a class="btn--link btn" style="font-size:13px">¿Has olvidado la contraseña?</a></div>
          <button class="btn btn--primary" style="height:46px" data-login="2">Continuar</button>
          <div class="divider">o</div>
          <button class="btn btn--ghost" style="height:46px"><svg width="16" height="16" viewBox="0 0 23 23"><path fill="#f35325" d="M1 1h10v10H1z"/><path fill="#81bc06" d="M12 1h10v10H12z"/><path fill="#05a6f0" d="M1 12h10v10H1z"/><path fill="#ffba08" d="M12 12h10v10H12z"/></svg> Entrar con Microsoft</button>
        </div>` : `
        <span class="lrow__ic bg-ai" style="width:52px;height:52px">${ic("shield", "ico--lg")}</span>
        <h1>Verificación en dos pasos</h1><p class="muted">Introduce el código de 6 dígitos de tu app de autenticación.</p>
        <div class="otp" style="margin-top:24px">${[4, 8, 1, 9, "", ""].map((d, i) => `<input maxlength="1" value="${d}" ${i === 4 ? "autofocus" : ""} />`).join("")}</div>
        <a href="#/panel" class="btn btn--primary" style="height:46px;width:100%;margin-top:20px">Verificar y entrar</a>
        <p class="muted" style="font-size:12.5px;margin-top:16px;text-align:center">¿Sin acceso a la app? <a class="btn--link btn" style="font-size:12.5px">Usa un código de recuperación</a></p>
        <button class="btn btn--link" style="margin:18px auto 0;display:flex" data-login="1">${ic("chevronLeft", "ico--sm")} Volver</button>`}
    </div></div>`;

  /* -------------------------------------------------------------- shell UI */
  const nav = $("#nav");
  nav.innerHTML = ROUTES_META.map(([g, items]) => `<div class="nav-group"><p>${g}</p>${items.map(([r, l, i, n, hot]) => `<a class="nav-item" href="#/${r}" data-r="${r}">${ic(i)}<span>${l}</span>${n ? `<span class="count ${hot ? "count--hot" : ""}">${n}</span>` : ""}</a>`).join("")}</div>`).join("");

  $("#dd-notif").innerHTML = `<div class="dd__head"><b>Notificaciones</b><button class="btn--link btn" style="font-size:12.5px">Marcar todo leído</button></div>
    ${[["chat", "bg-violet", "Consulta escalada", "Bar Ca l'Anna · requerimiento de Hacienda", "hace 5 min", "#/conversaciones"], ["alert", "bg-warn", "Posible ISP detectada", "Fontaneria Bosch → Construccions Vall", "hace 18 min", "#/validar/1048"], ["help", "bg-warn", "Documento sin asignar", "+34 611 902 448 · número no registrado", "hace 32 min", "#/sin-asignar"], ["download", "bg-info", "Lote L-0233 listo", "Arquitectura Mas i Font · 27 asientos", "hace 1 h", "#/exportaciones"], ["alert", "bg-bad", "Email rebotado", "Construccions Vall · buzón lleno", "hace 2 h", "#/tareas"], ["sparkles", "bg-ai", "Evaluación IA superada", "96,1 % en campos críticos", "ayer", "#/metricas"]].map(([i, b, t, d, w, h]) => `<a class="lrow" href="${h}"><span class="lrow__ic ${b}">${ic(i)}</span><div class="lrow__main"><b>${t}</b><small>${d}</small></div><span class="lrow__meta">${w}</span></a>`).join("")}`;

  const view = $("#view"), shell = $("#shell"), login = $("#login");
  let liveTimer;
  const render = () => {
    const [r = "panel", arg] = location.hash.replace(/^#\/?/, "").split("/");
    clearInterval(liveTimer);
    if (r === "login") {
      shell.hidden = true; login.hidden = false; login.innerHTML = loginHTML(1); hydrate(login);
      return;
    }
    shell.hidden = false; login.hidden = true;
    const fn = V[r] || V.panel;
    view.innerHTML = fn(arg);
    view.style.animation = "none"; void view.offsetWidth; view.style.animation = "";
    hydrate(view);
    $$(".nav-item").forEach((a) => a.classList.toggle("is-active", a.dataset.r === r || (r === "validar" && a.dataset.r === "bandeja") || (r === "cliente" && a.dataset.r === "clientes")));
    shell.classList.remove("side-open");
    window.scrollTo(0, 0);
    const ring = $(".ring .fg", view);
    if (ring) requestAnimationFrame(() => setTimeout(() => (ring.style.strokeDashoffset = ring.dataset.off), 60));
    const live = $("#live", view);
    if (live) {
      let k = 0;
      const push = () => {
        const [t, s, c] = LIVE[k++ % LIVE.length];
        live.insertAdjacentHTML("afterbegin", `<li style="--c:${c};animation:viewIn .4s ease"><b>${t}</b><small>${s} · ahora</small></li>`);
        while (live.children.length > 5) live.lastElementChild.remove();
      };
      for (let i = 0; i < 5; i++) push();
      liveTimer = setInterval(push, 3500);
    }
    updateSel();
  };
  addEventListener("hashchange", render);

  /* ------------------------------------------------------------ behaviours */
  const toast = (msg) => {
    const el = document.createElement("div");
    el.className = "toast";
    el.innerHTML = `<span class="lrow__ic">${ic("check", "ico--sm")}</span><span>${msg}</span>`;
    $("#toasts").append(el);
    setTimeout(() => { el.classList.add("out"); setTimeout(() => el.remove(), 250); }, 2800);
  };
  const updateSel = () => {
    const n = $$(".pane.is-on [data-sel]:checked").length, bulk = $("#bulk");
    if (!bulk) return;
    $("#selN").textContent = n;
    bulk.classList.toggle("is-on", n > 0);
    $$("[data-sel]").forEach((c) => c.closest("tr").classList.toggle("is-sel", c.checked));
  };

  document.addEventListener("click", (e) => {
    const t = e.target;
    const tab = t.closest("[data-tab]");
    if (tab) {
      const g = tab.dataset.group;
      $$(`[data-tab][data-group="${g}"]`).forEach((b) => b.classList.toggle("is-on", b === tab));
      $$(`[data-pane][data-group="${g}"]`).forEach((p) => p.classList.toggle("is-on", p.dataset.pane === tab.dataset.tab));
      updateSel();
      return;
    }
    const segBtn = t.closest(".seg button");
    if (segBtn) $$("button", segBtn.parentElement).forEach((b) => b.classList.toggle("is-on", b === segBtn));
    const tst = t.closest("[data-toast]");
    if (tst) toast(tst.dataset.toast);
    const row = t.closest("tr[data-href]");
    if (row && !t.closest("button, input, a")) location.hash = row.dataset.href;
    if (t.matches("[data-selall]")) { $$("[data-sel]", t.closest("table")).forEach((c) => (c.checked = t.checked)); updateSel(); }
    if (t.matches("[data-sel]")) updateSel();
    if (t.closest("[data-clearsel]")) { $$("[data-sel], [data-selall]").forEach((c) => (c.checked = false)); updateSel(); }
    const cv = t.closest("[data-conv]");
    if (cv) {
      convSel = +cv.dataset.conv;
      $$(".conv").forEach((x) => x.classList.toggle("is-on", x === cv));
      const c = CONV.find((x) => x.id === convSel);
      $("#chat").innerHTML = chatHTML(c); $("#ctx").innerHTML = ctxHTML(c);
    }
    const sg = t.closest(".sugg");
    if (sg) { const ta = $(".composer textarea"); if (ta) ta.value = sg.textContent; }
    const lg = t.closest("[data-login]");
    if (lg) { login.innerHTML = loginHTML(+lg.dataset.login); hydrate(login); }
    const dd = t.closest("[data-dd]");
    $$(".dd__menu").forEach((m) => { if (!dd || m.id !== "dd-" + dd.dataset.dd) m.classList.remove("is-open"); });
    if (dd) $("#dd-" + dd.dataset.dd).classList.toggle("is-open");
    if (t.closest("#menuBtn")) shell.classList.toggle("side-open");
    if (t.closest("#openCmd")) openCmd();
    if (t.closest(".nav-item") && innerWidth < 1080) shell.classList.remove("side-open");
  });

  document.addEventListener("mouseover", (e) => {
    const f = e.target.closest(".fld");
    $$(".hl[data-h]").forEach((h) => h.classList.toggle("is-on", !!f && h.dataset.h === f.dataset.f));
    $$(".fld").forEach((x) => x.classList.toggle("is-on", x === f));
  });
  document.addEventListener("focusin", (e) => {
    const f = e.target.closest(".fld");
    if (f) $$(".hl[data-h]").forEach((h) => h.classList.toggle("is-on", h.dataset.h === f.dataset.f));
  });

  /* ------------------------------------------------------- command palette */
  const cmd = $("#cmd"), cmdInput = $("#cmdInput"), cmdList = $("#cmdList");
  const CMD = [
    ...ROUTES_META.flatMap(([g, items]) => items.map(([r, l, i]) => ({ g: "Pantallas", l, i, h: `#/${r}`, k: "Ir" }))),
    ...CLI.map((c) => ({ g: "Clientes", l: c.n, i: "user", h: `#/cliente/${c.id}`, k: c.nif })),
    ...PROP.slice(0, 6).map((p) => ({ g: "Facturas", l: `${p.prov} · ${p.num}`, i: "fileText", h: `#/validar/${p.id}`, k: eur(p.total) })),
    { g: "Acciones", l: "Validar todas las propuestas de confianza alta", i: "checks", h: "#/bandeja", k: "94" },
    { g: "Acciones", l: "Subir extracto Norma 43", i: "upload", h: "#/conciliacion", k: "N43" },
    { g: "Acciones", l: "Enviar aviso informativo VeriFactu", i: "send", h: "#/avisos", k: "51" },
    { g: "Acciones", l: "Cerrar sesión", i: "logout", h: "#/login", k: "" },
  ];
  let cmdIdx = 0, cmdItems = [];
  const drawCmd = () => {
    const q = cmdInput.value.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
    cmdItems = CMD.filter((x) => !q || (x.l + " " + x.k).toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").includes(q)).slice(0, 14);
    cmdIdx = Math.min(cmdIdx, Math.max(cmdItems.length - 1, 0));
    let g = "";
    cmdList.innerHTML = cmdItems.length ? cmdItems.map((x, i) => `${x.g !== g ? `<div class="cmd__grp">${(g = x.g)}</div>` : ""}<div class="cmd__it ${i === cmdIdx ? "is-on" : ""}" data-ci="${i}"><span class="lrow__ic bg-ai">${ic(x.i, "ico--sm")}</span><span>${x.l}</span><small>${x.k}</small></div>`).join("")
      : `<div class="empty" style="padding:30px"><div class="empty__ic">${ic("sparkles", "ico--lg")}</div><b>Pregúntaselo a Nexa</b><p style="margin-top:4px">Sin resultados · prueba con un cliente, proveedor o pantalla de la demo</p></div>`;
  };
  const openCmd = () => { cmd.hidden = false; cmdInput.value = ""; cmdIdx = 0; drawCmd(); setTimeout(() => cmdInput.focus(), 10); };
  const closeCmd = () => (cmd.hidden = true);
  cmdInput.addEventListener("input", () => { cmdIdx = 0; drawCmd(); });
  cmd.addEventListener("click", (e) => { const it = e.target.closest("[data-ci]"); if (it) { location.hash = cmdItems[+it.dataset.ci].h; closeCmd(); } else if (e.target === cmd) closeCmd(); });
  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); cmd.hidden ? openCmd() : closeCmd(); return; }
    if (!cmd.hidden) {
      if (e.key === "Escape") closeCmd();
      if (e.key === "ArrowDown") { cmdIdx = Math.min(cmdIdx + 1, cmdItems.length - 1); drawCmd(); e.preventDefault(); }
      if (e.key === "ArrowUp") { cmdIdx = Math.max(cmdIdx - 1, 0); drawCmd(); e.preventDefault(); }
      if (e.key === "Enter" && cmdItems[cmdIdx]) { location.hash = cmdItems[cmdIdx].h; closeCmd(); }
      return;
    }
    if (/input|textarea|select/i.test(document.activeElement.tagName)) return;
    const r = location.hash.split("/")[1];
    if (r === "validar" && (e.key === "v" || e.key === "V")) { $(".stickybar a.btn--primary")?.click(); }
    if (r === "validar" && (e.key === "r" || e.key === "R")) toast("Propuesta rechazada");
    if (r === "validar" && /ArrowDown|ArrowUp/.test(e.key)) { e.preventDefault(); const id = +location.hash.split("/")[2]; const idx = PROP.findIndex(p => p.id === id); location.hash = "#/validar/" + PROP[(idx + (e.key === "ArrowDown" ? 1 : -1) + PROP.length) % PROP.length].id; }
  });

  hydrate();
  if (!location.hash) location.hash = "#/panel";
  render();
})();
