import React, { useContext, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';
import Image from 'next/image';
import './Cards.css'
import Appcontext from '../Context/Appcontext';
import {Singlecoin} from '../api/SingleCoin';
import {HistoricalData} from '../api/HistoricalData';
import Wait from './Wait';

Chart.register(LineElement, PointElement, LinearScale, Title, CategoryScale);


const Card = async (props) => {

    const [historicalData, setHistoricalData] = useState([]);
    const [singleCoin, setSingle] = useState();

    const {id,setId} = useContext(Appcontext);
    const colorArr = ['gold','#5470DE','#47DFCF','#93D7FD','blueviolet','#480ca8','#90dbf4']

    const fetchSingleCoin = async () => {
        try {
            const data = await Singlecoin(props?.id)
            return data
        } catch (error) {
            console.log("Error while fetching data",error)
        }
    }

    const fetchHistoricalData = async () => {
        try {
            const data = await HistoricalData(props?.id,"INR","365")
            return data
        } catch (error) {
            console.log("Error while fetching data",error)
        }
    }

    useEffect(() => {
        fetchHistoricalData().then(res=>{
            setHistoricalData(res?.prices)
        })
        fetchSingleCoin().then(res=>{
            setSingle(res)
        })
    }, [])
    // await Wait(5000)
    return (
        <div className='flex items-center align-item flex-col w-[18.875rem] h-[9.875rem] bg-white rounded-lg shadow-lg m-5 p-3 hover:bg-[#e5e5e5] hover:cursor-pointer' onClick={()=>setId(singleCoin?.id)}>
            <div className='w-full flex flex-row justify-between'>
                <div className='flex flex-row items-center gap-2'>
                    <div>
                        <Image src={singleCoin?.image?.large} height={30} width={30} alt='btc' />
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
            style={{height:'80px'}}
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