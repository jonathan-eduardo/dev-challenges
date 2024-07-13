import { UserInfo } from '../helpers/user-interfaces'
import { ChangeEvent, useState } from 'react'
import styles from './search-field.module.css'
import SearchIcon from '../assets/Search.svg'

type SearchFieldProps = {
  value: string
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
  searchResult: UserInfo | null
  showResult: () => void
  profileActive: boolean
}

export default function SearchField({
  value,
  handleChange,
  searchResult,
  showResult,
  profileActive,
}: SearchFieldProps) {
  const [active, setActive] = useState(false)

  return (
    <div className={styles.searchField}>
      <div className={`${styles.inputWrapper} ${active ? styles.active : ''}`}>
        <span className={styles.searchIcon}>
          <SearchIcon />
        </span>
        <input
          type="text"
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}
          onChange={handleChange}
          value={value}
          className={styles.searchInput}
          placeholder="username"
        />
      </div>
      {!profileActive && searchResult && (
        <div className={styles.searchResult} onClick={showResult}>
          <img
            src={searchResult.avatar_url}
            alt="User Avatar"
            className={styles.userAvatar}
          />
          <div className={styles.userInfo}>
            <h1 className={styles.userName}>{searchResult.name}</h1>
            <p className={styles.userBio}>{searchResult.bio}</p>
          </div>
        </div>
      )}
    </div>
  )
}
