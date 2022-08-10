import { useContext } from "react";
import styled from "styled-components";

import { WeatherContext } from "../WeatherContext";

const Calendar = () => {
    const { todayDate, allDatesAvailable } = useContext(WeatherContext);

    if (todayDate !== "") {
        return (
            <Wrapper>
                <Date>Date d'aujourd'hui : <span>{todayDate}</span>.</Date>
                <JusquA>Prévisions disponibles jusqu'au {allDatesAvailable[13]}.</JusquA>
            </Wrapper>
        )
    } else {
        return (
            <div>Veuillez patienter...</div>
        )
    }
}

const Wrapper = styled.div`
    margin: 15px;
`

const Date = styled.div`
    text-align: center;
    span {
        font-weight: bold;
    }
`

const JusquA = styled.div``

export default Calendar;