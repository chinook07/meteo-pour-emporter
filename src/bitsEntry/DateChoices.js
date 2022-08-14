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
    border-radius: 5px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-top: 15px;
`

const DateChoice = styled.div`
    background-color: var(--c-lemon);
    border-radius: 5px;
    cursor: pointer;
    margin: 10px;
    padding: 10px;
    min-width: calc(100% / 7 - 40px);
    text-align: center;
    &:hover {
        background-color: var(--c-light);
    }
    &:active {
        background-color: var(--c-yellow);
    }
`

export default DateChoices;