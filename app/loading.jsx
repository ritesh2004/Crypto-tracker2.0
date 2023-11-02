import React from 'react'
import Image from 'next/image'
// import Dribble_Loader from '../public/Images/dribble_loader.gif'

function loading() {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <figure className='flex justify-center object-cover bg-cover h-[10rem] w-[60rem]'>
        <Image src="/Images/animated_loader.gif" height={200} width={200} alt='gif' />
      </figure>
    </div>
  )
}

export default loading