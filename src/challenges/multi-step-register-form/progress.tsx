import styles from './progress.module.css'

type ProgressProps = {
  step: number
  steps: number
}

export default function FormProgress({ step, steps }: ProgressProps) {
  function handleStepClass(indicatorStep: number) {
    if (indicatorStep < step + 1) {
      return styles.stepCompleted
    } else if (indicatorStep === step + 1) {
      return styles.active
    } else {
      return ''
    }
  }

  return (
    <div className={styles.progress}>
      <div className={styles.steps}>
        <span className={styles.stepLabel}>
          Step {step + 1} of {steps - 1}
        </span>
        <div className={`${styles.indicator} ${handleStepClass(1)}`}></div>
        <div className={`${styles.indicator} ${handleStepClass(2)}`}></div>
        <div className={`${styles.indicator} ${handleStepClass(3)}`}></div>
      </div>
    </div>
  )
}
