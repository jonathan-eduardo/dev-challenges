import { useEffect, useState } from 'react'
import styles from './use-custom-select.module.css'
import ExpandIcon from '../assets/Expand_down.svg'

type SelectProps = {
  label: string
  value: string
}

export default function useCustomSelect(
  options: SelectProps[],
  language: string,
  setLanguage: (language: string) => void
) {
  const [open, setOpen] = useState(false)
  const [selectOption, setSelectOption] = useState('')

  useEffect(() => {
    if (language && options.length) {
      const selectedLanguage = options.filter(
        (lang) => lang.value === language
      )[0]

      if (selectedLanguage) {
        setSelectOption(selectedLanguage.label)
      }
    }
  }, [language, options])

  useEffect(() => {
    if (options.length && !selectOption) {
      setSelectOption(options[0].label)
    }
  }, [options, selectOption])

  function handleOption(option: SelectProps) {
    setSelectOption(option.label)
    setLanguage(option.value)
    setOpen(false)
  }

  function handleClick(e: React.BaseSyntheticEvent) {
    e.stopPropagation()
    setOpen(!open)
  }

  function handleSelectClass() {
    const isOptionSelected = options
      .map((option) => option.value)
      .includes(language)
    return isOptionSelected ? styles.active : ''
  }

  function CustomSelect() {
    return (
      <div
        className={`${styles.customSelect} ${handleSelectClass()}`}
        onClick={handleClick}
      >
        <div className={styles.selected}>
          <span className={styles.label}>{selectOption}</span>
          <span className={`${styles.selectIcon} ${open ? styles.open : ''}`}>
            <ExpandIcon />
          </span>
        </div>
        {open && (
          <ul className={styles.options} id="custom-select">
            {options.length &&
              options.map((option, index) => (
                <li
                  key={index}
                  className={styles.customSelectOption}
                  onClick={() => handleOption(option)}
                >
                  {option.label}
                </li>
              ))}
          </ul>
        )}
      </div>
    )
  }

  return {
    CustomSelect,
    setOpen,
  }
}
