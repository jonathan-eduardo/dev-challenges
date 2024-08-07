import App from './App.tsx'
import MinimalBlogCard from './challenges/minimal-blog-card/minimal-blog-card.tsx'
import BusinessBlogCard from './challenges/business-blog-card/business-blog-card.tsx'
import TestimonialPage from './challenges/testimonial-page/testimonial-page.tsx'
import ContactPage from './challenges/contact-page/contact-page.tsx'
import SimpleHomepage from './challenges/simple-homepage/simple-homepage.tsx'
import MultiStepRegisterForm from './challenges/multi-step-register-form/multi-step-register-form.tsx'
import MusicPlayer from './challenges/music-player/music-player.tsx'
import RandomQuote from './challenges/random-quote/random-quote.tsx'
import QrCodeGenerator from './challenges/qr-code-generator/qr-code-generator.tsx'
import GuessTheWordGame from './challenges/guess-the-word-game/guess-the-word-game.tsx'
import SimpleCoffeeListing from './challenges/simple-coffee-listing/simple-coffee-listing.tsx'
import TranslateApp from './challenges/translate-app/translate-app.tsx'
import GithubProfile from './challenges/github-profile/github-profile.tsx'
import CountryPage from './challenges/country-page/country-page.tsx'
import CountryDetails from './challenges/country-page/components/country-details/country-details.tsx'
import CountryQuiz from './challenges/country-quiz/country-quiz.tsx'

const routes = [
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/minimal-blog-card',
    element: <MinimalBlogCard />,
  },
  {
    path: '/business-blog-card',
    element: <BusinessBlogCard />,
  },
  {
    path: '/testimonial-page',
    element: <TestimonialPage />,
  },
  {
    path: '/contact-page',
    element: <ContactPage />,
  },
  {
    path: '/simple-homepage',
    element: <SimpleHomepage />,
  },
  {
    path: '/multi-step-register-form',
    element: <MultiStepRegisterForm />,
  },
  {
    path: '/music-player',
    element: <MusicPlayer />,
  },
  {
    path: '/random-quote',
    element: <RandomQuote />,
  },
  {
    path: '/qr-code-generator',
    element: <QrCodeGenerator />,
  },
  {
    path: '/guess-the-word-game',
    element: <GuessTheWordGame />,
  },
  {
    path: '/simple-coffee-listing',
    element: <SimpleCoffeeListing />,
  },
  {
    path: '/translate-app',
    element: <TranslateApp />,
  },
  {
    path: '/github-profile',
    element: <GithubProfile />,
  },
  {
    path: '/country-page',
    element: <CountryPage />,
    children: [
      {
        path: ':country',
        element: <CountryDetails />,
      },
    ],
  },
  {
    path: '/country-quiz',
    element: <CountryQuiz />,
  },
]

export default routes
