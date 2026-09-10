const steps = [
  {
    title: "Secure, role-based access",
    sub: "Gated compliance data, per-person audited logins",
    image: "assets/screens/ecologist-login.jpg",
    pill: "Step 1",
    cardTitle: "Every login is a named, audited account — not a shared password",
    cardBody:
      "Staff, ecological consultants and council planners each get their own role, tied to their own login. A council ecologist sees exactly the sites they're assigned to: view, add evidence, and print reports — nothing more.",
    chips: ["Role-based access", "Row-level security", "Per-site scoping"],
  },
  {
    title: "Alerted to issues automatically",
    sub: "The system tells you when something needs attention",
    image: "assets/screens/ecologist-dashboard.jpg",
    pill: "Step 2",
    cardTitle: "Compliance alerts, not a spreadsheet nobody checks",
    cardBody:
      "This obligation is flagged At Risk, and separately the system noticed monitoring evidence hasn't been uploaded in over a year — it caught both automatically. Across a 30-year term, nobody has to remember to chase it.",
    chips: ["At-risk flags", "Stale-evidence detection", "No manual chasing"],
  },
  {
    title: "One record, full lifecycle",
    sub: "From planning application to 30-year discharge",
    image: "assets/screens/ecologist-site.jpg",
    pill: "Step 3",
    cardTitle: "Seven gates: Intake through to 30-year Compliance",
    cardBody:
      "Every project sits at a real, tracked stage — Intake, Screening, Viability, Commercial, Funding, Delivery, Compliance. This site is already in Gate 7, its 30-year monitoring period, but the same record carries the full history from when the application first came in.",
    chips: ["Seven-gate lifecycle", "Project ID", "Full audit history"],
  },
  {
    title: "Obligations tracked for the full term",
    sub: "Every legal condition, for all 30 years",
    image: "assets/screens/ecologist-obligations.jpg",
    pill: "Step 4",
    cardTitle: "S106 obligations as manageable, trackable records",
    cardBody:
      "Each habitat obligation — grassland, woodland, wetland — has its legal basis, its 30-year start and end date, its required outcome, and a live compliance status. This is what turns a filed planning condition into something anyone can check, any time.",
    chips: ["S106 / Conservation Covenant", "30-year date tracking", "Live status"],
  },
  {
    title: "Evidence, uploaded and downloaded",
    sub: "Real files, hash-verified for integrity",
    image: "assets/screens/ecologist-evidence.jpg",
    pill: "Step 5",
    cardTitle: "Upload a survey, download it back, prove it hasn't changed",
    cardBody:
      "Monitoring reports and survey evidence are uploaded as real files, each hashed on upload. Anyone with access to the site can download the original file back at any time — and the hash proves it's exactly what was submitted, even decades later.",
    chips: ["Real file upload/download", "SHA-256 integrity hash", "Chain of custody"],
  },
  {
    title: "One-click compliance report",
    sub: "Board- and committee-ready, generated on demand",
    image: "assets/screens/ecologist-snapshot.jpg",
    pill: "Step 6",
    cardTitle: "A report you can hand to a committee without asking us for it",
    cardBody:
      "The Compliance Snapshot generates a clean report on demand: obligation status, linked evidence with hashes, and the recent audit trail. Print it, save it as a PDF, keep it on file for a discharge-of-condition check.",
    chips: ["Auto-generated report", "Status + evidence + audit trail", "Print / Save as PDF"],
  },
];

let current = 0;
let started = false;

// --- DOM ---
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
const btnStart = document.getElementById("btnStart");

const screenOverlay = document.getElementById("screenOverlay");

function renderSteps() {
  if (!elSteps) return;

  elSteps.innerHTML = "";

  steps.forEach((s, i) => {
    const div = document.createElement("div");
    div.className = "step" + (i === current ? " active" : "");
    div.id = `step-${i}`;
    div.innerHTML = `
      <div class="step-num">${i + 1}</div>
      <div>
        <div class="step-title">${s.title}</div>
        <div class="step-sub">${s.sub}</div>
      </div>
    `;

    div.addEventListener("click", () => {
      if (!started) {
        startTour(i);
      } else {
        go(i);
      }
    });

    elSteps.appendChild(div);
  });
}

function renderChips(list) {
  if (!chips) return;

  chips.innerHTML = "";

  (list || []).forEach((t) => {
    const c = document.createElement("div");
    c.className = "chip";
    c.textContent = t;
    chips.appendChild(c);
  });
}

function go(i) {
  current = Math.max(0, Math.min(steps.length - 1, i));
  const s = steps[current];

  if (stageTitle) stageTitle.textContent = s.title;
  if (stageSubtitle) stageSubtitle.textContent = s.sub;
  if (stagePill) stagePill.textContent = s.pill || "";

  if (screenCustom) {
    screenCustom.classList.add("hidden");
    screenCustom.innerHTML = "";
  }

  if (screenImage) {
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

  if (cardTitle) cardTitle.textContent = s.cardTitle || "";
  if (cardBody) cardBody.textContent = s.cardBody || "";

  renderChips(s.chips);
  renderSteps();
}

function stepFromHash() {
  const match = window.location.hash.match(/#step-(\d+)/);
  if (!match) return null;

  const n = parseInt(match[1], 10);
  if (Number.isNaN(n)) return null;

  return Math.max(0, Math.min(steps.length - 1, n));
}

function startTour(stepIndex = 0) {
  started = true;
  document.body.classList.add("tour-started");

  if (screenOverlay) {
    screenOverlay.classList.add("hidden");
  }

  go(stepIndex);
  history.replaceState(null, "", `#step-${stepIndex}`);
}

// --- Events ---
if (btnPrev) {
  btnPrev.addEventListener("click", () => {
    if (!started) return;
    go(current - 1);
    history.replaceState(null, "", `#step-${current}`);
  });
}

if (btnNext) {
  btnNext.addEventListener("click", () => {
    if (!started) return;
    go(current + 1);
    history.replaceState(null, "", `#step-${current}`);
  });
}

if (btnShare) {
  btnShare.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      btnShare.textContent = "Link copied";
      setTimeout(() => {
        btnShare.textContent = "Copy share link";
      }, 1400);
    } catch (e) {
      alert("Could not copy automatically. Copy this URL:\n\n" + window.location.href);
    }
  });
}

if (btnStart) {
  btnStart.addEventListener("click", (e) => {
    e.preventDefault();
    startTour(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

window.addEventListener("hashchange", () => {
  const n = stepFromHash();
  if (n === null) return;

  if (!started) {
    startTour(n);
  } else {
    go(n);
    history.replaceState(null, "", `#step-${n}`);
  }
});

// --- Init ---
renderSteps();

const initial = stepFromHash();
if (initial !== null) {
  startTour(initial);
} else {
  if (screenOverlay) {
    screenOverlay.classList.remove("hidden");
  }
  document.body.classList.remove("tour-started");
  go(0);
}
