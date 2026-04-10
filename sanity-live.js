// ═══════════════════════════════════════════════════════════════
//  sanity-live.js — Connexion Sanity CMS → index.html
//  Récupère le contenu depuis l'API Sanity et met à jour le DOM.
//  Si Sanity ne retourne rien, le contenu HTML statique reste intact.
// ═══════════════════════════════════════════════════════════════

(async function () {

  const PROJECT_ID = '2vagxhtl';
  const DATASET    = 'production';
  const API_VER    = '2021-10-21';
  const CDN        = `https://${PROJECT_ID}.apicdn.sanity.io/v${API_VER}/data/query/${DATASET}`;

  // ── Helpers ────────────────────────────────────────────────────

  /** Convertit une référence d'image Sanity en URL CDN */
  function imgUrl(ref, width) {
    if (!ref) return null;
    // ref = "image-{id}-{dims}-{ext}"
    const withoutPrefix = ref.replace(/^image-/, '');
    const parts = withoutPrefix.split('-');
    const ext   = parts.pop();
    const dims  = parts.pop();
    const id    = parts.join('-');
    const base  = `https://cdn.sanity.io/images/${PROJECT_ID}/${DATASET}/${id}-${dims}.${ext}`;
    return width ? base + `?w=${width}&auto=format` : base;
  }

  /** Exécute une requête GROQ sur l'API Sanity publique */
  async function query(groq) {
    const url = `${CDN}?query=${encodeURIComponent(groq)}`;
    const res  = await fetch(url);
    if (!res.ok) throw new Error(`Sanity API error: ${res.status}`);
    const json = await res.json();
    return json.result;
  }

  const MOIS_FR = ['JAN.','FÉV.','MARS','AVR.','MAI','JUIN','JUIL.','AOÛT','SEPT.','OCT.','NOV.','DÉC.'];

  // ── Fetch tout en parallèle ─────────────────────────────────────

  let siteInfo, bieres, evenements, merchants, activites;
  try {
    [siteInfo, bieres, evenements, merchants, activites] = await Promise.all([
      query(`*[_type == "siteInfo"][0]`),
      query(`*[_type == "biere"] | order(ordre asc)`),
      query(`*[_type == "evenement"] | order(date asc)`),
      query(`*[_type == "merchant"] | order(ordre asc)`),
      query(`*[_type == "activite"] | order(ordre asc)`),
    ]);
  } catch (e) {
    console.warn('[Sanity] Impossible de charger le contenu:', e.message);
    return; // on garde le HTML statique
  }

  // ── 1. INFO BAR ────────────────────────────────────────────────
  if (siteInfo) {
    const pills = document.querySelectorAll('.info-pill');
    if (siteInfo.horaires && pills[0]) {
      pills[0].childNodes[pills[0].childNodes.length - 2].textContent = ' ' + siteInfo.horaires + ' ';
    }
    if (siteInfo.adresse && pills[1]) {
      pills[1].childNodes[pills[1].childNodes.length - 2].textContent = ' ' + siteInfo.adresse + ' ';
    }
    if (siteInfo.email && pills[2]) {
      pills[2].childNodes[pills[2].childNodes.length - 2].textContent = ' ' + siteInfo.email + ' ';
    }

    // HERO
    const heroTag = document.querySelector('.hero-tag');
    if (siteInfo.heroTag && heroTag) heroTag.textContent = siteInfo.heroTag;

    const heroTitle = document.querySelector('.hero-title');
    if (siteInfo.heroTitre1 && siteInfo.heroTitre2 && heroTitle) {
      heroTitle.innerHTML = `${siteInfo.heroTitre1}<br /><em>${siteInfo.heroTitre2}</em>`;
    }

    // MISSION
    const bannerCard = document.querySelector('.banner-card');
    if (bannerCard) {
      const h2 = bannerCard.querySelector('h2');
      const p  = bannerCard.querySelector('p');
      const btn = bannerCard.querySelector('a');
      if (siteInfo.missionTitre && h2) h2.innerHTML = siteInfo.missionTitre.replace(/\n/g, '<br />');
      if (siteInfo.missionTexte && p)  p.textContent = siteInfo.missionTexte;
      if (siteInfo.missionBouton && btn) btn.textContent = siteInfo.missionBouton;
    }

    // VISIT
    const visitTitle = document.querySelector('.visit-title');
    const visitText  = document.querySelector('.visit-text');
    const visitBtn   = document.querySelector('.visit-btn');
    const visitImg   = document.querySelector('.visit-img-wrap img');
    if (siteInfo.visiteTitre && visitTitle) visitTitle.innerHTML = siteInfo.visiteTitre.replace(/\n/g, '<br />');
    if (siteInfo.visiteTexte  && visitText)  visitText.textContent = siteInfo.visiteTexte;
    if (siteInfo.visiteBouton && visitBtn)   visitBtn.childNodes[0].textContent = siteInfo.visiteBouton + ' ';
    if (siteInfo.visiteImage?.asset?._ref && visitImg) {
      visitImg.src = imgUrl(siteInfo.visiteImage.asset._ref, 900);
    }

    // FOOTER copyright
    const copyright = document.querySelector('.footer-copyright');
    if (siteInfo.copyright && copyright) copyright.textContent = siteInfo.copyright;
  }

  // ── 2. BIÈRES (slider) ─────────────────────────────────────────
  if (bieres && bieres.length > 0) {
    const track = document.querySelector('.slider-track');
    if (track) {
      function beerCardHTML(b, ariaHidden) {
        const imgSrc = b.image?.asset?._ref
          ? imgUrl(b.image.asset._ref, 600)
          : 'https://placehold.co/400x600';
        const alt    = ariaHidden ? '' : b.nom;
        const hidden = ariaHidden ? ' aria-hidden="true"' : '';
        const bg     = b.couleurFond || '#1a1b1f';
        return `
          <div class="beer-slide" style="background:${bg}"${hidden}>
            <img src="${imgSrc}" alt="${alt}" />
            <div class="beer-slide-overlay"></div>
            <div class="slide-label-inner">
              <div class="slide-name">${b.nom} <span class="slide-arrow">›</span></div>
              <div class="slide-style">${b.style || ''}</div>
            </div>
          </div>`;
      }

      // Original set + duplicate pour le scroll infini
      const html = bieres.map(b => beerCardHTML(b, false)).join('')
                 + bieres.map(b => beerCardHTML(b, true)).join('');
      track.innerHTML = html;
    }
  }

  // ── 3. ÉVÉNEMENTS ──────────────────────────────────────────────
  if (evenements && evenements.length > 0) {
    const list = document.querySelector('.events-section [role="list"]');
    if (list) {
      const html = evenements.map(ev => {
        const d     = ev.date ? new Date(ev.date + 'T00:00:00') : null;
        const jour  = d ? String(d.getDate()).padStart(2, '0') : '??';
        const mois  = d ? MOIS_FR[d.getMonth()] : '???';
        const label = d ? `${d.getDate()} ${MOIS_FR[d.getMonth()].toLowerCase().replace('.', '')}` : '';
        const imgSrc = ev.image?.asset?._ref
          ? imgUrl(ev.image.asset._ref, 400)
          : './brand_assets/monchat_brasserie.jpg';
        const lien  = ev.lien || '#visiter';

        return `
          <a href="${lien}" class="event-row" role="listitem">
            <img src="${imgSrc}" alt="" class="event-img-preview" aria-hidden="true" />
            <div class="event-date" aria-label="${label}">
              <span class="event-date-day">${jour}</span>
              <span class="event-date-month">${mois}</span>
            </div>
            <div class="event-content">
              <div class="event-name">${ev.nom || 'Événement'}</div>
              <div class="event-venue">${ev.lieu || ''}</div>
            </div>
            <span class="event-cta" aria-hidden="true">› S'inscrire</span>
          </a>`;
      }).join('');

      list.innerHTML = html;
    }
  }

  // ── 4. MERCHANTS ───────────────────────────────────────────────
  if (merchants && merchants.length > 0) {
    const grid = document.querySelector('.merchants-grid');
    if (grid) {
      const html = merchants.map(m => {
        const logoSrc = m.logo?.asset?._ref
          ? imgUrl(m.logo.asset._ref, 300)
          : 'https://placehold.co/200x80';
        const lien = m.lien || '#';
        return `
          <a href="${lien}" target="_blank" rel="noopener" class="merchant-card" aria-label="${m.nom || ''}">
            <div class="merchant-logo-wrap">
              <img src="${logoSrc}" alt="${m.nom || ''}" class="merchant-logo" />
            </div>
            <div class="merchant-divider"></div>
            <div class="merchant-name">${m.nom || ''}</div>
            <span class="merchant-cta">Visiter → </span>
          </a>`;
      }).join('');
      grid.innerHTML = html;
    }
  }

  // ── 5. ACTIVITÉS ───────────────────────────────────────────────
  if (activites && activites.length > 0) {
    const grid = document.querySelector('.activities-grid');
    if (grid) {
      const html = activites.map(a => `
        <div class="activity-card">
          <div class="activity-icon">${a.icone || '🍺'}</div>
          <div class="activity-divider"></div>
          <div class="activity-name">${a.titre || ''}</div>
          <p class="activity-desc">${a.description || ''}</p>
          <span class="activity-cta">En savoir plus →</span>
        </div>`).join('');
      grid.innerHTML = html;
    }
  }

  console.log('[Sanity] Contenu mis à jour avec succès.');

})();
