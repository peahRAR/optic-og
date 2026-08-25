export interface Expertise {
  icon: string
  title: string
  description: string
  /** CTA optionnel (ex: Lentilles -> formulaire de renouvellement dans la section Contact). */
  ctaLabel?: string
  ctaHref?: string
}

export const expertises: Expertise[] = [
  {
    icon: 'ph:sunglasses',
    title: 'Montures',
    description:
      'Notre indépendance nous laisse le choix des modèles les plus attrayants : qualité, design, mode, avec un large choix de solaires.',
  },
  {
    icon: 'iconoir:lens',
    title: 'Verres',
    description:
      "Des verres Essilor, dont la gamme Myosmart pour le contrôle de la myopie chez l'enfant, pour une correction précise et adaptée à votre usage.",
  },
  {
    icon: 'gridicons:visible',
    title: 'Lentilles',
    description:
      'Des tarifs lentilles compétitifs et un renouvellement simple par téléphone ou directement en ligne, sans avancer vos frais lorsque votre mutuelle le permet.',
    ctaLabel: 'Demander un renouvellement',
    ctaHref: '/?sujet=lentilles#contact'
  },
]

export interface ServiceItem {
  icon: string
  title: string
  description: string
}

export const services: ServiceItem[] = [
  {
    icon: 'ph:spray-bottle',
    title: 'Entretien & accessoires',
    description: 'Sprays, lingettes, loupes, chaînettes et cordons pour prendre soin de votre équipement au quotidien.',
  },
  {
    icon: 'ph:eye',
    title: 'Examen de vue',
    description: "Un espace dédié en boutique pour faire le point sur votre vue avec l'équipe.",
  },
  {
    icon: 'ph:shield-check',
    title: 'SAV & garanties',
    description:
      "Des produits garantis et un service après-vente assuré en boutique, pour un équipement adapté qui dure. Détails des garanties auprès de l'équipe.",
  },
  {
    icon: 'ph:hand-heart',
    title: 'Tiers payant',
    description: 'Sécurité sociale systématique et prise en charge de nombreuses mutuelles, sans avance de frais.',
  },
]

export const secondPairOffer = {
  eyebrow: 'Offre',
  title: 'La 2ᵉ paire à 1€',
  description:
    "Pour l'achat d'une monture optique neuve et d'une paire de verres, la 2ᵉ paire est à 1€, même avec des verres progressifs solaires.",
  disclaimer:
    'Offre valable en magasin, monture 2ᵉ paire à choisir parmi une sélection dédiée. Voir conditions complètes auprès de votre opticien.',
}

export interface SecondPairStep {
  icon: string
  title: string
  description: string
}

export const secondPairSteps: SecondPairStep[] = [
  {
    icon: 'ph:eyeglasses',
    title: 'Une 1ʳᵉ paire neuve',
    description: "Achetez une monture optique neuve accompagnée d'une paire de verres."
  },
  {
    icon: 'material-symbols:featured-seasonal-and-gifts',
    title: 'Une 2ᵉ monture au choix',
    description: 'Choisissez un modèle parmi une sélection dédiée disponible en magasin.'
  },
  {
    icon: 'ph:tag',
    title: 'Des verres inclus dès 1€',
    description: 'Verres blancs ou solaires, même progressifs, pour 1€ seulement.'
  }
]

export const kidExpert = {
  eyebrow: 'Spécialiste enfant',
  title: 'Certifiés Kid Expert, un coin dédié aux plus jeunes',
  description:
    "Un espace pensé pour les enfants, une équipe formée à l'accompagnement des plus jeunes et des montures adaptées à chaque âge. Parce que la vue des enfants mérite une attention particulière.",
}
