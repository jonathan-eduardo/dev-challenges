import React, { ChangeEvent, useCallback, useMemo } from 'react'
import styles from './topics.module.css'

type TopicsProps = {
  setTopics: React.Dispatch<React.SetStateAction<string[]>>
  topics: string[]
}

export default function Topics({ setTopics, topics }: TopicsProps) {
  const options = useMemo(
    () => [
      { value: 'Software Development', id: '010203' },
      { value: 'User Experience', id: '010204' },
      { value: 'Graphic Design', id: '010205' },
      { value: 'Interface Design', id: '010206' },
    ],
    []
  )

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value, checked } = event.target
      setTopics((prevTopics) =>
        checked
          ? [...prevTopics, value]
          : prevTopics.filter((topic) => topic !== value)
      )
    },
    [setTopics]
  )

  const isActive = useCallback(
    (topic: string) => topics.includes(topic),
    [topics]
  )

  return (
    <div className={styles.topics}>
      {options.map((topic) => (
        <label
          htmlFor={topic.id}
          className={`${styles.topic} ${
            isActive(topic.value) ? styles.activeTopic : ''
          }`}
          key={topic.id}
        >
          <input
            name={topic.id}
            id={topic.id}
            value={topic.value}
            type="checkbox"
            checked={isActive(topic.value)}
            onChange={handleChange}
          />
          {topic.value}
        </label>
      ))}
    </div>
  )
}
