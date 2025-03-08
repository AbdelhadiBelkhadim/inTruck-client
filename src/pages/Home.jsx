import React from 'react'
import Navbar from '../componants/Navbar/Navbar'
import Hero from '../componants/Hero/Hero'
import HowItWork from '../componants/HowItWork/HowItWork'
import Features from '../componants/Features/Features'
import Quotes from '../componants/Quotes/Quotes'

const Home = () => {
  return (
    <>
        <Navbar />
        <Hero />
        <HowItWork />
        <Features />
        <Quotes />
    </>
  )
}

export default Home