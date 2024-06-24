import styles from './summary.module.css'

type SummaryProps = {
  name: string
  email: string
  topics: string[]
}

export default function Summary({ name, email, topics }: SummaryProps) {
  return (
    <div className={styles.summary}>
      <div className={styles.userInfo}>
        <p className={styles.info}>
          <span className={styles.subtitle}>Name: </span>
          {name}
        </p>
        <p className={styles.info}>
          <span className={styles.subtitle}>Email: </span>
          {email}
        </p>
      </div>
      <p className={styles.subtitle}>Topics: </p>

      <ul className={styles.userTopics}>
        {topics.length ? (
          topics.map((topic: string) => {
            return (
              <li key={topic} className={styles.userTopic}>
                {topic}
              </li>
            )
          })
        ) : (
          <li className={styles.userTopic}>None</li>
        )}
      </ul>
    </div>
  )
}
