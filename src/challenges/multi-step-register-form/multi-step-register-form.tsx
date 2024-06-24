import { BaseSyntheticEvent, useState } from 'react'
import styles from '../multi-step-register-form/multi-step-register-form.module.css'
import StepContent from './step-content'
import Progress from './progress'

interface Step {
  title: string
  class: string
}

export default function MultiStepRegisterForm() {
  return (
    <div className={styles.background}>
      <Form />
    </div>
  )
}

function Form() {
  const [topics, setTopics] = useState<string[]>([])
  const [email, setEmail] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [step, setStep] = useState<number>(0)

  const steps: Step[] = [
    { title: 'Register', class: 'firstStep' },
    { title: 'Which topics are you interested in?', class: 'secondStep' },
    { title: 'Summary', class: 'thirdStep' },
    { title: '✅ Success', class: 'lastStep' },
  ]

  function handleConfirm(event: BaseSyntheticEvent) {
    event.preventDefault()

    if (step < 3) {
      setStep(step + 1)
    }
  }

  return (
    <div className={styles.formWrapper}>
      <form className={styles.form} onSubmit={handleConfirm}>
        <div className={`${styles.formContent} ${styles[steps[step].class]}`}>
          {steps.map((item, index) => (
            <div
              key={item.title}
              className={`${styles.item} ${index > step ? styles.hidden : ''}`}
            >
              <h2 className={styles.title}>{item.title}</h2>
              <div className={styles.content}>
                {index === step && (
                  <StepContent
                    step={step}
                    name={name}
                    email={email}
                    topics={topics}
                    setName={setName}
                    setEmail={setEmail}
                    setTopics={setTopics}
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        {step < 3 && <input className={styles.confirmBtn} type="submit" />}
      </form>
      {step < 3 && <Progress step={step} steps={steps.length} />}
    </div>
  )
}
