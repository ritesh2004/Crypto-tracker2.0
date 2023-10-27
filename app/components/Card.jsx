import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';
import { HistoricalChart, SingleCoin } from '../Config/Apis';
import Image from 'next/image';
import './Cards.css'

Chart.register(LineElement, PointElement, LinearScale, Title, CategoryScale);


function Card(props) {

    const [historicalData, setData] = useState([]);
    const [singleCoin, setSingle] = useState();

    const colorArr = ['gold','#5470DE','#47DFCF','#93D7FD']

    const fetchData = async () => {
        const res1 = await fetch(HistoricalChart(props?.id, 365, "INR"))
        const res2 = await fetch(SingleCoin(props?.id))
        const data = await res1.json();
        const data1 = await res2.json();
        setData(data?.prices);
        setSingle(data1)
        // console.log(data1)
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div className='flex items-center align-item flex-col w-[18.875rem] h-[9.875rem] bg-white rounded-lg shadow-lg m-5 p-3'>
            <div className='w-full flex flex-row justify-between'>
                <div className='flex flex-row items-center gap-2'>
                    <div>
                        <Image src={singleCoin?.image?.thumb} height={30} width={30} alt='btc' />
                    </div>
                    <div className='flex flex-col'>
                        <span className='symbol uppercase'>{singleCoin?.symbol}</span>
                        <span className='name'>{singleCoin?.name}</span>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <span className='price'>$ {singleCoin?.market_data?.current_price?.usd}</span>
                    <span className='percent' style={{color:singleCoin?.market_data?.market_cap_change_percentage_24h>0?"green":"#EE2E6B"}}>{singleCoin?.market_data?.market_cap_change_percentage_24h?.toFixed(2)}% {singleCoin?.market_data?.market_cap_change_percentage_24h>0?<i class="bi bi-arrow-up"></i>:<i class="bi bi-arrow-down"></i>}</span>
                </div>
            </div>
            <Line
                data={{
                    labels: historicalData?.map((coin) => {
                        const date = new Date(coin[0]);
                        let time = date.getHours() > 12 ? `${date.getHours() - 12}:${date.getMinutes()} PM` : `${date.getHours()}:${date.getMinutes()} AM`;
                        return time
                    }),
                    datasets: [{ data: historicalData?.filter((coin) => coin[1] !== null).map((coin) => { return coin[1] }), label: "", borderColor: colorArr[Math.floor(Math.random()*colorArr.length)]}]
                }}
                options={{
                    elements: {
                        point: {
                            radius: 0.01
                        }
                    },
                    scales: {
                        y: {
                            suggestedMin: 0, // Set a minimum value for the y-axis
                            suggestedMax: 100, // Set a maximum value for the y-axis
                            display: false, // Hide the labels along the y-axis
                        },
                        x: {
                            suggestedMin: 0, // Set a minimum value for the y-axis
                            suggestedMax: 100, // Set a maximum value for the y-axis
                            display: false, // Hide the labels along the y-axis
                        },
                    }
                }}
            />
        </div>
    )
}

export default Card