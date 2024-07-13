import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import Background from '../../components/background'
import styles from './github-profile.module.css'
import ProfileInfo from './components/profile-info'
import { useDebounce } from './hooks/use-debounce'
import { UserInfo, UserRepository } from './helpers/user-interfaces'
import SearchField from './components/search-field'

export default function GithubProfile() {
  const [value, setValue] = useState<string>('')
  const [user, setUser] = useState<UserInfo | null>(null)
  const [profileActive, setProfileActive] = useState(false)
  const [repositories, setRepositories] = useState<UserRepository[]>([])
  const [repositoriesLimit, setRepositoriesLimit] = useState(4)

  useEffect(() => {
    setValue('github')
    debounce('github')
    showProfile()
    // eslint-disable-next-line
  }, [])

  const fetchUser = useCallback(async (userId: string) => {
    try {
      const response = await fetch(`https://api.github.com/users/${userId}`)
      const data = await response.json()
      const notFound = data.message && data.message === 'Not Found'
      if (notFound) {
        setUser(null)
        return
      }
      setUser(data)
    } catch (error) {
      setUser(null)
      throw new Error('Something went wrong')
    }
  }, [])

  const debounce = useDebounce(fetchUser, 750)

  async function showProfile(option = true) {
    const user = value ? value : 'github'
    setProfileActive(option)
    const response = await fetch(`https://api.github.com/users/${user}/repos`)
    const repos = await response.json()
    setRepositories(repos)
  }

  function resetProfile() {
    setUser(null)
    setProfileActive(false)
    setRepositories([])
    setRepositoriesLimit(4)
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const inputValue = event.target.value
    resetProfile()

    setValue(inputValue)

    if (inputValue) debounce(inputValue)
  }

  return (
    <Background customClass={styles.githubProfileBackground}>
      <header className={styles.header}>
        <SearchField
          value={value}
          handleChange={handleChange}
          searchResult={user}
          showResult={showProfile}
          profileActive={profileActive}
        />
      </header>
      {profileActive ? (
        <ProfileInfo
          user={user}
          repositories={repositories}
          repositoriesLimit={repositoriesLimit}
          setRepositoriesLimit={setRepositoriesLimit}
        />
      ) : (
        <p className={styles.noResults}>
          Search for something and select a profile
        </p>
      )}
    </Background>
  )
}
