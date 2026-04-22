/* ----------------------------------------------------------------
   DÉTECTION DE LA PAGE COURANTE (multipage)
---------------------------------------------------------------- */
const PAGE_IDS = ['accueil', 'galerie', 'ateliers', 'apropos', 'contact', 'admin'];
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
                apropos:'/apropos.html', contact:'/contact.html', admin:'/admin.html' };
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
   ADMIN — TOKEN
---------------------------------------------------------------- */
function saveToken() {
  const token = document.getElementById('admin-token-input').value.trim();
  if (!token) {
    document.getElementById('token-status').textContent = '✗ Token vide';
    return;
  }
  localStorage.setItem('lmr_token', token);
  document.getElementById('token-status').textContent = '✓ Token enregistré !';
  document.getElementById('admin-token-input').value = '';
  setTimeout(() => {
    document.getElementById('token-status').textContent = '';
  }, 3000);
}

// Au chargement, vérifier si un token est déjà enregistré
window.addEventListener('load', () => {
  const saved = localStorage.getItem('lmr_token');
  const status = document.getElementById('token-status');
  if (status) {
    status.textContent = saved ? '✓ Token déjà enregistré' : '⚠ Token non configuré';
  }
});

/* ----------------------------------------------------------------
   ADMIN — CONFIG
---------------------------------------------------------------- */
const GITHUB_TOKEN  = localStorage.getItem('lmr_token') || '';
const GITHUB_REPO   = 'Hyppolene-LaMaisonRoz/lamaisonroz';
const GITHUB_BRANCH = 'main';
const ADMIN_USER    = 'Hyppolène!La!Maison!Roz!';
const ADMIN_PASS    = '=TireLaBobinetteEtLaChevilletteCHerra!La!Maison!Roz!123';

/* ----------------------------------------------------------------
   ADMIN — LOGIN
---------------------------------------------------------------- */
function goAdmin() {
  const user = document.getElementById('modal-user').value.trim();
  const pass = document.getElementById('modal-pass').value.trim();
  if (user !== ADMIN_USER || pass !== ADMIN_PASS) {
    document.getElementById('modal-error').style.display = 'block';
    return;
  }
  document.getElementById('modal-error').style.display = 'none';
  document.getElementById('modal-admin').classList.remove('open');
  showPage('admin');
}

