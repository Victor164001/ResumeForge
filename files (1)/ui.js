
/* Minimal line-icon set. Generic geometric shapes (circles/lines/paths), not
   copied from any icon library's artwork - just enough visual polish to
   match a clean line-icon UI without any external icon font/CDN. */
var ICON_PATHS = {
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7"/>',
  fileText: '<path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path d="M14 3v5h5"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="15" y2="17"/>',
  barChart: '<line x1="6" y1="20" x2="6" y2="12"/><line x1="12" y1="20" x2="12" y2="5"/><line x1="18" y1="20" x2="18" y2="15"/>',
  briefcase: '<rect x="2" y="7" width="20" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="2" y1="13" x2="22" y2="13"/>',
  folder: '<path d="M3 6.5A1.5 1.5 0 0 1 4.5 5H9l2 2h8.5A1.5 1.5 0 0 1 21 8.5v10a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18.5z"/>',
  cap: '<path d="M2 9.5 12 5l10 4.5-10 4.5z"/><path d="M6 11.5V16c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-4.5"/><line x1="22" y1="9.5" x2="22" y2="15"/>',
  award: '<circle cx="12" cy="8" r="5.5"/><path d="M8.2 12.8 6.5 21l5.5-3 5.5 3-1.7-8.2"/>',
  bookmark: '<path d="M6 3h12a1 1 0 0 1 1 1v16l-7-4-7 4V4a1 1 0 0 1 1-1z"/>',
  plusCircle: '<circle cx="12" cy="12" r="9.5"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>',
  plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
  trash: '<path d="M3.5 6.5h17"/><path d="M8.5 6.5v-2a1.5 1.5 0 0 1 1.5-1.5h4a1.5 1.5 0 0 1 1.5 1.5v2"/><path d="M18.5 6.5 17.6 20a1.5 1.5 0 0 1-1.5 1.4H7.9A1.5 1.5 0 0 1 6.4 20L5.5 6.5"/><line x1="10" y1="10.5" x2="10" y2="17"/><line x1="14" y1="10.5" x2="14" y2="17"/>',
  grip: '<circle cx="9" cy="5" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="19" r="1"/>',
  chevronUp: '<polyline points="18 15 12 9 6 15"/>',
  chevronDown: '<polyline points="6 9 12 15 18 9"/>',
  undo: '<polyline points="9 14 4 9 9 4"/><path d="M20 20v-6a4 4 0 0 0-4-4H4"/>',
  redo: '<polyline points="15 14 20 9 15 4"/><path d="M4 20v-6a4 4 0 0 1 4-4h12"/>',
  eye: '<path d="M1.5 12S5.6 4.5 12 4.5 22.5 12 22.5 12 18.4 19.5 12 19.5 1.5 12 1.5 12z"/><circle cx="12" cy="12" r="3"/>',
  eyeOff: '<path d="M3 3l18 18"/><path d="M10.6 5.6A9.9 9.9 0 0 1 12 5.5c6.4 0 10.5 6.5 10.5 6.5a15.6 15.6 0 0 1-3.4 4.1M6.6 6.7C4 8.4 1.5 12 1.5 12s4.1 6.5 10.5 6.5a10.4 10.4 0 0 0 3.7-.7"/><path d="M9.9 14.1a3 3 0 0 0 4.2-4.2"/>',
  download: '<path d="M12 3v12"/><polyline points="7 10 12 15 17 10"/><path d="M4.5 21h15"/>',
  moon: '<path d="M20.5 13.9A8.5 8.5 0 1 1 10.1 3.5a7 7 0 0 0 10.4 10.4z"/>',
  sun: '<circle cx="12" cy="12" r="4.5"/><line x1="12" y1="2" x2="12" y2="4.5"/><line x1="12" y1="19.5" x2="12" y2="22"/><line x1="4.2" y1="4.2" x2="5.9" y2="5.9"/><line x1="18.1" y1="18.1" x2="19.8" y2="19.8"/><line x1="2" y1="12" x2="4.5" y2="12"/><line x1="19.5" y1="12" x2="22" y2="12"/><line x1="4.2" y1="19.8" x2="5.9" y2="18.1"/><line x1="18.1" y1="5.9" x2="19.8" y2="4.2"/>',
  arrowLeft: '<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>',
  lightbulb: '<path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7c.7.5 1 1 1 2.3h6c0-1.3.3-1.8 1-2.3A7 7 0 0 0 12 2z"/>',
  x: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
  mapPin: '<path d="M20 10c0 6.5-8 12-8 12s-8-5.5-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="2.7"/>',
  check: '<polyline points="20 6 9 17 4 12"/>',
  sliders: '<line x1="4" y1="21" x2="4" y2="13"/><line x1="4" y1="9" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="11"/><line x1="12" y1="7" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="15"/><line x1="20" y1="11" x2="20" y2="3"/><line x1="1" y1="13" x2="7" y2="13"/><line x1="9" y1="7" x2="15" y2="7"/><line x1="17" y1="15" x2="23" y2="15"/>',
  moreVertical: '<circle cx="12" cy="5" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="12" cy="19" r="1.2"/>',
  bell: '<path d="M6 8a6 6 0 0 1 12 0c0 4.5 1.5 6 2 6.5H4c.5-.5 2-2 2-6.5z"/><path d="M10 19a2 2 0 0 0 4 0"/>',
  copy: '<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M4.5 16H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v.5"/>',
  mail: '<rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="M3 6.5l9 6.5 9-6.5"/>',
  chevronRight: '<polyline points="9 6 15 12 9 18"/>',
  globe: '<circle cx="12" cy="12" r="9.5"/><line x1="2.5" y1="12" x2="21.5" y2="12"/><path d="M12 2.5c2.6 2.8 4 6 4 9.5s-1.4 6.7-4 9.5c-2.6-2.8-4-6-4-9.5s1.4-6.7 4-9.5z"/>',
  cloud: '<path d="M7 18a4.5 4.5 0 0 1-.5-8.97A5.5 5.5 0 0 1 17.3 8.1 4 4 0 0 1 17 16H7z"/>',
  cloudCheck: '<path d="M7 17a4.5 4.5 0 0 1-.5-8.97A5.5 5.5 0 0 1 16.8 7.6 4 4 0 0 1 17 15.5"/><polyline points="9.2 15.3 11.3 17.4 15.3 12.8"/>',
  cloudOff: '<path d="M3 3l18 18"/><path d="M8.3 8.3A4.5 4.5 0 0 0 7 17h8.3"/><path d="M17.3 15.9A4 4 0 0 0 17 8.1 5.5 5.5 0 0 0 7.3 7.1"/>'
};
function svgIcon(name, size, cls){
  size = size || 16;
  var body = ICON_PATHS[name] || ICON_PATHS.bookmark;
  return '<svg class="ic'+(cls?" "+cls:"")+'" width="'+size+'" height="'+size+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+body+'</svg>';
}
var SECTION_ICON = {
  summary:"fileText", skills:"barChart", languages:"globe", highlights:"award",
  experience:"briefcase", projects:"folder",
  education:"cap", certifications:"award", custom:"bookmark"
};

