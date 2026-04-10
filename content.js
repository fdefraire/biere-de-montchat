// ═══════════════════════════════════════════════════════════════════════════
//  CONTENU DU SITE — Bière de Montchat
//  ─────────────────────────────────────────────────────────────────────────
//  Pour mettre à jour le site :
//   1. Ouvrez ce fichier dans un éditeur de texte (Notepad, TextEdit…)
//   2. Modifiez les valeurs entre guillemets  "  "
//   3. Enregistrez le fichier (Ctrl+S ou Cmd+S)
//   4. Rechargez la page dans votre navigateur
//
//  ⚠️  Règles importantes :
//   • Ne modifiez JAMAIS la structure  —  seulement le texte entre "  "
//   • Ne supprimez pas les virgules en fin de ligne
//   • Si votre texte contient une apostrophe ('), gardez bien les guillemets
//     doubles autour :  "L'histoire du quartier"  ✓
//   • Les images doivent être dans le dossier brand_assets/ ou biere/
//     Exemple de chemin :  "./brand_assets/monimage.jpg"
//   • Enregistrez toujours en UTF-8 pour conserver les accents (é, è, ê…)
// ═══════════════════════════════════════════════════════════════════════════

const CONTENU = {

  // ─────────────────────────────────────────────────────────────────────────
  //  INFORMATIONS GÉNÉRALES
  //  Utilisées dans la navigation, la barre d'info, le pied de page…
  // ─────────────────────────────────────────────────────────────────────────
  infos: {
    email:     "contact@bieremontchat.fr",
    telephone: "+33 4 XX XX XX XX",
    adresse:   "Quartier Montchat · Lyon",
    horaires:  "Ven. 17h–20h · Sam. 10h–13h",
    instagram: "@bieremontchat",
  },

  // ─────────────────────────────────────────────────────────────────────────
  //  HERO — Accroche principale en haut de page
  // ─────────────────────────────────────────────────────────────────────────
  hero: {
    tag:          "Brasserie Artisanale · Lyon · Montchat",
    titre_ligne1: "Bière Brassée",
    titre_ligne2: "Pour Le Plaisir",   // ← Affiché en vert italique
  },

  // ─────────────────────────────────────────────────────────────────────────
  //  BIÈRES — Slider de produits
  //  Pour AJOUTER une bière : copiez-collez un bloc {…} et adaptez.
  //  Pour SUPPRIMER une bière : effacez le bloc {…} et la virgule après.
  //  couleur_fond : code couleur hexadécimal (ex : "#C9A820")
  // ─────────────────────────────────────────────────────────────────────────
  bieres: [
    {
      nom:          "Blonde",
      style:        "Lager Blonde",
      image:        "./biere/blonde.webp",
      couleur_fond: "#C9A820",
    },
    {
      nom:          "Blanche",
      style:        "Witbier",
      image:        "./biere/blanche.webp",
      couleur_fond: "#7298B0",
    },
    {
      nom:          "Triple Bock",
      style:        "Bock Forte",
      image:        "./biere/Triple Bock.webp",
      couleur_fond: "#1A3B7A",
    },
    {
      nom:          "Ambrée",
      style:        "Vienna Lager",
      image:        "./biere/ambrée.webp",
      couleur_fond: "#B03010",
    },
    {
      nom:          "Stout d'Hiver",
      style:        "Porter Robuste",
      image:        "./brand_assets/montchat_header.jpeg",
      couleur_fond: "#1A2B48",
    },
  ],

  // ─────────────────────────────────────────────────────────────────────────
  //  ÉVÉNEMENTS — Agenda affiché sur la page
  //  Pour AJOUTER un événement : copiez-collez un bloc {…} et adaptez.
  //  Pour SUPPRIMER un événement : effacez le bloc {…} et la virgule après.
  //  lien : "#visiter" pour rester sur la page, ou une URL externe
  // ─────────────────────────────────────────────────────────────────────────
  evenements: [
    {
      jour:  "26",
      mois:  "AVR.",
      nom:   "Soirée Dégustation Printemps",
      lieu:  "Brasserie de Montchat · Lyon",
      image: "./brand_assets/IMG_2543-copie-2-1-1024x683.jpg",
      lien:  "#visiter",
    },
    {
      jour:  "03",
      mois:  "MAI",
      nom:   "Brassage Participatif — Ouvert au public",
      lieu:  "Atelier de Brassage · Montchat",
      image: "./brand_assets/IMG_2493-1024x683.jpeg",
      lien:  "#visiter",
    },
    {
      jour:  "10",
      mois:  "MAI",
      nom:   "Vente Privée — Nouveaux Brassins",
      lieu:  "Brasserie de Montchat · Sur inscription",
      image: "./brand_assets/IMG_2602-1024x683.jpeg",
      lien:  "#visiter",
    },
    {
      jour:  "17",
      mois:  "MAI",
      nom:   "Festival des Bières Artisanales de Lyon",
      lieu:  "Halle Tony Garnier · Lyon",
      image: "./brand_assets/Photo-de-nous-1024x768.jpg",
      lien:  "#visiter",
    },
    {
      jour:  "24",
      mois:  "MAI",
      nom:   "Visite Guidée de la Brasserie",
      lieu:  "Brasserie de Montchat · Gratuit sur réservation",
      image: "./brand_assets/IMG_2628-1024x683.jpeg",
      lien:  "#visiter",
    },
    {
      jour:  "07",
      mois:  "JUIN",
      nom:   "Marché des Artisans & Producteurs Locaux",
      lieu:  "Place du Quartier Montchat · Lyon",
      image: "./brand_assets/monchat_brasserie.jpg",
      lien:  "#visiter",
    },
  ],

  // ─────────────────────────────────────────────────────────────────────────
  //  MISSION — Bandeau "100% Artisanal"
  //  \n dans le titre = saut de ligne
  // ─────────────────────────────────────────────────────────────────────────
  mission: {
    titre:        "100% Artisanal\n& Local !",
    texte:        "Nous utilisons exclusivement du malt certifié local et biologique, sélectionné auprès de producteurs engagés de la région. Un brassage responsable, un goût authentique.",
    bouton_texte: "En savoir plus sur notre approche",
    bouton_lien:  "#visiter",
  },

  // ─────────────────────────────────────────────────────────────────────────
  //  CITATION — Texte mis en avant
  //  Mettez un mot/groupe en VERT  avec : {{le texte}}
  //  Mettez un mot/groupe en DORÉ  avec : [[le texte]]
  // ─────────────────────────────────────────────────────────────────────────
  citation: "La Bière de Montchat est intimement liée à {{l'histoire du quartier}}. Chaque jour, nous honorons cet héritage, nous utilisons [[du malt local et biologique]], et nous inspirons la passion pour la bière artisanale.",

  // ─────────────────────────────────────────────────────────────────────────
  //  VISITE — Section "Venez nous rendre visite"
  //  \n dans le titre = saut de ligne
  // ─────────────────────────────────────────────────────────────────────────
  visite: {
    label:        "Venir nous voir",
    titre:        "Visitez notre\nbrasserie !",
    texte:        "Notre brasserie et notre bar de dégustation sont installés au cœur du quartier Montchat à Lyon. Un espace chaleureux où notre bière artisanale coule en permanence, où de nouvelles recettes sont toujours en cours, et où des visages souriants vous attendent pour vous accueillir.",
    bouton_texte: "Planifier une visite",
    bouton_lien:  "mailto:contact@bieremontchat.fr",
    image:        "./brand_assets/IMG_2543-copie-2-1-1024x683.jpg",
    image_alt:    "Bar de dégustation Montchat",
  },

  // ─────────────────────────────────────────────────────────────────────────
  //  PHOTOS INSTAGRAM
  //  Remplacez les chemins par vos nouvelles photos.
  //  Pour AJOUTER une photo  : ajoutez une ligne  "./chemin/photo.jpg",
  //  Pour SUPPRIMER une photo : supprimez la ligne correspondante.
  // ─────────────────────────────────────────────────────────────────────────
  photos: [
    "./brand_assets/IMG_2543-copie-2-1-1024x683.jpg",
    "./brand_assets/IMG_2602-1024x683.jpeg",
    "./brand_assets/Photo-de-nous-1024x768.jpg",
    "./brand_assets/IMG_2493-1024x683.jpeg",
    "./brand_assets/monchat_brasserie.jpg",
    "./brand_assets/IMG_2623-1024x683.jpeg",
    "./brand_assets/IMG_2628-1024x683.jpeg",
  ],

  // ─────────────────────────────────────────────────────────────────────────
  //  PIED DE PAGE
  // ─────────────────────────────────────────────────────────────────────────
  footer: {
    liens: [
      { texte: "Nos Bières",    lien: "#bieres"    },
      { texte: "À propos",      lien: "#brasserie" },
      { texte: "Notre Mission", lien: "#mission"   },
      { texte: "Newsletters",   lien: "#visiter"   },
    ],
    copyright: "Copyright © 2024 Bière de Montchat · Tous droits réservés · Site artisanal, comme nos bières",
  },

};
