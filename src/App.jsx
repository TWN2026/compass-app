import { useState, useEffect, useRef, useCallback } from "react";

const uid = () => Math.random().toString(36).slice(2, 9);
const initials = n => n.split(" ").map(w => w[0]).join("").toUpperCase().slice(0,2);
const avatarColor = n => { const c=["#7a9e7e","#c9a84c","#c25b3f","#4a90d9","#7c6fcd","#e07b54","#5ba4a4"]; let h=0; for(const ch of n) h=(h*31+ch.charCodeAt(0))%c.length; return c[h]; };
const today = () => new Date().toISOString().split("T")[0];


// ─── AI ───────────────────────────────────────────────────────────────────────
async function aiGenerate(prompt) {
  try {
    const r = await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,messages:[{role:"user",content:prompt}]})});
    const d = await r.json();
    return d.content?.[0]?.text || "Could not generate.";
  } catch { return "Error contacting AI. Please try again."; }
}

// ─── CSS ──────────────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --ink:#1a1f36;--paper:#f0f2f8;--cream:#e4e8f4;--gold:#5af47e;--gold-l:#a8f7bc;--gold-d:#2ec455;
  --sage:#5af47e;--rust:#e05252;--slate:#6b7a99;--mist:#d0d5e8;--white:#ffffff;
  --navy:#272b47;--charcoal:#1e2240;--offwhite:#f5f7fc;--dark:#26304b;--darkest:#1a1f3a;
  --sh:rgba(26,31,54,0.12);--blue:#4d6ef5;--pur:#6b5fce;
}
body{font-family:'Inter',sans-serif;background:var(--paper);color:var(--ink);font-size:14px}

/* LOGIN */
.login{min-height:100vh;display:grid;grid-template-columns:1.15fr 1fr}
.ll{background:var(--darkest);display:flex;flex-direction:column;justify-content:center;align-items:flex-start;padding:72px 68px;position:relative;overflow:hidden}
.ll::before{content:'';position:absolute;inset:0;background:linear-gradient(150deg,#1a1f3a 0%,#222847 60%,#1e2240 100%)}
.ll::after{content:'';position:absolute;bottom:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent 0%,rgba(90,244,126,.7) 40%,rgba(90,244,126,.7) 60%,transparent 100%)}
.ll-geo{position:absolute;top:-100px;right:-100px;width:480px;height:480px;border:1px solid rgba(90,244,126,.07);border-radius:50%;pointer-events:none}
.ll-geo2{position:absolute;top:-40px;right:-40px;width:320px;height:320px;border:1px solid rgba(90,244,126,.05);border-radius:50%;pointer-events:none}
.ll-geo3{position:absolute;bottom:40px;left:-80px;width:240px;height:240px;border:1px solid rgba(90,244,126,.04);border-radius:50%;pointer-events:none}
.ll-rule{width:36px;height:2px;background:var(--gold);margin-bottom:32px;position:relative;z-index:1;border-radius:1px}
.logo{font-family:'Inter',sans-serif;font-size:11px;font-weight:700;color:rgba(255,255,255,.45);letter-spacing:4px;text-transform:uppercase;position:relative;z-index:1;line-height:1;margin-bottom:18px}
.logo-name{font-family:'Inter',sans-serif;font-size:34px;font-weight:800;color:var(--white);letter-spacing:-.5px;position:relative;z-index:1;line-height:1.2}
.logo-name span{color:var(--gold)}
.logo-sub{font-size:10px;color:rgba(255,255,255,.35);letter-spacing:2px;text-transform:uppercase;margin-top:18px;position:relative;z-index:1;font-weight:500}
.logo-loc{font-size:9px;color:rgba(90,244,126,.55);letter-spacing:1.5px;text-transform:uppercase;margin-top:8px;position:relative;z-index:1;font-weight:500}
.logo-ver{position:absolute;bottom:26px;left:68px;font-size:9px;color:rgba(255,255,255,.18);letter-spacing:2px;text-transform:uppercase;z-index:1;font-family:'Inter',sans-serif}
.lr{background:var(--offwhite);display:flex;align-items:center;justify-content:center;padding:64px;border-left:1px solid rgba(90,244,126,.08)}
.lf{width:100%;max-width:350px}
.lf h2{font-family:'Playfair Display',serif;font-size:28px;font-weight:700;margin-bottom:6px;color:var(--ink)}
.lf>p{color:var(--slate);font-size:12.5px;margin-bottom:28px;line-height:1.5}
.fi{margin-bottom:15px}
.fi label{display:block;font-size:9px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:var(--slate);margin-bottom:6px}
.fi input{width:100%;padding:11px 13px;border:1.5px solid var(--mist);border-radius:5px;font-family:'Inter',sans-serif;font-size:13.5px;background:var(--white);color:var(--ink);transition:border-color .2s,box-shadow .2s}
.fi input:focus{outline:none;border-color:var(--gold);box-shadow:0 0 0 3px rgba(90,244,126,.12)}
.btn-login{width:100%;padding:12px;background:var(--navy);color:var(--gold);border:none;border-radius:5px;font-family:'Inter',sans-serif;font-size:13px;font-weight:700;cursor:pointer;margin-top:4px;transition:all .2s;letter-spacing:.4px}
.btn-login:hover{background:var(--dark);box-shadow:0 4px 18px rgba(26,31,54,.3)}
.hint{margin-top:18px;padding:12px 14px;background:var(--cream);border-radius:5px;border:1px solid rgba(90,244,126,.15);font-size:11px;color:var(--slate);line-height:1.9}
.hint strong{color:var(--ink)}
.err{color:var(--rust);font-size:12px;margin-top:6px}

/* SHELL */
.app{display:flex;min-height:100vh}
.sb{width:252px;min-height:100vh;background:var(--darkest);display:flex;flex-direction:column;position:fixed;left:0;top:0;bottom:0;z-index:100;overflow-y:auto;border-right:1px solid rgba(90,244,126,.07)}
.sb-brand{padding:22px 20px 16px;border-bottom:1px solid rgba(90,244,126,.07)}
.sb-logo{font-family:'Inter',sans-serif;font-size:10px;font-weight:700;color:rgba(255,255,255,.35);letter-spacing:3px;text-transform:uppercase}
.sb-name{font-family:'Inter',sans-serif;font-size:15px;font-weight:800;color:var(--white);margin-top:4px;line-height:1.3}
.sb-name span{color:var(--gold)}
.sb-sub{font-size:8.5px;color:rgba(90,244,126,.4);letter-spacing:2px;text-transform:uppercase;margin-top:5px}
.sb-user{padding:12px 20px;border-bottom:1px solid rgba(255,255,255,.07)}
.sb-uname{font-size:12.5px;font-weight:600;color:var(--white)}
.sb-urole{font-size:10px;color:rgba(255,255,255,.3);margin-top:1px}
.sb-nav{flex:1;padding:8px 0}
.ns{padding:12px 20px 4px;font-size:9px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.18)}
.ni{display:flex;align-items:center;gap:10px;padding:10px 20px;cursor:pointer;transition:background .15s;color:rgba(255,255,255,.42);font-size:13px;border-left:2px solid transparent;user-select:none}
.ni:hover{background:rgba(255,255,255,.04);color:rgba(255,255,255,.8)}
.ni.on{background:rgba(90,244,126,.08);color:var(--gold);border-left-color:var(--gold)}
.sb-footer{padding:12px 20px;border-top:1px solid rgba(255,255,255,.07)}
.lout{display:flex;align-items:center;gap:8px;color:rgba(255,255,255,.28);font-size:12px;cursor:pointer;background:none;border:none;font-family:'Inter',sans-serif;transition:color .15s;width:100%;text-align:left}
.lout:hover{color:var(--gold)}

/* MAIN */
.main{margin-left:252px;flex:1;min-height:100vh;display:flex;flex-direction:column}
.topbar{background:var(--white);border-bottom:1px solid rgba(90,244,126,.12);padding:16px 32px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:50}
.pt{font-family:'Playfair Display',serif;font-size:24px;font-weight:700;color:var(--ink)}
.ps{font-size:11px;color:var(--slate);margin-top:1px}
.content{padding:28px 32px;flex:1}

/* CARDS */
.card{background:var(--white);border-radius:6px;border:1px solid var(--mist);padding:22px;margin-bottom:16px}
.ch{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;padding-bottom:12px;border-bottom:1px solid var(--mist)}
.ct{font-family:'Playfair Display',serif;font-size:16px;font-weight:700}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px}
.g4{display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:14px}

/* STAT */
.sc{background:var(--white);border:1px solid var(--mist);border-radius:10px;padding:16px}
.sl{font-size:9px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:var(--slate)}
.sv{font-family:'Playfair Display',serif;font-size:30px;font-weight:700;color:var(--ink);margin-top:4px;line-height:1}
.sn{font-size:11px;color:var(--slate);margin-top:3px}

/* BADGE */
.bdg{padding:2px 8px;border-radius:20px;font-size:9px;font-weight:700;letter-spacing:.6px;text-transform:uppercase;display:inline-block}
.bg{background:rgba(107,158,114,.14);color:var(--sage)}
.br{background:rgba(187,77,56,.14);color:var(--rust)}
.bb{background:rgba(61,122,181,.14);color:var(--blue)}
.bgold{background:rgba(90,244,126,.14);color:var(--gold)}
.bsl{background:rgba(79,90,106,.1);color:var(--slate)}

