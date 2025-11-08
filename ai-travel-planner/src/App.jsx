import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from "@/components/ui/button"
import Hero from './components/ui/custom/Hero'
import Footer from './components/ui/custom/Footer'
 

function App() {
 
  return (
    <> 
      {/* Hero */}
      <Hero/>

      {/* Footer at the bottom */}
      <Footer />
    </>
  )
}

export default App
