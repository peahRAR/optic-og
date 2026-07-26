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
    question: 'Quelles sont vos garanties et le SAV ?',
    answer:
      "Les montures sont garanties casse pendant 2 ans, sans franchise ni limite de nombre. Les verres sont eux aussi garantis casse sur la même durée (franchise de 50 % remboursable par la Sécu ou votre mutuelle). Et si votre équipement n'est finalement pas adapté, nous le modifions ou l'échangeons sous 1 mois."
  },
  {
    question: 'Comment renouveler mes lentilles ?',
    answer:
      "Simplement : par téléphone, par fax, ou directement depuis la rubrique dédiée de ce site. Pas besoin de repasser en boutique pour un renouvellement classique."
  },
  {
    question: "En quoi consiste l'offre 2ᵉ paire à partir de 1€ ?",
    answer:
      "Pour l'achat d'une monture optique neuve avec une paire de verres, la 2ᵉ paire est à partir de 1€. Elle est composée de verres blancs ou solaires, non amincis et sans traitement, avec une monture à choisir parmi une sélection dédiée en magasin."
  },
  {
    question: 'Faites-vous du dépistage visuel ?',
    answer:
      "Oui, un dépistage visuel gratuit est proposé en magasin au réfracteur automatique, sans rendez-vous. C'est un repère utile, qui ne remplace pas un examen ophtalmologique complet."
  },
  {
    question: "Proposez-vous l'optique à domicile ?",
    answer:
      "Oui : une opticienne diplômée d'État se déplace chez vous, sur secteur, avec un large choix de produits et nos offres commerciales. Prise de rendez-vous au 07 49 38 64 02."
  },
  {
    question: 'Quelles marques proposez-vous ?',
    answer:
      "Notre indépendance nous permet de sélectionner librement les modèles les plus attrayants : Azzaro, Jaguar, Ray-Ban, Morgan, Vicomte Arthur, Nike, Gucci, Chloé, In'Bô, Superdry, Chantal Thomass, Carrera, Osmose, V. Design, et bien d'autres."
  }
]
