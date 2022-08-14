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

    const reset = () => {
        setAllWeather([]);
        localStorage.removeItem("entireForecast")
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
                <button onClick={reset}>Effacer</button>
            </Wrapper>
        )
    }
    
}

const Wrapper = styled.div`
    margin: 15px;
    > div:first-child {
        text-align: center;
    }
    > button {
        background-color: var(--c-yellow);
        border: none;
        border-radius: 5px;
        cursor: pointer;
        display: block;
        margin: 0 auto;
        padding: 10px;
        &:hover {
            background-color: var(--c-lemon);
        }
        &:active {
            transform: scale(1.1);
        }
    }
`

const AllWeather = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
`

const OneWeather = styled.div`
    margin: 25px;
`

export default Summary;