/* FORM */
.fg{margin-bottom:14px}
.fg label{display:block;font-size:10px;font-weight:600;letter-spacing:.8px;text-transform:uppercase;color:var(--slate);margin-bottom:4px}
.fg input,.fg textarea,.fg select{width:100%;padding:9px 12px;border:1.5px solid var(--mist);border-radius:7px;font-family:'Inter',sans-serif;font-size:13px;background:var(--white);color:var(--ink);transition:border-color .2s}
.fg input:focus,.fg textarea:focus,.fg select:focus{outline:none;border-color:var(--gold);box-shadow:0 0 0 3px rgba(90,244,126,.1)}
.fg textarea{resize:vertical;min-height:64px;font-family:'Inter',sans-serif}
.btn{padding:8px 16px;border-radius:5px;font-family:'Inter',sans-serif;font-size:13px;font-weight:600;cursor:pointer;border:none;transition:all .15s;display:inline-flex;align-items:center;gap:6px}
.btn-sm{padding:5px 12px;font-size:11px}
.btn-xs{padding:3px 9px;font-size:10px;font-weight:700}
.bdk{background:var(--navy);color:var(--gold)}
.bdk:hover{background:var(--dark)}
.bol{background:transparent;border:1.5px solid var(--mist);color:var(--slate)}
.bol:hover{border-color:var(--ink);color:var(--ink)}
.bsage{background:var(--sage);color:white}
.bsage:hover{background:#5a8e61}
.brust{background:var(--rust);color:white}

/* ROCKS */
.ri{display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid var(--mist)}
.ri:last-child{border-bottom:none}
.rd{width:8px;height:8px;border-radius:50%;flex-shrink:0}
.don{background:var(--sage)}
.doff{background:var(--rust)}
.rin{flex:1}
.rt{font-size:13px;font-weight:500}
.rm{font-size:11px;color:var(--slate);margin-top:2px}
.pb{height:4px;background:var(--mist);border-radius:2px;margin-top:6px}
.pf{height:100%;border-radius:2px;background:var(--sage)}
.pf.off{background:var(--rust)}

/* ISSUES */
.ii{display:flex;align-items:flex-start;gap:10px;padding:10px 0;border-bottom:1px solid var(--mist)}
.ii:last-child{border-bottom:none}
.ibar{width:3px;border-radius:2px;align-self:stretch;flex-shrink:0}
.hip{background:var(--rust)}
.mip{background:var(--gold)}
.lip{background:var(--sage)}

/* TODOS */
.tdi{display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid var(--mist);cursor:pointer}
.tdi:last-child{border-bottom:none}
.tck{width:17px;height:17px;border-radius:50%;border:2px solid var(--mist);display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .2s;font-size:9px}
.tck.dn{background:var(--sage);border-color:var(--sage);color:white}

/* SCORECARD */
.sct{width:100%;border-collapse:collapse}
.sct th{text-align:left;padding:8px 10px;font-size:9px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:var(--slate);border-bottom:2px solid var(--mist);white-space:nowrap}
.sct td{padding:10px 10px;border-bottom:1px solid var(--mist);font-size:12px;vertical-align:middle}
.sct tr:last-child td{border-bottom:none}
.wkc{width:52px;height:28px;border-radius:5px;display:inline-flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;transition:all .2s}
.met{background:rgba(107,158,114,.15);color:#3d7a44}
.mss{background:rgba(187,77,56,.15);color:var(--rust)}
.mna{background:transparent;color:var(--slate)}

/* SPARKLINE */
.spark{display:flex;align-items:flex-end;gap:2px;height:24px}
.sb2{width:6px;border-radius:1px 1px 0 0;background:var(--mist);transition:height .3s}

/* AVATAR */
.av{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:white;flex-shrink:0}
.av-lg{width:36px;height:36px;font-size:12px}

/* VTO */
.vs{margin-bottom:20px}
.vl{font-size:9px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--slate);margin-bottom:6px}
.vv{font-size:13px;color:var(--ink);line-height:1.6}
.vp{display:inline-block;padding:3px 10px;border-radius:20px;background:var(--cream);border:1px solid var(--mist);font-size:11px;font-weight:500;margin:2px 3px 2px 0}

/* MEETING */
.mn{background:var(--cream);border-radius:8px;padding:16px;margin-bottom:12px}
.mr{display:flex;gap:8px;margin-bottom:6px}
.mk{font-size:10px;font-weight:700;color:var(--slate);width:90px;flex-shrink:0;text-transform:uppercase;letter-spacing:.4px;padding-top:1px}
.mv{font-size:12px;color:var(--ink);line-height:1.5;flex:1}

/* WELCOME */
.wb{background:linear-gradient(135deg,var(--darkest) 0%,var(--dark) 100%);border-radius:6px;border-left:3px solid var(--gold);padding:22px 26px;margin-bottom:22px;display:flex;align-items:center;justify-content:space-between}
.wbt h2{font-family:'Playfair Display',serif;font-size:19px;font-weight:700;color:var(--white)}
.wbt p{font-size:11px;color:rgba(255,255,255,.38);margin-top:2px}

/* CLIENT CARD */
.cc{background:var(--white);border:1px solid var(--mist);border-radius:6px;padding:16px;cursor:pointer;transition:all .2s;position:relative;overflow:hidden}
.cc:hover{box-shadow:0 4px 18px var(--sh);transform:translateY(-1px)}
.cn{font-family:'Playfair Display',serif;font-size:16px;font-weight:700}
.csub{font-size:11px;color:var(--slate);margin-top:1px;margin-bottom:10px}

/* MODAL */
.mo{position:fixed;inset:0;background:rgba(17,18,16,.55);z-index:200;display:flex;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(3px)}
.md{background:var(--white);border-radius:8px;width:100%;max-width:640px;max-height:90vh;overflow-y:auto;box-shadow:0 24px 60px rgba(0,0,0,.22)}
.mdh{padding:22px 26px 16px;border-bottom:1px solid var(--mist);display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;background:var(--white);z-index:1;border-radius:8px 8px 0 0}
.mdt{font-family:'Playfair Display',serif;font-size:19px;font-weight:700}
.mdc{background:none;border:none;font-size:20px;cursor:pointer;color:var(--slate);padding:2px 6px;border-radius:4px;line-height:1}
.mdc:hover{background:var(--cream)}
.mdb{padding:22px 26px}
.mdf{padding:14px 26px 22px;display:flex;gap:8px;justify-content:flex-end}

/* NOTIF */
.nbell{position:relative;cursor:pointer;padding:5px 9px;border-radius:7px;font-size:17px;transition:background .15s;user-select:none}
.nbell:hover{background:var(--cream)}
.ndot{position:absolute;top:3px;right:5px;width:7px;height:7px;background:var(--rust);border-radius:50%;border:2px solid var(--white)}
.ndd{position:absolute;top:calc(100% + 7px);right:0;width:300px;background:var(--white);border:1px solid var(--mist);border-radius:10px;box-shadow:0 8px 28px var(--sh);z-index:100;overflow:hidden}
.ndi{padding:11px 14px;border-bottom:1px solid var(--mist);font-size:12px;cursor:default}
.ndi:last-child{border-bottom:none}
.ndi.unr{background:rgba(90,244,126,.05)}
.ndt{font-weight:600;color:var(--ink)}
.nds{font-size:10px;color:var(--slate);margin-top:1px}

/* AI */
.ail{display:flex;align-items:center;gap:10px;padding:18px;color:var(--slate);font-size:13px;font-style:italic}
.ail span{display:inline-block;animation:bl 1.2s infinite}
.ail span:nth-child(2){animation-delay:.2s}
.ail span:nth-child(3){animation-delay:.4s}
@keyframes bl{0%,80%,100%{opacity:.15}40%{opacity:1}}
.ais{background:linear-gradient(135deg,rgba(90,244,126,.05),rgba(107,158,114,.05));border:1px solid var(--gold-l);border-radius:8px;padding:16px;font-size:13px;line-height:1.8;color:var(--ink);white-space:pre-wrap}

/* CREDS */
.crb{background:var(--ink);border-radius:8px;padding:16px;margin-top:14px}
.crr{display:flex;justify-content:space-between;align-items:center;padding:4px 0;border-bottom:1px solid rgba(255,255,255,.06)}
.crr:last-child{border-bottom:none}
.crl{font-size:9px;color:rgba(255,255,255,.32);text-transform:uppercase;letter-spacing:.5px}
.crv{font-size:11px;color:var(--gold);font-weight:500;font-family:monospace}

/* USER ROW */
.ur{display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid var(--mist)}
.ur:last-child{border-bottom:none}
.un{font-size:13px;font-weight:500}
.ue{font-size:10px;color:var(--slate);margin-top:1px}
.trole{font-size:9px;font-weight:700;padding:2px 7px;border-radius:10px;text-transform:uppercase;letter-spacing:.5px}
.tor{background:rgba(90,244,126,.12);color:#8a6010}
.tmb{background:rgba(79,90,106,.08);color:var(--slate)}

/* INLINE FORM */
.inf{background:var(--cream);border-radius:8px;padding:16px;margin-bottom:16px}
.est{text-align:center;padding:32px 0;color:var(--slate);font-size:13px}
.div{border:none;border-top:1px solid var(--mist);margin:14px 0}
.sdot{width:7px;height:7px;border-radius:50%;background:var(--mist)}
.sdot.act{background:var(--gold)}
.sdot.dn2{background:var(--sage)}

/* ORG CHART */
.oc-wrap{overflow-x:auto;padding:20px 0}
.oc-tree{display:flex;flex-direction:column;align-items:center;gap:0}
.oc-row{display:flex;gap:24px;justify-content:center}
.oc-node{background:var(--white);border:1.5px solid var(--mist);border-radius:10px;padding:14px 18px;min-width:160px;text-align:center;position:relative;transition:box-shadow .2s}
.oc-node:hover{box-shadow:0 4px 16px var(--sh)}
.oc-node.root{border-color:var(--gold);background:rgba(90,244,126,.04)}
.oc-seat{font-size:12px;font-weight:600;color:var(--ink)}
.oc-person{font-size:11px;color:var(--slate);margin-top:3px}
.oc-person.open{color:var(--rust);font-style:italic}
.oc-line{width:2px;height:24px;background:var(--mist);margin:0 auto}
.oc-hline{height:2px;background:var(--mist);flex:1;margin-top:24px}

/* MEETING RUNNER */
.mr-seg{background:var(--cream);border-radius:10px;padding:18px;margin-bottom:12px;border:2px solid transparent;transition:border-color .2s}
.mr-seg.cur{border-color:var(--gold);background:rgba(90,244,126,.06)}
.mr-sname{font-weight:600;font-size:14px}
.mr-sdur{font-size:11px;color:var(--slate);margin-top:2px}
.timer{font-family:'Playfair Display',serif;font-size:48px;font-weight:700;color:var(--ink);text-align:center;margin:10px 0}
.timer.warn{color:var(--rust)}

/* TABS */
.tabs{display:flex;gap:3px;background:var(--cream);border-radius:8px;padding:3px;margin-bottom:16px}
.tab{flex:1;padding:7px;border-radius:6px;border:none;font-family:'Inter',sans-serif;font-size:12px;font-weight:500;cursor:pointer;color:var(--slate);background:transparent;transition:all .15s}
.tab.on{background:var(--white);color:var(--ink);font-weight:600;box-shadow:0 1px 4px var(--sh)}

/* RPRS */
.gwc{display:flex;gap:6px;margin-top:6px}
.gwcb{width:28px;height:28px;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;border:2px solid transparent;cursor:pointer;transition:all .15s}
.gwcb.y{background:rgba(107,158,114,.15);border-color:var(--sage);color:var(--sage)}
.gwcb.n{background:rgba(187,77,56,.12);border-color:var(--rust);color:var(--rust)}

/* STATS CHART */
.chart-wrap{position:relative;height:180px;margin-top:10px}
.chart-line{position:absolute;bottom:0;left:0;right:0}

/* HEADLINE */
.hl{display:flex;gap:10px;padding:9px 0;border-bottom:1px solid var(--mist);align-items:flex-start}
.hl:last-child{border-bottom:none}
.hl-text{font-size:13px;flex:1;line-height:1.4}
.hl-meta{font-size:10px;color:var(--slate);margin-top:2px}

@media(max-width:768px){.g2,.g3,.g4{grid-template-columns:1fr}.sb{width:220px}.main{margin-left:220px}}
`;

// ─── MINI COMPONENTS ──────────────────────────────────────────────────────────
function Avatar({name,size="",style={}}){return <div className={`av ${size}`} style={{background:avatarColor(name),...style}}>{initials(name)}</div>}

function Sparkline({values,goal,goalType}){
  const max=Math.max(...values.map(v=>v.v),Number(goal));
  return <div className="spark">{values.map((v,i)=>{
    const h=Math.max(4,Math.round((v.v/max)*24));
    const good=goalType==="min"?v.v>=Number(goal):v.v<=Number(goal);
    return <div key={i} className="sb2" style={{height:h,background:good?"var(--sage)":"var(--rust)",opacity:i===values.length-1?1:0.5}}/>;
  })}</div>;
}

function Notif({notifs,onClear}){
  const [open,setOpen]=useState(false);const ref=useRef();
  useEffect(()=>{const h=e=>{if(ref.current&&!ref.current.contains(e.target))setOpen(false)};document.addEventListener("mousedown",h);return()=>document.removeEventListener("mousedown",h)},[]);
  const unr=notifs.filter(n=>!n.read).length;
  return <div style={{position:"relative"}} ref={ref}>
    <div className="nbell" onClick={()=>setOpen(o=>!o)}>🔔{unr>0&&<div className="ndot"/>}</div>
    {open&&<div className="ndd">
      <div style={{padding:"10px 14px 8px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid var(--mist)"}}>
        <span style={{fontSize:12,fontWeight:600}}>Notifications</span>
        {notifs.length>0&&<button className="btn btn-xs bol" onClick={onClear}>Clear</button>}
      </div>
      {notifs.length===0&&<div style={{padding:16,textAlign:"center",fontSize:12,color:"var(--slate)"}}>No notifications</div>}
      {notifs.map(n=><div key={n.id} className={`ndi ${n.read?"":"unr"}`}><div className="ndt">{n.title}</div><div className="nds">{n.body}</div></div>)}
    </div>}
  </div>;
}

function EmailModal({open,onClose,title,content,loading}){
  if(!open)return null;
  return <div className="mo" onClick={onClose}><div className="md" style={{maxWidth:680}} onClick={e=>e.stopPropagation()}>
    <div className="mdh"><div className="mdt">{title}</div><button className="mdc" onClick={onClose}>×</button></div>
    <div className="mdb">{loading?<div className="ail">✦ Drafting with AI <span>.</span><span>.</span><span>.</span></div>:<div className="ais">{content}</div>}</div>
    <div className="mdf">{!loading&&<button className="btn bdk" onClick={()=>navigator.clipboard?.writeText(content)}>📋 Copy</button>}<button className="btn bol" onClick={onClose}>Close</button></div>
  </div></div>;
}

// ─── ADD CLIENT MODAL ─────────────────────────────────────────────────────────
function AddClientModal({open,onClose,onAdd}){
  const [step,setStep]=useState(1);
  const [biz,setBiz]=useState({company:"",industry:"",color:"#6b9e72"});
  const [owner,setOwner]=useState({name:"",email:"",username:"",password:""});
  const [members,setMembers]=useState([]);
  const [nm,setNm]=useState({name:"",email:"",username:"",password:""});
  const [done,setDone]=useState(null);
  const colors=["#6b9e72","#5af47e","#bb4d38","#3d7ab5","#6b5fad","#e07b54","#5ba4a4"];
  const reset=()=>{setStep(1);setBiz({company:"",industry:"",color:"#6b9e72"});setOwner({name:"",email:"",username:"",password:""});setMembers([]);setNm({name:"",email:"",username:"",password:""});setDone(null)};
  const addMember=()=>{if(!nm.name||!nm.username)return;setMembers(m=>[...m,{...nm,id:uid(),role:"member"}]);setNm({name:"",email:"",username:"",password:""})};
  const finish=()=>{
    const id="b"+uid();
    const nb={id,...biz,users:[{...owner,id:uid(),role:"owner"},...members],
      plan:{coreValues:[],purpose:"",niche:"",bhag:{goal:"",date:"",narrative:""},threeYear:{date:"",revenue:"",profit:"",measurables:[],possibilities:[]},oneYear:{date:"",revenue:"",profit:"",measurables:[],goals:[]},quarterly:{date:"",revenue:"",profit:"",measurables:[],goal:""},longTermIssues:[]},
      orgChart:{seats:[]},rocks:[],scorecard:[],issues:[],todos:[],headlines:[],meetingNotes:[],rprs:[],oneOnOnes:[],notifications:[]};
    setDone(nb);onAdd(nb);setStep(4);
  };
  if(!open)return null;
  return <div className="mo"><div className="md">
    <div className="mdh">
      <div><div className="mdt">{step<4?"Add Business Client":"✦ Client Created!"}</div>
        <div style={{display:"flex",gap:5,marginTop:7}}>{[1,2,3].map(s=><div key={s} className={`sdot ${s<step||step===4?"dn2":s===step?"act":""}`}/>)}</div>
      </div>
      <button className="mdc" onClick={()=>{reset();onClose()}}>×</button>
    </div>
    <div className="mdb">
      {step===1&&<>
        <div style={{fontSize:12,color:"var(--slate)",marginBottom:16}}>Step 1 of 3 — Company details</div>
        <div className="fg"><label>Company Name *</label><input value={biz.company} onChange={e=>setBiz(b=>({...b,company:e.target.value}))} placeholder="e.g. Acme Corp"/></div>
        <div className="fg"><label>Industry</label><input value={biz.industry} onChange={e=>setBiz(b=>({...b,industry:e.target.value}))} placeholder="e.g. Healthcare, Real Estate, Manufacturing"/></div>
        <div className="fg"><label>Brand Colour</label><div style={{display:"flex",gap:8,marginTop:5}}>{colors.map(c=><div key={c} onClick={()=>setBiz(b=>({...b,color:c}))} style={{width:26,height:26,borderRadius:"50%",background:c,cursor:"pointer",border:biz.color===c?"3px solid var(--ink)":"3px solid transparent",transition:"border .15s"}}/> )}</div></div>
      </>}
      {step===2&&<>
        <div style={{fontSize:12,color:"var(--slate)",marginBottom:16}}>Step 2 of 3 — Business Owner (full access)</div>
        <div className="g2"><div className="fg"><label>Full Name *</label><input value={owner.name} onChange={e=>setOwner(o=>({...o,name:e.target.value}))} placeholder="Jane Smith"/></div><div className="fg"><label>Email *</label><input value={owner.email} onChange={e=>setOwner(o=>({...o,email:e.target.value}))} placeholder="jane@co.com"/></div></div>
        <div className="g2"><div className="fg"><label>Username *</label><input value={owner.username} onChange={e=>setOwner(o=>({...o,username:e.target.value}))} placeholder="jane.company"/></div><div className="fg"><label>Password *</label><input value={owner.password} onChange={e=>setOwner(o=>({...o,password:e.target.value}))} placeholder="Set a password"/></div></div>
      </>}
      {step===3&&<>
        <div style={{fontSize:12,color:"var(--slate)",marginBottom:16}}>Step 3 of 3 — Add team members (can view all, edit own assigned items)</div>
        {members.map((m,i)=><div key={m.id} className="ur"><Avatar name={m.name}/><div style={{flex:1}}><div className="un">{m.name}</div><div className="ue">@{m.username}</div></div><span className="trole tmb">member</span><button className="btn btn-xs bol" onClick={()=>setMembers(ms=>ms.filter((_,j)=>j!==i))}>Remove</button></div>)}
        <div className="inf" style={{marginTop:members.length?14:0}}>
          <div style={{fontSize:10,fontWeight:600,color:"var(--slate)",marginBottom:10,textTransform:"uppercase",letterSpacing:".5px"}}>Add Team Member</div>
          <div className="g2"><div className="fg"><label>Name</label><input value={nm.name} onChange={e=>setNm(m=>({...m,name:e.target.value}))} placeholder="Name"/></div><div className="fg"><label>Email</label><input value={nm.email} onChange={e=>setNm(m=>({...m,email:e.target.value}))} placeholder="email"/></div></div>
          <div className="g2"><div className="fg"><label>Username</label><input value={nm.username} onChange={e=>setNm(m=>({...m,username:e.target.value}))} placeholder="username"/></div><div className="fg"><label>Password</label><input value={nm.password} onChange={e=>setNm(m=>({...m,password:e.target.value}))} placeholder="password"/></div></div>
          <button className="btn btn-sm bsage" onClick={addMember}>＋ Add Member</button>
        </div>
      </>}
      {step===4&&done&&<>
        <div style={{textAlign:"center",marginBottom:18}}><div style={{fontSize:42,marginBottom:8}}>✦</div><div style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:600}}>{done.company}</div><div style={{fontSize:12,color:"var(--slate)",marginTop:3}}>{done.users.length} user{done.users.length!==1?"s":""} created</div></div>
        <div style={{fontSize:10,fontWeight:700,color:"var(--slate)",textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>Share these credentials:</div>
        <div className="crb">{done.users.map((u,i)=><div key={u.id} style={{marginBottom:i<done.users.length-1?12:0,paddingBottom:i<done.users.length-1?12:0,borderBottom:i<done.users.length-1?"1px solid rgba(255,255,255,.07)":"none"}}><div style={{fontSize:11,color:"rgba(255,255,255,.4)",marginBottom:5}}>{u.name} · <span style={{color:u.role==="owner"?"var(--gold)":"rgba(255,255,255,.3)"}}>{u.role}</span></div><div className="crr"><span className="crl">Username</span><span className="crv">{u.username}</span></div><div className="crr"><span className="crl">Password</span><span className="crv">{u.password}</span></div></div>)}</div>
      </>}
    </div>
    <div className="mdf">
      {step===1&&<button className="btn bdk" disabled={!biz.company} onClick={()=>setStep(2)}>Next — Owner →</button>}
      {step===2&&<><button className="btn bdk" disabled={!owner.name||!owner.username||!owner.password} onClick={()=>setStep(3)}>Next — Team →</button><button className="btn bol" onClick={()=>setStep(1)}>← Back</button></>}
      {step===3&&<><button className="btn bdk" onClick={finish}>✦ Create Client</button><button className="btn bol" onClick={()=>setStep(2)}>← Back</button></>}
      {step===4&&<button className="btn bdk" onClick={()=>{reset();onClose()}}>Done</button>}
    </div>
  </div></div>;
}

// ─── MANAGE USERS ─────────────────────────────────────────────────────────────
function ManageUsersModal({open,business,onClose,onUpdate}){
  const [f,setF]=useState({name:"",email:"",username:"",password:"",role:"member"});
  if(!open||!business)return null;
  const add=()=>{if(!f.name||!f.username)return;onUpdate({...business,users:[...business.users,{...f,id:uid()}]});setF({name:"",email:"",username:"",password:"",role:"member"})};
  return <div className="mo" onClick={onClose}><div className="md" onClick={e=>e.stopPropagation()}>
    <div className="mdh"><div className="mdt">👥 Users — {business.company}</div><button className="mdc" onClick={onClose}>×</button></div>
    <div className="mdb">
      {business.users.map(u=><div key={u.id} className="ur"><Avatar name={u.name}/><div style={{flex:1}}><div className="un">{u.name}</div><div className="ue">{u.email?`${u.email} · `:""} @{u.username}</div></div><span className={`trole ${u.role==="owner"?"tor":"tmb"}`}>{u.role}</span>{u.role!=="owner"&&<button className="btn btn-xs bol" style={{color:"var(--rust)",borderColor:"rgba(187,77,56,.3)"}} onClick={()=>onUpdate({...business,users:business.users.filter(x=>x.id!==u.id)})}>Remove</button>}</div>)}
      <div className="div"/>
      <div style={{fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:600,marginBottom:12}}>Add New User</div>
      <div className="g2"><div className="fg"><label>Name</label><input value={f.name} onChange={e=>setF(x=>({...x,name:e.target.value}))}/></div><div className="fg"><label>Email</label><input value={f.email} onChange={e=>setF(x=>({...x,email:e.target.value}))}/></div></div>
      <div className="g2"><div className="fg"><label>Username</label><input value={f.username} onChange={e=>setF(x=>({...x,username:e.target.value}))}/></div><div className="fg"><label>Password</label><input value={f.password} onChange={e=>setF(x=>({...x,password:e.target.value}))}/></div></div>
      <div className="fg"><label>Role</label><select value={f.role} onChange={e=>setF(x=>({...x,role:e.target.value}))}><option value="owner">Owner — Full access</option><option value="member">Member — View all, edit own</option></select></div>
    </div>
    <div className="mdf"><button className="btn bdk" onClick={add} disabled={!f.name||!f.username}>Add User</button><button className="btn bol" onClick={onClose}>Done</button></div>
  </div></div>;
}

// ─── MODULES ──────────────────────────────────────────────────────────────────

function Dashboard({biz,cu}){
  const onTrack=(biz.rocks||[]).filter(r=>r.status==="on-track").length;
  const openIss=(biz.issues||[]).filter(i=>i.status==="open").length;
  const myTodos=(biz.todos||[]).filter(t=>!t.done&&(cu.role==="owner"||t.owner===cu.name));
  const totalTodos=(biz.todos||[]).length;
  const doneTodos=(biz.todos||[]).filter(t=>t.done).length;
  return <div>
    <div className="wb"><div className="wbt"><h2>Welcome back, {cu.name.split(" ")[0]} 👋</h2><p>{biz.company}{biz.industry?` · ${biz.industry}`:""}</p></div><div style={{fontSize:32,color:"var(--gold)"}}>✦</div></div>
    <div className="g4" style={{marginBottom:18}}>
      <div className="sc"><div className="sl">Rocks On Track</div><div className="sv">{onTrack}/{(biz.rocks||[]).length}</div><div className="sn">90-day priorities</div></div>
      <div className="sc"><div className="sl">Open Issues</div><div className="sv">{openIss}</div><div className="sn">Need resolution</div></div>
      <div className="sc"><div className="sl">My To-Dos</div><div className="sv">{myTodos.length}</div><div className="sn">Pending this week</div></div>
      <div className="sc"><div className="sl">To-Do Rate</div><div className="sv">{totalTodos?Math.round(doneTodos/totalTodos*100):0}%</div><div className="sn">Completion</div></div>
    </div>
    <div className="g2">
      <div className="card"><div className="ch"><div className="ct">Rocks</div></div>
        {!(biz.rocks||[]).length&&<div className="est">No rocks set.</div>}
        {(biz.rocks||[]).map(r=><div className="ri" key={r.id}><div className={`rd ${r.status==="on-track"?"don":"doff"}`}/><div className="rin"><div className="rt">{r.title}</div><div className="rm">{r.owner} · {r.dueDate}</div><div className="pb"><div className={`pf ${r.status!=="on-track"?"off":""}`} style={{width:`${r.progress}%`}}/></div></div><span className={`bdg ${r.status==="on-track"?"bg":"br"}`}>{r.progress}%</span></div>)}
      </div>
      <div className="card"><div className="ch"><div className="ct">My To-Dos</div></div>
        {!myTodos.length&&<div className="est">You're all caught up! 🎉</div>}
        {myTodos.map(t=><div className="tdi" key={t.id} style={{cursor:"default"}}><div className="tck"/><div style={{flex:1}}><div style={{fontSize:13,fontWeight:500}}>{t.title}</div><div style={{fontSize:11,color:"var(--slate)",marginTop:2}}>Due {t.dueDate}</div></div></div>)}
      </div>
    </div>
    {(biz.headlines||[]).length>0&&<div className="card"><div className="ch"><div className="ct">Latest Headlines</div></div>{(biz.headlines||[]).slice(0,3).map(h=><div className="hl" key={h.id}><Avatar name={h.owner}/><div><div className="hl-text">🎉 {h.text}</div><div className="hl-meta">{h.owner} · {h.date}</div></div></div>)}</div>}
  </div>;
}

// ─── EDITABLE FIELD HELPERS ──────────────────────────────────────────────────
function EditField({label,value,onChange,multiline=false,placeholder="",style={}}){
  return <div className="fg" style={style}>
    {label&&<label>{label}</label>}
    {multiline
      ?<textarea value={value||""} onChange={e=>onChange(e.target.value)} placeholder={placeholder} style={{minHeight:72}}/>
      :<input value={value||""} onChange={e=>onChange(e.target.value)} placeholder={placeholder}/>}
  </div>;
}

function EditableList({label,items,onAdd,onRemove,renderItem,addForm}){
  const [open,setOpen]=useState(false);
  return <div className="vs">
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
      <div className="vl">{label}</div>
      <button className="btn btn-xs bol" onClick={()=>setOpen(o=>!o)}>{open?"Cancel":"＋ Add"}</button>
    </div>
    {items.map((item,i)=><div key={item.id||i} style={{display:"flex",alignItems:"flex-start",gap:8,marginBottom:6}}>
      <div style={{flex:1}}>{renderItem(item,i)}</div>
      <button className="btn btn-xs bol" style={{color:"var(--rust)",borderColor:"rgba(187,77,56,.25)",flexShrink:0,marginTop:2}} onClick={()=>onRemove(i)}>✕</button>
    </div>)}
    {open&&<div className="inf" style={{marginTop:8}}>{addForm(()=>setOpen(false))}</div>}
  </div>;
}

// ─── PDF EXPORT ──────────────────────────────────────────────────────────────
function exportPlanToPDF(biz){
  const plan=biz.plan||{};
  const html=`<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"/>
<title>${biz.company} — Business Plan</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@400;500;600&display=swap');
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Inter',sans-serif;color:#111;background:#fff;font-size:12px;line-height:1.6}
  .page{max-width:780px;margin:0 auto;padding:48px 48px 60px}
  .cover{text-align:center;padding:80px 0 60px;border-bottom:2px solid #e8e4de;margin-bottom:48px}
  .cover-logo{font-family:'Playfair Display',serif;font-size:13px;font-weight:600;letter-spacing:3px;text-transform:uppercase;color:#5af47e;margin-bottom:16px}
  .cover-title{font-family:'Playfair Display',serif;font-size:40px;font-weight:700;color:#111;line-height:1.15;margin-bottom:12px}
  .cover-sub{font-size:13px;color:#666;letter-spacing:1px}
  .cover-date{margin-top:24px;font-size:11px;color:#999;text-transform:uppercase;letter-spacing:1px}
  h2{font-family:'Playfair Display',serif;font-size:20px;font-weight:700;color:#111;margin-bottom:6px;padding-bottom:6px;border-bottom:2px solid #5af47e}
  h3{font-family:'Playfair Display',serif;font-size:16px;font-weight:600;color:#333;margin:18px 0 8px}
  .section{margin-bottom:40px;page-break-inside:avoid}
  .label{font-size:9px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#888;margin-bottom:5px}
  .value{font-size:13px;color:#222;line-height:1.6}
  .value.large{font-family:'Playfair Display',serif;font-size:18px;font-weight:600}
  .grid2{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:16px}
  .box{background:#f8f7f4;border-radius:6px;padding:14px;border-left:3px solid #5af47e}
  .cv-item{display:flex;gap:14px;margin-bottom:12px;padding:10px 14px;background:#f8f7f4;border-radius:6px}
  .cv-num{font-family:'Playfair Display',serif;font-size:22px;font-weight:700;color:#5af47e;min-width:24px}
  .cv-title{font-weight:600;font-size:13px}
  .cv-desc{font-size:11px;color:#666;margin-top:2px}
  .row{display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid #e8e4de;font-size:12px}
  .row:last-child{border-bottom:none}
  .goal-item{display:flex;gap:10px;margin-bottom:8px;padding:8px 12px;background:#f8f7f4;border-radius:5px;font-size:12px}
  .goal-num{font-weight:700;color:#5af47e;min-width:18px}
  .poss{font-size:12px;color:#555;padding:3px 0}
  .issue-item{display:flex;gap:10px;padding:8px 0;border-bottom:1px solid #e8e4de;font-size:12px}
  .issue-dot{width:6px;height:6px;border-radius:50%;background:#5af47e;margin-top:5px;flex-shrink:0}
  .page-break{page-break-before:always}
  .footer{text-align:center;margin-top:60px;padding-top:20px;border-top:1px solid #e8e4de;font-size:10px;color:#aaa;letter-spacing:1px}
  @media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
</style>
</head>
<body>
<div class="page">
  <div class="cover">
    <div class="cover-logo">The Wealth Network</div>
    <div class="cover-title">${biz.company}<br/>Business Plan</div>
    <div class="cover-sub">${biz.industry||""}</div>
    <div class="cover-date">Generated ${new Date().toLocaleDateString("en-AU",{year:"numeric",month:"long",day:"numeric"})}</div>
  </div>

  <!-- FUTURE FOCUS -->
  <div class="section">
    <h2>Future Focus</h2>

    <h3>Core Values</h3>
    ${(plan.coreValues||[]).map((v,i)=>`<div class="cv-item"><div class="cv-num">${i+1}</div><div><div class="cv-title">${v.title}</div><div class="cv-desc">${v.desc||""}</div></div></div>`).join("")||"<p style='color:#999;font-style:italic'>Not set</p>"}

    <h3>Core Focus</h3>
    <div class="grid2">
      <div class="box"><div class="label">Purpose</div><div class="value">${plan.purpose||"—"}</div></div>
      <div class="box"><div class="label">Niche</div><div class="value">${plan.niche||"—"}</div></div>
    </div>

    <h3>BHAG — Big Hairy Audacious Goal</h3>
    <div class="box" style="margin-bottom:10px">
      <div class="label">10-Year Goal</div>
      <div class="value large">${plan.bhag?.goal||"—"}</div>
    </div>
    <div class="grid2">
      <div class="box"><div class="label">Target Date</div><div class="value">${plan.bhag?.date||"—"}</div></div>
      <div class="box"><div class="label">Narrative</div><div class="value">${plan.bhag?.narrative||"—"}</div></div>
    </div>

    <h3>3-Year Vision</h3>
    <div class="grid2">
      <div class="box"><div class="label">Revenue Target</div><div class="value large">${plan.threeYear?.revenue||"—"}</div></div>
      <div class="box"><div class="label">Profit Target</div><div class="value large">${plan.threeYear?.profit||"—"}</div></div>
    </div>
    ${(plan.threeYear?.measurables||[]).length?`<div style="margin-bottom:10px">${(plan.threeYear.measurables).map(m=>`<div class="row"><span>${m.label}</span><span style="font-weight:600">${m.value}</span></div>`).join("")}</div>`:""}
    ${(plan.threeYear?.possibilities||[]).length?`<div class="label" style="margin-top:10px">Future Possibilities</div>${(plan.threeYear.possibilities).map(p=>`<div class="poss">• ${p}</div>`).join("")}`:""}
  </div>

  <div class="page-break"></div>

  <!-- SHORT-TERM FOCUS -->
  <div class="section">
    <h2>Short-Term Focus</h2>

    <h3>1-Year Goals</h3>
    <div class="grid2" style="margin-bottom:12px">
      <div class="box"><div class="label">Revenue Target</div><div class="value large">${plan.oneYear?.revenue||"—"}</div></div>
      <div class="box"><div class="label">Profit Target</div><div class="value large">${plan.oneYear?.profit||"—"}</div></div>
    </div>
    ${(plan.oneYear?.goals||[]).map((g,i)=>`<div class="goal-item"><div class="goal-num">${i+1}.</div><div>${g}</div></div>`).join("")||"<p style='color:#999;font-style:italic'>No goals set</p>"}

    <h3>Quarterly Goals</h3>
    <div class="box" style="margin-bottom:12px">
      <div class="label">Quarter Goal</div>
      <div class="value large">${plan.quarterly?.goal||"—"}</div>
    </div>
    <div class="grid2" style="margin-bottom:12px">
      <div class="box"><div class="label">Revenue</div><div class="value">${plan.quarterly?.revenue||"—"}</div></div>
      <div class="box"><div class="label">Profit</div><div class="value">${plan.quarterly?.profit||"—"}</div></div>
    </div>
    ${(plan.quarterly?.measurables||[]).length?`<div class="label">Measurables</div>${(plan.quarterly.measurables).map(m=>`<div class="row"><span>${m.label}</span><span style="font-weight:600">${m.value}</span></div>`).join("")}`:""}

    ${(plan.longTermIssues||[]).length?`<h3>Long-Term Issues</h3>${(plan.longTermIssues).map(i=>`<div class="issue-item"><div class="issue-dot"></div><div><strong>${i.title}</strong>${i.owner?` — ${i.owner}`:""}</div></div>`).join("")}`:""}
  </div>

  <div class="footer">THE WEALTH NETWORK · ${biz.company.toUpperCase()} · CONFIDENTIAL</div>
</div>
</body>
</html>`;

  const w=window.open("","_blank","width=900,height=700");
  w.document.write(html);
  w.document.close();
  w.onload=()=>{w.focus();w.print()};
}

// ─── BUSINESS PLAN (FULLY EDITABLE) ──────────────────────────────────────────
function BusinessPlan({biz,setBiz,cu}){
  const [tab,setTab]=useState(0);
  const plan=biz.plan||{};
  const canEdit=cu.role==="owner"||cu.role==="coach";
  const upPlan=patch=>setBiz(b=>({...b,plan:{...b.plan,...patch}}));
  const upBhag=patch=>upPlan({bhag:{...plan.bhag,...patch}});
  const upThree=patch=>upPlan({threeYear:{...plan.threeYear,...patch}});
  const upOne=patch=>upPlan({oneYear:{...plan.oneYear,...patch}});
  const upQ=patch=>upPlan({quarterly:{...plan.quarterly,...patch}});

  // ── Core Values ──
  const [addCV,setAddCV]=useState(false);
  const [cvF,setCvF]=useState({title:"",desc:""});

  // ── 3-Year measurables/possibilities ──
  const [add3M,setAdd3M]=useState(false);const [f3M,setF3M]=useState({label:"",value:""});
  const [add3P,setAdd3P]=useState(false);const [f3P,setF3P]=useState("");

  // ── 1-Year goals/measurables ──
  const [add1G,setAdd1G]=useState(false);const [f1G,setF1G]=useState("");
  const [add1M,setAdd1M]=useState(false);const [f1M,setF1M]=useState({label:"",value:""});

  // ── Quarterly measurables ──
  const [addQM,setAddQM]=useState(false);const [fQM,setFQM]=useState({label:"",value:""});

  // ── Long-term issues ──
  const [addLI,setAddLI]=useState(false);const [fLI,setFLI]=useState({title:"",owner:""});

  const EF=({label,val,up,multi=false,ph=""})=>canEdit
    ?<div className="fg"><label>{label}</label>{multi?<textarea value={val||""} onChange={e=>up(e.target.value)} placeholder={ph} style={{minHeight:66}}/>:<input value={val||""} onChange={e=>up(e.target.value)} placeholder={ph}/>}</div>
    :<div className="vs"><div className="vl">{label}</div><div className="vv">{val||"—"}</div></div>;

  return <div>
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
      <div className="tabs" style={{flex:1,marginBottom:0,marginRight:12}}>{["Future Focus","Short-Term Focus"].map((t,i)=><button key={i} className={`tab ${tab===i?"on":""}`} onClick={()=>setTab(i)}>{t}</button>)}</div>
      <button className="btn bdk" onClick={()=>exportPlanToPDF(biz)}>📄 Export PDF</button>
    </div>

    {tab===0&&<div className="g2">
      {/* LEFT COL */}
      <div>
        <div className="card">
          <div className="ch"><div className="ct">Core Identity</div>{canEdit&&<span className="bdg bgold">Editing</span>}</div>

          {/* CORE VALUES */}
          <div className="vs">
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <div className="vl">Core Values</div>
              {canEdit&&<button className="btn btn-xs bol" onClick={()=>setAddCV(o=>!o)}>{addCV?"Cancel":"＋ Add"}</button>}
            </div>
            {(plan.coreValues||[]).map((v,i)=><div key={v.id} style={{display:"flex",gap:10,marginBottom:10,padding:"10px 14px",background:"var(--cream)",borderRadius:8,alignItems:"flex-start"}}>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:700,color:"var(--gold)",minWidth:26,paddingTop:1}}>{i+1}</div>
              {canEdit?<div style={{flex:1,display:"flex",flexDirection:"column",gap:5}}>
                <input value={v.title} onChange={e=>upPlan({coreValues:plan.coreValues.map((x,j)=>j===i?{...x,title:e.target.value}:x)})} style={{padding:"5px 8px",border:"1.5px solid var(--mist)",borderRadius:5,fontSize:12,fontWeight:600,fontFamily:"'Inter',sans-serif",background:"white",color:"var(--ink)"}} placeholder="Value title"/>
                <input value={v.desc} onChange={e=>upPlan({coreValues:plan.coreValues.map((x,j)=>j===i?{...x,desc:e.target.value}:x)})} style={{padding:"5px 8px",border:"1.5px solid var(--mist)",borderRadius:5,fontSize:11,fontFamily:"'Inter',sans-serif",background:"white",color:"var(--slate)"}} placeholder="Description"/>
              </div>:<div><div style={{fontWeight:600,fontSize:13}}>{v.title}</div><div style={{fontSize:12,color:"var(--slate)",marginTop:2}}>{v.desc}</div></div>}
              {canEdit&&<button className="btn btn-xs bol" style={{color:"var(--rust)",borderColor:"rgba(187,77,56,.25)",marginTop:2}} onClick={()=>upPlan({coreValues:plan.coreValues.filter((_,j)=>j!==i)})}>✕</button>}
            </div>)}
            {canEdit&&addCV&&<div className="inf"><div className="g2"><div className="fg"><label>Value Title</label><input value={cvF.title} onChange={e=>setCvF(f=>({...f,title:e.target.value}))} placeholder="e.g. Integrity First"/></div><div className="fg"><label>Description</label><input value={cvF.desc} onChange={e=>setCvF(f=>({...f,desc:e.target.value}))} placeholder="One-line description"/></div></div><div style={{display:"flex",gap:8}}><button className="btn btn-sm bdk" onClick={()=>{if(!cvF.title)return;upPlan({coreValues:[...(plan.coreValues||[]),{id:uid(),...cvF}]});setCvF({title:"",desc:""});setAddCV(false)}}>Save Value</button><button className="btn btn-sm bol" onClick={()=>setAddCV(false)}>Cancel</button></div></div>}
          </div>

          <EF label="Purpose" val={plan.purpose} up={v=>upPlan({purpose:v})} ph="Why does this organisation exist?"/>
          <EF label="Niche" val={plan.niche} up={v=>upPlan({niche:v})} ph="Who do you serve and how?"/>
        </div>

        {/* BHAG */}
        <div className="card">
          <div className="ch"><div className="ct">BHAG</div><span className="bdg bsl">10-Year Goal</span></div>
          <EF label="Big Hairy Audacious Goal" val={plan.bhag?.goal} up={v=>upBhag({goal:v})} ph="Your 10-year moonshot goal"/>
          <EF label="Target Date" val={plan.bhag?.date} up={v=>upBhag({date:v})} ph="e.g. 2035-01-01"/>
          <EF label="Narrative — What does success look like?" val={plan.bhag?.narrative} up={v=>upBhag({narrative:v})} multi ph="Paint the picture of success in vivid detail..."/>
        </div>
      </div>

      {/* RIGHT COL */}
      <div>
        <div className="card">
          <div className="ch"><div className="ct">3-Year Vision</div><span className="bdg bb">3 Years</span></div>
          <div className="g2">
            <EF label="Future Date" val={plan.threeYear?.date} up={v=>upThree({date:v})} ph="2028-01-01"/>
            <div/>
          </div>
          <div className="g2">
            <EF label="Revenue Target" val={plan.threeYear?.revenue} up={v=>upThree({revenue:v})} ph="$20M"/>
            <EF label="Profit Target" val={plan.threeYear?.profit} up={v=>upThree({profit:v})} ph="$4M"/>
          </div>

          {/* 3-Year Measurables */}
          <div className="vs">
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <div className="vl">Measurables</div>
              {canEdit&&<button className="btn btn-xs bol" onClick={()=>setAdd3M(o=>!o)}>{add3M?"Cancel":"＋ Add"}</button>}
            </div>
            {(plan.threeYear?.measurables||[]).map((m,i)=><div key={m.id} style={{display:"flex",gap:8,marginBottom:4,alignItems:"center"}}>
              {canEdit?<><input value={m.label} onChange={e=>upThree({measurables:plan.threeYear.measurables.map((x,j)=>j===i?{...x,label:e.target.value}:x)})} style={{flex:2,padding:"5px 8px",border:"1.5px solid var(--mist)",borderRadius:5,fontSize:12,fontFamily:"'Inter',sans-serif"}}/><input value={m.value} onChange={e=>upThree({measurables:plan.threeYear.measurables.map((x,j)=>j===i?{...x,value:e.target.value}:x)})} style={{flex:1,padding:"5px 8px",border:"1.5px solid var(--mist)",borderRadius:5,fontSize:12,fontFamily:"'Inter',sans-serif",fontWeight:600}}/><button className="btn btn-xs bol" style={{color:"var(--rust)",borderColor:"rgba(187,77,56,.25)"}} onClick={()=>upThree({measurables:plan.threeYear.measurables.filter((_,j)=>j!==i)})}>✕</button></>
              :<div style={{display:"flex",justifyContent:"space-between",flex:1,padding:"5px 0",borderBottom:"1px solid var(--mist)",fontSize:12}}><span>{m.label}</span><span style={{fontWeight:600}}>{m.value}</span></div>}
            </div>)}
            {canEdit&&add3M&&<div className="inf" style={{marginTop:8}}><div className="g2"><div className="fg"><label>Label</label><input value={f3M.label} onChange={e=>setF3M(f=>({...f,label:e.target.value}))} placeholder="e.g. Team Size"/></div><div className="fg"><label>Target Value</label><input value={f3M.value} onChange={e=>setF3M(f=>({...f,value:e.target.value}))} placeholder="e.g. 80+"/></div></div><div style={{display:"flex",gap:8}}><button className="btn btn-sm bdk" onClick={()=>{if(!f3M.label)return;upThree({measurables:[...(plan.threeYear?.measurables||[]),{id:uid(),...f3M}]});setF3M({label:"",value:""});setAdd3M(false)}}>Add</button><button className="btn btn-sm bol" onClick={()=>setAdd3M(false)}>Cancel</button></div></div>}
          </div>

          {/* Future Possibilities */}
          <div className="vs" style={{marginTop:12}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <div className="vl">Future Possibilities</div>
              {canEdit&&<button className="btn btn-xs bol" onClick={()=>setAdd3P(o=>!o)}>{add3P?"Cancel":"＋ Add"}</button>}
            </div>
            {(plan.threeYear?.possibilities||[]).map((p,i)=><div key={i} style={{display:"flex",gap:8,marginBottom:4,alignItems:"center"}}>
              {canEdit?<><input value={p} onChange={e=>upThree({possibilities:plan.threeYear.possibilities.map((x,j)=>j===i?e.target.value:x)})} style={{flex:1,padding:"5px 8px",border:"1.5px solid var(--mist)",borderRadius:5,fontSize:12,fontFamily:"'Inter',sans-serif"}}/><button className="btn btn-xs bol" style={{color:"var(--rust)",borderColor:"rgba(187,77,56,.25)"}} onClick={()=>upThree({possibilities:plan.threeYear.possibilities.filter((_,j)=>j!==i)})}>✕</button></>
              :<div style={{fontSize:12,padding:"3px 0",color:"var(--slate)"}}>• {p}</div>}
            </div>)}
            {canEdit&&add3P&&<div className="inf" style={{marginTop:8}}><div className="fg"><label>Possibility</label><input value={f3P} onChange={e=>setF3P(e.target.value)} placeholder="e.g. Expand to APAC"/></div><div style={{display:"flex",gap:8}}><button className="btn btn-sm bdk" onClick={()=>{if(!f3P)return;upThree({possibilities:[...(plan.threeYear?.possibilities||[]),f3P]});setF3P("");setAdd3P(false)}}>Add</button><button className="btn btn-sm bol" onClick={()=>setAdd3P(false)}>Cancel</button></div></div>}
          </div>
        </div>

        {/* Long-term issues */}
        <div className="card">
          <div className="ch"><div className="ct">Long-Term Issues</div>{canEdit&&<button className="btn btn-xs bol" onClick={()=>setAddLI(o=>!o)}>{addLI?"Cancel":"＋ Add"}</button>}</div>
          {!(plan.longTermIssues||[]).length&&<div className="est" style={{padding:"16px 0"}}>No long-term issues.</div>}
          {(plan.longTermIssues||[]).map((iss,i)=><div key={iss.id} style={{display:"flex",gap:8,alignItems:"flex-start",padding:"8px 0",borderBottom:"1px solid var(--mist)"}}>
            <div className="ibar mip" style={{marginTop:4}}/>
            {canEdit?<><div style={{flex:1,display:"flex",flexDirection:"column",gap:4}}>
              <input value={iss.title} onChange={e=>upPlan({longTermIssues:plan.longTermIssues.map((x,j)=>j===i?{...x,title:e.target.value}:x)})} style={{padding:"5px 8px",border:"1.5px solid var(--mist)",borderRadius:5,fontSize:12,fontWeight:500,fontFamily:"'Inter',sans-serif"}}/>
              <input value={iss.owner||""} onChange={e=>upPlan({longTermIssues:plan.longTermIssues.map((x,j)=>j===i?{...x,owner:e.target.value}:x)})} style={{padding:"4px 8px",border:"1.5px solid var(--mist)",borderRadius:5,fontSize:11,fontFamily:"'Inter',sans-serif",color:"var(--slate)"}} placeholder="Owner"/>
            </div><button className="btn btn-xs bol" style={{color:"var(--rust)",borderColor:"rgba(187,77,56,.25)"}} onClick={()=>upPlan({longTermIssues:plan.longTermIssues.filter((_,j)=>j!==i)})}>✕</button></>
            :<div style={{flex:1}}><div style={{fontSize:13,fontWeight:500}}>{iss.title}</div><div style={{fontSize:11,color:"var(--slate)",marginTop:2}}>{iss.owner}</div></div>}
          </div>)}
          {canEdit&&addLI&&<div className="inf" style={{marginTop:10}}><div className="fg"><label>Issue</label><input value={fLI.title} onChange={e=>setFLI(f=>({...f,title:e.target.value}))} placeholder="Describe the long-term issue"/></div><div className="fg"><label>Owner</label><select value={fLI.owner} onChange={e=>setFLI(f=>({...f,owner:e.target.value}))}><option value="">Assign to...</option>{biz.users.map(u=><option key={u.id} value={u.name}>{u.name}</option>)}</select></div><div style={{display:"flex",gap:8}}><button className="btn btn-sm bdk" onClick={()=>{if(!fLI.title)return;upPlan({longTermIssues:[...(plan.longTermIssues||[]),{id:uid(),...fLI}]});setFLI({title:"",owner:""});setAddLI(false)}}>Add Issue</button><button className="btn btn-sm bol" onClick={()=>setAddLI(false)}>Cancel</button></div></div>}
        </div>
      </div>
    </div>}

    {tab===1&&<div className="g2">
      {/* 1-YEAR */}
      <div className="card">
        <div className="ch"><div className="ct">1-Year Goals</div><span className="bdg bgold">Annual</span></div>
        <div className="g2">
          <EF label="Future Date" val={plan.oneYear?.date} up={v=>upOne({date:v})} ph="2026-01-01"/>
          <div/>
        </div>
        <div className="g2">
          <EF label="Revenue Target" val={plan.oneYear?.revenue} up={v=>upOne({revenue:v})} ph="$8M"/>
          <EF label="Profit Target" val={plan.oneYear?.profit} up={v=>upOne({profit:v})} ph="$1.2M"/>
        </div>

        {/* 1-Year Measurables */}
        <div className="vs">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <div className="vl">Measurables</div>
            {canEdit&&<button className="btn btn-xs bol" onClick={()=>setAdd1M(o=>!o)}>{add1M?"Cancel":"＋ Add"}</button>}
          </div>
          {(plan.oneYear?.measurables||[]).map((m,i)=><div key={m.id} style={{display:"flex",gap:8,marginBottom:4,alignItems:"center"}}>
            {canEdit?<><input value={m.label} onChange={e=>upOne({measurables:plan.oneYear.measurables.map((x,j)=>j===i?{...x,label:e.target.value}:x)})} style={{flex:2,padding:"5px 8px",border:"1.5px solid var(--mist)",borderRadius:5,fontSize:12,fontFamily:"'Inter',sans-serif"}}/><input value={m.value} onChange={e=>upOne({measurables:plan.oneYear.measurables.map((x,j)=>j===i?{...x,value:e.target.value}:x)})} style={{flex:1,padding:"5px 8px",border:"1.5px solid var(--mist)",borderRadius:5,fontSize:12,fontFamily:"'Inter',sans-serif",fontWeight:600}}/><button className="btn btn-xs bol" style={{color:"var(--rust)",borderColor:"rgba(187,77,56,.25)"}} onClick={()=>upOne({measurables:plan.oneYear.measurables.filter((_,j)=>j!==i)})}>✕</button></>
            :<div style={{display:"flex",justifyContent:"space-between",flex:1,padding:"5px 0",borderBottom:"1px solid var(--mist)",fontSize:12}}><span>{m.label}</span><span style={{fontWeight:600}}>{m.value}</span></div>}
          </div>)}
          {canEdit&&add1M&&<div className="inf" style={{marginTop:8}}><div className="g2"><div className="fg"><label>Label</label><input value={f1M.label} onChange={e=>setF1M(f=>({...f,label:e.target.value}))} placeholder="e.g. ARR"/></div><div className="fg"><label>Target</label><input value={f1M.value} onChange={e=>setF1M(f=>({...f,value:e.target.value}))} placeholder="e.g. $8M"/></div></div><div style={{display:"flex",gap:8}}><button className="btn btn-sm bdk" onClick={()=>{if(!f1M.label)return;upOne({measurables:[...(plan.oneYear?.measurables||[]),{id:uid(),...f1M}]});setF1M({label:"",value:""});setAdd1M(false)}}>Add</button><button className="btn btn-sm bol" onClick={()=>setAdd1M(false)}>Cancel</button></div></div>}
        </div>

        {/* Annual Goals */}
        <div className="vs" style={{marginTop:12}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <div className="vl">Annual Goals (3–5)</div>
            {canEdit&&<button className="btn btn-xs bol" onClick={()=>setAdd1G(o=>!o)}>{add1G?"Cancel":"＋ Add"}</button>}
          </div>
          {(plan.oneYear?.goals||[]).map((g,i)=><div key={i} style={{display:"flex",gap:8,marginBottom:6,alignItems:"center"}}>
            <span style={{color:"var(--gold)",fontWeight:700,minWidth:18,fontSize:13}}>{i+1}.</span>
            {canEdit?<><input value={g} onChange={e=>upOne({goals:plan.oneYear.goals.map((x,j)=>j===i?e.target.value:x)})} style={{flex:1,padding:"5px 8px",border:"1.5px solid var(--mist)",borderRadius:5,fontSize:12,fontFamily:"'Inter',sans-serif"}}/><button className="btn btn-xs bol" style={{color:"var(--rust)",borderColor:"rgba(187,77,56,.25)"}} onClick={()=>upOne({goals:plan.oneYear.goals.filter((_,j)=>j!==i)})}>✕</button></>
            :<span style={{fontSize:13}}>{g}</span>}
          </div>)}
          {canEdit&&add1G&&<div className="inf" style={{marginTop:8}}><div className="fg"><label>Annual Goal</label><input value={f1G} onChange={e=>setF1G(e.target.value)} placeholder="e.g. Hire VP Sales"/></div><div style={{display:"flex",gap:8}}><button className="btn btn-sm bdk" onClick={()=>{if(!f1G)return;upOne({goals:[...(plan.oneYear?.goals||[]),f1G]});setF1G("");setAdd1G(false)}}>Add Goal</button><button className="btn btn-sm bol" onClick={()=>setAdd1G(false)}>Cancel</button></div></div>}
        </div>
      </div>

      {/* QUARTERLY */}
      <div className="card">
        <div className="ch"><div className="ct">Quarterly Goals</div><span className="bdg bg">This Quarter</span></div>
        <EF label="Quarter End Date" val={plan.quarterly?.date} up={v=>upQ({date:v})} ph="2025-06-30"/>
        <EF label="Quarter Goal Statement" val={plan.quarterly?.goal} up={v=>upQ({goal:v})} multi ph="What is the one thing this quarter is about?"/>
        <div className="g2">
          <EF label="Revenue Target" val={plan.quarterly?.revenue} up={v=>upQ({revenue:v})} ph="$2M"/>
          <EF label="Profit Target" val={plan.quarterly?.profit} up={v=>upQ({profit:v})} ph="$300K"/>
        </div>

        {/* Quarterly Measurables */}
        <div className="vs">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <div className="vl">Measurables</div>
            {canEdit&&<button className="btn btn-xs bol" onClick={()=>setAddQM(o=>!o)}>{addQM?"Cancel":"＋ Add"}</button>}
          </div>
          {(plan.quarterly?.measurables||[]).map((m,i)=><div key={m.id} style={{display:"flex",gap:8,marginBottom:4,alignItems:"center"}}>
            {canEdit?<><input value={m.label} onChange={e=>upQ({measurables:plan.quarterly.measurables.map((x,j)=>j===i?{...x,label:e.target.value}:x)})} style={{flex:2,padding:"5px 8px",border:"1.5px solid var(--mist)",borderRadius:5,fontSize:12,fontFamily:"'Inter',sans-serif"}}/><input value={m.value} onChange={e=>upQ({measurables:plan.quarterly.measurables.map((x,j)=>j===i?{...x,value:e.target.value}:x)})} style={{flex:1,padding:"5px 8px",border:"1.5px solid var(--mist)",borderRadius:5,fontSize:12,fontFamily:"'Inter',sans-serif",fontWeight:600}}/><button className="btn btn-xs bol" style={{color:"var(--rust)",borderColor:"rgba(187,77,56,.25)"}} onClick={()=>upQ({measurables:plan.quarterly.measurables.filter((_,j)=>j!==i)})}>✕</button></>
            :<div style={{display:"flex",justifyContent:"space-between",flex:1,padding:"5px 0",borderBottom:"1px solid var(--mist)",fontSize:12}}><span>{m.label}</span><span style={{fontWeight:600}}>{m.value}</span></div>}
          </div>)}
          {canEdit&&addQM&&<div className="inf" style={{marginTop:8}}><div className="g2"><div className="fg"><label>Label</label><input value={fQM.label} onChange={e=>setFQM(f=>({...f,label:e.target.value}))} placeholder="e.g. New MRR"/></div><div className="fg"><label>Target</label><input value={fQM.value} onChange={e=>setFQM(f=>({...f,value:e.target.value}))} placeholder="e.g. $150K"/></div></div><div style={{display:"flex",gap:8}}><button className="btn btn-sm bdk" onClick={()=>{if(!fQM.label)return;upQ({measurables:[...(plan.quarterly?.measurables||[]),{id:uid(),...fQM}]});setFQM({label:"",value:""});setAddQM(false)}}>Add</button><button className="btn btn-sm bol" onClick={()=>setAddQM(false)}>Cancel</button></div></div>}
        </div>
      </div>
    </div>}
  </div>;
}

function OrgChart({biz}){
  const seats=biz.orgChart?.seats||[];
  const roots=seats.filter(s=>!s.parentId);
  const childrenOf=id=>seats.filter(s=>s.parentId===id);
  const Node=({seat,depth=0})=>{
    const kids=childrenOf(seat.id);
    return <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
      <div className={`oc-node ${!seat.parentId?"root":""}`} style={{borderLeft:`3px solid ${biz.color||"var(--gold)"}`}}>
        <div className="oc-seat">{seat.title}</div>
        <div className={`oc-person ${seat.person==="Open"?"open":""}`}>{seat.person==="Open"?"— Open —":seat.person}</div>
        {seat.accountabilities?.length>0&&<div style={{marginTop:8,borderTop:"1px solid var(--mist)",paddingTop:6}}>{seat.accountabilities.map((a,i)=><div key={i} style={{fontSize:10,color:"var(--slate)",marginBottom:2}}>· {a}</div>)}</div>}
      </div>
      {kids.length>0&&<><div className="oc-line"/><div className="oc-row">{kids.map((k,i)=><Node key={k.id} seat={k} depth={depth+1}/>)}</div></>}
    </div>;
  };
  return <div className="card"><div className="ch"><div className="ct">Organisational Chart</div><span className="bdg bsl">{seats.length} Seats</span></div>
    {!seats.length&&<div className="est">No org chart defined yet.</div>}
    <div className="oc-wrap">{roots.map(r=><Node key={r.id} seat={r}/>)}</div>
  </div>;
}

function Rocks({biz,setBiz,cu}){
  const [adding,setAdding]=useState(false);
  const [f,setF]=useState({title:"",owner:"",dueDate:"",status:"on-track",progress:0});
  const canEdit=cu.role==="owner";
  const save=()=>{if(!f.title)return;setBiz(b=>({...b,rocks:[...(b.rocks||[]),{id:Date.now(),...f,progress:Number(f.progress),milestones:[]}]}));setF({title:"",owner:"",dueDate:"",status:"on-track",progress:0});setAdding(false)};
  return <div className="card"><div className="ch"><div className="ct">Rocks — 90-Day Priorities</div>{canEdit&&<button className="btn btn-sm bdk" onClick={()=>setAdding(!adding)}>＋ Add Rock</button>}</div>
    {adding&&canEdit&&<div className="inf"><div className="g2"><div className="fg"><label>Rock Title</label><input value={f.title} onChange={e=>setF(x=>({...x,title:e.target.value}))} placeholder="What needs to get done?"/></div><div className="fg"><label>Owner</label><select value={f.owner} onChange={e=>setF(x=>({...x,owner:e.target.value}))}><option value="">Select...</option>{biz.users.map(u=><option key={u.id} value={u.name}>{u.name}</option>)}</select></div></div><div className="g2"><div className="fg"><label>Due Date</label><input type="date" value={f.dueDate} onChange={e=>setF(x=>({...x,dueDate:e.target.value}))}/></div><div className="fg"><label>Status</label><select value={f.status} onChange={e=>setF(x=>({...x,status:e.target.value}))}><option value="on-track">On Track</option><option value="off-track">Off Track</option></select></div></div><div className="fg"><label>Progress %</label><input type="number" min="0" max="100" value={f.progress} onChange={e=>setF(x=>({...x,progress:e.target.value}))}/></div><div style={{display:"flex",gap:8}}><button className="btn bdk" onClick={save}>Save Rock</button><button className="btn bol" onClick={()=>setAdding(false)}>Cancel</button></div></div>}
    {!(biz.rocks||[]).length&&<div className="est">No rocks set.</div>}
    {(biz.rocks||[]).map(rock=><div className="ri" key={rock.id}><div className={`rd ${rock.status==="on-track"?"don":"doff"}`}/><div className="rin"><div className="rt">{rock.title}</div><div className="rm">Owner: {rock.owner} · Due: {rock.dueDate}</div><div className="pb"><div className={`pf ${rock.status!=="on-track"?"off":""}`} style={{width:`${rock.progress}%`}}/></div>{(rock.milestones||[]).length>0&&<div style={{display:"flex",gap:6,marginTop:6,flexWrap:"wrap"}}>{rock.milestones.map(m=><span key={m.id} style={{fontSize:10,color:m.done?"var(--sage)":"var(--slate)",textDecoration:m.done?"line-through":"none"}}>{'· '}{m.text}</span>)}</div>}</div><div style={{textAlign:"right"}}><div style={{fontSize:16,fontWeight:700,color:rock.status==="on-track"?"var(--sage)":"var(--rust)"}}>{rock.progress}%</div><span className={`bdg ${rock.status==="on-track"?"bg":"br"}`}>{rock.status==="on-track"?"On Track":"Off Track"}</span></div></div>)}
  </div>;
}

function Scorecard({biz,setBiz,cu}){
  const [tab,setTab]=useState("weekly");
  const [adding,setAdding]=useState(false);
  const [f,setF]=useState({metric:"",owner:"",goal:"",goalType:"min",freq:"weekly"});
  const freqs=["weekly","monthly","quarterly"];
  const filtered=(biz.scorecard||[]).filter(s=>s.freq===tab);
  const save=()=>{if(!f.metric)return;setBiz(b=>({...b,scorecard:[...(b.scorecard||[]),{id:Date.now(),...f,values:[]}]}));setF({metric:"",owner:"",goal:"",goalType:"min",freq:"weekly"});setAdding(false)};
  return <div className="card"><div className="ch"><div className="ct">Scorecard</div>{cu.role==="owner"&&<button className="btn btn-sm bdk" onClick={()=>setAdding(!adding)}>＋ Add Metric</button>}</div>
    <div className="tabs" style={{maxWidth:400}}>{freqs.map(fr=><button key={fr} className={`tab ${tab===fr?"on":""}`} onClick={()=>setTab(fr)}>{fr.charAt(0).toUpperCase()+fr.slice(1)}</button>)}</div>
    {adding&&<div className="inf"><div className="g2"><div className="fg"><label>Metric</label><input value={f.metric} onChange={e=>setF(x=>({...x,metric:e.target.value}))} placeholder="e.g. Weekly Revenue"/></div><div className="fg"><label>Owner</label><select value={f.owner} onChange={e=>setF(x=>({...x,owner:e.target.value}))}><option value="">Select...</option>{biz.users.map(u=><option key={u.id} value={u.name}>{u.name}</option>)}</select></div></div><div className="g2"><div className="fg"><label>Goal</label><input value={f.goal} onChange={e=>setF(x=>({...x,goal:e.target.value}))} placeholder="e.g. 45000"/></div><div className="fg"><label>Goal Type</label><select value={f.goalType} onChange={e=>setF(x=>({...x,goalType:e.target.value}))}><option value="min">Minimum (≥)</option><option value="max">Maximum (≤)</option></select></div></div><div className="fg"><label>Frequency</label><select value={f.freq} onChange={e=>setF(x=>({...x,freq:e.target.value}))}>{freqs.map(fr=><option key={fr} value={fr}>{fr}</option>)}</select></div><div style={{display:"flex",gap:8}}><button className="btn bdk" onClick={save}>Save</button><button className="btn bol" onClick={()=>setAdding(false)}>Cancel</button></div></div>}
    {!filtered.length&&<div className="est">No {tab} metrics yet.</div>}
    {filtered.length>0&&<div style={{overflowX:"auto"}}><table className="sct">
      <thead><tr><th>Who</th><th>Metric</th><th>Goal</th><th>Trend</th><th>Avg</th>{filtered[0]?.values.map((v,i)=><th key={i} style={{textAlign:"center"}}>{v.wk}</th>)}<th style={{textAlign:"center"}}>Latest</th></tr></thead>
      <tbody>{filtered.map(row=>{
        const last=row.values.length?row.values[row.values.length-1]?.v:null;
        const avg=row.values.length?Math.round(row.values.reduce((a,b)=>a+b.v,0)/row.values.length):null;
        const isGood=last!==null?(row.goalType==="min"?last>=Number(row.goal):last<=Number(row.goal)):null;
        return <tr key={row.id}><td><Avatar name={row.owner}/></td><td style={{fontWeight:500}}>{row.metric}</td><td><span className="bdg bsl">{row.goalType==="min"?"≥":"≤"} {row.goal}</span></td><td><Sparkline values={row.values} goal={row.goal} goalType={row.goalType}/></td><td style={{color:"var(--slate)",fontSize:11}}>{avg!==null?avg.toLocaleString():"—"}</td>{row.values.map((v,i)=>{const g=row.goalType==="min"?v.v>=Number(row.goal):v.v<=Number(row.goal);return <td key={i} style={{textAlign:"center"}}><span className={`wkc ${g?"met":"mss"}`}>{v.v>999?`${(v.v/1000).toFixed(0)}k`:v.v}</span></td>})}<td style={{textAlign:"center"}}>{isGood!==null?<span className={`wkc ${isGood?"met":"mss"}`}>{last!==null?(last>999?`${(last/1000).toFixed(0)}k`:last):"—"}</span>:<span className="wkc mna">—</span>}</td></tr>;
      })}</tbody>
    </table></div>}
  </div>;
}

function Issues({biz,setBiz,cu}){
  const [tab,setTab]=useState("short");
  const [adding,setAdding]=useState(false);
  const [f,setF]=useState({title:"",owner:"",priority:"medium",type:"short"});
  const canEdit=i=>cu.role==="owner"||i.owner===cu.name;
  const add=()=>{if(!f.title)return;setBiz(b=>({...b,issues:[...(b.issues||[]),{id:Date.now(),...f,status:"open",date:today()}]}));setF({title:"",owner:"",priority:"medium",type:"short"});setAdding(false)};
  const toggle=id=>setBiz(b=>({...b,issues:b.issues.map(i=>i.id===id&&canEdit(i)?{...i,status:i.status==="open"?"solved":"open"}:i)}));
  const views={short:(biz.issues||[]).filter(i=>i.type==="short"&&i.status==="open"),long:(biz.issues||[]).filter(i=>i.type==="long"&&i.status==="open"),solved:(biz.issues||[]).filter(i=>i.status==="solved")};
  const cur=views[tab]||[];
  return <div className="card"><div className="ch"><div className="ct">Issues (IDS)</div><button className="btn btn-sm bdk" onClick={()=>setAdding(!adding)}>＋ Add Issue</button></div>
    <div className="tabs">{[["short","Short Term"],["long","Long Term"],["solved","Solved"]].map(([v,l])=><button key={v} className={`tab ${tab===v?"on":""}`} onClick={()=>setTab(v)}>{l} {views[v].length>0&&`(${views[v].length})`}</button>)}</div>
    {adding&&<div className="inf"><div className="g2"><div className="fg"><label>Issue</label><input value={f.title} onChange={e=>setF(x=>({...x,title:e.target.value}))} placeholder="Describe the issue"/></div><div className="fg"><label>Owner</label><select value={f.owner} onChange={e=>setF(x=>({...x,owner:e.target.value}))}><option value="">Assign to...</option>{biz.users.map(u=><option key={u.id} value={u.name}>{u.name}</option>)}</select></div></div><div className="g2"><div className="fg"><label>Priority</label><select value={f.priority} onChange={e=>setF(x=>({...x,priority:e.target.value}))}><option value="high">High</option><option value="medium">Medium</option><option value="low">Low</option></select></div><div className="fg"><label>Type</label><select value={f.type} onChange={e=>setF(x=>({...x,type:e.target.value}))}><option value="short">Short Term</option><option value="long">Long Term</option></select></div></div><div style={{display:"flex",gap:8}}><button className="btn bdk" onClick={add}>Add Issue</button><button className="btn bol" onClick={()=>setAdding(false)}>Cancel</button></div></div>}
    {!cur.length&&<div className="est">No {tab} issues.</div>}
    {cur.map(issue=><div className="ii" key={issue.id}><div className={`ibar ${issue.priority==="high"?"hip":issue.priority==="medium"?"mip":"lip"}`}/><div style={{flex:1}}><div style={{fontSize:13,fontWeight:500}}>{issue.title}</div><div style={{fontSize:11,color:"var(--slate)",marginTop:2}}>{issue.owner} · {issue.date}</div></div><span className={`bdg ${issue.priority==="high"?"br":issue.priority==="medium"?"bgold":"bsl"}`} style={{marginRight:8}}>{issue.priority}</span>{canEdit(issue)&&<button className="btn btn-xs bol" onClick={()=>toggle(issue.id)}>{tab==="solved"?"Reopen":"Solve"}</button>}</div>)}
  </div>;
}

function Todos({biz,setBiz,cu,onRemind}){
  const [adding,setAdding]=useState(false);
  const [f,setF]=useState({title:"",owner:"",dueDate:""});
  const canToggle=t=>cu.role==="owner"||t.owner===cu.name;
  const visible=(biz.todos||[]).filter(t=>cu.role==="owner"||t.owner===cu.name);
  const add=()=>{if(!f.title)return;setBiz(b=>({...b,todos:[...(b.todos||[]),{id:Date.now(),...f,done:false}]}));setF({title:"",owner:"",dueDate:""});setAdding(false)};
  const toggle=id=>setBiz(b=>({...b,todos:b.todos.map(t=>t.id===id&&canToggle(t)?{...t,done:!t.done}:t)}));
  const pct=visible.length?Math.round(visible.filter(t=>t.done).length/visible.length*100):0;
  return <div className="card"><div className="ch"><div className="ct">To-Dos</div><div style={{display:"flex",gap:8}}><button className="btn btn-sm bol" onClick={onRemind}>📧 Reminders</button><button className="btn btn-sm bdk" onClick={()=>setAdding(!adding)}>＋ Add</button></div></div>
    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}><div style={{flex:1,height:5,background:"var(--mist)",borderRadius:3}}><div style={{height:"100%",width:`${pct}%`,background:"var(--sage)",borderRadius:3,transition:"width .3s"}}/></div><span style={{fontSize:12,fontWeight:600,color:"var(--slate)"}}>{pct}% done</span></div>
    {adding&&<div className="inf"><div className="g2"><div className="fg"><label>Task</label><input value={f.title} onChange={e=>setF(x=>({...x,title:e.target.value}))} placeholder="What needs doing?"/></div><div className="fg"><label>Assign To</label><select value={f.owner} onChange={e=>setF(x=>({...x,owner:e.target.value}))}><option value="">Select...</option>{biz.users.map(u=><option key={u.id} value={u.name}>{u.name}</option>)}</select></div></div><div className="fg"><label>Due Date</label><input type="date" value={f.dueDate} onChange={e=>setF(x=>({...x,dueDate:e.target.value}))}/></div><div style={{display:"flex",gap:8}}><button className="btn bdk" onClick={add}>Save</button><button className="btn bol" onClick={()=>setAdding(false)}>Cancel</button></div></div>}
    {!visible.length&&<div className="est">No to-dos yet.</div>}
    {visible.map(t=><div className="tdi" key={t.id} onClick={()=>canToggle(t)&&toggle(t.id)}><div className={`tck ${t.done?"dn":""}`}>{t.done?"✓":""}</div><div style={{flex:1}}><div style={{fontSize:13,fontWeight:500,textDecoration:t.done?"line-through":"none",color:t.done?"var(--slate)":"var(--ink)"}}>{t.title}</div><div style={{fontSize:11,color:"var(--slate)",marginTop:1}}>{t.owner} · Due {t.dueDate}</div></div>{t.done&&<span className="bdg bg">Done</span>}</div>)}
  </div>;
}

function Headlines({biz,setBiz,cu}){
  const [f,setF]=useState({text:""});
  const add=()=>{if(!f.text)return;setBiz(b=>({...b,headlines:[{id:Date.now(),owner:cu.name,text:f.text,date:today()},...(b.headlines||[])]}));setF({text:""})};
  return <div className="card"><div className="ch"><div className="ct">Headlines</div></div>
    <div style={{display:"flex",gap:8,marginBottom:16}}><input value={f.text} onChange={e=>setF({text:e.target.value})} placeholder="Share a win or update..." style={{flex:1,padding:"9px 12px",border:"1.5px solid var(--mist)",borderRadius:7,fontFamily:"'Inter',sans-serif",fontSize:13,color:"var(--ink)"}}/><button className="btn bdk" onClick={add}>Post</button></div>
    {!(biz.headlines||[]).length&&<div className="est">No headlines yet.</div>}
    {(biz.headlines||[]).map(h=><div className="hl" key={h.id}><Avatar name={h.owner}/><div><div className="hl-text">🎉 {h.text}</div><div className="hl-meta">{h.owner} · {h.date}</div></div></div>)}
  </div>;
}

function MeetingPulse({biz,setBiz,onSendSummary}){
  const [tab,setTab]=useState("notes");
  const [adding,setAdding]=useState(false);
  const [running,setRunning]=useState(null);
  const [segIdx,setSegIdx]=useState(0);
  const [secs,setSecs]=useState(0);
  const [timerOn,setTimerOn]=useState(false);
  const [f,setF]=useState({date:"",attendees:"",segue:"",headlines:"",rocks:"",issues:"",todos:"",rating:8});
  const timerRef=useRef();

  useEffect(()=>{if(timerOn){timerRef.current=setInterval(()=>setSecs(s=>s+1),1000)}else clearInterval(timerRef.current);return()=>clearInterval(timerRef.current)},[timerOn]);

  const SEGS=[{name:"Check-in",mins:5},{name:"Goals Review",mins:5},{name:"Metrics Review",mins:5},{name:"Headlines",mins:5},{name:"To-dos Review",mins:5},{name:"Issues (IDS)",mins:60},{name:"Wrap-up & Rating",mins:5}];
  const fmt=s=>`${Math.floor(s/60).toString().padStart(2,"0")}:${(s%60).toString().padStart(2,"0")}`;
  const save=()=>{setBiz(b=>({...b,meetingNotes:[...(b.meetingNotes||[]),{id:Date.now(),type:"L10",...f,emailSent:false}]}));setF({date:"",attendees:"",segue:"",headlines:"",rocks:"",issues:"",todos:"",rating:8});setAdding(false)};

  return <div>
    <div className="tabs">{[["notes","Meeting Notes"],["runner","Run L10"]].map(([v,l])=><button key={v} className={`tab ${tab===v?"on":""}`} onClick={()=>setTab(v)}>{l}</button>)}</div>
    {tab==="notes"&&<><div className="card"><div className="ch"><div className="ct">L10 Meeting Notes</div><button className="btn btn-sm bdk" onClick={()=>setAdding(!adding)}>＋ New Meeting</button></div>
      {adding&&<div className="inf"><div className="g2"><div className="fg"><label>Date</label><input type="date" value={f.date} onChange={e=>setF(x=>({...x,date:e.target.value}))}/></div><div className="fg"><label>Attendees</label><input value={f.attendees} onChange={e=>setF(x=>({...x,attendees:e.target.value}))} placeholder="Who attended?"/></div></div>{["segue","headlines","rocks","issues","todos"].map(field=><div key={field} className="fg"><label>{field.charAt(0).toUpperCase()+field.slice(1)}</label><textarea value={f[field]} onChange={e=>setF(x=>({...x,[field]:e.target.value}))} placeholder={`Notes on ${field}...`} style={{minHeight:52}}/></div>)}<div className="fg"><label>Meeting Rating (1–10)</label><input type="number" min="1" max="10" value={f.rating} onChange={e=>setF(x=>({...x,rating:Number(e.target.value)}))}/></div><div style={{display:"flex",gap:8}}><button className="btn bdk" onClick={save}>Save Notes</button><button className="btn bol" onClick={()=>setAdding(false)}>Cancel</button></div></div>}
      {!(biz.meetingNotes||[]).length&&!adding&&<div className="est">No meeting notes yet.</div>}
      {(biz.meetingNotes||[]).map(note=><div className="mn" key={note.id}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}><div style={{fontSize:11,fontWeight:700,color:"var(--slate)",textTransform:"uppercase",letterSpacing:.5}}>{note.type} · {note.date}</div><div style={{display:"flex",gap:6,alignItems:"center"}}>{note.emailSent&&<span className="bdg bg">✓ Sent</span>}{note.rating&&<span className="bdg bsl">⭐ {note.rating}/10</span>}<button className="btn btn-xs bol" onClick={()=>onSendSummary(note)}>📧 Summary</button></div></div>{[["Attendees",note.attendees],["Segue",note.segue],["Headlines",note.headlines],["Rocks",note.rocks],["Issues",note.issues],["To-Dos",note.todos]].filter(([,v])=>v).map(([k,v])=><div className="mr" key={k}><div className="mk">{k}</div><div className="mv">{v}</div></div>)}</div>)}
    </div></>}
    {tab==="runner"&&<div className="card"><div className="ch"><div className="ct">L10 Meeting Runner</div><div style={{display:"flex",gap:8}}><button className="btn btn-sm bsage" onClick={()=>setTimerOn(t=>!t)}>{timerOn?"⏸ Pause":"▶ Start"}</button><button className="btn btn-sm bol" onClick={()=>{setSecs(0);setTimerOn(false);setSegIdx(0)}}>Reset</button></div></div>
      <div className="timer" style={{color:secs>SEGS[segIdx]?.mins*60?"var(--rust)":"var(--ink)"}}>{fmt(secs)}</div>
      <div style={{fontSize:12,textAlign:"center",color:"var(--slate)",marginBottom:18}}>Segment {segIdx+1} of {SEGS.length} — {SEGS[segIdx]?.name} · {SEGS[segIdx]?.mins} min suggested</div>
      <div style={{display:"flex",gap:8,justifyContent:"center",marginBottom:20}}>
        <button className="btn bol" disabled={segIdx===0} onClick={()=>{setSegIdx(i=>i-1);setSecs(0)}}>← Prev</button>
        <button className="btn bdk" disabled={segIdx===SEGS.length-1} onClick={()=>{setSegIdx(i=>i+1);setSecs(0)}}>Next Segment →</button>
      </div>
      {SEGS.map((seg,i)=><div key={i} className={`mr-seg ${i===segIdx?"cur":""}`}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><div className="mr-sname">{seg.name}</div><div className="mr-sdur">{seg.mins} min suggested</div></div>{i<segIdx&&<span className="bdg bg">✓ Done</span>}{i===segIdx&&<span className="bdg bgold">● Active</span>}</div></div>)}
    </div>}
  </div>;
}

function RPRS({biz,setBiz,cu}){
  const [adding,setAdding]=useState(false);
  const [f,setF]=useState({employee:"",seat:"",getsIt:true,wantsIt:true,hasCapacity:true,cvFit:5,notes:""});
  const canEdit=cu.role==="owner";
  const add=()=>{if(!f.employee)return;setBiz(b=>({...b,rprs:[...(b.rprs||[]),{id:Date.now(),...f}]}));setF({employee:"",seat:"",getsIt:true,wantsIt:true,hasCapacity:true,cvFit:5,notes:""});setAdding(false)};
  const GWC=({val,onChange,label})=><div style={{marginBottom:12}}><div style={{fontSize:10,fontWeight:600,letterSpacing:.8,textTransform:"uppercase",color:"var(--slate)",marginBottom:5}}>{label}</div><div className="gwc"><div className={`gwcb ${val?"y":"n"}`} onClick={()=>canEdit&&onChange(true)}>G</div><div className={`gwcb ${!val?"y":"n"}`} style={{opacity:.5}} onClick={()=>canEdit&&onChange(false)}>✗</div></div></div>;
  return <div className="card"><div className="ch"><div className="ct">Right Person Right Seat</div>{canEdit&&<button className="btn btn-sm bdk" onClick={()=>setAdding(!adding)}>＋ Add Assessment</button>}</div>
    {adding&&canEdit&&<div className="inf"><div className="g2"><div className="fg"><label>Employee</label><select value={f.employee} onChange={e=>setF(x=>({...x,employee:e.target.value}))}><option value="">Select...</option>{biz.users.map(u=><option key={u.id} value={u.name}>{u.name}</option>)}</select></div><div className="fg"><label>Seat / Role</label><input value={f.seat} onChange={e=>setF(x=>({...x,seat:e.target.value}))} placeholder="e.g. Head of Sales"/></div></div><div className="g2"><GWC val={f.getsIt} onChange={v=>setF(x=>({...x,getsIt:v}))} label="Gets It"/><GWC val={f.wantsIt} onChange={v=>setF(x=>({...x,wantsIt:v}))} label="Wants It"/></div><GWC val={f.hasCapacity} onChange={v=>setF(x=>({...x,hasCapacity:v}))} label="Has Capacity"/><div className="fg"><label>Core Values Fit (1–5)</label><input type="number" min="1" max="5" value={f.cvFit} onChange={e=>setF(x=>({...x,cvFit:Number(e.target.value)}))}/></div><div className="fg"><label>Notes</label><textarea value={f.notes} onChange={e=>setF(x=>({...x,notes:e.target.value}))} style={{minHeight:56}}/></div><div style={{display:"flex",gap:8}}><button className="btn bdk" onClick={add}>Save</button><button className="btn bol" onClick={()=>setAdding(false)}>Cancel</button></div></div>}
    {!(biz.rprs||[]).length&&<div className="est">No assessments yet.</div>}
    <div className="g2">{(biz.rprs||[]).map(r=>{const rp=r.getsIt&&r.wantsIt&&r.hasCapacity;return <div key={r.id} style={{background:"var(--cream)",borderRadius:8,padding:14}}><div style={{display:"flex",gap:10,alignItems:"center",marginBottom:10}}><Avatar name={r.employee}/><div><div style={{fontWeight:600,fontSize:13}}>{r.employee}</div><div style={{fontSize:11,color:"var(--slate)"}}>{r.seat}</div></div><span className={`bdg ${rp?"bg":"br"}`} style={{marginLeft:"auto"}}>{rp?"✓ RPRS":"⚠ Review"}</span></div><div style={{display:"flex",gap:8,marginBottom:8}}>{[["G",r.getsIt],["W",r.wantsIt],["C",r.hasCapacity]].map(([l,v])=><div key={l} className={`gwcb ${v?"y":"n"}`} style={{cursor:"default"}}>{l}</div>)}</div><div style={{fontSize:11,color:"var(--slate)"}}>CV Fit: {"★".repeat(r.cvFit)}{"☆".repeat(5-r.cvFit)}</div>{r.notes&&<div style={{fontSize:11,color:"var(--slate)",marginTop:6,fontStyle:"italic"}}>{r.notes}</div>}</div>})}</div>
  </div>;
}

function OneOnOnes({biz,setBiz,cu}){
  const [adding,setAdding]=useState(false);
  const [f,setF]=useState({employee:"",manager:"",date:"",quarter:"",highlights:"",challenges:"",goals:"",rating:4});
  const canEdit=cu.role==="owner";
  const add=()=>{if(!f.employee)return;setBiz(b=>({...b,oneOnOnes:[...(b.oneOnOnes||[]),{id:Date.now(),...f,archived:false}]}));setF({employee:"",manager:"",date:"",quarter:"",highlights:"",challenges:"",goals:"",rating:4});setAdding(false)};
  return <div className="card"><div className="ch"><div className="ct">Quarterly 1:1s</div>{canEdit&&<button className="btn btn-sm bdk" onClick={()=>setAdding(!adding)}>＋ New 1:1</button>}</div>
    {adding&&canEdit&&<div className="inf"><div className="g2"><div className="fg"><label>Employee</label><select value={f.employee} onChange={e=>setF(x=>({...x,employee:e.target.value}))}><option value="">Select...</option>{biz.users.map(u=><option key={u.id} value={u.name}>{u.name}</option>)}</select></div><div className="fg"><label>Manager</label><select value={f.manager} onChange={e=>setF(x=>({...x,manager:e.target.value}))}><option value="">Select...</option>{biz.users.map(u=><option key={u.id} value={u.name}>{u.name}</option>)}</select></div></div><div className="g2"><div className="fg"><label>Date</label><input type="date" value={f.date} onChange={e=>setF(x=>({...x,date:e.target.value}))}/></div><div className="fg"><label>Quarter</label><input value={f.quarter} onChange={e=>setF(x=>({...x,quarter:e.target.value}))} placeholder="e.g. Q1 2025"/></div></div>{["highlights","challenges","goals"].map(field=><div key={field} className="fg"><label>{field.charAt(0).toUpperCase()+field.slice(1)}</label><textarea value={f[field]} onChange={e=>setF(x=>({...x,[field]:e.target.value}))} style={{minHeight:52}}/></div>)}<div className="fg"><label>Rating (1–5)</label><input type="number" min="1" max="5" value={f.rating} onChange={e=>setF(x=>({...x,rating:Number(e.target.value)}))}/></div><div style={{display:"flex",gap:8}}><button className="btn bdk" onClick={add}>Save 1:1</button><button className="btn bol" onClick={()=>setAdding(false)}>Cancel</button></div></div>}
    {!(biz.oneOnOnes||[]).length&&<div className="est">No 1:1 reviews yet.</div>}
    {(biz.oneOnOnes||[]).map(o=><div key={o.id} style={{background:"var(--cream)",borderRadius:8,padding:14,marginBottom:10}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}><div><div style={{fontWeight:600,fontSize:13}}>{o.employee} ↔ {o.manager}</div><div style={{fontSize:11,color:"var(--slate)",marginTop:1}}>{o.quarter} · {o.date}</div></div><div style={{display:"flex",gap:6,alignItems:"center"}}><span className="bdg bsl">{"★".repeat(o.rating)}</span></div></div>{[["Highlights",o.highlights],["Challenges",o.challenges],["Goals",o.goals]].filter(([,v])=>v).map(([k,v])=><div className="mr" key={k}><div className="mk">{k}</div><div className="mv">{v}</div></div>)}</div>)}
  </div>;
}

// ─── COACH OVERVIEW ───────────────────────────────────────────────────────────
function CoachOverview({businesses,onSelect,onAdd,onUsers}){
  return <div>
    <div className="wb"><div className="wbt"><h2>The Wealth Network</h2><p>{Object.keys(businesses).length} active business clients</p></div><button className="btn bdk" onClick={onAdd}>＋ Add Business Client</button></div>
    <div className="g3">{Object.values(businesses).map(biz=>{
      const onTrack=(biz.rocks||[]).filter(r=>r.status==="on-track").length;
      const openIss=(biz.issues||[]).filter(i=>i.status==="open").length;
      return <div key={biz.id} className="cc" onClick={()=>onSelect(biz)}>
        <div style={{position:"absolute",left:0,top:0,bottom:0,width:4,background:biz.color,borderRadius:"10px 0 0 10px"}}/>
        <div className="cn">{biz.company}</div>
        <div className="csub">{biz.industry||"Business"} · {biz.users.length} user{biz.users.length!==1?"s":""}</div>
        <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:10}}>
          <span className="bdg bg">{onTrack}/{(biz.rocks||[]).length} Rocks</span>
          <span className="bdg br">{openIss} Issues</span>
          <span className="bdg bsl">{(biz.todos||[]).filter(t=>!t.done).length} To-Dos</span>
        </div>
        <div style={{display:"flex",gap:6}}>
          <button className="btn btn-xs bol" onClick={e=>{e.stopPropagation();onUsers(biz)}}>👥 Users</button>
          <button className="btn btn-xs bdk" onClick={e=>{e.stopPropagation();onSelect(biz)}}>Dashboard →</button>
        </div>
      </div>;
    })}</div>
  </div>;
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App(){
  const [businesses,setBusinesses]=useState({});
  const [user,setUser]=useState(null);
  const [lf,setLf]=useState({username:"",password:""});
  const [lerr,setLerr]=useState("");
  const [loggingIn,setLoggingIn]=useState(false);
  const [tab,setTab]=useState("dashboard");
  const [bizId,setBizId]=useState(null);
  const [showAdd,setShowAdd]=useState(false);
  const [manageId,setManageId]=useState(null);
  const [email,setEmail]=useState({open:false,title:"",content:"",loading:false});
  const [notifs,setNotifs]=useState([]);
  const syncRef=useRef({});

  const login=async()=>{
    setLoggingIn(true);setLerr("");
    try{
      const r=await fetch("/api/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(lf)});
      const d=await r.json();
      if(!r.ok){setLerr(d.error||"Invalid username or password.");return;}
      if(d.user.role==="coach"){
        setUser(d.user);setTab("clients");
        const br=await fetch("/api/businesses");
        const bl=await br.json();
        const bmap={};for(const b of bl)bmap[b.id]=b;
        setBusinesses(bmap);
      } else {
        setUser(d.user);setBizId(d.user.bizId);setTab("dashboard");
        setBusinesses({[d.business.id]:d.business});
      }
    } catch {
      setLerr("Connection error. Please try again.");
    } finally {
      setLoggingIn(false);
    }
  };

  const isCoach=user?.role==="coach";
  const biz=bizId?businesses[bizId]:null;
  const manageBiz=manageId?businesses[manageId]:null;

  const setBiz=useCallback(upd=>{
    setBusinesses(p=>{
      const updated=typeof upd==="function"?upd(p[bizId]):upd;
      clearTimeout(syncRef.current[bizId]);
      syncRef.current[bizId]=setTimeout(()=>{
        const{users,...rest}=updated;
        const{id,company,industry,color,...data}=rest;
        fetch(`/api/businesses/${bizId}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({company,industry,color,data})}).catch(console.error);
      },1500);
      return{...p,[bizId]:updated};
    });
  },[bizId]);

  const addNotif=(title,body)=>setNotifs(n=>[{id:uid(),title,body,read:false},...n]);

  const sendSummary=async note=>{
    setEmail({open:true,title:"AI Meeting Summary",content:"",loading:true});
    const b=biz,owner=b.users.find(u=>u.role==="owner");
    const txt=await aiGenerate(`You are an EOS business coach. Write a professional L10 meeting summary email for ${owner?.name||"the team"} at ${b.company}.\n\nMeeting: ${note.date}\nAttendees: ${note.attendees}\nSegue: ${note.segue}\nHeadlines: ${note.headlines}\nRocks: ${note.rocks}\nIssues: ${note.issues}\nTo-Dos: ${note.todos}\nRating: ${note.rating}/10\n\nInclude Subject line, warm professional body, key takeaways as bullets, and next steps. Sign off as "Your EOS Coach".`);
    setEmail({open:true,title:"AI Meeting Summary",content:txt,loading:false});
    setBiz(b=>({...b,meetingNotes:b.meetingNotes.map(n=>n.id===note.id?{...n,emailSent:true}:n)}));
    addNotif("Meeting Summary Ready",`L10 summary for ${biz.company} on ${note.date}`);
  };

  const sendReminders=async()=>{
    setEmail({open:true,title:"AI To-Do Reminders",content:"",loading:true});
    const b=biz,pending=(b.todos||[]).filter(t=>!t.done);
    const byP={};for(const t of pending){if(!byP[t.owner])byP[t.owner]=[];byP[t.owner].push(t)}
    const txt=await aiGenerate(`You are an EOS business coach. Write encouraging To-Do reminder emails for the team at ${b.company}.\n\nPending items:\n${Object.entries(byP).map(([name,ts])=>`${name}:\n${ts.map(t=>`  - "${t.title}" (due ${t.dueDate})`).join("\n")}`).join("\n\n")}\n\nWrite a separate short warm email per person, separated by ---. Use EOS language. Sign off as "Your EOS Coach".`);
    setEmail({open:true,title:"AI To-Do Reminders",content:txt,loading:false});
    addNotif("Reminders Ready",`Generated for ${Object.keys(byP).length} team member(s) at ${biz.company}`);
  };

  const NAV=[
    {id:"dashboard",label:"Dashboard",icon:"🧭",section:""},
    {id:"plan",label:"Business Plan",icon:"📋",section:""},
    {id:"orgchart",label:"Org Chart",icon:"🏗",section:""},
    {id:"rocks",label:"Rocks",icon:"⬡",section:""},
    {id:"scorecard",label:"Scorecard",icon:"▦",section:""},
    {id:"issues",label:"Issues (IDS)",icon:"◈",section:""},
    {id:"todos",label:"To-Dos",icon:"☑",section:""},
    {id:"headlines",label:"Headlines",icon:"📰",section:""},
    {id:"meeting",label:"Meeting Pulse",icon:"◉",section:""},
    {id:"rprs",label:"Right Person Right Seat",icon:"👤",section:"Tools"},
    {id:"oneonones",label:"Quarterly 1:1s",icon:"🤝",section:"Tools"},
  ];
  const TITLES={dashboard:"Dashboard",plan:"Business Plan",orgchart:"Org Chart",rocks:"Rocks",scorecard:"Scorecard",issues:"Issues (IDS)",todos:"To-Dos",headlines:"Headlines",meeting:"Meeting Pulse",rprs:"Right Person Right Seat",oneonones:"Quarterly 1:1s",clients:"All Clients"};

  if(!user) return <>
    <style>{CSS}</style>
    <div className="login">
      <div className="ll">
        <div className="ll-geo"/>
        <div className="ll-geo2"/>
        <div className="ll-geo3"/>
        <div className="ll-rule"/>
        <div className="logo">The Wealth Network</div>
        <div className="logo-name">Business<br/><span>Intelligence</span><br/>Platform</div>
        <div className="logo-sub">Business Coach</div>
        <div className="logo-ver">Version 2.0</div>
      </div>
      <div className="lr"><div className="lf">
        <h2>Welcome back</h2>
        <p>Sign in to your adviser dashboard</p>
        <div className="fi"><label>Username</label><input value={lf.username} onChange={e=>setLf(f=>({...f,username:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&login()} placeholder="Enter username"/></div>
        <div className="fi"><label>Password</label><input type="password" value={lf.password} onChange={e=>setLf(f=>({...f,password:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&login()} placeholder="Enter password"/></div>
        {lerr&&<div className="err">{lerr}</div>}
        <button className="btn-login" onClick={login} disabled={loggingIn}>{loggingIn?"Signing in…":"Sign In →"}</button>
        <div className="hint"><strong>Demo logins:</strong><br/>Coach: <strong>coach</strong><br/>Owner: <strong>sarah.acme</strong><br/>Member: <strong>james.acme</strong><br/>Owner: <strong>james.vertex</strong></div>
      </div></div>
    </div>
  </>;

  const dispRole=isCoach?"Coach":user.role==="owner"?`Owner · ${biz?.company||""}`:`Member · ${biz?.company||""}`;
  let section="";

  return <>
    <style>{CSS}</style>
    <AddClientModal open={showAdd} onClose={()=>setShowAdd(false)} onAdd={async nb=>{
      await fetch("/api/businesses",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(nb)}).catch(console.error);
      setBusinesses(b=>({...b,[nb.id]:nb}));
    }}/>
    <ManageUsersModal open={!!manageBiz} business={manageBiz} onClose={()=>setManageId(null)} onUpdate={async ub=>{
      const oldIds=(manageBiz?.users||[]).map(u=>u.id);
      const newIds=ub.users.map(u=>u.id);
      for(const u of ub.users.filter(u=>!oldIds.includes(u.id)))
        await fetch(`/api/businesses/${ub.id}/users`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(u)}).catch(console.error);
      for(const id of oldIds.filter(id=>!newIds.includes(id)))
        await fetch(`/api/businesses/${ub.id}/users/${id}`,{method:"DELETE"}).catch(console.error);
      setBusinesses(b=>({...b,[ub.id]:ub}));
    }}/>
    <EmailModal open={email.open} onClose={()=>setEmail(e=>({...e,open:false}))} title={email.title} content={email.content} loading={email.loading}/>
    <div className="app">
      <div className="sb">
        <div className="sb-brand">
          <div className="sb-logo">The Wealth Network</div>
          <div className="sb-name">Business<br/><span>Intelligence</span></div>
          <div className="sb-sub">Business Coach</div>
        </div>
        <div className="sb-user"><div className="sb-uname">{user.name}</div><div className="sb-urole">{dispRole}</div></div>
        <nav className="sb-nav">
          {isCoach&&<><div className="ns">Coach</div>
            <div className={`ni ${tab==="clients"?"on":""}`} onClick={()=>{setTab("clients");setBizId(null)}}>◐ All Clients</div>
            <div className="ni" onClick={()=>setShowAdd(true)}>＋ Add Client</div>
          </>}
          {biz&&<>{isCoach&&<div className="ns">{biz.company}</div>}
            {!isCoach&&<div className="ns">Navigation</div>}
            {NAV.map(item=>{
              const hdr=item.section&&item.section!==section;if(hdr)section=item.section;
              return <span key={item.id}>{hdr&&<div className="ns">{item.section}</div>}<div className={`ni ${tab===item.id?"on":""}`} onClick={()=>setTab(item.id)}><span>{item.icon}</span>{item.label}</div></span>;
            })}
            {isCoach&&<div className="ni" style={{marginTop:8,borderTop:"1px solid rgba(255,255,255,.07)",paddingTop:12}} onClick={()=>{setBizId(null);setTab("clients")}}>← All Clients</div>}
          </>}
        </nav>
        <div className="sb-footer"><button className="lout" onClick={()=>{setUser(null);setBizId(null);setTab("dashboard");setLf({username:"",password:""});}}>⇤ Sign out</button></div>
      </div>
      <div className="main">
        <div className="topbar">
          <div><div className="pt">{TITLES[tab]||"Dashboard"}</div>{biz&&isCoach&&<div className="ps">Viewing: {biz.company}</div>}</div>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            {biz&&isCoach&&<button className="btn btn-sm bol" onClick={()=>setManageId(biz.id)}>👥 Users</button>}
            <Notif notifs={notifs} onClear={()=>setNotifs([])}/>
          </div>
        </div>
        <div className="content">
          {tab==="clients"&&isCoach&&<CoachOverview businesses={businesses} onSelect={async b=>{
            setBizId(b.id);setTab("dashboard");
            if(!businesses[b.id]?.rocks){
              const r=await fetch(`/api/businesses/${b.id}`);
              const data=await r.json();
              setBusinesses(p=>({...p,[b.id]:data}));
            }
          }} onAdd={()=>setShowAdd(true)} onUsers={b=>setManageId(b.id)}/>}
          {biz&&tab==="dashboard"&&<Dashboard biz={biz} cu={user}/>}
          {biz&&tab==="plan"&&<BusinessPlan biz={biz} setBiz={setBiz} cu={user}/>}
          {biz&&tab==="orgchart"&&<OrgChart biz={biz}/>}
          {biz&&tab==="rocks"&&<Rocks biz={biz} setBiz={setBiz} cu={user}/>}
          {biz&&tab==="scorecard"&&<Scorecard biz={biz} setBiz={setBiz} cu={user}/>}
          {biz&&tab==="issues"&&<Issues biz={biz} setBiz={setBiz} cu={user}/>}
          {biz&&tab==="todos"&&<Todos biz={biz} setBiz={setBiz} cu={user} onRemind={sendReminders}/>}
          {biz&&tab==="headlines"&&<Headlines biz={biz} setBiz={setBiz} cu={user}/>}
          {biz&&tab==="meeting"&&<MeetingPulse biz={biz} setBiz={setBiz} onSendSummary={sendSummary}/>}
          {biz&&tab==="rprs"&&<RPRS biz={biz} setBiz={setBiz} cu={user}/>}
          {biz&&tab==="oneonones"&&<OneOnOnes biz={biz} setBiz={setBiz} cu={user}/>}
        </div>
      </div>
    </div>
  </>;
}
