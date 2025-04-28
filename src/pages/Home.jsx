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
import { useState } from 'react';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkIfLoggedIn = () => {
    // Example logic to check if the user is logged in
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  };

  React.useEffect(() => {
    checkIfLoggedIn();
  }, []);

  return (
    <div id='home'>
        <Navbar isLoggedIn={isLoggedIn} />
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