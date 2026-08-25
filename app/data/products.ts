export type ProductCategory = 'homme' | 'femme' | 'kids'

export interface Product {
  slug: string
  name: string
  brand: string
  category: ProductCategory
  price: number
  image: string
  description: string
}

// ⚠️ Catalogue de démonstration : vraies photos de montures (non liées à une marque en
// particulier, sourcées libres de droits sur Unsplash — licence Unsplash, usage commercial
// autorisé sans attribution requise), répétées sur plusieurs fiches, prix indicatifs. Les
// noms de marque restent un placeholder générique (voir app/data/brands.ts) à remplacer par
// le vrai stock une fois la boutique en ligne mise en place pour de vrai.
const GEO_GOLD = '/img/products/frame-geo-gold.jpg' // monture oversize dorée, ligne géométrique
const ROUND_SILVER = '/img/products/frame-round-silver.jpg' // monture ronde fine en métal argenté
const ROUND_GOLD = '/img/products/frame-round-gold.jpg' // monture ronde délicate en métal doré
const GUCCI_BLACK = '/img/products/frame-gucci-black.jpg' // seule photo de marque réelle (Gucci, visible sur la branche) — utilisée uniquement pour la fiche Gucci

export const products: Product[] = [
  {
    slug: 'ray-ban-geometrique-or',
    name: 'Géométrique Or',
    brand: 'Ray-Ban',
    category: 'homme',
    price: 179,
    image: GEO_GOLD,
    description: 'Monture oversize en métal doré, ligne géométrique affirmée. Un modèle qui ne passe pas inaperçu.'
  },
  {
    slug: 'carrera-flag-002',
    name: 'Flag 002',
    brand: 'Carrera',
    category: 'homme',
    price: 159,
    image: ROUND_SILVER,
    description: 'Monture ronde fine en métal argenté, esprit rétro. Légère et confortable pour un port toute la journée.'
  },
  {
    slug: 'jaguar-classic-33',
    name: 'Classic 33',
    brand: 'Jaguar',
    category: 'homme',
    price: 139,
    image: GEO_GOLD,
    description: 'Monture oversize dorée, silhouette géométrique sobre et affirmée. Charnières à ressort pour un confort renforcé.'
  },
  {
    slug: 'nike-vision-flow',
    name: 'Vision Flow',
    brand: 'Nike',
    category: 'homme',
    price: 129,
    image: ROUND_GOLD,
    description: 'Monture ronde légère en métal doré, esprit vintage. Bonne tenue au quotidien.'
  },
  {
    slug: 'azzaro-signature-argent',
    name: 'Signature Argent',
    brand: 'Azzaro',
    category: 'homme',
    price: 149,
    image: ROUND_SILVER,
    description: 'Monture ronde en métal argenté, ligne discrète et élégante pour un usage quotidien.'
  },
  {
    slug: 'gucci-rectangle-noire',
    name: 'Rectangle Noire',
    brand: 'Gucci',
    category: 'femme',
    price: 249,
    image: GUCCI_BLACK,
    description: "Monture rectangulaire en acétate noir mat, signature Gucci gravée sur la branche. Un modèle qui affirme le regard avec élégance."
  },
  {
    slug: 'chloe-ronde-douce',
    name: 'Ronde Douce',
    brand: 'Chloé',
    category: 'femme',
    price: 219,
    image: ROUND_GOLD,
    description: 'Monture ronde délicate en métal doré, silhouette légère et féminine, pour un rendu très naturel.'
  },
  {
    slug: 'morgan-ronde-vintage',
    name: 'Ronde Vintage',
    brand: 'Morgan',
    category: 'femme',
    price: 119,
    image: ROUND_SILVER,
    description: "Monture ronde fine en métal argenté, esprit rétro chic et abordable."
  },
  {
    slug: 'vicomte-arthur-oversize',
    name: 'Oversize Dorée',
    brand: 'Vicomte Arthur',
    category: 'femme',
    price: 135,
    image: GEO_GOLD,
    description: 'Monture oversize en métal doré, ligne géométrique précieuse et affirmée.'
  },
  {
    slug: 'superdry-tokyo',
    name: 'Tokyo',
    brand: 'Superdry',
    category: 'femme',
    price: 99,
    image: ROUND_GOLD,
    description: "Monture ronde en métal doré, esprit vintage, légère et abordable pour un usage quotidien."
  },
  {
    slug: 'chantal-thomass-elegance',
    name: 'Élégance',
    brand: 'Chantal Thomass',
    category: 'femme',
    price: 229,
    image: ROUND_SILVER,
    description: 'Monture ronde fine en métal argenté, une pièce féminine et raffinée.'
  },
  {
    slug: 'osmose-eclat',
    name: 'Éclat',
    brand: 'Osmose',
    category: 'femme',
    price: 109,
    image: GEO_GOLD,
    description: 'Monture oversize dorée, ligne géométrique lumineuse et affirmée.'
  },
  {
    slug: 'v-design-junior-rex',
    name: 'Junior Rex',
    brand: 'V. Design',
    category: 'kids',
    price: 79,
    image: ROUND_GOLD,
    description: "Monture enfant ronde et légère, pensée pour résister à la cour de récré. Certifié Kid Expert."
  },
  {
    slug: 'nike-kids-dash',
    name: 'Kids Dash',
    brand: 'Nike',
    category: 'kids',
    price: 89,
    image: GEO_GOLD,
    description: 'Monture enfant flexible, silhouette affirmée, adaptée aux plus actifs. Certifié Kid Expert.'
  },
  {
    slug: 'superdry-mini-wave',
    name: 'Mini Wave',
    brand: 'Superdry',
    category: 'kids',
    price: 75,
    image: ROUND_SILVER,
    description: "Petite monture ronde et légère pour les plus jeunes. Certifié Kid Expert."
  },
  {
    slug: 'jaguar-junior-classic',
    name: 'Junior Classic',
    brand: 'Jaguar',
    category: 'kids',
    price: 85,
    image: GEO_GOLD,
    description: 'Monture enfant sobre et solide, charnières renforcées pour un usage quotidien. Certifié Kid Expert.'
  }
]
