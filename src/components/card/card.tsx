import { Link } from 'react-router-dom'
import styles from './card.module.css'
import GithubIcon from '../icons/github-icon'
import DevChallengesIcon from '../icons/dev-challenges-icon'
import ArowRightIcon from '../icons/arrow-right-icon'

type CardProps = {
  title: string
  slug: string
  github_link: string
  solution_link: string
  image_src: string
}

export default function Card({
  title,
  slug,
  github_link,
  solution_link,
  image_src,
}: CardProps) {
  return (
    <div className={styles.card}>
      <img className={styles.image} src={image_src} />
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.links}>
        <a
          target="_blank"
          className={`${styles.link} ${styles.git}`}
          href={github_link}
        >
          <span className={styles.linkIcon}>
            <GithubIcon />
          </span>
        </a>
        <a
          target="_blank"
          className={`${styles.link} ${styles.solution}`}
          href={solution_link}
        >
          <span className={styles.linkIcon}>
            <DevChallengesIcon />
          </span>
        </a>
        <Link className={`${styles.link} ${styles.action}`} to={slug}>
          <span className={styles.linkIcon}>
            <ArowRightIcon />
          </span>
        </Link>
      </div>
    </div>
  )
}
