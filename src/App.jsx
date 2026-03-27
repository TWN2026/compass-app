import { useState, useEffect } from "react";
import ReactDOM from "react-dom";

// ─── Brand tokens ────────────────────────────────────────────────────────────
const BRAND = {
  navy:       "#0f1523",
  navyMid:    "#ffffff",
  navyLight:  "#f0f3f9",
  green:      "#1db954",
  greenDim:   "#17a348",
  white:      "#ffffff",
  offWhite:   "#f4f6fa",
  muted:      "#8896aa",
  border:     "#dde3ee",
  text:       "#0f1523",
  textSub:    "#4a5568",
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: #f4f6fa;
    color: ${BRAND.text};
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    line-height: 1.6;
    min-height: 100vh;
  }

  /* ── Layout ── */
  .app { display: flex; min-height: 100vh; }

  .sidebar {
    width: 260px;
    min-height: 100vh;
    background: ${BRAND.white};
    border-right: 1px solid ${BRAND.border};
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0; left: 0; bottom: 0;
    z-index: 100;
  }

  .sidebar-logo {
    padding: 28px 24px 20px;
    border-bottom: 1px solid ${BRAND.border};
  }
  .sidebar-logo h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 20px;
    font-weight: 600;
    color: ${BRAND.navy};
    letter-spacing: 0.01em;
    line-height: 1.2;
  }
  .sidebar-logo span {
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
    font-weight: 400;
    color: ${BRAND.muted};
    text-transform: uppercase;
    letter-spacing: 0.12em;
    display: block;
    margin-top: 4px;
  }

  .client-selector {
    padding: 16px 16px 12px;
    border-bottom: 1px solid ${BRAND.border};
  }
  .client-selector label {
    font-size: 10px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: ${BRAND.muted};
    display: block;
    margin-bottom: 6px;
  }
  .client-selector select {
    width: 100%;
    background: ${BRAND.offWhite};
    border: 1px solid ${BRAND.border};
    color: ${BRAND.text};
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    padding: 8px 10px;
    border-radius: 6px;
    cursor: pointer;
    outline: none;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%238896aa' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 10px center;
    padding-right: 28px;
  }

  .sidebar-nav { padding: 12px 0; flex: 1; }
  .nav-section {
    padding: 8px 16px 4px;
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: ${BRAND.muted};
  }
  .nav-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 16px;
    cursor: pointer;
    color: ${BRAND.textSub};
    font-size: 14px;
    font-weight: 400;
    border-left: 2px solid transparent;
    transition: all 0.15s;
    user-select: none;
  }
  .nav-item:hover { color: ${BRAND.navy}; background: ${BRAND.offWhite}; }
  .nav-item.active {
    color: ${BRAND.navy};
    border-left-color: ${BRAND.navy};
    background: ${BRAND.offWhite};
    font-weight: 600;
  }
  .nav-icon { font-size: 16px; width: 20px; text-align: center; }

  .sidebar-footer {
    padding: 16px;
    border-top: 1px solid ${BRAND.border};
    font-size: 12px;
    color: ${BRAND.muted};
  }
  .user-pill {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .avatar {
    width: 30px; height: 30px;
    border-radius: 50%;
    background: ${BRAND.navy};
    color: #fff;
    font-size: 11px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .user-info { flex: 1; min-width: 0; }
  .user-name { font-size: 13px; color: ${BRAND.navy}; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .user-role { font-size: 11px; color: ${BRAND.muted}; text-transform: capitalize; }
  .logout-btn {
    background: none;
    border: none;
    color: ${BRAND.muted};
    cursor: pointer;
    font-size: 18px;
    padding: 2px;
    transition: color 0.15s;
    line-height: 1;
  }
  .logout-btn:hover { color: ${BRAND.navy}; }

  /* ── Main content ── */
  .main {
    margin-left: 260px;
    flex: 1;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .topbar {
    padding: 20px 36px;
    border-bottom: 1px solid ${BRAND.border};
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: ${BRAND.white};
    position: sticky;
    top: 0;
    z-index: 50;
  }
  .topbar-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 26px;
    font-weight: 600;
    color: ${BRAND.navy};
    letter-spacing: 0.01em;
  }
  .topbar-subtitle { font-size: 13px; color: ${BRAND.muted}; margin-top: 1px; }
  .topbar-actions { display: flex; gap: 10px; align-items: center; }

  .content { padding: 32px 36px; flex: 1; }

  /* ── Buttons ── */
  .btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    border-radius: 6px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s;
    border: none;
    outline: none;
    white-space: nowrap;
  }
  .btn-primary {
    background: ${BRAND.navy};
    color: #ffffff;
  }
  .btn-primary:hover { background: #263352; }
  .btn-ghost {
    background: transparent;
    color: ${BRAND.textSub};
    border: 1px solid ${BRAND.border};
  }
  .btn-ghost:hover { background: ${BRAND.navyLight}; color: ${BRAND.text}; }
  .btn-danger {
    background: transparent;
    color: #f87171;
    border: 1px solid rgba(248,113,113,0.3);
  }
  .btn-danger:hover { background: rgba(248,113,113,0.1); }
  .btn-sm { padding: 5px 10px; font-size: 12px; }
  .btn-icon { padding: 6px; }

  /* ── Cards ── */
  .card {
    background: ${BRAND.navyMid};
    border: 1px solid ${BRAND.border};
    border-radius: 10px;
    overflow: hidden;
  }
  .card-header {
    padding: 18px 24px;
    border-bottom: 1px solid ${BRAND.border};
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }
  .card-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 18px;
    font-weight: 600;
    color: ${BRAND.navy};
    letter-spacing: 0.01em;
  }
  .card-body { padding: 24px; }

  /* ── Tabs ── */
  .tabs { display: flex; gap: 2px; border-bottom: 1px solid ${BRAND.border}; margin-bottom: 28px; overflow-x: auto; }
  .tab {
    padding: 10px 18px;
    font-size: 13px;
    font-weight: 500;
    color: ${BRAND.textSub};
    cursor: pointer;
    border-bottom: 2px solid transparent;
    white-space: nowrap;
    transition: all 0.15s;
    background: none;
    border-top: none;
    border-left: none;
    border-right: none;
    font-family: 'DM Sans', sans-serif;
  }
  .tab:hover { color: ${BRAND.text}; }
  .tab.active { color: ${BRAND.green}; border-bottom-color: ${BRAND.green}; }

  /* ── Forms ── */
  .field { margin-bottom: 20px; }
  .field label {
    display: block;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: ${BRAND.muted};
    margin-bottom: 6px;
  }
  .input, .textarea, .select-input {
    width: 100%;
    background: ${BRAND.white};
    border: 1px solid ${BRAND.border};
    color: ${BRAND.text};
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    padding: 9px 12px;
    border-radius: 6px;
    outline: none;
    transition: border-color 0.15s;
  }
  .input:focus, .textarea:focus { border-color: ${BRAND.navy}; }
  .textarea { resize: vertical; min-height: 80px; line-height: 1.5; }
  .input::placeholder, .textarea::placeholder { color: #b0bccf; }

  /* ── Chips / badges ── */
  .badge {
    display: inline-flex;
    align-items: center;
    padding: 2px 8px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 600;
  }
  .badge-green { background: rgba(90,244,126,0.12); color: ${BRAND.green}; }
  .badge-yellow { background: rgba(251,191,36,0.12); color: #fbbf24; }
  .badge-red { background: rgba(248,113,113,0.12); color: #f87171; }
  .badge-muted { background: ${BRAND.navyLight}; color: ${BRAND.muted}; }

  /* ── Grid helpers ── */
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; }

  /* ── Login screen ── */
  .login-screen {
    min-height: 100vh;
    background: #f4f6fa;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
  }
  .login-box {
    width: 100%;
    max-width: 400px;
    background: ${BRAND.white};
    border: 1px solid ${BRAND.border};
    border-radius: 14px;
    padding: 40px;
    box-shadow: 0 4px 24px rgba(15,21,35,0.08);
  }
  .login-logo {
    text-align: center;
    margin-bottom: 32px;
  }
  .login-logo h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 28px;
    font-weight: 600;
    color: ${BRAND.navy};
  }
  .login-logo p {
    font-size: 13px;
    color: ${BRAND.muted};
    margin-top: 4px;
  }
  .login-error {
    background: rgba(248,113,113,0.08);
    border: 1px solid rgba(248,113,113,0.3);
    color: #dc2626;
    padding: 10px 14px;
    border-radius: 6px;
    font-size: 13px;
    margin-bottom: 16px;
  }

  /* ── Dashboard ── */
  .stat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 28px; }
  .stat-card {
    background: ${BRAND.white};
    border: 1px solid ${BRAND.border};
    border-radius: 10px;
    padding: 20px 24px;
  }
  .stat-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: ${BRAND.muted}; font-weight: 600; }
  .stat-value {
    font-family: 'Cormorant Garamond', serif;
    font-size: 36px;
    font-weight: 600;
    color: ${BRAND.navy};
    line-height: 1.1;
    margin: 4px 0;
  }
  .stat-sub { font-size: 12px; color: ${BRAND.muted}; }

  /* ── VTO ── */
  .vto-section { margin-bottom: 32px; }
  .vto-section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 20px;
    font-weight: 600;
    color: ${BRAND.navy};
    margin-bottom: 16px;
    padding-bottom: 10px;
    border-bottom: 1px solid ${BRAND.border};
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .vto-values-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 10px; }
  .vto-value-chip {
    background: ${BRAND.offWhite};
    border: 1px solid ${BRAND.border};
    border-radius: 8px;
    padding: 12px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }
  .vto-value-text { font-size: 14px; font-weight: 500; color: ${BRAND.text}; flex: 1; }
  .vto-add-chip {
    background: transparent;
    border: 1px dashed ${BRAND.border};
    border-radius: 8px;
    padding: 12px 16px;
    cursor: pointer;
    font-size: 13px;
    color: ${BRAND.muted};
    font-family: 'DM Sans', sans-serif;
    transition: all 0.15s;
    text-align: left;
  }
  .vto-add-chip:hover { border-color: ${BRAND.navy}; color: ${BRAND.navy}; }
  .vto-inline-input {
    background: ${BRAND.white};
    border: 1px solid ${BRAND.navy};
    border-radius: 8px;
    padding: 12px 16px;
    display: flex;
    gap: 8px;
    align-items: center;
  }
  .vto-inline-input input {
    background: transparent;
    border: none;
    outline: none;
    color: ${BRAND.text};
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    flex: 1;
  }
  .vto-inline-input input::placeholder { color: #b0bccf; }

  /* ── Rocks ── */
  .rocks-list { display: flex; flex-direction: column; gap: 10px; }
  .rock-item {
    background: ${BRAND.white};
    border: 1px solid ${BRAND.border};
    border-radius: 8px;
    padding: 14px 16px;
    display: grid;
    grid-template-columns: 1fr auto auto auto;
    gap: 12px;
    align-items: center;
    transition: border-color 0.15s;
  }
  .rock-item:hover { border-color: #b0bccf; }
  .rock-title { font-size: 14px; font-weight: 500; color: ${BRAND.text}; }
  .rock-owner { font-size: 12px; color: ${BRAND.muted}; margin-top: 2px; }
  .rock-due { font-size: 12px; color: ${BRAND.muted}; white-space: nowrap; }
  .progress-bar-wrap { width: 80px; }
  .progress-bar-track {
    height: 4px;
    background: ${BRAND.border};
    border-radius: 4px;
    overflow: hidden;
  }
  .progress-bar-fill {
    height: 100%;
    background: ${BRAND.green};
    border-radius: 4px;
    transition: width 0.3s;
  }
  .progress-label { font-size: 11px; color: ${BRAND.muted}; text-align: right; margin-top: 3px; }

  /* ── Issues ── */
  .issues-list { display: flex; flex-direction: column; gap: 8px; }
  .issue-item {
    background: ${BRAND.white};
    border: 1px solid ${BRAND.border};
    border-radius: 8px;
    padding: 14px 16px;
    display: grid;
    grid-template-columns: auto 1fr auto auto;
    gap: 12px;
    align-items: start;
    transition: border-color 0.15s;
  }
  .issue-item:hover { border-color: #b0bccf; }
  .issue-priority-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    margin-top: 6px;
    flex-shrink: 0;
  }
  .issue-title { font-size: 14px; font-weight: 500; color: ${BRAND.text}; }
  .issue-meta { font-size: 12px; color: ${BRAND.muted}; margin-top: 3px; }
  .empty-state {
    text-align: center;
    padding: 48px 24px;
    color: ${BRAND.muted};
    font-size: 14px;
  }
  .empty-state-icon { font-size: 32px; margin-bottom: 12px; opacity: 0.5; }
  .empty-state-title { font-size: 16px; color: ${BRAND.textSub}; margin-bottom: 6px; font-weight: 500; }

  /* ── Modal ── */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(15,21,35,0.4);
    backdrop-filter: blur(3px);
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
  }
  .modal {
    background: ${BRAND.white};
    border: 1px solid ${BRAND.border};
    border-radius: 12px;
    width: 100%;
    max-width: 560px;
    max-height: 90vh;
    overflow-y: auto;
  }
  .modal-header {
    padding: 20px 24px;
    border-bottom: 1px solid ${BRAND.border};
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .modal-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 20px;
    font-weight: 600;
    color: ${BRAND.navy};
  }
  .modal-close {
    background: none;
    border: none;
    color: ${BRAND.muted};
    cursor: pointer;
    font-size: 22px;
    line-height: 1;
    padding: 2px 4px;
    transition: color 0.15s;
  }
  .modal-close:hover { color: ${BRAND.text}; }
  .modal-body { padding: 24px; }
  .modal-footer {
    padding: 16px 24px;
    border-top: 1px solid ${BRAND.border};
    display: flex;
    gap: 10px;
    justify-content: flex-end;
  }

  /* ── Misc ── */
  .divider { height: 1px; background: ${BRAND.border}; margin: 20px 0; }
  .tag {
    display: inline-block;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: ${BRAND.green};
    background: rgba(29,185,84,0.1);
    padding: 3px 8px;
    border-radius: 4px;
  }
  .flex { display: flex; }
  .flex-center { display: flex; align-items: center; }
  .gap-8 { gap: 8px; }
  .gap-12 { gap: 12px; }
  .flex-between { display: flex; align-items: center; justify-content: space-between; }
  .mt-4 { margin-top: 4px; }
  .mt-8 { margin-top: 8px; }
  .mt-16 { margin-top: 16px; }
  .mt-24 { margin-top: 24px; }
  .mb-16 { margin-bottom: 16px; }
  .text-muted { color: ${BRAND.muted}; font-size: 13px; }
  .text-green { color: ${BRAND.green}; }
  .fw-500 { font-weight: 500; }

  /* ── Animations ── */
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .animate-in { animation: fadeIn 0.25s ease forwards; }

  /* ── Scrollbar ── */
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: ${BRAND.border}; border-radius: 10px; }
`;

// ─── Default data ─────────────────────────────────────────────────────────────
const defaultBusinesses = {
  acme: {
    id: "acme",
    name: "Acme Financial",
    vto: {
      coreValues: ["Client First", "Integrity Always", "Continuous Growth", "Team Excellence"],
      coreFocus: {
        purpose: "To empower Australians to achieve financial freedom",
        niche: "Holistic financial planning for high-income professionals"
      },
      tenYear: "The most trusted financial planning firm in Sydney, managing $2B in client assets",
      threeYear: {
        revenue: "$3.5M",
        profit: "$1.2M",
        clients: "350 active clients",
        other: "Team of 12, fully systemised operations"
      },
      oneYear: {
        revenue: "$1.8M",
        profit: "$600K",
        goals: ["Launch referral partner program", "Hire 2 additional planners", "Achieve 90+ NPS score"]
      },
      issues: [],
    },
    rocks: [
      { id: "r1", title: "Implement new CRM system", owner: "Sarah", quarter: "Q2 2025", progress: 60, status: "on-track" },
      { id: "r2", title: "Launch client portal v2", owner: "James", quarter: "Q2 2025", progress: 30, status: "at-risk" },
      { id: "r3", title: "Document all SOPs", owner: "Sarah", quarter: "Q2 2025", progress: 80, status: "on-track" },
    ],
    issues: [
      { id: "i1", title: "Client onboarding taking too long", priority: "high", raisedBy: "Sarah", notes: "Average 3 weeks — needs to be under 1 week", createdAt: "2025-04-01" },
      { id: "i2", title: "Marketing spend not tracked effectively", priority: "medium", raisedBy: "James", notes: "No ROI visibility on Google Ads", createdAt: "2025-04-03" },
      { id: "i3", title: "Staff meeting attendance inconsistent", priority: "low", raisedBy: "Sarah", notes: "", createdAt: "2025-04-05" },
    ],
    marketing: {
      targetMarket: "Ambitious engaged delegators - 30-50",
      differentiators: [
        "I've journeyed this path extensively.",
        "I get you - I am you - all specific life issues for 30-45 yo",
        "We're in this together for the next 30 years.",
      ],
      provenProcess: "",
      guarantee: "",
    },
    checklist: {},
    risk: {},
    financial_checklist: {},
    people_checklist: {},
    people: [
      { id: "p1", name: "Sarah Mitchell", role: "Principal Financial Planner", employmentType: "Full-time", startDate: "2019-03", email: "sarah@acmefinancial.com.au" },
      { id: "p2", name: "James Nguyen", role: "Client Services Manager", employmentType: "Full-time", startDate: "2021-07", email: "james@acmefinancial.com.au" },
      { id: "p3", name: "Emily Chen", role: "Paraplanner", employmentType: "Full-time", startDate: "2023-01", email: "emily@acmefinancial.com.au" },
    ],
    reviews: {},
    financials: [],
    budgets: {},
    id: "vertex",
    name: "Vertex Wealth",
    vto: {
      coreValues: ["Growth Mindset", "Radical Transparency", "Client Obsessed"],
      coreFocus: {
        purpose: "To build generational wealth for business owners",
        niche: "SME owner financial planning and exit strategy"
      },
      tenYear: "Australia's leading wealth partner for business owners looking to exit",
      threeYear: {
        revenue: "$2M",
        profit: "$750K",
        clients: "200 active clients",
        other: "Specialist team of 8"
      },
      oneYear: {
        revenue: "$1.1M",
        profit: "$380K",
        goals: ["Build exit planning service", "Partner with 3 business brokers", "Launch podcast"]
      },
      issues: [],
    },
    rocks: [
      { id: "r1", title: "Create exit planning framework", owner: "James", quarter: "Q2 2025", progress: 45, status: "on-track" },
      { id: "r2", title: "Launch SME networking events", owner: "Amy", quarter: "Q2 2025", progress: 10, status: "at-risk" },
    ],
    issues: [
      { id: "i1", title: "No referral system in place", priority: "high", raisedBy: "James", notes: "Missing out on word-of-mouth growth", createdAt: "2025-04-02" },
    ],
    marketing: {
      targetMarket: "",
      differentiators: [],
      provenProcess: "",
      guarantee: "",
    },
    checklist: {},
    risk: {},
    financial_checklist: {},
    people_checklist: {},
    people: [],
    reviews: {},
    financials: [],
    budgets: {},
  }
};

const USERS = [
  { username: "coach", password: "coach123", role: "coach", name: "Dean", businessId: null },
  { username: "sarah.acme", password: "acme123", role: "owner", name: "Sarah Mitchell", businessId: "acme" },
  { username: "james.acme", password: "acme456", role: "member", name: "James Acme", businessId: "acme" },
  { username: "james.vertex", password: "vertex123", role: "owner", name: "James Vertex", businessId: "vertex" },
  { username: "amy.vertex", password: "vertex456", role: "member", name: "Amy Chen", businessId: "vertex" },
];

// ─── Storage ──────────────────────────────────────────────────────────────────
const STORAGE_KEY = "twn_v2_businesses";

function loadBusinesses() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return defaultBusinesses;
}

function saveBusinesses(biz) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(biz)); } catch {}
}

// ─── Utilities ────────────────────────────────────────────────────────────────
function uid() { return Math.random().toString(36).slice(2, 9); }

function initials(name) {
  return name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
}

function priorityColor(p) {
  if (p === "high") return "#dc2626";
  if (p === "medium") return "#d97706";
  return BRAND.muted;
}

// ─── Components ──────────────────────────────────────────────────────────────

function Modal({ title, onClose, children, footer }) {
  // Use createPortal so the modal always renders at document.body,
  // bypassing any stacking context created by the sidebar layout.
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); return () => setMounted(false); }, []);
  if (!mounted) return null;

  const content = (
    <div className="modal-overlay"
      onMouseDown={e => e.target === e.currentTarget && onClose()}
      style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(15,21,35,0.4)", backdropFilter: "blur(3px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div className="modal animate-in" onMouseDown={e => e.stopPropagation()}
        style={{ background: "#ffffff", border: "1px solid #dde3ee", borderRadius: 12, width: "100%", maxWidth: 560, maxHeight: "90vh", overflowY: "auto", position: "relative" }}>
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );

  return ReactDOM.createPortal(content, document.body);
}

// ─── Login ────────────────────────────────────────────────────────────────────
function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin() {
    const user = USERS.find(u => u.username === username.trim() && u.password === password);
    if (user) {
      onLogin(user);
    } else {
      setError("Invalid username or password.");
    }
  }

  return (
    <div className="login-screen">
      <div className="login-box animate-in">
        <div className="login-logo">
          <div className="tag" style={{ marginBottom: 12 }}>Business Intelligence Platform</div>
          <h1>The Wealth Network</h1>
          <p>Sign in to your coaching workspace</p>
        </div>
        {error && <div className="login-error">{error}</div>}
        <div className="field">
          <label>Username</label>
          <input className="input" value={username} onChange={e => setUsername(e.target.value)}
            placeholder="e.g. coach" onKeyDown={e => e.key === "Enter" && handleLogin()} autoFocus />
        </div>
        <div className="field">
          <label>Password</label>
          <input className="input" type="password" value={password} onChange={e => setPassword(e.target.value)}
            placeholder="••••••••" onKeyDown={e => e.key === "Enter" && handleLogin()} />
        </div>
        <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: "11px" }} onClick={handleLogin}>
          Sign In →
        </button>
        <div style={{ marginTop: 20, padding: "14px", background: BRAND.offWhite, borderRadius: 8, fontSize: 12, color: BRAND.muted }}>
          <strong style={{ color: BRAND.textSub }}>Demo logins</strong><br />
          coach / coach123 &nbsp;·&nbsp; sarah.acme / acme123<br />
          james.vertex / vertex123
        </div>
      </div>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
function Dashboard({ business }) {
  const rocks = business.rocks || [];
  const issues = business.issues || [];
  const onTrack = rocks.filter(r => r.status === "on-track").length;
  const atRisk = rocks.filter(r => r.status === "at-risk").length;
  const highIssues = issues.filter(i => i.priority === "high").length;

  return (
    <div className="animate-in">
      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-label">Quarterly Rocks</div>
          <div className="stat-value">{rocks.length}</div>
          <div className="stat-sub" style={{ color: BRAND.green }}>{onTrack} on track · <span style={{ color: "#dc2626" }}>{atRisk} at risk</span></div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Open Issues</div>
          <div className="stat-value">{issues.length}</div>
          <div className="stat-sub">{highIssues > 0 ? <span style={{ color: "#dc2626" }}>{highIssues} high priority</span> : "All low–medium priority"}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Rock Completion</div>
          <div className="stat-value">
            {rocks.length ? Math.round(rocks.reduce((a, r) => a + r.progress, 0) / rocks.length) : 0}%
          </div>
          <div className="stat-sub">Average progress this quarter</div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <span className="card-title">Quarterly Rocks</span>
          </div>
          <div className="card-body">
            {rocks.length === 0
              ? <div className="empty-state"><div className="empty-state-title">No rocks yet</div></div>
              : rocks.slice(0, 4).map(r => (
                <div key={r.id} style={{ marginBottom: 14 }}>
                  <div className="flex-between mb-4">
                    <span style={{ fontSize: 13, fontWeight: 500, color: BRAND.text }}>{r.title}</span>
                    <span className={`badge badge-${r.status === "on-track" ? "green" : "red"}`}>
                      {r.status === "on-track" ? "On Track" : "At Risk"}
                    </span>
                  </div>
                  <div className="progress-bar-track" style={{ width: "100%" }}>
                    <div className="progress-bar-fill" style={{ width: `${r.progress}%` }} />
                  </div>
                  <div className="flex-between mt-4">
                    <span style={{ fontSize: 11, color: BRAND.muted }}>{r.owner}</span>
                    <span style={{ fontSize: 11, color: BRAND.muted }}>{r.progress}%</span>
                  </div>
                </div>
              ))
            }
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">Issues List</span>
          </div>
          <div className="card-body">
            {issues.length === 0
              ? <div className="empty-state"><div className="empty-state-title">No open issues</div></div>
              : issues.slice(0, 5).map(i => (
                <div key={i.id} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 12 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: priorityColor(i.priority), marginTop: 5, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: BRAND.text }}>{i.title}</div>
                    <div style={{ fontSize: 11, color: BRAND.muted, marginTop: 2 }}>{i.raisedBy} · {i.priority}</div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── VTO ─────────────────────────────────────────────────────────────────────
const VTO_TABS = ["Core Values", "Core Focus", "10-Year Target", "3-Year Picture", "1-Year Plan", "Issues"];

function VTOPage({ business, onUpdate, canEdit }) {
  const [tab, setTab] = useState(0);
  const vto = business.vto;

  function updateVto(key, value) {
    onUpdate({ ...business, vto: { ...vto, [key]: value } });
  }
  function updateNested(key, subkey, value) {
    onUpdate({ ...business, vto: { ...vto, [key]: { ...vto[key], [subkey]: value } } });
  }

  return (
    <div className="animate-in">
      <div className="tabs">
        {VTO_TABS.map((t, i) => (
          <button key={t} className={`tab ${tab === i ? "active" : ""}`} onClick={() => setTab(i)}>{t}</button>
        ))}
      </div>

      {tab === 0 && (
        <CoreValuesTab values={vto.coreValues} onChange={v => updateVto("coreValues", v)} canEdit={canEdit} />
      )}
      {tab === 1 && (
        <CoreFocusTab focus={vto.coreFocus} onChange={v => updateVto("coreFocus", v)} canEdit={canEdit} />
      )}
      {tab === 2 && (
        <TenYearTab value={vto.tenYear} onChange={v => updateVto("tenYear", v)} canEdit={canEdit} />
      )}
      {tab === 3 && (
        <ThreeYearTab data={vto.threeYear} onChange={(k, v) => updateNested("threeYear", k, v)} canEdit={canEdit} />
      )}
      {tab === 4 && (
        <OneYearTab data={vto.oneYear} onChange={(k, v) => updateNested("oneYear", k, v)} canEdit={canEdit} />
      )}
      {tab === 5 && (
        <VtoIssues issues={vto.issues || []} onChange={v => updateVto("issues", v)} canEdit={canEdit} />
      )}
    </div>
  );
}

function CoreValuesTab({ values, onChange, canEdit }) {
  const [adding, setAdding] = useState(false);
  const [newVal, setNewVal] = useState("");

  function addValue() {
    if (newVal.trim()) {
      onChange([...values, newVal.trim()]);
      setNewVal(""); setAdding(false);
    }
  }
  function removeValue(i) { onChange(values.filter((_, idx) => idx !== i)); }

  return (
    <div className="vto-section">
      <div className="vto-section-title">
        Core Values
        <span style={{ fontSize: 13, fontWeight: 400, color: BRAND.muted }}>What you stand for</span>
      </div>
      <p className="text-muted mb-16">The handful of non-negotiable principles that define who you are and how you do business.</p>
      <div className="vto-values-grid">
        {values.map((v, i) => (
          <div key={i} className="vto-value-chip">
            <div className="vto-value-text">{v}</div>
            {canEdit && (
              <button onClick={() => removeValue(i)} style={{ background: "none", border: "none", color: BRAND.muted, cursor: "pointer", fontSize: 16, lineHeight: 1, padding: "0 2px" }}>×</button>
            )}
          </div>
        ))}
        {canEdit && !adding && (
          <button className="vto-add-chip" onClick={() => setAdding(true)}>+ Add value</button>
        )}
        {canEdit && adding && (
          <div className="vto-inline-input">
            <input autoFocus value={newVal} onChange={e => setNewVal(e.target.value)}
              placeholder="e.g. Client First" onKeyDown={e => { if (e.key === "Enter") addValue(); if (e.key === "Escape") { setAdding(false); setNewVal(""); } }} />
            <button className="btn btn-primary btn-sm" onClick={addValue}>Add</button>
            <button className="btn btn-ghost btn-sm" onClick={() => { setAdding(false); setNewVal(""); }}>✕</button>
          </div>
        )}
      </div>
    </div>
  );
}

function CoreFocusTab({ focus, onChange, canEdit }) {
  return (
    <div className="vto-section">
      <div className="vto-section-title">Core Focus</div>
      <div className="grid-2">
        <div className="card">
          <div className="card-header"><span className="card-title">Purpose / Cause / Passion</span></div>
          <div className="card-body">
            <p className="text-muted mb-16">Why does your business exist? What's your "why"?</p>
            {canEdit
              ? <textarea className="textarea" value={focus.purpose} onChange={e => onChange({ ...focus, purpose: e.target.value })} placeholder="e.g. To empower Australians..." style={{ minHeight: 100 }} />
              : <p style={{ fontSize: 15, color: BRAND.text, lineHeight: 1.6 }}>{focus.purpose || <span style={{ color: BRAND.muted }}>Not defined yet</span>}</p>
            }
          </div>
        </div>
        <div className="card">
          <div className="card-header"><span className="card-title">Niche</span></div>
          <div className="card-body">
            <p className="text-muted mb-16">What are you best in the world at? Who do you serve?</p>
            {canEdit
              ? <textarea className="textarea" value={focus.niche} onChange={e => onChange({ ...focus, niche: e.target.value })} placeholder="e.g. Financial planning for..." style={{ minHeight: 100 }} />
              : <p style={{ fontSize: 15, color: BRAND.text, lineHeight: 1.6 }}>{focus.niche || <span style={{ color: BRAND.muted }}>Not defined yet</span>}</p>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

function TenYearTab({ value, onChange, canEdit }) {
  return (
    <div className="vto-section">
      <div className="vto-section-title">10-Year Target</div>
      <div className="card">
        <div className="card-body">
          <p className="text-muted mb-16">Your Big Hairy Audacious Goal. Imagine where the business will be in 10 years — be specific and bold.</p>
          {canEdit
            ? <textarea className="textarea" value={value} onChange={e => onChange(e.target.value)} placeholder="e.g. The most trusted financial planning firm in Sydney..." style={{ minHeight: 120 }} />
            : <p style={{ fontSize: 16, color: BRAND.navy, lineHeight: 1.7, fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}>
                {value || <span style={{ color: BRAND.muted, fontStyle: "normal", fontSize: 14 }}>Not defined yet</span>}
              </p>
          }
        </div>
      </div>
    </div>
  );
}

function ThreeYearTab({ data, onChange, canEdit }) {
  return (
    <div className="vto-section">
      <div className="vto-section-title">3-Year Picture</div>
      <div className="grid-2" style={{ marginBottom: 20 }}>
        {[
          { key: "revenue", label: "Revenue" },
          { key: "profit", label: "Profit" },
          { key: "clients", label: "Clients" },
        ].map(f => (
          <div key={f.key} className="card">
            <div className="card-header"><span className="card-title">{f.label}</span></div>
            <div className="card-body">
              {canEdit
                ? <input className="input" value={data[f.key]} onChange={e => onChange(f.key, e.target.value)} placeholder={`3-year ${f.label.toLowerCase()} target`} />
                : <div style={{ fontSize: 20, fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, color: BRAND.white }}>{data[f.key] || <span style={{ color: BRAND.muted, fontSize: 14, fontFamily: "'DM Sans',sans-serif", fontWeight: 400 }}>Not set</span>}</div>
              }
            </div>
          </div>
        ))}
      </div>
      <div className="card">
        <div className="card-header"><span className="card-title">What else does it look like?</span></div>
        <div className="card-body">
          {canEdit
            ? <textarea className="textarea" value={data.other} onChange={e => onChange("other", e.target.value)} placeholder="Team size, culture, operations, capabilities..." />
            : <p style={{ fontSize: 14, color: BRAND.text, lineHeight: 1.6 }}>{data.other || <span style={{ color: BRAND.muted }}>Not defined</span>}</p>
          }
        </div>
      </div>
    </div>
  );
}

function OneYearTab({ data, onChange, canEdit }) {
  const [addingGoal, setAddingGoal] = useState(false);
  const [newGoal, setNewGoal] = useState("");

  function addGoal() {
    if (newGoal.trim()) {
      onChange("goals", [...(data.goals || []), newGoal.trim()]);
      setNewGoal(""); setAddingGoal(false);
    }
  }
  function removeGoal(i) {
    onChange("goals", (data.goals || []).filter((_, idx) => idx !== i));
  }

  return (
    <div className="vto-section">
      <div className="vto-section-title">1-Year Plan</div>
      <div className="grid-2" style={{ marginBottom: 20 }}>
        {[
          { key: "revenue", label: "Revenue Target" },
          { key: "profit", label: "Profit Target" },
        ].map(f => (
          <div key={f.key} className="card">
            <div className="card-header"><span className="card-title">{f.label}</span></div>
            <div className="card-body">
              {canEdit
                ? <input className="input" value={data[f.key]} onChange={e => onChange(f.key, e.target.value)} placeholder={`This year's ${f.label.toLowerCase()}`} />
                : <div style={{ fontSize: 20, fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, color: BRAND.white }}>{data[f.key] || <span style={{ color: BRAND.muted, fontSize: 14, fontFamily: "'DM Sans',sans-serif", fontWeight: 400 }}>Not set</span>}</div>
              }
            </div>
          </div>
        ))}
      </div>
      <div className="card">
        <div className="card-header">
          <span className="card-title">Annual Goals</span>
          {canEdit && <button className="btn btn-primary btn-sm" onClick={() => setAddingGoal(true)}>+ Goal</button>}
        </div>
        <div className="card-body">
          {addingGoal && (
            <div className="vto-inline-input" style={{ marginBottom: 12 }}>
              <input autoFocus value={newGoal} onChange={e => setNewGoal(e.target.value)}
                placeholder="e.g. Launch referral partner program"
                onKeyDown={e => { if (e.key === "Enter") addGoal(); if (e.key === "Escape") { setAddingGoal(false); setNewGoal(""); } }} />
              <button className="btn btn-primary btn-sm" onClick={addGoal}>Add</button>
              <button className="btn btn-ghost btn-sm" onClick={() => { setAddingGoal(false); setNewGoal(""); }}>✕</button>
            </div>
          )}
          {(data.goals || []).length === 0 && !addingGoal
            ? <div className="empty-state"><div className="empty-state-title">No goals defined</div></div>
            : (data.goals || []).map((g, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: `1px solid ${BRAND.border}` }}>
                <span style={{ color: BRAND.green, fontWeight: 700, fontSize: 13 }}>{i + 1}.</span>
                <span style={{ flex: 1, fontSize: 14, color: BRAND.text }}>{g}</span>
                {canEdit && <button onClick={() => removeGoal(i)} style={{ background: "none", border: "none", color: BRAND.muted, cursor: "pointer", fontSize: 16 }}>×</button>}
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

function VtoIssues({ issues, onChange, canEdit }) {
  const [showAdd, setShowAdd] = useState(false);
  const [draft, setDraft] = useState({ title: "", notes: "", priority: "medium" });

  function addIssue() {
    if (!draft.title.trim()) return;
    onChange([...issues, { id: uid(), ...draft, createdAt: new Date().toISOString().slice(0, 10) }]);
    setDraft({ title: "", notes: "", priority: "medium" });
    setShowAdd(false);
  }
  function removeIssue(id) { onChange(issues.filter(i => i.id !== id)); }

  return (
    <div className="vto-section">
      <div className="vto-section-title">
        Issues
        {canEdit && <button className="btn btn-primary btn-sm" onClick={() => setShowAdd(true)}>+ Issue</button>}
      </div>
      <p className="text-muted mb-16">Issues, obstacles, or opportunities to address at the V/TO level.</p>
      <div className="issues-list">
        {issues.length === 0 && !showAdd
          ? <div className="empty-state"><div className="empty-state-icon">🎯</div><div className="empty-state-title">No strategic issues</div><p>Add issues that could impact your long-term vision.</p></div>
          : issues.map(i => (
            <div key={i.id} className="issue-item">
              <div className="issue-priority-dot" style={{ background: priorityColor(i.priority) }} />
              <div>
                <div className="issue-title">{i.title}</div>
                {i.notes && <div className="issue-meta">{i.notes}</div>}
              </div>
              <span className={`badge badge-${i.priority === "high" ? "red" : i.priority === "medium" ? "yellow" : "muted"}`}>{i.priority}</span>
              {canEdit && <button className="btn btn-danger btn-sm btn-icon" onClick={() => removeIssue(i.id)}>×</button>}
            </div>
          ))
        }
      </div>
      {showAdd && (
        <Modal title="Add Issue" onClose={() => setShowAdd(false)}
          footer={<><button className="btn btn-ghost" onClick={() => setShowAdd(false)}>Cancel</button><button className="btn btn-primary" onClick={addIssue}>Add Issue</button></>}>
          <div className="field"><label>Issue</label><input className="input" value={draft.title} onChange={e => setDraft(d => ({ ...d, title: e.target.value }))} placeholder="Describe the issue..." autoFocus /></div>
          <div className="field"><label>Notes</label><textarea className="textarea" value={draft.notes} onChange={e => setDraft(d => ({ ...d, notes: e.target.value }))} placeholder="Additional context..." /></div>
          <div className="field"><label>Priority</label>
            <select className="input" value={draft.priority} onChange={e => setDraft(d => ({ ...d, priority: e.target.value }))}>
              <option value="high">High</option><option value="medium">Medium</option><option value="low">Low</option>
            </select>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── Rocks ────────────────────────────────────────────────────────────────────
function RocksPage({ business, onUpdate, canEdit }) {
  const [showAdd, setShowAdd] = useState(false);
  const [editRock, setEditRock] = useState(null);
  const [draft, setDraft] = useState({ title: "", owner: "", quarter: "Q2 2025", progress: 0, status: "on-track" });

  const rocks = business.rocks || [];

  function saveDraft() {
    if (!draft.title.trim()) return;
    if (editRock) {
      onUpdate({ ...business, rocks: rocks.map(r => r.id === editRock.id ? { ...r, ...draft } : r) });
    } else {
      onUpdate({ ...business, rocks: [...rocks, { id: uid(), ...draft }] });
    }
    setShowAdd(false); setEditRock(null); setDraft({ title: "", owner: "", quarter: "Q2 2025", progress: 0, status: "on-track" });
  }

  function openEdit(rock) {
    setEditRock(rock);
    setDraft({ title: rock.title, owner: rock.owner, quarter: rock.quarter, progress: rock.progress, status: rock.status });
    setShowAdd(true);
  }

  function deleteRock(id) {
    onUpdate({ ...business, rocks: rocks.filter(r => r.id !== id) });
  }

  return (
    <div className="animate-in">
      <div className="flex-between mb-16">
        <div>
          <p className="text-muted">Quarterly priorities — the {rocks.length} most important things to achieve this quarter.</p>
        </div>
        {canEdit && <button className="btn btn-primary" onClick={() => { setEditRock(null); setDraft({ title: "", owner: "", quarter: "Q2 2025", progress: 0, status: "on-track" }); setShowAdd(true); }}>+ Add Rock</button>}
      </div>

      {rocks.length === 0
        ? <div className="empty-state"><div className="empty-state-icon">🪨</div><div className="empty-state-title">No rocks this quarter</div><p>Add your top priorities for the quarter.</p></div>
        : <div className="rocks-list">
          {rocks.map(r => (
            <div key={r.id} className="rock-item">
              <div>
                <div className="rock-title">{r.title}</div>
                <div className="rock-owner">{r.owner}</div>
              </div>
              <div className="progress-bar-wrap">
                <div className="progress-bar-track"><div className="progress-bar-fill" style={{ width: `${r.progress}%` }} /></div>
                <div className="progress-label">{r.progress}%</div>
              </div>
              <span className={`badge badge-${r.status === "on-track" ? "green" : "red"}`}>{r.status === "on-track" ? "On Track" : "At Risk"}</span>
              <div className="rock-due">{r.quarter}</div>
              {canEdit && (
                <div style={{ display: "flex", gap: 6 }}>
                  <button className="btn btn-ghost btn-sm" onClick={() => openEdit(r)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => deleteRock(r.id)}>✕</button>
                </div>
              )}
            </div>
          ))}
        </div>
      }

      {showAdd && (
        <Modal title={editRock ? "Edit Rock" : "Add Rock"} onClose={() => { setShowAdd(false); setEditRock(null); }}
          footer={<><button className="btn btn-ghost" onClick={() => { setShowAdd(false); setEditRock(null); }}>Cancel</button><button className="btn btn-primary" onClick={saveDraft}>{editRock ? "Save" : "Add Rock"}</button></>}>
          <div className="field"><label>Rock Title</label><input className="input" value={draft.title} onChange={e => setDraft(d => ({ ...d, title: e.target.value }))} placeholder="What needs to be achieved?" autoFocus /></div>
          <div className="grid-2">
            <div className="field"><label>Owner</label><input className="input" value={draft.owner} onChange={e => setDraft(d => ({ ...d, owner: e.target.value }))} placeholder="Name" /></div>
            <div className="field"><label>Quarter</label><input className="input" value={draft.quarter} onChange={e => setDraft(d => ({ ...d, quarter: e.target.value }))} placeholder="Q2 2025" /></div>
          </div>
          <div className="grid-2">
            <div className="field">
              <label>Progress: {draft.progress}%</label>
              <input type="range" min={0} max={100} step={5} value={draft.progress} onChange={e => setDraft(d => ({ ...d, progress: parseInt(e.target.value) }))}
                style={{ width: "100%", accentColor: BRAND.green, marginTop: 6 }} />
            </div>
            <div className="field">
              <label>Status</label>
              <select className="input" value={draft.status} onChange={e => setDraft(d => ({ ...d, status: e.target.value }))}>
                <option value="on-track">On Track</option>
                <option value="at-risk">At Risk</option>
                <option value="complete">Complete</option>
              </select>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── Issues ───────────────────────────────────────────────────────────────────
function IssuesPage({ business, onUpdate, canEdit }) {
  const [showAdd, setShowAdd] = useState(false);
  const [draft, setDraft] = useState({ title: "", notes: "", priority: "medium", raisedBy: "" });
  const [filter, setFilter] = useState("all");

  const issues = business.issues || [];

  function addIssue() {
    if (!draft.title.trim()) return;
    onUpdate({ ...business, issues: [...issues, { id: uid(), ...draft, createdAt: new Date().toISOString().slice(0, 10) }] });
    setDraft({ title: "", notes: "", priority: "medium", raisedBy: "" });
    setShowAdd(false);
  }

  function resolveIssue(id) {
    onUpdate({ ...business, issues: issues.filter(i => i.id !== id) });
  }

  const filtered = filter === "all" ? issues : issues.filter(i => i.priority === filter);

  return (
    <div className="animate-in">
      <div className="flex-between mb-16">
        <div style={{ display: "flex", gap: 8 }}>
          {["all", "high", "medium", "low"].map(f => (
            <button key={f} className={`btn btn-sm ${filter === f ? "btn-primary" : "btn-ghost"}`} onClick={() => setFilter(f)}>
              {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
              {f !== "all" && <span style={{ marginLeft: 4, opacity: 0.7 }}>{issues.filter(i => i.priority === f).length}</span>}
            </button>
          ))}
        </div>
        {canEdit && <button className="btn btn-primary" onClick={() => setShowAdd(true)}>+ Add Issue</button>}
      </div>

      <div className="issues-list">
        {filtered.length === 0
          ? <div className="empty-state"><div className="empty-state-icon">✅</div><div className="empty-state-title">No issues</div><p>All clear — or add issues to track and resolve.</p></div>
          : filtered.map(i => (
            <div key={i.id} className="issue-item">
              <div className="issue-priority-dot" style={{ background: priorityColor(i.priority) }} />
              <div>
                <div className="issue-title">{i.title}</div>
                <div className="issue-meta">{i.raisedBy && `${i.raisedBy} · `}{i.createdAt}{i.notes && ` · ${i.notes}`}</div>
              </div>
              <span className={`badge badge-${i.priority === "high" ? "red" : i.priority === "medium" ? "yellow" : "muted"}`}>{i.priority}</span>
              {canEdit && (
                <button className="btn btn-ghost btn-sm" onClick={() => resolveIssue(i.id)} title="Mark resolved">✓ Resolve</button>
              )}
            </div>
          ))
        }
      </div>

      {showAdd && (
        <Modal title="Add Issue" onClose={() => setShowAdd(false)}
          footer={<><button className="btn btn-ghost" onClick={() => setShowAdd(false)}>Cancel</button><button className="btn btn-primary" onClick={addIssue}>Add Issue</button></>}>
          <div className="field"><label>Issue Title</label><input className="input" value={draft.title} onChange={e => setDraft(d => ({ ...d, title: e.target.value }))} placeholder="What's the issue?" autoFocus /></div>
          <div className="field"><label>Notes</label><textarea className="textarea" value={draft.notes} onChange={e => setDraft(d => ({ ...d, notes: e.target.value }))} placeholder="More context, root cause, ideas..." /></div>
          <div className="grid-2">
            <div className="field"><label>Raised By</label><input className="input" value={draft.raisedBy} onChange={e => setDraft(d => ({ ...d, raisedBy: e.target.value }))} placeholder="Your name" /></div>
            <div className="field"><label>Priority</label>
              <select className="input" value={draft.priority} onChange={e => setDraft(d => ({ ...d, priority: e.target.value }))}>
                <option value="high">High</option><option value="medium">Medium</option><option value="low">Low</option>
              </select>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── Marketing Strategy ───────────────────────────────────────────────────────
function MarketingPage({ business, onUpdate, canEdit }) {
  const mkt = business.marketing || { targetMarket: "", differentiators: [], provenProcess: "", guarantee: "" };
  const [addingDiff, setAddingDiff] = useState(false);
  const [newDiff, setNewDiff] = useState("");

  function updateMkt(key, value) {
    onUpdate({ ...business, marketing: { ...mkt, [key]: value } });
  }

  function addDiff() {
    if (newDiff.trim()) {
      updateMkt("differentiators", [...(mkt.differentiators || []), newDiff.trim()]);
      setNewDiff(""); setAddingDiff(false);
    }
  }

  function removeDiff(i) {
    updateMkt("differentiators", mkt.differentiators.filter((_, idx) => idx !== i));
  }

  return (
    <div className="animate-in">
      {/* Target Market */}
      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-header">
          <span className="card-title">Target Market</span>
        </div>
        <div className="card-body">
          <p className="text-muted mb-16">Who is your ideal client? Be specific — demographics, psychographics, life stage.</p>
          {canEdit
            ? <textarea className="textarea" value={mkt.targetMarket} onChange={e => updateMkt("targetMarket", e.target.value)} placeholder="e.g. Ambitious engaged delegators – 30–50" style={{ minHeight: 80 }} />
            : <p style={{ fontSize: 15, color: BRAND.text, lineHeight: 1.6 }}>{mkt.targetMarket || <span style={{ color: BRAND.muted }}>Not defined yet</span>}</p>
          }
        </div>
      </div>

      {/* Differentiators */}
      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-header">
          <span className="card-title">Differentiators</span>
          {canEdit && <button className="btn btn-primary btn-sm" onClick={() => setAddingDiff(true)}>+ Add</button>}
        </div>
        <div className="card-body">
          <p className="text-muted mb-16">What makes you genuinely different? Why should your ideal client choose you over anyone else?</p>
          {addingDiff && (
            <div className="vto-inline-input" style={{ marginBottom: 12 }}>
              <input autoFocus value={newDiff} onChange={e => setNewDiff(e.target.value)}
                placeholder="e.g. We specialise exclusively in advice business owners"
                onKeyDown={e => { if (e.key === "Enter") addDiff(); if (e.key === "Escape") { setAddingDiff(false); setNewDiff(""); } }} />
              <button className="btn btn-primary btn-sm" onClick={addDiff}>Add</button>
              <button className="btn btn-ghost btn-sm" onClick={() => { setAddingDiff(false); setNewDiff(""); }}>✕</button>
            </div>
          )}
          {(mkt.differentiators || []).length === 0 && !addingDiff
            ? <div className="empty-state"><div className="empty-state-title">No differentiators added yet</div></div>
            : (mkt.differentiators || []).map((d, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "10px 0", borderBottom: `1px solid ${BRAND.border}` }}>
                <span style={{ background: BRAND.navy, color: "#fff", borderRadius: "50%", width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>{i + 1}</span>
                <span style={{ flex: 1, fontSize: 14, color: BRAND.text, lineHeight: 1.5 }}>{d}</span>
                {canEdit && <button onClick={() => removeDiff(i)} style={{ background: "none", border: "none", color: BRAND.muted, cursor: "pointer", fontSize: 16, padding: "0 2px" }}>×</button>}
              </div>
            ))
          }
        </div>
      </div>

      {/* Proven Process */}
      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-header">
          <span className="card-title">Proven Process</span>
        </div>
        <div className="card-body">
          <p className="text-muted mb-16">What is your repeatable, step-by-step process that delivers results for clients?</p>
          {canEdit
            ? <textarea className="textarea" value={mkt.provenProcess} onChange={e => updateMkt("provenProcess", e.target.value)} placeholder="Describe your process..." style={{ minHeight: 100 }} />
            : <p style={{ fontSize: 15, color: BRAND.text, lineHeight: 1.6 }}>{mkt.provenProcess || <span style={{ color: BRAND.muted }}>Not defined yet</span>}</p>
          }
        </div>
      </div>

      {/* Guarantee */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">Guarantee</span>
        </div>
        <div className="card-body">
          <p className="text-muted mb-16">What do you guarantee to clients? A bold guarantee builds trust and reduces perceived risk.</p>
          {canEdit
            ? <textarea className="textarea" value={mkt.guarantee} onChange={e => updateMkt("guarantee", e.target.value)} placeholder="e.g. If you don't feel the value within 90 days, we'll refund your fee." style={{ minHeight: 100 }} />
            : <p style={{ fontSize: 15, color: BRAND.text, lineHeight: 1.6 }}>{mkt.guarantee || <span style={{ color: BRAND.muted }}>Not defined yet</span>}</p>
          }
        </div>
      </div>
    </div>
  );
}

// ─── Business Management Checklist ───────────────────────────────────────────
const CHECKLIST_SECTIONS = [
  {
    id: "legal",
    title: "Legal & Governance",
    icon: "⚖️",
    items: [
      { id: "constitution", label: "Company Constitution", question: "Do you have a current, reviewed company constitution in place?", note: "Should be reviewed by a lawyer and updated when ownership/structure changes." },
      { id: "shareholders", label: "Shareholders Agreement", question: "Is there a signed shareholders agreement between all owners?", note: "Covers decision-making, dispute resolution, and ownership transfer." },
      { id: "buysell", label: "Buy/Sell Agreement", question: "Do you have a buy/sell agreement funded by insurance?", note: "Protects the business and remaining owners if a partner exits, dies or is incapacitated." },
      { id: "partnerships", label: "Partnership / JV Agreements", question: "Are all partnership or joint venture arrangements documented?", note: "" },
      { id: "ip", label: "IP & Trademark Protection", question: "Is your business name, brand and IP legally protected?", note: "Consider trademarks for your business name and key brand assets." },
    ]
  },
  {
    id: "succession",
    title: "Succession Planning",
    icon: "🔄",
    items: [
      { id: "succession_plan", label: "Succession Plan", question: "Do you have a documented succession plan for key roles?", note: "Who takes over if you step back, retire or are incapacitated?" },
      { id: "key_person", label: "Key Person Risk", question: "Have you identified and mitigated key person dependencies?", note: "Is the business too reliant on one individual? What's the backup plan?" },
      { id: "exit_strategy", label: "Exit Strategy", question: "Do you have a documented exit strategy and target valuation?", note: "Know your number and your timeline — it shapes every business decision." },
      { id: "owner_insurance", label: "Owner Insurance Review", question: "Have you reviewed life, TPD and income protection for all owners in the last 12 months?", note: "" },
    ]
  },
  {
    id: "financial",
    title: "Financial Controls",
    icon: "💰",
    items: [
      { id: "budgets", label: "Annual Budget", question: "Do you have a formal annual budget reviewed monthly?", note: "" },
      { id: "cashflow", label: "Cash Flow Forecasting", question: "Do you forecast cash flow at least 90 days ahead?", note: "Cash flow surprises kill profitable businesses." },
      { id: "accountant", label: "Accountant / CFO Relationship", question: "Are you meeting with your accountant at least quarterly?", note: "" },
      { id: "tax_planning", label: "Tax Planning", question: "Is proactive tax planning in place (not just compliance)?", note: "" },
      { id: "banking", label: "Banking & Credit Facilities", question: "Are your banking facilities appropriate for the business stage?", note: "" },
    ]
  },
  {
    id: "operations",
    title: "Operations & Risk",
    icon: "⚙️",
    items: [
      { id: "sops", label: "Standard Operating Procedures", question: "Are your core processes documented so others can follow them?", note: "The business should be able to run without you for 2 weeks." },
      { id: "insurance_bus", label: "Business Insurance Review", question: "Have all business insurance policies been reviewed in the last 12 months?", note: "Public liability, professional indemnity, cyber, property." },
      { id: "contracts", label: "Client Contracts / Engagement Letters", question: "Are all client engagements covered by signed agreements?", note: "" },
      { id: "compliance", label: "Regulatory Compliance", question: "Are you current on all licensing, compliance and regulatory obligations?", note: "" },
      { id: "data_security", label: "Data Security & Privacy", question: "Do you have a documented data security and privacy policy?", note: "Including a breach response plan." },
    ]
  },
  {
    id: "people",
    title: "People & Culture",
    icon: "👥",
    items: [
      { id: "org_chart", label: "Org Chart & Role Clarity", question: "Does everyone have a clear role description and reporting line?", note: "" },
      { id: "employment", label: "Employment Contracts", question: "Do all employees have current, reviewed employment contracts?", note: "" },
      { id: "performance", label: "Performance Review Process", question: "Is there a consistent performance review process in place?", note: "At minimum annual formal reviews plus regular 1:1s." },
      { id: "culture", label: "Values & Culture Documentation", question: "Are your values clearly communicated and embedded in hiring/performance?", note: "" },
    ]
  },
];

const STATUS_OPTIONS = [
  { value: "", label: "Not assessed", color: BRAND.muted },
  { value: "yes", label: "Yes — in place", color: "#16a34a" },
  { value: "partial", label: "Partial / needs review", color: "#d97706" },
  { value: "no", label: "Not in place", color: "#dc2626" },
  { value: "na", label: "N/A", color: BRAND.muted },
];

function ChecklistPage({ business, onUpdate, canEdit }) {
  const checklist = business.checklist || {};

  function setField(itemId, field, value) {
    onUpdate({ ...business, checklist: { ...checklist, [itemId]: { ...(checklist[itemId] || {}), [field]: value } } });
  }
  function setStatus(itemId, value) { setField(itemId, "status", value); }
  function setNotes(itemId, value) { setField(itemId, "notes", value); }
  function setDate(itemId, value) { setField(itemId, "assessedDate", value); }

  const allItems = CHECKLIST_SECTIONS.flatMap(s => s.items);
  const answered = allItems.filter(i => checklist[i.id]?.status).length;
  const complete = allItems.filter(i => checklist[i.id]?.status === "yes" || checklist[i.id]?.status === "na").length;

  // Generate year options for date dropdown (last 5 years by quarter)
  function getDateOptions() {
    const opts = [{ value: "", label: "Date assessed..." }];
    const now = new Date();
    for (let y = now.getFullYear(); y >= now.getFullYear() - 4; y--) {
      opts.push({ value: `Q4 ${y}`, label: `Q4 ${y} (Apr–Jun)` });
      opts.push({ value: `Q3 ${y}`, label: `Q3 ${y} (Jan–Mar)` });
      opts.push({ value: `Q2 ${y}`, label: `Q2 ${y} (Oct–Dec)` });
      opts.push({ value: `Q1 ${y}`, label: `Q1 ${y} (Jul–Sep)` });
    }
    return opts;
  }
  const DATE_OPTIONS = getDateOptions();

  return (
    <div className="animate-in">
      {/* Progress bar */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div className="card-body" style={{ padding: "16px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: BRAND.textSub }}>{complete} of {allItems.length} items complete or N/A</span>
            <span style={{ fontSize: 13, color: BRAND.muted }}>{answered} assessed</span>
          </div>
          <div style={{ height: 6, background: BRAND.border, borderRadius: 6, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${(complete / allItems.length) * 100}%`, background: "#16a34a", borderRadius: 6, transition: "width 0.4s" }} />
          </div>
        </div>
      </div>

      {CHECKLIST_SECTIONS.map(section => {
        const sectionComplete = section.items.filter(i => checklist[i.id]?.status === "yes" || checklist[i.id]?.status === "na").length;
        return (
          <div key={section.id} className="card" style={{ marginBottom: 20 }}>
            <div className="card-header">
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 18 }}>{section.icon}</span>
                <span className="card-title">{section.title}</span>
              </div>
              <span style={{ fontSize: 12, color: BRAND.muted }}>{sectionComplete}/{section.items.length} complete</span>
            </div>
            <div style={{ padding: "0 24px" }}>
              {section.items.map((item, idx) => {
                const entry = checklist[item.id] || {};
                const statusObj = STATUS_OPTIONS.find(s => s.value === (entry.status || "")) || STATUS_OPTIONS[0];
                return (
                  <div key={item.id} style={{ padding: "16px 0", borderBottom: idx < section.items.length - 1 ? `1px solid ${BRAND.border}` : "none" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 16, alignItems: "start" }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 14, color: BRAND.navy, marginBottom: 2 }}>{item.label}</div>
                        <div style={{ fontSize: 13, color: BRAND.textSub, marginBottom: item.note ? 4 : 0 }}>{item.question}</div>
                        {item.note && <div style={{ fontSize: 12, color: BRAND.muted, fontStyle: "italic" }}>{item.note}</div>}
                        {entry.status && canEdit && (
                          <textarea
                            value={entry.notes || ""}
                            onChange={e => setNotes(item.id, e.target.value)}
                            placeholder="Add notes..."
                            style={{ marginTop: 8, width: "100%", background: BRAND.offWhite, border: `1px solid ${BRAND.border}`, borderRadius: 6, padding: "6px 10px", fontSize: 12, color: BRAND.textSub, fontFamily: "'DM Sans', sans-serif", resize: "none", minHeight: 48, outline: "none" }}
                          />
                        )}
                        {entry.status && !canEdit && entry.notes && (
                          <div style={{ marginTop: 6, fontSize: 12, color: BRAND.textSub, background: BRAND.offWhite, borderRadius: 6, padding: "6px 10px" }}>{entry.notes}</div>
                        )}
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
                        {/* Status dropdown */}
                        {canEdit ? (
                          <select
                            value={entry.status || ""}
                            onChange={e => setStatus(item.id, e.target.value)}
                            style={{ background: BRAND.white, border: `1px solid ${BRAND.border}`, borderRadius: 6, padding: "6px 10px", fontSize: 12, color: statusObj.color, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", cursor: "pointer", outline: "none", minWidth: 160 }}
                          >
                            {STATUS_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                          </select>
                        ) : (
                          <span style={{ fontSize: 12, fontWeight: 600, color: statusObj.color, background: BRAND.offWhite, borderRadius: 6, padding: "5px 10px", whiteSpace: "nowrap" }}>{statusObj.label}</span>
                        )}
                        {/* Date assessed dropdown */}
                        {canEdit ? (
                          <select
                            value={entry.assessedDate || ""}
                            onChange={e => setDate(item.id, e.target.value)}
                            style={{ background: BRAND.white, border: `1px solid ${BRAND.border}`, borderRadius: 6, padding: "6px 10px", fontSize: 12, color: entry.assessedDate ? BRAND.textSub : BRAND.muted, fontFamily: "'DM Sans', sans-serif", cursor: "pointer", outline: "none", minWidth: 160 }}
                          >
                            {DATE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                          </select>
                        ) : entry.assessedDate ? (
                          <span style={{ fontSize: 11, color: BRAND.muted }}>Assessed: {entry.assessedDate}</span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Financials ───────────────────────────────────────────────────────────────
// Australian Financial Year: Q1 = Jul–Sep, Q2 = Oct–Dec, Q3 = Jan–Mar, Q4 = Apr–Jun
function getAFYQuarters() {
  const quarters = [];
  const now = new Date();
  // Determine current Australian FY
  // AU FY starts July 1. If current month < 7, FY year = current year. Else FY year = current year + 1.
  const fyEnd = now.getMonth() >= 6 ? now.getFullYear() + 1 : now.getFullYear();
  // Generate 12 quarters: 3 past FYs + current FY
  for (let fy = fyEnd - 3; fy <= fyEnd; fy++) {
    quarters.push({ id: `FY${fy}-Q1`, label: `Q1 FY${fy}`, desc: `Jul–Sep ${fy - 1}`, fy });
    quarters.push({ id: `FY${fy}-Q2`, label: `Q2 FY${fy}`, desc: `Oct–Dec ${fy - 1}`, fy });
    quarters.push({ id: `FY${fy}-Q3`, label: `Q3 FY${fy}`, desc: `Jan–Mar ${fy}`, fy });
    quarters.push({ id: `FY${fy}-Q4`, label: `Q4 FY${fy}`, desc: `Apr–Jun ${fy}`, fy });
  }
  return quarters;
}

const FINANCIAL_FIELDS = [
  { id: "revenue", label: "Revenue", prefix: "$", color: "#2563eb" },
  { id: "expenses", label: "Expenses", prefix: "$", color: "#dc2626" },
  { id: "interest", label: "Interest", prefix: "$", color: "#d97706" },
  { id: "profit", label: "Profit (EBIT)", prefix: "$", color: "#16a34a" },
  { id: "ebit_pct", label: "EBIT %", prefix: "%", color: "#7c3aed", auto: true },
  { id: "clients", label: "Client Numbers", prefix: "", color: "#0891b2" },
  { id: "new_revenue", label: "New Revenue (Upfront)", prefix: "$", color: "#0369a1" },
  { id: "ongoing", label: "Ongoing Revenue", prefix: "$", color: "#059669" },
];

function parseMoney(val) {
  if (!val) return 0;
  const n = parseFloat(String(val).replace(/[^0-9.-]/g, ""));
  return isNaN(n) ? 0 : n;
}

function formatMoney(n, prefix = "$") {
  if (!n && n !== 0) return "—";
  if (prefix === "%") return `${n}%`;
  if (prefix === "") return String(Math.round(n));
  if (Math.abs(n) >= 1000000) return `${n < 0 ? "-" : ""}$${(Math.abs(n) / 1000000).toFixed(2)}M`;
  if (Math.abs(n) >= 1000) return `${n < 0 ? "-" : ""}$${Math.round(Math.abs(n) / 1000)}k`;
  return `${n < 0 ? "-$" : "$"}${Math.round(Math.abs(n)).toLocaleString()}`;
}

function MiniChart({ data, color, height = 48 }) {
  if (!data || data.length < 2) return <div style={{ height, display: "flex", alignItems: "center", justifyContent: "center", color: BRAND.muted, fontSize: 11 }}>Not enough data</div>;
  const vals = data.map(d => d.value);
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const range = max - min || 1;
  const w = 280, h = height;
  const pts = vals.map((v, i) => {
    const x = (i / (vals.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 8) - 4;
    return `${x},${y}`;
  });
  const area = `M${pts.join(" L")} L${w},${h} L0,${h} Z`;
  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ display: "block" }}>
      <defs>
        <linearGradient id={`g-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.18" />
          <stop offset="100%" stopColor={color} stopOpacity="0.01" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#g-${color.replace("#", "")})`} />
      <polyline points={pts.join(" ")} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      {vals.map((v, i) => {
        const [x, y] = pts[i].split(",").map(Number);
        return <circle key={i} cx={x} cy={y} r="3" fill={color} />;
      })}
    </svg>
  );
}

function hasData(entry) {
  // A quarter is considered "entered" if at least revenue or expenses is present
  return entry && (parseMoney(entry.revenue) > 0 || parseMoney(entry.expenses) > 0);
}

function autoCalcProfit(d) {
  const rev = parseMoney(d.revenue);
  const exp = parseMoney(d.expenses);
  const int = parseMoney(d.interest);
  if (rev > 0 || exp > 0) {
    return String(rev - exp - int);
  }
  return d.profit || "";
}

function autoCalcEbitPct(d) {
  const rev = parseMoney(d.revenue);
  const profit = parseMoney(autoCalcProfit(d));
  if (rev > 0) {
    return String(Math.round((profit / rev) * 100 * 10) / 10);
  }
  return "";
}

function FinancialsPage({ business, onUpdate, canEdit }) {
  const QUARTERS = getAFYQuarters();
  const financials = business.financials || [];
  const budgets = business.budgets || {};

  const [selectedQ, setSelectedQ] = useState(QUARTERS[QUARTERS.length - 1].id);
  const [tab, setTab] = useState("actuals");
  const [editMode, setEditMode] = useState(false);
  const [draft, setDraft] = useState({});
  const [budgetFY, setBudgetFY] = useState(String(QUARTERS[QUARTERS.length - 1].fy));
  const [editBudget, setEditBudget] = useState(false);
  const [budgetDraft, setBudgetDraft] = useState({});
  const [chartFields, setChartFields] = useState(["revenue", "expenses", "profit"]);

  function toggleChartField(id) {
    setChartFields(prev => prev.includes(id) ? prev.length > 1 ? prev.filter(f => f !== id) : prev : [...prev, id]);
  }

  const currentEntry = financials.find(f => f.quarterId === selectedQ) || { quarterId: selectedQ };
  const selectedQMeta = QUARTERS.find(q => q.id === selectedQ);

  function getBudgetForFY(fy) { return budgets[String(fy)] || {}; }
  function getQuarterlyBudget(quarterId) {
    const q = QUARTERS.find(x => x.id === quarterId);
    if (!q) return {};
    const fyBudget = getBudgetForFY(q.fy);
    const result = {};
    FINANCIAL_FIELDS.filter(f => !f.auto && f.prefix !== "").forEach(f => {
      const annual = parseMoney(fyBudget[f.id]);
      result[f.id] = annual > 0 ? annual / 4 : 0;
    });
    const rev = parseMoney(fyBudget.revenue);
    const exp = parseMoney(fyBudget.expenses);
    const int = parseMoney(fyBudget.interest);
    result.profit = rev > 0 || exp > 0 ? (rev - exp - int) / 4 : 0;
    result.ebit_pct = result.revenue > 0 ? Math.round((result.profit / result.revenue) * 1000) / 10 : 0;
    return result;
  }

  function getActualVal(entry, fieldId) {
    if (!entry) return 0;
    if (fieldId === "profit") return parseMoney(autoCalcProfit(entry));
    if (fieldId === "ebit_pct") return parseMoney(autoCalcEbitPct(entry));
    return parseMoney(entry[fieldId]);
  }

  function startEdit() { setDraft({ ...currentEntry }); setEditMode(true); }
  function updateDraft(field, value) {
    setDraft(d => {
      const next = { ...d, [field]: value };
      if (["revenue", "expenses", "interest"].includes(field)) next.profit = autoCalcProfit(next);
      return next;
    });
  }
  function saveEdit() {
    const toSave = { ...draft, profit: autoCalcProfit(draft) };
    const existing = financials.find(f => f.quarterId === selectedQ);
    const updated = existing ? financials.map(f => f.quarterId === selectedQ ? { ...f, ...toSave } : f) : [...financials, { ...toSave, quarterId: selectedQ }];
    onUpdate({ ...business, financials: updated });
    setEditMode(false);
  }

  function startBudgetEdit() { setBudgetDraft({ ...getBudgetForFY(budgetFY) }); setEditBudget(true); }
  function saveBudget() {
    onUpdate({ ...business, budgets: { ...budgets, [budgetFY]: budgetDraft } });
    setEditBudget(false);
  }

  const fyOptions = [...new Set(QUARTERS.map(q => q.fy))].sort((a, b) => b - a);
  const allEnteredQuarters = QUARTERS.filter(q => financials.some(f => f.quarterId === q.id));

  const multiChartData = chartFields.flatMap(fieldId => {
    const fieldMeta = FINANCIAL_FIELDS.find(f => f.id === fieldId);
    const actualPts = allEnteredQuarters.map(q => {
      const entry = financials.find(f => f.quarterId === q.id) || {};
      return { label: q.label, desc: q.desc, value: getActualVal(entry, fieldId) };
    });
    const series = [{ fieldId, label: fieldMeta?.label, color: fieldMeta?.color, prefix: fieldMeta?.prefix, points: actualPts, dashed: false }];
    const budgetPts = allEnteredQuarters.map(q => {
      const qb = getQuarterlyBudget(q.id);
      return { label: q.label, desc: q.desc, value: qb[fieldId] || 0 };
    });
    if (budgetPts.some(p => p.value > 0)) {
      series.push({ fieldId: fieldId + "_budget", label: (fieldMeta?.label || "") + " (Budget)", color: fieldMeta?.color, prefix: fieldMeta?.prefix, points: budgetPts, dashed: true });
    }
    return series;
  });

  const hasEnoughData = allEnteredQuarters.length >= 2;
  const qBudget = getQuarterlyBudget(selectedQ);

  return (
    <div className="animate-in">
      <div className="tabs">
        {[{ id: "actuals", label: "Actuals" }, { id: "budget", label: "Annual Budget" }, { id: "variance", label: "Actual vs Budget" }].map(t => (
          <button key={t.id} className={`tab ${tab === t.id ? "active" : ""}`} onClick={() => { setTab(t.id); setEditMode(false); setEditBudget(false); }}>{t.label}</button>
        ))}
      </div>

      {tab === "actuals" && (
        <>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", flex: 1 }}>
              {QUARTERS.slice(-8).map(q => {
                const entry = financials.find(f => f.quarterId === q.id);
                const entered = hasData(entry);
                const isSelected = selectedQ === q.id;
                let bg = "#fee2e2", color = "#dc2626", border = "#fca5a5";
                if (isSelected) { bg = BRAND.navy; color = "#fff"; border = BRAND.navy; }
                else if (entered) { bg = "#dcfce7"; color = "#16a34a"; border = "#86efac"; }
                return (
                  <button key={q.id} onClick={() => { setSelectedQ(q.id); setEditMode(false); }} title={q.desc}
                    style={{ padding: "5px 12px", borderRadius: 6, fontSize: 12, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", cursor: "pointer", border: `1px solid ${border}`, background: bg, color, transition: "all 0.15s" }}>
                    {q.label}
                  </button>
                );
              })}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ display: "flex", gap: 8, fontSize: 11, color: BRAND.muted }}>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: "50%", background: "#16a34a", display: "inline-block" }} /> Entered</span>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: "50%", background: "#dc2626", display: "inline-block" }} /> Not entered</span>
              </div>
              {canEdit && !editMode && <button className="btn btn-primary btn-sm" onClick={startEdit}>+ Enter Data</button>}
              {canEdit && editMode && <><button className="btn btn-ghost btn-sm" onClick={() => setEditMode(false)}>Cancel</button><button className="btn btn-primary btn-sm" onClick={saveEdit}>Save</button></>}
            </div>
          </div>

          <div className="card" style={{ marginBottom: 20 }}>
            <div className="card-header">
              <div>
                <span className="card-title">{selectedQMeta?.label} Actuals</span>
                <div style={{ fontSize: 12, color: BRAND.muted, marginTop: 2 }}>{selectedQMeta?.desc}</div>
              </div>
              {editMode && <span className="badge badge-yellow">Editing</span>}
            </div>
            <div className="card-body">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
                {FINANCIAL_FIELDS.map(f => {
                  const isAutoCalc = f.auto;
                  let val = isAutoCalc
                    ? (f.id === "profit" ? (editMode ? autoCalcProfit(draft) : autoCalcProfit(currentEntry)) : (editMode ? autoCalcEbitPct(draft) : autoCalcEbitPct(currentEntry)))
                    : (editMode ? (draft[f.id] || "") : (currentEntry[f.id] || ""));
                  const display = parseMoney(val);
                  const budgetVal = qBudget[f.id] || 0;
                  const variance = display - budgetVal;
                  const hasBudget = budgetVal > 0;
                  return (
                    <div key={f.id} style={{ background: isAutoCalc ? (f.id === "ebit_pct" ? "#faf5ff" : "#f0fdf4") : BRAND.offWhite, borderRadius: 8, padding: "14px 16px", border: `1px solid ${isAutoCalc ? (f.id === "ebit_pct" ? "#d8b4fe" : "#86efac") : BRAND.border}` }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                        <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: isAutoCalc ? f.color : BRAND.muted }}>{f.label}</div>
                        {isAutoCalc && <span style={{ fontSize: 10, background: f.id === "ebit_pct" ? "#ede9fe" : "#dcfce7", color: f.color, borderRadius: 4, padding: "1px 5px", fontWeight: 700 }}>AUTO</span>}
                      </div>
                      {editMode && !isAutoCalc
                        ? <input className="input" value={draft[f.id] || ""} onChange={e => updateDraft(f.id, e.target.value)} placeholder={f.prefix === "$" ? "e.g. 250000" : "e.g. 85"} style={{ marginTop: 2 }} />
                        : <div style={{ fontSize: f.id === "ebit_pct" ? 26 : 22, fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, color: display !== 0 ? f.color : BRAND.muted }}>
                            {display !== 0 ? formatMoney(display, f.prefix) : <span style={{ fontSize: 14, fontFamily: "'DM Sans', sans-serif", fontWeight: 400, color: BRAND.muted }}>Not entered</span>}
                          </div>
                      }
                      {!editMode && hasBudget && display !== 0 && f.prefix !== "%" && (
                        <div style={{ marginTop: 6, fontSize: 11, color: variance >= 0 ? "#16a34a" : "#dc2626", fontWeight: 600 }}>
                          {variance >= 0 ? "▲" : "▼"} {formatMoney(Math.abs(variance), f.prefix)} vs budget
                        </div>
                      )}
                      {!editMode && hasBudget && display === 0 && (
                        <div style={{ marginTop: 6, fontSize: 11, color: BRAND.muted }}>Budget: {formatMoney(budgetVal, f.prefix)}</div>
                      )}
                    </div>
                  );
                })}
              </div>
              {editMode && <p style={{ fontSize: 12, color: BRAND.muted, marginTop: 12, fontStyle: "italic" }}>💡 Profit (EBIT) = Revenue − Expenses − Interest &nbsp;·&nbsp; EBIT % = Profit ÷ Revenue</p>}
            </div>
          </div>

          <div className="card">
            <div className="card-header" style={{ flexWrap: "wrap", gap: 12 }}>
              <div>
                <span className="card-title">Trends Over Time</span>
                <div style={{ fontSize: 12, color: BRAND.muted, marginTop: 2 }}>Solid = actual · dashed = budget</div>
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {FINANCIAL_FIELDS.map(f => {
                  const active = chartFields.includes(f.id);
                  return (
                    <button key={f.id} onClick={() => toggleChartField(f.id)}
                      style={{ padding: "5px 12px", borderRadius: 6, fontSize: 12, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", cursor: "pointer", transition: "all 0.15s", background: active ? f.color : BRAND.white, color: active ? "#fff" : BRAND.muted, border: `1px solid ${active ? f.color : BRAND.border}`, display: "flex", alignItems: "center", gap: 5 }}>
                      {active && <span style={{ fontSize: 10 }}>✓</span>}{f.label}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="card-body">
              {!hasEnoughData
                ? <div className="empty-state"><div className="empty-state-icon">📈</div><div className="empty-state-title">Not enough data yet</div><p>Enter data for at least 2 quarters to see trends.</p></div>
                : <>
                    <div style={{ marginBottom: 16 }}><MultiLineChart series={multiChartData} quarters={allEnteredQuarters} /></div>
                    <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 20 }}>
                      {multiChartData.map(s => (
                        <div key={s.fieldId} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12 }}>
                          <span style={{ width: 24, height: 3, background: s.dashed ? "transparent" : s.color, borderRadius: 2, display: "inline-block", borderBottom: s.dashed ? `2px dashed ${s.color}` : "none" }} />
                          <span style={{ color: BRAND.textSub, fontWeight: 500 }}>{s.label}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ overflowX: "auto" }}>
                      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                        <thead>
                          <tr>
                            <th style={{ textAlign: "left", padding: "8px 12px", color: BRAND.muted, fontWeight: 600, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", borderBottom: `1px solid ${BRAND.border}` }}>Quarter</th>
                            {FINANCIAL_FIELDS.map(f => (
                              <th key={f.id} style={{ textAlign: "right", padding: "8px 12px", color: chartFields.includes(f.id) ? f.color : BRAND.muted, fontWeight: chartFields.includes(f.id) ? 700 : 600, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", borderBottom: `1px solid ${BRAND.border}`, whiteSpace: "nowrap" }}>{f.label}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {allEnteredQuarters.map((q, i) => {
                            const entry = financials.find(f => f.quarterId === q.id) || {};
                            return (
                              <tr key={q.id} style={{ background: i % 2 === 0 ? BRAND.white : BRAND.offWhite }}>
                                <td style={{ padding: "8px 12px", fontWeight: 500, color: BRAND.navy }}>{q.label}<br /><span style={{ fontSize: 11, color: BRAND.muted, fontWeight: 400 }}>{q.desc}</span></td>
                                {FINANCIAL_FIELDS.map(f => {
                                  const v = getActualVal(entry, f.id);
                                  return <td key={f.id} style={{ textAlign: "right", padding: "8px 12px", color: v ? f.color : BRAND.muted, fontWeight: v && chartFields.includes(f.id) ? 700 : v ? 500 : 400 }}>{v ? formatMoney(v, f.prefix) : "—"}</td>;
                                })}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </>
              }
            </div>
          </div>
        </>
      )}

      {tab === "budget" && (
        <>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
            <div style={{ display: "flex", gap: 6 }}>
              {fyOptions.map(fy => (
                <button key={fy} onClick={() => { setBudgetFY(String(fy)); setEditBudget(false); }}
                  style={{ padding: "5px 14px", borderRadius: 6, fontSize: 12, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", cursor: "pointer", border: `1px solid ${budgetFY === String(fy) ? BRAND.navy : BRAND.border}`, background: budgetFY === String(fy) ? BRAND.navy : BRAND.white, color: budgetFY === String(fy) ? "#fff" : BRAND.textSub, transition: "all .15s" }}>
                  FY{fy}
                </button>
              ))}
            </div>
            <div style={{ flex: 1 }} />
            {canEdit && !editBudget && <button className="btn btn-primary btn-sm" onClick={startBudgetEdit}>+ Enter Budget</button>}
            {canEdit && editBudget && <><button className="btn btn-ghost btn-sm" onClick={() => setEditBudget(false)}>Cancel</button><button className="btn btn-primary btn-sm" onClick={saveBudget}>Save Budget</button></>}
          </div>

          <div className="card">
            <div className="card-header">
              <div>
                <span className="card-title">FY{budgetFY} Annual Budget</span>
                <div style={{ fontSize: 12, color: BRAND.muted, marginTop: 2 }}>Jul {Number(budgetFY) - 1} – Jun {budgetFY} · Enter full-year figures; quarterly budget calculated automatically (÷4)</div>
              </div>
              {editBudget && <span className="badge badge-yellow">Editing</span>}
            </div>
            <div className="card-body">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16, marginBottom: 20 }}>
                {FINANCIAL_FIELDS.filter(f => !f.auto).map(f => {
                  const fyBudget = getBudgetForFY(budgetFY);
                  const val = editBudget ? (budgetDraft[f.id] || "") : (fyBudget[f.id] || "");
                  const display = parseMoney(val);
                  return (
                    <div key={f.id} style={{ background: BRAND.offWhite, borderRadius: 8, padding: "14px 16px", border: `1px solid ${BRAND.border}` }}>
                      <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: BRAND.muted, marginBottom: 6 }}>{f.label}</div>
                      {editBudget
                        ? <input className="input" value={budgetDraft[f.id] || ""} onChange={e => setBudgetDraft(d => ({ ...d, [f.id]: e.target.value }))} placeholder={f.prefix === "$" ? "Annual e.g. 1000000" : "e.g. 100"} style={{ marginTop: 2 }} />
                        : <div style={{ fontSize: 22, fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, color: display ? f.color : BRAND.muted }}>
                            {display ? formatMoney(display, f.prefix) : <span style={{ fontSize: 14, fontFamily: "'DM Sans', sans-serif", fontWeight: 400, color: BRAND.muted }}>Not set</span>}
                          </div>
                      }
                      {display > 0 && !editBudget && <div style={{ fontSize: 11, color: BRAND.muted, marginTop: 4 }}>{formatMoney(display / 4, f.prefix)} / quarter</div>}
                    </div>
                  );
                })}
              </div>
              {(() => {
                const fyBudget = editBudget ? budgetDraft : getBudgetForFY(budgetFY);
                const rev = parseMoney(fyBudget.revenue), exp = parseMoney(fyBudget.expenses), int = parseMoney(fyBudget.interest);
                const profit = rev - exp - int;
                const ebitPct = rev > 0 ? Math.round(profit / rev * 1000) / 10 : 0;
                if (rev === 0 && exp === 0) return null;
                return (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    {[{ label: "Budgeted Profit (EBIT)", val: profit, qVal: profit / 4, prefix: "$", color: "#16a34a" }, { label: "Budgeted EBIT %", val: ebitPct, prefix: "%", color: "#7c3aed" }].map(item => (
                      <div key={item.label} style={{ background: "#f0fdf4", borderRadius: 8, padding: "14px 16px", border: "1px solid #86efac" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                          <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: item.color }}>{item.label}</div>
                          <span style={{ fontSize: 10, background: "#dcfce7", color: item.color, borderRadius: 4, padding: "1px 5px", fontWeight: 700 }}>AUTO</span>
                        </div>
                        <div style={{ fontSize: 24, fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, color: item.color }}>{formatMoney(item.val, item.prefix)}</div>
                        {item.prefix === "$" && <div style={{ fontSize: 11, color: BRAND.muted, marginTop: 4 }}>{formatMoney(item.val / 4, "$")} / quarter</div>}
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          </div>
        </>
      )}

      {tab === "variance" && (
        <>
          <p className="text-muted" style={{ marginBottom: 20 }}>Actual vs quarterly budget. Green = ahead of budget · Red = behind. For expenses, under-budget is green.</p>
          {allEnteredQuarters.length === 0
            ? <div className="empty-state"><div className="empty-state-icon">📊</div><div className="empty-state-title">No actuals entered yet</div><p>Enter actual data in the Actuals tab first.</p></div>
            : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: "left", padding: "10px 14px", color: BRAND.muted, fontWeight: 600, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", borderBottom: `2px solid ${BRAND.border}` }}>Quarter</th>
                      <th style={{ padding: "10px 14px", color: BRAND.muted, fontWeight: 600, fontSize: 11, textTransform: "uppercase", borderBottom: `2px solid ${BRAND.border}` }}>Metric</th>
                      <th style={{ textAlign: "right", padding: "10px 14px", color: BRAND.muted, fontWeight: 600, fontSize: 11, textTransform: "uppercase", borderBottom: `2px solid ${BRAND.border}` }}>Budget</th>
                      <th style={{ textAlign: "right", padding: "10px 14px", color: BRAND.muted, fontWeight: 600, fontSize: 11, textTransform: "uppercase", borderBottom: `2px solid ${BRAND.border}` }}>Actual</th>
                      <th style={{ textAlign: "right", padding: "10px 14px", color: BRAND.muted, fontWeight: 600, fontSize: 11, textTransform: "uppercase", borderBottom: `2px solid ${BRAND.border}` }}>Variance $</th>
                      <th style={{ textAlign: "right", padding: "10px 14px", color: BRAND.muted, fontWeight: 600, fontSize: 11, textTransform: "uppercase", borderBottom: `2px solid ${BRAND.border}` }}>Variance %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allEnteredQuarters.map((q) => {
                      const entry = financials.find(f => f.quarterId === q.id) || {};
                      const qb = getQuarterlyBudget(q.id);
                      const eligibleFields = FINANCIAL_FIELDS.filter(f => f.prefix !== "%" && qb[f.id] > 0);
                      if (eligibleFields.length === 0) {
                        return (
                          <tr key={q.id}><td colSpan={6} style={{ padding: "10px 14px", color: BRAND.muted, fontStyle: "italic", borderBottom: `1px solid ${BRAND.border}` }}>{q.label} — no budget set for FY{q.fy}</td></tr>
                        );
                      }
                      return eligibleFields.map((f, fi) => {
                        const actual = getActualVal(entry, f.id);
                        const budget = qb[f.id] || 0;
                        const varAmt = actual - budget;
                        const varPct = budget !== 0 ? Math.round((varAmt / Math.abs(budget)) * 1000) / 10 : null;
                        const isExpense = f.id === "expenses" || f.id === "interest";
                        const isGood = actual > 0 && budget > 0 ? (isExpense ? varAmt <= 0 : varAmt >= 0) : null;
                        return (
                          <tr key={f.id} style={{ background: fi % 2 === 0 ? BRAND.white : BRAND.offWhite, borderBottom: `1px solid ${BRAND.border}` }}>
                            {fi === 0 && <td rowSpan={eligibleFields.length} style={{ padding: "10px 14px", fontWeight: 600, color: BRAND.navy, borderRight: `1px solid ${BRAND.border}`, verticalAlign: "top" }}>
                              {q.label}<br /><span style={{ fontSize: 11, color: BRAND.muted, fontWeight: 400 }}>{q.desc}</span>
                            </td>}
                            <td style={{ padding: "8px 14px", color: BRAND.textSub, fontWeight: 500 }}>{f.label}</td>
                            <td style={{ textAlign: "right", padding: "8px 14px", color: BRAND.muted }}>{budget ? formatMoney(budget, f.prefix) : "—"}</td>
                            <td style={{ textAlign: "right", padding: "8px 14px", color: actual ? f.color : BRAND.muted, fontWeight: actual ? 600 : 400 }}>{actual ? formatMoney(actual, f.prefix) : "—"}</td>
                            <td style={{ textAlign: "right", padding: "8px 14px", fontWeight: 600, color: isGood !== null ? (isGood ? "#16a34a" : "#dc2626") : BRAND.muted }}>
                              {isGood !== null ? <>{isGood ? "▲" : "▼"} {formatMoney(Math.abs(varAmt), f.prefix)}</> : "—"}
                            </td>
                            <td style={{ textAlign: "right", padding: "8px 14px", fontWeight: 600, color: isGood !== null && varPct !== null ? (isGood ? "#16a34a" : "#dc2626") : BRAND.muted }}>
                              {isGood !== null && varPct !== null ? `${Math.abs(varPct)}%` : "—"}
                            </td>
                          </tr>
                        );
                      });
                    })}
                  </tbody>
                </table>
              </div>
            )
          }
        </>
      )}
    </div>
  );
}


function MultiLineChart({ series, quarters }) {
  const W = 800, H = 220, PAD = { top: 20, right: 20, bottom: 44, left: 70 };
  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top - PAD.bottom;

  // Shared Y scale across all series
  const allVals = series.flatMap(s => s.points.map(p => p.value)).filter(v => v !== 0);
  if (allVals.length === 0) return null;
  const min = Math.min(0, ...allVals);
  const max = Math.max(...allVals);
  const range = max - min || 1;

  const n = quarters.length;

  function xPos(i) { return PAD.left + (n > 1 ? (i / (n - 1)) * chartW : chartW / 2); }
  function yPos(v) { return PAD.top + chartH - ((v - min) / range) * chartH; }

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map(t => ({
    y: PAD.top + chartH - t * chartH,
    val: min + t * range,
  }));

  // Detect if any series is dollar-based
  const dollarSeries = series.find(s => s.prefix === "$");
  const yPrefix = dollarSeries ? "$" : "";

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: "block", overflow: "visible" }}>
      <defs>
        {series.map(s => (
          <linearGradient key={s.fieldId} id={`grad-${s.fieldId}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={s.color} stopOpacity="0.12" />
            <stop offset="100%" stopColor={s.color} stopOpacity="0.01" />
          </linearGradient>
        ))}
      </defs>

      {/* Y axis grid lines + labels */}
      {yTicks.map((t, i) => (
        <g key={i}>
          <line x1={PAD.left} y1={t.y} x2={W - PAD.right} y2={t.y} stroke={BRAND.border} strokeWidth="1" strokeDasharray={i === 0 ? "none" : "3,3"} />
          <text x={PAD.left - 8} y={t.y + 4} textAnchor="end" fontSize="11" fill={BRAND.muted}>{formatMoney(t.val, yPrefix)}</text>
        </g>
      ))}

      {/* X axis labels */}
      {quarters.map((q, i) => (
        <text key={q.id} x={xPos(i)} y={H - 6} textAnchor="middle" fontSize="11" fill={BRAND.muted}>{q.label}</text>
      ))}

      {/* Area fills — draw first so lines sit on top */}
      {series.map(s => {
        const pts = s.points.map((p, i) => ({ x: xPos(i), y: yPos(p.value) }));
        if (pts.length < 2) return null;
        const areaPath = `M${pts[0].x},${pts[0].y} ${pts.slice(1).map(p => `L${p.x},${p.y}`).join(" ")} L${pts[pts.length-1].x},${yPos(min)} L${pts[0].x},${yPos(min)} Z`;
        return <path key={s.fieldId} d={areaPath} fill={`url(#grad-${s.fieldId})`} />;
      })}

      {/* Lines */}
      {series.map(s => {
        const pts = s.points.map((p, i) => `${xPos(i)},${yPos(p.value)}`).join(" ");
        return (
          <polyline key={s.fieldId} points={pts} fill="none" stroke={s.color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
        );
      })}

      {/* Data points with tooltips */}
      {series.map(s =>
        s.points.map((p, i) => (
          <g key={`${s.fieldId}-${i}`}>
            <circle cx={xPos(i)} cy={yPos(p.value)} r="4" fill={s.color} stroke="#fff" strokeWidth="1.5" />
            <title>{p.label}: {formatMoney(p.value, s.prefix)}</title>
          </g>
        ))
      )}
    </svg>
  );
}

// ─── Risk Management Checklist ────────────────────────────────────────────────
const RISK_SECTIONS = [
  {
    id: "strategic",
    title: "Strategic Risk",
    icon: "🎯",
    items: [
      { id: "r_competitor", label: "Competitor Analysis", question: "Have you mapped your key competitors and their positioning in the last 12 months?", note: "" },
      { id: "r_concentration", label: "Client Concentration Risk", question: "Do any single clients represent more than 20% of your revenue?", note: "Over-reliance on one client is one of the most common business killers." },
      { id: "r_market", label: "Market / Industry Shifts", question: "Have you assessed how regulatory, technology or market changes could impact your business?", note: "" },
      { id: "r_strategy", label: "Strategic Plan Currency", question: "Is your business strategy current and reviewed at least annually?", note: "" },
    ]
  },
  {
    id: "operational_risk",
    title: "Operational Risk",
    icon: "⚙️",
    items: [
      { id: "r_systems", label: "Systems & Technology Failure", question: "Do you have documented contingency plans if your core systems fail?", note: "" },
      { id: "r_supplier", label: "Supplier / Vendor Dependency", question: "Are you over-reliant on any single supplier or technology vendor?", note: "" },
      { id: "r_process", label: "Process Documentation", question: "Are critical processes documented so the business can operate without key individuals?", note: "" },
      { id: "r_quality", label: "Quality Control", question: "Do you have formal quality control or service delivery standards in place?", note: "" },
      { id: "r_capacity", label: "Capacity & Scalability", question: "Can your current systems and team handle a 30% increase in business?", note: "" },
    ]
  },
  {
    id: "financial_risk",
    title: "Financial Risk",
    icon: "💰",
    items: [
      { id: "r_cashflow", label: "Cash Flow Risk", question: "Could the business survive 3 months with no new revenue?", note: "" },
      { id: "r_debt", label: "Debt Levels", question: "Are your debt levels appropriate for the stage and size of the business?", note: "" },
      { id: "r_pricing", label: "Pricing Risk", question: "Are your fees structured to protect margin if costs increase?", note: "" },
      { id: "r_credit", label: "Client Credit Risk", question: "Do you have processes to manage late or non-payment by clients?", note: "" },
    ]
  },
  {
    id: "people_risk",
    title: "People Risk",
    icon: "👥",
    items: [
      { id: "r_keyperson", label: "Key Person Dependency", question: "What happens if your top 1-2 people left tomorrow — could the business continue?", note: "" },
      { id: "r_culture", label: "Culture & Engagement Risk", question: "Do you measure staff engagement and have you addressed key concerns in the last 12 months?", note: "" },
      { id: "r_recruitment", label: "Talent Pipeline", question: "Do you have a process for attracting and retaining top talent?", note: "" },
      { id: "r_conflict", label: "Owner / Partner Conflict", question: "Is there a documented process for resolving disagreements between owners?", note: "" },
    ]
  },
  {
    id: "compliance_risk",
    title: "Compliance & Legal Risk",
    icon: "⚖️",
    items: [
      { id: "r_regulatory", label: "Regulatory Compliance", question: "Are you up to date on all regulatory obligations relevant to your industry?", note: "" },
      { id: "r_privacy", label: "Privacy & Data Breach Risk", question: "Do you have a documented breach response plan and current privacy policy?", note: "" },
      { id: "r_litigation", label: "Litigation Exposure", question: "Are there any current or foreseeable legal disputes that could materially impact the business?", note: "" },
      { id: "r_cyber", label: "Cyber Security", question: "Have you conducted a cyber security assessment in the last 12 months?", note: "Including staff training on phishing and password hygiene." },
    ]
  },
  {
    id: "reputational_risk",
    title: "Reputational Risk",
    icon: "🌐",
    items: [
      { id: "r_brand", label: "Brand & Online Reputation", question: "Do you actively monitor and manage your online reputation and reviews?", note: "" },
      { id: "r_crisis", label: "Crisis Communications Plan", question: "Do you have a documented plan for managing a major public incident or complaint?", note: "" },
      { id: "r_social", label: "Social Media Risk", question: "Are there clear guidelines for staff use of social media in relation to the business?", note: "" },
    ]
  },
];

// ─── Financial Checklist ──────────────────────────────────────────────────────
const FINANCIAL_CHECKLIST_SECTIONS = [
  {
    id: "fc_reporting",
    title: "Reporting & Visibility",
    icon: "📊",
    items: [
      { id: "fc_monthly_accounts", label: "Monthly Management Accounts", question: "Do you receive timely monthly P&L and balance sheet within 15 days of month end?", note: "" },
      { id: "fc_cashflow_report", label: "Cash Flow Reporting", question: "Do you review a cash flow forecast at least monthly?", note: "" },
      { id: "fc_dashboard", label: "Financial Dashboard / KPIs", question: "Do you have a simple financial dashboard with your key metrics reviewed weekly?", note: "" },
      { id: "fc_benchmarks", label: "Industry Benchmarking", question: "Do you benchmark your financial performance against industry peers?", note: "E.g. EBIT margin, revenue per adviser, cost ratios." },
    ]
  },
  {
    id: "fc_planning",
    title: "Planning & Budgeting",
    icon: "📅",
    items: [
      { id: "fc_annual_budget", label: "Annual Budget", question: "Is a formal annual budget prepared and approved before the start of each financial year?", note: "" },
      { id: "fc_forecast", label: "Rolling Forecast", question: "Do you maintain a rolling 12-month financial forecast updated quarterly?", note: "" },
      { id: "fc_scenario", label: "Scenario Planning", question: "Have you modelled best case, base case and worst case financial scenarios?", note: "" },
      { id: "fc_capex", label: "CapEx Planning", question: "Is capital expenditure planned and approved in advance with ROI considered?", note: "" },
    ]
  },
  {
    id: "fc_tax",
    title: "Tax & Compliance",
    icon: "🧾",
    items: [
      { id: "fc_tax_current", label: "Tax Obligations Current", question: "Are all tax lodgements (BAS, IAS, income tax) up to date?", note: "" },
      { id: "fc_tax_planning", label: "Proactive Tax Planning", question: "Are you meeting with your accountant proactively to plan tax (not just post year-end)?", note: "" },
      { id: "fc_super", label: "Superannuation Obligations", question: "Is superannuation paid on time for all employees?", note: "Late super attracts significant penalties." },
      { id: "fc_payroll", label: "Payroll Compliance", question: "Are all employees paid correctly under relevant awards/agreements?", note: "" },
      { id: "fc_fringe", label: "FBT Reviewed", question: "Have fringe benefits tax obligations been reviewed for the current year?", note: "" },
    ]
  },
  {
    id: "fc_banking",
    title: "Banking & Treasury",
    icon: "🏦",
    items: [
      { id: "fc_banking_rel", label: "Banking Relationship", question: "Have you reviewed your banking facilities and interest rates in the last 12 months?", note: "" },
      { id: "fc_cash_reserves", label: "Cash Reserves", question: "Do you maintain at least 3 months of operating expenses in cash reserves?", note: "" },
      { id: "fc_credit_facility", label: "Credit Facility", question: "Do you have an appropriate credit facility for unexpected needs or opportunities?", note: "" },
      { id: "fc_bank_signatories", label: "Bank Signatories Review", question: "Have bank account signatories been reviewed and are they current?", note: "" },
    ]
  },
  {
    id: "fc_controls",
    title: "Internal Controls",
    icon: "🔒",
    items: [
      { id: "fc_segregation", label: "Segregation of Duties", question: "Is there appropriate separation between who authorises, processes and reconciles financial transactions?", note: "" },
      { id: "fc_expense_policy", label: "Expense Policy", question: "Is there a documented and enforced expense approval policy?", note: "" },
      { id: "fc_reconciliations", label: "Bank Reconciliations", question: "Are bank accounts reconciled at least monthly?", note: "" },
      { id: "fc_fraud", label: "Fraud Prevention", question: "Are there controls in place to detect and prevent fraud or unauthorised payments?", note: "" },
    ]
  },
  {
    id: "fc_profitability",
    title: "Profitability & Pricing",
    icon: "📈",
    items: [
      { id: "fc_margins", label: "Margin Analysis", question: "Do you know your profit margin by service line or client segment?", note: "" },
      { id: "fc_pricing_review", label: "Annual Fee / Pricing Review", question: "Are your fees reviewed at least annually against value delivered and market rates?", note: "" },
      { id: "fc_unprofitable", label: "Unprofitable Clients Identified", question: "Have you identified and addressed unprofitable client relationships?", note: "" },
      { id: "fc_debtor_mgmt", label: "Debtor Management", question: "Is your debtor collection process timely with days outstanding monitored?", note: "" },
    ]
  },
];

// ─── Reusable checklist renderer ─────────────────────────────────────────────
function GenericChecklistPage({ business, storageKey, sections, onUpdate, canEdit }) {
  const checklist = business[storageKey] || {};

  function setField(itemId, field, value) {
    onUpdate({ ...business, [storageKey]: { ...checklist, [itemId]: { ...(checklist[itemId] || {}), [field]: value } } });
  }

  function getDateOptions() {
    const opts = [{ value: "", label: "Date assessed..." }];
    const now = new Date();
    for (let y = now.getFullYear(); y >= now.getFullYear() - 4; y--) {
      opts.push({ value: `Q4 ${y}`, label: `Q4 ${y} (Apr–Jun)` });
      opts.push({ value: `Q3 ${y}`, label: `Q3 ${y} (Jan–Mar)` });
      opts.push({ value: `Q2 ${y}`, label: `Q2 ${y} (Oct–Dec)` });
      opts.push({ value: `Q1 ${y}`, label: `Q1 ${y} (Jul–Sep)` });
    }
    return opts;
  }
  const DATE_OPTIONS = getDateOptions();

  const allItems = sections.flatMap(s => s.items);
  const answered = allItems.filter(i => checklist[i.id]?.status).length;
  const complete = allItems.filter(i => checklist[i.id]?.status === "yes" || checklist[i.id]?.status === "na").length;

  return (
    <div className="animate-in">
      <div className="card" style={{ marginBottom: 24 }}>
        <div className="card-body" style={{ padding: "16px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: BRAND.textSub }}>{complete} of {allItems.length} items complete or N/A</span>
            <span style={{ fontSize: 13, color: BRAND.muted }}>{answered} assessed</span>
          </div>
          <div style={{ height: 6, background: BRAND.border, borderRadius: 6, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${allItems.length ? (complete / allItems.length) * 100 : 0}%`, background: "#16a34a", borderRadius: 6, transition: "width 0.4s" }} />
          </div>
        </div>
      </div>

      {sections.map(section => {
        const sectionComplete = section.items.filter(i => checklist[i.id]?.status === "yes" || checklist[i.id]?.status === "na").length;
        return (
          <div key={section.id} className="card" style={{ marginBottom: 20 }}>
            <div className="card-header">
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 18 }}>{section.icon}</span>
                <span className="card-title">{section.title}</span>
              </div>
              <span style={{ fontSize: 12, color: BRAND.muted }}>{sectionComplete}/{section.items.length} complete</span>
            </div>
            <div style={{ padding: "0 24px" }}>
              {section.items.map((item, idx) => {
                const entry = checklist[item.id] || {};
                const statusObj = STATUS_OPTIONS.find(s => s.value === (entry.status || "")) || STATUS_OPTIONS[0];
                return (
                  <div key={item.id} style={{ padding: "16px 0", borderBottom: idx < section.items.length - 1 ? `1px solid ${BRAND.border}` : "none" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 16, alignItems: "start" }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 14, color: BRAND.navy, marginBottom: 2 }}>{item.label}</div>
                        <div style={{ fontSize: 13, color: BRAND.textSub, marginBottom: item.note ? 4 : 0 }}>{item.question}</div>
                        {item.note && <div style={{ fontSize: 12, color: BRAND.muted, fontStyle: "italic" }}>{item.note}</div>}
                        {entry.status && canEdit && (
                          <textarea value={entry.notes || ""} onChange={e => setField(item.id, "notes", e.target.value)} placeholder="Add notes..."
                            style={{ marginTop: 8, width: "100%", background: BRAND.offWhite, border: `1px solid ${BRAND.border}`, borderRadius: 6, padding: "6px 10px", fontSize: 12, color: BRAND.textSub, fontFamily: "'DM Sans', sans-serif", resize: "none", minHeight: 48, outline: "none" }} />
                        )}
                        {entry.status && !canEdit && entry.notes && (
                          <div style={{ marginTop: 6, fontSize: 12, color: BRAND.textSub, background: BRAND.offWhite, borderRadius: 6, padding: "6px 10px" }}>{entry.notes}</div>
                        )}
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
                        {canEdit ? (
                          <select value={entry.status || ""} onChange={e => setField(item.id, "status", e.target.value)}
                            style={{ background: BRAND.white, border: `1px solid ${BRAND.border}`, borderRadius: 6, padding: "6px 10px", fontSize: 12, color: statusObj.color, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", cursor: "pointer", outline: "none", minWidth: 160 }}>
                            {STATUS_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                          </select>
                        ) : (
                          <span style={{ fontSize: 12, fontWeight: 600, color: statusObj.color, background: BRAND.offWhite, borderRadius: 6, padding: "5px 10px", whiteSpace: "nowrap" }}>{statusObj.label}</span>
                        )}
                        {canEdit ? (
                          <select value={entry.assessedDate || ""} onChange={e => setField(item.id, "assessedDate", e.target.value)}
                            style={{ background: BRAND.white, border: `1px solid ${BRAND.border}`, borderRadius: 6, padding: "6px 10px", fontSize: 12, color: entry.assessedDate ? BRAND.textSub : BRAND.muted, fontFamily: "'DM Sans', sans-serif", cursor: "pointer", outline: "none", minWidth: 160 }}>
                            {DATE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                          </select>
                        ) : entry.assessedDate ? (
                          <span style={{ fontSize: 11, color: BRAND.muted }}>Assessed: {entry.assessedDate}</span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── People & HR Checklist ────────────────────────────────────────────────────
const PEOPLE_CHECKLIST_SECTIONS = [
  {
    id: "ph_structure",
    title: "Team Structure & Roles",
    icon: "🏗️",
    items: [
      { id: "ph_org_chart", label: "Organisation Chart", question: "Is there a current, documented org chart showing all roles and reporting lines?", note: "" },
      { id: "ph_role_descriptions", label: "Role Descriptions", question: "Does every team member have a written role description with clear accountabilities?", note: "" },
      { id: "ph_seats", label: "Right Person Right Seat", question: "Have you assessed whether each person is in the right role for their skills and values?", note: "Use the EOS People Analyser or equivalent framework." },
      { id: "ph_capacity", label: "Capacity Planning", question: "Do you have a forward view of staffing needs for the next 12 months?", note: "" },
    ]
  },
  {
    id: "ph_contracts",
    title: "Employment Contracts & Compliance",
    icon: "📋",
    items: [
      { id: "ph_emp_contracts", label: "Employment Contracts Current", question: "Do all employees have a signed, current employment contract reviewed by a lawyer?", note: "" },
      { id: "ph_contractor", label: "Contractor Agreements", question: "Are all contractors / freelancers covered by a signed agreement?", note: "Ensure correct classification — employee vs contractor has significant tax and legal implications." },
      { id: "ph_fair_work", label: "Fair Work Compliance", question: "Are you compliant with Fair Work Act obligations including minimum entitlements and NES?", note: "" },
      { id: "ph_awards", label: "Award / Agreement Coverage", question: "Have you confirmed which Modern Award or Enterprise Agreement covers your employees?", note: "" },
      { id: "ph_leave", label: "Leave Entitlements Tracked", question: "Are all leave balances (annual, sick, LSL) accurately tracked and accrued?", note: "" },
      { id: "ph_whs", label: "WHS / OHS Obligations", question: "Are you meeting all workplace health and safety obligations for your state?", note: "" },
    ]
  },
  {
    id: "ph_onboarding",
    title: "Onboarding & Offboarding",
    icon: "🚪",
    items: [
      { id: "ph_onboarding_process", label: "Onboarding Process", question: "Is there a documented, consistent onboarding process for new team members?", note: "First 90 days matters most — structure it." },
      { id: "ph_induction", label: "Induction Checklist", question: "Do new starters complete a formal induction covering systems, culture, and compliance?", note: "" },
      { id: "ph_offboarding", label: "Offboarding Process", question: "Is there a documented offboarding checklist covering access removal, knowledge transfer and exit interview?", note: "" },
    ]
  },
  {
    id: "ph_performance",
    title: "Performance Management",
    icon: "📈",
    items: [
      { id: "ph_review_cycle", label: "Formal Review Cycle", question: "Is there a consistent, documented performance review process (at minimum annual)?", note: "" },
      { id: "ph_goals_set", label: "Individual Goals Set", question: "Does each team member have documented individual goals aligned to business objectives?", note: "" },
      { id: "ph_pip", label: "Performance Improvement Process", question: "Is there a documented process for managing underperformance?", note: "Ensure this is legally compliant — consult an HR professional." },
      { id: "ph_recognition", label: "Recognition & Rewards", question: "Is there a structured approach to recognising and rewarding high performance?", note: "" },
      { id: "ph_one_on_ones", label: "Regular 1:1s", question: "Are managers conducting regular (at least monthly) 1:1 check-ins with their direct reports?", note: "" },
    ]
  },
  {
    id: "ph_culture",
    title: "Culture & Engagement",
    icon: "🌟",
    items: [
      { id: "ph_values_lived", label: "Values Lived & Communicated", question: "Are the business values actively communicated and reflected in hiring, performance and culture?", note: "" },
      { id: "ph_engagement", label: "Team Engagement Measured", question: "Do you formally measure team engagement (survey, pulse check) at least annually?", note: "" },
      { id: "ph_team_meeting", label: "Regular Team Meetings", question: "Is there a consistent rhythm of team meetings (all-staff, team huddles, etc.)?", note: "" },
      { id: "ph_wellbeing", label: "Wellbeing Support", question: "Is there an EAP or other mental health/wellbeing support available to all staff?", note: "" },
    ]
  },
  {
    id: "ph_development",
    title: "Learning & Development",
    icon: "🎓",
    items: [
      { id: "ph_training_plan", label: "Individual Development Plans", question: "Does each team member have a documented development plan reviewed annually?", note: "" },
      { id: "ph_training_budget", label: "Training Budget", question: "Is there a defined training and development budget?", note: "" },
      { id: "ph_cpd", label: "CPD / Licensing Compliance", question: "Are all licensing and CPD requirements tracked and met for regulated team members?", note: "Critical in financial services — document evidence of completion." },
      { id: "ph_succession_people", label: "Succession Pipeline", question: "Have you identified and are you developing the next layer of leadership?", note: "" },
    ]
  },
];

// ─── Performance Reviews ───────────────────────────────────────────────────────
const REVIEW_RATINGS = [
  { value: "", label: "Not rated" },
  { value: "5", label: "5 — Exceptional" },
  { value: "4", label: "4 — Exceeds expectations" },
  { value: "3", label: "3 — Meets expectations" },
  { value: "2", label: "2 — Below expectations" },
  { value: "1", label: "1 — Unsatisfactory" },
];

const REVIEW_CATEGORIES = [
  { id: "values", label: "Values & Culture Fit", description: "Demonstrates and embodies the business values consistently" },
  { id: "role", label: "Role Performance", description: "Delivers on core role responsibilities to the expected standard" },
  { id: "goals", label: "Goals Achievement", description: "Achieved agreed individual goals for the period" },
  { id: "teamwork", label: "Teamwork & Collaboration", description: "Works effectively with colleagues and contributes to team success" },
  { id: "client", label: "Client Focus", description: "Consistently delivers a great client experience" },
  { id: "initiative", label: "Initiative & Growth", description: "Proactively improves, learns and goes beyond the minimum" },
];

function ratingColor(v) {
  if (v === "5") return "#16a34a";
  if (v === "4") return "#059669";
  if (v === "3") return "#2563eb";
  if (v === "2") return "#d97706";
  if (v === "1") return "#dc2626";
  return BRAND.muted;
}

function getReviewPeriods() {
  // AU FY quarters as review period options
  const opts = [{ value: "", label: "Select period..." }];
  const now = new Date();
  const fyEnd = now.getMonth() >= 6 ? now.getFullYear() + 1 : now.getFullYear();
  for (let fy = fyEnd; fy >= fyEnd - 3; fy--) {
    opts.push({ value: `Annual FY${fy}`, label: `Annual FY${fy} (Jul ${fy-1} – Jun ${fy})` });
    opts.push({ value: `Q4 FY${fy}`, label: `Q4 FY${fy} (Apr–Jun ${fy})` });
    opts.push({ value: `Q3 FY${fy}`, label: `Q3 FY${fy} (Jan–Mar ${fy})` });
    opts.push({ value: `Q2 FY${fy}`, label: `Q2 FY${fy} (Oct–Dec ${fy-1})` });
    opts.push({ value: `Q1 FY${fy}`, label: `Q1 FY${fy} (Jul–Sep ${fy-1})` });
  }
  return opts;
}

function PeoplePage({ business, onUpdate, canEdit }) {
  const people = business.people || [];
  const reviews = business.reviews || {};
  const [view, setView] = useState("list");
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const [draftPerson, setDraftPerson] = useState({ name: "", role: "", reportsTo: "", startDate: "", employmentType: "Full-time", email: "" });
  const [draftReview, setDraftReview] = useState({});
  const [showAddPerson, setShowAddPerson] = useState(false);
  const [editPerson, setEditPerson] = useState(null);
  const PERIODS = getReviewPeriods();

  function savePerson() {
    if (!draftPerson.name.trim()) return;
    if (editPerson) {
      onUpdate({ ...business, people: people.map(p => p.id === editPerson.id ? { ...p, ...draftPerson } : p) });
      setEditPerson(null);
    } else {
      onUpdate({ ...business, people: [...people, { id: uid(), ...draftPerson }] });
    }
    setDraftPerson({ name: "", role: "", reportsTo: "", startDate: "", employmentType: "Full-time", email: "" });
    setShowAddPerson(false);
  }

  function openEdit(person) {
    setEditPerson(person);
    setDraftPerson({ name: person.name, role: person.role || "", reportsTo: person.reportsTo || "", startDate: person.startDate || "", employmentType: person.employmentType || "Full-time", email: person.email || "" });
    setShowAddPerson(true);
  }

  function deletePerson(id) {
    onUpdate({ ...business, people: people.filter(p => p.id !== id) });
    if (selectedPerson?.id === id) { setSelectedPerson(null); setView("list"); }
  }

  function startReview(person) {
    setSelectedPerson(person);
    setDraftReview({ id: uid(), personId: person.id, personName: person.name, period: "", ratings: {}, strengths: "", improvements: "", goals: "", overall: "", reviewer: "" });
    setSelectedReviewId(null);
    setView("review");
  }

  function viewReview(person, reviewId) {
    const r = (reviews[person.id] || []).find(r => r.id === reviewId);
    setSelectedPerson(person);
    setDraftReview({ ...r });
    setSelectedReviewId(reviewId);
    setView("review");
  }

  function saveReview() {
    const personReviews = reviews[selectedPerson.id] || [];
    const updated = selectedReviewId
      ? personReviews.map(r => r.id === selectedReviewId ? { ...draftReview } : r)
      : [...personReviews, { ...draftReview }];
    onUpdate({ ...business, reviews: { ...reviews, [selectedPerson.id]: updated } });
    setView("list"); setSelectedPerson(null); setSelectedReviewId(null);
  }

  function deleteReview(person, reviewId) {
    const updated = (reviews[person.id] || []).filter(r => r.id !== reviewId);
    onUpdate({ ...business, reviews: { ...reviews, [person.id]: updated } });
  }

  function avgRating(personId) {
    const pr = reviews[personId] || [];
    if (!pr.length) return null;
    const last = pr[pr.length - 1];
    const vals = Object.values(last.ratings || {}).map(Number).filter(Boolean);
    return vals.length ? (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1) : null;
  }

  // ── Review form
  if (view === "review") {
    const isExisting = !!selectedReviewId;
    const liveAvg = (() => {
      const vals = Object.values(draftReview.ratings || {}).map(Number).filter(Boolean);
      return vals.length ? (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1) : null;
    })();
    return (
      <div className="animate-in">
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <button className="btn btn-ghost" onClick={() => { setView("list"); setSelectedPerson(null); }}>← Back</button>
          <div>
            <div style={{ fontSize: 20, fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, color: BRAND.navy }}>{isExisting ? "Performance Review" : "New Performance Review"}</div>
            <div style={{ fontSize: 13, color: BRAND.muted }}>{selectedPerson?.name} · {selectedPerson?.role}</div>
          </div>
          {liveAvg && <div style={{ marginLeft: "auto", fontSize: 28, fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, color: ratingColor(String(Math.round(Number(liveAvg)))) }}>{liveAvg} / 5</div>}
        </div>

        <div className="card" style={{ marginBottom: 20 }}>
          <div className="card-header"><span className="card-title">Review Details</span></div>
          <div className="card-body">
            <div className="grid-2">
              <div className="field">
                <label>Review Period</label>
                {canEdit ? (
                  <select className="input" value={draftReview.period || ""} onChange={e => setDraftReview(d => ({ ...d, period: e.target.value }))}>
                    {PERIODS.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                  </select>
                ) : <div style={{ fontSize: 14, fontWeight: 600, color: BRAND.navy }}>{draftReview.period || "—"}</div>}
              </div>
              <div className="field">
                <label>Reviewer</label>
                {canEdit ? <input className="input" value={draftReview.reviewer || ""} onChange={e => setDraftReview(d => ({ ...d, reviewer: e.target.value }))} placeholder="Your name" /> : <div style={{ fontSize: 14, color: BRAND.text }}>{draftReview.reviewer || "—"}</div>}
              </div>
            </div>
          </div>
        </div>

        <div className="card" style={{ marginBottom: 20 }}>
          <div className="card-header"><span className="card-title">Performance Ratings</span></div>
          <div className="card-body">
            {REVIEW_CATEGORIES.map((cat, i) => {
              const rating = draftReview.ratings?.[cat.id] || "";
              return (
                <div key={cat.id} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 16, alignItems: "center", padding: "12px 0", borderBottom: i < REVIEW_CATEGORIES.length - 1 ? `1px solid ${BRAND.border}` : "none" }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, color: BRAND.navy }}>{cat.label}</div>
                    <div style={{ fontSize: 12, color: BRAND.muted }}>{cat.description}</div>
                  </div>
                  {canEdit ? (
                    <select value={rating} onChange={e => setDraftReview(d => ({ ...d, ratings: { ...d.ratings, [cat.id]: e.target.value } }))}
                      style={{ background: BRAND.white, border: `1px solid ${BRAND.border}`, borderRadius: 6, padding: "6px 10px", fontSize: 12, color: rating ? ratingColor(rating) : BRAND.muted, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", cursor: "pointer", outline: "none", minWidth: 190 }}>
                      {REVIEW_RATINGS.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                    </select>
                  ) : (
                    <span style={{ fontSize: 13, fontWeight: 700, color: ratingColor(rating) }}>{REVIEW_RATINGS.find(r => r.value === rating)?.label || "Not rated"}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="card" style={{ marginBottom: 20 }}>
          <div className="card-header"><span className="card-title">Written Feedback</span></div>
          <div className="card-body">
            {[
              { key: "strengths", label: "Key Strengths", placeholder: "What does this person do exceptionally well?" },
              { key: "improvements", label: "Areas for Development", placeholder: "What should this person focus on improving?" },
              { key: "goals", label: "Goals for Next Period", placeholder: "Agreed goals and actions for the coming period..." },
              { key: "overall", label: "Overall Summary", placeholder: "Overall assessment and key messages..." },
            ].map(f => (
              <div key={f.key} className="field">
                <label>{f.label}</label>
                {canEdit
                  ? <textarea className="textarea" value={draftReview[f.key] || ""} onChange={e => setDraftReview(d => ({ ...d, [f.key]: e.target.value }))} placeholder={f.placeholder} style={{ minHeight: 80 }} />
                  : <div style={{ fontSize: 14, color: BRAND.text, lineHeight: 1.6, background: BRAND.offWhite, borderRadius: 6, padding: "10px 12px" }}>{draftReview[f.key] || <span style={{ color: BRAND.muted }}>Not completed</span>}</div>
                }
              </div>
            ))}
          </div>
        </div>

        {canEdit && (
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <button className="btn btn-ghost" onClick={() => { setView("list"); setSelectedPerson(null); }}>Cancel</button>
            <button className="btn btn-primary" onClick={saveReview}>{isExisting ? "Save Changes" : "Save Review"}</button>
          </div>
        )}
      </div>
    );
  }

  // ── Team list view
  return (
    <div className="animate-in">
      <div className="flex-between mb-16">
        <p className="text-muted">{people.length} team member{people.length !== 1 ? "s" : ""} — click a review chip to view it, or + Review to start a new one</p>
        {canEdit && <button className="btn btn-primary" onClick={() => { setEditPerson(null); setDraftPerson({ name: "", role: "", reportsTo: "", startDate: "", employmentType: "Full-time", email: "" }); setShowAddPerson(true); }}>+ Add Person</button>}
      </div>

      {people.length === 0
        ? <div className="empty-state"><div className="empty-state-icon">👥</div><div className="empty-state-title">No team members yet</div><p>Add your first team member to get started. They'll also appear in the Org Chart.</p></div>
        : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {people.map(person => {
              const personReviews = (reviews[person.id] || []).slice().sort((a, b) => {
                // Sort by FY descending, then Q descending
                const pa = a.period || ""; const pb = b.period || "";
                return pb.localeCompare(pa);
              });
              const avg = avgRating(person.id);
              return (
                <div key={person.id} className="card">
                  <div style={{ padding: "16px 24px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 16, alignItems: "start" }}>
                      <div style={{ width: 44, height: 44, borderRadius: "50%", background: BRAND.navy, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 700, flexShrink: 0, marginTop: 2 }}>
                        {initials(person.name)}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 15, color: BRAND.navy }}>{person.name}</div>
                        <div style={{ fontSize: 13, color: BRAND.muted, marginTop: 2 }}>
                          {person.role}{person.reportsTo ? ` · Reports to: ${person.reportsTo}` : ""}{person.employmentType ? ` · ${person.employmentType}` : ""}{person.startDate ? ` · Started ${person.startDate}` : ""}
                        </div>
                        {person.email && <div style={{ fontSize: 12, color: BRAND.muted }}>{person.email}</div>}
                        {/* Review period chips — grouped by FY */}
                        {personReviews.length > 0 && (
                          <div style={{ marginTop: 10 }}>
                            <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: BRAND.muted, marginBottom: 6 }}>Reviews</div>
                            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                              {personReviews.map(r => {
                                const vals = Object.values(r.ratings || {}).map(Number).filter(Boolean);
                                const ravg = vals.length ? (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1) : null;
                                const col = ravg ? ratingColor(String(Math.round(Number(ravg)))) : BRAND.muted;
                                return (
                                  <div key={r.id} style={{ display: "flex", alignItems: "center", gap: 0 }}>
                                    <button onClick={() => viewReview(person, r.id)}
                                      style={{ background: BRAND.offWhite, border: `1px solid ${BRAND.border}`, borderRight: "none", borderRadius: "6px 0 0 6px", padding: "4px 10px", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", color: BRAND.textSub }}>
                                      {r.period || "No period"}
                                    </button>
                                    {ravg && <span style={{ background: col + "18", border: `1px solid ${col}40`, borderRadius: "0 6px 6px 0", padding: "4px 7px", fontSize: 11, fontWeight: 700, color: col }}>{ravg}★</span>}
                                    {!ravg && <span style={{ background: BRAND.offWhite, border: `1px solid ${BRAND.border}`, borderRadius: "0 6px 6px 0", padding: "4px 7px", fontSize: 11, color: BRAND.muted }}>—</span>}
                                    {canEdit && <button onClick={() => deleteReview(person, r.id)} style={{ background: "none", border: "none", color: BRAND.muted, cursor: "pointer", fontSize: 13, padding: "0 0 0 4px", lineHeight: 1 }}>×</button>}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        {avg && <span style={{ fontSize: 20, fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, color: ratingColor(String(Math.round(Number(avg)))) }}>{avg}★</span>}
                        {canEdit && <button className="btn btn-ghost btn-sm" onClick={() => openEdit(person)}>Edit</button>}
                        {canEdit && <button className="btn btn-primary btn-sm" onClick={() => startReview(person)}>+ Review</button>}
                        {canEdit && <button className="btn btn-danger btn-sm" onClick={() => deletePerson(person.id)}>✕</button>}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      {showAddPerson && (
        <Modal title={editPerson ? "Edit Team Member" : "Add Team Member"} onClose={() => { setShowAddPerson(false); setEditPerson(null); }}
          footer={<><button className="btn btn-ghost" onClick={() => { setShowAddPerson(false); setEditPerson(null); }}>Cancel</button><button className="btn btn-primary" onClick={savePerson}>{editPerson ? "Save" : "Add"}</button></>}>
          <div className="field"><label>Full Name</label><input className="input" value={draftPerson.name} onChange={e => setDraftPerson(d => ({ ...d, name: e.target.value }))} placeholder="Jane Smith" /></div>
          <div className="field"><label>Role / Title</label><input className="input" value={draftPerson.role} onChange={e => setDraftPerson(d => ({ ...d, role: e.target.value }))} placeholder="e.g. Financial Planner" /></div>
          <div className="field">
            <label>Reports To</label>
            <select className="input" value={draftPerson.reportsTo} onChange={e => setDraftPerson(d => ({ ...d, reportsTo: e.target.value }))}>
              <option value="">— No direct report (top of chart) —</option>
              {(people || []).filter(p => p && p.id && (!editPerson || p.id !== editPerson.id)).map(p => <option key={p.id} value={p.name}>{p.name}{p.role ? ` (${p.role})` : ""}</option>)}
            </select>
          </div>
          <div className="grid-2">
            <div className="field">
              <label>Employment Type</label>
              <select className="input" value={draftPerson.employmentType} onChange={e => setDraftPerson(d => ({ ...d, employmentType: e.target.value }))}>
                <option>Full-time</option><option>Part-time</option><option>Casual</option><option>Contractor</option>
              </select>
            </div>
            <div className="field"><label>Start Date</label><input className="input" type="month" value={draftPerson.startDate} onChange={e => setDraftPerson(d => ({ ...d, startDate: e.target.value }))} /></div>
          </div>
          <div className="field"><label>Email</label><input className="input" value={draftPerson.email} onChange={e => setDraftPerson(d => ({ ...d, email: e.target.value }))} placeholder="jane@company.com.au" /></div>
        </Modal>
      )}
    </div>
  );
}

// ─── Org Chart ────────────────────────────────────────────────────────────────
function OrgChartPage({ business, onUpdate, canEdit }) {
  const people = business.people || [];
  const reviews = business.reviews || {};
  const [hoveredId, setHoveredId] = useState(null);

  // Build tree from people reportsTo relationships
  function buildTree() {
    const roots = [];
    const map = {};
    people.filter(p => p && p.name).forEach(p => { map[p.name] = { ...p, children: [] }; });
    people.filter(p => p && p.name).forEach(p => {
      if (p.reportsTo && map[p.reportsTo]) {
        map[p.reportsTo].children.push(map[p.name]);
      } else {
        roots.push(map[p.name]);
      }
    });
    return roots;
  }

  function avgRating(personId) {
    const pr = reviews[personId] || [];
    if (!pr.length) return null;
    const last = pr[pr.length - 1];
    const vals = Object.values(last.ratings || {}).map(Number).filter(Boolean);
    return vals.length ? (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1) : null;
  }

  function latestReviewPeriod(personId) {
    const pr = (reviews[personId] || []).slice().sort((a, b) => (b.period || "").localeCompare(a.period || ""));
    return pr[0]?.period || null;
  }

  const tree = buildTree();

  // Recursive SVG node layouter
  const NODE_W = 160, NODE_H = 72, H_GAP = 24, V_GAP = 60;

  function measureTree(node) {
    if (!node.children || node.children.length === 0) return NODE_W;
    const childWidths = node.children.map(measureTree);
    const totalChildW = childWidths.reduce((a, b) => a + b, 0) + H_GAP * (node.children.length - 1);
    return Math.max(NODE_W, totalChildW);
  }

  function layoutTree(node, x, y, width) {
    const cx = x + width / 2;
    const result = [{ ...node, cx, cy: y }];
    if (!node.children || node.children.length === 0) return result;
    const childWidths = node.children.map(measureTree);
    const totalW = childWidths.reduce((a, b) => a + b, 0) + H_GAP * (node.children.length - 1);
    let childX = cx - totalW / 2;
    node.children.forEach((child, i) => {
      const cw = childWidths[i];
      result.push(...layoutTree(child, childX, y + NODE_H + V_GAP, cw));
      childX += cw + H_GAP;
    });
    return result;
  }

  // Layout all roots side by side
  const rootWidths = tree.map(measureTree);
  const totalRootW = rootWidths.reduce((a, b) => a + b, 0) + H_GAP * Math.max(0, tree.length - 1);
  const SVG_W = Math.max(900, totalRootW + 80);

  let allNodes = [];
  let rx = 40;
  tree.forEach((root, i) => {
    allNodes.push(...layoutTree(root, rx, 40, rootWidths[i]));
    rx += rootWidths[i] + H_GAP;
  });

  // Find max depth for SVG height
  const maxY = allNodes.reduce((m, n) => Math.max(m, n.cy), 0);
  const SVG_H = maxY + NODE_H + 40;

  // Build edges
  const edges = [];
  allNodes.forEach(node => {
    if (node.reportsTo) {
      const parent = allNodes.find(n => n.name === node.reportsTo);
      if (parent) {
        edges.push({ x1: parent.cx, y1: parent.cy + NODE_H, x2: node.cx, y2: node.cy });
      }
    }
  });

  return (
    <div className="animate-in">
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20, gap: 16, flexWrap: "wrap" }}>
        <p className="text-muted">
          {people.length === 0
            ? "Add team members in Performance Reviews and set their 'Reports To' to build the chart automatically."
            : `${people.length} people · Set reporting lines in Performance Reviews to arrange the chart`}
        </p>
        <div style={{ display: "flex", gap: 16, fontSize: 12, color: BRAND.muted, alignItems: "center" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}><span style={{ width: 10, height: 10, borderRadius: 2, background: "#16a34a", display: "inline-block" }} /> Last review ≥ 4.0</span>
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}><span style={{ width: 10, height: 10, borderRadius: 2, background: "#2563eb", display: "inline-block" }} /> Last review ≥ 3.0</span>
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}><span style={{ width: 10, height: 10, borderRadius: 2, background: "#d97706", display: "inline-block" }} /> Last review &lt; 3.0</span>
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}><span style={{ width: 10, height: 10, borderRadius: 2, background: BRAND.navyLight, border: `1px solid ${BRAND.border}`, display: "inline-block" }} /> No review</span>
        </div>
      </div>

      {people.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🏢</div>
          <div className="empty-state-title">No team members yet</div>
          <p>Go to Performance Reviews to add team members. Once added, they'll appear here automatically.</p>
        </div>
      ) : (
        <div className="card" style={{ overflowX: "auto" }}>
          <div className="card-body" style={{ padding: 0 }}>
            <svg width="100%" viewBox={`0 0 ${SVG_W} ${SVG_H}`} style={{ display: "block", minWidth: SVG_W }}>
              {/* Edges */}
              {edges.map((e, i) => {
                const midY = (e.y1 + e.y2) / 2;
                return (
                  <path key={i}
                    d={`M${e.x1},${e.y1} C${e.x1},${midY} ${e.x2},${midY} ${e.x2},${e.y2}`}
                    fill="none" stroke={BRAND.border} strokeWidth="1.5" />
                );
              })}

              {/* Nodes */}
              {allNodes.map(node => {
                const avg = avgRating(node.id);
                const avgNum = avg ? Number(avg) : null;
                const period = latestReviewPeriod(node.id);
                const isHovered = hoveredId === node.id;

                let accentColor = BRAND.border;
                if (avgNum !== null) {
                  if (avgNum >= 4) accentColor = "#16a34a";
                  else if (avgNum >= 3) accentColor = "#2563eb";
                  else accentColor = "#d97706";
                }

                const x = node.cx - NODE_W / 2;
                const y = node.cy;

                return (
                  <g key={node.id} onMouseEnter={() => setHoveredId(node.id)} onMouseLeave={() => setHoveredId(null)}
                    style={{ cursor: "default" }}>
                    {/* Card shadow */}
                    <rect x={x + 2} y={y + 2} width={NODE_W} height={NODE_H} rx="8" fill="rgba(0,0,0,0.06)" />
                    {/* Card bg */}
                    <rect x={x} y={y} width={NODE_W} height={NODE_H} rx="8" fill={isHovered ? "#f8f9fc" : BRAND.white} stroke={isHovered ? BRAND.navy : BRAND.border} strokeWidth={isHovered ? "1.5" : "1"} />
                    {/* Left accent bar */}
                    <rect x={x} y={y} width="4" height={NODE_H} rx="4" fill={accentColor} />
                    {/* Avatar circle */}
                    <circle cx={x + 24} cy={y + NODE_H / 2} r="14" fill={BRAND.navy} />
                    <text x={x + 24} y={y + NODE_H / 2 + 5} textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff" fontFamily="DM Sans, sans-serif">{initials(node.name)}</text>
                    {/* Name */}
                    <text x={x + 44} y={y + 22} fontSize="12" fontWeight="600" fill={BRAND.navy} fontFamily="DM Sans, sans-serif">
                      {node.name.length > 18 ? node.name.slice(0, 16) + "…" : node.name}
                    </text>
                    {/* Role */}
                    <text x={x + 44} y={y + 37} fontSize="10" fill={BRAND.muted} fontFamily="DM Sans, sans-serif">
                      {(node.role || "No role").length > 20 ? (node.role || "No role").slice(0, 18) + "…" : (node.role || "No role")}
                    </text>
                    {/* Employment type pill */}
                    <text x={x + 44} y={y + 52} fontSize="9" fill={BRAND.muted} fontFamily="DM Sans, sans-serif">
                      {node.employmentType || ""}
                    </text>
                    {/* Rating badge */}
                    {avg && (
                      <g>
                        <rect x={x + NODE_W - 38} y={y + 8} width={30} height={16} rx="4" fill={accentColor + "20"} stroke={accentColor + "60"} strokeWidth="1" />
                        <text x={x + NODE_W - 23} y={y + 20} textAnchor="middle" fontSize="9" fontWeight="700" fill={accentColor} fontFamily="DM Sans, sans-serif">{avg}★</text>
                      </g>
                    )}
                    {/* Hover tooltip: period */}
                    {isHovered && period && (
                      <g>
                        <rect x={x} y={y + NODE_H + 4} width={NODE_W} height={18} rx="4" fill={BRAND.navyLight} stroke={BRAND.border} strokeWidth="1" />
                        <text x={node.cx} y={y + NODE_H + 16} textAnchor="middle" fontSize="9" fill={BRAND.textSub} fontFamily="DM Sans, sans-serif">Last: {period}</text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      )}

      {/* People detail table below chart */}
      {people.length > 0 && (
        <div className="card" style={{ marginTop: 20 }}>
          <div className="card-header"><span className="card-title">Team Directory</span></div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr>
                  {["Name", "Role", "Reports To", "Type", "Start Date", "Email", "Last Review", "Rating"].map(h => (
                    <th key={h} style={{ textAlign: "left", padding: "8px 16px", color: BRAND.muted, fontWeight: 600, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", borderBottom: `1px solid ${BRAND.border}`, whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {people.map((p, i) => {
                  const avg = avgRating(p.id);
                  const period = latestReviewPeriod(p.id);
                  return (
                    <tr key={p.id} style={{ background: i % 2 === 0 ? BRAND.white : BRAND.offWhite }}>
                      <td style={{ padding: "10px 16px", fontWeight: 600, color: BRAND.navy }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div style={{ width: 28, height: 28, borderRadius: "50%", background: BRAND.navy, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, flexShrink: 0 }}>{initials(p.name)}</div>
                          {p.name}
                        </div>
                      </td>
                      <td style={{ padding: "10px 16px", color: BRAND.textSub }}>{p.role || "—"}</td>
                      <td style={{ padding: "10px 16px", color: BRAND.textSub }}>{p.reportsTo || <span style={{ color: BRAND.muted, fontStyle: "italic" }}>Top level</span>}</td>
                      <td style={{ padding: "10px 16px", color: BRAND.muted }}>{p.employmentType || "—"}</td>
                      <td style={{ padding: "10px 16px", color: BRAND.muted }}>{p.startDate || "—"}</td>
                      <td style={{ padding: "10px 16px", color: BRAND.muted }}>{p.email || "—"}</td>
                      <td style={{ padding: "10px 16px", color: BRAND.textSub }}>{period || <span style={{ color: BRAND.muted }}>None</span>}</td>
                      <td style={{ padding: "10px 16px" }}>
                        {avg ? <span style={{ fontWeight: 700, color: ratingColor(String(Math.round(Number(avg)))) }}>{avg}★</span> : <span style={{ color: BRAND.muted }}>—</span>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}


// ─── App Shell ────────────────────────────────────────────────────────────────
const NAV = [
  { id: "dashboard", label: "Dashboard", icon: "⊞", section: "Overview" },
  { id: "vto", label: "Vision / Traction", icon: "🗺", section: "Business Plan" },
  { id: "rocks", label: "Rocks", icon: "🪨" },
  { id: "issues", label: "Issues List", icon: "⚡" },
  { id: "marketing", label: "Marketing Strategy", icon: "📣" },
  { id: "checklist", label: "Business Checklist", icon: "✅", section: "Checklists" },
  { id: "risk", label: "Risk Management", icon: "🛡" },
  { id: "financial_checklist", label: "Financial Checklist", icon: "💳" },
  { id: "people_checklist", label: "People & HR", icon: "👥" },
  { id: "financials", label: "Financial Data", icon: "📊", section: "Performance" },
  { id: "performance", label: "Performance Reviews", icon: "⭐" },
  { id: "org_chart", label: "Org Chart", icon: "🏢" },
];

export default function App() {
  const [user, setUser] = useState(null);
  const [businesses, setBusinesses] = useState(loadBusinesses);
  const [activeBizId, setActiveBizId] = useState(null);
  const [page, setPage] = useState("dashboard");

  useEffect(() => { saveBusinesses(businesses); }, [businesses]);

  function handleLogin(u) {
    setUser(u);
    if (u.businessId) {
      setActiveBizId(u.businessId);
    } else {
      setActiveBizId(Object.keys(businesses)[0]);
    }
    setPage("dashboard");
  }

  function handleLogout() { setUser(null); setActiveBizId(null); }

  function updateBusiness(updated) {
    setBusinesses(prev => ({ ...prev, [updated.id]: updated }));
  }

  if (!user) return (
    <>
      <style>{styles}</style>
      <Login onLogin={handleLogin} />
    </>
  );

  const business = businesses[activeBizId];
  const canEdit = user.role === "coach" || user.role === "owner";

  const pageTitle = {
    dashboard: "Dashboard",
    vto: "Vision / Traction Organizer",
    rocks: "Quarterly Rocks",
    issues: "Issues List",
    marketing: "Marketing Strategy",
    checklist: "Business Management Checklist",
    risk: "Risk Management Checklist",
    financial_checklist: "Financial Checklist",
    financials: "Financial Data",
    people_checklist: "People & HR Checklist",
    performance: "Performance Reviews",
    org_chart: "Org Chart",
  }[page];

  const pageSub = {
    dashboard: business?.name,
    vto: "Your long-term vision and near-term traction plan",
    rocks: `${(business?.rocks || []).length} rocks this quarter`,
    issues: `${(business?.issues || []).length} open issues`,
    marketing: "Target market, differentiators, process & guarantee",
    checklist: "Key governance, succession and operational questions",
    risk: "Identify and assess key business risks",
    financial_checklist: "Reporting, planning, tax, banking and internal controls",
    financials: "Quarterly P&L — Australian Financial Year",
    people_checklist: "Structure, contracts, onboarding, performance and culture",
    performance: `${(business?.people || []).length} team member${(business?.people || []).length !== 1 ? "s" : ""}`,
    org_chart: "Reporting structure, team directory & review status",
  }[page];

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <aside className="sidebar">
          <div className="sidebar-logo">
            <span>The Wealth Network</span>
            <h1>Business Intelligence</h1>
          </div>

          {user.role === "coach" && (
            <div className="client-selector">
              <label>Client</label>
              <select value={activeBizId} onChange={e => setActiveBizId(e.target.value)}>
                {Object.values(businesses).map(b => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
            </div>
          )}

          <nav className="sidebar-nav">
            {NAV.map(n => (
              <div key={n.id}>
                {n.section && <div className="nav-section">{n.section}</div>}
                <div className={`nav-item ${page === n.id ? "active" : ""}`} onClick={() => setPage(n.id)}>
                  <span className="nav-icon">{n.icon}</span>
                  {n.label}
                </div>
              </div>
            ))}
          </nav>

          <div className="sidebar-footer">
            <div className="user-pill">
              <div className="avatar">{initials(user.name)}</div>
              <div className="user-info">
                <div className="user-name">{user.name}</div>
                <div className="user-role">{user.role}</div>
              </div>
              <button className="logout-btn" onClick={handleLogout} title="Sign out">⇥</button>
            </div>
          </div>
        </aside>

        <main className="main">
          <div className="topbar">
            <div>
              <div className="topbar-title">{pageTitle}</div>
              <div className="topbar-subtitle">{pageSub}</div>
            </div>
            <div className="topbar-actions">
              {business && <span className="tag">{business.name}</span>}
            </div>
          </div>

          <div className="content">
            {!business
              ? <div className="empty-state"><p>Select a client to get started.</p></div>
              : page === "dashboard" ? <Dashboard business={business} />
              : page === "vto" ? <VTOPage business={business} onUpdate={updateBusiness} canEdit={canEdit} />
              : page === "rocks" ? <RocksPage business={business} onUpdate={updateBusiness} canEdit={canEdit} />
              : page === "issues" ? <IssuesPage business={business} onUpdate={updateBusiness} canEdit={canEdit} />
              : page === "marketing" ? <MarketingPage business={business} onUpdate={updateBusiness} canEdit={canEdit} />
              : page === "checklist" ? <ChecklistPage business={business} onUpdate={updateBusiness} canEdit={canEdit} />
              : page === "risk" ? <GenericChecklistPage business={business} storageKey="risk" sections={RISK_SECTIONS} onUpdate={updateBusiness} canEdit={canEdit} />
              : page === "financial_checklist" ? <GenericChecklistPage business={business} storageKey="financial_checklist" sections={FINANCIAL_CHECKLIST_SECTIONS} onUpdate={updateBusiness} canEdit={canEdit} />
              : page === "financials" ? <FinancialsPage business={business} onUpdate={updateBusiness} canEdit={canEdit} />
              : page === "people_checklist" ? <GenericChecklistPage business={business} storageKey="people_checklist" sections={PEOPLE_CHECKLIST_SECTIONS} onUpdate={updateBusiness} canEdit={canEdit} />
              : page === "performance" ? <PeoplePage business={business} onUpdate={updateBusiness} canEdit={canEdit} />
              : page === "org_chart" ? <OrgChartPage business={business} onUpdate={updateBusiness} canEdit={canEdit} />
              : null
            }
          </div>
        </main>
      </div>
    </>
  );
}
