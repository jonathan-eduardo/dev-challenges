import { useState } from 'react'
import styles from './select-field.module.css'
import ExpandIcon from '../../assets/Expand_down.svg'
import { useCountries } from '../../context/country-context'

export default function useCustomSelect(options: string[]) {
  const [open, setOpen] = useState(false)

  function SelectField() {
    const { sortType, setSortType } = useCountries()

    function handleOption(option: string) {
      setSortType(option)
      setOpen(false)
    }

    function handleClick(e: React.BaseSyntheticEvent) {
      e.stopPropagation()
      setOpen(!open)
    }
    return (
      <div className={styles.selectContainer}>
        <p className={styles.selectLabel}>Sort by</p>
        <div className={styles.selected} onClick={handleClick}>
          <span className={styles.selectedOption}>{sortType}</span>
          <span className={`${styles.selectIcon} ${open ? styles.open : ''}`}>
            <ExpandIcon />
          </span>
        </div>

        {open && (
          <ul className={styles.selectOptions}>
            {options.length &&
              options.map((option) => (
                <li
                  key={option}
                  className={styles.selectOption}
                  onClick={() => handleOption(option)}
                >
                  {option}
                </li>
              ))}
          </ul>
        )}
      </div>
    )
  }

  return {
    SelectField,
    setOpen,
  }
}
