import React, { useEffect, useState } from 'react';
// import axios from 'axios';





const Tempdata =()=>{
  
    const [lat, setLat] = useState([]);
    const [long, setLong] = useState([]);
    
     const [city,setCity]=useState({});
    const[search,setSearch] = useState("");
   
    const [data,setData]=useState({});

    useEffect(() => {
        const fetchdata =async()=>{
            if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(function(position) {
          setLat(position.coords.latitude);
          setLong(position.coords.longitude);
        })}
        else{
                setLat(18.5196);
                setLong(73.8553);
                alert("You have disabled location service.");
            }
        console.log("Latitude is:", lat);
        console.log("Longitude is:", long);
       const url = await fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${process.env.REACT_APP_API_KEY}`);
       const rjson = await url.json();
       setData(rjson);
       console.log(rjson);
    }
    fetchdata();
      }, [lat, long]);
     
    useEffect(()=>{
        const fetchapi =async()=>{
             const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;
            const response = await fetch(url);
            const resjson = await response.json();
            console.log(resjson);
            setCity(resjson);
            console.log(resjson);
            console.log(process.env);
        };
        fetchapi();
    },[search])

    const inputval =(e)=>{
        setSearch(e.target.value);
    }

    return(<>
        <div className="main">
        <div className="box">
            <div className="inputbox">
                <input type="search" className="inputfeild" value={search} onChange={inputval} placeholder="Enter City Name"/>
            </div>
            
       {!search?(!data.main?(<div className="nodata1"><p className="loading"></p><p>Please Wait...</p></div>):(<>
            <div className="info">
            <h2 className="location">
                <i className="fas fa-street-view"></i> {data.name},{data.sys.country}
            </h2>
             
            <h1 className="temp">
            {data.main.temp>20?<i class="fas fa-thermometer-three-quarters"></i>:<i class="fas fa-thermometer-quarter"></i>}{data.main.temp}°C  
            </h1>
            <div className="immg">
            <img src={'https://openweathermap.org/img/wn/'+data.weather[0].icon+'.png'} alt=".."/>
            </div>
            <h3 className="tempin_max">
                 min:{data.main.temp_min}°C || max:{data.main.temp_max}°C 
            </h3>
            <p className="sunrise_set"> Humidity : {data.main.humidity}% </p>
             <h3 className="wheater_condition">Weather : {data.weather[0].main}</h3> 
        </div>
        </>)):( !city.main?(<div className="nodata"><p className="nodata">No data found for your result 😞</p></div>):(<>
            <div className="info">
            <h2 className="location">
                <i className="fas fa-street-view"></i> {city.name},{city.sys.country}
            </h2>
         
            <h1 className="temp">
            {city.main.temp >= 20?(<i className="fas fa-thermometer-three-quarters"></i>):(<i className="fas fa-thermometer-quarter"></i>)} {city.main.temp}°C 
            </h1>
            <div className="immg">
            <img src={'https://openweathermap.org/img/wn/'+city.weather[0].icon+'.png'} alt=".."/>
            </div>
            <h3 className="tempin_max">
                 min:{city.main.temp_min}°C || max:{city.main.temp_max}°C 

            </h3>
            <p className="sunrise_set"> Humidity : {city.main.humidity}% </p>
            
             <h3 className="wheater_condition">Weather : {city.weather[0].main}</h3> 
            
             
        </div>
        </>))}
        </div>
        </div>
    </>);
}


export default Tempdata;