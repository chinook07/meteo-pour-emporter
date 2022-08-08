import { useContext } from "react";
import styled from "styled-components";

import { WeatherContext } from "../WeatherContext";
import Form from "../main/Form";

const Entry = () => {
    const { allDatesAvailable, nOfDestinations, setNOfDestinations } = useContext(WeatherContext);

    if (typeof(allDatesAvailable) === "object") {
        return (
            <Wrapper>
                <div>Test : {allDatesAvailable[0]}.</div>
                {
                    [...Array(nOfDestinations)].map((element, index) => {
                        return <Form key={index} />
                    })
                }
                
            </Wrapper>
        )
    } else {
        return (
            <div>Veuillez patienter...</div>
        )
    }
}

const Wrapper = styled.div``

export default Entry;