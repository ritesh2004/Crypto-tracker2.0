"use client"
import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import Appcontext from '../Context/Appcontext';

function Navbar() {
    const {coinArr,setRes} = useContext(Appcontext);
    const [search,setSearch] = useState("");
    const [open,setOpen] = useState(false);
    // console.log(coinArr)
    useEffect(()=>{
        const getData = () =>{
            console.log(coinArr)
            const mSearch = search.toLowerCase();
            const res = coinArr?.filter((coin,id)=>{
                return (
                    coin.name.toLowerCase().includes(mSearch) || coin.symbol.toLowerCase().includes(mSearch)
                )
            })
            setRes(res)
        }

        getData()
    },[search])
    return (
        <div>
            <nav className="bg-white h-[4.375rem] border-gray-200 shadow-lg">
                <div className="max-w-screen-xl flex flex-wrap flex-row-reverse items-center justify-between mx-auto p-4">
                    <div className="flex md:order-2">
                    
                        {open && <input className='mr-10 rounded-3xl border-black border-solid border-2 p-2' placeholder='Search for Crypto...' value={search} onChange={(e)=>setSearch(e.target.value)}/>}
                    
                        {!open&&<button type="button" aria-controls="navbar-search" aria-expanded="false" className="md:hidden text-gray-500 hover:bg-gray-100 rounded-lg text-sm p-2.5 mr-1" onClick={()=>setOpen(true)}>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                            <span className="sr-only">Search</span>
                        </button>}
                        <div className="relative hidden md:block">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-4 h-4 stroke-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="#50B8E4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                                <span className="sr-only">Search icon</span>
                            </div>
                            <input type="text" id="search-navbar" className="block w-[15rem] h-[1.875rem] p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Type any cryptocurrency..."/>
                        </div>
                        <button data-collapse-toggle="navbar-search" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100" aria-controls="navbar-search" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-search">
                        <div className="relative mt-3 md:hidden">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="text" id="search-navbar" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search..."/>
                        </div>
                        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
                            <li>
                            <Image className="w-10 h-10 rounded-full" height={20} width={20} src="https://th.bing.com/th/id/OIP.jryuUgIHWL-1FVD2ww8oWgHaHa?pid=ImgDet&rs=1" alt="Rounded avatar"/>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        </div>
    )
}

export default Navbar