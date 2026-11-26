/* ================================================
   Visit Possotomè — map.js
   Carte interactive des villages et des lieux
   (Leaflet + fond OpenStreetMap), partagée par la
   page d'accueil et la page Life, en anglais et en
   français.

   POUR AJOUTER OU DÉPLACER UN LIEU : modifier la
   liste PLACES ci-dessous. Chaque ligne contient
     c    : la catégorie (voir CATS)
     lat  : latitude    lng : longitude
     n    : le nom (texte, ou { en, fr })
     d    : une phrase de description { en, fr }
     l    : (facultatif) un lien { href, en, fr }
   Les coordonnées se lisent dans un lien Google
   Maps ou sur openstreetmap.org (clic droit,
   « Afficher l'adresse »).
   ================================================ */
(function () {
  'use strict';

  var FR = (document.documentElement.lang || 'en').toLowerCase().indexOf('fr') === 0;
  function t(v) { return typeof v === 'string' ? v : (FR ? v.fr : v.en); }

  /* Les couleurs viennent des variables CSS --carte-* de style.css */
  var CATS = [
    { id: 'village',     radius: 9, label: { en: 'Villages',            fr: 'Villages' } },
    { id: 'heritage',    radius: 7, label: { en: 'Heritage & markets',  fr: 'Patrimoine et marchés' } },
    { id: 'hospitality', radius: 7, label: { en: 'Sleep, eat & drink',  fr: 'Dormir, manger, boire' } },
    { id: 'community',   radius: 7, label: { en: 'Community life',      fr: 'Vie communautaire' } },
    { id: 'school',      radius: 7, label: { en: 'Schools',             fr: 'Écoles' } }
  ];

  var MAPS_YENAWA = 'https://maps.app.goo.gl/6iJSTNCKcEnYnGHE9';
  var MAPS_GASSIAGAME = 'https://maps.app.goo.gl/k7mWeogfLaXRKhdf9';
  var MAPS_DAKOUIN = 'https://maps.app.goo.gl/SK75KgyG6Y6GTPQR6';
  var MAPS_VINIDOGAN = 'https://maps.app.goo.gl/LRxB8UjfXMirJhjg9';

  var PLACES = [
    /* ---------- Les dix villages (du nord au sud) ---------- */
    { c: 'village', lat: 6.54388, lng: 1.96990, n: 'Akokponawa',
      d: { en: 'The northernmost village of the arrondissement.', fr: 'Le village le plus au nord de l\'arrondissement.' } },
    { c: 'village', lat: 6.53734, lng: 1.97081, n: 'Hounnontin',
      d: { en: 'Home of the Centre Vinidogan and the sisters\' Catholic school, close to Chez Théo.', fr: 'Village du centre Vinidogan et de l\'école catholique des sœurs, tout près de Chez Théo.' } },
    { c: 'village', lat: 6.52685, lng: 1.96844, n: 'Ouassa-Tokpa',
      d: { en: 'On the lakeshore, next to Possotomè Centre.', fr: 'Au bord du lac, voisin de Possotomè Centre.' } },
    { c: 'village', lat: 6.52618, lng: 1.96122, n: 'Ouassa-Kpodji',
      d: { en: 'Home of the Yénawa market, the big market of the arrondissement.', fr: 'Village du marché Yénawa, le grand marché de l\'arrondissement.' } },
    { c: 'village', lat: 6.52263, lng: 1.96251, n: 'Zinhouegoh',
      d: { en: 'Joined to Ouassa-Kpodji at the Yénawa market.', fr: 'Fait corps avec Ouassa-Kpodji au niveau du marché Yénawa.' } },
    { c: 'village', lat: 6.52166, lng: 1.96812, n: { en: 'Possotomè Centre', fr: 'Possotomè Centre' },
      d: { en: 'The heart of the arrondissement: UJAP, health centre, CACE Sunday evenings. Kotafon is spoken here.', fr: 'Le cœur de l\'arrondissement : UJAP, centre de santé, soirées du CACE. On y parle le kotafon.' } },
    { c: 'village', lat: 6.51536, lng: 1.96417, n: 'Wocomey',
      d: { en: 'Neighbour of Possotomè Centre; on its other side lie the two Sèhomi villages.', fr: 'Voisin de Possotomè Centre ; de l\'autre côté se trouvent les deux villages de Sèhomi.' } },
    { c: 'village', lat: 6.50946, lng: 1.96242, n: 'Sèhomi Kogbomè',
      d: { en: 'Next to the Gassiagamè barter market.', fr: 'Voisin du marché de troc Gassiagamè.' } },
    { c: 'village', lat: 6.50600, lng: 1.96273, n: 'Sèhomi Dato',
      d: { en: 'Lakeshore village of the Sèhomi area.', fr: 'Village lacustre de la zone de Sèhomi.' } },
    { c: 'village', lat: 6.50506, lng: 1.96322, n: 'Gbèdjèwa',
      d: { en: 'The southernmost village of the arrondissement.', fr: 'Le village le plus au sud de l\'arrondissement.' } },

    /* ---------- Patrimoine, culte et marchés ---------- */
    { c: 'heritage', lat: 6.52391, lng: 1.96360, n: { en: 'Thermal spring', fr: 'Source thermale' },
      d: { en: 'Where the hot mineral water of Possotomè rises from the ground.', fr: 'Le point de jaillissement de l\'eau thermale de Possotomè.' },
      l: { href: 'life.html#h-pillars', en: 'About the springs', fr: 'À propos de la source' } },
    { c: 'heritage', lat: 6.52053, lng: 1.96338, n: { en: 'Royal palace of King Ayolomi Laté II', fr: 'Palais du roi Ayolomi Laté II' },
      d: { en: 'Seat of the traditional authority of the ten villages.', fr: 'Siège de l\'autorité traditionnelle des dix villages.' },
      l: { href: 'life.html#h-villages', en: 'About the king', fr: 'À propos du roi' } },
    { c: 'heritage', lat: 6.52746, lng: 1.96998, n: { en: 'The Voodoo village', fr: 'Le village Voodoo' },
      d: { en: 'A place to discover Vodoun deities, temples and rites with a guide.', fr: 'Un lieu pour découvrir divinités, temples et rites vodoun avec un guide.' },
      l: { href: 'visit.html#guides', en: 'Find a guide', fr: 'Trouver un guide' } },
    { c: 'heritage', lat: 6.52420, lng: 1.96277, n: 'Couvent Vodoun Agbo Etchikakou',
      d: { en: 'A Vodoun convent. A place of worship: visit only when invited.', fr: 'Un couvent vodoun. Lieu de culte : on n\'y entre que sur invitation.' } },
    { c: 'heritage', lat: 6.52413, lng: 1.96200, n: { en: 'Yénawa market', fr: 'Marché Yénawa' },
      d: { en: 'The big market of the arrondissement, on the roadside between Ouassa-Kpodji and Zinhouegoh.', fr: 'Le grand marché de l\'arrondissement, au bord de la voie, entre Ouassa-Kpodji et Zinhouegoh.' },
      l: { href: MAPS_YENAWA, en: 'Directions', fr: 'Itinéraire' } },
    { c: 'heritage', lat: 6.50771, lng: 1.96293, n: { en: 'Gassiagamè barter market', fr: 'Marché de troc Gassiagamè' },
      d: { en: 'Foodstuffs exchanged for foodstuffs, without money, in Sèhomi.', fr: 'À Sèhomi, des vivres échangés contre des vivres, sans argent.' },
      l: { href: MAPS_GASSIAGAME, en: 'Directions', fr: 'Itinéraire' } },
    { c: 'heritage', lat: 6.51848, lng: 1.96782, n: 'Paroisse Sainte Famille',
      d: { en: 'Catholic parish of Possotomè.', fr: 'Paroisse catholique de Possotomè.' } },
    { c: 'heritage', lat: 6.54125, lng: 1.97073, n: 'Église Notre-Dame du lac Ahémé',
      d: { en: 'Catholic church in the north of the arrondissement.', fr: 'Église catholique au nord de l\'arrondissement.' } },

    /* ---------- Dormir, manger, boire ---------- */
    { c: 'hospitality', lat: 6.53268, lng: 1.97086, n: 'Chez Théo',
      d: { en: 'Ecolodge and restaurant on stilts over the lake.', fr: 'Écolodge et restaurant sur pilotis au-dessus du lac.' },
      l: { href: 'visit.html#stay', en: 'Plan your stay', fr: 'Préparer votre séjour' } },
    { c: 'hospitality', lat: 6.53517, lng: 1.97065, n: 'Chez Théo les Bains',
      d: { en: 'Thermal baths and pool, a few steps north of the lodge.', fr: 'Bains thermaux et piscine, à quelques pas au nord du lodge.' },
      l: { href: 'https://chez-theo-les-bains.com/', en: 'Website', fr: 'Site web' } },
    { c: 'hospitality', lat: 6.52880, lng: 1.96913, n: 'Hôtel Village Ahémé',
      d: { en: 'The historic hotel, opened in 1986 on the lakeshore.', fr: 'L\'hôtel historique, ouvert en 1986 au bord du lac.' },
      l: { href: 'visit.html#stay', en: 'Plan your stay', fr: 'Préparer votre séjour' } },
    { c: 'hospitality', lat: 6.52360, lng: 1.96560, n: { en: 'Gîte de Possotomè (Eco-Bénin)', fr: 'Gîte de Possotomè (Eco-Bénin)' },
      d: { en: 'Community-run gîte for 25 people.', fr: 'Gîte communautaire de 25 places.' },
      l: { href: 'visit.html#stay', en: 'Plan your stay', fr: 'Préparer votre séjour' } },
    { c: 'hospitality', lat: 6.51990, lng: 1.96940, n: 'Chez Préfet',
      d: { en: 'Bar-restaurant and campsite of the eco-village, on the lakeshore.', fr: 'Bar-restaurant et camping de l\'écovillage, au bord du lac.' },
      l: { href: 'visit.html#eat', en: 'Where to eat', fr: 'Où manger' } },
    { c: 'hospitality', lat: 6.51668, lng: 1.94335, n: { en: 'Restaurant Sêhominou, Mama Dakouin', fr: 'Restaurant Sêhominou, Mama Dakouin' },
      d: { en: 'The best dakouin around.', fr: 'Le meilleur dakouin de la région.' },
      l: { href: MAPS_DAKOUIN, en: 'Directions', fr: 'Itinéraire' } },
    { c: 'hospitality', lat: 6.52006, lng: 1.96894, n: 'Tcheke Beach',
      d: { en: 'Restaurant and lounge on the lake beach.', fr: 'Restaurant et lounge sur la plage du lac.' } },
    { c: 'hospitality', lat: 6.52291, lng: 1.95486, n: { en: 'Chez Quelqu\'un beach', fr: 'Plage Chez Quelqu\'un' },
      d: { en: 'A beach bar by the "two lakes", west of the villages.', fr: 'Une plage-buvette aux « deux lacs », à l\'ouest des villages.' } },
    { c: 'hospitality', lat: 6.52425, lng: 1.96127, n: 'La Boussole',
      d: { en: 'Refreshment bar facing the Yénawa market, across the road.', fr: 'Buvette en face du marché Yénawa, de l\'autre côté de la voie.' } },
    { c: 'hospitality', lat: 6.52492, lng: 1.96013, n: 'Chez Assa',
      d: { en: 'Bar in Ouassa-Kpodji.', fr: 'Bar à Ouassa-Kpodji.' } },
    { c: 'hospitality', lat: 6.52278, lng: 1.96902, n: 'La Nationale',
      d: { en: 'Restaurant in Possotomè Centre.', fr: 'Restaurant à Possotomè Centre.' } },
    { c: 'hospitality', lat: 6.52329, lng: 1.96613, n: 'Les Étoiles du lac Ahémé',
      d: { en: 'Restaurant and guest rooms, formerly known as the Palais des jeunes.', fr: 'Restaurant et chambres d\'hôtes, anciennement appelé Palais des jeunes.' } },

    /* ---------- Vie communautaire et services ---------- */
    { c: 'community', lat: 6.52209, lng: 1.96892, n: { en: 'UJAP headquarters', fr: 'Siège de l\'UJAP' },
      d: { en: 'Union des Jeunes de l\'Arrondissement de Possotomè, since 1999.', fr: 'Union des Jeunes de l\'Arrondissement de Possotomè, depuis 1999.' },
      l: { href: 'life.html#h-ujap', en: 'About the UJAP', fr: 'À propos de l\'UJAP' } },
    /* À AJOUTER dès que leur position est connue (lien GPS) :
       - la Maison des Jeunes, centre culturel nouvellement construit
         près du CEG (à ne pas confondre avec Les Étoiles du lac Ahémé,
         l'ancien Palais des jeunes, classé plus haut)
       - le CEG de Possotomè (à placer dans la catégorie 'school') */
    { c: 'community', lat: 6.52555, lng: 1.96382, n: 'Radio Ahémé FM 87.7',
      d: { en: 'The voice of the Mono region, in local languages.', fr: 'La voix de la région du Mono, en langues locales.' },
      l: { href: 'life.html#h-pillars', en: 'About the radio', fr: 'À propos de la radio' } },
    { c: 'community', lat: 6.53805, lng: 1.96926, n: { en: 'Centre de Nutrition Vinidogan', fr: 'Centre de Nutrition Vinidogan' },
      d: { en: 'Nutrition centre for children, in Hounnontin.', fr: 'Centre de nutrition pour enfants, à Hounnontin.' },
      l: { href: 'visit.html#give-back', en: 'How to help', fr: 'Comment aider' } },
    { c: 'community', lat: 6.52332, lng: 1.96864, n: { en: 'Arrondissement office', fr: 'Bureau de l\'arrondissement' },
      d: { en: 'Office of the Head of Arrondissement.', fr: 'Bureau du chef d\'arrondissement.' } },
    { c: 'community', lat: 6.52267, lng: 1.96858, n: { en: 'Health centre', fr: 'Centre de santé' },
      d: { en: 'Arrondissement health centre, across from the UJAP.', fr: 'Centre de santé de l\'arrondissement, en face de l\'UJAP.' } },
    { c: 'community', lat: 6.52349, lng: 1.96368, n: { en: 'SOBEBRA mineral water plant', fr: 'Usine d\'eau minérale de la SOBEBRA' },
      d: { en: 'Where the thermal water is bottled under the Possotomè brand.', fr: 'L\'eau thermale y est mise en bouteille sous la marque Possotomè.' } },
    { c: 'community', lat: 6.53507, lng: 1.95769, n: 'Eco-Ferme de Possotomè',
      d: { en: 'Agroecology farm founded in 2012 by Ignace Djossa and his father.', fr: 'Ferme agroécologique fondée en 2012 par Ignace Djossa et son père.' },
      l: { href: 'visit.html#eco-ferme', en: 'Visit the farm', fr: 'Visiter la ferme' } },

    /* ---------- Écoles ---------- */
    { c: 'school', lat: 6.53717, lng: 1.96805, n: 'Complexe scolaire catholique « Les Étoiles de Demain »',
      d: { en: 'The sisters\' Catholic school, in Hounnontin.', fr: 'L\'école catholique des sœurs, à Hounnontin.' } },
    { c: 'school', lat: 6.52397, lng: 1.96911, n: 'Complexe scolaire de Ouassa',
      d: { en: 'School in Ouassa-Tokpa.', fr: 'Établissement scolaire à Ouassa-Tokpa.' } },
    { c: 'school', lat: 6.52259, lng: 1.96106, n: 'EPP de Ouassa-Kpodji',
      d: { en: 'Public primary school.', fr: 'École primaire publique.' } }
  ];

  var TXT = {
    wide:   { en: 'See Possotomè within Benin', fr: 'Voir Possotomè dans le Bénin' },
    local:  { en: 'Back to the villages',       fr: 'Revenir aux villages' },
    legend: { en: 'Show or hide a category',    fr: 'Afficher ou masquer une catégorie' }
  };

  /* Lit la couleur d'une catégorie dans les variables CSS */
  function colour(id) {
    var v = getComputedStyle(document.documentElement).getPropertyValue('--carte-' + id);
    return (v && v.trim()) || '#185FA5';
  }

  function popup(p, cat) {
    var div = document.createElement('div');
    var kind = document.createElement('span');
    kind.className = 'vp-map-popup-cat';
    kind.textContent = t(cat.label);
    div.appendChild(kind);
    var title = document.createElement('strong');
    title.textContent = t(p.n);
    div.appendChild(title);
    div.appendChild(document.createTextNode(t(p.d)));
    if (p.l) {
      div.appendChild(document.createElement('br'));
      var a = document.createElement('a');
      a.href = p.l.href;
      a.textContent = t(p.l);
      if (p.l.href.indexOf('http') === 0) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
      div.appendChild(a);
    }
    return div;
  }

  function setup(el) {
    var block = el.closest('.vp-map-block') || el.parentNode;
    var legend = block.querySelector('[data-vp-map-legend]');
    var toggle = block.querySelector('[data-vp-map-toggle]');
    var map = null;
    var layers = {};
    var hidden = {};
    var bounds = [];
    var wide = false;
    var label = null;

    function start() {
      if (map) return;
      /* zoomSnap 0.25 : le cadrage initial colle au plus près des villages */
      map = L.map(el, { scrollWheelZoom: false, zoomSnap: 0.25 });
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);

      CATS.forEach(function (cat) {
        var group = L.layerGroup();
        var fill = colour(cat.id);
        PLACES.forEach(function (p) {
          if (p.c !== cat.id) return;
          L.circleMarker([p.lat, p.lng], {
            radius: cat.radius, color: '#FFFFFF', weight: 2, fillColor: fill, fillOpacity: 1
          }).bindPopup(popup(p, cat)).bindTooltip(t(p.n)).addTo(group);
          /* Le cadrage initial se fait sur les villages ; les lieux
             excentrés restent visibles en déplaçant la carte. */
          if (p.c === 'village') bounds.push([p.lat, p.lng]);
        });
        layers[cat.id] = group;
        if (!hidden[cat.id]) group.addTo(map);
      });

      map.fitBounds(bounds, { padding: [30, 30] });

      /* La molette ne zoome qu'après un clic sur la carte,
         pour ne pas bloquer le défilement de la page. */
      map.on('click', function () { map.scrollWheelZoom.enable(); });
      map.on('mouseout', function () { map.scrollWheelZoom.disable(); });
    }

    /* Légende : un bouton par catégorie, qui affiche ou masque ses points */
    if (legend) {
      legend.setAttribute('role', 'group');
      legend.setAttribute('aria-label', t(TXT.legend));
      CATS.forEach(function (cat) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'vp-map-filter';
        b.setAttribute('aria-pressed', 'true');
        var dot = document.createElement('span');
        dot.className = 'vp-map-dot vp-map-dot-' + cat.id;
        dot.setAttribute('aria-hidden', 'true');
        b.appendChild(dot);
        b.appendChild(document.createTextNode(t(cat.label)));
        b.addEventListener('click', function () {
          start();
          hidden[cat.id] = !hidden[cat.id];
          b.setAttribute('aria-pressed', hidden[cat.id] ? 'false' : 'true');
          if (hidden[cat.id]) map.removeLayer(layers[cat.id]);
          else layers[cat.id].addTo(map);
        });
        legend.appendChild(b);
      });
    }

    /* Bouton « voir dans le Bénin » (page d'accueil) */
    if (toggle) {
      toggle.textContent = t(TXT.wide);
      toggle.addEventListener('click', function () {
        start();
        wide = !wide;
        if (wide) {
          map.setView([8.6, 2.3], 7);
          label = L.tooltip({ permanent: true, direction: 'right', offset: [8, 0] })
            .setLatLng([6.5217, 1.9681]).setContent('Possotomè').addTo(map);
        } else {
          if (label) { map.removeLayer(label); label = null; }
          map.fitBounds(bounds, { padding: [30, 30] });
        }
        toggle.textContent = t(wide ? TXT.local : TXT.wide);
      });
    }

    /* La carte ne se charge que lorsqu'elle approche de l'écran. */
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) { start(); io.disconnect(); }
      }, { rootMargin: '300px' });
      io.observe(el);
    } else {
      start();
    }
  }

  function init() {
    if (typeof L === 'undefined') return;
    var els = document.querySelectorAll('[data-vp-map]');
    for (var i = 0; i < els.length; i++) setup(els[i]);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
