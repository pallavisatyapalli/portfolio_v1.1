import { useState, useEffect, useRef } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const PROJECTS = [
  { id:"01", title:"StudySphere",
    desc:"Academic resource management platform with centralized content access and an AI-based quiz generation feature to enhance learning and engagement. Presented at ICCIC 2025.",
    tags:["AI","React","NLP"], github:"https://github.com/pallavisatyapally/studysphere",
    img:"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80" },
  { id:"02", title:"Retina AI",
    desc:"AI-powered retinal image analysis system using CNN (Xception) for early detection of Diabetic Retinopathy, integrated with a Flask web app for real-time prediction.",
    tags:["Deep Learning","Flask","CNN"], github:"https://github.com/pallavisatyapally/retina-ai",
    img:"https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80" },
  { id:"03", title:"Voyager",
    desc:"Multi-functional travel utility platform offering real-time currency conversion, weather forecasting, and text translation for seamless trip planning.",
    tags:["React","APIs","JavaScript"], github:"https://github.com/pallavisatyapally/voyager",
    img:"https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80" },
  { id:"04", title:"Speaking AI Bot",
    desc:"Real-time voicebot using Whisper API, LLaMA, and WebRTC VAD for live audio capture, silence-based speech detection, transcription, and LLM-powered conversations.",
    tags:["LLM","Whisper","WebRTC"], github:"https://github.com/pallavisatyapally",
    img:"https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80" },
  { id:"05", title:"Hospital Management System",
    desc:"Full-stack HMS with role-based access control, automating patient scheduling, doctor management, pharmacy operations, appointment booking, and inventory tracking.",
    tags:["Full Stack","SQL","React"], github:"https://github.com/pallavisatyapally/hospital-management-system",
    img:"https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&q=80" },
  { id:"06", title:"Hacko Helper",
    desc:"AI-powered chatbot using NLP and conversational AI to generate innovative hackathon ideas, assisting with context-aware brainstorming, idea ranking, and project suggestions.",
    tags:["NLP","Chatbot","AI"], github:"https://github.com/pallavisatyapally/hackohelper",
    img:"https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80" },
];

// Skills with SVG icon components per category
const SKILLS = [
  {
    icon: CodeIcon,
    cat: "Languages",
    items: ["Java","Python","C++","SQL"],
  },
  {
    icon: GlobeIcon,
    cat: "Web",
    items: ["HTML & CSS","JavaScript","React","Flask"],
  },
  {
    icon: BrainIcon,
    cat: "AI / ML / DL",
    items: ["Machine Learning","Deep Learning","NLP & LLMs","RAG & Prompt Engineering"],
  },
  {
    icon: PackageIcon,
    cat: "Libraries",
    items: ["NumPy","Pandas"],
  },
  {
    icon: DatabaseIcon,
    cat: "Databases & Tools",
    items: ["MySQL","Git & GitHub"],
  },
  {
    icon: CpuIcon,
    cat: "Core Concepts",
    items: ["Operating Systems","Computer Networks"],
  },
];

const EXPERIENCE = [
  { role:"Co-Lead – Generative AI & Prompt Engineering",
    org:"Black Box Student Community SVEC",
    period:"Oct 2024 – Present · 1 yr 7 mos",
    location:"Andhra Pradesh, India · On-site", type:"Community",
    desc:"Led initiatives in Generative AI & Prompt Engineering. Organized 5+ workshops engaging 200+ participants each. Mentored participants in AI tools and prompt design. Fostered collaborative environments for AI-driven solutions." },
  { role:"Devcon Associate (SAP Technical Track)", org:"Naxrita India",
    period:"Jan 2026 – Feb 2026 · 2 mos",
    location:"Andhra Pradesh, India · On-site", type:"Internship",
    desc:"Worked with SAP technical concepts applied to real-world use cases. Gained hands-on exposure to enterprise systems and workflows." },
  { role:"Open Source Contributor", org:"GirlScript Foundation",
    period:"Jul 2025 – Nov 2025 · 5 mos",
    location:"Science and Technology", type:"Volunteering",
    desc:"Contributed to open source projects as part of GirlScript Summer of Code, collaborating with developers on impactful technology solutions." },
  { role:"Class Representative", org:"Sri Vasavi Engineering College",
    period:"Nov 2022 – Oct 2023 · 1 yr",
    location:"Andhra Pradesh, India · On-site", type:"Leadership",
    desc:"Represented a class of 60+ students as liaison between faculty and peers. Coordinated academic schedules, assignments, and communications." },
];

