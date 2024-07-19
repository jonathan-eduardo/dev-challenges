import styles from './multiple-select.module.css'
import { useCountries } from '../../context/country-context'

export default function MultipleSelect({
  label,
  options,
}: {
  label: string
  options: string[]
}) {
  const { regions, setRegions } = useCountries()

  function handleOption(option: string) {
    if (regions.includes(option)) {
      setRegions(regions.filter((active) => active !== option))
    } else {
      setRegions([...regions, option])
    }
  }

  return (
    <div className={styles.multipleSelectContainer}>
      <span className={styles.multipleSelectLabel}>{label}</span>
      <div className={styles.options}>
        {options &&
          options.map((option) => (
            <button
              key={option}
              onClick={() => handleOption(option)}
              className={`${styles.option} ${
                regions.includes(option) ? styles.selected : ''
              }`}
            >
              {option}
            </button>
          ))}
      </div>
    </div>
  )
}
