"use client"
import React, { useContext } from 'react'
import Cards from './components/Cards'
import Coinpage from './components/Coinpage'
import Appcontext from './Context/Appcontext'
import Result from './components/Result'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Wait from './components/Wait'
import PageWrapper from './components/PageWrapper'

const App = async () => {
  const { id, searched } = useContext(Appcontext);
  await Wait(500);
  return (
    <div className='bg-[#F3F6FE] min-h-screen '>
      <div className='mb-3'>
        <Navbar />
      </div>
      {/* <PageWrapper> */}
      <div className='flex flex-col items-center justify-center relative'>
        <Cards />
        <Coinpage id={id} />
        <div className='absolute top-0 w-[300px]'>
          {searched ? <Result /> : <span></span>}
        </div>
      </div>
      {/* </PageWrapper> */}
        <Footer/>
    </div>
  )
}

export default App