import React, { useEffect, useState } from 'react';
import { CoinList } from '../Config/Apis';
import Card from './Card';

function Cards() {
    const [coinArr, setArr] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {    
                const resp = await fetch(CoinList("USD"));
                if (resp.ok) {
                    const data = await resp.json();
                    setArr(data);
                }else{
                    alert("Failed to fetch data from CoinGecko API")
                }
            } catch (error) {
                alert("Error while fetching data",error)
            }
        }

        return () => fetchData()
    }, [])
    console.log(coinArr)
    return (
        <div className='flex flex-col m-3 items-center align-item'>
            <div className='w-full flex justify-end'>
                <button type="button" class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"><i class="bi bi-chevron-left"></i></button>

                <button type="button" class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"><i class="bi bi-chevron-right"></i></button>
            </div>
            <div className='flex flex-wrap gap-5 md:gap-3'>
            {
                coinArr && coinArr.length>0 ?
                coinArr.filter((coin,id)=>{return(id<4)}).map((coin) => {
                    return (
                        <Card id={coin?.id} />
                    )
                }) : <span>Loading...</span>
            }
            </div>
        </div>
    )
}

export default Cards