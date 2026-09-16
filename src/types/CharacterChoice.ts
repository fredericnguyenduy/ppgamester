export const SEX_CHOICES = ['F', 'M'] as const

export type SexChoice = (typeof SEX_CHOICES)[number]

export type CharacterLayer = {
  file: string
  x: number
  y: number
  size: number
  zIndex: number
}

export type CharacterChoice = {
  sex: SexChoice | null
  layers: CharacterLayer[]
}
