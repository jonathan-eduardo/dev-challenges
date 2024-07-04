import Background from '../../components/background'
import styles from './simple-coffee-listing.module.css'
import FilledStarIcon from './assets/Star_fill.svg'
import StarIcon from './assets/Star.svg'
import { useEffect, useState } from 'react'
import { baseUrl } from './api'

type CoffeeProps = {
  id: number
  name: string
  image: string
  price: string
  rating: number | string | null
  votes: number
  popular: boolean
  available: boolean
}

function CoffeeCard({
  id,
  name,
  image,
  price,
  rating,
  votes,
  popular,
  available,
}: CoffeeProps) {
  return (
    <div className={styles.card} id={`${id}`}>
      <div className={styles.cardImageWrapper}>
        <img src={image} alt="Coffee image" className={styles.cardImage} />
        {popular && <span className={styles.cardTag}>Popular</span>}
      </div>
      <div className={styles.cardInfo}>
        <p className={styles.cardTitle}>{name}</p>
        <p className={styles.cardPrice}>{price}</p>
      </div>
      <div className={styles.cardFooter}>
        <div className={styles.cardRating}>
          {votes > 0 ? <FilledStarIcon /> : <StarIcon />}
          <div className={styles.rating}>
            <span className={styles.ratingValue}>{rating}</span>
            <span className={styles.votes}>
              {' '}
              {votes > 0 ? `(${votes} votes)` : 'No ratings'}
            </span>
          </div>
        </div>
        {!available && <p className={styles.cardAvailable}>Sold out</p>}
      </div>
    </div>
  )
}

function CoffeeContainer({ coffees }: { coffees: CoffeeProps[] }) {
  return (
    <>
      {coffees.map((coffee) => (
        <CoffeeCard key={coffee.id} {...coffee} />
      ))}
    </>
  )
}

export default function SimpleCoffeeListing() {
  const [coffees, setCoffees] = useState<CoffeeProps[]>([])
  const [availableCoffees, setAvailableCoffees] = useState<CoffeeProps[]>([])
  const [filter, setFilter] = useState<boolean>(false)

  useEffect(() => {
    async function fetchData(url: string) {
      const response = await fetch(url)
      const data = await response.json()
      const available = data.filter((coffee: CoffeeProps) => coffee.available)
      setAvailableCoffees(available)
      setCoffees(data)
    }
    fetchData(baseUrl)
  }, [])

  return (
    <Background customClass={styles.simpleCoffeeListingBackground}>
      <section className={styles.container}>
        <section className={styles.coffeeCollection}>
          <h1 className={styles.title}>Our Collection</h1>
          <p className={styles.description}>
            Introducing our Coffee Collection, a selection of unique coffees
            from different roast types and origins, expertly roasted in small
            batches and shipped fresh weekly.
          </p>

          <div className={styles.buttons}>
            <button
              className={`${styles.btn} ${!filter ? styles.primary : ''}`}
              onClick={() => setFilter(false)}
            >
              All Products
            </button>
            <button
              className={`${styles.btn} ${filter ? styles.primary : ''}`}
              onClick={() => setFilter(true)}
            >
              Available Now
            </button>
          </div>

          <section className={styles.coffees}>
            {filter ? (
              <CoffeeContainer coffees={availableCoffees} />
            ) : (
              <CoffeeContainer coffees={coffees} />
            )}
          </section>
        </section>
      </section>
    </Background>
  )
}