(function(){
"use strict";
if(typeof document === "undefined") return;

/* ============================ STATE ============================ */
var LIBRARY_KEY = "resumeforge:library:v1";
var STATS_KEY = "resumeforge:stats:v1";
var THEME_KEY = "resumeforge:theme";

/* ---- multi-resume library ----
   localStorage holds { resumes: [{id, name, updatedAt, data}], activeId }.
   `state` (below) is always a live reference to the active resume's data -
   the single source of truth the rest of the app already reads/writes,
   unchanged. Library bookkeeping just decides which data object that is. */
function loadLibrary(){
  try{
    var raw = localStorage.getItem(LIBRARY_KEY);
    if(raw){
      var lib = JSON.parse(raw);
      if(lib && Array.isArray(lib.resumes) && lib.resumes.length){
        lib.resumes.forEach(function(r){ r.data = RF.migrate(r.data); });
        return lib;
      }
    }
  }catch(e){}
  // migrate a pre-dashboard single-resume save, if one exists
  var legacy = null;
  try{
    var oldRaw = localStorage.getItem("resumeforge:v3") || localStorage.getItem("resumeforge:v2") || localStorage.getItem("resumeforge:v1");
    if(oldRaw) legacy = RF.migrate(JSON.parse(oldRaw));
  }catch(e){}
  var first = {
    id: RF.uid(),
    name: (legacy && legacy.heading && legacy.heading.name) ? legacy.heading.name + "'s Resume" : "My Resume",
    updatedAt: Date.now(),
    data: legacy || RF.defaultState(),
  };
  return {resumes:[first], activeId:first.id};
}
function saveLibrary(lib){
  try{ localStorage.setItem(LIBRARY_KEY, JSON.stringify(lib)); }catch(e){}
  queueCloudWrite();
}
function getActiveMeta(lib){
  return lib.resumes.find(function(r){ return r.id === lib.activeId; }) || lib.resumes[0];
}

var library = loadLibrary();
var state = getActiveMeta(library).data;

/* ---- lightweight, real usage stats (no fabricated numbers) ---- */
function loadStats(){
  try{
    var raw = localStorage.getItem(STATS_KEY);
    if(raw) return JSON.parse(raw);
  }catch(e){}
  return {templateViews:0, exportsCount:0};
}
function saveStats(stats){
  try{ localStorage.setItem(STATS_KEY, JSON.stringify(stats)); }catch(e){}
  queueCloudWrite();
}
function bumpStat(key){
  var s = loadStats();
  s[key] = (s[key]||0) + 1;
  saveStats(s);
}

/* ============================ CLOUD SYNC ============================ */
/* Real persistent storage via the platform's db capability, scoped to
   each signed-in visitor's own private data - not a separate paid
   service, and not something available to a visitor who isn't signed
   into any Claude account at all (that's a platform identity
   requirement, not a choice made here). Those visitors keep working
   entirely from localStorage, exactly as before this feature existed.
   Cloud sync is strictly additive: local reads/writes never wait on it,
   and any failure here is silently swallowed rather than surfaced as an
   app error, since the app must keep working with local storage alone. */
var cloudDb = null;
var cloudUserId = null;
var cloudStatus = "checking"; /* 'checking' | 'synced' | 'local-only' | 'error' */
var cloudWriteChain = Promise.resolve();
var cloudPulledOnce = false;

function cloudDocRef(){
  return cloudDb.doc("data/users/" + cloudUserId + "/resumeforge");
}
function snapshotForCloud(){
  return {
    library: library,
    stats: loadStats(),
    activity: loadActivity(),
    coverLetter: (typeof coverLetter !== "undefined") ? coverLetter : null,
    theme: document.documentElement.dataset.theme || null,
    updatedAt: Date.now()
  };
}
function queueCloudWrite(){
  if(cloudStatus !== "synced" || !cloudPulledOnce) return; /* nothing to push yet, or not eligible */
  var snap = snapshotForCloud();
  cloudWriteChain = cloudWriteChain.then(function(){
    return cloudDocRef().set(snap);
  }).catch(function(e){ console.error("ResumeForge cloud sync (write) failed:", e); });
}
function adoptCloudSnapshot(data){
  if(data.library && Array.isArray(data.library.resumes) && data.library.resumes.length){
    library = data.library;
    library.resumes.forEach(function(r){ r.data = RF.migrate(r.data); });
    state = getActiveMeta(library).data;
    try{ localStorage.setItem(LIBRARY_KEY, JSON.stringify(library)); }catch(e){}
  }
  if(data.stats){ try{ localStorage.setItem(STATS_KEY, JSON.stringify(data.stats)); }catch(e){} }
  if(data.activity){ try{ localStorage.setItem(ACTIVITY_KEY, JSON.stringify(data.activity)); }catch(e){} }
  if(data.coverLetter){ try{ localStorage.setItem(COVER_KEY, JSON.stringify(data.coverLetter)); coverLetter = data.coverLetter; }catch(e){} }
  if(data.theme){ applyTheme(data.theme); try{ localStorage.setItem(THEME_KEY, data.theme); }catch(e){} }
}
async function initCloud(){
  try{
    if(!window.claude || typeof window.claude.use !== "function"){ cloudStatus = "local-only"; render(); return; }
    var user = await window.claude.use("user");
    var db = await window.claude.use("db");
    if(!user || !db){ cloudStatus = "local-only"; render(); return; }
    var uid = await user.id();
    if(!uid){ cloudStatus = "local-only"; render(); return; }
    cloudDb = db; cloudUserId = uid;
    var snap = await cloudDocRef().get();
    if(snap && snap.exists()){
      adoptCloudSnapshot(snap.data());
    }
    cloudPulledOnce = true;
    cloudStatus = "synced";
    if(!snap || !snap.exists()){
      queueCloudWrite(); /* first time for this person: seed the cloud from whatever is local */
    }
    render();
  }catch(e){
    console.error("ResumeForge cloud sync (init) failed:", e);
    cloudStatus = "error";
    render();
  }
}
function cloudStatusLabel(){
  if(cloudStatus === "synced") return "Synced to your account";
  if(cloudStatus === "checking") return "Checking sync\u2026";
  if(cloudStatus === "error") return "Sync unavailable \u2014 saved in this browser only";
  return "Saved in this browser only";
}


var dragId = null;
var openPopover = null;

/* ephemeral UI-only state - not part of the saved resume */
var activeTab = "dashboard";    /* 'dashboard' | 'builder' | 'templates' | 'examples' | 'tips' | 'ats' | 'cover' */
var previewOnly = false;
var activeSectionId = null;     /* which form block the sidenav highlights */
var lastSavedAt = null;
var historyStack = [];
var redoStack = [];
var typingSnapshotPending = true;
var typingDebounce = null;
var sectionObserver = null;

function saveState(){
  try{
    var meta = getActiveMeta(library);
    meta.data = state;
    meta.updatedAt = Date.now();
    saveLibrary(library);
    lastSavedAt = Date.now();
    updateSavedIndicator();
  }catch(e){}
}
function deepClone(x){ return JSON.parse(JSON.stringify(x)); }

/* ---- resume library actions (Dashboard / My Resumes) ---- */
function createResume(name){
  var meta = {id: RF.uid(), name: name || "Untitled Resume", updatedAt: Date.now(), data: RF.defaultState()};
  library.resumes.unshift(meta);
  library.activeId = meta.id;
  state = meta.data;
  historyStack = []; redoStack = []; typingSnapshotPending = true;
  saveLibrary(library);
  logActivity("Created \u201c" + meta.name + "\u201d");
  return meta;
}
function duplicateResume(id){
  var src = library.resumes.find(function(r){ return r.id === id; });
  if(!src) return null;
  var copy = {id: RF.uid(), name: src.name + " (Copy)", updatedAt: Date.now(), data: deepClone(src.data)};
  var idx = library.resumes.indexOf(src);
  library.resumes.splice(idx+1, 0, copy);
  saveLibrary(library);
  logActivity("Duplicated \u201c" + src.name + "\u201d");
  return copy;
}
function deleteResumeFromLibrary(id){
  if(library.resumes.length <= 1) return false; // always keep at least one
  var target = library.resumes.find(function(r){ return r.id === id; });
  var wasActive = library.activeId === id;
  library.resumes = library.resumes.filter(function(r){ return r.id !== id; });
  if(wasActive){
    library.activeId = library.resumes[0].id;
    state = library.resumes[0].data;
    historyStack = []; redoStack = []; typingSnapshotPending = true;
  }
  saveLibrary(library);
  if(target) logActivity("Deleted \u201c" + target.name + "\u201d");
  return true;
}
function renameResume(id, name){
  var meta = library.resumes.find(function(r){ return r.id === id; });
  if(!meta) return;
  meta.name = (name || "").trim() || meta.name;
  saveLibrary(library);
}
function switchToResume(id){
  var meta = library.resumes.find(function(r){ return r.id === id; });
  if(!meta) return;
  library.activeId = id;
  state = meta.data;
  historyStack = []; redoStack = []; typingSnapshotPending = true;
  saveLibrary(library);
}
function averageAtsScore(){
  if(!library.resumes.length) return 0;
  var total = library.resumes.reduce(function(sum, r){ return sum + RF.scoreAts(r.data).score; }, 0);
  return Math.round(total / library.resumes.length);
}

/* ---- activity log: real events only, nothing fabricated ---- */
var ACTIVITY_KEY = "resumeforge:activity:v1";
var ACTIVITY_SEEN_KEY = "resumeforge:activity-seen:v1";
function loadActivity(){
  try{ return JSON.parse(localStorage.getItem(ACTIVITY_KEY) || "[]"); }catch(e){ return []; }
}
function logActivity(message){
  var list = loadActivity();
  list.unshift({message: message, at: Date.now()});
  list = list.slice(0, 15);
  try{ localStorage.setItem(ACTIVITY_KEY, JSON.stringify(list)); }catch(e){}
  queueCloudWrite();
}
function unseenActivityCount(){
  var lastSeen = 0;
  try{ lastSeen = Number(localStorage.getItem(ACTIVITY_SEEN_KEY)) || 0; }catch(e){}
  return loadActivity().filter(function(a){ return a.at > lastSeen; }).length;
}
function markActivitySeen(){
  try{ localStorage.setItem(ACTIVITY_SEEN_KEY, String(Date.now())); }catch(e){}
}

/* export a resume that isn't the one currently open, without disturbing
   the active editing session's undo history or unsaved state */
async function quickExport(resumeId, format){
  var meta = library.resumes.find(function(r){ return r.id === resumeId; });
  if(!meta) return;
  var prevState = state;
  state = meta.data;
  if(format === "pdf") await exportPdf(); else await exportDocx();
  state = prevState;
}



/* ---- undo / redo ----
   Discrete actions (add/remove/reorder section or entry, template switch,
   alignment change, date pick, etc.) snapshot the state right before they
   mutate it. Continuous typing is grouped: the first keystroke after a
   pause snapshots once, then a short debounce lets the rest of that burst
   of typing collapse into the same undo step. */
function snapshotHistory(){
  historyStack.push(deepClone(state));
  if(historyStack.length > 60) historyStack.shift();
  redoStack.length = 0;
  updateUndoRedoButtons();
}
function noteTypingEdit(){
  if(typingSnapshotPending){ snapshotHistory(); typingSnapshotPending = false; }
  clearTimeout(typingDebounce);
  typingDebounce = setTimeout(function(){ typingSnapshotPending = true; }, 800);
}
function undo(){
  if(!historyStack.length) return;
  redoStack.push(deepClone(state));
  state = historyStack.pop();
  typingSnapshotPending = true;
  saveState(); rerender();
}
function redo(){
  if(!redoStack.length) return;
  historyStack.push(deepClone(state));
  state = redoStack.pop();
  typingSnapshotPending = true;
  saveState(); rerender();
}
function updateUndoRedoButtons(){
  var u = document.getElementById("tb-undo"), r = document.getElementById("tb-redo");
  if(u) u.disabled = historyStack.length === 0;
  if(r) r.disabled = redoStack.length === 0;
}
document.addEventListener("keydown", function(e){
  var mod = e.metaKey || e.ctrlKey;
  if(!mod) return;
  var k = e.key.toLowerCase();
  if(k === "z" && !e.shiftKey){ e.preventDefault(); undo(); }
  else if((k === "z" && e.shiftKey) || k === "y"){ e.preventDefault(); redo(); }
});

/* ---- theme ---- */
function loadTheme(){
  try{ return localStorage.getItem(THEME_KEY); }catch(e){ return null; }
}
function applyTheme(mode){
  if(mode === "light" || mode === "dark") document.documentElement.dataset.theme = mode;
  else delete document.documentElement.dataset.theme;
}
function currentEffectiveTheme(){
  var t = document.documentElement.dataset.theme;
  if(t) return t;
  return (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "dark" : "light";
}
function toggleTheme(){
  var next = currentEffectiveTheme() === "dark" ? "light" : "dark";
  applyTheme(next);
  try{ localStorage.setItem(THEME_KEY, next); }catch(e){}
  queueCloudWrite();
  var btn = document.getElementById("theme-toggle");
  if(btn) btn.innerHTML = svgIcon(next === "dark" ? "sun" : "moon", 17);
}
applyTheme(loadTheme());

/* ---- relative "saved x ago" indicator ---- */
function relativeSaved(){
  if(!lastSavedAt) return "Not saved yet";
  var secs = Math.round((Date.now() - lastSavedAt) / 1000);
  if(secs < 5) return "Saved just now";
  if(secs < 60) return "Saved " + secs + "s ago";
  var mins = Math.round(secs / 60);
  if(mins < 60) return "Saved " + mins + " minute" + (mins === 1 ? "" : "s") + " ago";
  var hrs = Math.round(mins / 60);
  return "Saved " + hrs + " hour" + (hrs === 1 ? "" : "s") + " ago";
}
function updateSavedIndicator(){
  var el2 = document.getElementById("saved-indicator-text");
  if(el2) el2.textContent = relativeSaved();
}
setInterval(updateSavedIndicator, 30000);

/* ============================ DOM HELPERS ============================ */
var app = document.getElementById("app");
function el(tag, cls, html){
  var e = document.createElement(tag);
  if(cls) e.className = cls;
  if(html !== undefined) e.innerHTML = html;
  return e;
}
function showToast(msg){
  var t = document.getElementById("toast");
  t.textContent = msg; t.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(function(){ t.classList.remove("show"); }, 2400);
}


/* ============================ MODALS & POPOVER ============================ */
function closePopover(){
  if(openPopover && openPopover.parentNode) openPopover.parentNode.removeChild(openPopover);
  openPopover = null;
}

/* window.prompt()/confirm() are native browser dialogs and, like anchor
   downloads, are blocked inside a published Claude artifact's sandboxed
   frame - they silently no-op instead of throwing, which is why "Add"
   on a custom section used to do nothing at all. These are self-contained
   replacements that don't touch the browser chrome. */
var activeModal = null;
function closeModal(){
  if(activeModal){
    document.removeEventListener("keydown", activeModal.onKey);
    if(activeModal.el.parentNode) activeModal.el.parentNode.removeChild(activeModal.el);
    activeModal = null;
  }
}
function openModal(buildBody){
  closeModal(); closePopover();
  var backdrop = el("div","modal-backdrop");
  var box = el("div","modal-box");
  box.addEventListener("mousedown", function(e){ e.stopPropagation(); });
  buildBody(box, closeModal);
  backdrop.appendChild(box);
  backdrop.addEventListener("mousedown", function(e){ if(e.target === backdrop) closeModal(); });
  function onKey(e){ if(e.key === "Escape") closeModal(); }
  document.addEventListener("keydown", onKey);
  document.body.appendChild(backdrop);
  activeModal = {el: backdrop, onKey: onKey};
  return box;
}
function promptModal(opts, onConfirm){
  var box = openModal(function(box, close){
    box.appendChild(el("h3","", opts.title || "Name this"));
    if(opts.description) box.appendChild(el("p","", opts.description));
    var input = document.createElement("input");
    input.className = "text-input"; input.value = opts.defaultValue || ""; input.placeholder = opts.placeholder || "";
    box.appendChild(input);
    var actions = el("div","modal-actions");
    var cancel = el("button","btn btn-ghost","Cancel");
    cancel.type = "button"; cancel.onclick = close;
    var confirmBtn = el("button","btn btn-primary", opts.confirmLabel || "Add");
    confirmBtn.type = "button";
    function submit(){
      var v = input.value.trim();
      if(!v){ input.focus(); return; }
      close();
      onConfirm(v);
    }
    confirmBtn.onclick = submit;
    input.onkeydown = function(e){ if(e.key === "Enter"){ e.preventDefault(); submit(); } };
    actions.appendChild(cancel); actions.appendChild(confirmBtn);
    box.appendChild(actions);
    setTimeout(function(){ input.focus(); input.select(); }, 0);
  });
  return box;
}
function confirmModal(opts, onConfirm){
  openModal(function(box, close){
    if(opts.title) box.appendChild(el("h3","", opts.title));
    box.appendChild(el("p","", opts.message || ""));
    var actions = el("div","modal-actions");
    var cancel = el("button","btn btn-ghost","Cancel");
    cancel.type = "button"; cancel.onclick = close;
    var confirmBtn = el("button","btn btn-accent", opts.confirmLabel || "Yes");
    confirmBtn.type = "button";
    confirmBtn.onclick = function(){ close(); onConfirm(); };
    actions.appendChild(cancel); actions.appendChild(confirmBtn);
    box.appendChild(actions);
  });
}
document.addEventListener("click", function(e){
  if(openPopover && !openPopover.contains(e.target) && !e.target.closest(".loc-trigger")) closePopover();
});
document.addEventListener("keydown", function(e){ if(e.key === "Escape") closePopover(); });


/* ============================ DATA MENU, DOWNLOADS ============================ */
function dataMenu(){
  var existing = document.getElementById("data-menu");
  if(existing){ existing.remove(); return; }
  var menu = el("div",""); menu.id = "data-menu";
  menu.style.cssText = "position:fixed;top:52px;right:16px;background:var(--surface);border:1px solid var(--border);border-radius:10px;box-shadow:var(--shadow);padding:6px;z-index:60;min-width:200px;";
  function item(label, fn, danger){
    var b = el("button","btn btn-ghost btn-sm", label);
    b.style.cssText = "width:100%;justify-content:flex-start;margin-bottom:3px;" + (danger ? "color:var(--danger);" : "");
    b.onclick = function(){ fn(); menu.remove(); };
    return b;
  }
  menu.appendChild(item("Save progress (.json)", function(){
    download(new Blob([JSON.stringify(state,null,2)],{type:"application/json"}), "resume-data.json");
  }));
  var label = el("label","btn btn-ghost btn-sm","Load progress (.json)");
  label.style.cssText = "width:100%;justify-content:flex-start;display:flex;margin-bottom:3px;";
  var fi = document.createElement("input"); fi.type = "file"; fi.accept = "application/json"; fi.style.display = "none";
  fi.onchange = function(e){
    var f = e.target.files[0]; if(!f) return;
    var r = new FileReader();
    r.onload = function(){
      try{
        var parsed = RF.migrate(JSON.parse(r.result));
        if(parsed){ snapshotHistory(); state = parsed; activeTab = "builder"; previewOnly = false; saveState(); render(); showToast("Progress loaded."); }
        else showToast("That file isn't a ResumeForge save.");
      }catch(err){ showToast("Couldn't read that file."); }
    };
    r.readAsText(f); menu.remove();
  };
  label.appendChild(fi);
  menu.appendChild(label);
  menu.appendChild(item("Start over", function(){
    confirmModal({
      title: "Start over?",
      message: "This clears every section and contact field you've filled in. This can't be undone.",
      confirmLabel: "Yes, clear it"
    }, function(){
      snapshotHistory();
      state = RF.defaultState(); activeTab = "builder"; previewOnly = false; saveState(); render();
    });
  }, true));
  document.body.appendChild(menu);
  setTimeout(function(){
    document.addEventListener("click", function h(e){
      if(!menu.contains(e.target)){ menu.remove(); document.removeEventListener("click", h); }
    });
  }, 0);
}
/* Inside a published Claude artifact, a plain anchor.click() download is
   inert - the platform never lets frame code save a file directly. The
   real path is the "downloads" runtime capability. We still keep the
   classic anchor+blob trick as a fallback for when this file is opened
   outside claude.ai (self-hosted, downloaded locally, etc.), where
   window.claude does not exist at all. */
function legacyAnchorDownload(blob, filename){
  var url = URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(function(){ URL.revokeObjectURL(url); }, 4000);
}
async function download(blob, filename){
  if(window.claude && typeof window.claude.use === "function"){
    try{
      var downloads = await window.claude.use("downloads");
      if(downloads){
        var result = await downloads.save({filename: filename, data: blob});
        showToast(result && result.status === "delivered" ? "Sent." : "Saved " + filename);
        return;
      }
      /* capability unavailable in this view - fall through to legacy */
    }catch(err){
      var code = err && err.code;
      if(code === "declined") return; /* the viewer said no - do nothing, no error noise */
      if(code === "rate_limited"){ showToast("A save prompt is already open - try again in a moment."); return; }
      if(code === "too_large"){ showToast("That file is too large to save here."); return; }
      if(code !== "unavailable" && code !== "not_granted"){
        console.error("downloads.save failed:", err);
        showToast((err && err.message) || "Couldn't save the file.");
        return;
      }
      /* unavailable / not_granted - fall through to legacy as a last resort */
    }
  }
  legacyAnchorDownload(blob, filename);
}


/* ============================ LOCATION PICKER ============================ */
function openLocationPicker(anchorEl, currentValue, onPick){
  closePopover();
  var pop = el("div","loc-pop");
  pop.addEventListener("click", function(e){ e.stopPropagation(); });

  var row = el("div","row");
  var countrySel = document.createElement("select");
  var allOpt = document.createElement("option");
  allOpt.value = "__all__"; allOpt.textContent = "All countries";
  countrySel.appendChild(allOpt);
  RF.GEO.countries.forEach(function(c){
    var o = document.createElement("option"); o.value = c.name; o.textContent = c.name;
    countrySel.appendChild(o);
  });
  var guess = guessCountry(currentValue);
  if(guess) countrySel.value = guess;
  var searchIn = document.createElement("input");
  searchIn.className = "text-input";
  searchIn.placeholder = "Type a city — e.g. bang, mumb, sfo";
  row.appendChild(countrySel); row.appendChild(searchIn);
  pop.appendChild(row);

  var results = el("div","loc-results");
  pop.appendChild(results);

  var foot = el("div","loc-foot");
  var useTyped = el("button","btn btn-sm","Use what I typed");
  useTyped.onclick = function(){
    var v = searchIn.value.trim();
    if(v){ onPick(v); closePopover(); }
    else showToast("Type a location first.");
  };
  var clear = el("button","muted-btn","Clear");
  clear.onclick = function(){ onPick(""); closePopover(); };
  foot.appendChild(useTyped); foot.appendChild(clear);
  pop.appendChild(foot);

  var cursor = -1, current = [];
  function draw(){
    current = RF.searchLocations(searchIn.value, countrySel.value, 60);
    results.innerHTML = "";
    if(!current.length){
      results.appendChild(el("div","loc-empty","No match. You can still use exactly what you typed."));
      return;
    }
    current.forEach(function(r, i){
      var b = el("button","loc-item"+(i===cursor?" active":""), RF.escapeHtml(r.city) + (r.country === "Remote" ? "" : '<span class="cty">'+RF.escapeHtml(r.country)+'</span>'));
      b.onclick = function(){ onPick(r.label); closePopover(); };
      results.appendChild(b);
    });
  }
  searchIn.oninput = function(){ cursor = -1; draw(); };
  countrySel.onchange = function(){ cursor = -1; draw(); };
  searchIn.onkeydown = function(e){
    if(e.key === "ArrowDown"){ e.preventDefault(); cursor = Math.min(cursor+1, current.length-1); draw(); results.children[cursor] && results.children[cursor].scrollIntoView({block:"nearest"}); }
    else if(e.key === "ArrowUp"){ e.preventDefault(); cursor = Math.max(cursor-1, 0); draw(); results.children[cursor] && results.children[cursor].scrollIntoView({block:"nearest"}); }
    else if(e.key === "Enter"){
      e.preventDefault();
      if(cursor >= 0 && current[cursor]) { onPick(current[cursor].label); closePopover(); }
      else if(searchIn.value.trim()){ onPick(searchIn.value.trim()); closePopover(); }
    }
  };

  anchorEl.appendChild(pop);
  openPopover = pop;
  draw();
  searchIn.focus();
}
function guessCountry(value){
  if(!value) return null;
  var parts = String(value).split(",");
  var tail = parts[parts.length-1].trim().toLowerCase();
  var found = RF.GEO.countries.find(function(c){ return c.name.toLowerCase() === tail; });
  return found ? found.name : null;
}


/* ============================ PREVIEW BUILD ============================ */
function buildPreviewEl(){
  var m = RF.buildModel(state);
  var page = el("div","page tpl-"+m.template);
  page.id = "resume-page";
  page.style.setProperty("--rf-accent", m.accent);

  var header = el("div","rf-header "+m.header.align);
  header.appendChild(el("div","rf-name", RF.escapeHtml(m.header.name || "Your Name")));
  if(m.header.role) header.appendChild(el("div","rf-role", RF.escapeHtml(m.header.role)));
  if(m.header.contacts.length) header.appendChild(el("div","rf-contact", m.header.contacts.map(RF.escapeHtml).join("&nbsp;&nbsp;|&nbsp;&nbsp;")));
  page.appendChild(header);

  m.sections.forEach(function(s){
    var sec = el("div","rf-section");
    sec.appendChild(el("div","rf-sectitle "+s.titleAlign, RF.escapeHtml(s.title)));
    if(s.type === "summary"){
      sec.appendChild(el("div", s.bodyAlign, RF.escapeHtml(s.text).replace(/\n/g,"<br>")));
    } else if(s.type === "skills"){
      if(s.display === "list"){
        var skillUl = document.createElement("ul");
        skillUl.className = "rf-bullets rf-skills-list " + s.bodyAlign;
        s.items.forEach(function(x){ var li = document.createElement("li"); li.textContent = x; skillUl.appendChild(li); });
        sec.appendChild(skillUl);
      } else {
        sec.appendChild(el("div","rf-skills-line "+s.bodyAlign, s.items.map(RF.escapeHtml).join("&nbsp; • &nbsp;")));
      }
    } else if(s.type === "languages"){
      s.items.forEach(function(l){
        var line = l.level ? l.language + " \u2013 " + l.level : l.language;
        sec.appendChild(el("div","rf-language-line "+s.bodyAlign, RF.escapeHtml(line)));
      });
    } else if(s.type === "highlights"){
      var hlUl = document.createElement("ul");
      hlUl.className = "rf-bullets " + s.bodyAlign;
      s.items.forEach(function(x){ var li = document.createElement("li"); li.textContent = x; hlUl.appendChild(li); });
      sec.appendChild(hlUl);
    } else {
      s.entries.forEach(function(e){
        var box = el("div","rf-entry "+s.bodyAlign);
        if(s.split){
          box.appendChild(el("div","rf-entry-top rf-split","<span>"+RF.escapeHtml(e.heading)+"</span>"+(e.dates?"<span>"+RF.escapeHtml(e.dates)+"</span>":"")));
          if(e.org || e.location) box.appendChild(el("div","rf-entry-sub rf-split","<span>"+RF.escapeHtml(e.org)+"</span>"+(e.location?"<span>"+RF.escapeHtml(e.location)+"</span>":"")));
        } else {
          var line1 = [e.heading, e.dates].filter(Boolean).join("  |  ");
          box.appendChild(el("div","rf-entry-top", RF.escapeHtml(line1)));
          var line2 = [e.org, e.location].filter(Boolean).join("  |  ");
          if(line2) box.appendChild(el("div","rf-entry-sub", RF.escapeHtml(line2)));
        }
        if(e.description){
          box.appendChild(el("p","rf-entry-desc", RF.escapeHtml(e.description)));
        }
        if(e.bullets.length){
          if(s.style === "paragraph"){
            box.appendChild(el("p","rf-paragraph", RF.escapeHtml(RF.joinAsParagraph(e.bullets))));
          } else {
            var ul = document.createElement("ul");
            ul.className = "rf-bullets";
            e.bullets.forEach(function(b){ var li = document.createElement("li"); li.textContent = b; ul.appendChild(li); });
            box.appendChild(ul);
          }
        }
        sec.appendChild(box);
      });
    }
    page.appendChild(sec);
  });
  return page;
}


/* ============================ EXPORTS (PDF / DOCX) ============================ */
async function exportPdf(){
  if(!window.jspdf){ showToast("PDF engine still loading — try again in a second."); return; }
  try{
    var m = RF.buildModel(state);
    var doc = new window.jspdf.jsPDF({unit:"pt", format: m.pageSize === "a4" ? "a4" : "letter"});
    var pageW = doc.internal.pageSize.getWidth();
    var pageH = doc.internal.pageSize.getHeight();
    var margin = 48, maxW = pageW - margin*2, y = margin;
    var accent = RF.hexToRgb(m.accent);
    var isModern = m.template === "modern";
    var font = m.template === "harvard" ? "times" : "helvetica";

    function space(h){ if(y + h > pageH - margin){ doc.addPage(); y = margin; } }
    function ink(){ doc.setTextColor(21,21,21); }
    function accentInk(){ doc.setTextColor(accent.r, accent.g, accent.b); }
    function anchorX(align){ return align === "center" ? pageW/2 : (align === "right" ? pageW - margin : margin); }
    function put(text, align, size, style, gap){
      doc.setFont(font, style || "normal"); doc.setFontSize(size);
      var lines = doc.splitTextToSize(String(text), maxW);
      var lh = gap || size * 1.34;
      lines.forEach(function(line){
        space(lh);
        doc.text(line, anchorX(align === "justify" ? "left" : align), y, {align: align === "justify" ? "left" : align});
        y += lh;
      });
    }
    function putSplit(left, right, size, style, italic){
      doc.setFont(font, italic ? "italic" : (style || "normal")); doc.setFontSize(size);
      var rightW = right ? doc.getTextWidth(right) + 12 : 0;
      var lines = doc.splitTextToSize(String(left||""), maxW - rightW);
      var lh = size * 1.34;
      lines.forEach(function(line, i){
        space(lh);
        doc.text(line, margin, y);
        if(i === 0 && right) doc.text(right, pageW - margin, y, {align:"right"});
        y += lh;
      });
      if(!lines.length && right){ space(lh); doc.text(right, pageW - margin, y, {align:"right"}); y += lh; }
    }
    function bullets(items, align){
      var size = 10.2, indent = 13;
      doc.setFont(font,"normal"); doc.setFontSize(size);
      items.forEach(function(item){
        if(align === "left" || align === "justify"){
          var lines = doc.splitTextToSize(item, maxW - indent);
          lines.forEach(function(line, i){
            space(size*1.36);
            if(i === 0) doc.text("\u2022", margin, y);
            doc.text(line, margin + indent, y);
            y += size*1.36;
          });
        } else {
          put("\u2022 " + item, align, size, "normal");
        }
      });
    }
    function sectionTitle(text, align){
      space(26);
      doc.setFont(font,"bold"); doc.setFontSize(11);
      if(isModern) accentInk(); else ink();
      var up = text.toUpperCase();
      doc.text(up, anchorX(align), y, {align: align, charSpace:0.7});
      var tw = doc.getTextWidth(up) + up.length*0.7;
      y += 5;
      doc.setDrawColor(isModern ? accent.r : 60, isModern ? accent.g : 60, isModern ? accent.b : 60);
      doc.setLineWidth(isModern ? 1 : 1.2);
      if(align === "center") doc.line(margin, y, pageW - margin, y);
      else if(align === "right") doc.line(pageW - margin - Math.max(tw,60), y, pageW - margin, y);
      else doc.line(margin, y, pageW - margin, y);
      ink();
      y += 12;
    }

    /* header */
    var ha = m.header.align;
    doc.setFont(font,"bold"); doc.setFontSize(isModern ? 20 : 19);
    if(isModern) accentInk(); else ink();
    space(24);
    doc.text(m.header.name || "Your Name", anchorX(ha), y, {align: ha});
    y += 22; ink();
    if(m.header.role){ put(m.header.role, ha, 11.5, "normal"); }
    if(m.header.contacts.length){ put(m.header.contacts.join("   |   "), ha, 9.6, "normal", 13); }
    y += 8;

    m.sections.forEach(function(s){
      sectionTitle(s.title, s.titleAlign);
      if(s.type === "summary"){
        put(s.text, s.bodyAlign, 10.4, "normal");
      } else if(s.type === "skills"){
        if(s.display === "list") bullets(s.items, s.bodyAlign);
        else put(s.items.join("   •   "), s.bodyAlign, 10.4, "normal");
      } else if(s.type === "languages"){
        s.items.forEach(function(l){
          put(l.level ? l.language + " \u2013 " + l.level : l.language, s.bodyAlign, 10.4, "normal");
        });
      } else if(s.type === "highlights"){
        bullets(s.items, s.bodyAlign);
      } else {
        s.entries.forEach(function(e){
          if(s.split){
            putSplit(e.heading, e.dates, 10.8, "bold");
            if(e.org || e.location) putSplit(e.org, e.location, 9.9, "normal", true);
          } else {
            put([e.heading, e.dates].filter(Boolean).join("  |  "), s.bodyAlign, 10.8, "bold");
            var l2 = [e.org, e.location].filter(Boolean).join("  |  ");
            if(l2) put(l2, s.bodyAlign, 9.9, "italic");
          }
          if(e.description) put(e.description, s.bodyAlign, 10.2, "normal");
          if(e.bullets.length){
            if(s.style === "paragraph") put(RF.joinAsParagraph(e.bullets), s.bodyAlign, 10.2, "normal");
            else bullets(e.bullets, s.bodyAlign);
          }
          y += 5;
        });
      }
      y += 5;
    });

    /* doc.save() relies on jsPDF's own saver, which is blocked inside a sandboxed
       frame. Emit a blob and use the same anchor download the Word export uses. */
    var blob = doc.output("blob");
    await download(blob, RF.sanitizeFilename(m.header.name) + "-resume.pdf");
    bumpStat("exportsCount");
    logActivity("Downloaded \u201c" + (m.header.name || "Untitled") + "\u201d as PDF");
  }catch(err){
    console.error(err);
    showToast("PDF export failed: " + (err && err.message ? err.message : err));
  }
}

/* ---------------- DOCX export ---------------- */
async function exportDocx(){
  if(!window.docx){ showToast("Word engine still loading — try again in a second."); return; }
  try{
    var d = window.docx;
    var m = RF.buildModel(state);
    var AT = {left:d.AlignmentType.LEFT, center:d.AlignmentType.CENTER, right:d.AlignmentType.RIGHT, justify:d.AlignmentType.JUSTIFIED};
    var isModern = m.template === "modern";
    var accentHex = isModern ? RF.rgbToHex2(RF.hexToRgb(m.accent)) : "111111";
    var font = m.template === "harvard" ? "Georgia" : (isModern ? "Calibri" : "Arial");
    var kids = [];

    kids.push(new d.Paragraph({
      alignment: AT[m.header.align], spacing:{after:40},
      children:[new d.TextRun({text: m.header.name || "Your Name", bold:true, size: isModern ? 40 : 38, font:font, color: accentHex})]
    }));
    if(m.header.role){
      kids.push(new d.Paragraph({alignment:AT[m.header.align], spacing:{after:40},
        children:[new d.TextRun({text:m.header.role, size:23, font:font, color:"444444"})]}));
    }
    if(m.header.contacts.length){
      kids.push(new d.Paragraph({alignment:AT[m.header.align], spacing:{after:160},
        children:[new d.TextRun({text:m.header.contacts.join("   |   "), size:19, font:font, color:"333333"})]}));
    }

    m.sections.forEach(function(s){
      kids.push(new d.Paragraph({
        alignment: AT[s.titleAlign], spacing:{before:200, after:70},
        border:{bottom:{color: isModern ? accentHex : "333333", space:2, style:d.BorderStyle.SINGLE, size:6}},
        children:[new d.TextRun({text:(s.title||"").toUpperCase(), bold:true, size:21, font:font, color: isModern ? accentHex : "111111", characterSpacing:22})]
      }));
      if(s.type === "summary"){
        kids.push(new d.Paragraph({alignment:AT[s.bodyAlign], spacing:{after:80}, children:[new d.TextRun({text:s.text, size:20, font:font})]}));
      } else if(s.type === "skills"){
        if(s.display === "list"){
          s.items.forEach(function(x){
            kids.push(new d.Paragraph({bullet:{level:0}, alignment:AT[s.bodyAlign], spacing:{after:10}, children:[new d.TextRun({text:x, size:19, font:font})]}));
          });
        } else {
          kids.push(new d.Paragraph({alignment:AT[s.bodyAlign], spacing:{after:80}, children:[new d.TextRun({text:s.items.join("   •   "), size:20, font:font})]}));
        }
      } else if(s.type === "languages"){
        s.items.forEach(function(l){
          kids.push(new d.Paragraph({alignment:AT[s.bodyAlign], spacing:{after:20}, children:[new d.TextRun({text: l.level ? l.language + " \u2013 " + l.level : l.language, size:20, font:font})]}));
        });
      } else if(s.type === "highlights"){
        s.items.forEach(function(x){
          kids.push(new d.Paragraph({bullet:{level:0}, alignment:AT[s.bodyAlign], spacing:{after:10}, children:[new d.TextRun({text:x, size:19, font:font})]}));
        });
      } else {
        s.entries.forEach(function(e){
          if(s.split){
            kids.push(new d.Paragraph({
              tabStops:[{type:d.TabStopType.RIGHT, position:d.TabStopPosition.MAX}], spacing:{after:10},
              children:[
                new d.TextRun({text:e.heading, bold:true, size:21, font:font}),
                new d.TextRun({text: e.dates ? "\t"+e.dates : "", size:19, font:font})
              ]}));
            if(e.org || e.location){
              kids.push(new d.Paragraph({
                tabStops:[{type:d.TabStopType.RIGHT, position:d.TabStopPosition.MAX}], spacing:{after:30},
                children:[
                  new d.TextRun({text:e.org, italics:true, size:19, font:font}),
                  new d.TextRun({text: e.location ? "\t"+e.location : "", italics:true, size:19, font:font})
                ]}));
            }
          } else {
            kids.push(new d.Paragraph({alignment:AT[s.bodyAlign], spacing:{after:10},
              children:[new d.TextRun({text:[e.heading, e.dates].filter(Boolean).join("  |  "), bold:true, size:21, font:font})]}));
            var l2 = [e.org, e.location].filter(Boolean).join("  |  ");
            if(l2) kids.push(new d.Paragraph({alignment:AT[s.bodyAlign], spacing:{after:30},
              children:[new d.TextRun({text:l2, italics:true, size:19, font:font})]}));
          }
          if(e.description){
            kids.push(new d.Paragraph({alignment: s.split ? AT.left : AT[s.bodyAlign], spacing:{after:30}, children:[new d.TextRun({text:e.description, size:19, font:font})]}));
          }
          if(s.style === "paragraph"){
            var paraText = RF.joinAsParagraph(e.bullets);
            if(paraText) kids.push(new d.Paragraph({
              alignment: s.split ? AT.left : AT[s.bodyAlign], spacing:{after:10},
              children:[new d.TextRun({text:paraText, size:19, font:font})]
            }));
          } else {
            e.bullets.forEach(function(b){
              kids.push(new d.Paragraph({
                bullet:{level:0}, alignment: s.split ? AT.left : AT[s.bodyAlign], spacing:{after:10},
                children:[new d.TextRun({text:b, size:19, font:font})]
              }));
            });
          }
          kids.push(new d.Paragraph({text:"", spacing:{after:40}}));
        });
      }
    });

    var doc = new d.Document({
      creator:"ResumeForge",
      title:(m.header.name || "Resume"),
      sections:[{
        properties:{page:{
          size:{width: m.pageSize === "a4" ? 11906 : 12240, height: m.pageSize === "a4" ? 16838 : 15840},
          margin:{top:864, bottom:864, left:864, right:864}
        }},
        children: kids
      }]
    });
    var blob = await d.Packer.toBlob(doc);
    await download(blob, RF.sanitizeFilename(m.header.name) + "-resume.docx");
    bumpStat("exportsCount");
    logActivity("Downloaded \u201c" + (m.header.name || "Untitled") + "\u201d as Word");
  }catch(err){
    console.error(err);
    showToast("Word export failed — details in the console.");
  }
}



/* ============================ TOP-LEVEL RENDER ============================ */
function render(){
  closePopover();
  if(sectionObserver){ sectionObserver.disconnect(); sectionObserver = null; }
  app.innerHTML = "";
  app.appendChild(renderNavbar());
  if(activeTab === "builder") app.appendChild(renderToolbar2());

  if(activeTab === "templates") app.appendChild(renderGalleryTab());
  else if(activeTab === "examples") app.appendChild(renderExamplesTab());
  else if(activeTab === "tips") app.appendChild(renderTipsTab());
  else if(activeTab === "dashboard") app.appendChild(renderDashboardTab());
  else if(activeTab === "myresumes") app.appendChild(renderMyResumesTab());
  else if(activeTab === "ats") app.appendChild(renderAtsCheckerTab());
  else if(activeTab === "cover") app.appendChild(renderCoverLetterTab());
  else app.appendChild(renderWorkspace());

  updateUndoRedoButtons();
  updateSavedIndicator();
}
function rerender(){
  var panel = document.querySelector(".form-panel");
  var top = panel ? panel.scrollTop : 0;
  render();
  var np = document.querySelector(".form-panel");
  if(np) np.scrollTop = top;
}
function refreshPreview(){
  var old = document.getElementById("resume-page");
  if(old) old.replaceWith(buildPreviewEl());
}
function refreshSidenavLabel(sectionId, text){
  var targets = navTargets();
  var idx = targets.findIndex(function(t){ return t.id === "form-section-" + sectionId; });
  if(idx < 0) return;
  var items = document.querySelectorAll(".sidenav-item .sn-label");
  if(items[idx]) items[idx].textContent = text || "Untitled";
}

/* ============================ NAVBAR ============================ */
function renderNavbar(){
  var bar = el("div","navbar");
  bar.appendChild(el("div","brand","Resume<em>Forge</em>"));

  var tabs = el("nav","nav-tabs");
  [["dashboard","Dashboard"],["builder","Resume Builder"],["templates","Templates"],
   ["myresumes","My Resumes"],["ats","ATS Checker"],["cover","Cover Letter"],
   ["examples","Examples"],["tips","Guides & Tips"]].forEach(function(t){
    var b = el("button","nav-tab"+(activeTab===t[0]?" active":""), t[1]);
    b.onclick = function(){
      activeTab = t[0];
      if(t[0]!=="builder") previewOnly=false;
      if(t[0]==="templates") bumpStat("templateViews");
      render();
    };
    tabs.appendChild(b);
  });
  bar.appendChild(tabs);

  var right = el("div","nav-right");

  var bellWrap = el("div",""); bellWrap.style.position = "relative";
  var unseen = unseenActivityCount();
  var bellBtn = el("button","icon-btn", svgIcon("bell",17) + (unseen ? '<span class="notif-dot"></span>' : ""));
  bellBtn.title = "Recent activity";
  bellBtn.onclick = function(ev){ ev.stopPropagation(); activityMenu(bellWrap); };
  bellWrap.appendChild(bellBtn);
  right.appendChild(bellWrap);

  var themeBtn = el("button","icon-btn", svgIcon(currentEffectiveTheme()==="dark" ? "sun" : "moon", 17));
  themeBtn.id = "theme-toggle";
  themeBtn.title = "Toggle light / dark";
  themeBtn.onclick = toggleTheme;
  right.appendChild(themeBtn);

  var profileWrap = el("div","profile-btn");
  var ownerName = (state.heading.name || "").trim() || "Your Resume";
  var initial = ownerName.charAt(0).toUpperCase() || "R";
  profileWrap.innerHTML = '<span class="avatar-circle">'+initial+'</span><span class="profile-name"></span>' + svgIcon("chevronDown",14);
  profileWrap.querySelector(".profile-name").textContent = ownerName;
  profileWrap.title = "Data: save, load or reset";
  profileWrap.onclick = function(ev){ ev.stopPropagation(); dataMenu(); };
  right.appendChild(profileWrap);

  bar.appendChild(right);
  return bar;
}

function activityMenu(anchor){
  var existing = document.getElementById("activity-menu");
  if(existing){ existing.remove(); return; }
  markActivitySeen();
  var menu = el("div",""); menu.id = "activity-menu";
  menu.className = "activity-menu";
  var items = loadActivity();
  menu.appendChild(el("div","activity-menu-head","Recent activity"));
  if(!items.length){
    menu.appendChild(el("div","activity-empty","Nothing yet - actions like creating, exporting or duplicating a resume will show up here."));
  } else {
    items.forEach(function(a){
      var row = el("div","activity-row");
      row.appendChild(el("div","",a.message));
      row.appendChild(el("div","activity-time", relativeTimeShort(a.at)));
      menu.appendChild(row);
    });
  }
  anchor.appendChild(menu);
  setTimeout(function(){
    document.addEventListener("click", function h(e){
      if(!menu.contains(e.target)){ menu.remove(); document.removeEventListener("click", h); render(); }
    });
  }, 0);
}
function relativeTimeShort(at){
  var mins = Math.round((Date.now() - at) / 60000);
  if(mins < 1) return "just now";
  if(mins < 60) return mins + "m ago";
  var hrs = Math.round(mins/60);
  if(hrs < 24) return hrs + "h ago";
  return Math.round(hrs/24) + "d ago";
}

/* ============================ TOOLBAR ============================ */
function renderToolbar2(){
  var bar = el("div","toolbar2");

  var back = el("button","back-link", svgIcon("arrowLeft",15)+"<span>Templates</span>");
  back.onclick = function(){ activeTab = "templates"; render(); };
  bar.appendChild(back);

  var g1 = el("div","tb-group");
  var tplSel = document.createElement("select"); tplSel.className = "tb-select";
  TEMPLATES.forEach(function(t){
    var o = document.createElement("option"); o.value = t.id; o.textContent = t.name;
    if(t.id === state.templateId) o.selected = true;
    tplSel.appendChild(o);
  });
  tplSel.onchange = function(e){ snapshotHistory(); state.templateId = e.target.value; saveState(); rerender(); };
  var sizeSel = document.createElement("select"); sizeSel.className = "tb-select";
  [["letter","US Letter"],["a4","A4"]].forEach(function(o){
    var op = document.createElement("option"); op.value = o[0]; op.textContent = o[1];
    if(o[0] === state.pageSize) op.selected = true;
    sizeSel.appendChild(op);
  });
  sizeSel.onchange = function(e){ snapshotHistory(); state.pageSize = e.target.value; saveState(); refreshPreview(); };
  g1.appendChild(tplSel); g1.appendChild(sizeSel);
  bar.appendChild(g1);

  var autoBtn = el("button","tb-btn", svgIcon("sliders",15)+"<span>Auto-align</span>");
  autoBtn.title = "Reset every block to this template's recommended alignment";
  autoBtn.onclick = function(){
    snapshotHistory();
    state.heading.align = "auto";
    state.sections.forEach(function(s){ s.align = "auto"; });
    saveState(); rerender(); showToast("Alignment reset to template defaults.");
  };
  bar.appendChild(autoBtn);

  bar.appendChild(el("div","tb-spacer"));

  var saved = el("div","saved-indicator", svgIcon("check",13)+'<span id="saved-indicator-text">'+relativeSaved()+"</span>");
  bar.appendChild(saved);

  var cloudIcon = cloudStatus === "synced" ? "cloudCheck" : cloudStatus === "checking" ? "cloud" : "cloudOff";
  var cloudInd = el("div","saved-indicator cloud-indicator"+(cloudStatus==="synced"?" is-synced":""), svgIcon(cloudIcon,13)+'<span id="cloud-indicator-text"></span>');
  cloudInd.querySelector("#cloud-indicator-text").textContent = cloudStatusLabel();
  cloudInd.title = cloudStatus === "synced"
    ? "Your resumes are saved to your account and will follow you to any device."
    : "Sign in to sync your resumes across devices. For now everything is saved only in this browser.";
  bar.appendChild(cloudInd);

  var undoBtn = el("button","tb-icon-btn", svgIcon("undo",15)); undoBtn.id = "tb-undo";
  undoBtn.title = "Undo (Ctrl/Cmd+Z)"; undoBtn.disabled = historyStack.length === 0;
  undoBtn.onclick = undo;
  var redoBtn = el("button","tb-icon-btn", svgIcon("redo",15)); redoBtn.id = "tb-redo";
  redoBtn.title = "Redo (Ctrl/Cmd+Shift+Z)"; redoBtn.disabled = redoStack.length === 0;
  redoBtn.onclick = redo;
  bar.appendChild(undoBtn); bar.appendChild(redoBtn);

  var previewBtn = el("button","tb-btn", svgIcon(previewOnly?"eyeOff":"eye",15)+"<span>"+(previewOnly?"Edit":"Preview")+"</span>");
  previewBtn.onclick = function(){ previewOnly = !previewOnly; render(); };
  bar.appendChild(previewBtn);

  var pdfBtn = el("button","tb-btn primary", svgIcon("download",15)+"<span>Download PDF</span>");
  pdfBtn.onclick = exportPdf;
  var docxBtn = el("button","tb-btn outline", svgIcon("download",15)+"<span>Download Word</span>");
  docxBtn.onclick = exportDocx;
  bar.appendChild(pdfBtn); bar.appendChild(docxBtn);

  return bar;
}

/* ============================ TEMPLATES TAB ============================ */
function renderGalleryTab(){
  var wrap = el("div","gallery-wrap");
  wrap.appendChild(el("div","gallery-head",
    "<h1>Pick a format built to survive the software screen \u2014 and hold a recruiter\u2019s attention.</h1>"+
    "<p>All three formats are single-column and use the standard section headings parsers expect. Two-column \u201Csidebar\u201D resumes look sharp but frequently scramble text when an applicant tracking system reads across columns, so none of them are offered here.</p>"+
    '<p class="note">Choose a look \u2014 you can switch templates at any point without losing a word of what you\u2019ve written.</p>'));
  var gallery = el("div","gallery");
  TEMPLATES.forEach(function(t){
    var card = el("div","tpl-card"+(state.templateId===t.id?" selected":""));
    var thumb = el("div","tpl-thumb "+t.thumbClass,
      '<div class="tn">Alex Rivera</div><div class="tc">alex@email.com \u00b7 +91 98765 43210 \u00b7 Mumbai, India</div>'+
      '<div class="th">Summary</div><div class="tl w80"></div><div class="tl w60"></div>'+
      '<div class="th">Experience</div><div class="tl w40"></div><div class="tl w80"></div><div class="tl w60"></div>'+
      '<div class="th">Education</div><div class="tl w60"></div>');
    var meta = el("div","tpl-meta",'<span class="tpl-tag">'+t.tag+'</span><h3>'+t.name+'</h3><p>'+t.desc+'</p>');
    var pick = el("button","tpl-pick", state.templateId===t.id ? "Continue with this" : "Use this template");
    pick.onclick = function(){ snapshotHistory(); state.templateId = t.id; saveState(); activeTab = "builder"; render(); };
    meta.appendChild(pick);
    card.appendChild(thumb); card.appendChild(meta);
    gallery.appendChild(card);
  });
  wrap.appendChild(gallery);
  wrap.appendChild(renderCareerStageBlock());
  return wrap;
}

/* ---- career-stage layout presets ----
   Based on Korn Ferry's guidance on structuring a resume by experience
   level (recent grad / early career / mid-level professional). This only
   reorders your existing sections and never deletes content - nothing
   you've written is lost by trying one. */
var CAREER_STAGES = [
  {id:"grad", label:"Recent graduate",
   desc:"Leads with Education, since you have more to show there than in a short work history. Keeps internships and activities specific rather than just listed.",
   order:["education","experience","projects","skills","certifications","summary","custom"]},
  {id:"junior", label:"Early career (0\u20132 yrs)",
   desc:"Skips the summary \u2014 with limited experience it tends to restate the obvious \u2014 and puts your relevant work front and center.",
   order:["skills","experience","projects","education","certifications","summary","custom"]},
  {id:"mid", label:"Mid-level professional (7+ yrs)",
   desc:"Leads with a Summary seeded with the target role's keywords, then gives most of the page to your most recent role's achievements.",
   order:["summary","experience","projects","skills","education","certifications","custom"]}
];
function renderCareerStageBlock(){
  var wrap = el("div","");
  wrap.style.marginTop = "34px";
  wrap.appendChild(el("h2","","Not sure how to order things?"));
  wrap.style.setProperty("--x","0");
  var head = el("div","gallery-head");
  head.style.margin = "6px 0 18px";
  head.innerHTML = '<p style="margin:0;">Apply a section order matched to your experience level. This only reorders the sections you already have \u2014 it never deletes anything.</p>';
  wrap.appendChild(head);
  var row = el("div","");
  row.style.cssText = "display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px;";
  CAREER_STAGES.forEach(function(stage){
    var card = el("div","static-card");
    card.style.marginBottom = "0";
    card.appendChild(el("h3","",stage.label));
    card.appendChild(el("p","",stage.desc));
    var btn = el("button","tpl-pick", "Apply this order");
    btn.style.marginTop = "12px";
    btn.onclick = function(){
      snapshotHistory();
      applyCareerStageOrder(stage.order);
      saveState(); activeTab = "builder"; render();
      showToast("Sections reordered for \u201C" + stage.label + "\u201D.");
    };
    card.appendChild(btn);
    row.appendChild(card);
  });
  wrap.appendChild(row);
  return wrap;
}
function applyCareerStageOrder(order){
  var rank = function(type){ var i = order.indexOf(type); return i === -1 ? order.length : i; };
  state.sections = state.sections.slice().sort(function(a,b){
    var ra = rank(a.type), rb = rank(b.type);
    if(ra !== rb) return ra - rb;
    return 0; /* stable sort keeps original relative order within the same type */
  });
}

var TEMPLATES = [
  {id:"classic", name:"ATS Classic", tag:"Safest choice", thumbClass:"",
   desc:"Single-column reverse-chronological layout modelled on the format applicant tracking systems parse most reliably. The default for corporate, tech, finance and government roles."},
  {id:"harvard", name:"Harvard Minimal", tag:"Education-first", thumbClass:"harvard",
   desc:"The centred serif format taught by university career centres. Understated and credible \u2014 strong for academia, consulting, law and early-career applications."},
  {id:"modern", name:"Modern Compact", tag:"Subtle colour", thumbClass:"modern",
   desc:"The same safe skeleton as Classic with a restrained accent colour on headings. A little more personality for startups, still fully machine-readable."}
];

/* ============================ EXAMPLES TAB ============================ */
function renderExamplesTab(){
  var wrap = el("div","static-wrap");
  wrap.appendChild(el("h1","","Bullet phrases worth adapting"));
  wrap.appendChild(el("p","lede","Real resumes read well because each line names an action, what it acted on, and a result. These are patterns to borrow and rewrite in your own words \u2014 never copy a line verbatim into your resume, since specifics are what make a bullet credible."));
  var groups = [
    {title:"Led or owned something", icon:"briefcase", items:[
      "Led a cross-functional team of 6 to redesign the onboarding flow, cutting time-to-first-value by 35%.",
      "Owned the roadmap for a product used by 50,000+ monthly active users.",
      "Directed the migration of a legacy billing system with zero downtime."
    ]},
    {title:"Improved a number", icon:"barChart", items:[
      "Reduced page load time from 4.2s to 1.1s by optimizing the image pipeline.",
      "Increased qualified pipeline by 22% by rebuilding the lead-scoring model.",
      "Cut customer support tickets by 40% by shipping self-serve account recovery."
    ]},
    {title:"Built something new", icon:"folder", items:[
      "Designed and shipped an internal analytics dashboard now used by 8 teams.",
      "Built a CI/CD pipeline that reduced deploy time from 45 minutes to 6.",
      "Prototyped and launched a referral program that drove 12% of new signups."
    ]},
    {title:"Collaborated across teams", icon:"user", items:[
      "Partnered with design and legal to ship GDPR-compliant data export in 3 weeks.",
      "Worked directly with 5 enterprise customers to prioritize the Q3 roadmap.",
      "Mentored 2 junior engineers, both promoted within a year."
    ]}
  ];
  groups.forEach(function(g){
    var card = el("div","static-card");
    card.appendChild(el("h3","", svgIcon(g.icon,15)+"<span>"+g.title+"</span>"));
    var ul = document.createElement("ul");
    g.items.forEach(function(i){ var li = document.createElement("li"); li.textContent = i; ul.appendChild(li); });
    card.appendChild(ul);
    wrap.appendChild(card);
  });

  wrap.appendChild(el("h1","","Action verbs by category"));
  wrap.appendChild(el("p","lede","Adapted from Harvard's career-services action verb list. Starting a bullet with a strong, specific verb makes the achievement easier to scan \u2014 and easier to believe."));
  var verbGroups = [
    {title:"Leadership", verbs:["Directed","Coordinated","Delegated","Executed","Orchestrated","Spearheaded","Mentored"]},
    {title:"Communication", verbs:["Authored","Presented","Negotiated","Persuaded","Facilitated","Advocated","Briefed"]},
    {title:"Research & analysis", verbs:["Analyzed","Investigated","Evaluated","Synthesized","Forecasted","Benchmarked","Diagnosed"]},
    {title:"Technical", verbs:["Built","Engineered","Automated","Deployed","Debugged","Migrated","Optimized"]},
    {title:"Quantitative", verbs:["Reduced","Increased","Generated","Forecasted","Budgeted","Reconciled","Projected"]},
    {title:"Organizational", verbs:["Streamlined","Standardized","Consolidated","Restructured","Implemented","Scheduled"]}
  ];
  var vcard = el("div","static-card");
  verbGroups.forEach(function(vg){
    var row = el("p","");
    row.innerHTML = "<strong>" + vg.title + ":</strong> " + vg.verbs.join(", ");
    vcard.appendChild(row);
  });
  wrap.appendChild(vcard);
  return wrap;
}

/* ============================ TIPS TAB ============================ */
function renderTipsTab(){
  var wrap = el("div","static-wrap");
  wrap.appendChild(el("h1","","Getting past the screen, then the reader"));
  wrap.appendChild(el("p","lede","Two different readers look at your resume: parsing software first, then a person. These hold up for both."));
  var tips = [
    {title:"Stick to one column", body:"Multi-column \u201Csidebar\u201D layouts look modern but many ATS engines read left-to-right across the whole line, scrambling a sidebar's contact info into the middle of your work history. All three templates here are single-column for this reason."},
    {title:"Use the headings parsers expect", body:"Summary, Skills, Experience, Education \u2014 not \u201CWhat I bring\u201D or \u201CMy journey.\u201D Creative headings are the single most common reason a real section gets skipped entirely by parsing software."},
    {title:"Quantify wherever you can", body:"\u201CImproved onboarding\u201D is a claim. \u201CCut onboarding time from 12 minutes to 4\u201D is evidence. A number, a percentage, or a before/after tells a reader more in less space."},
    {title:"Keep dates consistent", body:"Pick one date format and use it everywhere \u2014 this builder's date pickers do that for you automatically, including a clean \u201CPresent\u201D for your current role."},
    {title:"Save as PDF unless a form says otherwise", body:"PDF preserves your layout exactly. Only send a Word file if an application explicitly asks for one \u2014 some older systems still expect .docx."},
    {title:"Match your language to the job post", body:"If the listing says \u201Cstakeholder management\u201D and your resume says \u201Cworked with clients,\u201D a keyword-matching system may not connect the two. Mirror the phrasing where it's honestly true of your experience."}
  ];
  tips.forEach(function(t){
    var card = el("div","static-card");
    card.appendChild(el("h3","", svgIcon("lightbulb",15)+"<span>"+t.title+"</span>"));
    card.appendChild(el("p","",t.body));
    wrap.appendChild(card);
  });

  wrap.appendChild(el("h1","","Writing for your experience level"));
  wrap.appendChild(el("p","lede","A senior hire and a new graduate shouldn't structure a resume the same way. Adapted from Korn Ferry's guidance on resumes by career stage \u2014 apply a matching section order from the Templates tab."));
  var stages = [
    {title:"Recent graduate", body:"Put Education first \u2014 school, degree, GPA if strong, honors. Keep internship bullets short and specific rather than padded. Use activities to tell a story, not just list memberships. Keep it to one page with generous white space, and skip \u201Creferences available upon request\u201D \u2014 it's assumed."},
    {title:"Early career (0\u20132 years)", body:"Skip the objective statement \u2014 it rarely says anything a hiring manager can use. No summary either; with limited experience it tends to just restate the obvious. It's fine to credit a team (\u201Cwe shipped\u201D, \u201Cour team improved\u201D) rather than overclaiming solo credit. Only include experience relevant to the role, not every job you've held."},
    {title:"Mid-level professional (7+ years)", body:"Lead with a short professional summary seeded with the exact keywords from the job description. Give roughly three-quarters of your Experience section's space to your most recent role. Quantify results (\u201C35% increase\u201D) without over-explaining the mechanism. Limit each job to 2\u20134 bullets and prioritize achievements over routine duties."}
  ];
  stages.forEach(function(s){
    var card = el("div","static-card");
    card.appendChild(el("h3","", svgIcon("user",15)+"<span>"+s.title+"</span>"));
    card.appendChild(el("p","",s.body));
    wrap.appendChild(card);
  });
  return wrap;
}


/* ============================ WORKSPACE (builder tab) ============================ */
function renderWorkspace(){
  var ws = el("div","workspace"+(previewOnly ? " preview-only" : (" "+"with-sidenav")));
  if(!previewOnly){
    ws.appendChild(renderSidenav());
    ws.appendChild(renderFormPanel());
  }
  ws.appendChild(renderPreviewPanel());
  if(!previewOnly) setTimeout(setupSectionObserver, 0);
  return ws;
}

function navTargets(){
  var targets = [{id:"form-personal", label:"Personal Info", icon:"user"}];
  state.sections.forEach(function(s){
    targets.push({id:"form-section-"+s.id, label:s.title || "Untitled", icon: SECTION_ICON[s.type] || "bookmark"});
  });
  return targets;
}

function renderSidenav(){
  var nav = el("div","sidenav");
  var targets = navTargets();
  targets.forEach(function(tgt){
    var item = el("button","sidenav-item"+(activeSectionId===tgt.id?" active":""),
      svgIcon(tgt.icon,15)+'<span class="sn-label"></span>');
    item.querySelector(".sn-label").textContent = tgt.label;
    item.onclick = function(){
      var node = document.getElementById(tgt.id);
      if(node) node.scrollIntoView({behavior:"smooth", block:"start"});
    };
    nav.appendChild(item);
  });
  var addWrap = el("div","sidenav-add");
  var addItem = el("button","sidenav-item", svgIcon("plusCircle",15)+'<span class="sn-label">Add a section</span>');
  addItem.onclick = function(){
    var node = document.getElementById("add-section-anchor");
    if(node){ node.scrollIntoView({behavior:"smooth", block:"center"}); var s = node.querySelector("select"); if(s) s.focus(); }
  };
  addWrap.appendChild(addItem);
  nav.appendChild(addWrap);

  var tips = el("div","sidenav-tips");
  tips.appendChild(el("div","sidenav-tips-head", svgIcon("lightbulb",14)+"<span>Tip</span>"));
  tips.appendChild(el("p","","Keep your resume concise, clear and ATS-friendly \u2014 one page for under 8 years of experience."));
  nav.appendChild(tips);
  return nav;
}

function setupSectionObserver(){
  var blocks = document.querySelectorAll(".form-block[id]");
  if(!blocks.length || typeof IntersectionObserver === "undefined") return;
  var visible = {};
  sectionObserver = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ visible[e.target.id] = e.intersectionRatio; });
    var bestId = null, bestRatio = 0;
    Object.keys(visible).forEach(function(id){ if(visible[id] > bestRatio){ bestRatio = visible[id]; bestId = id; } });
    if(bestId && bestId !== activeSectionId){
      activeSectionId = bestId;
      var items = document.querySelectorAll(".sidenav-item");
      var targets = navTargets();
      items.forEach(function(btn, i){
        if(targets[i] && targets[i].id === bestId) btn.classList.add("active"); else btn.classList.remove("active");
      });
    }
  }, {root: document.querySelector(".form-panel"), threshold:[0.1,0.3,0.6]});
  blocks.forEach(function(b){ sectionObserver.observe(b); });
}

