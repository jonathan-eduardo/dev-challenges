import { Dispatch, ReactNode, SetStateAction, useState } from 'react'
import styles from './simple-homepage.module.css'
import HeroImage from '../images/hero-image-simple-homepage.png'
import AlaradoIconHomepageDarkIcon from '../images/alarado-icon-homepage-dark.svg'
import AlaradoIconHomePageIcon from '../images/alarado-icon-homepage.svg'
import SunFillIcon from '../images/Sun_fill.svg'
import MoonFillIcon from '../images/Moon_fill.svg'
import DoneRingIcon from '../images/Done_ring_round_fill.svg'
import HamburgerIcon from '../images/hamburger-menu.svg'
import CloseMenuIcon from '../images/close-menu.svg'

type childrenProps = {
  active: boolean
  setActive: Dispatch<SetStateAction<boolean>>
}

export default function SimpleHomepage() {
  const [darkMode, setDarkMode] = useState<boolean>(false)
  const [menuActive, setMenuActive] = useState<boolean>(false)

  return (
    <div
      className={`${styles.background} ${darkMode ? styles.darkMode : ''} ${
        menuActive ? styles.mobileActive : ''
      }`}
    >
      <Header>
        <Logo darkMode={darkMode} />
        <div className={styles.navButtons}>
          <Nav />
          <ToggleButton active={darkMode} setActive={setDarkMode} />
        </div>
        <MenuMobile active={menuActive} setActive={setMenuActive} />
      </Header>
      <Main />
    </div>
  )
  return
}

function ToggleButton({ active, setActive }: childrenProps) {
  return (
    <button onClick={() => setActive(!active)} className={styles.toggleButton}>
      <span className={`${styles.moonIcon} ${styles.icon}`}>
        <MoonFillIcon />
      </span>
      <span className={`${styles.sunIcon} ${styles.icon}`}>
        <SunFillIcon />
      </span>
    </button>
  )
}

function Header({ children }: { children: ReactNode }) {
  return (
    <header className={`${styles.header} ${styles.container}`}>
      {children}
    </header>
  )
}

function Logo({ darkMode }: { darkMode: boolean }) {
  const Image = darkMode ? (
    <AlaradoIconHomepageDarkIcon />
  ) : (
    <AlaradoIconHomePageIcon />
  )

  return <div className={styles.logo}>{Image && Image}</div>
}

function Nav() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <a href="#" className={`${styles.navLink} ${styles.active}`}>
            About us
          </a>
        </li>
        <li className={styles.navItem}>
          <a href="#" className={styles.navLink}>
            Product
          </a>
        </li>
        <li className={styles.navItem}>
          <a href="#" className={styles.navLink}>
            Resource
          </a>
        </li>
        <li className={styles.navItem}>
          <a href="#" className={styles.navLink}>
            Contact
          </a>
        </li>
      </ul>
    </nav>
  )
}

function Main() {
  return (
    <main className={`${styles.main} ${styles.container}`}>
      <section className={styles.heroContent}>
        <div className={styles.subtitle}>
          <span className={styles.emoji}>😎</span>
          Simple way to communicate
        </div>
        <h1 className={styles.title}>Actions for Accessibility in Design</h1>
        <p className={styles.description}>
          The fastest way to build and deploy websites with
          <br /> reusable components.
        </p>
        <div className={styles.actions}>
          <button className={`${styles.btn} ${styles.btnPrimary}`}>
            Get started
          </button>
          <button className={`${styles.btn} ${styles.btnSecondary}`}>
            Get live demo
          </button>
        </div>
        <div className={styles.benefits}>
          <p className={styles.benefit}>
            <span className={styles.icon}>
              <DoneRingIcon />
            </span>
            No credit card required
          </p>
          <p className={styles.benefit}>
            <span className={styles.icon}>
              <DoneRingIcon />
            </span>
            No software to install
          </p>
        </div>
      </section>
      <section className={styles.heroImage}>
        <img src={HeroImage} alt="Hero Image" className={styles.image} />
      </section>
    </main>
  )
}

function MenuMobile({ active, setActive }: childrenProps) {
  function handleClick() {
    setActive(!active)
  }

  const Icon = active ? <CloseMenuIcon /> : <HamburgerIcon />

  return (
    <div className={styles.menuMobile} onClick={handleClick}>
      {Icon && Icon}
    </div>
  )
}
