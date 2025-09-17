// -------------------- Fade-in on scroll + staggered card animations --------------------
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.querySelectorAll('.card').forEach((c,i)=>{
        setTimeout(()=>c.classList.add('visible'), i*150);
      });
      entry.target.classList.add('visible');
      entry.target.classList.remove('hidden');
    }
  });
},{ threshold:0.2 });

sections.forEach(section => section.classList.add('hidden'));
sections.forEach(section => observer.observe(section));

// -------------------- Projects dynamic population --------------------
const projects = [
  {name:"Studio Setup", desc:"Complete music & recording studio."},
  {name:"Track XYZ", desc:"Latest electronic track production."},
  {name:"Visuals Tool", desc:"Interactive visuals for live shows."},
  {name:"Portfolio Site", desc:"This very site, coded from scratch!"}
];

const projectsGrid = document.getElementById("projectsGrid");
projects.forEach(p => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `<h3>${p.name}</h3><p>${p.desc}</p>`;
  projectsGrid.appendChild(card);
});

// -------------------- Music carousel --------------------
const tracks = ["Track 1","Track 2","Track 3","Track 4","Track 5"];
const carouselTrack = document.getElementById("musicCarousel");
tracks.forEach(t => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.textContent = t;
  carouselTrack.appendChild(card);
});

let offset = 0;
const trackWidth = 210; // card width + gap
const visibleCards = 3; // how many cards are visible

const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

prevBtn.onclick = () => {
  offset = Math.min(offset + trackWidth, 0);
  carouselTrack.style.transform = `translateX(${offset}px)`;
};

nextBtn.onclick = () => {
  const maxOffset = -(trackWidth * (tracks.length - visibleCards));
  offset = Math.max(offset - trackWidth, maxOffset);
  carouselTrack.style.transform = `translateX(${offset}px)`;
};

// Auto-advance carousel every 5s
setInterval(()=>nextBtn.click(),5000);

// -------------------- Live stream status --------------------
const liveStatus = document.getElementById("liveStatus");
fetch("http://raspberrypi:8080/?action=stream", {method:"HEAD"})
.then(r => {
  if(r.ok) liveStatus.textContent = "✅ Studio Live Online";
  else throw "Offline";
})
.catch(() => liveStatus.textContent="❌ Stream Offline")
.finally(()=>{
  if(liveStatus.textContent.includes("Offline")) liveStatus.classList.add("live-off");
});

// -------------------- Navbar highlight on scroll + background effect --------------------
const navLinks = document.querySelectorAll('.navbar a');
const sectionsArr = Array.from(sections);

window.addEventListener('scroll', ()=>{
  let scrollPos = window.scrollY + window.innerHeight/3;
  sectionsArr.forEach((sec,i)=>{
    if(scrollPos > sec.offsetTop){
      navLinks.forEach(link => link.classList.remove('active'));
      navLinks[i].classList.add('active');
    }
  });

  // Navbar background fade
  const navbar = document.querySelector('.navbar');
  if(window.scrollY > 50) navbar.style.background = 'rgba(17,17,17,0.95)';
  else navbar.style.background = 'rgba(17,17,17,0.9)';
});