/* ---------------- form panel ---------------- */
function renderFormPanel(){
  var panel = el("div","form-panel");
  panel.appendChild(renderPersonalInfoBlock());
  state.sections.forEach(function(s){ panel.appendChild(renderSectionBlock(s)); });
  panel.appendChild(renderAddSectionRow());
  return panel;
}

function fieldInput(labelText, value, onInput, opts){
  opts = opts || {};
  var wrap = el("div","field");
  var lbl = el("label","", labelText + (opts.required ? '<span class="req">*</span>' : (opts.optionalNote ? ' <span style="font-weight:400;color:var(--ink-faint)">'+opts.optionalNote+'</span>' : "")));
  wrap.appendChild(lbl);
  var input = document.createElement("input");
  input.value = value || ""; input.placeholder = opts.placeholder || labelText;
  input.oninput = function(e){ noteTypingEdit(); onInput(e.target.value); };
  wrap.appendChild(input);
  return wrap;
}
function fieldArea(labelText, value, onInput, opts){
  opts = opts || {};
  var wrap = el("div","field");
  if(labelText) wrap.appendChild(el("label","",labelText));
  if(opts.help) wrap.appendChild(el("div","field-help",opts.help));
  var ta = document.createElement("textarea");
  ta.value = value || ""; ta.rows = opts.rows || 3;
  ta.oninput = function(e){ noteTypingEdit(); onInput(e.target.value); };
  wrap.appendChild(ta);
  if(opts.counter) {
    var counter = el("div","charcount", (value||"").length + "/" + opts.counter);
    if((value||"").length > opts.counter) counter.classList.add("over");
    ta.addEventListener("input", function(){
      counter.textContent = ta.value.length + "/" + opts.counter;
      counter.classList.toggle("over", ta.value.length > opts.counter);
    });
    wrap.appendChild(counter);
  }
  return wrap;
}
function alignPills(current, onChange, showJustify){
  var opts = [["auto","Auto"],["left","Left"],["center","Center"],["right","Right"]];
  if(showJustify) opts.push(["justify","Justify"]);
  var row = el("div","align-row");
  row.appendChild(el("span","lbl","Align"));
  var pills = el("div","align-pills");
  opts.forEach(function(o){
    var b = el("button","align-pill"+((current||"auto")===o[0]?" active":""), o[1]);
    b.type = "button";
    b.onclick = function(){ snapshotHistory(); onChange(o[0]); saveState(); rerender(); };
    pills.appendChild(b);
  });
  row.appendChild(pills);
  return row;
}

