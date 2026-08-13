export type OnboardingIllustrationKind =
  | 'confused'
  | 'idea'
  | 'ready'
  | 'discover';

export type OnboardingSlideData = {
  accessibilityLabel: string;
  description: string;
  headline: string;
  id: string;
  illustration: OnboardingIllustrationKind;
};

export const onboardingSlides: OnboardingSlideData[] = [
  {
    accessibilityLabel:
      'A friend looks unsure while thoughts about distance, price, and where to go float around them.',
    description: "Finding a place everyone likes shouldn't take forever.",
    headline: 'Saan tayo?',
    id: 'problem',
    illustration: 'confused',
  },
  {
    accessibilityLabel:
      'The same friend smiles, points ahead, and gets an idea under a glowing light bulb.',
    description:
      "Tell us your budget, mood, and what kind of tambayan you're looking for.",
    headline: 'May idea ako!',
    id: 'idea',
    illustration: 'idea',
  },
  {
    accessibilityLabel:
      'The friend turns toward possible cafés, parks, food spots, and activities, ready to invite the barkada.',
    description:
      "We'll match you with places that fit your vibe, budget, and travel preferences.",
    headline: 'Tara?',
    id: 'ready',
    illustration: 'ready',
  },
  {
    accessibilityLabel:
      'The friend confidently holds a phone showing Saan Tayo while destination ideas surround the barkada.',
    description:
      'Discover places, compare your options, and make plans with your barkada.',
    headline: 'May tambayan na!',
    id: 'discover',
    illustration: 'discover',
  },
];
