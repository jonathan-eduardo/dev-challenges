import styles from './profile-info.module.css'
import { UserInfo, UserRepository } from '../helpers/user-interfaces'
import ProfileRepos from './profile-repos'

type ProfileInfoProps = {
  user: UserInfo | null
  repositories: UserRepository[]
  repositoriesLimit: number
  setRepositoriesLimit: (value: number) => void
}

export default function ProfileInfo({
  user,
  repositories,
  repositoriesLimit,
  setRepositoriesLimit,
}: ProfileInfoProps) {
  return (
    <section className={styles.container}>
      {user && (
        <main className={styles.content}>
          <div className={styles.profileContainer}>
            <div className={styles.profilePictureWrapper}>
              <img
                src={user?.avatar_url}
                alt="Profile Picture"
                className={styles.profilePicture}
              />
            </div>
            <div className={styles.profileInfo}>
              <div className={styles.profileStats}>
                <span className={styles.profileStatLabel}>Followers</span>
                <span className={styles.profileStatValue}>
                  {user?.followers}
                </span>
              </div>
              <div className={styles.profileStats}>
                <span className={styles.profileStatLabel}>Following</span>
                <span className={styles.profileStatValue}>
                  {user?.following}
                </span>
              </div>
              <div className={styles.profileStats}>
                <span className={styles.profileStatLabel}>Location</span>
                <span className={styles.profileStatValue}>
                  {user?.location}
                </span>
              </div>
            </div>
          </div>
          <div className={styles.profilePresentation}>
            <h1 className={styles.profileName}>{user?.name}</h1>
            <p className={styles.profileBio}>{user?.bio}</p>
          </div>
          {repositories.length ? (
            <ProfileRepos
              repositoriesLimit={repositoriesLimit}
              repositories={repositories}
              setRepositoriesLimit={setRepositoriesLimit}
            />
          ) : (
            <p className={styles.loading}>Loading...</p>
          )}
        </main>
      )}
    </section>
  )
}
