import MinimalBlogCard from './challenges/minimal-blog-card/minimal-blog-card.tsx'
import App from './App.tsx'

const routes = [
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/minimal-blog-card',
    element: <MinimalBlogCard />,
  },
]

export default routes
