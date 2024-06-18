import App from './App.tsx'
import MinimalBlogCard from './challenges/minimal-blog-card/minimal-blog-card.tsx'
import BusinessBlogCard from './challenges/business-blog-card/business-blog-card.tsx'
import TestimonialPage from './challenges/testimonial-page/testimonial-page.tsx'
import ContactPage from './challenges/contact-page/contact-page.tsx'

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
]

export default routes
