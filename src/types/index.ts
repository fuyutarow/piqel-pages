
export const langs = [
  'CLI',
  'Rust',
  'Python',
  'JavaScript',
] as const

export type Langs = typeof langs[number]
