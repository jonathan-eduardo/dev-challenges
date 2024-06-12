import { useEffect, useState } from 'react'
import Card from './components/card/card'
import { Outlet } from 'react-router-dom'
import './App.css'

type Challenge = {
  id: string
  slug: string
  title: string
  github_link: string
  solution_link: string
  image_src: string
}

function App() {
  const [challenges, setChallenges] = useState<Challenge[]>([])

  async function getChallenges(url: string) {
    fetch(url)
      .then((result) => result.json())
      .then(({ challenges }) => setChallenges(challenges))
  }

  useEffect(() => {
    getChallenges('./challenges.json')
  }, [])

  return (
    <>
      <section className="container">
        <h1 className="title">Dev Challenges</h1>
        <p className="description">
          Here you’ll find my solutions to the{' '}
          <a href="https://devchallenges.io/" target="_blank" className="link">
            devchallenges.io
          </a>{' '}
          challenges
        </p>
        <section className="cards">
          {challenges &&
            challenges.map((challenge) => {
              return <Card key={challenge.id} {...challenge} />
            })}
        </section>
        <Outlet />
      </section>
    </>
  )
}

export default App
