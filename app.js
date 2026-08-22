/* ═══════════════════════════════
   VAIBHAV KUMAR — PORTFOLIO JS
═══════════════════════════════ */

/* ── AMBIENT SPOTLIGHT ── */
const spotlight = document.getElementById('cursor-spotlight');
document.addEventListener('mousemove', e => {
  if(spotlight){
    spotlight.style.left = e.clientX + 'px';
    spotlight.style.top  = e.clientY + 'px';
  }
});

/* ── MAGNETIC BUTTON EFFECT (BEHANCE STYLE) ── */
document.querySelectorAll('.magnetic-btn').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translate(0px, 0px)';
  });
});

/* ── PARTICLES ── */
(function initParticles(){
  const canvas = document.getElementById('particles-canvas');
  const ctx    = canvas.getContext('2d');
  let W, H, particles=[];

  function resize(){ W=canvas.width=innerWidth; H=canvas.height=innerHeight; }
  resize();
  window.addEventListener('resize', resize);

  const GOLD='rgba(212,175,55,', BLUE='rgba(126,200,227,';
  for(let i=0;i<90;i++){
    particles.push({
      x: Math.random()*2000, y: Math.random()*1000,
      r: Math.random()*1.5+0.3,
      vx:(Math.random()-0.5)*0.25, vy:(Math.random()-0.5)*0.25,
      color: Math.random()>.5 ? GOLD : BLUE,
      a: Math.random()*0.6+0.1
    });
  }

  function draw(){
    ctx.clearRect(0,0,W,H);
    particles.forEach(p=>{
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0)p.x=W; if(p.x>W)p.x=0;
      if(p.y<0)p.y=H; if(p.y>H)p.y=0;
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=p.color+p.a+')';
      ctx.fill();
    });
    // connecting lines
    for(let i=0;i<particles.length;i++){
      for(let j=i+1;j<particles.length;j++){
        const dx=particles[i].x-particles[j].x;
        const dy=particles[i].y-particles[j].y;
        const dist=Math.sqrt(dx*dx+dy*dy);
        if(dist<120){
          ctx.beginPath();
          ctx.moveTo(particles[i].x,particles[i].y);
          ctx.lineTo(particles[j].x,particles[j].y);
          ctx.strokeStyle='rgba(212,175,55,'+(0.08*(1-dist/120))+')';
          ctx.lineWidth=0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ── NAVBAR SCROLL ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', ()=>{
  navbar.classList.toggle('scrolled', scrollY>60);
  updateActiveNav();
});

/* ── ACTIVE NAV ── */
function updateActiveNav(){
  const sections=['hero','about','skills','projects','experience','certs','contact'];
  let current='hero';
  sections.forEach(id=>{
    const el=document.getElementById(id);
    if(el && scrollY>=el.offsetTop-200) current=id;
  });
  document.querySelectorAll('.nav-link').forEach(a=>{
    a.classList.toggle('active', a.getAttribute('href')==='#'+current);
  });
}

/* ── HAMBURGER ── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');
hamburger.addEventListener('click',()=>{
  navLinks.classList.toggle('open');
  const spans=hamburger.querySelectorAll('span');
  if(navLinks.classList.contains('open')){
    spans[0].style.transform='translateY(7px) rotate(45deg)';
    spans[1].style.opacity='0';
    spans[2].style.transform='translateY(-7px) rotate(-45deg)';
  } else {
    spans.forEach(s=>{ s.style.transform=''; s.style.opacity=''; });
  }
});
navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
  navLinks.classList.remove('open');
  hamburger.querySelectorAll('span').forEach(s=>{ s.style.transform=''; s.style.opacity=''; });
}));

/* ── TYPEWRITER ── */
const words = [
  'Production AI / ML Systems.',
  'Deep Learning & MoE Models.',
  'Agentic AI & RAG Pipelines.',
  'FastAPI & MLOps Infrastructure.',
  'High-Performance ML Solutions.'
];
let wi=0, ci=0, deleting=false;
const tw = document.getElementById('typewriter');
function type(){
  const word=words[wi];
  if(!deleting){ tw.textContent=word.slice(0,++ci); if(ci===word.length){ setTimeout(()=>{ deleting=true; type(); },1800); return; } }
  else { tw.textContent=word.slice(0,--ci); if(ci===0){ deleting=false; wi=(wi+1)%words.length; } }
  setTimeout(type, deleting?55:90);
}
type();

/* ── PROJECT FILTERS ── */
document.querySelectorAll('.filter-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.project-card').forEach(card=>{
      if(filter==='all' || card.dataset.category===filter){
        card.classList.remove('hide');
      } else {
        card.classList.add('hide');
      }
    });
  });
});

