import { useContext } from "react";
import styled from "styled-components";

import { WeatherContext } from "../WeatherContext";

const Calendar = () => {
    const { todayDate } = useContext(WeatherContext);

    if (todayDate !== "") {
        return (
            <Wrapper>
                <div>Date d'aujourd'hui : {todayDate}.</div>
            </Wrapper>
        )
    } else {
        return (
            <div>Veuillez patienter...</div>
        )
    }
}

const Wrapper = styled.div``

export default Calendar;