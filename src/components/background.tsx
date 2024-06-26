import { ReactNode } from 'react'
import styles from './background.module.css'

type BackgroundProps = {
  customClass: string
  children: ReactNode
}

export default function Background({ customClass, children }: BackgroundProps) {
  return <div className={`${styles.background} ${customClass}`}>{children}</div>
}
