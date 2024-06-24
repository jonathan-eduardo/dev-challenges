import { BaseSyntheticEvent } from 'react'
import styles from './fields.module.css'

type FieldsProps = {
  name: string
  email: string
  setName: (name: string) => void
  setEmail: (name: string) => void
}

export default function Fields({
  name,
  email,
  setName,
  setEmail,
}: FieldsProps) {
  return (
    <div className={styles.fields}>
      <div className={styles.formField}>
        <label htmlFor="name" className={styles.label}>
          Name:
        </label>
        <input
          className={styles.input}
          onChange={(e: BaseSyntheticEvent) => setName(e.target.value)}
          type="text"
          placeholder="enter your name"
          value={name}
          id="name"
          name="name"
          required
        />
      </div>
      <div className={styles.formField}>
        <label htmlFor="email" className={styles.label}>
          Email:
        </label>
        <input
          className={styles.input}
          onChange={(e: BaseSyntheticEvent) => setEmail(e.target.value)}
          type="email"
          id="email"
          value={email}
          placeholder="example@gmail.com"
          name="email"
          required
        />
      </div>
    </div>
  )
}
