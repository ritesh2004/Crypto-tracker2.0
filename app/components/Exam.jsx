"use client"
import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { HistoricalChart } from "../Config/Apis";


function Exam() {

  const [priceData,setData] = useState();
  const [data,setCandleStickData] = useState([]);

  useEffect(()=>{
    const getData = async () =>{
      const res1 = await fetch(HistoricalChart("bitcoin",30,"USD"))
      const data1 = await res1.json()
      // console.log(data1)
      setData(data1)
    }

    return () => getData()
  },[])

const pricesData = priceData?.prices;

const candlestickData = {
  x:[],
  close: [],
  decreasing: {line: {color: '#7F7F7F'}},
  high: [],
  increasing: {line: {color: '#17BECF'}}, 
  line: {color: 'rgba(31,119,180,1)'},
  low: [],
  open: [],
  type: 'candlestick', 
  xaxis: 'x', 
  yaxis: 'y'
};

for (let i = 0; i < pricesData?.length; i++) {
  const priceItem = pricesData[i];

  // Assuming priceItem structure: [timestamp, price]

  const [timestamp, price] = priceItem;

  // You can process the data to populate open, close, high, and low arrays
  // For example, you can set open and close to the same price, and high and low to the same price
  candlestickData.x.push(new Date(timestamp*1000))
  candlestickData.open.push(price-1);
  candlestickData.close.push(price+1);
  candlestickData.high.push(price+0.23);
  candlestickData.low.push(price-0.55);
}

  console.log(candlestickData);
  
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
      range: [candlestickData.x[0], candlestickData.x[721]], 
      rangeslider: {range: [candlestickData.x[0], candlestickData.x[721]]}, 
      title: 'Date', 
      type: 'date'
    }, 
    yaxis: {
      autorange: true, 
      domain: [0, 1], 
      range: [Math.min(...candlestickData.low), Math.max(...candlestickData.high)],
      type: 'linear'
    }
  };
  

  return (
    <div>
      <div id="myDIV">
      <Plot
        data={[candlestickData]}
        layout={layout}
      />
      </div>
    </div>
  )
}

export default Exam