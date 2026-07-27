export interface Testimonial {
  author: string
  quote: string
  rating: number
}

/**
 * ⚠️ DONNÉES STATIQUES, PAS DYNAMIQUES — ce fichier n'interroge aucune API (ni Google, ni
 * autre) et ne se met jamais à jour tout seul. C'est un instantané pris le 26/07/2026 sur
 * l'annuaire opticiensparconviction.fr, qui affiche les avis vérifiés (note + date d'achat)
 * d'Optique Ogimont (Baisieux) :
 * https://www.opticiensparconviction.fr/votre-opticien-a-baisieux/optique-ogimont
 *
 * Sur les 5 avis les plus récents à cette date (tous 5/5), seuls ces 3 comportaient un
 * commentaire écrit — les 2 autres n'avaient qu'une note sans texte, je ne les ai pas
 * inventés. Le format (note + date + "date d'achat") suggère un système d'avis vérifiés
 * propre au réseau d'opticiens, pas forcément Google Avis lui-même.
 *
 * Pour rester à jour, il faut revenir sur cette page de temps en temps et mettre à jour
 * la liste ci-dessous à la main.
 */
export const testimonials: Testimonial[] = [
  {
    author: 'Laetitia B.',
    quote:
      "Une équipe au top, disponible, professionnelle et très agréable ! C'est toujours un vrai plaisir d'entrer dans la boutique, où l'on se sent accueilli de manière totalement personnalisée.",
    rating: 5
  },
  {
    author: 'Serge B.',
    quote: 'Très satisfait de notre accueil.',
    rating: 5
  },
  {
    author: 'Regine B.',
    quote: 'Très bon accueil.',
    rating: 5
  }
]

// Lien "laisser un avis" : recherche Google Maps (pas besoin de Place ID, fonctionne
// toujours). Le client arrive sur la fiche de la boutique puis clique sur "Avis".
export const reviewLink =
  "https://www.google.com/maps/search/?api=1&query=Optique+Ogimont+32+Avenue+d'Ogimont+Baisieux"
