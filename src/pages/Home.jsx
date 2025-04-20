import React from 'react'

import Navbar from '../componants/Navbar/Navbar'
import Hero from '../componants/Hero/Hero'
import HowItWork from '../componants/HowItWork/HowItWork'
import Features from '../componants/Features/Features'
import Quotes from '../componants/Quotes/Quotes'
import Testimonials from '../componants/Testimonials/Testimonials'
import ContactUs from '../componants/ContactUs/ContactUs'
import BgQuotes1 from '../assets/Group5.png'
import BgQuotes2 from '../assets/Group12.png'
import Footer from '../componants/Footer/Footer'

const Home = () => {
  return (
    <div id='home'>
        <Navbar />
        <Hero />
        <HowItWork />
        <Features />
        <Quotes img={BgQuotes1} text="Track with Confidence, Deliver with Speed!"/>
        <Testimonials />
        <ContactUs id="contactus" />
        <Quotes img={BgQuotes2} text="Seamless Tracking, Reliable Delivery!" />
        <Footer />
    </div>
  )
}

export default Home