/* ---- personal info block ---- */
function renderPersonalInfoBlock(){
  var block = el("div","form-block"); block.id = "form-personal";
  var head = el("div","form-block-head");
  head.appendChild(el("div","")); // spacer to align with drag handle column on other blocks
  var titleWrap = el("div","form-block-titlewrap");
  titleWrap.appendChild(el("h2","form-block-title","Personal Information"));
  titleWrap.appendChild(el("div","form-block-sub","Add your basic details and contact information."));
  head.appendChild(titleWrap);
  block.appendChild(head);

  block.appendChild(alignPills(state.heading.align, function(v){ state.heading.align = v; }, false));

  var grid = el("div","field-grid");
  grid.appendChild(fieldInput("Full Name", state.heading.name, function(v){ state.heading.name = v; saveState(); refreshPreview(); }, {required:true}));
  grid.appendChild(fieldInput("Target Role", state.heading.role, function(v){ state.heading.role = v; saveState(); refreshPreview(); }, {optionalNote:"(Optional)"}));
  block.appendChild(grid);

  state.heading.contacts.forEach(function(c){ block.appendChild(renderContactRow(c)); });
  var add = el("button","add-contact-btn", svgIcon("plus",13)+"<span>Add contact field</span>");
  add.onclick = function(){ snapshotHistory(); state.heading.contacts.push({id:RF.uid(), label:"Email", value:"", custom:false}); saveState(); rerender(); };
  block.appendChild(add);
  return block;
}

