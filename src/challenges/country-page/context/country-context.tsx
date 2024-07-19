import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'
import { Country } from '../helpers/interfaces'

type ICountriesContext = {
  filteredCountries: Country[] | null
  countriesFound: number | undefined
  sortType: string
  setSortType: Dispatch<SetStateAction<string>>
  regions: string[]
  setRegions: Dispatch<SetStateAction<string[]>>
  status: string[]
  setStatus: Dispatch<SetStateAction<string[]>>
  search: string
  setSearch: Dispatch<SetStateAction<string>>
}

// eslint-disable-next-line
const CountriesContext = createContext<ICountriesContext | null>(null)

export const useCountries = () => {
  const context = useContext(CountriesContext)
  if (context === null) {
    throw new Error('useContext must be used within a Provider')
  }
  return context
}

export function CountriesContextProvider({
  children,
}: {
  children: ReactNode
}) {
  const [sortType, setSortType] = useState('Population')
  const [countries, setCountries] = useState<Country[] | null>(null)
  const [regions, setRegions] = useState<string[]>([])
  const [status, setStatus] = useState<string[]>([])
  const [search, setSearch] = useState('')
  const [filteredCountries, setFilteredCountries] = useState<Country[] | null>(
    null
  )

  function sortCountries(countryList: Country[], type: string) {
    const sortedCountries = [...countryList]
    if (type === 'Population') {
      sortedCountries.sort((a, b) => b.population - a.population)
    } else if (type === 'Alphabeticall Order') {
      sortedCountries.sort((a, b) => a.name.common.localeCompare(b.name.common))
    } else if (type === 'Area (km²)') {
      sortedCountries.sort((a, b) => b.area - a.area)
    }
    return sortedCountries
  }

  function filterCountries(
    countryList: Country[],
    regionsList: string[],
    statusList: string[],
    search: string
  ) {
    let filtered = [...countryList]

    if (regionsList.length) {
      filtered = filtered.filter(({ region }) => regionsList.includes(region))
    }

    if (statusList.length) {
      if (statusList.includes('Member of the United Nations'))
        filtered = filtered.filter((country) => country.unMember)
      if (statusList.includes('Independent'))
        filtered = filtered.filter((country) => country.independent)
    }

    if (search) {
      const regex = new RegExp(search, 'gi')
      filtered = filtered.filter((country) => {
        return (
          country.name.common.match(regex) ||
          country.name.official.match(regex) ||
          country.region.match(regex) ||
          country.subregion.match(regex)
        )
      })
    }

    return filtered
  }

  useEffect(() => {
    if (countries && countries.length) {
      const sorted = sortCountries(countries, sortType)
      const filtered = filterCountries(sorted, regions, status, search)
      setFilteredCountries(filtered)
    }
  }, [sortType, countries, setFilteredCountries, regions, status, search])

  useEffect(() => {
    async function fetchData() {
      const fields = [
        'flags',
        'name',
        'independent',
        'unMember',
        'region',
        'subregion',
        'area',
        'population',
      ].join(',')
      const baseUrl = 'https://restcountries.com/v3.1/all'
      const endpoint = `${baseUrl}?fields=${fields}`
      const response = await fetch(endpoint)
      const data = await response.json()
      setCountries(data)
    }
    fetchData()
  }, [])

  return (
    <CountriesContext.Provider
      value={{
        filteredCountries,
        countriesFound: filteredCountries?.length,
        sortType,
        setSortType,
        regions,
        setRegions,
        status,
        setStatus,
        search,
        setSearch,
      }}
    >
      {children}
    </CountriesContext.Provider>
  )
}
