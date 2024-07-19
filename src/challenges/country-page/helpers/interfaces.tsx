type Currency = {
  name: string
  symbol: string
}

type Currencies = {
  [key: string]: Currency
}

type Languages = {
  [key: string]: string
}

export interface Country {
  name: { official: string; common: string }
  capital: string[]
  flags: { png: string; alt: string }
  population: number
  area: number
  region: string
  subregion: string
  unMember: boolean
  independent: boolean
  currencies: Currencies
  languages: Languages
  continents: string[]
  borders: string[]
}
