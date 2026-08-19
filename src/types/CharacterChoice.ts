export const SEX_CHOICES = ['F', 'M'] as const

export type SexChoice = (typeof SEX_CHOICES)[number]

export type CharacterChoice = {
  sex: SexChoice | null
  headIndex: number
  bodyIndex: number
  feetIndex: number
}