var contactRefreshers = {};
function renderContactRow(c){
  var row = el("div","contact-row");
  var isCustom = !!c.custom || RF.CONTACT_PRESETS.indexOf(c.label) === -1;

  var lf = el("div","contact-label-wrap"+(isCustom ? " is-custom" : ""));
  var lselRow = isCustom ? el("div","row2") : lf;
  if(isCustom) lf.appendChild(lselRow);
  var lsel = document.createElement("select");
  RF.CONTACT_PRESETS.forEach(function(pl){
    var o = document.createElement("option"); o.value = pl; o.textContent = pl;
    if(!isCustom && c.label === pl) o.selected = true;
    lsel.appendChild(o);
  });
  var co = document.createElement("option"); co.value = "__custom__"; co.textContent = "Custom\u2026";
  if(isCustom) co.selected = true;
  lsel.appendChild(co);
  lsel.onchange = function(e){
    snapshotHistory();
    if(e.target.value === "__custom__"){ c.custom = true; c.label = ""; }
    else { c.custom = false; c.label = e.target.value; }
    saveState(); rerender();
  };
  lselRow.appendChild(lsel);
  if(isCustom){
    var nameInput = document.createElement("input");
    nameInput.value = c.label; nameInput.placeholder = "e.g. Skype"; nameInput.title = "Name this field";
    nameInput.oninput = function(e){ noteTypingEdit(); c.label = e.target.value; saveState(); if(contactRefreshers[c.id]) contactRefreshers[c.id](); };
    lselRow.appendChild(nameInput);
  }

  var vf = el("div","contact-value-wrap loc-field");
  var vrow = el("div","value-with-help");
  var vin = document.createElement("input");
  vin.value = c.value;
  vin.oninput = function(e){ noteTypingEdit(); c.value = e.target.value; saveState(); refreshPreview(); };
  vrow.appendChild(vin);
  var pickBtn = null;
  function syncLocationHelp(){
    var wantsPicker = RF.isLocationLabel(c.label);
    vin.placeholder = wantsPicker ? "Pick or type a city" : "Value";
    if(wantsPicker && !pickBtn){
      pickBtn = el("button","tb-icon-btn loc-trigger", svgIcon("mapPin",14));
      pickBtn.title = "Look up a city";
      pickBtn.onclick = function(ev){
        ev.stopPropagation();
        openLocationPicker(vf, c.value, function(val){ snapshotHistory(); c.value = val; vin.value = val; saveState(); refreshPreview(); });
      };
      vrow.appendChild(pickBtn);
    } else if(!wantsPicker && pickBtn){
      pickBtn.remove(); pickBtn = null; closePopover();
    }
  }
  syncLocationHelp();
  contactRefreshers[c.id] = syncLocationHelp;
  vf.appendChild(vrow);

  var rm = el("button","tiny-icon-btn danger", svgIcon("trash",14));
  rm.title = "Remove field";
  rm.onclick = function(){ snapshotHistory(); state.heading.contacts = state.heading.contacts.filter(function(x){ return x.id !== c.id; }); saveState(); rerender(); };

  row.appendChild(lf); row.appendChild(vf); row.appendChild(rm);
  return row;
}

