import Fields from './fields'
import Topics from './topics'
import Summary from './summary'
import styles from '../multi-step-register-form/multi-step-register-form.module.css'

interface StepContentProps {
  step: number
  name: string
  email: string
  topics: string[]
  setName: (name: string) => void
  setEmail: (email: string) => void
  setTopics: React.Dispatch<React.SetStateAction<string[]>>
}

export default function StepContent({
  step,
  name,
  email,
  topics,
  setName,
  setEmail,
  setTopics,
}: StepContentProps) {
  switch (step) {
    case 0:
      return (
        <Fields
          setName={setName}
          setEmail={setEmail}
          name={name}
          email={email}
        />
      )
    case 1:
      return <Topics setTopics={setTopics} topics={topics} />
    case 2:
      return <Summary name={name} email={email} topics={topics} />
    case 3:
      return (
        <p className={styles.successMessage}>
          Congratulations, you have successfully filled out this form.
        </p>
      )
    default:
      return null
  }
}
