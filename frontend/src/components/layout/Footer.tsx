const Footer = () => {
  return (
    <footer className="footer flex-space-around">
      <div className="flex-space-around">
        <label htmlFor="subscribe">Subscribe To Newsletter: </label>
        <input
          type="email"
          id="subscribe"
          name="subscribe"
          className="footer__input"
          placeholder="Your Email Address"
        />
        <button className="btn btn-subscribe">subscribe</button>
      </div>
      <div>
        <p>&copy; Copyright 2023 Anis Express. All Rights Reserved</p>
      </div>
    </footer>
  )
}

export default Footer
