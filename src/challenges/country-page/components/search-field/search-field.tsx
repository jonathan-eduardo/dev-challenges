import SearchIcon from '../../assets/Search.svg'
import styles from './search-field.module.css'
import baseStyles from '../../country-page.module.css'
import { useCountries } from '../../context/country-context'

export default function SearchField() {
  const { search, setSearch } = useCountries()

  return (
    <div className={styles.search}>
      <span className={styles.searchIcon}>
        <SearchIcon />
      </span>
      <input
        className={`${styles.searchInput} ${baseStyles.smallText}`}
        type="text"
        id="searchField"
        name="searchField"
        placeholder="Search by Name, Region, Subregion"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  )
}
