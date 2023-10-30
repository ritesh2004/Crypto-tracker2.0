import React, { useEffect, useState } from 'react';
import Coingraph from './Coingraph';
import MarketCap from './MarketCap';
import { SingleCoin } from '../Config/Apis';
import Image from 'next/image';
import './Coinpage.css';
import CoinDetails from './CoinDetails';
import Newsfeed from './Newsfeed';


function Coinpage() {
    const [coin, setCoin] = useState();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(SingleCoin("bitcoin"))
                if (res.ok) {
                    const data = await res.json()
                    setCoin(data)
                } else {
                    console.log("Falied to fetch data from CoinGecko API")
                }
            } catch (error) {
                alert("Error while fetching data", error)
            }
        }

        return () => fetchData()
    }, [])
    console.log(coin)
    return (
        <div className='flex flex-col w-[93%] gap-10'>
            <div className='flex xl:flex-row xl:justify-between w-full md:flex-col md:gap-10 flex-col gap-10'>
                <div className='p-3 bg-white rounded-lg shadow-lg'>
                    <div className='bg-white flex flex-row items-center gap-5 p-5'>
                        {coin ? <Image src={coin.image.large} height={40} width={40} /> : <span>Loading...</span>}
                        <span className='coinName'>
                            {coin && coin.id}
                        </span>
                    </div>
                    {coin ? <div className='p-4 w-full flex flex-col gap-1 bg-[#FAFBFF] md:flex-row md:justify-between xl:flex-row xl:justify-between'>
                        <span className='xl:text-lg md:text-lg text-base' id='priceID'>
                            $ {coin.market_data.current_price['usd']}
                        </span>
                        <span className='xl:text-base font-[Oxygen] md:text-base text-sm' style={{ color: coin.market_data.price_change_percentage_24h > 0 ? "green" : "#EE2E6B" }}>
                            {coin.market_data.price_change_percentage_24h.toFixed(2)}%
                            {coin.market_data.price_change_percentage_24h > 0 ? <i class="bi bi-arrow-up"></i> : <i class="bi bi-arrow-down"></i>}
                        </span>
                        <span className='text-base text-gray-500 flex gap-1 xl:text-lg xl:gap-2 md:text-lg md:gap-2 hlspan'>
                            High
                            <span className='text-black-900 hlval'>{coin.market_data.high_24h['usd']}</span>
                        </span>
                        <span className='text-base text-gray-500 flex gap-1 xl:text-lg xl:gap-2 md:text-lg md:gap-2 hlspan'>
                            Low
                            <span className='text-black-900 hlval'>{coin.market_data.low_24h['usd']}</span>
                        </span>
                        <span className='text-base text-gray-500 flex gap-1 xl:text-lg xl:gap-2 md:text-lg md:gap-2 hlspan'>
                            24h Volume
                            <span className='text-black-900 hlval'>{coin.market_data.total_volume['usd']} </span>USD
                        </span>
                    </div> : <span>Loading...</span>}
                    <Coingraph />
                </div>
                <div className='bg-white p-2 rounded-lg shadow-lg'>
                    <MarketCap />
                </div>
            </div>
            <div className='flex flex-col gap-10 w-full xl:flex-row xl:justify-between md:flex-row md:justify-between'>
            <div className='w-full xl:w-[45%] xl:h-[350px] md:w-[45%] md:h-[400px]'>
                <CoinDetails/>
            </div>
            <div className='w-full h-[400px] overflow-scroll rounded-lg shadow-lg newsDiv flex flex-col items-center xl:w-[48%] xl:h-[350px] md:w-[45%] md:h-[400px]'>
                <Newsfeed/>
            </div>
            </div>
        </div>
    )
}

export default Coinpage