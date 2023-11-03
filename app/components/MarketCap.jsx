import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import Appcontext from '../Context/Appcontext';
import { TrendingCoin } from '../api/TrendingCoin';

function MarketCap() {
  const [coinArr, setCoinArr] = useState([]);
  const { setId } = useContext(Appcontext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await TrendingCoin("USD");
        setCoinArr(data);
      } catch (error) {
        console.error("Error while fetching data: ", error);
      }
    };

    fetchData();
  }, []);

//   console.log(coinArr);

  return (
    <div className="relative overflow-x-auto rounded-lg">
      <table className="text-sm text-left text-gray-500 rounded md:w-full xl:w-full">
        <thead className="text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3" style={{ fontFamily: 'Oxygen', fontSize: '1rem' }}>
              <i style={{ color: 'blueviolet' }} className="bi bi-square-fill"></i> Market Cap
            </th>
            <th scope="col" className="px-6 py-3">
              <i className="bi bi-arrow-down-up"></i>
            </th>
          </tr>
        </thead>
        <tbody>
          {coinArr && coinArr.length > 0 ? (
            coinArr.map((coin, id) => {
              return (
                <tr className="bg-white border-b hover:cursor-pointer hover:bg-[#e5e5e5]" onClick={() => setId(coin?.id)} key={id}>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex flex-row gap-3 items-center uppercase font-bold">
                    <Image src={coin.image} height={30} width={30} alt={coin.id} />
                    {coin.symbol}
                  </th>
                  <td className="px-6 py-4 text-black-500">
                    <span className='flex flex-row gap-3' style={{ fontFamily: 'Oxygen', fontWeight: '400' }}>
                      $ {coin.market_cap}
                      <span style={{ color: coin.market_cap_change_percentage_24h > 0 ? "green" : "#EE2E6B" }}>
                        {coin.market_cap_change_percentage_24h.toFixed(2)}
                        {coin.market_cap_change_percentage_24h > 0 ? <i className="bi bi-arrow-up"></i> : <i className="bi bi-arrow-down"></i>}
                      </span>
                    </span>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="2">
              <div className='w-full h-full flex justify-center items-center'>
                <figure className='flex justify-center h-[3rem] w-[3rem] object-cover bg-cover'>
                    <Image src="/Images/Spinner.gif" height={100} width={100} alt='gif'/>
                </figure>
            </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default MarketCap;
