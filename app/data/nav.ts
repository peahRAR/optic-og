export interface NavLink {
  label: string
  href: string
}

/** Ancres de la page unique (one-page) — voir choix d'architecture en tête de projet. */
export const navLinks: NavLink[] = [
  { label: 'La boutique', href: '/#boutiques' },
  { label: 'Boutique en ligne', href: '/boutique' },
  { label: '2e paire à 1€', href: '/#offre' },
  { label: 'Contact', href: '/#contact' }
]
