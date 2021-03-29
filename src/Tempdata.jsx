import React, { useEffect, useState } from 'react';
// import axios from 'axios';



const Tempdata =()=>{
    const [city,setCity]=useState({});
    const[search,setSearch] = useState("pune");
    const date = new Date().toDateString(); 
    const otime = new Date().toLocaleTimeString();
    const[time ,setTime] = useState(otime);

    const Updatetime=()=>{
        
        let ntime = new Date().toLocaleTimeString();
        setTime(ntime);
    }

    setInterval(Updatetime,1000);

        const hour =new Date().getHours();


    useEffect(()=>{
        const fetchapi =async()=>{
            // const API_KEY = process.env.REACT_APP_API_KEY;
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;
            const response = await fetch(url);
            const rjson = await response.json();
            console.log(rjson);
            setCity(rjson);
            console.log(rjson);
            console.log(process.env);

        };
        fetchapi();
    },[search])
    const inputval =(e)=>{
        setSearch(e.target.value);
    }
    return(<>
        <div className={hour>6 && hour<18?"main":"main1"}>
        {(hour>6 && hour<18)?<h3 className="mainhtag1"><i className="fas fa-sun" ></i> </h3>:
            <h3 className="mainhtag"><i className="fas fa-moon" ></i> </h3>}
        <div className={hour> 6 && hour <18 ?"box":"box1"} >
       
            <div className="inputbox">
                <input type="search" className="inputfeild" value={search} onChange={inputval}/>
            </div>
       {!city.main?(
           <p>No data found for your result</p>
       ):(
           <>
           <div className="info">
            <h2 className="location">
                <i className="fas fa-street-view"></i> {search}, {city.sys.country}
            </h2>
            <p> {date}</p>
            <p>{time}</p>
            <h1 className="temp">
                {city.main.temp}°C
            </h1>
            <h3 className="tempin_max">
                min:{city.main.temp_min}°C || max:{city.main.temp_max}°C

            </h3>
            <h3 className="wheater_condition">{city.weather[0].main}</h3>
        </div>
           </>
       )}
        
        </div>
        </div>
    </>);
}


export default Tempdata;