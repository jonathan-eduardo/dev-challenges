import styles from './minimal-blog-card.module.css'
import cardImage from '../images/cactus_img.jpg'

export default function MinimalBlogCard() {
  return (
    <div className={styles.background}>
      <div className={styles.card}>
        <div className={styles.content}>
          <img
            className={styles.image}
            src={cardImage}
            alt="A potted cactus with a blue-green color and sharp spines against a pale pink background."
          />
          <span className={styles.tag}>Design</span>
          <h1 className={styles.title}>Embracing Minimalism</h1>
          <p className={styles.description}>
            From minimalist sculptures to minimalist paintings, this blog will
            inspire you to appreciate the beauty that lies in simplicity.
          </p>
        </div>
        <p className={styles.author}>Annie Spratt</p>
      </div>
    </div>
  )
}
