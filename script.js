/* ----------------------------------------------------------------
   DÉTECTION DE LA PAGE COURANTE (multipage)
---------------------------------------------------------------- */
const PAGE_IDS = ['accueil', 'galerie', 'ateliers', 'apropos', 'contact'];
const currentPage = PAGE_IDS.find(id => document.getElementById('page-' + id));

/* ----------------------------------------------------------------
   NAVBAR (transparente sur accueil, solide ailleurs)
---------------------------------------------------------------- */
(function setupNavbar() {
  const nb = document.getElementById('navbar');
  if (!nb) return;
  if (currentPage !== 'accueil') {
    nb.classList.add('solid');
  }
})();

window.addEventListener('scroll', () => {
  const nb = document.getElementById('navbar');
  if (!nb || currentPage !== 'accueil') return;
  nb.classList.toggle('scrolled', window.scrollY > 80);
});

/* Fallback pour d'éventuels onclick="showPage('X')" restants */
function showPage(name) {
  const map = { accueil:'/', galerie:'/galerie.html', ateliers:'/prestations.html',
                apropos:'/apropos.html', contact:'/contact.html' };
  location.href = map[name] || '/';
}

/* ----------------------------------------------------------------
   CARROUSEL ACCUEIL (initialisé seulement si présent)
---------------------------------------------------------------- */
let curSlide = 0;
let nSlides  = 0;
const slidesEl = document.getElementById('temo-slides');
const dotsWrap = document.getElementById('carousel-dots');
if (slidesEl && dotsWrap) {
  nSlides = document.querySelectorAll('#temo-slides .temo-slide').length;
  for (let i = 0; i < nSlides; i++) {
    const d = document.createElement('div');
    d.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    d.addEventListener('click', () => goToSlide(i));
    dotsWrap.appendChild(d);
  }
  setInterval(() => moveCarousel(1), 6000);
}
function goToSlide(n) {
  if (!slidesEl || !nSlides) return;
  curSlide = (n + nSlides) % nSlides;
  slidesEl.style.transform = `translateX(-${curSlide * 100}%)`;
  document.querySelectorAll('#carousel-dots .carousel-dot')
    .forEach((d, i) => d.classList.toggle('active', i === curSlide));
}
function moveCarousel(dir) { goToSlide(curSlide + dir); }

/* ----------------------------------------------------------------
   CARROUSEL ATELIERS
---------------------------------------------------------------- */
let curSlideA = 0;
let nSlidesA  = 0;
function initCarouselAteliers() {
  const slidesA = document.getElementById('temo-slides-ateliers');
  const dotsA   = document.getElementById('carousel-dots-ateliers');
  if (!slidesA || dotsA.children.length > 0) return;
  nSlidesA = slidesA.querySelectorAll('.temo-slide').length;
  for (let i = 0; i < nSlidesA; i++) {
    const d = document.createElement('div');
    d.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    d.addEventListener('click', () => goToSlideA(i));
    dotsA.appendChild(d);
  }
}
function goToSlideA(n) {
  curSlideA = (n + nSlidesA) % nSlidesA;
  const s = document.getElementById('temo-slides-ateliers');
  if (s) s.style.transform = `translateX(-${curSlideA * 100}%)`;
  document.querySelectorAll('#carousel-dots-ateliers .carousel-dot')
    .forEach((d, i) => d.classList.toggle('active', i === curSlideA));
}
function moveCarouselAteliers(dir) { goToSlideA(curSlideA + dir); }

/* ----------------------------------------------------------------
   GALERIE — FILTRES
---------------------------------------------------------------- */
function filtrerGalerie(cat) {
  document.querySelectorAll('.filtre-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.filtre === cat);
  });
  document.querySelectorAll('.galerie-item').forEach(item => {
    if (cat === 'tout' || item.dataset.cat === cat) {
      item.classList.remove('hidden');
    } else {
      item.classList.add('hidden');
    }
  });
}

