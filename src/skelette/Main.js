import { useContext } from "react";
import styled from "styled-components";

import { WeatherContext } from "../WeatherContext";
import Calendar from "../main/Calendar";
import Form from "../main/Form";
import Summary from "../main/Summary";

const Main = () => {
    return (
        <Wrapper>
            <Calendar />
            <Form />
            <Summary />
        </Wrapper>
    )
}

const Wrapper = styled.main``

export default Main;