import { useCallback, useEffect, useState } from 'react'
import styles from './country-quiz.module.css'
import QuizResultsIcon from './assets/congrats.svg'

type Country = {
  capital: string[]
  flags: { alt: string; png: string }
  name: { common: string }
  population: number
}

type Question = {
  title: React.ReactNode
  answer: Country
  options: Country[]
}

export default function CountryQuiz() {
  const [step, setStep] = useState(0)
  const [countries, setCountries] = useState<Country[]>([])
  const [question, setQuestion] = useState<Question | null>(null)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState('')

  useEffect(() => {
    async function fetchCountries() {
      const baseUrl = 'https://restcountries.com/v3.1'
      const fields = ['name', 'capital', 'flags', 'population']
      const endpoint = `${baseUrl}/all?fields=${fields.join(',')}`
      const response = await fetch(endpoint)
      const data = await response.json()
      setCountries(data)
    }
    fetchCountries()
  }, [])

  function getRandomIndex(limit: number = 250) {
    return Math.floor(Math.random() * limit)
  }

  const createQuestion = useCallback(
    (country: Country) => {
      function shuffleAnswers(answers: Country[]) {
        const shuffledArray = [...answers]
        for (let i = shuffledArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1))
          ;[shuffledArray[i], shuffledArray[j]] = [
            shuffledArray[j],
            shuffledArray[i],
          ]
        }
        return shuffledArray
      }

      const categories = ['flags', 'capital', 'population']
      const questionCategory = categories[getRandomIndex(categories.length)]
      const answers = [...Array(3)].map(() => countries[getRandomIndex()])

      let correctAnswer = country

      if (questionCategory === 'population') {
        correctAnswer = [...answers, country].sort(
          (a, b) => b.population - a.population
        )[0]
      }

      setQuestion({
        title: <QuestionTitle category={questionCategory} country={country} />,
        answer: correctAnswer,
        options: shuffleAnswers([country, ...answers]),
      })
    },

    [countries]
  )

  useEffect(() => {
    if (countries.length) {
      const randomIndex = getRandomIndex(countries.length)
      const country = countries[randomIndex]

      createQuestion(country)
    }
  }, [countries, step, createQuestion])

  function resetGame() {
    setStep(0)
    setCorrectAnswers(0)
    setAnswered(false)
    setSelectedAnswer('')
    setQuestion(null)
  }

  function handleQuestion(option: Country) {
    if (question && question.answer.name.common === option.name.common) {
      setCorrectAnswers((correctAnswers) => correctAnswers + 1)
    }

    setSelectedAnswer(option.name.common)
    setAnswered(true)

    setTimeout(() => {
      setAnswered(false)
      setStep(step + 1)
    }, 1000)
  }

  function handleAnswerClasses(answer: string, question: string) {
    return answered && answer === question
      ? styles.success
      : answered && answer === selectedAnswer
      ? styles.fail
      : ''
  }
  return (
    <section className={styles.countryQuizBackground}>
      <div className={styles.countryQuizContainer}>
        {step < 10 && question ? (
          <div className={styles.quizContent}>
            <h1 className={styles.quizTitle}>Country Quiz</h1>
            <QuizSteps currentIndex={step} />
            <div className={styles.quizQuestion}>
              <h2 className={styles.questionTitle}>{question.title}</h2>
              <div className={styles.questionAnswers}>
                {question.options.map((option, i) => (
                  <button
                    disabled={answered}
                    key={i}
                    className={`${styles.quizButton}`}
                    onClick={() => handleQuestion(option)}
                  >
                    <span
                      className={`${styles.answerText} ${handleAnswerClasses(
                        option.name.common,
                        question.answer.name.common
                      )}`}
                    >
                      {option.name.common}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.quizResults}>
            <QuizResultsIcon />
            <h2 className={styles.quizResultsTitle}>
              Congrats! You completed the quiz.
            </h2>
            <p className={styles.quizResultsInfo}>
              You answered {correctAnswers}/10 correctly
            </p>
            <button
              onClick={resetGame}
              className={`${styles.quizButton} ${styles.quizResultsButton}`}
            >
              Play again
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

function QuizSteps({ currentIndex }: { currentIndex: number }) {
  return (
    <div className={styles.quizSteps}>
      {[...Array(10)].map((_, index) => (
        <div
          key={index}
          className={`${styles.step} ${
            index <= currentIndex ? styles.current : ''
          }`}
        >
          {index + 1}
        </div>
      ))}
    </div>
  )
}

function QuestionTitle({
  category,
  country,
}: {
  category: string
  country: Country
}) {
  return (
    <>
      {category === 'flags' ? (
        <>
          Which country does this flag{' '}
          <img
            className={styles.questionImg}
            src={country.flags.png}
            alt={country.flags.alt}
          />{' '}
          belong to?
        </>
      ) : category === 'population' ? (
        <>Which country has the largest population among the following?</>
      ) : category === 'capital' ? (
        <>Which country is {country.capital[0]} the capital?</>
      ) : null}
    </>
  )
}