/* ----------------------------------------------------------------
   LIGHTBOX
---------------------------------------------------------------- */
const lbPhClasses = [];
const lbCaptions  = [
  'Fresque participative · Centre de loisir d\'Argonay (74)',
  'Fresque participative · Centre de loisir d\'Argonay (74)',
  'Fresque participative · Centre de loisir d\'Argonay (74)',
  'Fresque à 4 mains · L\'atelier d\'Anaïs, Annecy (74)',
  'Fresque à 4 mains · L\'atelier d\'Anaïs, Annecy (74)',
  'Fresque participative · École buissonnière, Die (26)',
  'Fresque participative · École buissonnière, Die (26)',
  'Fresque participative · École buissonnière, Die (26)',
  'Fresque participative · École buissonnière, Die (26)',
  'Pédiatrie · CHU Annecy-Genevois (74)',
  'Pédiatrie · CHU Annecy-Genevois (74)',
  'Pédiatrie · CHU Annecy-Genevois (74)',
  'Pédiatrie · CHU Annecy-Genevois (74)',
  'Pédiatrie · CHU Annecy-Genevois (74)',
  'Pédiatrie · CHU Annecy-Genevois (74)',
  'Pédiatrie · CHU Annecy-Genevois (74)',
  'Pédiatrie · HCE Grenoble (38)',
  'Pédiatrie · HCE Grenoble (38)',
  'Pédiatrie · HCE Grenoble (38)',
  'Pédiatrie · HCE Grenoble (38)',
  'Pédiatrie · HCE Grenoble (38)',
  'Pédiatrie · HCE Grenoble (38)',
  'Pédiatrie · HCE Grenoble (38)',
  'Pédiatrie · HCE Grenoble (38)',
  'Pédiatrie · HCE Grenoble (38)',
  'Pédiatrie · HCE Grenoble (38)',
  'Pédiatrie · HCE Grenoble (38)',
  'Pédiatrie · HCE Grenoble (38)',
  'Pédiatrie · HCE Grenoble (38)',
  'Pédiatrie · HCE Grenoble (38)',
  'Pédiatrie · HCE Grenoble (38)',
  'Pédiatrie · HCE Grenoble (38)',
  'Pédiatrie · HCE Grenoble (38)',
  'Pédiatrie · HCE Grenoble (38)',
  'Pédiatrie · HCE Grenoble (38)',
  'Pédiatrie · HCE Grenoble (38)',
  'Pédiatrie · HCE Grenoble (38)',
  'Pédiatrie · HCE Grenoble (38)',
  'Pédiatrie · HCE Grenoble (38)',
  'Pédiatrie · HCE Grenoble (38)',
  'CHI de Cavaillon-Lauris (84)',
  'CHI de Cavaillon-Lauris (84)',
  'Le balcon de Mireille (38)',
  'La grande chambre de Pierre et Elisabeth (38)',
  'La salle de bain de Hugues et Geneviève (38)',
  'La salle de bain de Hugues et Geneviève (38)',
  'La salle de bain de Hugues et Geneviève (38)',
  'La chambre des petits enfants (38)',
  'Pédiatrie · CHU Annecy-Genevois (74)',
  'Pédiatrie · CHU Annecy-Genevois (74)',
  'Pédiatrie · CHU Annecy-Genevois (74)',
  'Pédiatrie · CHU Annecy-Genevois (74)',
  'Néonatologie · HCE Grenoble (38)',
  'Néonatologie · HCE Grenoble (38)',
  'Néonatologie · HCE Grenoble (38)',
  'Néonatologie · HCE Grenoble (38)',
  'Maison de parents · Fondation Ronald MacDonald (38)',
  'Maison de parents · Fondation Ronald MacDonald (38)',
  'Crèche Éveil et Nous (26)',
  'Crèche Éveil et Nous (26)',
  'Crèche Éveil et Nous (26)',
  'Maternité · CHI de Cavaillon (84)',
  'Consultations SF · CHI de Cavaillon (84)',
  'HDJ · HCE Grenoble (38)',
  'HDJ · HCE Grenoble (38)',
  'HDJ · HCE Grenoble (38)',
  'HDJ · HCE Grenoble (38)',
  'HDJ · HCE Grenoble (38)',
  'HDJ · HCE Grenoble (38)',
  'HDJ · HCE Grenoble (38)',
  'Consultations externes · HCE Grenoble (38)',
  'Consultations externes · HCE Grenoble (38)',
  'Consultations externes · HCE Grenoble (38)',
  'Consultations externes · HCE Grenoble (38)',
  'Consultations externes · HCE Grenoble (38)',
  'Consultations externes · HCE Grenoble (38)',
  'Maternité · CHI de Cavaillon-Lauris (84)',
  'Maternité · CHI de Cavaillon-Lauris (84)',
  'Maternité · CHI de Cavaillon-Lauris (84)',
  'Salle de soin · Hôpital Drôme-Nord (38)',
  'Portes à messages · IHO Grenoble (38)',
  'Portes à messages · IHO Grenoble (38)',
  'Cabinet des pédiatres · Cavaillon (84)',
  'Cabinet des pédiatres · Cavaillon (84)',
  'Cabinet des pédiatres · Cavaillon (84)',
  'Urgences gynécologiques · CHI de Cavaillon-Lauris (84)',
  'Salle de réunion · CHI de Cavaillon-Lauris (84)',
  'Salle de réunion · CHI de Cavaillon-Lauris (84)',
  'Salle de réunion · CHI de Cavaillon-Lauris (84)',
  'Salle d\'annonces · Néonatologie Grenoble (38)',
  'Salle de réveil chirurgie · Annecy (74)',
  'Salle de réveil chirurgie · Annecy (74)',
  'Entrée du bloc opératoire (38)',
  'Salle des repas · École Terre d\'Enfances (26)',
  'Salle des repas · École Terre d\'Enfances (26)',
  'Dalles plafond salle de soin (38)',
  'Dalles plafond salle de soin (38)',
  'Salle de repos des parents · Grenoble (38)',
  'Consultation de transition · Pédiatrie Grenoble (38)',
  'Bureau soignants · Maternité de Cavaillon (84)',
  'Bureau soignants · Maternité de Cavaillon (84)',
  'Accueil consultations · CHI de Cavaillon (84)',
  'Accueil consultations · CHI de Cavaillon (84)',
  'Chambre gynécologie · CHI de Cavaillon (84)',
  'Fenêtre en trompe l\'œil · Salle d\'échographie Cavaillon (84)',
  'Fenêtre en trompe l\'œil · Salle d\'échographie Cavaillon (84)'
];
let lbIndex = 0;
let lbVisible = [];

