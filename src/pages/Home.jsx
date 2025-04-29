import React from 'react'

import Navbar from '../components/Navbar/Navbar'
import Hero from '../components/Hero/Hero'
import HowItWork from '../components/HowItWork/HowItWork'
import Features from '../components/Features/Features'
import Quotes from '../components/Quotes/Quotes'
import Testimonials from '../components/Testimonials/Testimonials'
import ContactUs from '../components/ContactUs/ContactUs'
import BgQuotes1 from '../assets/Group5.png'
import BgQuotes2 from '../assets/Group12.png'
import Footer from '../components/Footer/Footer'
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