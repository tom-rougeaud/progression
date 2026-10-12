// Curriculum Mathématiques — extrait structuré
// Source : BO en vigueur (3ème PM, CAP, Bac Pro 2nde/1ère/Term, UPE2A)
const CURRICULUM = {
  troisieme_pm: {
    label: "3ème Prépa-Métiers", icone: "🎒",
    themes: [
      { id:"pm0", label:"Nombres et calculs", icone:"🔢", chapitres:[
        { id:"pm0m0", nom:"Entiers, décimaux, fractions", items:["Écriture décimale des fractions simples (1/2, 1/4, 3/4…)","Comparer des nombres décimaux et négatifs","Simplifier et comparer des fractions","Calculer avec des fractions","Prendre une fraction d'un nombre (1/3 de 18…)","Connaître les carrés de 1 à 12","Appliquer les critères de divisibilité 2, 3, 5, 9"] },
        { id:"pm0m1", nom:"Puissances et notation scientifique", items:["Calculer avec des puissances de 10","Passer de l'écriture décimale à la notation scientifique","Exprimer un nombre sous forme de pourcentage"] },
        { id:"pm0m2", nom:"Calcul littéral et équations", items:["Simplifier des expressions littérales","Calculer la valeur d'une expression algébrique","Développer et factoriser une expression simple","Résoudre ax=c, x+b=c, ax+b=c","Exprimer double, triple, moitié, prédécesseur, successeur, carré"] },
        { id:"pm0m3", nom:"Proportionnalité et pourcentages", items:["Reconnaître une situation de proportionnalité","Mobiliser la linéarité (×, +) ou le retour à l'unité","Appliquer une augmentation ou diminution en %","Écrire un nombre sous plusieurs formes (1,2 = 6/5 = 120%)"] }
      ]},
      { id:"pm1", label:"Espace et géométrie", icone:"📐", chapitres:[
        { id:"pm1m0", nom:"Repérage et figures", items:["Lire les coordonnées d'un point dans un repère","Placer un point de coordonnées données","Exploiter le codage d'une figure (triangles, quadrilatères, médiatrice)","Reconnaître et citer des angles (plat, nul, opposés, adjacents, supplémentaires)","Calculer le 3ème angle d'un triangle"] },
        { id:"pm1m1", nom:"Théorèmes et trigonométrie", items:["Reconnaître et appliquer Pythagore","Reconnaître et appliquer Thalès (triangles emboîtés)","Reconnaître et appliquer la ligne trig. cosinus","Mobiliser symétrie axiale, centrale, translation"] },
        { id:"pm1m2", nom:"Périmètres, aires, volumes", items:["Calculer le périmètre d'un polygone et d'un disque","Calculer l'aire d'un triangle, rectangle, disque","Calculer le volume d'un cube, pavé, prisme, cylindre","Convertir : mm/cm/m/km, mm²/cm²/m²/km², cm³/dm³/m³, g/kg, mL/L"] },
        { id:"pm1m3", nom:"Solides", items:["Reconnaître cube, pavé, prisme droit, cylindre, pyramide, cône"] }
      ]},
      { id:"pm2", label:"Organisation et gestion de données", icone:"📊", chapitres:[
        { id:"pm2m0", nom:"Statistiques", items:["Exprimer une fréquence simple","Calculer une moyenne","Déterminer une médiane (petite série)","Lire et interpréter tableaux, diagrammes, graphiques"] },
        { id:"pm2m1", nom:"Probabilités", items:["Attribuer des probabilités (équiprobabilité)"] }
      ]},
      { id:"pm3", label:"Fonctions", icone:"📈", chapitres:[
        { id:"pm3m0", nom:"Graphiques et fonctions", items:["Exploiter un graphique (lecture axe x et y)","Reconnaître une relation entre deux grandeurs"] }
      ]},
      { id:"pm4", label:"Algorithmique", icone:"💻", chapitres:[
        { id:"pm4m0", nom:"Programmes de calcul", items:["Interpréter une suite d'instructions","Programme de calcul, déplacement ou construction géométrique"] }
      ]}
    ]
  },
  cap: {
    label: "CAP", icone: "🔧",
    themes: [
      { id:"cp0", label:"Nombres et calculs", icone:"🔢", chapitres:[
        { id:"cp0m0", nom:"Calculs usuels et proportionnalité", items:["Calculer avec des nombres rationnels","Reconnaître une situation de proportionnalité","Appliquer une échelle","Indices et évolutions"] },
        { id:"cp0m1", nom:"Pourcentages et calculs commerciaux", items:["Calculer un pourcentage","Remise, TVA, prix HT/TTC","Calcul économique simple"] }
      ]},
      { id:"cp1", label:"Organisation et gestion de données", icone:"📊", chapitres:[
        { id:"cp1m0", nom:"Tableaux et graphiques", items:["Lire et construire un tableau de données","Lire et construire un graphique","Données issues du contexte professionnel"] },
        { id:"cp1m1", nom:"Statistiques", items:["Calculer une moyenne","Calculer une médiane","Calculer un effectif et une fréquence"] }
      ]},
      { id:"cp2", label:"Grandeurs et mesures", icone:"📏", chapitres:[
        { id:"cp2m0", nom:"Mesures et conversions", items:["Convertir des longueurs, masses, capacités","Convertir des températures et des temps","Calculer des aires et des volumes","Grandeurs composées : vitesse, débit, cadence"] }
      ]},
      { id:"cp3", label:"Espace et géométrie", icone:"📐", chapitres:[
        { id:"cp3m0", nom:"Figures planes", items:["Reconnaître figures planes usuelles","Appliquer parallélisme et perpendicularité","Calculer périmètres et aires"] },
        { id:"cp3m1", nom:"Solides", items:["Reconnaître les solides usuels","Calculer des volumes de solides simples"] }
      ]},
      { id:"cp4", label:"Calcul algébrique", icone:"➗", chapitres:[
        { id:"cp4m0", nom:"Calcul littéral", items:["Simplifier une expression littérale","Résoudre une équation simple"] }
      ]}
    ]
  },
  seconde: {
    label: "2nde Pro", icone: "📗",
    themes: [
      { id:"s0", label:"Calcul numérique", icone:"🔢", chapitres:[
        { id:"s0m0", nom:"Fractions, pourcentages, proportionnalité", items:["Exprimer un nombre sous forme de pourcentage","Utiliser des pourcentages","Calculer avec des puissances de 10","Écrire un nombre en notation scientifique","Comparer des fractions","Additionner, multiplier des fractions","Calculer une quatrième proportionnelle","Déterminer un arrondi","Exprimer un résultat dans une unité adaptée"] }
      ]},
      { id:"s1", label:"Calcul algébrique", icone:"✏️", chapitres:[
        { id:"s1m0", nom:"Expressions et formules", items:["Calculer un intérêt simple, une valeur acquise","Développer, factoriser, réduire une expression littérale","Transformer une formule"] }
      ]},
      { id:"s2", label:"Fonctions", icone:"📈", chapitres:[
        { id:"s2m0", nom:"Graphiques et variations", items:["Se repérer dans un repère orthogonal","Rechercher l'image ou l'antécédent d'un nombre par une fonction","Établir le tableau de variation d'une fonction","Reconnaître l'allure d'une représentation graphique à partir d'un tableau de variations","Résoudre graphiquement des équations"] }
      ]},
      { id:"s3", label:"Probabilités", icone:"🎲", chapitres:[
        { id:"s3m0", nom:"Dénombrement et probabilités", items:["Dénombrer à l'aide de tableaux ou d'arbres","Calculer la probabilité d'un événement et de l'événement contraire","Calculer la probabilité de la réunion d'événements incompatibles","Calculer la probabilité de la réunion de deux événements","Calculer la probabilité de l'intersection de deux événements","Exploiter une représentation de données","Calculer une probabilité conditionnelle"] }
      ]},
      { id:"s4", label:"Statistiques", icone:"📊", chapitres:[
        { id:"s4m0", nom:"Indicateurs statistiques", items:["Calculer une fréquence","Calculer une moyenne","Lire un graphique de données chiffrées","Associer un graphique avec des données"] }
      ]},
      { id:"s5", label:"Plan et espace", icone:"📐", chapitres:[
        { id:"s5m0", nom:"Figures et mesures", items:["Reconnaître des configurations de Pythagore ou de Thalès","Calculer l'aire d'un carré, d'un rectangle, d'un disque","Convertir des unités de longueur, d'aire et de volume","Vérifier la cohérence grandeur-unité de mesure"] }
      ]}
    ]
  },
  premiere: {
    label: "1ère Pro", icone: "📘",
    themes: [
      { id:"p0", label:"Calcul numérique", icone:"🔢", chapitres:[
        { id:"p0m0", nom:"Fractions, proportionnalité, pourcentages", items:["Exprimer un nombre sous forme de pourcentage","Utiliser des pourcentages","Calculer avec des puissances de 10","Écrire un nombre en notation scientifique","Comparer des fractions","Additionner, multiplier des fractions","Calculer une quatrième proportionnelle","Déterminer un arrondi","Appliquer des pourcentages ou une échelle","Exprimer un résultat dans une unité adaptée","Reconnaître une situation de proportionnalité"] }
      ]},
      { id:"p1", label:"Calcul algébrique", icone:"✏️", chapitres:[
        { id:"p1m0", nom:"Suites et équations", items:["Calculer un terme d'une suite arithmétique","Développer, factoriser, réduire une expression littérale","Résoudre une équation du type ax = b ou a + x = b","Résoudre une équation ou une inéquation du premier degré"] }
      ]},
      { id:"p2", label:"Fonctions", icone:"📈", chapitres:[
        { id:"p2m0", nom:"Graphiques, variations, extremums", items:["Se repérer dans un repère orthogonal","Rechercher l'image ou l'antécédent d'un nombre par une fonction","Calculer l'ordonnée d'un point d'une courbe","Établir le tableau de variation d'une fonction","Reconnaître l'allure d'une représentation graphique à partir d'un tableau de variations","Déterminer graphiquement les extremums globaux d'une fonction","Déterminer graphiquement le coefficient directeur d'une droite","Résoudre graphiquement des équations","Résoudre graphiquement une équation du type f(x) = c ou f(x) < c"] }
      ]},
      { id:"p3", label:"Statistiques", icone:"📊", chapitres:[
        { id:"p3m0", nom:"Indicateurs et graphiques", items:["Calculer une fréquence","Calculer une moyenne","Lire un graphique de données chiffrées","Associer un graphique avec des données","Calculer des indicateurs de position ou de dispersion"] }
      ]},
      { id:"p4", label:"Plan et espace", icone:"📐", chapitres:[
        { id:"p4m0", nom:"Figures et vecteurs", items:["Reconnaître des configurations de Pythagore ou de Thalès","Calculer l'aire d'un carré, d'un rectangle, d'un disque","Convertir des unités de longueur, d'aire et de volume","Vérifier la cohérence grandeur-unité de mesure","Distinguer cercle, disque, sphère et boule","Reconnaître un cube, un pavé droit, une pyramide, un cylindre, un cône ou une boule","Calculer le volume d'un cube, d'un pavé droit et d'un cylindre","Construire la somme de deux vecteurs"] }
      ]}
    ]
  },
  terminale: {
    label: "Terminale Pro", icone: "📙",
    themes: [
      { id:"t0", label:"Calcul numérique", icone:"🔢", chapitres:[
        { id:"t0m0", nom:"Fractions, pourcentages, proportionnalité", items:["Exprimer un nombre sous forme de pourcentage","Calculer avec des puissances de 10","Écrire un nombre en notation scientifique","Calculer une quatrième proportionnelle","Appliquer des pourcentages ou une échelle","Exprimer un résultat dans une unité adaptée","Reconnaître une situation de proportionnalité"] }
      ]},
      { id:"t1", label:"Calcul algébrique", icone:"✏️", chapitres:[
        { id:"t1m0", nom:"Polynômes et équations", items:["Développer, factoriser, réduire une expression littérale","Résoudre une équation ou une inéquation du premier degré","Factoriser x² − a²","Factoriser un polynôme de degré 2","Développer (x + a)(x + b)"] }
      ]},
      { id:"t2", label:"Fonctions", icone:"📈", chapitres:[
        { id:"t2m0", nom:"Fonctions et dérivée", items:["Se repérer dans un repère orthogonal","Rechercher l'image ou l'antécédent d'un nombre par une fonction","Calculer l'ordonnée d'un point d'une courbe","Déterminer graphiquement les extremums globaux d'une fonction","Déterminer graphiquement le coefficient directeur d'une droite","Résoudre graphiquement une équation du type f(x) = c ou f(x) < c","Visualiser les solutions de l'équation f(x) = 0","Déterminer la dérivée d'une fonction polynôme de degré ≤ 2"] }
      ]},
      { id:"t3", label:"Statistiques", icone:"📊", chapitres:[
        { id:"t3m0", nom:"Moyenne et représentations", items:["Calculer une moyenne"] }
      ]},
      { id:"t4", label:"Plan et espace", icone:"📐", chapitres:[
        { id:"t4m0", nom:"Volumes et vecteurs", items:["Calculer le volume d'un cube, d'un pavé droit et d'un cylindre","Construire le produit d'un vecteur par un nombre"] }
      ]}
    ]
  },
  upe2a: {
    label: "UPE2A", icone: "🌍",
    themes: [
      { id:"u0", label:"Nombres et opérations", icone:"🔢", chapitres:[
        { id:"u0m0", nom:"Entiers et décimaux", items:["Lire, écrire, comparer des entiers","Lire, écrire, comparer des décimaux","Opérations sur les entiers (+, −, ×, ÷)","Opérations sur les décimaux","Ordre de grandeur et estimation"] },
        { id:"u0m1", nom:"Fractions et pourcentages", items:["Comprendre et écrire des fractions simples","Calculer une fraction d'un entier","Exprimer et utiliser un pourcentage simple"] }
      ]},
      { id:"u1", label:"Espace et géométrie", icone:"📐", chapitres:[
        { id:"u1m0", nom:"Figures planes et repérage", items:["Reconnaître et nommer les figures planes usuelles","Calculer périmètre et aire d'un rectangle et d'un triangle","Repérer un point dans un quadrillage (coordonnées)","Notion d'angle et mesure en degrés"] },
        { id:"u1m1", nom:"Solides et mesures", items:["Reconnaître des solides simples (cube, pavé, cylindre)","Convertir des unités de longueur et de masse"] }
      ]},
      { id:"u2", label:"Grandeurs et mesures", icone:"📏", chapitres:[
        { id:"u2m0", nom:"Temps et money", items:["Lire et calculer des durées","Lire une horloge et un calendrier","Calculer avec des prix, de la monnaie"] }
      ]},
      { id:"u3", label:"Données et proportionnalité", icone:"📊", chapitres:[
        { id:"u3m0", nom:"Lecture de données", items:["Lire un tableau de données","Lire un diagramme ou graphique simple","Calculer une moyenne simple","Notion de proportionnalité et tableau de proportionnalité"] }
      ]},
      { id:"u4", label:"Calcul littéral et logique", icone:"✏️", chapitres:[
        { id:"u4m0", nom:"Expressions et équations", items:["Calculer la valeur d'une expression simple","Résoudre x + a = b et a × x = b","Comprendre et utiliser un programme de calcul simple"] }
      ]}
    ]
  }
};

// Génère la liste plate des items avec leurs clés
function getAllItems(niveauKey) {
  const niveau = CURRICULUM[niveauKey];
  if (!niveau) return [];
  const items = [];
  niveau.themes.forEach(th => {
    th.chapitres.forEach(ch => {
      ch.items.forEach((item, i) => {
        items.push({ key: `${ch.id}_${i}`, label: item, chapitre: ch.nom, theme: th.label, chapitreId: ch.id, themeId: th.id });
      });
    });
  });
  return items;
}