function openLightbox(idx) {
  lbVisible = Array.from(document.querySelectorAll('.galerie-item:not(.hidden)'));
  lbIndex   = lbVisible.findIndex(el => +el.dataset.index === idx);
  if (lbIndex < 0) lbIndex = 0;
  renderLightbox();
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function renderLightbox() {
  const item    = lbVisible[lbIndex];
  const origIdx = +item.dataset.index;
  const img     = document.getElementById('lb-img');
  const srcImg  = item.querySelector('img');
  img.className = '';
  img.style.cssText = 'width:100%;height:100%;object-fit:contain;';
  if (srcImg) img.style.backgroundImage = 'none';
  img.innerHTML = srcImg ? `<img src="${srcImg.src}" style="max-width:100%;max-height:80vh;object-fit:contain;" />` : '';
  document.getElementById('lb-caption').textContent = lbCaptions[origIdx] || '';
}
function moveLightbox(dir) {
  lbIndex = (lbIndex + dir + lbVisible.length) % lbVisible.length;
  renderLightbox();
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}
document.getElementById('lightbox').addEventListener('click', function(e) {
  if (e.target === this) closeLightbox();
});
document.addEventListener('keydown', e => {
  if (!document.getElementById('lightbox').classList.contains('open')) return;
  if (e.key === 'ArrowLeft')  moveLightbox(-1);
  if (e.key === 'ArrowRight') moveLightbox(1);
  if (e.key === 'Escape')     closeLightbox();
});

/* ----------------------------------------------------------------
   CONTACT — SOUS-NAV SCROLL
---------------------------------------------------------------- */
function scrollToContact(section) {
  const el = document.getElementById(section);
  if (el) el.scrollIntoView({ behavior:'smooth', block:'start' });
  // Mise à jour visuelle du bouton actif
  document.querySelectorAll('#page-contact .apropos-subnav-btn').forEach(b => {
    b.classList.remove('active');
  });
  const btn = Array.from(document.querySelectorAll('#page-contact .apropos-subnav-btn'))
    .find(b => b.getAttribute('onclick')?.includes(`'${section}'`));
  if (btn) btn.classList.add('active');
}

/* ----------------------------------------------------------------
   PRESTATIONS — SOUS-NAV SCROLL (mobile)
---------------------------------------------------------------- */
function scrollToPrestation(section) {
  // Si on n'est pas sur la page prestations, on y va avec le hash
  if (currentPage !== 'ateliers') {
    location.href = '/prestations.html#presta-' + section;
    return;
  }
  const el = document.getElementById('presta-' + section);
  if (el) {
    const navH = document.getElementById('navbar')?.offsetHeight || 80;
    const y = el.getBoundingClientRect().top + window.scrollY - navH;
    window.scrollTo({ top:y, behavior:'smooth' });
  }
  document.querySelectorAll('.prestations-subnav-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.presta === section);
  });
  history.replaceState(null, '', '#presta-' + section);
}

