import React from 'react'
import Navbar from '../componants/Navbar/Navbar'
import Hero from '../componants/Hero/Hero'
import HowItWork from '../componants/HowItWork/HowItWork'
import Features from '../componants/Features/Features'

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