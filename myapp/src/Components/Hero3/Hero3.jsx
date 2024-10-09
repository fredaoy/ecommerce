import React from 'react'
import '../Hero3/Hero3.css'
import Image1 from '../Assets/Garuntee.png'
import Image2 from '../Assets/Good Product.png'
import Image3 from '../Assets/Bargains.png'
import Image4 from '../Assets/Directly Chat.png'

const Hero3 = () => {
  return (
  <div className="hero3">
    <h1>What did you Get?</h1>
    <div className="items-345">
      <div className="details-items3">
        <div className="img-logo">
          <img src={Image1} alt="" />
        </div>
          <h3>Garuntee</h3>
          <p>Everyone who has Facebook account can join our marketplace for free. Must not pay anything</p>
      </div>

      <div className="details-items3">
        <div className="img-logo">
          <img src={Image2} alt="" />
        </div>
          <h3>Good Product</h3>
          <p>Everyone who has Facebook account can join our marketplace for free. Must not pay anything</p>
      </div>

      <div className="details-items3">
        <div className="img-logo">
          <img src={Image3} alt="" />
        </div>
          <h3>Bargains</h3>
          <p>Everyone who has Facebook account can join our marketplace for free. Must not pay anything</p>
      </div>

      <div className="details-items3">
        <div className="img-logo">
          <img src={Image4} alt="" />
        </div>
          <h3>Directly Chat</h3>
          <p>Everyone who has Facebook account can join our marketplace for free. Must not pay anything</p>
      </div>
    </div>
  </div>
  )
}

export default Hero3