import React, { useEffect, useState } from 'react';
import { SingleCoin } from '../Config/Apis';
import Linkify from "linkify-react";

function CoinDetails(props) {
  const [coin, setCoin] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(SingleCoin(props?.id?props.id:"bitcoin"));
        if (res.ok) {
          const data = await res.json()
          setCoin(data)
        }
        else {
          console.log("Failed to fetch data from CoinGecko API")
        }
      } catch (error) {
        alert("Error while fetching data", error)
      }
    }

    return () => fetchData()
  }, [props])

  const options = {
    render: {
      url: ({ attributes, content }) => {
        return <a {...attributes}>{content}</a>;
      },
      mention: ({ attributes, content }) => {
        const { href, ...props } = attributes;
        return <Link to={href} {...props}>{content}</Link>;
      }
    }
  }
  return (
    <div className='bg-white w-full p-5'>
      <span className='mb-5' style={{fontFamily:'Oxygen',color:'black',fontWeight:'700',fontSize:'1.5rem'}}><i class="bi bi-square-fill" style={{color:'blueviolet'}}></i> Important Info</span>
      {coin ? <div className='flex flex-col gap-3'>
        <p className='text-gray-500' style={{fontFamily:'Oxygen',fontWeight:'300',fontSize:'1.125rem'}}>
          <Linkify options={options}>
            {coin.description.en.split(". ")[0]}.
          </Linkify>
        </p>
        <span style={{fontFamily:'Oxygen',color:'black',fontWeight:'400',fontSize:'1.125rem'}}>Market Cap Rank <span className='text-green-600'>{coin.market_cap_rank}</span></span>

        <span style={{fontFamily:'Oxygen',color:'black',fontWeight:'400',fontSize:'1.125rem'}}>Price Change 24h <span className='text-gray-500'>{coin.market_data.price_change_24h} USD</span></span>
        <span style={{fontFamily:'Oxygen',color:'black',fontWeight:'400',fontSize:'1.125rem'}}>Sentiment Votes Up Percentage <span style={{color:'#01C0AA'}}><i class="bi bi-arrow-up"></i>{coin.sentiment_votes_up_percentage}%</span></span>

        <span style={{fontFamily:'Oxygen',color:'black',fontWeight:'400',fontSize:'1.125rem'}}>Sentiment Votes Down Percentage <span style={{color:'#EE2E6B'}}><i class="bi bi-arrow-down"></i>{coin.sentiment_votes_down_percentage}%</span></span>

        <span style={{fontFamily:'Oxygen',color:'black',fontWeight:'400',fontSize:'1.125rem'}}>Coin Link <a style={{textDecoration:'none',color:'violet'}} href={coin.links.homepage[0]}>Click Here</a></span>
      </div> : <span>Loading...</span>}
    </div>
  )
}

export default CoinDetails