import React from 'react'
import banner from "../assets/images/banner-card.jpg";
function Banner() {
  return (
    <>
    {/* banner */}
        <div class="featured-image">
            <img src={banner} class="img-fluid object-fit-cover rounded-4" alt=""></img>
        </div>
    </>
  )
}

export default Banner;