/* ---- section blocks ---- */
var SECTION_SUBTITLES = {
  summary: "Write a short summary about yourself (2\u20134 lines). Tip: rename this section to \u201CProfile\u201D if you prefer that heading.",
  skills: "Add relevant skills \u2014 press Enter or click Add after each one.",
  languages: "Add the languages you speak and how well you speak each.",
  highlights: "A short bullet list of your overall career highlights, separate from the detailed Experience section.",
  experience: "Add your work experience, most recent first.",
  projects: "Showcase notable projects: what each was, and what you did on it.",
  education: "Add your education history, most recent first.",
  certifications: "List relevant certifications or licenses.",
  custom: "Add whatever belongs in this section."
};
var ENTRY_LABELS = {
  experience: {add:"Add experience", heading:"Job Title", org:"Company", desc:"Description (optional)", bullets:"Key achievements (one per line)"},
  projects: {add:"Add project", heading:"Project Name", org:"Tech stack / role", desc:"Project Description (optional)", bullets:"Role & Contribution (one per line)"},
  education: {add:"Add education", heading:"Degree / Qualification", org:"Institution", desc:"Description (optional)", bullets:"Details (one per line)"},
  certifications: {add:"Add certification", heading:"Certification Name", org:"Issuing Organization", desc:"Description (optional)", bullets:"Details (one per line)"},
  custom: {add:"Add entry", heading:"Title", org:"Subtitle", desc:"Description (optional)", bullets:"Details (one per line)"}
};

function renderSectionBlock(s){
  var block = el("div","form-block");
  block.id = "form-section-" + s.id;
  block.dataset.id = s.id;
  block.addEventListener("dragover", function(e){ if(dragId && dragId !== s.id) e.preventDefault(); });
  block.addEventListener("drop", function(e){
    e.preventDefault();
    if(!dragId || dragId === s.id) return;
    var from = state.sections.findIndex(function(x){ return x.id === dragId; });
    var to = state.sections.findIndex(function(x){ return x.id === s.id; });
    if(from < 0 || to < 0) return;
    snapshotHistory();
    state.sections.splice(to, 0, state.sections.splice(from,1)[0]);
    dragId = null; saveState(); rerender();
  });

  var head = el("div","form-block-head");
  var handle = el("span","drag-handle", svgIcon("grip",15));
  handle.draggable = true; handle.title = "Drag to reorder";
  handle.addEventListener("dragstart", function(e){ dragId = s.id; e.dataTransfer.effectAllowed = "move"; try{ e.dataTransfer.setData("text/plain", s.id); }catch(err){} });
  handle.addEventListener("dragend", function(){ dragId = null; });
  head.appendChild(handle);

  var titleWrap = el("div","form-block-titlewrap");
  var titleRow = el("div","form-block-title-row");
  titleRow.appendChild(el("span","", svgIcon(SECTION_ICON[s.type]||"bookmark",16)));
  var ti = document.createElement("input");
  ti.className = "form-block-title-input"; ti.value = s.title;
  ti.oninput = function(e){ noteTypingEdit(); s.title = e.target.value; saveState(); refreshPreview(); refreshSidenavLabel(s.id, s.title); };
  titleRow.appendChild(ti);
  titleWrap.appendChild(titleRow);
  titleWrap.appendChild(el("div","form-block-sub", SECTION_SUBTITLES[s.type] || ""));
  head.appendChild(titleWrap);

  var actions = el("div","form-block-actions");
  var up = el("button","tiny-icon-btn", svgIcon("chevronUp",15)); up.title = "Move up";
  up.onclick = function(){ moveSection(s.id,-1); };
  var dn = el("button","tiny-icon-btn", svgIcon("chevronDown",15)); dn.title = "Move down";
  dn.onclick = function(){ moveSection(s.id,1); };
  var del = el("button","tiny-icon-btn danger", svgIcon("trash",15)); del.title = "Delete section";
  del.onclick = function(){ snapshotHistory(); state.sections = state.sections.filter(function(x){ return x.id !== s.id; }); saveState(); rerender(); };
  actions.appendChild(up); actions.appendChild(dn); actions.appendChild(del);
  head.appendChild(actions);
  block.appendChild(head);

  block.appendChild(alignPills(s.align, function(v){ s.align = v; }, s.type === "summary"));

  if(s.type === "summary"){
    block.appendChild(fieldArea(null, s.text, function(v){ s.text = v; saveState(); refreshPreview(); }, {rows:4, counter:500}));
  } else if(s.type === "skills"){
    block.appendChild(skillsDisplayPills(s));
    block.appendChild(renderSkillTags(s));
  } else if(s.type === "languages"){
    block.appendChild(renderLanguageRows(s));
  } else if(s.type === "highlights"){
    block.appendChild(fieldArea("One bullet per line", (s.items||[]).join("\n"), function(v){
      s.items = RF.splitLines(v); saveState(); refreshPreview();
    }, {rows:5}));
  } else {
    block.appendChild(formatPills(s));
    var labels = ENTRY_LABELS[s.type] || ENTRY_LABELS.custom;
    (s.entries||[]).forEach(function(entry, i){ block.appendChild(renderEntryCard(s, entry, i, labels)); });
    var add = el("button","add-entry-btn", svgIcon("plus",14)+"<span>"+labels.add+"</span>");
    add.onclick = function(){ snapshotHistory(); s.entries.push(RF.emptyEntry(s.type)); saveState(); rerender(); };
    block.appendChild(add);
  }
  return block;
}
function skillsDisplayPills(s){
  var row = el("div","align-row");
  row.appendChild(el("span","lbl","Display"));
  var pills = el("div","align-pills");
  [["tags","Inline"],["list","Vertical list"]].forEach(function(o){
    var b = el("button","align-pill"+((s.display||"tags")===o[0]?" active":""), o[1]);
    b.type = "button";
    b.title = o[0]==="list" ? "One skill per line with a bullet, stacked vertically" : "All skills on one flowing line, separated by dots";
    b.onclick = function(){ snapshotHistory(); s.display = o[0]; saveState(); rerender(); };
    pills.appendChild(b);
  });
  row.appendChild(pills);
  return row;
}

function renderLanguageRows(s){
  var wrap = el("div","");
  (s.items||[]).forEach(function(item){
    var row = el("div","contact-row");
    var langWrap = el("div","contact-value-wrap"); langWrap.style.flex = "1";
    var lin = document.createElement("input");
    lin.value = item.language || ""; lin.placeholder = "Language (e.g. Tamil)";
    lin.oninput = function(e){ noteTypingEdit(); item.language = e.target.value; saveState(); refreshPreview(); };
    langWrap.appendChild(lin);
    var levelWrap = el("div","contact-value-wrap"); levelWrap.style.flex = "1";
    var vin = document.createElement("input");
    vin.value = item.level || ""; vin.placeholder = "Level (e.g. Mother tongue, Proficient)";
    vin.oninput = function(e){ noteTypingEdit(); item.level = e.target.value; saveState(); refreshPreview(); };
    levelWrap.appendChild(vin);
    var rm = el("button","tiny-icon-btn danger", svgIcon("trash",14));
    rm.title = "Remove language";
    rm.onclick = function(){ snapshotHistory(); s.items = s.items.filter(function(x){ return x !== item; }); saveState(); rerender(); };
    row.appendChild(langWrap); row.appendChild(levelWrap); row.appendChild(rm);
    wrap.appendChild(row);
  });
  var add = el("button","add-entry-btn", svgIcon("plus",14)+"<span>Add language</span>");
  add.onclick = function(){ snapshotHistory(); s.items.push(RF.emptyLanguage()); saveState(); rerender(); };
  wrap.appendChild(add);
  return wrap;
}
function formatPills(s){
  var row = el("div","align-row");
  row.appendChild(el("span","lbl","Format"));
  var pills = el("div","align-pills");
  [["bullets","Bullets"],["paragraph","Paragraph"]].forEach(function(o){
    var b = el("button","align-pill"+((s.style||"bullets")===o[0]?" active":""), o[1]);
    b.type = "button"; b.title = o[0]==="paragraph" ? "Read as flowing prose, like Harvard's paragraph-style resume" : "One line per achievement (default, safest for ATS)";
    b.onclick = function(){ snapshotHistory(); s.style = o[0]; saveState(); rerender(); };
    pills.appendChild(b);
  });
  row.appendChild(pills);
  return row;
}
function moveSection(id, dir){
  var i = state.sections.findIndex(function(x){ return x.id === id; });
  var j = i + dir;
  if(i < 0 || j < 0 || j >= state.sections.length) return;
  snapshotHistory();
  var tmp = state.sections[i]; state.sections[i] = state.sections[j]; state.sections[j] = tmp;
  saveState(); rerender();
}

