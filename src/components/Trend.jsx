import React, { useState } from 'react'

function Trend() {
    const [active,setActive]=useState("today")
    const [activeLang,setActiveLang]=useState("All languages")
    const Languages = ["All languages","JavaScript","Python","Java","TypeScript","C#","C++","PHP","C","React","Ruby"];
  return (
    <div className='flex-col flex items-start gap-3.5 justify-center  rounded-xl bg-white shadow px-5 py-5 transition-all duration-300 border-8 border-purple-200 '>
        <h1 className='text-2xl font-bold'>Trending Repositories</h1>
        <h1 className='text-gray-700 font-bold '>Time Range</h1>
        <div className='flex gap-5 flex-row font-semibold pb-2'>
            <button className={`  py-1.5 px-5 md:px-10 rounded-2xl justify-center items-center today ${active=="today"?"bg-purple-500 text-white hover:bg-purple-500/70":"bg-purple-100/60 hover:bg-purple-200"}`} onClick={()=>setActive("today")}>Today</button>

            
            <button className={`  py-1.5 px-5 md:px-10 rounded-2xl justify-center items-center week ${active=="week"?"bg-purple-500 text-white hover:bg-purple-500/70":"bg-purple-100/60 hover:bg-purple-200"}`} onClick={()=>setActive("week")}>This week</button>


            <button className={`  py-1.5 px-5 md:px-10 rounded-2xl justify-center items-center month ${active=="month"?"bg-purple-500 text-white hover:bg-purple-500/70":"bg-purple-100/60 hover:bg-purple-200"}`} onClick={()=>setActive("month")}>This Month</button>
        </div>
        <h1 className='text-gray-700 font-bold '>Language</h1>
        <div className='flex gap-2.5 items-center flex-wrap '>
            {
                Languages.map((item)=>{
                    return(
                        <button className={`  py-1.5 px-5  rounded-2xl items-center text-nowrap font-bold ${item} 
                            ${activeLang==item?"bg-purple-500 text-white hover:bg-purple-500/70":"bg-purple-100/60 hover:bg-purple-200"}`} 
                        onClick={()=>setActiveLang(item)}>{item}</button>
                    )
                })
            }
        </div>



    </div>
  )
}

export default Trend