"use client"
import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { Ohlc } from "../Config/Apis";
// import { data } from "autoprefixer";
import './Coingraph.css'


function Coingraph() {
  const [priceData, setData] = useState([]);
  const [candlestickData, setCandlestickData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res1 = await fetch(Ohlc("bitcoin", "USD", "14"));
        console.log(res1)
        if (res1.ok) {
          const data1 = await res1.json();
          console.log(data1)
          setData(data1);
          console.log(priceData)
        } else {
          console.error("Failed to fetch data from CoinGecko API.");
        }
      } catch (error) {
        console.error("Error while fetching data:", error);
      }
    };

    getData();
  }, []);
  console.log(priceData)
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
  }, [priceData]);

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
          <Plot className="w-full h-full" data={[candlestickData]} layout={layout} />
        </figure>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

export default Coingraph