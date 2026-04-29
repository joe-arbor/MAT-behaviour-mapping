import { BEHAVIOUR_CATEGORY_OPTIONS } from './behaviourCategoryOptions';

/**
 * Plain-language descriptions for Arbor default categories only (PROJECT_CONTEXT.md).
 * Keys match `BEHAVIOUR_CATEGORY_OPTIONS` `value` strings exactly.
 */
export const ARBOR_CATEGORY_DESCRIPTIONS: Record<string, string> = {
  Respect: 'Showing consideration and courtesy to others.',
  Responsibility: 'Demonstrating accountability for actions and work.',
  Resilience: 'Persisting through challenges or setbacks.',
  Kindness: 'Supporting and helping others through positive actions.',
  Cooperation: 'Working effectively with peers and staff.',
  Leadership: 'Taking initiative and setting a positive example.',
  'Positive Attitude': 'Displaying optimism and enthusiasm in learning or school life.',
  'Community Contribution': 'Making a positive impact within or beyond the school community.',
  Disruption: 'Interrupting learning or distracting others.',
  'Defiance / Non-Compliance': 'Refusing to follow rules or instructions.',
  Disrespect: 'Rude or inappropriate conduct towards staff or peers.',
  'Inappropriate Language': 'Use of offensive, discriminatory, or explicit language.',
  Bullying: 'Repeated, targeted behaviour intending to harm or intimidate.',
  'Discriminatory Behaviour': 'Racism, sexism, homophobia, or prejudice-based conduct.',
  Dishonesty: 'Lying, cheating, or deliberate deception.',
  'Vandalism / Damage to Property': 'Damaging school or personal belongings.',
  'Physical Aggression': 'Hitting, pushing, or other harmful physical acts.',
  'Non-Physical Aggression': 'Threatening, intimidating, or verbally hostile behaviour.',
  'Inappropriate Use of Technology': 'Misuse of devices or online platforms.',
  'Truancy / Lateness': 'Missing lessons or arriving late without reason.',
  'Poor Preparedness': 'Lack of equipment, homework, or readiness to learn.',
  'Substance Use / Possession': 'Possessing or using tobacco, vaping, alcohol, or drugs.',
  'Sexual Misconduct / Harassment': 'Inappropriate or harmful sexual behaviour.',
};

const BEHAVIOUR_CATEGORY_INDEX = new Map(
  BEHAVIOUR_CATEGORY_OPTIONS.map((option, index) => [option.value, index]),
);

export function getCategorySentiment(category: string): string {
  const index = BEHAVIOUR_CATEGORY_INDEX.get(category);
  if (index == null) return '';
  return index < 8 ? 'Positive' : 'Negative';
}

export function getCategorySortIndex(category: string): number {
  return BEHAVIOUR_CATEGORY_INDEX.get(category) ?? Number.MAX_SAFE_INTEGER;
}

