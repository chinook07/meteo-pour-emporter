import { useContext } from "react";
import styled from "styled-components";

import { WeatherContext } from "../WeatherContext";

const DateChoices = ({ selectDate }) => {
    const { allDatesAvailable } = useContext(WeatherContext);

    return (
        <Wrapper>
            {
                allDatesAvailable.map((element, index) => {
                    return (
                        <DateChoice
                            key={index}
                            onClick={() => selectDate(element, index)}
                        >{element.slice(0, 3)} {(element.split(" "))[1]}
                        </DateChoice>
                    )
                })
            }
        </Wrapper>
        
    )
}

const Wrapper = styled.div`
    background-color: var(--c-green);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
`

const DateChoice = styled.div`
    background-color: var(--c-lemon);
    cursor: pointer;
    margin: 10px;
    padding: 10px;
`

export default DateChoices;