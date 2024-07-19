import styles from './country-page.module.css'
import LogoIcon from './assets/Logo.svg'
import SearchField from './components/search-field/search-field'
import useCustomSelect from './hooks/use-select-field/select-field'
import MultipleSelect from './components/multiple-select/multiple-select'
import { CustomCheckbox } from './components/custom-checkbox/custom-checkbox'
import {
  CountriesContextProvider,
  useCountries,
} from './context/country-context'
import CountryTable from './components/country-table/country-table'
import { Link, Outlet, useParams } from 'react-router-dom'

export default function CountryPage() {
  return (
    <CountriesContextProvider>
      <CountryComponent />
    </CountriesContextProvider>
  )
}

function CountryComponent() {
  const { country } = useParams()
  const { countriesFound } = useCountries()
  const { SelectField, setOpen } = useCustomSelect([
    'Population',
    'Alphabeticall Order',
    'Area (km²)',
  ])
  return (
    <div
      className={styles.countryPageBackground}
      onClick={() => setOpen(false)}
    >
      <section className={styles.container}>
        <header className={styles.header}>
          <Link to={'/country-page'}>
            <LogoIcon />
          </Link>
        </header>
        <div className={styles.contentWrapper}>
          {!country && (
            <main className={styles.mainContent}>
              <div className={styles.contentHeader}>
                <p className={`${styles.countriesFound} ${styles.mediumText}`}>
                  Found {countriesFound} countries
                </p>
                <SearchField />
              </div>
              <div className={styles.content}>
                <div className={styles.sidebar}>
                  <SelectField />
                  <MultipleSelect
                    label="Region"
                    options={[
                      'Americas',
                      'Antarctic',
                      'Africa',
                      'Asia',
                      'Europe',
                      'Oceania',
                    ]}
                  />
                  <CustomCheckbox
                    label="Status"
                    options={['Member of the United Nations', 'Independent']}
                  />
                </div>
                <CountryTable />
              </div>
            </main>
          )}
          <Outlet />
        </div>
      </section>
    </div>
  )
}