/* ── COUNTER ANIMATION ── */
function animateCounter(el){
  const target=+el.dataset.target;
  let current=0;
  const step=target/50;
  const interval=setInterval(()=>{
    current=Math.min(current+step,target);
    el.textContent=Math.floor(current);
    if(current>=target) clearInterval(interval);
  },30);
}

/* ── REVEAL ON SCROLL WITH DYNAMIC STAGGER DELAY ── */
// Apply stagger index to siblings in grids
document.querySelectorAll('.about-grid, .tools-row, .projects-grid, .timeline, .certs-grid, .contact-links').forEach(grid => {
  Array.from(grid.children).forEach((child, idx) => {
    child.style.setProperty('--delay', idx);
  });
});

const revealEls = document.querySelectorAll('.project-card,.about-card,.tool-chip,.timeline-item,.cert-card,.section-header,.about-bio,.skill-bars,.contact-grid,.contact-item');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('reveal','visible');
      // skill bars
      e.target.querySelectorAll('.skill-bar-fill').forEach(bar=>{ bar.style.width=bar.dataset.width+'%'; });
      // counters
      e.target.querySelectorAll('.stat-num').forEach(animateCounter);
      io.unobserve(e.target);
    }
  });
},{threshold:0.12});
revealEls.forEach(el=>{ el.classList.add('reveal'); io.observe(el); });

// Also watch stat nums directly
const statNums=document.querySelectorAll('.stat-num');
const statIo=new IntersectionObserver(entries=>entries.forEach(e=>{ if(e.isIntersecting){ animateCounter(e.target); statIo.unobserve(e.target); } }),{threshold:0.5});
statNums.forEach(el=>statIo.observe(el));

// Skill bars observer
const bars=document.querySelectorAll('.skill-bar-fill');
const barIo=new IntersectionObserver(entries=>entries.forEach(e=>{ if(e.isIntersecting){ e.target.style.width=e.target.dataset.width+'%'; barIo.unobserve(e.target); } }),{threshold:0.3});
bars.forEach(b=>barIo.observe(b));

/* ── 3D TILT ON CARDS ── */
document.querySelectorAll('.card-3d').forEach(card=>{
  card.addEventListener('mousemove',e=>{
    const rect=card.getBoundingClientRect();
    const x=(e.clientX-rect.left)/rect.width -0.5;
    const y=(e.clientY-rect.top)/rect.height -0.5;
    card.style.transform=`perspective(800px) rotateY(${x*12}deg) rotateX(${-y*10}deg) translateZ(8px)`;
  });
  card.addEventListener('mouseleave',()=>{ card.style.transform=''; });
});

/* ── CONTACT FORM (EmailJS) ── */
function handleForm(e){
  e.preventDefault();
  const btn = document.getElementById('form-submit');
  const originalText = btn.querySelector('span').textContent;
  btn.querySelector('span').textContent = 'Sending...';
  btn.disabled = true;

  // Send via EmailJS
  emailjs.sendForm('service_zyf7xtl', 'template_21pt1kt', e.target)
    .then(function() {
      btn.querySelector('span').textContent = 'Message Sent!';
      btn.style.background = 'linear-gradient(135deg,#2ecc71,#27ae60)';
      e.target.reset();
      setTimeout(function(){
        btn.querySelector('span').textContent = originalText;
        btn.style.background = '';
        btn.disabled = false;
      }, 4000);
    }, function(error) {
      btn.querySelector('span').textContent = 'Failed. Try again';
      btn.style.background = 'linear-gradient(135deg,#e53935,#c62828)';
      btn.disabled = false;
      console.error('EmailJS Error:', error);
      setTimeout(function(){
        btn.querySelector('span').textContent = originalText;
        btn.style.background = '';
      }, 4000);
    });
}

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const target=document.querySelector(a.getAttribute('href'));
    if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth',block:'start'}); }
  });
});

