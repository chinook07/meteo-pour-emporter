import { useContext } from "react";
import styled from "styled-components";

import { WeatherContext } from "../WeatherContext";

const Summary = () => {
    const { allWeather } = useContext(WeatherContext);

    if (allWeather.length > 0) {
        return (
            <Wrapper>
                <div>Prévisions sommaires :</div>
                <AllWeather>
                    {
                        allWeather.map((element, index) => {
                            return (
                                <OneWeather key={index}>
                                    <button>Enlever</button>
                                    <div>{element.city}</div>
                                    <div>{element.date}</div>
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
`

const OneWeather = styled.div`

`

export default Summary;