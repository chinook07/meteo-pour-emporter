import { useContext } from "react";
import styled from "styled-components";

import { WeatherContext } from "../WeatherContext";
import BasicInfo from "../bitsSummary/BasicInfo";
import Forecast from "../bitsSummary/Forecast";

const Summary = () => {
    const { allWeather, setAllWeather } = useContext(WeatherContext);

    const removeCity = (city) => {
        let wholeForecast = [];
        allWeather.forEach(element => {
            if (element.city !== city.city || element.date !== city.date) {
                wholeForecast.push(element)
            }
        })
        setAllWeather(wholeForecast);
        localStorage.setItem("entireForecast", JSON.stringify(wholeForecast));
    }

    if (allWeather && allWeather.length > 0) {
        return (
            <Wrapper>
                <div>Prévisions sommaires :</div>
                <AllWeather>
                    {
                        allWeather.map((element, index) => {
                            return (
                                <OneWeather key={index}>
                                    <BasicInfo
                                        element={element}
                                        removeCity={removeCity}
                                    />
                                    <Forecast
                                        element={element}
                                    >
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

const Wrapper = styled.div`
    margin: 15px;
`

const AllWeather = styled.div`
    display: flex;
    flex-wrap: wrap;
`

const OneWeather = styled.div`
    margin: 25px 25px 25px 0;
`

export default Summary;