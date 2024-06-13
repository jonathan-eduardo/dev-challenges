import styles from './business-blog-card.module.css'
import cardImageHero from '../images/hero-image-business-card.png'
import cardImageAvatar from '../images/avatar-image-business-card.png'

export default function BusinessBlogCard() {
  return (
    <div className={styles.background}>
      <div className={styles.card}>
        <div className={styles.presentation}>
          <img className={styles.hero} src={cardImageHero} />
          <div className={styles.content}>
            <h1 className={styles.title}>
              Perfect solution for small business
            </h1>
            <p className={styles.description}>
              Small businesses need to generate leads to grow. You can use tools
              like Ringy.
            </p>
          </div>
        </div>
        <div className={styles.author}>
          <img className={styles.avatar} src={cardImageAvatar} />
          <div className={styles.info}>
            <h2 className={styles.name}>Amy Burgess</h2>
            <p className={styles.role}>Customer Manger, Solution Oy</p>
          </div>
        </div>
      </div>
    </div>
  )
}
