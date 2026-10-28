
/* =================== CORE START (pure logic, unit-tested) =================== */
var RF = (function(){
"use strict";

/* Compact geo dataset: "Country::City|City|City" */
var GEO_RAW = [
"India::Mumbai|Delhi|New Delhi|Bengaluru|Hyderabad|Chennai|Kolkata|Pune|Ahmedabad|Surat|Jaipur|Lucknow|Kanpur|Nagpur|Indore|Thane|Bhopal|Visakhapatnam|Patna|Vadodara|Ghaziabad|Ludhiana|Agra|Nashik|Faridabad|Meerut|Rajkot|Varanasi|Srinagar|Chhatrapati Sambhajinagar|Amritsar|Navi Mumbai|Prayagraj|Ranchi|Howrah|Coimbatore|Jabalpur|Gwalior|Vijayawada|Jodhpur|Madurai|Raipur|Kota|Chandigarh|Guwahati|Solapur|Hubballi|Mysuru|Tiruchirappalli|Bareilly|Aligarh|Moradabad|Gurugram|Noida|Greater Noida|Jalandhar|Bhubaneswar|Salem|Warangal|Guntur|Saharanpur|Gorakhpur|Bikaner|Amravati|Jamshedpur|Bhilai|Cuttack|Kochi|Thiruvananthapuram|Nellore|Bhavnagar|Dehradun|Durgapur|Asansol|Rourkela|Nanded|Kolhapur|Ajmer|Jamnagar|Ujjain|Siliguri|Udaipur|Tirupati|Kozhikode|Thrissur|Kollam|Bilaspur|Shimla|Panaji|Gandhinagar|Puducherry|Manesar|Whitefield|Electronic City|Hinjewadi|Remote (India)",
"United States::New York|San Francisco|Los Angeles|Chicago|Houston|Phoenix|Philadelphia|San Antonio|San Diego|Dallas|Austin|San Jose|Jacksonville|Fort Worth|Columbus|Charlotte|Indianapolis|Seattle|Denver|Washington|Boston|Nashville|Detroit|Portland|Las Vegas|Memphis|Louisville|Baltimore|Milwaukee|Albuquerque|Tucson|Fresno|Sacramento|Kansas City|Mesa|Atlanta|Omaha|Raleigh|Colorado Springs|Virginia Beach|Miami|Oakland|Minneapolis|Tulsa|Bakersfield|Wichita|Arlington|Tampa|New Orleans|Cleveland|Honolulu|Pittsburgh|St. Louis|Cincinnati|Orlando|Salt Lake City|Boulder|Palo Alto|Mountain View|Sunnyvale|Santa Clara|Redmond|Bellevue|Cambridge|Brooklyn|Jersey City|Remote (US)",
"United Kingdom::London|Manchester|Birmingham|Leeds|Glasgow|Liverpool|Edinburgh|Bristol|Sheffield|Cardiff|Belfast|Nottingham|Newcastle upon Tyne|Leicester|Coventry|Brighton|Cambridge|Oxford|Reading|Southampton|Aberdeen|Milton Keynes|York|Bath|Norwich|Remote (UK)",
"Canada::Toronto|Vancouver|Montreal|Calgary|Ottawa|Edmonton|Mississauga|Winnipeg|Quebec City|Hamilton|Brampton|Surrey|Halifax|Laval|London|Victoria|Waterloo|Kitchener|Saskatoon|Regina|Remote (Canada)",
"Australia::Sydney|Melbourne|Brisbane|Perth|Adelaide|Gold Coast|Canberra|Newcastle|Wollongong|Hobart|Geelong|Townsville|Cairns|Darwin|Remote (Australia)",
"Germany::Berlin|Munich|Hamburg|Frankfurt|Cologne|Stuttgart|Dusseldorf|Leipzig|Dortmund|Essen|Bremen|Dresden|Hanover|Nuremberg|Karlsruhe|Mannheim|Bonn|Heidelberg|Aachen|Remote (Germany)",
"France::Paris|Lyon|Marseille|Toulouse|Nice|Nantes|Montpellier|Strasbourg|Bordeaux|Lille|Rennes|Grenoble|Toulon|Sophia Antipolis|Remote (France)",
"Netherlands::Amsterdam|Rotterdam|The Hague|Utrecht|Eindhoven|Groningen|Tilburg|Almere|Delft|Leiden|Remote (Netherlands)",
"Ireland::Dublin|Cork|Galway|Limerick|Waterford|Remote (Ireland)",
"Singapore::Singapore|Jurong East|Tampines|Woodlands|One-North",
"United Arab Emirates::Dubai|Abu Dhabi|Sharjah|Ajman|Al Ain|Ras Al Khaimah|Fujairah",
"Japan::Tokyo|Osaka|Yokohama|Nagoya|Sapporo|Fukuoka|Kobe|Kyoto|Kawasaki|Sendai|Hiroshima",
"China::Shanghai|Beijing|Shenzhen|Guangzhou|Chengdu|Hangzhou|Wuhan|Xi'an|Nanjing|Suzhou|Tianjin|Chongqing|Qingdao|Hong Kong|Macau",
"Spain::Madrid|Barcelona|Valencia|Seville|Zaragoza|Malaga|Bilbao|Alicante|Granada|Palma|Remote (Spain)",
"Italy::Rome|Milan|Naples|Turin|Palermo|Genoa|Bologna|Florence|Bari|Catania|Venice|Verona",
"Sweden::Stockholm|Gothenburg|Malmo|Uppsala|Linkoping|Lund|Vasteras",
"Switzerland::Zurich|Geneva|Basel|Bern|Lausanne|Lugano|Zug|Winterthur",
"Poland::Warsaw|Krakow|Wroclaw|Gdansk|Poznan|Lodz|Katowice|Szczecin|Lublin",
"Brazil::Sao Paulo|Rio de Janeiro|Brasilia|Salvador|Fortaleza|Belo Horizonte|Curitiba|Recife|Porto Alegre|Campinas|Florianopolis",
"Mexico::Mexico City|Guadalajara|Monterrey|Puebla|Tijuana|Queretaro|Merida|Leon|Cancun",
"South Africa::Johannesburg|Cape Town|Durban|Pretoria|Port Elizabeth|Bloemfontein|Stellenbosch",
"New Zealand::Auckland|Wellington|Christchurch|Hamilton|Dunedin|Tauranga|Queenstown",
"Israel::Tel Aviv|Jerusalem|Haifa|Herzliya|Ra'anana|Be'er Sheva|Netanya",
"Saudi Arabia::Riyadh|Jeddah|Dammam|Mecca|Medina|Khobar|NEOM",
"Qatar::Doha|Al Rayyan|Al Wakrah|Lusail",
"Malaysia::Kuala Lumpur|Penang|Johor Bahru|Cyberjaya|Petaling Jaya|Shah Alam|Ipoh|Kuching",
"Indonesia::Jakarta|Surabaya|Bandung|Medan|Semarang|Yogyakarta|Denpasar|Bekasi",
"Philippines::Manila|Quezon City|Makati|Cebu City|Davao City|Taguig|Pasig|Iloilo City",
"Vietnam::Ho Chi Minh City|Hanoi|Da Nang|Hai Phong|Can Tho|Nha Trang",
"Thailand::Bangkok|Chiang Mai|Phuket|Pattaya|Nonthaburi|Khon Kaen",
"South Korea::Seoul|Busan|Incheon|Daegu|Daejeon|Gwangju|Seongnam|Suwon",
"Nigeria::Lagos|Abuja|Ibadan|Port Harcourt|Kano|Benin City|Enugu",
"Kenya::Nairobi|Mombasa|Kisumu|Nakuru|Eldoret",
"Egypt::Cairo|Alexandria|Giza|Sharm El Sheikh|Port Said|New Cairo",
"Turkey::Istanbul|Ankara|Izmir|Bursa|Antalya|Adana|Konya",
"Portugal::Lisbon|Porto|Braga|Coimbra|Faro|Funchal",
"Belgium::Brussels|Antwerp|Ghent|Bruges|Leuven|Liege",
"Austria::Vienna|Graz|Linz|Salzburg|Innsbruck",
"Denmark::Copenhagen|Aarhus|Odense|Aalborg",
"Norway::Oslo|Bergen|Trondheim|Stavanger",
"Finland::Helsinki|Espoo|Tampere|Vantaa|Oulu|Turku",
"Czechia::Prague|Brno|Ostrava|Plzen|Olomouc",
"Romania::Bucharest|Cluj-Napoca|Timisoara|Iasi|Brasov|Constanta",
"Hungary::Budapest|Debrecen|Szeged|Pecs|Gyor",
"Greece::Athens|Thessaloniki|Patras|Heraklion|Larissa",
"Argentina::Buenos Aires|Cordoba|Rosario|Mendoza|La Plata",
"Chile::Santiago|Valparaiso|Concepcion|Vina del Mar",
"Colombia::Bogota|Medellin|Cali|Barranquilla|Cartagena",
"Pakistan::Karachi|Lahore|Islamabad|Rawalpindi|Faisalabad|Peshawar|Multan",
"Bangladesh::Dhaka|Chattogram|Khulna|Sylhet|Rajshahi",
"Sri Lanka::Colombo|Kandy|Galle|Jaffna|Negombo",
"Nepal::Kathmandu|Pokhara|Lalitpur|Biratnagar",
"Remote::Remote|Remote (Global)|Hybrid|On-site"
];

var MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

/* cities people still type by their former or colloquial name */
var ALIASES = {
  "Bengaluru":"Bangalore, Blr", "Mumbai":"Bombay", "Kolkata":"Calcutta", "Chennai":"Madras",
  "Gurugram":"Gurgaon", "Mysuru":"Mysore", "Thiruvananthapuram":"Trivandrum", "Kochi":"Cochin, Ernakulam",
  "Kozhikode":"Calicut", "Vadodara":"Baroda", "Visakhapatnam":"Vizag", "Prayagraj":"Allahabad",
  "Puducherry":"Pondicherry", "Hubballi":"Hubli", "Chhatrapati Sambhajinagar":"Aurangabad",
  "Tiruchirappalli":"Trichy", "Thane":"Thane West", "New York":"NYC, New York City",
  "San Francisco":"SF, SFO, Bay Area", "Los Angeles":"LA", "Washington":"Washington DC, DC",
  "Ho Chi Minh City":"Saigon", "Chattogram":"Chittagong", "Istanbul":"Constantinople",
  "Dusseldorf":"Düsseldorf", "Zurich":"Zürich", "Sao Paulo":"São Paulo", "Bogota":"Bogotá",
  "Malmo":"Malmö", "Gothenburg":"Goteborg", "Cologne":"Koln, Köln", "Munich":"Munchen, München",
  "Bengaluru ":"", "Guwahati":"Gauhati", "Ujjain":"Ujain"
};
function buildGeo(raw){
  var countries = [], index = [];
  raw.forEach(function(line){
    var parts = line.split("::");
    var country = parts[0];
    var cities = (parts[1]||"").split("|").filter(Boolean);
    countries.push({name:country, cities:cities});
    cities.forEach(function(c){
      index.push({
        city:c, country:country,
        alias: ALIASES[c] || "",
        label: country === "Remote" ? c : (c + ", " + country)
      });
    });
  });
  return {countries:countries, index:index};
}
var GEO = buildGeo(GEO_RAW);

/* --- fuzzy search: Fuse.js when present, hand-rolled subsequence scorer otherwise --- */
var fuseCache = {};
function getFuse(list, key){
  if(typeof Fuse === "undefined") return null;
  if(!fuseCache[key]) fuseCache[key] = new Fuse(list, {
    keys:[{name:"city",weight:3},{name:"alias",weight:2},{name:"country",weight:1}],
    threshold:0.4, ignoreLocation:true, minMatchCharLength:1
  });
  return fuseCache[key];
}
function fallbackScore(hay, needle){
  hay = hay.toLowerCase(); needle = needle.toLowerCase();
  if(!needle) return 1;
  var direct = hay.indexOf(needle);
  if(direct === 0) return 1000 - hay.length;
  if(direct > 0) return 700 - direct - hay.length*0.1;
  var hi = 0, score = 0, gaps = 0, last = -1;
  for(var ni=0; ni<needle.length; ni++){
    var found = hay.indexOf(needle[ni], hi);
    if(found === -1) return -1;
    if(last >= 0) gaps += (found - last - 1);
    last = found; hi = found + 1; score += 10;
  }
  return 300 + score - gaps;
}
function searchLocations(query, countryFilter, limit){
  limit = limit || 40;
  var pool = GEO.index;
  if(countryFilter && countryFilter !== "__all__"){
    pool = pool.filter(function(r){ return r.country === countryFilter; });
  }
  var q = (query||"").trim();
  if(!q) return pool.slice(0, limit);
  var fuse = getFuse(pool, (countryFilter||"__all__"));
  if(fuse){
    return fuse.search(q, {limit:limit}).map(function(r){ return r.item; });
  }
  var scored = [];
  pool.forEach(function(r){
    var s = Math.max(
      fallbackScore(r.city, q),
      r.alias ? fallbackScore(r.alias, q) - 20 : -1,
      fallbackScore(r.country, q) - 200
    );
    if(s > 0) scored.push({r:r, s:s});
  });
  scored.sort(function(a,b){ return b.s - a.s; });
  return scored.slice(0, limit).map(function(x){ return x.r; });
}
function searchCountries(query){
  var q = (query||"").trim().toLowerCase();
  if(!q) return GEO.countries;
  return GEO.countries.filter(function(c){ return fallbackScore(c.name, q) > 0; })
    .sort(function(a,b){ return fallbackScore(b.name,q) - fallbackScore(a.name,q); });
}

/* --- dates --- */
function yearOptions(){
  var now = new Date().getFullYear(), out = [];
  for(var y = now + 6; y >= 1970; y--) out.push(String(y));
  return out;
}
function formatOneDate(month, year){
  if(!year && !month) return "";
  if(!year) return month || "";
  if(!month) return String(year);
  return month + " " + year;
}
function formatDateRange(e){
  var start = formatOneDate(e.startMonth, e.startYear);
  var end = e.isPresent ? "Present" : formatOneDate(e.endMonth, e.endYear);
  if(start && end) return start + " \u2013 " + end;
  return start || end || "";
}
/* migrate legacy free-text dates like "Jan 2023" / "Present" / "2019" */
function parseLegacyDate(str){
  var out = {month:"", year:"", present:false};
  if(!str) return out;
  var s = String(str).trim();
  if(/^(present|current|now|ongoing)$/i.test(s)){ out.present = true; return out; }
  var m = s.match(/([A-Za-z]{3,})/);
  if(m){
    var idx = MONTHS.findIndex(function(mo){ return m[1].toLowerCase().indexOf(mo.toLowerCase()) === 0; });
    if(idx >= 0) out.month = MONTHS[idx];
  }
  var y = s.match(/(19|20)\d{2}/);
  if(y) out.year = y[0];
  return out;
}

/* --- alignment engine --- */
var ALIGN_DEFAULTS = {
  classic:  {header:"left",   title:"left",   body:"left"},
  harvard:  {header:"center", title:"center", body:"left"},
  modern:   {header:"left",   title:"left",   body:"left"}
};
/* what each alignment means for a given element */
function resolveAlign(align, role, templateId){
  var defaults = ALIGN_DEFAULTS[templateId] || ALIGN_DEFAULTS.classic;
  if(!align || align === "auto") return defaults[role] || "left";
  if(align === "justify"){
    /* justify only makes sense for flowing paragraph text */
    return role === "body" ? "justify" : "left";
  }
  return align;
}
/* a split row (title left / date right) only works when the block is left-aligned */
function useSplitRow(bodyAlign){ return bodyAlign === "left" || bodyAlign === "justify"; }

/* --- section factory --- */
var SECTION_TYPES = {
  summary:      {label:"Paragraph", title:"Summary"},
  skills:       {label:"Tag list",  title:"Skills"},
  languages:    {label:"List",      title:"Languages"},
  highlights:   {label:"Bullet list", title:"Experience Summary"},
  experience:   {label:"Timeline",  title:"Experience"},
  projects:     {label:"Timeline",  title:"Projects"},
  education:    {label:"Timeline",  title:"Education"},
  certifications:{label:"Timeline", title:"Certifications"},
  custom:       {label:"Custom",    title:"Custom Section"}
};
function uid(){ return Math.random().toString(36).slice(2,10); }
function emptyEntry(kind){
  var base = {id:uid(), heading:"", org:"", location:"", startMonth:"", startYear:"", endMonth:"", endYear:"", isPresent:false, description:"", bullets:[]};
  if(kind === "experience") return Object.assign(base,{heading:"Job Title", org:"Company", location:"Bengaluru, India", startMonth:"Jan", startYear:"2023", isPresent:true, bullets:["Describe a measurable achievement — e.g. cut release time 40% by automating the deploy pipeline."]});
  if(kind === "projects") return Object.assign(base,{heading:"Project Name", org:"React, Node.js, PostgreSQL", startMonth:"Mar", startYear:"2024", endMonth:"Jun", endYear:"2024", description:"", bullets:["What the project does and the result it produced."]});
  if(kind === "education") return Object.assign(base,{heading:"B.Tech, Computer Science", org:"University Name", location:"Pune, India", startMonth:"", startYear:"2019", endMonth:"", endYear:"2023", bullets:[]});
  if(kind === "certifications") return Object.assign(base,{heading:"AWS Solutions Architect – Associate", org:"Amazon Web Services", startMonth:"", startYear:"2025", bullets:[]});
  return Object.assign(base,{heading:"Title", org:"Subtitle", bullets:["Detail line."]});
}
function emptyLanguage(){ return {id:uid(), language:"", level:""}; }
function defaultSection(type, customTitle){
  var meta = SECTION_TYPES[type] || SECTION_TYPES.custom;
  var s = {id:uid(), type:type, title:customTitle || meta.title, align:"auto"};
  if(type === "summary") s.text = "Product manager with 6 years shipping B2B SaaS. Led a 3-team platform rewrite that lifted activation 28%. Looking for a senior PM role in developer tooling.";
  else if(type === "skills"){ s.items = ["Product strategy","Roadmapping","SQL","A/B testing","Figma","Jira","Stakeholder management","Go-to-market"]; s.display = "tags"; }
  else if(type === "languages") s.items = [{id:uid(), language:"English", level:"Proficient"}];
  else if(type === "highlights") s.items = [
    "Total of 6+ years of experience shipping production software.",
    "Worked across the full development lifecycle - requirements, design, build and test.",
    "Strong hands-on experience with cross-functional collaboration and stakeholder communication."
  ];
  else { s.entries = [emptyEntry(type)]; s.style = "bullets"; }
  return s;
}
/* Some resume formats (e.g. Harvard's paragraph-style template) read as
   flowing prose instead of bullet points. The underlying data - one
   achievement per line - never changes; this just joins those lines into
   a single paragraph for display/export when a section is set to that style. */
function joinAsParagraph(bullets){
  return (bullets||[]).map(function(b){
    var t = String(b||"").trim();
    if(!t) return "";
    if(!/[.!?]$/.test(t)) t += ".";
    return t;
  }).filter(Boolean).join(" ");
}
/* contact field kinds offered in the label dropdown */
var CONTACT_PRESETS = ["Email","Phone","City","LinkedIn","GitHub","Portfolio","Website"];
/* only the City field gets the location value help */
function isLocationLabel(label){ return String(label||"").trim().toLowerCase() === "city"; }

function defaultState(){
  return {
    version: 3,
    step: 1,
    templateId: "classic",
    accent: "#B23A2F",
    pageSize: "letter",
    heading: {
      name: "Alex Rivera",
      role: "Senior Product Manager",
      align: "auto",
      contacts: [
        {id:uid(), label:"Email", value:"alex.rivera@email.com"},
        {id:uid(), label:"Phone", value:"+91 98200 19283"},
        {id:uid(), label:"City", value:"Mumbai, India"},
        {id:uid(), label:"LinkedIn", value:"linkedin.com/in/alexrivera"}
      ]
    },
    sections: [
      defaultSection("summary"),
      defaultSection("skills"),
      defaultSection("experience"),
      defaultSection("projects"),
      defaultSection("education")
    ]
  };
}

/* --- migration: v1 (string dates) -> v2 (structured) --- */
function migrate(state){
  if(!state || !state.sections) return null;
  if(state.version === 3) return state;
  state.sections.forEach(function(s){
    (s.entries || []).forEach(function(e){
      if(e.startMonth === undefined){
        var sd = parseLegacyDate(e.start);
        e.startMonth = sd.month; e.startYear = sd.year;
        var ed = parseLegacyDate(e.end);
        e.isPresent = !!ed.present;
        e.endMonth = ed.month; e.endYear = ed.year;
        delete e.start; delete e.end;
      }
      if(!e.bullets) e.bullets = [];
    });
  });
  /* v3: contact labels line up with the preset dropdown */
  ((state.heading || {}).contacts || []).forEach(function(c){
    if(/^(location|address|based in|city)$/i.test(String(c.label||"").trim())) c.label = "City";
    if(c.custom === undefined) c.custom = CONTACT_PRESETS.indexOf(c.label) === -1;
  });
  state.version = 3;
  return state;
}

/* --- ATS heuristic scorer ---
   A deterministic checklist, not a black box: every check is independently
   inspectable and testable. Weights sum to 100. This estimates how a
   resume is likely to fare with keyword/format-based screening and with a
   human skimming it - it is not a guarantee of any real ATS's behavior. */
var ACTION_VERB_STARTS = [
  "led","managed","built","created","developed","designed","launched","drove","directed",
  "coordinated","delegated","executed","orchestrated","mentored","authored","presented",
  "negotiated","persuaded","facilitated","advocated","briefed","analyzed","investigated",
  "evaluated","synthesized","forecasted","benchmarked","diagnosed","engineered","automated",
  "deployed","debugged","migrated","optimized","reduced","increased","generated","budgeted",
  "reconciled","projected","streamlined","standardized","consolidated","restructured",
  "implemented","scheduled","shipped","owned","grew","improved","cut","spearheaded",
  "delivered","achieved","established","initiated","planned","resolved","trained","won"
];
var PRONOUN_RE = /\b(i|my|me|myself)\b/i;
var NUMBER_RE = /[\d%$]/;

function allBulletsAndSummary(state){
  var bullets = [];
  var summaryText = "";
  state.sections.forEach(function(s){
    if(s.type === "summary") summaryText = s.text || "";
    else if(s.type === "highlights") (s.items||[]).forEach(function(b){ if(b) bullets.push(b); });
    else if(s.entries) s.entries.forEach(function(e){ (e.bullets||[]).forEach(function(b){ if(b) bullets.push(b); }); });
  });
  return {bullets:bullets, summaryText:summaryText};
}

function scoreAts(state){
  var checks = [];
  function check(id, label, weight, pass, detail){
    checks.push({id:id, label:label, weight:weight, pass:!!pass, detail:detail});
  }

  var contacts = (state.heading.contacts||[]).filter(function(c){ return (c.value||"").trim(); });
  var hasEmail = contacts.some(function(c){ return c.label === "Email"; });
  check("contact", "Name and at least two contact methods", 10,
    !!(state.heading.name||"").trim() && hasEmail && contacts.length >= 2,
    "Add your name, an email, and at least one more way to reach you.");

  var summarySection = state.sections.find(function(s){ return s.type === "summary"; });
  var summaryLen = ((summarySection && summarySection.text) || "").trim().length;
  check("summary", "Summary section with real content", 10, summaryLen >= 40,
    "Add a 2-4 sentence summary near the top - it's often the first thing skimmed.");

  var skillsSection = state.sections.find(function(s){ return s.type === "skills"; });
  var skillCount = (skillsSection && skillsSection.items || []).filter(Boolean).length;
  check("skills", "At least 3 listed skills", 10, skillCount >= 3,
    "List the specific tools, languages or methods relevant to the role.");

  var hasExperienceWithBullets = state.sections.some(function(s){
    return (s.type === "experience" || s.type === "projects") &&
      (s.entries||[]).some(function(e){ return (e.bullets||[]).some(Boolean); });
  });
  check("experience", "Experience or Projects with achievement bullets", 15, hasExperienceWithBullets,
    "Add at least one role or project with a few specific bullet points.");

  var b = allBulletsAndSummary(state);
  var withNumbers = b.bullets.filter(function(x){ return NUMBER_RE.test(x); }).length;
  check("quantified", "Bullets include a number, %, or $ amount", 15,
    b.bullets.length > 0 && withNumbers / b.bullets.length >= 0.3,
    "Add a metric to at least some bullets - \"cut costs 20%\" reads stronger than \"cut costs\".");

  var startsWithVerb = b.bullets.filter(function(x){
    var first = (x.trim().split(/\s+/)[0] || "").toLowerCase().replace(/[^a-z]/g, "");
    return ACTION_VERB_STARTS.indexOf(first) !== -1;
  }).length;
  check("action-verbs", "Bullets start with a strong action verb", 15,
    b.bullets.length > 0 && startsWithVerb / b.bullets.length >= 0.5,
    "Start bullets with verbs like \"Led\", \"Built\", \"Reduced\" instead of \"Responsible for\".");

  var pronounHits = b.bullets.concat([b.summaryText]).filter(function(x){ return PRONOUN_RE.test(x); }).length;
  check("no-pronouns", "No first-person pronouns (I / my / me)", 10, pronounHits === 0,
    "Drop \"I\" and \"my\" - resume bullets read as implied first person without them.");

  check("single-column", "Single-column, ATS-safe layout", 5, true,
    "All templates here are single-column, which is the safest format for parsing software.");

  var totalBullets = b.bullets.length;
  check("length", "A reasonable amount of content (3-30 bullets)", 10,
    totalBullets >= 3 && totalBullets <= 30,
    totalBullets < 3 ? "Add more detail - a handful of bullets reads as thin." : "Trim to the strongest points - very long resumes lose the reader.");

  var score = checks.reduce(function(sum, c){ return sum + (c.pass ? c.weight : 0); }, 0);
  return {score:score, checks:checks};
}


/* --- build a render-ready model shared by preview, PDF and DOCX --- */
function buildModel(state){
  var t = state.templateId;
  var headerAlign = resolveAlign(state.heading.align, "header", t);
  var model = {
    template: t,
    accent: state.accent,
    pageSize: state.pageSize,
    header: {
      align: headerAlign,
      name: state.heading.name || "",
      role: state.heading.role || "",
      contacts: state.heading.contacts.filter(function(c){ return (c.value||"").trim(); }).map(function(c){ return c.value.trim(); })
    },
    sections: []
  };
  state.sections.forEach(function(s){
    var bodyAlign = resolveAlign(s.align, "body", t);
    var titleAlign = resolveAlign(s.align, "title", t);
    var out = {type:s.type, title:(s.title||"").trim(), titleAlign:titleAlign, bodyAlign:bodyAlign, split:useSplitRow(bodyAlign)};
    if(s.type === "summary"){
      out.text = (s.text||"").trim();
      if(!out.text) return;
    } else if(s.type === "skills"){
      out.items = (s.items||[]).filter(Boolean);
      out.display = s.display === "list" ? "list" : "tags";
      if(!out.items.length) return;
    } else if(s.type === "languages"){
      out.items = (s.items||[]).map(function(l){
        return {language:(l.language||"").trim(), level:(l.level||"").trim()};
      }).filter(function(l){ return l.language; });
      if(!out.items.length) return;
    } else if(s.type === "highlights"){
      out.items = (s.items||[]).map(function(x){ return String(x||"").trim(); }).filter(Boolean);
      if(!out.items.length) return;
    } else {
      out.style = s.style === "paragraph" ? "paragraph" : "bullets";
      out.entries = (s.entries||[]).map(function(e){
        return {
          heading:(e.heading||"").trim(),
          org:(e.org||"").trim(),
          location:(e.location||"").trim(),
          dates: formatDateRange(e),
          description:(e.description||"").trim(),
          bullets:(e.bullets||[]).map(function(b){ return String(b||"").trim(); }).filter(Boolean)
        };
      }).filter(function(e){ return e.heading || e.org || e.description || e.bullets.length; });
      if(!out.entries.length) return;
    }
    if(!out.title) return;
    model.sections.push(out);
  });
  return model;
}

function hexToRgb(hex){
  var m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex || "#B23A2F");
  return m ? {r:parseInt(m[1],16), g:parseInt(m[2],16), b:parseInt(m[3],16)} : {r:178,g:58,b:47};
}
function rgbToHex2(rgb){
  function h(n){ var s = n.toString(16); return s.length < 2 ? "0"+s : s; }
  return h(rgb.r)+h(rgb.g)+h(rgb.b);
}
function sanitizeFilename(name){
  return (String(name||"resume").trim().replace(/[^a-z0-9]+/gi,"-").replace(/(^-|-$)/g,"")) || "resume";
}
function escapeHtml(str){
  return String(str == null ? "" : str).replace(/[&<>"']/g, function(c){
    return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];
  });
}
function splitLines(v){ return String(v||"").split("\n").map(function(x){ return x.trim(); }).filter(Boolean); }
function splitTags(v){ return String(v||"").split(/,|\n/).map(function(x){ return x.trim(); }).filter(Boolean); }

return {
  MONTHS: MONTHS, GEO: GEO, SECTION_TYPES: SECTION_TYPES,
  searchLocations: searchLocations, searchCountries: searchCountries,
  yearOptions: yearOptions, formatDateRange: formatDateRange, formatOneDate: formatOneDate,
  parseLegacyDate: parseLegacyDate, resolveAlign: resolveAlign, useSplitRow: useSplitRow,
  defaultSection: defaultSection, defaultState: defaultState, emptyEntry: emptyEntry, emptyLanguage: emptyLanguage,
  CONTACT_PRESETS: CONTACT_PRESETS, isLocationLabel: isLocationLabel,
  migrate: migrate, buildModel: buildModel, uid: uid, scoreAts: scoreAts,
  hexToRgb: hexToRgb, rgbToHex2: rgbToHex2, sanitizeFilename: sanitizeFilename,
  escapeHtml: escapeHtml, splitLines: splitLines, splitTags: splitTags,
  joinAsParagraph: joinAsParagraph
};
})();
if(typeof module !== "undefined" && module.exports) module.exports = RF;
/* =================== CORE END =================== */
