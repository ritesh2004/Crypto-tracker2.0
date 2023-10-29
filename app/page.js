"use client"
import Image from 'next/image'
import Navbar from './components/Navbar'
import Cards from './components/Cards'
import Coinpage from './components/Coinpage'
import Footer from './components/Footer'

export default function Home() {
  return (
    <div className='bg-[#F3F6FE] min-h-screen '>
      <Navbar/>
    <div className='flex flex-col items-center justify-center'>
      <Cards/>
      <Coinpage/>
    </div>
    <div className='mt-5'>
      <Footer/>
    </div>
    </div>
  )
}
