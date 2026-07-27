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
      'Un partenariat de confiance avec les laboratoires Essilor et Novacel, pour une correction précise et des verres adaptés à votre usage.',
  },
  {
    icon: 'gridicons:visible',
    title: 'Lentilles',
    description:
      'Renouvellement simple par téléphone, fax ou directement en ligne, sans avancer vos frais lorsque votre mutuelle le permet.',
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
    title: 'Dépistage visuel gratuit',
    description: 'Un contrôle rapide en magasin au réfracteur automatique, sans rendez-vous.',
  },
  {
    icon: 'ph:shield-check',
    title: 'SAV & garanties',
    description:
      'Garantie casse montures 2 ans sans franchise ni limite de nombre, verres garantis casse (franchise 50 % remboursable Sécu/mutuelle), et équipement mal adapté modifié ou échangé sous 1 mois.',
  },
  {
    icon: 'ph:hand-heart',
    title: 'Tiers payant',
    description: 'Sécurité sociale systématique et prise en charge de nombreuses mutuelles, sans avance de frais.',
  },
]

export const secondPairOffer = {
  eyebrow: 'Offre',
  title: 'La 2ᵉ paire à partir de 1€',
  description:
    "Pour l'achat d'une monture optique neuve et d'une paire de verres, la 2ᵉ paire (en verres blancs ou solaires, non amincis et sans traitement, monture au choix parmi une sélection en magasin) est à partir de 1€.",
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
    description: 'Verres blancs ou solaires, non amincis et sans traitement, pour 1€ seulement.'
  }
]

export const inbo = {
  eyebrow: "Nouveauté",
  title: "In'Bô, des lunettes en bois made in Vosges",
  description:
    "Conçues et fabriquées à 100 % en atelier dans les Vosges, les montures In'Bô conjuguent circuit court, savoir-faire traditionnel du bois et technologies modernes. Une pièce unique, légère et chaleureuse.",
}
