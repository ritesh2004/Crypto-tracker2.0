"use client"
import Image from 'next/image'
import Navbar from './components/Navbar'
import Cards from './components/Cards'
import Coingraph from './components/Coingraph'
import Exam from './components/Exam'

export default function Home() {
  return (
    <div className='bg-[#F3F6FE] min-h-screen'>
      <Navbar/>
      <Cards/>
      <Exam/>
    </div>
  )
}
