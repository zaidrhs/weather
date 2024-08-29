import React, { useState } from "react"
import './main.css'
import axios from "axios"
function App(){
const[city,setCity]=useState("")
const[temp,setTemp]=useState("")
const[wind,setwind]=useState("")
const[sky,setSky]=useState("")

async function getWeather() {
if(city!==""){
  try{
    let response=await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}%2Cegypt&appid=30240420ce3b384343d60d34912ab7db`)
    console.log(response.data)
    setTemp(response.data.main.temp)
    setwind(response.data.wind.speed)
    setSky(response.data.weather[0].description)
  }catch(err){
    if(err.response.status===404){
      window.alert("country not found")

    }
    console.log(err)
  }
}else{
  window.alert("enter city first")
}
}
function calc(temp){
  if(temp!==""){
    return temp - 273.15
  }
}
let ftemp=calc(temp)
console.log(ftemp)
  return(
    <div className="main">
    <div className="top">
      <input
      type="text"
      onChange={(e)=>setCity(e.target.value)}
      ></input>
      <button onClick={getWeather}>get weather</button>
    </div>
    <div className="bottom">
      <div>
        <h3>temp</h3>
        {temp!==""?<h1>{ftemp.toFixed(2)}</h1>:<h1>enter city</h1>}
      </div>
      <div>
        <h3>wind</h3>
        {wind!==""?<h1>{wind}</h1>:<h1>enter city</h1>}      </div>
      <div>
        <h3>cloud</h3>
        {sky!==""?<h1>{sky}</h1>:<h1>enter city</h1>}
      </div>
    </div>
    </div>
  )
}
export default App