export interface FaqItem {
  question: string
  answer: string
}

export const faq: FaqItem[] = [
  {
    question: 'Proposez-vous le tiers payant ?',
    answer:
      "Oui. La Sécurité sociale est systématiquement appliquée en tiers payant, et nous travaillons avec de nombreuses mutuelles : dans la majorité des cas, vous n'avancez pas les frais couverts par votre contrat."
  },
  {
    question: "En quoi consiste l'offre 2ᵉ paire à 1€ ?",
    answer:
      "Pour l'achat d'une monture optique neuve avec une paire de verres, la 2ᵉ paire est à 1€, même avec des verres progressifs solaires. Monture à choisir parmi une sélection dédiée en magasin."
  },
  {
    question: 'Comment renouveler mes lentilles ?',
    answer:
      "Simplement : par téléphone, ou directement depuis la rubrique dédiée de ce site, à des tarifs compétitifs. Pas besoin de repasser en boutique pour un renouvellement classique."
  },
  {
    question: "Êtes-vous un opticien indépendant ou une enseigne ?",
    answer:
      "Nous sommes un magasin indépendant, mais nous travaillons regroupés avec plus de 2000 opticiens indépendants du réseau Zoom Optique : cela nous donne une force de vente équivalente aux grandes enseignes (tarifs, offre 2e paire...), tout en gardant notre liberté dans le choix de nos montures, de nos verres et de nos services, avec une ambiance familiale."
  },
  {
    question: 'Avez-vous un espace dédié aux enfants ?',
    answer:
      "Oui, nous sommes certifiés Kid Expert : un coin dédié en boutique, une équipe formée à l'accompagnement des plus jeunes et des montures adaptées à chaque âge."
  },
  {
    question: 'Avez-vous un programme de fidélité ?',
    answer: "Oui, un programme de fidélité et de parrainage, ainsi que des facilités de paiement, sont proposés en boutique."
  }
]