/* ----------------------------------------------------------------
   À PROPOS — SOUS-NAV SCROLL
---------------------------------------------------------------- */
function scrollToApropos(section) {
  // Si on n'est pas sur la page apropos, on y va avec le hash
  if (currentPage !== 'apropos') {
    location.href = '/apropos.html#apropos-' + section;
    return;
  }
  const el = document.getElementById('apropos-' + section);
  if (el) {
    // Hauteur réelle de la navbar + sous-menu pour offset précis
    const navH    = document.getElementById('navbar')?.offsetHeight || 80;
    const subnavH = document.querySelector('.apropos-subnav')?.offsetHeight || 0;
    const offset  = navH + subnavH;
    const y = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top:y, behavior:'smooth' });
  }
  document.querySelectorAll('.apropos-subnav-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.apropos === section);
  });
  history.replaceState(null, '', '#apropos-' + section);
}

/* ----------------------------------------------------------------
   Livre d'or — CARROUSEL
---------------------------------------------------------------- */
let curLo  = 0;
const loSlides = document.getElementById('lo-slides');
const loDots   = document.getElementById('lo-dots');
const loCards  = loSlides ? Array.from(loSlides.querySelectorAll('.lo-cf')) : [];
const nLo      = loCards.length;

for (let i = 0; i < nLo; i++) {
  const d = document.createElement('div');
  d.className = 'carousel-dot' + (i === 0 ? ' active' : '');
  d.addEventListener('click', () => goToLo(i));
  loDots.appendChild(d);
}

function updateLoCards() {
  const centerX = loSlides.offsetWidth / 2;
  const cardW   = 340;
  const gap     = 60;
  loCards.forEach((card, i) => {
    let offset = i - ((curLo % nLo) + nLo) % nLo;
    if (offset > nLo / 2)  offset -= nLo;
    if (offset < -nLo / 2) offset += nLo;
    const absOff = Math.abs(offset);
    const x      = centerX - cardW / 2 + offset * (cardW * 0.55 + gap);
    let scale, opacity, blur, zIndex, rotateY;
    if (offset === 0) {
      scale   = 1;   opacity = 1;    blur = 0; zIndex = 10; rotateY = 0;
    } else if (absOff === 1) {
      scale   = 0.82; opacity = 0.7;  blur = 1; zIndex = 8;  rotateY = offset > 0 ? -18 : 18;
    } else if (absOff === 2) {
      scale   = 0.66; opacity = 0.45; blur = 2; zIndex = 6;  rotateY = offset > 0 ? -28 : 28;
    } else {
      scale   = 0.52; opacity = 0.2;  blur = 3; zIndex = 4;  rotateY = offset > 0 ? -35 : 35;
    }
    card.style.left      = x + 'px';
    card.style.top       = '50%';
    card.style.transform = `translateY(-50%) scale(${scale}) perspective(800px) rotateY(${rotateY}deg)`;
    card.style.opacity   = opacity;
    card.style.filter    = blur > 0 ? `blur(${blur}px) brightness(0.85)` : 'none';
    card.style.zIndex    = zIndex;
    card.style.boxShadow = offset === 0 ? '0 20px 60px rgba(0,0,0,0.35)' : 'none';
  });
}

