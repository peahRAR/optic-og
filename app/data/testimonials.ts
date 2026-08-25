export interface Testimonial {
  quote: string
  date: string
  rating: number
}

/**
 * ⚠️ DONNÉES STATIQUES, PAS DYNAMIQUES — ce fichier n'interroge aucune API (ni Google, ni
 * autre) et ne se met jamais à jour tout seul. Avis repris mot pour mot depuis des captures
 * d'avis Google publiées par Zoom Optique Cysoing lui-même sur zoomoptique.com (consultées
 * le 24/08/2026) — pas d'auteur affiché sur les captures sources, donc pas de nom inventé
 * ici, seulement la date réelle indiquée par chaque avis.
 * Pour rester à jour, revenir sur zoomoptique.com (ou directement sur la fiche Google) de
 * temps en temps et mettre à jour la liste ci-dessous à la main.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "Super opticien ! J'ai été accompagné de A à Z, de ma recherche de monture (assez précise et exigeante qui plus est !), jusqu'à la réalisation et la sélection des verres, en fonction de mes prises en charge, mes besoins et tout le reste ! Je recommande fortement, l'équipe est sympathique et soucieuse de bien faire, j'y reviendrai sans hésiter.",
    date: 'Décembre 2024',
    rating: 5
  },
  {
    quote:
      "Un accueil chaleureux et très sympathique. Le choix est très varié, les conseils de Pascal et de sa femme sont avisés et personnalisés. Une adresse locale, à prix contenus, que je recommande vivement lors de votre recherche de lunettes de vue ou solaires.",
    date: 'Octobre 2024',
    rating: 5
  },
  {
    quote:
      "Une très chouette équipe, vraiment aux petits soins pour ses clients ! Merci pour le dépannage cet été pour monture enfant cassée. Des produits au top de l'innovation : montures souples, de sport, verres Myosmart ou Essilor. Du choix et de précieux conseils.",
    date: 'Septembre 2024',
    rating: 5
  }
]

// Lien "laisser un avis" : recherche Google Maps (pas besoin de Place ID, fonctionne
// toujours). Le client arrive sur la fiche de la boutique puis clique sur "Avis".
export const reviewLink =
  'https://www.google.com/maps/search/?api=1&query=Zoom+Optique+Cysoing+100C+rue+de+la+Savonniere+Cysoing'
