import { UserRepository } from '../helpers/user-interfaces'
import styles from './profile-repos.module.css'
import ShieldIcon from '../assets/Shield_alt.svg'
import StarIcon from '../assets/Star.svg'
import ForkIcon from '../assets/Nesting.svg'

type ProfileRepos = {
  repositoriesLimit: number
  repositories: UserRepository[]
  setRepositoriesLimit: (value: number) => void
}

export default function ProfileRepos({
  repositoriesLimit,
  repositories,
  setRepositoriesLimit,
}: ProfileRepos) {
  function getLastUpdated(date: string) {
    const now = new Date()
    const updatedAt = new Date(date)
    const differenceInMilliseconds = now.getTime() - updatedAt.getTime()
    const millisecondsInOneDay = 24 * 60 * 60 * 1000
    const differenceInDays = Math.floor(
      differenceInMilliseconds / millisecondsInOneDay
    )

    return differenceInDays > 1
      ? `${differenceInDays} days ago`
      : `${differenceInDays} day ago`
  }

  return (
    <>
      {repositoriesLimit && repositories.length && (
        <div className={styles.profileRepositories}>
          {repositories
            .slice(0, repositoriesLimit)
            .map((repo: UserRepository) => (
              <div className={styles.repositoryInfo} key={repo.id}>
                <a
                  href={repo.html_url}
                  className={styles.repositoryName}
                  target="_blank"
                >
                  {repo.name}
                </a>
                <p className={styles.repositoryDescription}>
                  {repo.description}
                </p>
                <div className={styles.repositoryStatistics}>
                  {repo.license && (
                    <div className={styles.repositoryStat}>
                      <ShieldIcon /> <span>{repo.license.spdx_id}</span>
                    </div>
                  )}

                  <div className={styles.repositoryStat}>
                    <ForkIcon /> <span>{repo.forks}</span>
                  </div>
                  <div className={styles.repositoryStat}>
                    <StarIcon /> <span>{repo.watchers}</span>
                  </div>
                  <p className={styles.lastUpdated}>
                    updated {getLastUpdated(repo.updated_at)}
                  </p>
                </div>
              </div>
            ))}
        </div>
      )}
      {repositoriesLimit === 4 && (
        <button
          className={styles.showAllRepositoriesBtn}
          onClick={() => setRepositoriesLimit(repositories.length)}
        >
          View all repositories
        </button>
      )}
    </>
  )
}
