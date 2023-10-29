import React, { useEffect, useState } from 'react';
import { CoinList } from '../Config/Apis';
import Image from 'next/image';

function MarketCap() {

    const [coinArr, setCoinArr] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(CoinList("USD"));
                if (res.ok) {
                    const data = await res.json();
                    setCoinArr(data)
                }
                else {
                    console.log("Failed to fetchdata from CoinGecko API")
                }
            } catch (error) {
                alert("Error while fetching data", error)
            }
        }

        return () => fetchData()
    }, [])

    console.log(coinArr)

    return (
        <div class="relative overflow-x-auto rounded-lg">
            <table class="text-sm text-left text-gray-500 rounded">
                <thead class=" text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" class="px-6 py-3" style={{fontFamily:'Oxygen',fontSize:'1rem'}}>
                        <i style={{color:'blueviolet'}} class="bi bi-square-fill"></i> Market Cap
                        </th>
                        <th scope="col" class="px-6 py-3">
                        <i class="bi bi-arrow-down-up"></i>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {coinArr && coinArr.length > 0 ?
                        coinArr.filter((coin,id)=>{return(id<=9)}).map((coin) => {
                            return (
                                <tr class="bg-white border-b">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex flex-row gap-3 items-center uppercase font-bold">
                                    <Image src={coin.image} height={30} width={30} alt={coin.id}/>
                                        {coin.symbol}
                                    </th>
                                    <td class="px-6 py-4 text-black-500">
                                    <span className='flex flex-row gap-3' style={{fontFamily:'Oxygen',fontWeight:'400'}}>
                                        $ {coin.market_cap}
                                        <span style={{color:coin.market_cap_change_percentage_24h>0?"green":"#EE2E6B"}}>
                                            {coin.market_cap_change_percentage_24h.toFixed(2)}
                                            {coin.market_cap_change_percentage_24h>0?<i class="bi bi-arrow-up"></i>:<i class="bi bi-arrow-down"></i>}
                                        </span>
                                        </span>
                                    </td>
                                </tr>
                            )
                        }):<span>Loading...</span>}
                </tbody>
            </table>
        </div>

    )
}

export default MarketCap