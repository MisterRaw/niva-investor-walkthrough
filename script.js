const steps = [
  {
    title: "What NIVA is",
    sub: "Proof engine + marketplace + operator logic",
    image: "assets/screens/landing.jpg",
    pill: "Step 1",
    cardTitle: "From messy compliance to financeable nature outcomes",
    cardBody: "NIVA turns long-duration environmental obligations into a gated, verifiable, financeable asset class. The platform makes compliance operational, auditable, and saleable.",
    chips: ["Compliance proof engine", "Marketplace distribution", "Operator sequence"],
  },
  {
    title: "Marketplace",
    sub: "Verified sites and units (public-facing)",
    image: "assets/screens/marketplace.jpg",
    pill: "Step 2",
    cardTitle: "Marketplace as distribution engine",
    cardBody: "Investors and off-takers see projects, units, and verification status. This becomes the trusted storefront for BNG supply, preferred by LPAs.",
    chips: ["Filters", "Verified status", "Units and pricing (next)"],
  },
  {
    title: "Guided access",
    sub: "Sign in to the compliance layer",
    image: "assets/screens/login.jpg",
    pill: "Step 3",
    cardTitle: "Compliance layer is gated",
    cardBody: "Sensitive compliance data is behind sign-in. Admins can see all sites, clients see only the site(s) they’re allocated to. Public areas remain open.",
    chips: ["RLS policies", "Per-site access", "Auditability"],
  },
  {
    title: "Executive dashboard",
    sub: "Operational view across obligations",
    image: "assets/screens/dashboard.jpg",
    pill: "Step 4",
    cardTitle: "A single operational truth",
    cardBody: "An at-a-glance view of obligations, evidence, and audit activity. This is what turns a PDF pile into a system investors can trust.",
    chips: ["Obligations count", "Evidence stored", "Latest audit event"],
  },
  {
    title: "Multiple Site Management",
    sub: "Each habitat bank is a managed project inside one operator system",
    image: "assets/screens/sites.jpg",
    pill: "Step 5",
    cardTitle: "Sites are the core container for delivery and compliance",
    cardBody: "Every habitat bank is represented as a structured site record. Once a site exists, obligations, evidence, audit events and snapshots attach to it, giving investors and regulators a repeatable, scalable model across a portfolio.",
    chips: ["Site record", "Portfolio scale", "Operator view", "Compliance-ready"],
  },
  {
    title: "Obligations",
    sub: "The 30-year lifecycle becomes trackable",
    image: "assets/screens/obligations.jpg",
    pill: "Step 6",
    cardTitle: "Obligations become manageable objects",
    cardBody: "Each obligation has outcomes, dates, status, and evidence links. This is where governance becomes day-to-day operable.",
    chips: ["Create obligation", "Status tracking", "Compliance snapshot"],
  },
  {
    title: "Evidence & audit trail",
    sub: "Chain of custody for proof",
    image: "assets/screens/evidence.jpg",
    pill: "Step 7",
    cardTitle: "Proof you can interrogate",
    cardBody: "Evidence uploads and the audit trail make compliance defensible. Investors get confidence, LPAs get clarity, operators get control.",
    chips: ["Evidence items", "Audit trail", "User accountability"],
  },
{
    title: "Compliance Snapshot",
    sub: "Investor-clear reporting at a click",
    image: "assets/screens/snapshot.jpg",
    pill: "Step 8",
    cardTitle: "One-page proof for investors and regulators",
    cardBody: "The snapshot auto-generates a clean, standardised report: site summary, obligation status, evidence counts, and recent audit events. It turns operational reality into investable confidence.",
    chips: ["Board-ready PDF", "Status breakdown", "Evidence counts", "Audit summary"]
},
  {
  title: "ROI at scale",
  sub: "Slider shows portfolio upside",
  pill: "Step 9",
  custom: "roi",
  cardTitle: "From 2 example sites to 100+",
  cardBody: "Use two representative habitat banks to show unit economics, then scale the model across a portfolio with lag and sell-through assumptions.",
  chips: ["Site A & B", "Cashflow logic", "Lag points", "Portfolio scaling"]
},
];

let current = 0;

const elSteps = document.getElementById("steps");
const screenCustom = document.getElementById("screenCustom");
const screenImage = document.getElementById("screenImage");
const stageTitle = document.getElementById("stageTitle");
const stageSubtitle = document.getElementById("stageSubtitle");
const stagePill = document.getElementById("stagePill");
const cardTitle = document.getElementById("cardTitle");
const cardBody = document.getElementById("cardBody");
const chips = document.getElementById("chips");

const btnPrev = document.getElementById("btnPrev");
const btnNext = document.getElementById("btnNext");
const btnShare = document.getElementById("btnShare");

const roiPanel = document.getElementById("roiPanel");
const roiSlider = document.getElementById("roiSlider");
const roiSites = document.getElementById("roiSites");
const roiUnits = document.getElementById("roiUnits");
const roiPrice = document.getElementById("roiPrice");
const roiRevenue = document.getElementById("roiRevenue");
const roiMargin = document.getElementById("roiMargin");

// Replace these with the real “site card” numbers you already have.
// For now: sensible placeholders.
const BASE = {
  sites: 5,
  unitsPerSite: 200,     // placeholder
  pricePerUnit: 22000,   // placeholder (£)
  netMarginPct: 0.28,    // placeholder (28%)
};

