import cardImage from './assets/cactus_img.jpg'

export default function MinimalBlogCard() {
  return (
    <article className="card">
      <div className="card-content">
        <img
          className="card-image"
          src={cardImage}
          alt="A potted cactus with a blue-green color and sharp spines against a pale pink background."
        />
        <span className="card-tag">Design</span>
        <h1 className="card-title">Embracing Minimalism</h1>
        <p className="card-description">
          From minimalist sculptures to minimalist paintings, this blog will
          inspire you to appreciate the beauty that lies in simplicity.
        </p>
      </div>
      <p className="card-author">Annie Spratt</p>
    </article>
  )
}
