import React, { useContext, useEffect, useState } from 'react';
import { CoinList } from '../Config/Apis';
import Card from './Card';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import Appcontext from '../Context/Appcontext';

function Cards() {
    const {coinArr} = useContext(Appcontext);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const resp = await fetch(CoinList("USD"));
    //             if (resp.ok) {
    //                 const data = await resp.json();
    //                 setArr(data);
    //             } else {
    //                 alert("Failed to fetch data from CoinGecko API")
    //             }
    //         } catch (error) {
    //             alert("Error while fetching data", error)
    //         }
    //     }

    //     return () => fetchData()
    // }, [])

    const items = coinArr?.filter((coin,id)=>(id<=5)).map((coin,id) => {
        return (
            // <Card id={coin?.id} key={id} />
            <Card id={coin?.id} />
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
            />
        </div>
    )
}

export default Cards