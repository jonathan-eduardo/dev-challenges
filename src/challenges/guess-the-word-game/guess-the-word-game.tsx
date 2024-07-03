import Background from '../../components/background'
import styles from './guess-the-word-game.module.css'
import WordScrambleIcon from '../images/Word Scramble.svg'
import useGuessTheWordGame from './hooks/use-guess-game'

export default function GuessTheWordGame() {
  const {
    word,
    scrambledWord,
    mistakes,
    updateWord,
    updateCorrects,
    setMistakes,
  } = useGuessTheWordGame()

  function handleInput(e: React.BaseSyntheticEvent, index: number) {
    const { value } = e.target
    if (!/^[a-zA-Z]+$/.test(value)) {
      e.target.value = ''
      return
    }

    if (word[index] === value.toLowerCase()) {
      updateCorrects(value, index)
      e.target.classList.add(styles.success)
      e.target.classList.remove(styles.error)
    } else {
      updateCorrects('', index)
      setMistakes((prevMistakes) => [...prevMistakes, value.toLowerCase()])
      e.target.classList.remove(styles.success)
      e.target.classList.add(styles.error)
    }

    if (e.target.nextSibling) {
      e.target.nextSibling.focus()
    }
  }

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) {
    if (event.key === 'Backspace') {
      const target = event.currentTarget
      updateCorrects('', index)
      target.classList.remove(styles.error, styles.success)

      if (target.value) {
        target.value = ''
      } else if (target.previousSibling instanceof HTMLInputElement) {
        target.previousSibling.value = ''
        target.previousSibling.focus()
      }
    }
  }

  return (
    <Background customClass={styles.guessTheWordGameBackground}>
      <section className={styles.container}>
        <div className={styles.display}>
          <WordScrambleIcon />
          <div className={styles.scrambledWordContainer}>
            <h1 className={styles.scrambledWord}>{scrambledWord}</h1>
          </div>
          <div className={styles.gameInfo}>
            <GameTries mistakes={mistakes} />
            <div className={styles.mistakes}>
              <p className={styles.mistakesLabel}>
                Mistakes: {mistakes.join(', ')}
              </p>
              <p className={styles.mistakesLetters}></p>
            </div>
          </div>
          <div className={styles.letters}>
            {word &&
              word.map((letter, index) => (
                <input
                  type="text"
                  key={`${word}-${letter}-${index}`}
                  autoFocus={index === 0}
                  maxLength={1}
                  placeholder="_"
                  className={styles.letter}
                  onChange={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onFocus={(e) => e.target?.select()}
                />
              ))}
          </div>
          <div className={styles.buttons}>
            <button className={styles.btn} onClick={() => updateWord(false)}>
              Random
            </button>
            <button className={styles.btn} onClick={() => updateWord(true)}>
              Reset
            </button>
          </div>
        </div>
      </section>
    </Background>
  )
}

function GameTries({ mistakes }: { mistakes: string[] }) {
  const isActive = (index: number) =>
    mistakes.length >= index ? styles.filled : ''

  return (
    <div className={styles.tries}>
      <p className={styles.triesLabel}>Tries ({mistakes.length}/5): </p>
      <div className={styles.triesProgress}>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`${styles.progressCircle} ${isActive(i + 1)}`}
          ></div>
        ))}
      </div>
    </div>
  )
}
