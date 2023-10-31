import React, { createContext, useEffect, useState } from 'react'
import { CoinList } from '../Config/Apis';

const Appcontext = createContext()

export default Appcontext

const ContextProvider = ({children}) => {
    const [id,setId] = useState();
    const [coinArr,setArr] = useState([]);
    const [searched,setRes] = useState([]);
    useEffect(()=>{
        const fetchData = async () =>{
            try {
                const res = await fetch(CoinList("USD"));
                if (res.ok) {
                    const data = await res.json()
                    setArr(data)
                } else {
                    console.log("Failed to fetch data from CoinGecko API")
                }
            } catch (error) {
                alert("Error while fetching the data",error)
            }
        }

        return () => fetchData()
    },[])

    const data = {
        setId:setId,
        id:id,
        coinArr:coinArr,
        searched:searched,
        setRes:setRes
    }
    return (
        <Appcontext.Provider value={data}>
            {children}
        </Appcontext.Provider>
    )
}

export {ContextProvider}