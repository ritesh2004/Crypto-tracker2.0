import React, { useEffect, useState } from 'react';
import Linkify from "linkify-react";
import Link from 'next/link';
import {Singlecoin} from '../api/SingleCoin';

function CoinDetails(props) {
  const [coin, setCoin] = useState();
  const {id} = props
  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log(id)
        const data = await Singlecoin(id?id:"bitcoin")
        // console.log(data)
        setCoin(data)
      } catch (error) {
        console.log("Error while fetching data", error)
      }
    }

    fetchData()
  }, [id])
  // console.log(coin)
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
        <span style={{fontFamily:'Oxygen',color:'black',fontWeight:'400',fontSize:'1.125rem'}}>Sentiment Votes Up Percentage <span style={{color:'#01C0AA'}}><i className="bi bi-arrow-up"></i>{coin.sentiment_votes_up_percentage}%</span></span>

        <span style={{fontFamily:'Oxygen',color:'black',fontWeight:'400',fontSize:'1.125rem'}}>Sentiment Votes Down Percentage <span style={{color:'#EE2E6B'}}><i className="bi bi-arrow-down"></i>{coin.sentiment_votes_down_percentage}%</span></span>

        <span style={{fontFamily:'Oxygen',color:'black',fontWeight:'400',fontSize:'1.125rem'}}>Coin Link <a style={{textDecoration:'none',color:'violet'}} href={coin.links.homepage[0]}>Click Here</a></span>
      </div> : <span>Loading...</span>}
    </div>
  )
}

export default CoinDetails