const ACHIEVEMENTS = [
  { num:"01", icon:"📄", title:"Paper Presentation — ICCIC 2025",
    desc:'Presented "StudySphere" at the Springer 2025 International Conference on Cognitive & Intelligent Computing, Vasavi College of Engineering, Hyderabad.' },
  { num:"02", icon:"🏆", title:"Hackathon — 4th Place",
    desc:"Led a team of 4 to design Voyager, securing 4th place among 50 teams in an intra-college mini hackathon." },
  { num:"03", icon:"🎓", title:"Academic Excellence",
    desc:"Awarded Academic Topper for 5 consecutive semesters." },
];

const SOCIALS = [
  { label:"GitHub",        url:"https://github.com/pallavisatyapally",                                  Icon:GithubIcon   },
  { label:"LinkedIn",      url:"https://www.linkedin.com/in/pallavi-satya-palli/",                      Icon:LinkedinIcon },
  { label:"LeetCode",      url:"https://leetcode.com/u/PallaviSatya/",                                  Icon:LeetcodeIcon },
  { label:"GeeksforGeeks", url:"https://www.geeksforgeeks.org/profile/pallavisatyapalli?tab=activity",   Icon:GfgIcon      },
];

const NAV = ["Projects","Skills","Experience","Achievements"];

// ─── SKILL CATEGORY ICONS ────────────────────────────────────────────────────

function CodeIcon({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  );
}
function GlobeIcon({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  );
}
function BrainIcon({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.44-4.66z"/>
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.44-4.66z"/>
    </svg>
  );
}
function PackageIcon({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
    </svg>
  );
}
function DatabaseIcon({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3"/>
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
    </svg>
  );
}
function CpuIcon({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2"/>
      <rect x="9" y="9" width="6" height="6"/>
      <line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/>
      <line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/>
      <line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/>
      <line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>
    </svg>
  );
}

// ─── SOCIAL / NAV ICONS ──────────────────────────────────────────────────────

function GithubIcon({size=20}){return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>;}
function LinkedinIcon({size=20}){return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;}
function LeetcodeIcon({size=20}){return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/></svg>;}
function GfgIcon({size=20}){return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M21.45 14.315c-.143.28-.334.532-.565.745a3.691 3.691 0 0 1-1.104.695 4.51 4.51 0 0 1-2.116.327 4.7 4.7 0 0 1-1.93-.57 4.558 4.558 0 0 1-1.518-1.416h-.004a4.558 4.558 0 0 1-1.518 1.416 4.7 4.7 0 0 1-1.93.57 4.51 4.51 0 0 1-2.116-.327 3.691 3.691 0 0 1-1.104-.695 2.652 2.652 0 0 1-.565-.745C6.882 13.738 7.3 13 8.002 13c.3 0 .562.12.768.338.102.11.198.228.3.344.273.31.6.596.987.796.385.2.843.314 1.352.295a2.97 2.97 0 0 0 1.75-.6 2.965 2.965 0 0 0 .793-.883h.086a2.965 2.965 0 0 0 .793.883 2.97 2.97 0 0 0 1.75.6c.51.019.967-.095 1.352-.295.386-.2.714-.487.988-.796.101-.116.197-.234.3-.344A1.05 1.05 0 0 1 19.998 13c.702 0 1.12.738.952 1.315zM12 2.4C6.698 2.4 2.4 6.698 2.4 12S6.698 21.6 12 21.6 21.6 17.302 21.6 12 17.302 2.4 12 2.4zm0 1.6a8 8 0 1 1 0 16A8 8 0 0 1 12 4zm-4.5 6.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm9 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/></svg>;}
function SunIcon(){return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>;}
function MoonIcon(){return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>;}
function MenuIcon(){return <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>;}
function CloseIcon(){return <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;}
function ExtIcon({size=12}){return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>;}