function goToLo(n) {
  curLo = n;
  const realIdx = ((curLo % nLo) + nLo) % nLo;
  document.querySelectorAll('#lo-dots .carousel-dot')
    .forEach((d, i) => d.classList.toggle('active', i === realIdx));
  updateLoCards();
}

function moveLo(dir) { goToLo(curLo + dir); }

window.addEventListener('resize', updateLoCards);
setTimeout(updateLoCards, 100);

/* Auto-rotation uniquement en desktop (>= 992px) */
let loInterval = null;
function setupLoAutoRotation() {
  const isMobile = window.innerWidth < 992;
  if (isMobile && loInterval) {
    clearInterval(loInterval); loInterval = null;
  } else if (!isMobile && !loInterval) {
    loInterval = setInterval(() => moveLo(1), 12000);
  }
}
setupLoAutoRotation();
window.addEventListener('resize', setupLoAutoRotation);

/* Swipe tactile pour changer de carte sur mobile */
if (loSlides) {
  let touchStartX = 0, touchEndX = 0;
  loSlides.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, {passive:true});
  loSlides.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 40) {
      moveLo(diff < 0 ? 1 : -1);
    }
  }, {passive:true});
}

/* ----------------------------------------------------------------
   Livre d'or
---------------------------------------------------------------- */
async function submitLivreOr() {
  const nom     = document.getElementById('lo-nom').value.trim();
  const ville   = document.getElementById('lo-ville').value.trim();
  const msg     = document.getElementById('lo-msg').value.trim();
  const consent = document.getElementById('lo-consent')?.checked;
  if (!nom || !msg) { alert('Merci de renseigner votre nom et votre message.'); return; }
  if (!consent) { alert("Merci de cocher la case d'autorisation pour envoyer votre message."); return; }
  try {
    const res = await fetch('https://formspree.io/f/xbdpzkww', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ name: nom, ville: ville, email: document.getElementById('lo-email').value.trim(), message: msg })
    });
    if (res.ok) {
      alert('Merci ' + nom + ' ! Votre message sera publié après modération.');
      document.getElementById('lo-nom').value   = '';
      document.getElementById('lo-ville').value = '';
      document.getElementById('lo-msg').value   = '';
    } else {
      alert('Une erreur est survenue. Merci de réessayer.');
    }
  } catch(e) {
    alert('Une erreur est survenue. Merci de réessayer.');
  }
}

/* ----------------------------------------------------------------
   CONTACT
---------------------------------------------------------------- */
async function submitContact() {
  const nom     = document.getElementById('ct-nom').value.trim();
  const email   = document.getElementById('ct-email').value.trim();
  const msg     = document.getElementById('ct-msg').value.trim();
  const consent = document.getElementById('ct-consent')?.checked;
  if (!nom || !msg) { alert('Merci de renseigner votre nom et votre message.'); return; }
  if (!consent) { alert("Merci de cocher la case d'autorisation pour envoyer votre message."); return; }
  try {
    const res = await fetch('https://formspree.io/f/xaqlbqrk', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ name: nom, email: email, message: msg })
    });
    if (res.ok) {
      alert('Merci ' + nom + ' ! Votre message a bien été envoyé.');
      document.getElementById('ct-nom').value   = '';
      document.getElementById('ct-email').value = '';
      document.getElementById('ct-msg').value   = '';
    } else {
      alert('Une erreur est survenue. Merci de réessayer ou d\'écrire directement à rosamee@lamaisonroz.fr');
    }
  } catch(e) {
    alert('Une erreur est survenue. Merci de réessayer ou d\'écrire directement à rosamee@lamaisonroz.fr');
  }
}

