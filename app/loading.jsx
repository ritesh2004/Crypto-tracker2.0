import React from 'react'
import Image from 'next/image'
// import Dribble_Loader from '../public/Images/dribble_loader.gif'

function loading() {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <figure className='flex justify-center object-cover bg-cover h-[10rem] w-[40rem]'>
        <Image src="/Images/Dual_Ball.gif" height={100} width={150} alt='gif' />
      </figure>
    </div>
  )
}

export default loading