// ─── SCROLL REVEAL ───────────────────────────────────────────────────────────

function useReveal(threshold=0.1){
  const ref=useRef(null);
  const [v,setV]=useState(false);
  useEffect(()=>{
    const el=ref.current; if(!el) return;
    const o=new IntersectionObserver(([e])=>{
      if(e.isIntersecting){setV(true);o.disconnect();}
    },{threshold});
    o.observe(el); return()=>o.disconnect();
  },[threshold]);
  return [ref,v];
}

function Reveal({children,delay=0,style={}}){
  const [ref,v]=useReveal();
  return(
    <div ref={ref} style={{
      opacity:v?1:0,
      transform:v?"translateY(0)":"translateY(30px)",
      transition:`opacity .68s cubic-bezier(.4,0,.2,1) ${delay}ms, transform .68s cubic-bezier(.4,0,.2,1) ${delay}ms`,
      ...style,
    }}>{children}</div>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function Portfolio(){
  const [dark,setDark]=useState(true);
  const [sidebar,setSidebar]=useState(false);
  const [active,setActive]=useState("hero");
  const [heroReady,setHeroReady]=useState(false);

  const refs={
    hero:useRef(null),
    Projects:useRef(null),
    Skills:useRef(null),
    Experience:useRef(null),
    Achievements:useRef(null),
  };

  useEffect(()=>{const t=setTimeout(()=>setHeroReady(true),80);return()=>clearTimeout(t);},[]);

  useEffect(()=>{
    const obs=Object.entries(refs).map(([key,ref])=>{
      const o=new IntersectionObserver(([e])=>{if(e.isIntersecting)setActive(key);},{threshold:.2});
      if(ref.current)o.observe(ref.current); return o;
    });
    return()=>obs.forEach(o=>o.disconnect());
  },[]);

  const go=(id)=>{refs[id]?.current?.scrollIntoView({behavior:"smooth"});setSidebar(false);};

  const c=dark
    ?{bg:"#0a0a0a",surf:"#111111",surf2:"#181818",
      text:"#efefef",muted:"#7a7a7a",dim:"#383838",
      border:"#222222",tag:"#1a1a1a",tagT:"#888888",
      shadow:"rgba(0,0,0,0.65)"}
    :{bg:"#f8f8f6",surf:"#ffffff",surf2:"#f1f1ef",
      text:"#111111",muted:"#666666",dim:"#c8c8c8",
      border:"#e4e4e4",tag:"#eeeeec",tagT:"#666666",
      shadow:"rgba(0,0,0,0.08)"};

  const SERIF="'Playfair Display',Georgia,serif";
  const SANS ="'Outfit','Helvetica Neue',sans-serif";

  const ha=(d)=>({
    opacity:heroReady?1:0,
    transform:heroReady?"translateY(0)":"translateY(28px)",
    transition:`opacity .75s ease ${d}ms, transform .75s ease ${d}ms`,
  });

  return(
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=Outfit:wght@300;400;500;600;700&display=swap');
        *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
        html{scroll-behavior:smooth}
        body{overflow-x:hidden;background:${c.bg};font-family:'Outfit',sans-serif}
        ::-webkit-scrollbar{width:3px}
        ::-webkit-scrollbar-thumb{background:${c.border};border-radius:2px}
        ::selection{background:${dark?"#2c2c2c":"#d8d8d8"}}

        .nl{transition:color .2s,border-color .2s;cursor:pointer}
        .nl:hover{color:${c.text} !important;border-bottom-color:${c.text} !important}

        .sh{transition:color .22s,transform .22s}
        .sh:hover{color:${c.text} !important;transform:translateY(-2px)}

        .pc{transition:transform .32s cubic-bezier(.4,0,.2,1),box-shadow .32s,border-color .32s}
        .pc:hover{transform:translateY(-5px);box-shadow:0 24px 52px ${c.shadow};border-color:${c.muted} !important}
        .pc:hover .pci{transform:scale(1.06)}
        .pci{transition:transform .48s cubic-bezier(.4,0,.2,1)}

        /* skill card — icon glows on hover */
        .sc{transition:transform .26s ease,border-color .26s,box-shadow .26s}
        .sc:hover{transform:translateY(-4px);border-color:${c.muted} !important;box-shadow:0 10px 28px ${c.shadow}}
        .sc:hover .sk-icon{color:${c.text} !important;transform:scale(1.12)}
        .sk-icon{transition:color .25s,transform .25s}

        .ac{transition:transform .28s ease,box-shadow .28s ease,border-color .28s}
        .ac:hover{transform:translateY(-4px);box-shadow:0 14px 36px ${c.shadow};border-color:${c.muted} !important}

        .gb{transition:background .2s,color .2s,border-color .2s}
        .gb:hover{background:${c.text} !important;color:${c.bg} !important;border-color:${c.text} !important}

        .sbl{transition:color .18s,padding-left .2s;cursor:pointer}
        .sbl:hover{color:${c.text} !important;padding-left:6px !important}

        .er{transition:border-bottom-color .25s}
        .er:hover{border-bottom-color:${c.muted} !important}

        .photo-wrap{transition:transform .35s ease,box-shadow .35s ease}
        .photo-wrap:hover{transform:scale(1.015);box-shadow:0 28px 64px ${c.shadow}}

        @media(max-width:768px){
          .desk{display:none !important}
          .burg{display:flex !important}
          .eg{grid-template-columns:1fr !important;gap:6px !important}
          .hero-inner{flex-direction:column-reverse !important;gap:32px !important;padding:48px 0 !important}
          .photo-wrap{width:160px !important;height:200px !important;margin:0 auto}
        }
        @media(min-width:769px){.burg{display:none !important}}
      `}</style>

      {/* overlay */}
      <div onClick={()=>setSidebar(false)} style={{
        position:"fixed",inset:0,zIndex:200,
        background:"rgba(0,0,0,0.45)",backdropFilter:"blur(6px)",
        opacity:sidebar?1:0,pointerEvents:sidebar?"auto":"none",
        transition:"opacity .3s",
      }}/>

      {/* ── sidebar ── */}
      <aside style={{
        position:"fixed",top:0,right:0,bottom:0,width:268,zIndex:201,
        background:c.surf,borderLeft:`1px solid ${c.border}`,
        transform:sidebar?"translateX(0)":"translateX(100%)",
        transition:"transform .38s cubic-bezier(.4,0,.2,1)",
        display:"flex",flexDirection:"column",padding:"26px 28px 32px",
      }}>
        <button onClick={()=>setSidebar(false)}
          style={{alignSelf:"flex-end",background:"none",border:"none",cursor:"pointer",color:c.text,marginBottom:28}}>
          <CloseIcon/>
        </button>
        <div style={{marginBottom:28}}>
          <div style={{fontFamily:SERIF,fontWeight:700,fontSize:18,color:c.text}}>Pallavi Satya</div>
          <div style={{fontFamily:SANS,fontSize:11.5,color:c.muted,marginTop:4,fontWeight:400}}>AI · ML · Full-Stack</div>
        </div>
        <div style={{display:"flex",flexDirection:"column"}}>
          {NAV.map(l=>(
            <div key={l} className="sbl"
              style={{fontFamily:SANS,fontSize:18,fontWeight:500,
                color:active===l?c.text:c.muted,
                padding:"9px 0",borderBottom:`1px solid ${c.border}`}}
              onClick={()=>go(l)}>{l}</div>
          ))}
        </div>
        <div style={{marginTop:"auto",display:"flex",gap:18,paddingTop:24}}>
          {SOCIALS.map(({label,url,Icon})=>(
            <a key={label} href={url} target="_blank" rel="noreferrer"
              className="sh" style={{color:c.muted,display:"flex"}}><Icon size={17}/></a>
          ))}
        </div>
      </aside>

      {/* ── navbar ── */}
      <nav style={{
        position:"fixed",top:0,left:0,right:0,zIndex:100,height:56,
        background:dark?"rgba(10,10,10,0.9)":"rgba(248,248,246,0.93)",
        backdropFilter:"blur(18px)",borderBottom:`1px solid ${c.border}`,
        display:"flex",alignItems:"center",
        padding:"0 clamp(24px,7vw,88px)",justifyContent:"space-between",
        transition:"background .3s",
      }}>
        <div onClick={()=>go("hero")} style={{
          fontFamily:SERIF,fontWeight:800,fontStyle:"italic",
          fontSize:17,color:c.text,cursor:"pointer",letterSpacing:"0.01em"}}>
          PS
        </div>
        <div className="desk" style={{display:"flex",gap:28,alignItems:"center"}}>
          {NAV.map(l=>(
            <div key={l} className="nl"
              style={{fontFamily:SANS,fontSize:11.5,fontWeight:500,letterSpacing:"0.08em",
                textTransform:"uppercase",
                color:active===l?c.text:c.muted,
                borderBottom:active===l?`1.5px solid ${c.text}`:"1.5px solid transparent",
                paddingBottom:2}}
              onClick={()=>go(l)}>{l}</div>
          ))}
        </div>
        <div style={{display:"flex",alignItems:"center",gap:14}}>
          <button onClick={()=>setDark(!dark)} title={dark?"Light mode":"Dark mode"}
            style={{
              width:42,height:24,borderRadius:12,
              background:dark?"#282828":"#e0e0e0",
              border:`1.5px solid ${c.border}`,
              cursor:"pointer",display:"flex",alignItems:"center",
              padding:"0 3px",transition:"background .35s",flexShrink:0,
            }}>
            <div style={{
              width:18,height:18,borderRadius:"50%",
              background:dark?"#f0f0f0":"#444",
              transform:dark?"translateX(18px)":"translateX(0)",
              transition:"transform .35s cubic-bezier(.34,1.56,.64,1),background .35s",
              display:"flex",alignItems:"center",justifyContent:"center",
            }}>{dark?<MoonIcon/>:<SunIcon/>}</div>
          </button>
          <button className="burg"
            style={{background:"none",border:"none",cursor:"pointer",color:c.text,display:"none"}}
            onClick={()=>setSidebar(true)}><MenuIcon/></button>
        </div>
      </nav>

      {/* ══════════ HERO ══════════ */}
      <section ref={refs.hero} style={{
        minHeight:"100vh",paddingTop:56,
        display:"flex",alignItems:"center",
        padding:"0 clamp(24px,7vw,88px)",
        maxWidth:1100,margin:"0 auto",
      }}>
        <div className="hero-inner" style={{
          display:"flex",alignItems:"center",
          justifyContent:"space-between",
          gap:60,width:"100%",padding:"64px 0",
        }}>

          {/* LEFT */}
          <div style={{flex:1,minWidth:0}}>
            <div style={{...ha(80),fontFamily:SANS,fontSize:10.5,fontWeight:600,
              letterSpacing:"0.22em",textTransform:"uppercase",
              color:c.muted,marginBottom:20}}>
              Developer & AI Engineer
            </div>

            <h1 style={{
              ...ha(180),fontFamily:SERIF,
              fontSize:"clamp(44px,7.5vw,88px)",
              fontWeight:800,lineHeight:1.04,
              letterSpacing:"-0.02em",
              color:c.text,marginBottom:16,
            }}>
              Pallavi<br/>
              <em style={{fontStyle:"italic",color:c.muted}}>Satya</em>
            </h1>

            <p style={{
              ...ha(270),fontFamily:SANS,
              fontSize:"clamp(13px,1.7vw,15.5px)",
              color:c.muted,maxWidth:440,
              lineHeight:1.85,marginBottom:36,fontWeight:300,
            }}>
              Computer Engineering undergraduate with strong foundations in programming, data structures, and AI-driven applications.
            </p>

            {/* CGPA — clean text block */}
            <div style={{...ha(350),marginBottom:40}}>
              <div style={{paddingLeft:14,borderLeft:`2px solid ${c.border}`}}>
                <div style={{fontFamily:SANS,fontSize:10,fontWeight:600,
                  letterSpacing:"0.18em",textTransform:"uppercase",
                  color:c.muted,marginBottom:5}}>Education</div>
                <div style={{fontFamily:SERIF,fontSize:15,fontWeight:700,
                  color:c.text,marginBottom:2}}>
                  B.Tech in Computer Science & Engineering
                </div>
                <div style={{fontFamily:SANS,fontSize:12,color:c.muted,
                  fontWeight:400,marginBottom:8}}>
                  Sri Vasavi Engineering College &nbsp;·&nbsp; 2022 — 2026
                </div>
                <div style={{display:"flex",alignItems:"baseline",gap:6}}>
                  <span style={{fontFamily:SERIF,fontSize:28,fontWeight:800,
                    color:c.text,lineHeight:1}}>9.31</span>
                  <span style={{fontFamily:SANS,fontSize:10,fontWeight:600,
                    letterSpacing:"0.14em",textTransform:"uppercase",color:c.muted}}>CGPA</span>
                </div>
              </div>
            </div>

            {/* socials */}
            <div style={{...ha(430),display:"flex",gap:22,flexWrap:"wrap"}}>
              {SOCIALS.map(({label,url,Icon})=>(
                <a key={label} href={url} target="_blank" rel="noreferrer"
                  className="sh"
                  style={{display:"flex",alignItems:"center",gap:6,
                    color:c.muted,textDecoration:"none",
                    fontFamily:SANS,fontSize:12,fontWeight:400}}>
                  <Icon size={13}/>{label}
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT — photo */}
          <div style={{...ha(200),flexShrink:0}}>
            <div className="photo-wrap" style={{
              width:280,height:340,borderRadius:18,
              overflow:"hidden",border:`1px solid ${c.border}`,
              background:c.surf2,position:"relative",
            }}>
              {/* Replace src with your actual photo */}
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=560&q=85"
                alt="Pallavi Satya Palli"
                style={{
                  width:"100%",height:"100%",objectFit:"cover",objectPosition:"top center",
                  filter:dark?"grayscale(15%) brightness(0.88)":"grayscale(5%)",
                }}
              />
              <div style={{
                position:"absolute",inset:0,
                background:dark
                  ?"linear-gradient(to top,rgba(10,10,10,0.3) 0%,transparent 55%)"
                  :"linear-gradient(to top,rgba(248,248,246,0.18) 0%,transparent 55%)",
              }}/>
            </div>
          </div>

        </div>
      </section>

      <div style={{height:1,background:c.border,margin:"0 clamp(24px,7vw,88px)"}}/>

      {/* ══════════ PROJECTS ══════════ */}
      <section ref={refs.Projects} style={{maxWidth:1100,margin:"0 auto",padding:"88px clamp(24px,7vw,88px)"}}>
        <Reveal>
          <div style={{fontFamily:SANS,fontSize:10,fontWeight:600,letterSpacing:"0.22em",textTransform:"uppercase",color:c.muted,marginBottom:8}}>Work</div>
          <h2 style={{fontFamily:SERIF,fontSize:"clamp(28px,4.5vw,46px)",fontWeight:800,color:c.text,marginBottom:52}}>Projects</h2>
        </Reveal>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(100%,310px),1fr))",gap:20}}>
          {PROJECTS.map((p,i)=>(
            <Reveal key={p.id} delay={i*60}>
              <div className="pc" style={{
                background:c.surf,border:`1px solid ${c.border}`,
                borderRadius:14,overflow:"hidden",height:"100%",
                display:"flex",flexDirection:"column",
              }}>
                <div style={{overflow:"hidden",flexShrink:0}}>
                  <img src={p.img} alt={p.title} className="pci" style={{
                    width:"100%",height:175,objectFit:"cover",display:"block",
                    filter:dark?"grayscale(22%) brightness(0.82)":"grayscale(8%)",
                  }}/>
                </div>
                <div style={{padding:"18px 20px 22px",display:"flex",flexDirection:"column",flex:1}}>
                  <div style={{fontFamily:SANS,fontSize:10,fontWeight:600,letterSpacing:"0.16em",color:c.dim,marginBottom:5}}>{p.id}</div>
                  <div style={{fontFamily:SERIF,fontSize:17.5,fontWeight:700,color:c.text,marginBottom:8}}>{p.title}</div>
                  <p style={{fontFamily:SANS,fontSize:12.5,color:c.muted,lineHeight:1.7,marginBottom:14,flex:1,fontWeight:300}}>{p.desc}</p>
                  <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:14}}>
                    {p.tags.map(t=>(
                      <span key={t} style={{fontFamily:SANS,fontSize:10,fontWeight:500,letterSpacing:"0.06em",padding:"3px 8px",borderRadius:4,background:c.tag,color:c.tagT}}>{t}</span>
                    ))}
                  </div>
                  <a href={p.github} target="_blank" rel="noreferrer" className="gb"
                    style={{display:"inline-flex",alignItems:"center",gap:5,
                      fontFamily:SANS,fontSize:11.5,fontWeight:500,color:c.muted,
                      textDecoration:"none",border:`1px solid ${c.border}`,
                      padding:"5px 11px",borderRadius:6,letterSpacing:"0.04em",alignSelf:"flex-start"}}>
                    <GithubIcon size={12}/> GitHub <ExtIcon/>
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <div style={{height:1,background:c.border,margin:"0 clamp(24px,7vw,88px)"}}/>

      {/* ══════════ SKILLS — grid cards with icons ══════════ */}
      <section ref={refs.Skills} style={{maxWidth:1100,margin:"0 auto",padding:"88px clamp(24px,7vw,88px)"}}>
        <Reveal>
          <div style={{fontFamily:SANS,fontSize:10,fontWeight:600,letterSpacing:"0.22em",textTransform:"uppercase",color:c.muted,marginBottom:8}}>Expertise</div>
          <h2 style={{fontFamily:SERIF,fontSize:"clamp(28px,4.5vw,46px)",fontWeight:800,color:c.text,marginBottom:52}}>Skills</h2>
        </Reveal>

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(188px,1fr))",gap:16}}>
          {SKILLS.map(({icon:Icon,cat,items},i)=>(
            <Reveal key={cat} delay={i*55}>
              <div className="sc" style={{
                background:c.surf,border:`1px solid ${c.border}`,
                borderRadius:12,padding:"20px 20px 22px",
                height:"100%",
              }}>
                {/* icon header — no text label */}
                <div className="sk-icon" style={{
                  color:c.muted,marginBottom:16,
                  display:"flex",alignItems:"center",
                }}>
                  <Icon size={22} color="currentColor"/>
                </div>

                {/* skill items */}
                {items.map((item,j)=>(
                  <div key={item} style={{
                    fontFamily:SANS,fontSize:13,fontWeight:400,
                    color:c.text,padding:"5px 0",
                    borderBottom:`1px solid ${c.border}`,
                    // last item no border
                    ...(j===items.length-1?{borderBottom:"none"}:{}),
                  }}>{item}</div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <div style={{height:1,background:c.border,margin:"0 clamp(24px,7vw,88px)"}}/>

      {/* ══════════ EXPERIENCE ══════════ */}
      <section ref={refs.Experience} style={{maxWidth:1100,margin:"0 auto",padding:"88px clamp(24px,7vw,88px)"}}>
        <Reveal>
          <div style={{fontFamily:SANS,fontSize:10,fontWeight:600,letterSpacing:"0.22em",textTransform:"uppercase",color:c.muted,marginBottom:8}}>Background</div>
          <h2 style={{fontFamily:SERIF,fontSize:"clamp(28px,4.5vw,46px)",fontWeight:800,color:c.text,marginBottom:52}}>Experience</h2>
        </Reveal>
        {EXPERIENCE.map((e,i)=>(
          <Reveal key={i} delay={i*70}>
            <div className="er eg" style={{
              display:"grid",gridTemplateColumns:"160px 1fr",gap:32,
              padding:"32px 0",borderBottom:`1px solid ${c.border}`,alignItems:"start",
            }}>
              <div>
                <div style={{fontFamily:SANS,fontSize:11.5,fontWeight:400,color:c.muted,lineHeight:1.65}}>
                  {e.period}<br/>
                  <span style={{fontSize:10.5,color:c.dim}}>{e.location}</span>
                </div>
                <span style={{
                  display:"inline-block",marginTop:8,
                  fontFamily:SANS,fontSize:9.5,fontWeight:600,
                  letterSpacing:"0.1em",textTransform:"uppercase",
                  padding:"2px 8px",borderRadius:3,background:c.tag,color:c.tagT,
                }}>{e.type}</span>
              </div>
              <div>
                <div style={{fontFamily:SERIF,fontSize:17.5,fontWeight:700,color:c.text,marginBottom:3}}>{e.role}</div>
                <div style={{fontFamily:SANS,fontSize:12.5,fontWeight:500,color:c.muted,marginBottom:10}}>{e.org}</div>
                <p style={{fontFamily:SANS,fontSize:12.5,fontWeight:300,color:c.muted,lineHeight:1.75}}>{e.desc}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      <div style={{height:1,background:c.border,margin:"0 clamp(24px,7vw,88px)"}}/>

      {/* ══════════ ACHIEVEMENTS ══════════ */}
      <section ref={refs.Achievements} style={{maxWidth:1100,margin:"0 auto",padding:"88px clamp(24px,7vw,88px)"}}>
        <Reveal>
          <div style={{fontFamily:SANS,fontSize:10,fontWeight:600,letterSpacing:"0.22em",textTransform:"uppercase",color:c.muted,marginBottom:8}}>Recognition</div>
          <h2 style={{fontFamily:SERIF,fontSize:"clamp(28px,4.5vw,46px)",fontWeight:800,color:c.text,marginBottom:52}}>Achievements</h2>
        </Reveal>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(268px,1fr))",gap:18}}>
          {ACHIEVEMENTS.map((a,i)=>(
            <Reveal key={a.num} delay={i*80}>
              <div className="ac" style={{
                background:c.surf,border:`1px solid ${c.border}`,
                borderRadius:14,padding:"28px 26px",
              }}>
                <div style={{fontFamily:SERIF,fontSize:38,fontWeight:800,color:c.border,lineHeight:1,marginBottom:14}}>{a.num}</div>
                <div style={{fontSize:22,marginBottom:8}}>{a.icon}</div>
                <div style={{fontFamily:SERIF,fontSize:15.5,fontWeight:700,color:c.text,marginBottom:8}}>{a.title}</div>
                <p style={{fontFamily:SANS,fontSize:12.5,fontWeight:300,color:c.muted,lineHeight:1.7}}>{a.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* footer */}
      <footer style={{
        borderTop:`1px solid ${c.border}`,
        padding:"26px clamp(24px,7vw,88px)",
        display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12,
      }}>
        <div style={{fontFamily:SANS,fontSize:11.5,fontWeight:300,color:c.dim}}>© 2026 Pallavi Satya Palli</div>
        <div style={{display:"flex",gap:18}}>
          {SOCIALS.map(({label,url,Icon})=>(
            <a key={label} href={url} target="_blank" rel="noreferrer"
              className="sh" style={{color:c.dim,display:"flex"}}><Icon size={15}/></a>
          ))}
        </div>
      </footer>
    </>
  );
}
