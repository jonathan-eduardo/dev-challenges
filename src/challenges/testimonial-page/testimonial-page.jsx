import styles from './testimonial-page.module.css'
import starSrc from '../images/star_icon.png'
import googleImgSrc from '../images/google-testimonial.png'
import metaImgSrc from '../images/meta-testimonial.png'
import DoneRing from '../images/Done_ring_round_fill.svg'
import StarFill from '../images/Star_fill.svg'
import StarGray from '../images/Star_fill_gray.svg'

export default function TestimonialPage() {
  return (
    <div className={`${styles.background} ${styles.flexCenter}`}>
      <section className={`${styles.info}`}>
        <span className={`${styles.starIcon} ${styles.flexCenter}`}>
          <img className={styles.flexCenter} src={starSrc} />
        </span>
        <h1 className={styles.title}>Reviewers</h1>
        <p className={styles.description}>
          Reviewers is where people can access guidelines, checklists, and other
          tools to assist them in reviewing papers or manuscripts. It provides a
          structured approach to ensure that the review process is thorough,
          efficient, and consistent.
        </p>
        <div className={`${styles.benefits} ${styles.flexColumn}`}>
          <div className={`${styles.benefit} ${styles.flexCenter}`}>
            <span className={styles.flexCenter}>
              <DoneRing />
            </span>
            <p className={styles.benefitDescription}>
              Checklist to Review an Academic Paper
            </p>
          </div>
          <div className={`${styles.benefit} ${styles.flexCenter}`}>
            <span className={styles.flexCenter}>
              <DoneRing />
            </span>
            <p className={styles.benefitDescription}>Peer Review Checklist</p>
          </div>
          <div className={`${styles.benefit} ${styles.flexCenter}`}>
            <span className={styles.flexCenter}>
              <DoneRing />
            </span>
            <p className={styles.benefitDescription}>
              Checklist for Editors, Reviewers, and Authors of SPIE Journals
            </p>
          </div>
        </div>
      </section>
      <section className={`${styles.testimonials} ${styles.flexColumn}`}>
        <div className={`${styles.testimonial} ${styles.alignRight}`}>
          <div className={styles.header}>
            <img className={styles.companyImage} src={googleImgSrc} />
            <div className={styles.rating}>
              <span className={styles.flexCenter}>
                <StarFill />
              </span>
              <span className={styles.flexCenter}>
                <StarFill />
              </span>
              <span className={styles.flexCenter}>
                <StarFill />
              </span>
              <span className={styles.flexCenter}>
                <StarFill />
              </span>
              <span className={styles.flexCenter}>
                <StarGray />
              </span>
            </div>
          </div>
          <h2 className={styles.reviewer}>Samantha Lee</h2>
          <p className={styles.review}>
            The checklist ensures that the review process is thorough
          </p>
        </div>
        <div className={styles.testimonial}>
          <div className={styles.header}>
            <img className={styles.companyImage} src={metaImgSrc} />
            <div className={styles.rating}>
              <span className={styles.icon}>
                <StarFill />
              </span>
              <span className={styles.icon}>
                <StarFill />
              </span>
              <span className={styles.icon}>
                <StarFill />
              </span>
              <span className={styles.icon}>
                <StarFill />
              </span>
              <span className={styles.icon}>
                <StarFill />
              </span>
            </div>
          </div>
          <h2 className={styles.reviewer}>Rachel Patel</h2>
          <p className={styles.review}>
            I highly recommend the Writecream Business Description
          </p>
        </div>
      </section>
    </div>
  )
}