/* ── PAGE LOAD ANIMATION ── */
window.addEventListener('load',()=>{
  document.body.style.opacity='0';
  document.body.style.transition='opacity 0.6s ease';
  requestAnimationFrame(()=>{ document.body.style.opacity='1'; });
});

/* ── 3D AVATAR CLICK INTERACTION ── */
const avatarFrame = document.getElementById('avatar-frame');
const avatarSpeech = document.getElementById('avatar-speech-bubble');
const speechTextContent = document.getElementById('speech-text-content');

if (avatarFrame && avatarSpeech) {
  let isSpeechOpen = false;
  
  avatarFrame.addEventListener('click', (e) => {
    e.stopPropagation();
    isSpeechOpen = !isSpeechOpen;
    
    if (isSpeechOpen) {
      avatarSpeech.classList.add('active');
      // Create glowing shockwave pulse ring on frame
      const wave = document.createElement('div');
      wave.className = 'photo-glow-wave';
      wave.style.cssText = `
        position:absolute; inset:-10px; border-radius:50%;
        border:2px solid #00f3ff; pointer-events:none; z-index:3;
        box-shadow:0 0 30px #00f3ff, inset 0 0 20px var(--gold);
        animation: shockPulse 0.8s ease-out forwards;
      `;
      avatarFrame.appendChild(wave);
      setTimeout(() => wave.remove(), 800);
      
      // Auto-hide speech bubble after 5 seconds
      setTimeout(() => {
        if (isSpeechOpen) {
          avatarSpeech.classList.remove('active');
          isSpeechOpen = false;
        }
      }, 5000);
    } else {
      avatarSpeech.classList.remove('active');
    }
  });

  document.addEventListener('click', (e) => {
    if (isSpeechOpen && !avatarFrame.contains(e.target)) {
      avatarSpeech.classList.remove('active');
      isSpeechOpen = false;
    }
  });
}

// Keyframes for shockPulse injected dynamically if needed
const shockStyle = document.createElement('style');
shockStyle.textContent = `@keyframes shockPulse { 0%{transform:scale(0.9);opacity:1} 100%{transform:scale(1.35);opacity:0} }`;
document.head.appendChild(shockStyle);

