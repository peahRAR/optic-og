export interface Brand {
  name: string
  /** Chemin du logo dans public/img/brands, ou undefined si aucun asset propre n'a été trouvé (fallback texte). */
  logo?: string
  /** Logo clair uniquement lisible sur fond sombre (ex: V.Design, blanc sur transparent). */
  onDark?: boolean
  /** Badge/écusson dense (texte fin, détails) qui a besoin de plus de hauteur pour rester lisible. */
  dense?: boolean
}

export const brands: Brand[] = [
  { name: 'Azzaro', logo: '/img/brands/azzaro.png' },
  { name: 'Jaguar', logo: '/img/brands/jaguar.svg' },
  { name: 'Ray-Ban', logo: '/img/brands/ray-ban.svg' },
  { name: 'Morgan', logo: '/img/brands/morgan.png' },
  { name: 'Vicomte Arthur', logo: '/img/brands/vicomte-arthur.svg' },
  { name: 'Nike', logo: '/img/brands/nike.svg' },
  { name: 'Gucci', logo: '/img/brands/gucci.svg' },
  { name: 'Chloé', logo: '/img/brands/chloe.svg' },
  { name: "In'Bô", logo: '/img/brands/in-bo.png', dense: true },
  { name: 'Superdry', logo: '/img/brands/superdry.svg' },
  { name: 'Chantal Thomass' }, // pas de logo officiel fiable trouvé — fallback texte
  { name: 'Carrera', logo: '/img/brands/carrera.svg' },
  { name: 'Osmose', logo: '/img/brands/osmose.png' },
  { name: 'V. Design', logo: '/img/brands/v-design.png', onDark: true },
]
