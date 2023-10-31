import React, { useContext } from 'react'
import Appcontext from '../Context/Appcontext'
import Image from 'next/image'

function Result() {
    const {searched,setId,setRes} = useContext(Appcontext)
    const handleSearch = (id) => {
        setId(id);
        setRes([]);
    }
    return (
        <div>
            <ul class="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg">
                {searched?.map((arr,id)=>{
                    return(
                        <li class="w-full px-4 py-2 border-b border-gray-200 hover:bg-[#e5e5e5] hover:cursor-pointer flex flex-row justify-between" onClick={()=>handleSearch(arr?.id)} key={id}>
                            <Image className='rounded-full' src={arr?.image} height={20} width={20} alt={arr?.id}/>
                            <span style={{fontFamily:'Oxygen',fontWeight:'400'}}>{arr?.name}</span>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Result