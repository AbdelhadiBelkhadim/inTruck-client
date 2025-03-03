import React from 'react'
import Navbar from '../componants/Navbar'
import Hero from '../componants/Hero'
import HowItWork from '../componants/HowItWork'
import Features from '../componants/Features'

const Home = () => {
  return (
    <>
        <Navbar />
        <Hero />
        <HowItWork />
        <Features />
    </>
  )
}

export default Home