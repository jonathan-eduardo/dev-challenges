import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import styles from './country-details.module.css'
import { Country } from '../../helpers/interfaces'

export default function CountryDetails() {
  const { country } = useParams()
  const [countryData, setCountryData] = useState<Country | null>(null)
  const [borderCountries, setBorderCountries] = useState<Country[] | null>(null)

  useEffect(() => {
    async function fetchData() {
      const fields = [
        'name',
        'flags',
        'population',
        'area',
        'capital',
        'subregion',
        'languages',
        'currencies',
        'continents',
        'borders',
      ]

      const baseUrl = 'https://restcountries.com/v3.1/name'
      const endpoint = `${baseUrl}/${country}?fields=${fields.join(',')}`
      const response = await fetch(endpoint)
      const data: Country[] = await response.json()
      const selectedCountry = data.filter(
        (countryResponse) => countryResponse.name.common === country
      )
      setCountryData(selectedCountry[0])
    }
    fetchData()
  }, [country])

  useEffect(() => {
    async function fetchNeighbouringCountries() {
      const codes = countryData?.borders.join(',')
      const fields = ['flags', 'name'].join(',')
      const baseUrl = 'https://restcountries.com/v3.1/alpha'
      const endpoint = `${baseUrl}?codes=${codes}&fields=${fields}`
      const response = await fetch(endpoint)
      const data = await response.json()
      setBorderCountries(data)
    }
    if (countryData && countryData.borders.length) {
      fetchNeighbouringCountries()
    }
  }, [countryData])

  function handleLanguage(languagesObject: { [key: string]: string }) {
    return Object.values(languagesObject).join(', ')
  }

  function handleCurrencies(currencies: {
    [key: string]: { name: string; symbol: string }
  }) {
    const keys = Object.keys(currencies)
    const currencyNames = keys.map((key) => currencies[key].name)
    return currencyNames.join(', ')
  }

  return (
    <>
      {countryData && (
        <div className={styles.countryContainer}>
          <img
            src={countryData.flags.png}
            alt={countryData.flags.alt}
            className={styles.countryFlag}
          />
          <div className={styles.countryName}>
            <h1 className={styles.commonName}>{countryData.name.common}</h1>
            <p className={styles.officialName}>{countryData.name.official}</p>
          </div>
          <div className={styles.countryTags}>
            <InfoTag label="Population" value={countryData.population} />
            <InfoTag label="Area (km²)" value={countryData.area} />
          </div>
          <div className={styles.infoContainer}>
            <div className={styles.countryInfo}>
              <span>Capital</span>
              <span>
                {countryData.capital.length ? countryData.capital[0] : '-'}
              </span>
            </div>
            <div className={styles.countryInfo}>
              <span>Subregion</span>
              <span>{countryData.subregion}</span>
            </div>
            <div className={styles.countryInfo}>
              <span>Language</span>
              <span>{handleLanguage(countryData.languages)}</span>
            </div>
            <div className={styles.countryInfo}>
              <span>Currencies</span>
              <span>{handleCurrencies(countryData.currencies)}</span>
            </div>
            <div className={styles.countryInfo}>
              <span>Continents</span>
              <span>{countryData.continents.join(', ')}</span>
            </div>
          </div>
          <NeighbouringCountries borderCountries={borderCountries} />
        </div>
      )}
    </>
  )
}

function InfoTag({ label, value }: { label: string; value: number }) {
  return (
    <div className={styles.infoTag}>
      <span className={styles.infoTagLabel}>{label}</span>
      <span className={styles.infoTagValue}>{value.toLocaleString()}</span>
    </div>
  )
}

function NeighbouringCountries({
  borderCountries,
}: {
  borderCountries: Country[] | null
}) {
  return (
    <div className={styles.borderCountries}>
      {borderCountries ? (
        <p className={styles.borderCountriesLabel}>Neighbouring Countries</p>
      ) : (
        <p className={styles.borderCountriesLabel}>
          This country has no neighboring countries
        </p>
      )}
      <div className={styles.borderCountriesList}>
        {borderCountries &&
          borderCountries.map((country) => (
            <div key={country.name.common} className={styles.borderCountry}>
              <img
                src={country.flags.png}
                alt={country.flags.alt}
                className={styles.borderCountryFlag}
              />
              <Link
                to={`/country-page/${country.name.common}`}
                className={styles.borderCountryName}
              >
                {country.name.common}
              </Link>
            </div>
          ))}
      </div>
    </div>
  )
}
