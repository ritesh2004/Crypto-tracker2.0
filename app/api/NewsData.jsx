import axios from 'axios'
import React from 'react'

export const NewsData = async () => {
  const {data} = await axios.get(`https://min-api.cryptocompare.com/data/v2/news/?lang=EN&api_key=${process.env.CRYPTO_API_KEY}`);
  return data;
}
