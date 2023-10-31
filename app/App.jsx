"use client"
import React, { useContext } from 'react'
import Navbar from './components/Navbar'
import Cards from './components/Cards'
import Coinpage from './components/Coinpage'
import Footer from './components/Footer'
import Appcontext from './Context/Appcontext'
import Result from './components/Result'

function App() {
  const { id, searched } = useContext(Appcontext)
  return (
    <div className='bg-[#F3F6FE] min-h-screen '>
      <Navbar />
      <div className='flex flex-col items-center justify-center relative'>
        <Cards />
        <Coinpage id={id} />
        <div className='absolute top-0 w-[300px]'>
          {searched?<Result />:<span></span>}
        </div>
      </div>
      <div className='mt-5'>
        <Footer />
      </div>
    </div>
  )
}

export default App