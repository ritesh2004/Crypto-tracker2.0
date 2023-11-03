"use client"
import React, { useEffect, useState } from "react";
// import Plot from "react-plotly.js";
// import { data } from "autoprefixer";
import dynamic from "next/dynamic";
import './Coingraph.css'
import { Ohlc } from "../api/Ohlc";
import Image from "next/image";
import PageWrapper from "./PageWrapper";

const DynamicPlot = dynamic(() => import('react-plotly.js'), {
  ssr: false, // This ensures Plotly is only loaded on the client side
});

function Coingraph(props) {
  const [priceData, setData] = useState([]);
  const [candlestickData, setCandlestickData] = useState([]);
  // console.log(props)
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await Ohlc((props?.id?props.id:"bitcoin"),"USD","14")
        setData(data)
        // console.log(data)
      } catch (error) {
        console.error("Error while fetching data:", error);
      }
    };

    getData();
  }, [props]);
  // console.log(priceData)
  useEffect(() => {
    if (priceData && priceData.length > 0) {
      const candlestickData = {
        x: priceData.map(item => new Date(item[0])),
        close: priceData.map(item => item[4]),
        decreasing: { line: { color: '#9D7FFE' } },
        high: priceData.map(item => item[2]),
        increasing: { line: { color: '#39D3EC' } },
        line: { color: 'rgba(31,119,180,1)' },
        low: priceData.map(item => item[3]),
        open: priceData.map(item => item[1]),
        type: 'candlestick',
        xaxis: 'x',
        yaxis: 'y',
      };

      setCandlestickData(candlestickData);
    }
  }, [priceData,props]);

  let layout = {
    dragmode: 'zoom',
    margin: {
      r: 10,
      t: 25,
      b: 40,
      l: 60
    },
    showlegend: false,
    xaxis: {
      autorange: true,
      domain: [0, 1],
      range: candlestickData.x && candlestickData.x.length > 0 ? [candlestickData.x[0], candlestickData.x[candlestickData.x.length - 1]] : [],
      rangeslider: {
        range: candlestickData.x && candlestickData.x.length > 0 ? [candlestickData.x[0], candlestickData.x[candlestickData.x.length - 1]] : [],
      },
      title: 'Date',
      type: 'date'
    },
    yaxis: {
      autorange: true,
      domain: [0, 1],
      range: candlestickData.x && candlestickData.x.length > 0 ? [Math.min(...candlestickData.low), Math.max(...candlestickData.high)] : [],
      type: 'linear'
    }
  };


  return (
    <div className="myDIV flex justify-center items-center w-[90%]">
      {candlestickData.x && candlestickData.x.length > 0 ? (
        <figure className="plt">
          <DynamicPlot className="w-full h-full" data={[candlestickData]} layout={layout} />
        </figure>
      ) : (
        <div className='w-full h-full flex justify-center items-center'>
                <figure className='flex justify-center h-[5rem] w-[5rem] object-cover bg-cover'>
                    <Image src="/Images/Spinner.gif" height={100} width={100} alt='gif'/>
                </figure>
            </div>
      )}
    </div>
  );
}

export default Coingraph