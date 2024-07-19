import { Link } from 'react-router-dom'
import { useCountries } from '../../context/country-context'
import styles from './country-table.module.css'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

export default function CountryTable() {
  const { filteredCountries, countriesFound } = useCountries()
  const [currentPage, setCurrentPage] = useState(0)
  const [pages, setPages] = useState<null | number>(null)
  const countriesPerPage = 12

  useEffect(() => {
    if (countriesFound) {
      const numberOfPages = Math.ceil(countriesFound / countriesPerPage)
      setPages(numberOfPages)
    }
  }, [countriesFound])

  return filteredCountries && filteredCountries.length ? (
    <div className={styles.countryContainer}>
      <table className={styles.countryTable}>
        <thead className={styles.tableHead}>
          <tr className={styles.tableRow}>
            <th className={styles.tableHeader}>Flag</th>
            <th className={styles.tableHeader}>Name</th>
            <th className={styles.tableHeader}>Population</th>
            <th className={`${styles.tableHeader} ${styles.tableHeaderArea}`}>
              Area (km²)
            </th>
            <th className={`${styles.tableHeader} ${styles.tableHeaderRegion}`}>
              Region
            </th>
          </tr>
        </thead>

        <tbody className={styles.tableBody}>
          {filteredCountries.length &&
            filteredCountries
              .slice(
                currentPage * countriesPerPage,
                currentPage * countriesPerPage + countriesPerPage
              )
              .map((country) => (
                <tr className={styles.tableRow} key={country.name.official}>
                  <td className={styles.tableData}>
                    <img
                      src={country.flags.png}
                      alt={country.flags.alt}
                      className={styles.tableImg}
                    />
                  </td>
                  <td className={styles.tableData}>
                    <Link
                      className={styles.countryName}
                      to={country.name.common}
                    >
                      {country.name.common}{' '}
                    </Link>
                  </td>
                  <td className={`${styles.tableData} ${styles.collapsed}`}>
                    {country.population.toLocaleString()}
                  </td>
                  <td
                    className={`${styles.tableData} ${styles.tableDataArea} ${styles.collapsed}`}
                  >
                    {country.area.toLocaleString()}
                  </td>
                  <td
                    className={`${styles.tableData} ${styles.tableDataRegion}`}
                  >
                    {country.region}
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
      <TablePagination
        pages={pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  ) : (
    <p className={styles.notFound}>Nothing was found</p>
  )
}

function TablePagination({
  pages,
  currentPage,
  setCurrentPage,
}: {
  pages: number | null
  currentPage: number
  setCurrentPage: Dispatch<SetStateAction<number>>
}) {
  return (
    <div className={styles.pagination}>
      {pages &&
        pages > 1 &&
        [...Array(pages)].map((_, i) => (
          <div
            className={`${styles.pageButton} ${
              currentPage === i ? styles.active : ''
            }`}
            key={i}
            onClick={() => setCurrentPage(i)}
          >
            {i + 1}
          </div>
        ))}
    </div>
  )
}
