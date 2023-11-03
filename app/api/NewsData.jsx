import axios from 'axios'
import React from 'react'

export const NewsData = async () => {
  const {data} = await axios.get(`https://min-api.cryptocompare.com/data/v2/news/?lang=EN&api_key=cfe2e7fb0c0ff293b4019ad888e7626bdc860f730eb1e3e7a9c9c882f823057c`);
  return data;
}