/* ---- skills as removable tag chips ---- */
function renderSkillTags(s){
  var field = el("div","tag-field");
  (s.items||[]).forEach(function(skill, i){
    var tag = el("span","skill-tag");
    var label = document.createElement("span"); label.textContent = skill;
    var x = el("button","", svgIcon("x",11));
    x.title = "Remove " + skill;
    x.onclick = function(){ snapshotHistory(); s.items.splice(i,1); saveState(); rerender(); };
    tag.appendChild(label); tag.appendChild(x);
    field.appendChild(tag);
  });
  var input = document.createElement("input");
  input.className = "skill-tag-input"; input.placeholder = s.items.length ? "Add another\u2026" : "Type a skill and press Enter";
  function commit(){
    var v = input.value.trim().replace(/,$/,"");
    if(!v) return;
    snapshotHistory();
    s.items.push(v); saveState(); rerender();
    var f2 = document.querySelector('[data-id="'+s.id+'"] .skill-tag-input');
    if(f2) f2.focus();
  }
  input.onkeydown = function(e){
    if(e.key === "Enter" || e.key === ","){ e.preventDefault(); commit(); }
    else if(e.key === "Backspace" && !input.value && s.items.length){ snapshotHistory(); s.items.pop(); saveState(); rerender(); }
  };
  field.appendChild(input);
  var addBtn = el("button","skill-add-btn", svgIcon("plus",13)+"<span>Add</span>");
  addBtn.onclick = commit;
  field.appendChild(addBtn);
  var wrap = el("div","");
  wrap.appendChild(field);
  wrap.appendChild(el("div","field-help","Press Enter to add a skill"));
  return wrap;
}

/* ---- entry cards ---- */
function renderEntryCard(section, entry, index, labels){
  var card = el("div","entry-card");
  card.dataset.entryIndex = index;
  var rm = el("button","tiny-icon-btn danger entry-card-top", svgIcon("trash",14));
  rm.title = "Remove entry";
  rm.onclick = function(){ snapshotHistory(); section.entries = section.entries.filter(function(x){ return x.id !== entry.id; }); saveState(); rerender(); };
  card.appendChild(rm);

  var g1 = el("div","field-grid");
  g1.appendChild(fieldInput(labels.org, entry.org, function(v){ entry.org = v; saveState(); refreshPreview(); }, {required:true}));
  g1.appendChild(fieldInput(labels.heading, entry.heading, function(v){ entry.heading = v; saveState(); refreshPreview(); }, {required:true}));
  card.appendChild(g1);

  card.appendChild(fieldArea(labels.desc || "Description (optional)", entry.description || "", function(v){
    entry.description = v; saveState(); refreshPreview();
  }, {rows:3}));

  var g2 = el("div","field-grid stack-always");
  var locField = el("div","field loc-field");
  locField.appendChild(el("label","","Location"));
  var lrow = el("div","loc-input-row");
  var lin = document.createElement("input");
  lin.value = entry.location || ""; lin.placeholder = "City";
  lin.oninput = function(e){ noteTypingEdit(); entry.location = e.target.value; saveState(); refreshPreview(); };
  var pick = el("button","tb-icon-btn loc-trigger", svgIcon("mapPin",14));
  pick.title = "Look up a city";
  pick.onclick = function(ev){
    ev.stopPropagation();
    openLocationPicker(locField, entry.location, function(val){ snapshotHistory(); entry.location = val; lin.value = val; saveState(); refreshPreview(); });
  };
  lrow.appendChild(lin); lrow.appendChild(pick);
  locField.appendChild(lrow);
  g2.appendChild(locField);
  g2.appendChild(renderDateField(entry));
  card.appendChild(g2);

  card.appendChild(fieldArea(labels.bullets || "Key achievements (one per line)", (entry.bullets||[]).join("\n"), function(v){
    entry.bullets = RF.splitLines(v); saveState(); refreshPreview();
  }, {rows:3}));
  return card;
}

function renderDateField(entry){
  var wrap = el("div","field");
  wrap.appendChild(el("label","","Dates"));
  var grid = el("div","date-grid");
  function pair(monthKey, yearKey, disabled){
    var p = el("div","date-pair");
    var ms = document.createElement("select"); ms.className = "mon";
    [["","Month"]].concat(RF.MONTHS.map(function(m){ return [m,m]; })).forEach(function(o){
      var op = document.createElement("option"); op.value = o[0]; op.textContent = o[1];
      if(o[0] === (entry[monthKey]||"")) op.selected = true;
      ms.appendChild(op);
    });
    ms.onchange = function(e){ snapshotHistory(); entry[monthKey] = e.target.value; saveState(); refreshDateShowsAs(entry); refreshPreview(); };
    var ys = document.createElement("select"); ys.className = "yr";
    [["","Year"]].concat(RF.yearOptions().map(function(y){ return [y,y]; })).forEach(function(o){
      var op = document.createElement("option"); op.value = o[0]; op.textContent = o[1];
      if(o[0] === String(entry[yearKey]||"")) op.selected = true;
      ys.appendChild(op);
    });
    ys.onchange = function(e){ snapshotHistory(); entry[yearKey] = e.target.value; saveState(); refreshDateShowsAs(entry); refreshPreview(); };
    if(disabled){ ms.disabled = true; ys.disabled = true; p.style.opacity = ".45"; }
    p.appendChild(ms); p.appendChild(ys);
    return p;
  }
  grid.appendChild(pair("startMonth","startYear",false));
  grid.appendChild(pair("endMonth","endYear", !!entry.isPresent));
  wrap.appendChild(grid);
  var toggle = el("label","present-toggle");
  var cb = document.createElement("input"); cb.type = "checkbox"; cb.checked = !!entry.isPresent;
  cb.onchange = function(e){
    snapshotHistory();
    entry.isPresent = e.target.checked;
    if(entry.isPresent){ entry.endMonth = ""; entry.endYear = ""; }
    saveState(); rerender();
  };
  toggle.appendChild(cb);
  toggle.appendChild(document.createTextNode("Currently here (Present)"));
  wrap.appendChild(toggle);
  var shows = el("div","date-shows-as", "Shows as: " + (RF.formatDateRange(entry) || "\u2014"));
  shows.dataset.dateShowsFor = entry.id;
  wrap.appendChild(shows);
  return wrap;
}
function refreshDateShowsAs(entry){
  var node = document.querySelector('[data-date-shows-for="'+entry.id+'"]');
  if(node) node.textContent = "Shows as: " + (RF.formatDateRange(entry) || "\u2014");
}

/* ---- add section row ---- */
function renderAddSectionRow(){
  var wrap = el("div","add-section-row");
  wrap.id = "add-section-anchor";
  wrap.appendChild(el("span","", svgIcon("plusCircle",16)));
  var sel = document.createElement("select");
  [["summary","Summary / Profile"],["skills","Skills"],["languages","Languages"],["highlights","Experience Summary (bullet list)"],["experience","Experience"],["projects","Projects"],["education","Education"],["certifications","Certifications"],["custom","Custom \u2014 your own heading"]].forEach(function(o){
    var op = document.createElement("option"); op.value = o[0]; op.textContent = o[1]; sel.appendChild(op);
  });
  var btn = el("button","tb-btn primary", "Add section");
  btn.onclick = function(){
    function finishAdd(customTitle){
      snapshotHistory();
      state.sections.push(RF.defaultSection(sel.value, customTitle));
      saveState(); rerender();
      var node = document.querySelector(".form-panel");
      if(node) node.scrollTop = node.scrollHeight;
    }
    if(sel.value === "custom"){
      promptModal({
        title: "Name this section",
        description: "This becomes the heading printed on your resume \u2014 e.g. Publications, Volunteering, Languages, Awards.",
        placeholder: "Section name",
        defaultValue: "Achievements",
        confirmLabel: "Add section"
      }, finishAdd);
      return;
    }
    finishAdd(null);
  };
  wrap.appendChild(sel); wrap.appendChild(btn);
  return wrap;
}

/* ---------------- preview panel ---------------- */
function renderPreviewPanel(){
  var wrap = el("div","preview-wrap");
  var shell = el("div","page-shell");
  shell.appendChild(buildPreviewEl());
  wrap.appendChild(shell);
  wrap.appendChild(el("div","footer-hint","Live preview. Exports carry real selectable text \u2014 not a screenshot \u2014 so an ATS can read every line. Page breaks are set when you export."));
  return wrap;
}


/* ============================ DASHBOARD ============================ */
function statCard(icon, value, label){
  var card = el("div","stat-card");
  card.appendChild(el("div","stat-icon", svgIcon(icon,20)));
  card.appendChild(el("div","stat-value", String(value)));
  card.appendChild(el("div","stat-label", label));
  return card;
}

function renderDashboardTab(){
  var wrap = el("div","dash-wrap");
  var stats = loadStats();
  var ownerName = (state.heading.name || "").trim().split(" ")[0] || "there";

  var hero = el("div","dash-hero");
  var heroLeft = el("div","dash-hero-left");
  heroLeft.appendChild(el("div","dash-hero-eyebrow","WELCOME BACK, " + ownerName.toUpperCase()));
  heroLeft.appendChild(el("h1","dash-hero-title","Create a Professional Resume That Gets You Hired"));
  heroLeft.appendChild(el("p","dash-hero-sub","Choose a template, build your resume with ease, and check how it scores before you send it."));
  var heroActions = el("div","dash-hero-actions");
  var createBtn = el("button","tb-btn primary lg", svgIcon("plus",16)+"<span>Create New Resume</span>");
  createBtn.onclick = function(){
    promptModal({
      title: "Name this resume",
      description: "e.g. \u201cProduct Manager - Acme\u201d. You can rename it any time from My Resumes.",
      placeholder: "Resume name",
      defaultValue: "Untitled Resume",
      confirmLabel: "Create"
    }, function(name){ createResume(name); activeTab = "builder"; render(); });
  };
  var exploreBtn = el("button","tb-btn lg", "Explore Templates");
  exploreBtn.onclick = function(){ activeTab = "templates"; bumpStat("templateViews"); render(); };
  heroActions.appendChild(createBtn); heroActions.appendChild(exploreBtn);
  heroLeft.appendChild(heroActions);
  hero.appendChild(heroLeft);

  var heroPreview = el("div","dash-hero-preview");
  var previewInner = el("div","dash-hero-preview-inner");
  previewInner.appendChild(buildPreviewEl());
  heroPreview.appendChild(previewInner);
  hero.appendChild(heroPreview);
  wrap.appendChild(hero);

  var statsRow = el("div","stats-row");
  statsRow.appendChild(statCard("fileText", library.resumes.length, "Resumes Created"));
  statsRow.appendChild(statCard("eye", stats.templateViews||0, "Template Views"));
  statsRow.appendChild(statCard("download", stats.exportsCount||0, "Exports (PDF/Word)"));
  statsRow.appendChild(statCard("award", averageAtsScore() + "%", "ATS Score (Avg.)"));
  wrap.appendChild(statsRow);

  var grid = el("div","dash-grid");

  var tplPanel = el("div","dash-panel");
  var tplHead = el("div","dash-panel-head");
  tplHead.appendChild(el("h2","","Choose a Template"));
  var viewAllTpl = el("button","link-btn","View All Templates \u2192");
  viewAllTpl.onclick = function(){ activeTab = "templates"; bumpStat("templateViews"); render(); };
  tplHead.appendChild(viewAllTpl);
  tplPanel.appendChild(tplHead);
  tplPanel.appendChild(el("p","dash-panel-sub","Pick a template and start building your resume"));
  var tplRow = el("div","dash-tpl-row");
  TEMPLATES.forEach(function(t){
    var card = el("div","dash-tpl-card"+(state.templateId===t.id?" selected":""));
    card.appendChild(el("div","tpl-thumb "+t.thumbClass,
      '<div class="tn">'+RF.escapeHtml(state.heading.name||"Alex Rivera")+'</div><div class="tc">Preview</div>'+
      '<div class="th">Summary</div><div class="tl w80"></div>'+
      '<div class="th">Experience</div><div class="tl w60"></div>'+
      '<div class="th">Skills</div><div class="tl w40"></div>'));
    card.appendChild(el("div","dash-tpl-name",t.name));
    card.onclick = function(){ snapshotHistory(); state.templateId = t.id; saveState(); activeTab = "builder"; render(); };
    tplRow.appendChild(card);
  });
  tplPanel.appendChild(tplRow);
  grid.appendChild(tplPanel);

  var resPanel = el("div","dash-panel");
  var resHead = el("div","dash-panel-head");
  resHead.appendChild(el("h2","","My Resumes"));
  var viewAllRes = el("button","link-btn","View All \u2192");
  viewAllRes.onclick = function(){ activeTab = "myresumes"; render(); };
  resHead.appendChild(viewAllRes);
  resPanel.appendChild(resHead);
  var sorted = library.resumes.slice().sort(function(a,b){ return b.updatedAt - a.updatedAt; });
  sorted.slice(0,3).forEach(function(meta){ resPanel.appendChild(renderResumeRow(meta, true)); });
  grid.appendChild(resPanel);

  wrap.appendChild(grid);

  var qaRow = el("div","quick-actions-row");
  var qaItems = [
    ["fileText","Build Resume","Create and edit your resume with our easy builder.", function(){ activeTab="builder"; render(); }],
    ["barChart","Browse Templates","Choose from ATS-safe resume templates.", function(){ activeTab="templates"; bumpStat("templateViews"); render(); }],
    ["award","ATS Checker","Check your resume score and get suggestions.", function(){ activeTab="ats"; render(); }],
    ["mail","Cover Letter","Create a tailored cover letter in minutes.", function(){ activeTab="cover"; render(); }],
  ];
  qaItems.forEach(function(item){
    var card = el("div","quick-action-card");
    card.appendChild(el("div","qa-icon", svgIcon(item[0],18)));
    var body = el("div","");
    body.appendChild(el("div","qa-title",item[1]));
    body.appendChild(el("div","qa-desc",item[2]));
    card.appendChild(body);
    card.appendChild(el("div","qa-chevron", svgIcon("chevronRight",16)));
    card.onclick = item[3];
    qaRow.appendChild(card);
  });
  wrap.appendChild(qaRow);

  return wrap;
}