/* ── HERO MATRIX PYTHON CODE & NEURAL NET CANVAS ── */
(function initHeroMatrixCanvas() {
  const canvas = document.getElementById('hero-matrix-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H;

  function resizeCanvas() {
    const parent = canvas.parentElement;
    W = canvas.width = parent.offsetWidth || window.innerWidth;
    H = canvas.height = parent.offsetHeight || window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Python Code Streams Data
  const pythonCodeSnippets = [
    "import torch.nn as nn",
    "from transformers import AutoModelForCausalLM",
    "def forward(self, x):",
    "  moe_out = self.gating_network(x)",
    "  return self.experts(moe_out)",
    "loss = F.cross_entropy(logits, targets)",
    "optimizer.zero_grad(); loss.backward()",
    "agent = AgenticRAG(model='llama3-70b')",
    "vector_db.similarity_search(query, k=5)",
    "qiskit.QuantumCircuit(qubits=4)",
    "psnr_val = 27.95 # DaAIR-mini MoE",
    "recall_rate = 91.0 # Threat Radar",
    "class MixtureOfExperts(nn.Module):",
    "FastAPI.post('/api/v1/predict')"
  ];

  // Floating Matrix Code Streams
  const codeStreams = [];
  const streamCount = 18;
  for (let i = 0; i < streamCount; i++) {
    codeStreams.push({
      x: (i / streamCount) * 1900 + Math.random() * 60,
      y: Math.random() * 1000,
      speed: Math.random() * 0.7 + 0.3,
      text: pythonCodeSnippets[i % pythonCodeSnippets.length],
      color: Math.random() > 0.45 ? 'rgba(0, 243, 255, ' : (Math.random() > 0.5 ? 'rgba(212, 175, 55, ' : 'rgba(168, 85, 247, '),
      opacity: Math.random() * 0.35 + 0.15,
      fontSize: Math.floor(Math.random() * 3) + 11
    });
  }

  // Neural Network 3D Nodes
  const neuralNodes = [];
  for (let i = 0; i < 45; i++) {
    neuralNodes.push({
      x: Math.random() * 1900,
      y: Math.random() * 1000,
      z: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2.5 + 1,
      color: Math.random() > 0.5 ? '#D4AF37' : (Math.random() > 0.5 ? '#00f3ff' : '#7EC8E3')
    });
  }

  let mouseX = 0, mouseY = 0;
  window.addEventListener('mousemove', e => {
    mouseX = (e.clientX - window.innerWidth / 2) * 0.03;
    mouseY = (e.clientY - window.innerHeight / 2) * 0.03;
  });

  function renderMatrix() {
    ctx.clearRect(0, 0, W, H);

    // 1. Render Floating Python Code Streams
    ctx.font = '500 12px "Fira Code", "Space Grotesk", monospace';
    codeStreams.forEach(s => {
      s.y += s.speed;
      if (s.y > H + 40) {
        s.y = -30;
        s.x = Math.random() * W;
      }
      ctx.fillStyle = s.color + s.opacity + ')';
      ctx.fillText(s.text, s.x + mouseX * 0.5, s.y + mouseY * 0.5);
    });

    // 2. Render Neural Network Connections & Nodes
    for (let i = 0; i < neuralNodes.length; i++) {
      const n1 = neuralNodes[i];
      n1.x += n1.vx;
      n1.y += n1.vy;
      if (n1.x < 0 || n1.x > W) n1.vx *= -1;
      if (n1.y < 0 || n1.y > H) n1.vy *= -1;

      // Draw Node
      ctx.beginPath();
      ctx.arc(n1.x + mouseX * n1.z, n1.y + mouseY * n1.z, n1.r * n1.z, 0, Math.PI * 2);
      ctx.fillStyle = n1.color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = n1.color;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw Neural Connections
      for (let j = i + 1; j < neuralNodes.length; j++) {
        const n2 = neuralNodes[j];
        const dx = (n1.x + mouseX * n1.z) - (n2.x + mouseX * n2.z);
        const dy = (n1.y + mouseY * n1.z) - (n2.y + mouseY * n2.z);
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 140) {
          ctx.beginPath();
          ctx.moveTo(n1.x + mouseX * n1.z, n1.y + mouseY * n1.z);
          ctx.lineTo(n2.x + mouseX * n2.z, n2.y + mouseY * n2.z);
          const alpha = (1 - dist / 140) * 0.25;
          ctx.strokeStyle = n1.color === '#00f3ff' ? `rgba(0, 243, 255, ${alpha})` : `rgba(212, 175, 55, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(renderMatrix);
  }
  renderMatrix();
})();

/* ── CONTINUOUS IMMERSIVE HERO ZOOM DIVE ── */
window.addEventListener('scroll', () => {
  const hero = document.getElementById('hero');
  const avatarVisual = document.querySelector('.hero-visual');
  if (!hero || !avatarVisual) return;

  const scrollPos = window.scrollY;
  const heroHeight = hero.offsetHeight;

  if (scrollPos <= heroHeight) {
    const progress = scrollPos / heroHeight;
    // Continuous 3D depth zoom effect towards avatar
    const scaleVal = 1 + progress * 0.35;
    const translateZVal = progress * 120;
    avatarVisual.style.transform = `scale(${scaleVal}) translateZ(${translateZVal}px)`;
    avatarVisual.style.opacity = 1 - progress * 0.7;
  }
});

