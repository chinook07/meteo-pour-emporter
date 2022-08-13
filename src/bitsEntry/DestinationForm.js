import { useContext } from "react";
import styled from "styled-components";

import { WeatherContext } from "../WeatherContext";

const DestinationForm = ({cityEntered, updateCity, searchCity}) => {
    const { allWeather } = useContext(WeatherContext);

    return (
        <Wrapper onSubmit={searchCity}>
            <fieldset>
                <legend>
                    {
                        allWeather !== []
                            ? <div>Quelle sera votre prochaine destination?</div>
                            : <div>Quelle sera votre première destination?</div>
                    }
                </legend>
                <input
                    type="text"
                    value={cityEntered}
                    onChange={updateCity}
                ></input>
                <button type="submit">Rechercher</button>
            </fieldset>
        </Wrapper>
        
    )
}

const Wrapper = styled.form`
    fieldset {
        border-radius: 5px;
        display: flex;
        justify-content: center;
        padding: 5px;
        legend {
            padding: 5px;
        }
        input {
            background-color: var(--c-dark);
            border: 1px solid var(--c-lemon);
            border-radius: 5px;
            color: var(--c-light);
            margin: 10px;
            padding: 10px;
        }
        button {
            background-color: var(--c-lemon);
            border: 1px solid var(--c-dark);
            border-radius: 5px;
            color: var(--c-dark);
            cursor: pointer;
            margin: 10px;
            padding: 10px;
        }
    }
`

export default DestinationForm;