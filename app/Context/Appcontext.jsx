import React, { createContext, useEffect, useState } from 'react'
import { Coinlist } from '../api/Coinlist';

const Appcontext = createContext()

export default Appcontext

const ContextProvider = ({children}) => {
    const [id,setId] = useState();
    const [coinArr,setArr] = useState([]);
    const [searched,setRes] = useState([]);
    useEffect(()=>{
        const fetchData = async () =>{
            try {
                const data = await Coinlist("USD");
                console.log(data)
                setArr(data)
            } catch (error) {
                console.error("Error while fetching the data: ",error)
            }
        }

        fetchData()
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