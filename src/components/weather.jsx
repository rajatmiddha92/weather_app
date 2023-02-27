import axios from 'axios'
import { useState } from 'react'

const Weather=()=>{
const [data,setdata]=useState([])
const [city,setCity]=useState('')
const [error,setError]=useState(false)
const [arr,setarr]=useState([])

const handlereq=async()=>{
    if(arr.length<3){
        setarr([...arr,city])
    }
    else{
        arr.shift()
        setarr([...arr,city])
    }
    let res=await axios.get(`https://api.worldweatheronline.com/premium/v1/weather.ashx?q=${city}&num_of_results=1&format=json&key=29e85619179d4f43b82115948232702`)
    if(res.data.data.current_condition==undefined){
          setError(true)
          setdata([])
    }
    else{
        setError(false)
    setdata(res.data.data.current_condition)
    }
    console.log(res.data.data.current_condition)
}
console.log(arr)
    return (<>
      <h1 className="heading">Weather App</h1>
      <input className="search" onChange={(e)=>setCity(e.target.value)} placeholder="Enter City Name"/>
      <div className="btn-cont">
      {city && <button className="btn" onClick={handlereq}>Search</button>}
      </div>
      <div className='data'>
        <h1 className='head-city'>Weather details of City : {city}</h1>
        {error && <h1 className='message'>Enter a Valid City Name</h1>}
        {data.map((data,index)=>{
            return (<div key={index}>
                <h2>Current Temp : {data.temp_C}° C</h2>
                <h2>Temperature Range : {data.FeelsLikeC}° C to {data.temp_C}° C</h2>
                <h2>Humidity : {data.humidity} </h2>
                <h2>Sea level : {data.pressure}</h2>
                <h2>Wind speed : {data.windspeedKmph} KM/h</h2>
            </div>)
        })}
      </div>
      {city=="" && <h2 className='city-heading'>Last 3 City Entries</h2>}
        {city=="" && arr.map((data,index)=>{
            return(<ul className='ul' key={index}>
              <li className='list'>{data}</li>
            </ul>)
        })}
       
       
    </>)
}

export default Weather