import { BaseSyntheticEvent } from 'react'
import styles from './custom-checkbox.module.css'
import { useCountries } from '../../context/country-context'

export function CustomCheckbox({
  label,
  options,
}: {
  label: string
  options: string[]
}) {
  const { status, setStatus } = useCountries()

  function handleChange(event: BaseSyntheticEvent) {
    const { checked, value } = event.target
    if (checked) {
      setStatus([...status, value])
    } else {
      setStatus(status.filter((option) => option !== value))
    }
  }

  function handleChecked(option: string) {
    return status.includes(option)
  }

  return (
    <div className={styles.customCheckboxContainer}>
      <span className={styles.customCheckboxLabel}>{label}</span>
      <div className={styles.customCheckboxOptions}>
        {options &&
          options.map((option) => (
            <label htmlFor={option} key={option} className={styles.optionLabel}>
              <input
                id={option}
                type="checkbox"
                className={styles.optionInput}
                value={option}
                checked={handleChecked(option)}
                onChange={handleChange}
              />
              {option}
            </label>
          ))}
      </div>
    </div>
  )
}
