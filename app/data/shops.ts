export interface OpeningLine {
  days: string
  hours: string
}

export interface Shop {
  id: 'cysoing'
  name: string
  city: string
  /** Adresse formatée pour l'affichage (footer, carte boutique). */
  address: string
  /** Champs structurés pour le schema.org PostalAddress — garder synchronisés avec `address`. */
  streetAddress: string
  postalCode: string
  phone: string
  phoneHref: string
  email?: string
  hours: OpeningLine[]
  closedDays: string
  /** URL Google Maps embed. */
  mapQuery: string
  /** Photo réelle de la boutique (intérieur). */
  photo: string
}

// Boutique unique (contrairement au modèle d'origine à 2 boutiques) : Zoom Optique Cysoing
// n'a qu'un seul point de vente, dans la galerie marchande Intermarché. `shops` reste un
// tableau (même à 1 élément) pour ne pas casser les composants qui itèrent dessus
// (ContactSection, TheFooter, le schema.org LocalBusiness dans index.vue).
export const shops: Shop[] = [
  {
    id: 'cysoing',
    name: 'Zoom Optique Cysoing',
    city: 'Cysoing',
    address: '100C rue de la Savonnière (CC Intermarché), 59830 Cysoing',
    streetAddress: '100C rue de la Savonnière',
    postalCode: '59830',
    phone: '03 20 79 42 96',
    phoneHref: '0320794296',
    email: 'contact@zoomoptique.fr',
    hours: [
      { days: 'Lundi – Jeudi', hours: '9h30–12h30 / 14h30–19h00' },
      { days: 'Vendredi', hours: '9h30–19h00' },
      { days: 'Samedi', hours: '9h30–18h00' }
    ],
    closedDays: 'Dimanche : fermé',
    mapQuery: '100C rue de la Savonnière, 59830 Cysoing',
    photo: '/img/shop/interior-1.jpg'
  }
]