function loPhotoSelected(input) {
  const label = document.getElementById('lo-photo-label');
  const loader = document.getElementById('lo-photo-loader');
  if (input.files && input.files[0]) {
    loader.style.display = 'block';
    label.textContent = input.files[0].name;
    setTimeout(() => { loader.style.display = 'none'; }, 1200);
  }
}

function toggleMobileMenu() {
  const btn   = document.getElementById('nav-hamburger');
  const links = document.getElementById('nav-links');
  btn.classList.toggle('open');
  links.classList.toggle('open');
}

function closeMobileMenu() {
  const btn   = document.getElementById('nav-hamburger');
  const links = document.getElementById('nav-links');
  btn.classList.remove('open');
  links.classList.remove('open');
}

/* ----------------------------------------------------------------
   ANIMATIONS SCROLL (reveal)
---------------------------------------------------------------- */
function initReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => {
    el.classList.remove('visible');
    observer.observe(el);
  });
}
initReveal();

/* ----------------------------------------------------------------
   HERO SOUS-TITRE — masquer les points si les GN se superposent
---------------------------------------------------------------- */
function updateHeroSeps() {
  const items = document.querySelectorAll('.hero-sub-item');
  const seps  = document.querySelectorAll('.hero-sub-sep');
  if (items.length < 2) return;
  // Remettre en inline pour mesurer l'état naturel
  items.forEach(item => { item.style.display = 'inline'; item.style.marginBottom = ''; });
  seps.forEach(sep => sep.style.display = 'inline');
  // Forcer reflow
  void items[0].getBoundingClientRect();
  const tops = Array.from(items).map(el => Math.round(el.getBoundingClientRect().top));
  const allOneLine = tops.every(t => t === tops[0]);
  if (allOneLine) {
    // Tous sur une ligne : afficher les points, laisser inline
    items.forEach(item => item.style.display = '');
    seps.forEach(sep => sep.style.display = '');
  } else {
    // Wrapping : forcer chaque GN sur sa propre ligne, cacher les points
    items.forEach(item => { item.style.display = 'block'; item.style.marginBottom = '6px'; });
    seps.forEach(sep => sep.style.display = 'none');
  }
}
window.addEventListener('resize', updateHeroSeps);
window.addEventListener('load', function() {
  updateHeroSeps();
  setTimeout(updateHeroSeps, 300);
});
if (document.fonts) document.fonts.ready.then(updateHeroSeps);

/* ----------------------------------------------------------------
   PROTECTION IMAGES (dissuasion clic droit + glisser-déposer)
---------------------------------------------------------------- */
document.addEventListener('contextmenu', function(e) {
  if (e.target.tagName === 'IMG') e.preventDefault();
});
document.addEventListener('dragstart', function(e) {
  if (e.target.tagName === 'IMG') e.preventDefault();
});

/* ----------------------------------------------------------------
   INITIALISATIONS PAR PAGE (multipage)
---------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', function() {
  // Galerie : filtre depuis ?filter=X dans l'URL
  if (currentPage === 'galerie') {
    const params = new URLSearchParams(location.search);
    const f = params.get('filter');
    if (f) filtrerGalerie(f);
  }
  // Prestations : init carrousel + scroll vers hash et activation bouton
  if (currentPage === 'ateliers') {
    initCarouselAteliers();
    if (location.hash.startsWith('#presta-')) {
      const section = location.hash.replace('#presta-', '');
      setTimeout(() => scrollToPrestation(section), 100);
    }
  }
  // À propos : scroll vers hash et activation bouton (multiple essais pour gérer images/polices)
  if (currentPage === 'apropos' && location.hash.startsWith('#apropos-')) {
    const section = location.hash.replace('#apropos-', '');
    const doScroll = () => scrollToApropos(section);
    // Désactiver le scroll natif du navigateur en effaçant le hash temporairement
    history.replaceState(null, '', location.pathname);
    window.scrollTo(0, 0);
    // Plusieurs tentatives : 100ms, 400ms, après load complet
    setTimeout(doScroll, 100);
    setTimeout(doScroll, 400);
    window.addEventListener('load', () => setTimeout(doScroll, 100));
  }
});
