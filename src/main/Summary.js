import { useContext } from "react";
import styled from "styled-components";
import {RiCloseCircleLine} from "react-icons/ri"

import { WeatherContext } from "../WeatherContext";

const Summary = () => {
    const { allWeather, setAllWeather } = useContext(WeatherContext);

    const removeCity = (city) => {
        console.log(city);
        let wholeForecast = [];
        allWeather.forEach(element => {
            if (element.weather.sunset_ts !== city.weather.sunset_ts) {
                wholeForecast.push(element)
            }
        })
        console.log(wholeForecast);
        setAllWeather(wholeForecast);
    }

    if (allWeather.length > 0) {
        return (
            <Wrapper>
                <div>Prévisions sommaires :</div>
                <AllWeather>
                    {
                        allWeather.map((element, index) => {
                            return (
                                <OneWeather key={index}>
                                    <BasicInfo>
                                        <div>
                                            <div>{element.city}</div>
                                            <div>{element.date}</div>
                                        </div>
                                        <button onClick={() => removeCity(element)}>
                                            <RiCloseCircleLine size={25} title="Supprimer cette destination" />
                                        </button>
                                    </BasicInfo>
                                    
                                    <Forecast>
                                        <div>Température / ressenti °C</div>
                                        <Temp>
                                            <TempMin>
                                                <div>
                                                    <div>{element.weather.min_temp}</div>
                                                    <div>MIN</div>
                                                </div>
                                                <div>{element.weather.app_min_temp}</div>
                                            </TempMin>
                                            <TempMax>
                                                <div>
                                                    <div>{element.weather.max_temp}</div>
                                                    <div>MAX</div>
                                                </div>
                                                
                                                <div>{element.weather.app_max_temp}</div>
                                            </TempMax>
                                        </Temp>
                                        
                                        <div>{element.weather.weather.description}</div>
                                        <img src={`https://www.weatherbit.io/static/img/icons/${element.weather.weather.icon}.png`}></img>
                                        <div>Précip. : {element.weather.pop} %</div>
                                        {
                                            element.weather.precip === 0
                                                ? <div>Aucune précipitation</div>
                                                : element.weather.precip >= 1
                                                    ? <div>{parseInt(element.weather.precip)} mm de précip.</div>
                                                    : <div>{`<`} 1 mm de précip.</div>
                                        }
                                        <div>Vents : {element.weather.wind_cdir}, {parseInt(element.weather.wind_spd * 3.6)} km/h.</div>
                                        {
                                            element.weather.wind_gust_spd &&
                                            <div>Rafales à : {parseInt(element.weather.wind_gust_spd * 3.6)} km/h.</div>
                                        }
                                    </Forecast>
                                    
                                </OneWeather>
                            )
                        })
                    }
                </AllWeather>
                
            </Wrapper>
        )
    }
    
}

const Wrapper = styled.div``

const AllWeather = styled.div`
    display: flex;
    flex-wrap: wrap;
`

const OneWeather = styled.div`
    margin: 15px;
`

const BasicInfo = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
    > div {
        font-weight: bold;
    }
    button {
        align-content: center;
        background-color: var(--c-light);
        border: 1px solid var(--c-dark);
        border-radius: 25%;
        cursor: pointer;
        display: flex;
        height: 100%;
        &:hover {
            background-color: var(--c-lemon);

        }
    }
`

const Forecast = styled.div`
    margin-top: 10px;
`

const Temp = styled.div`
    color: var(--c-light);
    display: flex;
    margin: 5px 0;
`

const TempMin = styled.div`
    display: flex;
    > div:first-child {
        background-color: var(--c-min-1);
        border-radius: 5px 0 0 5px;
        height: fit-content;
        > div:first-child {
            font-size: large;
            margin: 15px 15px 15px 8px;
        }
        > div:last-child {
            margin-bottom: 5px;
            text-align: center;
        }
    }
    > div:last-child {
        background-color: var(--c-min-2);
        border-radius: 0 5px 5px 0;
        height: fit-content;
        margin: 20% 0 0 -10%;
        padding: 10px;
    }
`

const TempMax = styled.div`
    display: flex;
    > div:first-child {
        background-color: var(--c-max-1);
        border-radius: 5px 0 0 5px;
        height: fit-content;
        > div:first-child {
            font-size: large;
            margin: 15px 15px 15px 8px;
        }
        > div:last-child {
            margin-bottom: 5px;
            text-align: center;
        }
    }
    > div:last-child {
        background-color: var(--c-max-2);
        border-radius: 0 5px 5px 0;
        height: fit-content;
        margin: 20% 0 0 -10%;
        padding: 10px;
    }
`

export default Summary;