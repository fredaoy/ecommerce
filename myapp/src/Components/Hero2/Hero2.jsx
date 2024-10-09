import React from 'react'
import '../Hero2/Hero2.css'
import Image1 from '../Assets/Rectangle 73.png'
import Image2 from '../Assets/Rectangle 74.png'
import Image3 from '../Assets/Rectangle 75.png'

const Hero2 = () => {
  return (
    <div className="container2">
      <h3>What is Marketplace?</h3>
      <p>Get to know about us . Why need to know us</p>
      <div className="items2">
        <div className="details-items2">
          <img src={Image1} alt="" />
          <h3>Easily to approach</h3>
          <p>Everyone who has Facebook account can join our marketplace for free. Must not pay anything</p>
        </div>

        <div className="details-items2">
          <img src={Image2} alt="" />
          <h3>High Quality</h3>
          <p>You can get high-quality product with good price . In addition we have diverse of product you can choose.</p>
        </div>


        <div className="details-items2">
          <img src={Image3} alt="" />
          <h3>Many ways to Pay</h3>
          <p>Different ways to pay for convenience to our customers.</p>
        </div>
      </div>
    </div>
  )
}

export default Hero2