import React from 'react'
import { motion } from 'framer-motion'
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

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div id='home'>
      <Navbar isLoggedIn={isLoggedIn} />
      
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
      >
        <Hero />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <HowItWork />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <Features />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
      >
        <Quotes img={BgQuotes1} text="Track with Confidence, Deliver with Speed!"/>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <Testimonials />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <ContactUs id="contactus" />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
      >
        <Quotes img={BgQuotes2} text="Seamless Tracking, Reliable Delivery!" />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
      >
        <Footer />
      </motion.div>
    </div>
  )
}

export default Home