export interface OpeningLine {
  days: string
  hours: string
}

export interface Shop {
  id: 'baisieux' | 'willems'
  name: string
  city: string
  /** Adresse formatée pour l'affichage (footer, cartes boutique). */
  address: string
  /** Champs structurés pour le schema.org PostalAddress — garder synchronisés avec `address`. */
  streetAddress: string
  postalCode: string
  phone: string
  phoneHref: string
  email?: string
  hours: OpeningLine[]
  closedDays: string
  /** URL Google Maps embed — à remplacer par la véritable adresse une fois vérifiée. */
  mapQuery: string
  logo: string
  /** Photo réelle de la boutique (intérieur ou devanture). */
  photo: string
}

export const shops: Shop[] = [
  {
    id: 'baisieux',
    name: 'Optique Ogimont',
    city: 'Baisieux',
    address: "32 Av. d'Ogimont, 59780 Baisieux",
    streetAddress: "32 Av. d'Ogimont",
    postalCode: '59780',
    phone: '03 20 67 06 48',
    phoneHref: '0320670648',
    hours: [
      { days: 'Mardi – Vendredi', hours: '9h30–12h30 / 14h30–19h00' },
      { days: 'Samedi', hours: '9h30–12h30 / 13h30–18h00' }
    ],
    closedDays: 'Dimanche & Lundi : fermé',
    mapQuery: "32 Av. d'Ogimont, 59780 Baisieux",
    logo: '/img/logo/Logo_Baisieux_2026.png',
    photo: '/img/shop/interior-1.jpg'
  },
  {
    id: 'willems',
    name: 'Optique Willems',
    city: 'Willems',
    address: '2 rue Jean Baptiste Lebas, 59780 Willems',
    streetAddress: '2 rue Jean Baptiste Lebas',
    postalCode: '59780',
    phone: '03 74 44 91 76',
    phoneHref: '0374449176',
    email: 'optique.willems@free.fr',
    hours: [
      { days: 'Mardi – Vendredi', hours: '9h30–12h00 / 14h30–19h00' },
      { days: 'Samedi', hours: '9h30–12h00 / 13h30–18h00' }
    ],
    closedDays: 'Dimanche & Lundi : fermé',
    mapQuery: '2 rue Jean Baptiste Lebas, 59780 Willems',
    logo: '/img/logo/Logo_Willems_2026.png',
    photo: '/img/shop/storefront-willems.jpg'
  }
]

export const homeVisit = {
  title: 'Optique à domicile',
  description:
    "Une opticienne diplômée d'État se déplace chez vous, sur secteur, avec un large choix de produits et nos offres commerciales.",
  phone: '07 49 38 64 02',
  phoneHref: '0749386402'
}
