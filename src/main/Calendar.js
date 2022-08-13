import { useContext } from "react";
import styled from "styled-components";

import { WeatherContext } from "../WeatherContext";

const Calendar = () => {
    const { todayDate, allDatesAvailable } = useContext(WeatherContext);

    if (todayDate !== "") {
        return (
            <Wrapper>
                <p>Date d'aujourd'hui : <span>{(todayDate.split(" "))[0]} le {(todayDate.split(" "))[1]}</span>.</p>
                <p>Prévisions disponibles jusqu'au {(allDatesAvailable[13].split(" "))[0]} le {(allDatesAvailable[13].split(" "))[1]}.</p>
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
    p {
        text-align: center;
        span {
            font-weight: bold;
        }
    }
`

export default Calendar;