import React, { useContext } from 'react';
import Card from './Card';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import Appcontext from '../Context/Appcontext';
import Image from 'next/image';

function Cards() {
    const {coinArr} = useContext(Appcontext);
    // console.log(coinArr)
    const items = coinArr?.filter((coin,id)=>(id<=5)).map((coin,id) => {
        return (
            <Card id={coin?.id} key={id} />
        )
    })
    // console.log(coinArr)
    let responsive = {
        0: {
            items: 1,
            itemsFit:'contain'
        },
        320: {
            items: 1,
            itemsFit:'contain'
        },
        524: {
            items: 1,
            itemsFit: 'contain'
        },
        768:{
            items:2,
            itemsFit:'fill'
        },
        1024: {
            items: 3,
            itemsFit: 'contain',
        },
        1400: {
            items: 4,
            itemsFit: 'contain',
        }
    }
    return (
        <div className='items-center w-[93%]'>
            {coinArr && coinArr?.length>0 ? 
            <AliceCarousel
                mouseTracking
                autoPlay
                autoPlayInterval={1000}
                animationDuration={1500}
                responsive={responsive}
                items={items}
                infinite
                disableButtonsControls
                disableDotsControls
            />:
            <div className='w-full h-full flex justify-center items-center'>
                <figure className='flex justify-center h-[3rem] w-[3rem] object-cover bg-cover'>
                    <Image src="/Images/CircularLoading.gif" height={100} width={100} alt='gif'/>
                </figure>
            </div>}
        </div>
    )
}

export default Cards