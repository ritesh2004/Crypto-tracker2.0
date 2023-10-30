import React, { useEffect, useState } from 'react';
import { NewsFeed } from '../Config/Apis';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function Newsfeed() {
  const route = useRouter();
  const [news, setNews] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(NewsFeed());
        if (res.ok) {
          const news = await res.json();
          // console.log(news.Data)
          setNews(news.Data)
        } else {
          console.log("Failed to fetch data from CryptoCompare API")
        }
      } catch (error) {
        alert("Error while fetching data", error)
      }
    }

    return () => fetchData()
  }, [])
  console.log(news)
  return (
    <div className='w-full bg-white text-black-900 flex flex-col gap-4 p-4'>
      <span style={{ fontFamily: 'Oxygen', color: 'black', fontWeight: '700', fontSize: '1.5rem' }}><i class="bi bi-square-fill" style={{ color: 'blueviolet' }}></i> NewsFeed</span>
      {news && news.length > 0 ?
        news.map((feeds, id) => {
          const dateString = new Date(feeds.published_on * 1000)
          const day = dateString.getDate()
          const hour = dateString.getHours()
          const minute = dateString.getMinutes()
          const monthArr = ['Jan', 'Fab', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
          const month = monthArr[dateString.getMonth()]
          {/* console.log(dateString) */ }
          return (
            <div className='w-[95%] h-[150px] shadow-lg rounded-lg flex flex-row bg-white overflow-hidden p-3 hover:cursor-pointer hover:bg-[#e5e5e5]' style={{ fontFamily: 'Oxygen' }} onClick={()=>route.push(feeds.guid)}>
              <div className='flex flex-col gap-3'>
                <span className='text-sm' style={{ fontFamily: 'Oxygen', fontWeight: '300', color: 'black', letterSpacing: '0.01719rem' }}>{day}{month} <span className='ml-2'> {hour}:{minute}</span></span>
                <div className='flex flex-col gap-2'>
                  <span className='text-gray-900 text-base font-normal'>{feeds.title}</span>
                  <span className='text-gray-400 text-sm font-light pb-2'>{feeds.body}</span>
                </div>
              </div>
              <div>
                <figure className='w-[7rem] h-[7rem]' style={{ overflow: 'hidden', objectFit: 'cover', backgroundSize: 'cover' }}>
                  <Image className='h-[100%] w-[100%]' src={feeds.imageurl} height={500} width={500} />
                </figure>
              </div>
            </div>
          )
        }) : <span>Loading...</span>
      }
    </div>
  )
}

export default Newsfeed