/* ---- shared resume-row renderer (Dashboard preview + My Resumes full list) ---- */
function renderResumeRow(meta, compact){
  var row = el("div","resume-row"+(meta.id===library.activeId?" is-active":""));
  row.appendChild(el("div","resume-row-icon", svgIcon("fileText",18)));
  var mid = el("div","resume-row-mid");
  var nameBtn = el("button","resume-row-name", meta.name);
  nameBtn.title = "Rename";
  nameBtn.onclick = function(){
    promptModal({title:"Rename resume", defaultValue:meta.name, confirmLabel:"Save", placeholder:"Resume name"},
      function(name){ renameResume(meta.id, name); render(); });
  };
  mid.appendChild(nameBtn);
  mid.appendChild(el("div","resume-row-updated","Updated " + formatDateShort(meta.updatedAt)));
  row.appendChild(mid);

  var actions = el("div","resume-row-actions");
  var editBtn = el("button","tiny-icon-btn", svgIcon("fileText",15)); editBtn.title = "Edit";
  editBtn.onclick = function(){ switchToResume(meta.id); activeTab = "builder"; render(); };
  var dupBtn = el("button","tiny-icon-btn", svgIcon("copy",15)); dupBtn.title = "Duplicate";
  dupBtn.onclick = function(){ duplicateResume(meta.id); render(); };
  var pdfBtn = el("button","tiny-icon-btn", svgIcon("download",15)); pdfBtn.title = "Download PDF";
  pdfBtn.onclick = function(){ quickExport(meta.id, "pdf"); };
  var docBtn = el("button","tiny-icon-btn", "W"); docBtn.title = "Download Word";
  docBtn.style.fontWeight = "700"; docBtn.style.fontSize = "12px";
  docBtn.onclick = function(){ quickExport(meta.id, "docx"); };
  var delBtn = el("button","tiny-icon-btn danger", svgIcon("trash",15)); delBtn.title = "Delete";
  delBtn.onclick = function(){
    if(library.resumes.length <= 1){ showToast("You need at least one resume - create another before deleting this one."); return; }
    confirmModal({title:"Delete \u201c"+meta.name+"\u201d?", message:"This can't be undone.", confirmLabel:"Delete"},
      function(){ deleteResumeFromLibrary(meta.id); render(); });
  };
  [editBtn, dupBtn, pdfBtn, docBtn, delBtn].forEach(function(b){ actions.appendChild(b); });
  row.appendChild(actions);
  return row;
}
function formatDateShort(ts){
  var d = new Date(ts);
  var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
}

/* ============================ MY RESUMES ============================ */
function renderMyResumesTab(){
  var wrap = el("div","dash-wrap");
  var head = el("div","dash-panel-head");
  head.appendChild(el("h2","","My Resumes"));
  var newBtn = el("button","tb-btn primary", svgIcon("plus",15)+"<span>New Resume</span>");
  newBtn.onclick = function(){
    promptModal({title:"Name this resume", defaultValue:"Untitled Resume", confirmLabel:"Create", placeholder:"Resume name"},
      function(name){ createResume(name); activeTab = "builder"; render(); });
  };
  head.appendChild(newBtn);
  wrap.appendChild(head);

  var panel = el("div","dash-panel");
  var sorted = library.resumes.slice().sort(function(a,b){ return b.updatedAt - a.updatedAt; });
  sorted.forEach(function(meta){ panel.appendChild(renderResumeRow(meta, false)); });
  wrap.appendChild(panel);
  return wrap;
}

/* ============================ ATS CHECKER ============================ */
function renderAtsCheckerTab(){
  var wrap = el("div","dash-wrap ats-wrap");
  wrap.appendChild(el("h1","","ATS Checker"));
  wrap.appendChild(el("p","lede","A deterministic checklist, not a black box - every item below is a real, inspectable rule this resume was checked against. It estimates how a resume reads to keyword-based screening and to a quick human skim; it isn't a guarantee of any specific company's ATS."));

  var selectorRow = el("div","field"); selectorRow.style.maxWidth = "360px"; selectorRow.style.marginBottom = "18px";
  selectorRow.appendChild(el("label","","Checking"));
  var sel = document.createElement("select");
  library.resumes.forEach(function(r){
    var o = document.createElement("option"); o.value = r.id; o.textContent = r.name;
    if(r.id === (atsCheckerSelection || library.activeId)) o.selected = true;
    sel.appendChild(o);
  });
  sel.onchange = function(e){ atsCheckerSelection = e.target.value; render(); };
  selectorRow.appendChild(sel);
  wrap.appendChild(selectorRow);

  var targetMeta = library.resumes.find(function(r){ return r.id === (atsCheckerSelection || library.activeId); }) || library.resumes[0];
  var result = RF.scoreAts(targetMeta.data);

  var scoreCard = el("div","ats-score-card");
  var ring = el("div","ats-ring");
  ring.style.setProperty("--pct", result.score);
  ring.appendChild(el("div","ats-ring-value", result.score + "%"));
  scoreCard.appendChild(ring);
  var scoreLabel = el("div","");
  var verdict = result.score >= 80 ? "Strong" : result.score >= 55 ? "Needs work" : "Not there yet";
  scoreLabel.appendChild(el("div","ats-verdict", verdict));
  scoreLabel.appendChild(el("div","ats-verdict-sub", result.checks.filter(function(c){return c.pass;}).length + " of " + result.checks.length + " checks passed"));
  scoreCard.appendChild(scoreLabel);
  wrap.appendChild(scoreCard);

  var list = el("div","ats-checklist");
  result.checks.forEach(function(c){
    var row = el("div","ats-check-row"+(c.pass?" pass":" fail"));
    row.appendChild(el("div","ats-check-icon", svgIcon(c.pass?"check":"x",14)));
    var body = el("div","");
    body.appendChild(el("div","ats-check-label", c.label));
    if(!c.pass) body.appendChild(el("div","ats-check-detail", c.detail));
    row.appendChild(body);
    row.appendChild(el("div","ats-check-weight", c.weight + "pt"));
    list.appendChild(row);
  });
  wrap.appendChild(list);

  var editBtn = el("button","tb-btn primary", "Edit this resume");
  editBtn.style.marginTop = "18px";
  editBtn.onclick = function(){ switchToResume(targetMeta.id); activeTab = "builder"; render(); };
  wrap.appendChild(editBtn);
  return wrap;
}
var atsCheckerSelection = null;

/* ============================ COVER LETTER ============================ */
var COVER_KEY = "resumeforge:coverletter:v1";
function loadCoverLetter(){
  try{
    var raw = localStorage.getItem(COVER_KEY);
    if(raw) return JSON.parse(raw);
  }catch(e){}
  return {
    applicantName: state.heading.name || "",
    applicantContact: (state.heading.contacts[0] && state.heading.contacts[0].value) || "",
    recipientName: "", company: "",
    greeting: "Dear Hiring Manager,",
    opening: "", body: "", closing: "",
    signoff: "Sincerely,"
  };
}
function saveCoverLetter(cl){
  try{ localStorage.setItem(COVER_KEY, JSON.stringify(cl)); }catch(e){}
  queueCloudWrite();
}
var coverLetter = loadCoverLetter();

function renderCoverLetterTab(){
  var wrap = el("div","cover-wrap");
  wrap.appendChild(el("h1","","Cover Letter"));
  wrap.appendChild(el("p","lede","A short, tailored cover letter - same export quality as your resume."));

  var grid = el("div","cover-grid");
  var form = el("div","cover-form");

  function field(labelText, key, opts){
    opts = opts || {};
    var row = el("div","field");
    row.appendChild(el("label","",labelText));
    var input = document.createElement(opts.area ? "textarea" : "input");
    if(opts.area) input.rows = opts.rows || 4;
    input.value = coverLetter[key] || "";
    input.placeholder = opts.placeholder || labelText;
    input.oninput = function(e){ coverLetter[key] = e.target.value; saveCoverLetter(coverLetter); refreshCoverPreview(); };
    row.appendChild(input);
    return row;
  }

  var g1 = el("div","field-grid");
  g1.appendChild(field("Your name", "applicantName"));
  g1.appendChild(field("Your email or phone", "applicantContact"));
  form.appendChild(g1);
  var g2 = el("div","field-grid");
  g2.appendChild(field("Recipient name", "recipientName", {placeholder:"e.g. Jordan Lee (optional)"}));
  g2.appendChild(field("Company", "company", {placeholder:"e.g. Acme Inc."}));
  form.appendChild(g2);
  form.appendChild(field("Greeting", "greeting"));
  form.appendChild(field("Opening paragraph", "opening", {area:true, placeholder:"Why you're writing and the role you want.", rows:3}));
  form.appendChild(field("Body paragraph", "body", {area:true, placeholder:"Your strongest, most relevant achievement.", rows:4}));
  form.appendChild(field("Closing paragraph", "closing", {area:true, placeholder:"What you want to happen next.", rows:3}));
  form.appendChild(field("Sign-off", "signoff"));
  grid.appendChild(form);

  var previewWrap = el("div","preview-wrap");
  var shell = el("div","page-shell");
  shell.appendChild(buildCoverLetterPreviewEl());
  previewWrap.appendChild(shell);
  grid.appendChild(previewWrap);
  wrap.appendChild(grid);

  var actions = el("div","tb-group"); actions.style.marginTop = "16px";
  var pdfBtn = el("button","tb-btn primary", svgIcon("download",15)+"<span>Download PDF</span>");
  pdfBtn.onclick = exportCoverLetterPdf;
  var docBtn = el("button","tb-btn outline", svgIcon("download",15)+"<span>Download Word</span>");
  docBtn.onclick = exportCoverLetterDocx;
  actions.appendChild(pdfBtn); actions.appendChild(docBtn);
  wrap.appendChild(actions);
  return wrap;
}
function refreshCoverPreview(){
  var old = document.getElementById("cover-page");
  if(old) old.replaceWith(buildCoverLetterPreviewEl());
}
function buildCoverLetterPreviewEl(){
  var page = el("div","page tpl-classic cover-page");
  page.id = "cover-page";
  var today = new Date();
  var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  page.appendChild(el("div","cover-date", months[today.getMonth()] + " " + today.getDate() + ", " + today.getFullYear()));
  if(coverLetter.recipientName || coverLetter.company){
    page.appendChild(el("div","cover-recipient", [coverLetter.recipientName, coverLetter.company].filter(Boolean).join("\n").replace(/\n/g,"<br>")));
  }
  page.appendChild(el("div","cover-greeting", RF.escapeHtml(coverLetter.greeting||"")));
  [coverLetter.opening, coverLetter.body, coverLetter.closing].forEach(function(p){
    if((p||"").trim()) page.appendChild(el("p","cover-para", RF.escapeHtml(p)));
  });
  page.appendChild(el("div","cover-signoff", RF.escapeHtml(coverLetter.signoff||"")));
  page.appendChild(el("div","cover-name", RF.escapeHtml(coverLetter.applicantName||"")));
  return page;
}
async function exportCoverLetterPdf(){
  if(!window.jspdf){ showToast("PDF engine still loading \u2014 try again in a second."); return; }
  try{
    var doc = new window.jspdf.jsPDF({unit:"pt", format:"letter"});
    var pageW = doc.internal.pageSize.getWidth(), pageH = doc.internal.pageSize.getHeight();
    var margin = 54, maxW = pageW - margin*2, y = margin;
    function put(text, size, style){
      doc.setFont("helvetica", style||"normal"); doc.setFontSize(size);
      doc.splitTextToSize(text, maxW).forEach(function(line){
        if(y + size*1.4 > pageH - margin){ doc.addPage(); y = margin; }
        doc.text(line, margin, y); y += size*1.4;
      });
    }
    var today = new Date();
    var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    put(months[today.getMonth()]+" "+today.getDate()+", "+today.getFullYear(), 10.5); y += 10;
    if(coverLetter.recipientName) put(coverLetter.recipientName, 10.5);
    if(coverLetter.company) put(coverLetter.company, 10.5);
    y += 10;
    put(coverLetter.greeting || "", 10.5); y += 10;
    [coverLetter.opening, coverLetter.body, coverLetter.closing].forEach(function(p){
      if((p||"").trim()){ put(p, 10.5); y += 10; }
    });
    put(coverLetter.signoff || "", 10.5); y += 22;
    put(coverLetter.applicantName || "", 10.5);
    var blob = doc.output("blob");
    await download(blob, RF.sanitizeFilename(coverLetter.applicantName||"cover-letter") + "-cover-letter.pdf");
    bumpStat("exportsCount");
    logActivity("Downloaded cover letter as PDF");
  }catch(err){
    console.error(err);
    showToast("Cover letter PDF export failed: " + (err && err.message ? err.message : err));
  }
}
async function exportCoverLetterDocx(){
  if(!window.docx){ showToast("Word engine still loading \u2014 try again in a second."); return; }
  try{
    var d = window.docx;
    var kids = [];
    var today = new Date();
    var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    function para(text, spaceAfter){
      kids.push(new d.Paragraph({spacing:{after: spaceAfter||120}, children:[new d.TextRun({text:text||"", size:21, font:"Arial"})]}));
    }
    para(months[today.getMonth()]+" "+today.getDate()+", "+today.getFullYear(), 200);
    if(coverLetter.recipientName) para(coverLetter.recipientName, 20);
    if(coverLetter.company) para(coverLetter.company, 200);
    para(coverLetter.greeting || "", 200);
    [coverLetter.opening, coverLetter.body, coverLetter.closing].forEach(function(p){
      if((p||"").trim()) para(p, 200);
    });
    para(coverLetter.signoff || "", 400);
    para(coverLetter.applicantName || "", 0);
    var doc = new d.Document({sections:[{children:kids}]});
    var blob = await d.Packer.toBlob(doc);
    await download(blob, RF.sanitizeFilename(coverLetter.applicantName||"cover-letter") + "-cover-letter.docx");
    bumpStat("exportsCount");
    logActivity("Downloaded cover letter as Word");
  }catch(err){
    console.error(err);
    showToast("Cover letter Word export failed: " + (err && err.message ? err.message : err));
  }
}

render();
initCloud();
})();