function money(n){
  return "£" + Math.round(n).toLocaleString("en-GB");
}

function renderSteps(){
  elSteps.innerHTML = "";
  steps.forEach((s, i) => {
    const div = document.createElement("div");
    div.className = "step" + (i === current ? " active" : "");
    div.id = `step-${i}`;
    div.innerHTML = `
      <div class="step-num">${i+1}</div>
      <div>
        <div class="step-title">${s.title}</div>
        <div class="step-sub">${s.sub}</div>
      </div>
    `;
    div.addEventListener("click", () => go(i));
    elSteps.appendChild(div);
  });
}

function renderChips(list){
  chips.innerHTML = "";
  (list || []).forEach(t => {
    const c = document.createElement("div");
    c.className = "chip";
    c.textContent = t;
    chips.appendChild(c);
  });
}

function renderROI(){
  const sites = Number(roiSlider.value);
  roiSites.textContent = sites;

  // Linear scaling for demo.
  // Later: replace with scenario logic (sell-through curve, lag, phased capex/opex).
  const totalUnits = sites * BASE.unitsPerSite;
  const grossRevenue = totalUnits * BASE.pricePerUnit;
  const netMargin = grossRevenue * BASE.netMarginPct;

  roiUnits.textContent = totalUnits.toLocaleString("en-GB");
  roiPrice.textContent = money(BASE.pricePerUnit);
  roiRevenue.textContent = money(grossRevenue);
  roiMargin.textContent = money(netMargin);
}

function renderROISites(){
  // TODO: replace these with your real Site Card numbers once final.
  const siteA = {
    name: "Site A – Species-rich grassland uplift",
    img: "assets/photos/site-a.jpg",
    area: "100 acres",
    units: "20,000",
    price: "£22,000",
    note: "Baseline → habitat plan → legal securement → contractable units."
  };

  const siteB = {
    name: "Site B – Grassland + watercourse uplift",
    img: "assets/photos/site-b.jpg",
    area: "100 acres",
    units: "22,000",
    price: "£24,000",
    note: "Includes watercourse works (higher capex, potentially higher unit yield)."
  };

  screenCustom.innerHTML = `
    <div class="site">
      <img src="${siteA.img}" alt="Site A photo" />
      <div class="site-body">
        <p class="site-title">${siteA.name}</p>
        <p class="muted tiny">${siteA.note}</p>

        <div class="site-meta">
          <div class="site-kpi"><strong>${siteA.area}</strong><span class="tiny muted">Area</span></div>
          <div class="site-kpi"><strong>${siteA.units}</strong><span class="tiny muted">Units</span></div>
          <div class="site-kpi"><strong>${siteA.price}</strong><span class="tiny muted">Illustrative price</span></div>
          <div class="site-kpi"><strong>Operator-led</strong><span class="tiny muted">Delivery model</span></div>
        </div>
      </div>
    </div>

    <div class="site">
      <img src="${siteB.img}" alt="Site B photo" />
      <div class="site-body">
        <p class="site-title">${siteB.name}</p>
        <p class="muted tiny">${siteB.note}</p>

        <div class="site-meta">
          <div class="site-kpi"><strong>${siteB.area}</strong><span class="tiny muted">Area</span></div>
          <div class="site-kpi"><strong>${siteB.units}</strong><span class="tiny muted">Units</span></div>
          <div class="site-kpi"><strong>${siteB.price}</strong><span class="tiny muted">Illustrative price</span></div>
          <div class="site-kpi"><strong>Higher capex</strong><span class="tiny muted">Watercourse works</span></div>
        </div>
      </div>
    </div>
  `;
}

function go(i){
  current = Math.max(0, Math.min(steps.length - 1, i));
  const s = steps[current];

  stageTitle.textContent = s.title;
  stageSubtitle.textContent = s.sub;
  stagePill.textContent = s.pill;

   // SCREEN: either show an image, or show custom content (ROI sites)
  if (s.custom === "roi") {
    // For ROI step: hide screenshot, show Site A & B cards
    screenImage.removeAttribute("src");
    screenImage.alt = "";
    screenImage.style.display = "none";

    screenCustom.classList.remove("hidden");
    renderROISites();
  } else {
    // For normal steps: hide custom, show screenshot (if provided)
    screenCustom.classList.add("hidden");
    screenCustom.innerHTML = "";

    if (s.image) {
      screenImage.src = s.image;
      screenImage.alt = s.title;
      screenImage.style.display = "";
    } else {
      screenImage.removeAttribute("src");
      screenImage.alt = "";
      screenImage.style.display = "none";
    }
  }

  cardTitle.textContent = s.cardTitle;
  cardBody.textContent = s.cardBody;

  renderChips(s.chips);
  renderSteps();

  if (s.custom === "roi"){
    roiPanel.classList.remove("hidden");
    renderROI();
  } else {
    roiPanel.classList.add("hidden");
  }
}

btnPrev.addEventListener("click", () => go(current - 1));
btnNext.addEventListener("click", () => go(current + 1));

btnShare.addEventListener("click", async () => {
  try{
    await navigator.clipboard.writeText(window.location.href);
    btnShare.textContent = "Link copied";
    setTimeout(() => btnShare.textContent = "Copy share link", 1400);
  }catch(e){
    alert("Could not copy automatically. Copy this URL:\n\n" + window.location.href);
  }
});

roiSlider?.addEventListener("input", renderROI);

renderSteps();
go(0);