/* ----------------------------------------------------------------
   ADMIN — PANELS
---------------------------------------------------------------- */
function showAdminPanel(name) {
  document.querySelectorAll('.admin-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
  document.getElementById('admin-panel-' + name).classList.add('active');
  event.target.classList.add('active');
}

/* ----------------------------------------------------------------
   ADMIN — GITHUB API
---------------------------------------------------------------- */
async function githubGetFile(path) {
  const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${path}?ref=${GITHUB_BRANCH}`, {
    headers: { 'Authorization': `token ${GITHUB_TOKEN}`, 'Accept': 'application/vnd.github.v3+json' }
  });
  return res.json();
}

async function githubUploadFile(path, content, message, sha = null) {
  const body = {
    message,
    content: btoa(unescape(encodeURIComponent(content))),
    branch: GITHUB_BRANCH
  };
  if (sha) body.sha = sha;
  const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${path}`, {
    method: 'PUT',
    headers: {
      'Authorization': `token ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  return res.json();
}

async function githubUploadImage(path, file, message) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onprogress = (e) => {
      if (e.lengthComputable) {
        const pct = Math.round((e.loaded / e.total) * 40);
        showUploadProgress(pct, 'Lecture du fichier…');
      }
    };

    reader.onload = async () => {
      showUploadProgress(40, 'Vérification…');
      const base64 = reader.result.split(',')[1];

      let sha = null;
      try {
        const existing = await githubGetFile(path);
        if (existing.sha) sha = existing.sha;
      } catch(e) {}

      showUploadProgress(55, 'Envoi vers GitHub…');

      const body = { message, content: base64, branch: GITHUB_BRANCH };
      if (sha) body.sha = sha;

      const xhr = new XMLHttpRequest();
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const pct = 55 + Math.round((e.loaded / e.total) * 40);
          showUploadProgress(pct, 'Envoi en cours…');
        }
      };
      xhr.onload = () => {
        showUploadProgress(100, '✓ Upload terminé !');
        setTimeout(hideUploadProgress, 2000);
        resolve(JSON.parse(xhr.responseText));
      };
      xhr.onerror = () => {
        hideUploadProgress();
        reject(new Error('Erreur réseau'));
      };
      xhr.open('PUT', `https://api.github.com/repos/${GITHUB_REPO}/contents/${path}`);
      xhr.setRequestHeader('Authorization', `token ${GITHUB_TOKEN}`);
      xhr.setRequestHeader('Accept', 'application/vnd.github.v3+json');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify(body));
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function showUploadProgress(pct, label) {
  let wrap = document.getElementById('upload-progress-global');
  if (!wrap) {
    wrap = document.createElement('div');
    wrap.id = 'upload-progress-global';
    wrap.className = 'upload-progress-wrap';
    wrap.style.cssText = 'position:fixed;bottom:32px;right:32px;background:var(--blanc);padding:20px 28px;box-shadow:0 8px 32px rgba(0,0,0,0.15);z-index:5000;min-width:280px;display:block;';
    wrap.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
        <span id="upload-progress-label" style="font-family:var(--serif);font-size:13px;color:var(--bleu);">Upload…</span>
        <span id="upload-progress-pct" class="upload-progress-pct">0%</span>
      </div>
      <div class="upload-progress-bar-bg">
        <div id="upload-progress-bar" class="upload-progress-bar"></div>
      </div>
    `;
    document.body.appendChild(wrap);
  }
  wrap.style.display = 'block';
  document.getElementById('upload-progress-label').textContent = label;
  document.getElementById('upload-progress-pct').textContent   = pct + '%';
  document.getElementById('upload-progress-bar').style.width   = pct + '%';
}

function hideUploadProgress() {
  const wrap = document.getElementById('upload-progress-global');
  if (wrap) wrap.style.display = 'none';
}

async function saveIndexToGithub() {
  adminStatus('Sauvegarde en cours…', 'pending');
  try {
    const html    = document.documentElement.outerHTML;
    const current = await githubGetFile('index.html');
    await githubUploadFile('index.html', html, 'Mise à jour via espace artiste', current.sha);
    adminStatus('✓ Sauvegardé sur GitHub !', 'ok');
  } catch(e) {
    adminStatus('✗ Erreur de sauvegarde : ' + e.message, 'error');
  }
}

function adminStatus(msg, type) {
  const el = document.getElementById('admin-status');
  if (!el) return;
  el.textContent = msg;
  el.style.color = type === 'ok' ? 'var(--vert)' : type === 'error' ? '#e74c3c' : 'var(--ocre)';
  el.style.display = 'block';
}

/* ----------------------------------------------------------------
   ADMIN — TEXTES ACCUEIL
---------------------------------------------------------------- */
function applyAdminAccueil() {
  const sub  = document.getElementById('admin-hero-sub').value;
  const atxt = document.getElementById('admin-ateliers-txt').value;
  const apxt = document.getElementById('admin-apropos-txt').value;
  const heroSub = document.querySelector('.hero-sub');
  if (heroSub) heroSub.innerHTML = sub;
  const atelierP = document.querySelector('#ateliers-home .section-text p');
  if (atelierP) atelierP.textContent = atxt;
  const aproposP = document.querySelector('#apropos-home .section-text p');
  if (aproposP) aproposP.textContent = apxt;
  adminStatus('✓ Textes appliqués — cliquez sur Sauvegarder pour publier', 'ok');
}

/* ----------------------------------------------------------------
   ADMIN — GALERIE
---------------------------------------------------------------- */
async function adminAjouterProjet() {
  const titre = document.getElementById('admin-proj-titre').value.trim();
  const cat   = document.getElementById('admin-proj-cat').value;
  const lieu  = document.getElementById('admin-proj-lieu').value.trim();
  const desc  = document.getElementById('admin-proj-desc').value.trim();
  const file  = document.getElementById('admin-photos').files[0];
  if (!titre || !file) { adminStatus('✗ Titre et photo obligatoires', 'error'); return; }
  adminStatus('Upload de la photo…', 'pending');
  const ext      = file.name.split('.').pop();
  const filename = `images/galerie/${Date.now()}.${ext}`;
  const uploaded = await githubUploadImage(filename, file, `Ajout projet : ${titre}`);
  const imgUrl   = `https://raw.githubusercontent.com/${GITHUB_REPO}/${GITHUB_BRANCH}/${filename}`;
  const grid  = document.getElementById('galerie-grid');
  const idx   = grid.querySelectorAll('.galerie-item').length;
  const item  = document.createElement('div');
  item.className = 'galerie-item';
  item.dataset.cat   = cat;
  item.dataset.index = idx;
  item.onclick = () => openLightbox(idx);
  item.innerHTML = `
    <img src="${imgUrl}" style="width:100%;height:100%;object-fit:cover;" loading="lazy" />
    <div class="galerie-item-overlay"><span class="galerie-item-label">${titre} · ${lieu}</span></div>
  `;
  grid.appendChild(item);
  adminStatus('Photo uploadée — sauvegarde du site…', 'pending');
  await saveIndexToGithub();
  document.getElementById('admin-proj-titre').value = '';
  document.getElementById('admin-proj-lieu').value  = '';
  document.getElementById('admin-proj-desc').value  = '';
  document.getElementById('admin-photos').value     = '';
}

/* ----------------------------------------------------------------
   ADMIN — ÉQUIPE
---------------------------------------------------------------- */
async function adminAjouterMembre() {
  const nom   = document.getElementById('admin-eq-nom').value.trim();
  const role  = document.getElementById('admin-eq-role').value.trim();
  const bio   = document.getElementById('admin-eq-bio').value.trim();
  const file  = document.getElementById('admin-equipe-photo').files[0];
  if (!nom) { adminStatus('✗ Le nom est obligatoire', 'error'); return; }
  let imgUrl = '';
  if (file) {
    adminStatus('Upload de la photo…', 'pending');
    const ext      = file.name.split('.').pop();
    const filename = `images/equipe/${Date.now()}.${ext}`;
    await githubUploadImage(filename, file, `Ajout membre : ${nom}`);
    imgUrl = `https://raw.githubusercontent.com/${GITHUB_REPO}/${GITHUB_BRANCH}/${filename}`;
  }
  const grid = document.querySelector('.equipe-grid');
  const card = document.createElement('div');
  card.className = 'equipe-card';
  card.innerHTML = `
    <div class="equipe-photo">${imgUrl ? `<img src="${imgUrl}" style="width:100%;height:100%;object-fit:cover;">` : '<div class="ph-circle"></div>'}</div>
    <p class="equipe-nom">${nom}</p>
    <p class="equipe-role">${role}</p>
    <p class="equipe-bio">${bio}</p>
  `;
  grid.appendChild(card);
  adminStatus('Membre ajouté — sauvegarde…', 'pending');
  await saveIndexToGithub();
  document.getElementById('admin-eq-nom').value  = '';
  document.getElementById('admin-eq-role').value = '';
  document.getElementById('admin-eq-bio').value  = '';
  document.getElementById('admin-equipe-photo').value = '';
}

/* ----------------------------------------------------------------
   ADMIN — PARTENAIRES
---------------------------------------------------------------- */
async function adminAjouterPartenaire() {
  const nom  = document.getElementById('admin-part-nom').value.trim();
  const file = document.getElementById('admin-part-logo').files[0];
  if (!nom || !file) { adminStatus('✗ Nom et logo obligatoires', 'error'); return; }
  adminStatus('Upload du logo…', 'pending');
  const ext      = file.name.split('.').pop();
  const filename = `images/partenaires/${Date.now()}.${ext}`;
  await githubUploadImage(filename, file, `Ajout partenaire : ${nom}`);
  const imgUrl = `https://raw.githubusercontent.com/${GITHUB_REPO}/${GITHUB_BRANCH}/${filename}`;
  const grid = document.querySelector('.part-logos');
  const div  = document.createElement('div');
  div.className = 'part-logo';
  div.style.backgroundImage = `url('${imgUrl}')`;
  div.style.backgroundSize  = 'contain';
  div.style.backgroundRepeat = 'no-repeat';
  div.style.backgroundPosition = 'center';
  div.title = nom;
  grid.appendChild(div);
  adminRefreshPartenaires();
  adminStatus('Logo ajouté — sauvegarde…', 'pending');
  await saveIndexToGithub();
  document.getElementById('admin-part-nom').value  = '';
  document.getElementById('admin-part-logo').value = '';
}

function adminRefreshPartenaires() {
  const logos = document.querySelectorAll('.part-logos .part-logo');
  const grid  = document.getElementById('admin-logos-grid');
  if (!grid) return;
  grid.innerHTML = '';
  logos.forEach((logo, i) => {
    const div = document.createElement('div');
    div.style.cssText = 'background:var(--blanc);padding:16px;display:flex;align-items:center;gap:16px;min-width:200px;';
    div.innerHTML = `
      <div style="width:80px;height:40px;background-image:${logo.style.backgroundImage};background-size:contain;background-repeat:no-repeat;background-position:center;"></div>
      <span style="font-family:var(--serif);font-size:14px;color:var(--bleu);flex:1;">${logo.title || 'Partenaire ' + (i+1)}</span>
      <button class="admin-btn-del" onclick="adminSupprimerPartenaire(${i})">Supprimer</button>
    `;
    grid.appendChild(div);
  });
  if (logos.length === 0) {
    grid.innerHTML = '<p style="font-family:var(--serif);font-style:italic;color:#aaa;">Aucun logo pour le moment.</p>';
  }
}

async function adminSupprimerPartenaire(idx) {
  if (!confirm('Supprimer ce partenaire ?')) return;
  const logos = document.querySelectorAll('.part-logos .part-logo');
  if (logos[idx]) logos[idx].remove();
  adminRefreshPartenaires();
  await saveIndexToGithub();
}

/* ----------------------------------------------------------------
   ADMIN — Livre d'or (modération)
---------------------------------------------------------------- */
function adminChargerLivreOr() {
  const cards = document.querySelectorAll('#livreor .lo-card');
  const wrap  = document.getElementById('admin-lo-list');
  wrap.innerHTML = '';
  cards.forEach((card, i) => {
    const text   = card.querySelector('.lo-card-text')?.textContent || '';
    const author = card.querySelector('.lo-card-author')?.textContent || '';
    const div    = document.createElement('div');
    div.style.cssText = 'background:var(--blanc);padding:20px;margin-bottom:16px;display:flex;justify-content:space-between;align-items:flex-start;gap:20px;';
    div.innerHTML = `
      <div>
        <p style="font-family:var(--serif);font-weight:600;font-size:14px;color:var(--bordeaux);">${author}</p>
        <p style="font-family:var(--serif);font-style:italic;font-size:14px;color:#555;margin-top:6px;">${text}</p>
      </div>
      <button class="admin-btn-del" onclick="adminSupprimerLo(${i})">Supprimer</button>
    `;
    wrap.appendChild(div);
  });
}

async function adminSupprimerLo(idx) {
  if (!confirm('Supprimer ce message ?')) return;
  const cards = document.querySelectorAll('#livreor .lo-card');
  if (cards[idx]) cards[idx].remove();
  adminChargerLivreOr();
  await saveIndexToGithub();
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
  const nom   = document.getElementById('lo-nom').value.trim();
  const ville = document.getElementById('lo-ville').value.trim();
  const msg   = document.getElementById('lo-msg').value.trim();
  if (!nom || !msg) { alert('Merci de renseigner votre nom et votre message.'); return; }
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
  const nom   = document.getElementById('ct-nom').value.trim();
  const email = document.getElementById('ct-email').value.trim();
  const msg   = document.getElementById('ct-msg').value.trim();
  if (!nom || !msg) { alert('Merci de renseigner votre nom et votre message.'); return; }
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
   MODAL OVERLAY
---------------------------------------------------------------- */
document.getElementById('modal-admin').addEventListener('click', function(e) {
  if (e.target === this) this.classList.remove('open');
});

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
  // À propos : scroll vers hash et activation bouton (on attend les polices + images)
  if (currentPage === 'apropos' && location.hash.startsWith('#apropos-')) {
    const section = location.hash.replace('#apropos-', '');
    const doScroll = () => scrollToApropos(section);
    // Au chargement complet (images comprises), refaire le scroll précisément
    window.addEventListener('load', () => setTimeout(doScroll, 50));
    setTimeout(doScroll, 300);
  }
});
