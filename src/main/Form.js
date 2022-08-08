import { useContext, useState, useEffect } from "react";
import styled from "styled-components";

import { WeatherContext } from "../WeatherContext";

const Form = () => {
    const { allDatesAvailable, allWeather, setAllWeather } = useContext(WeatherContext);

    const [cityEntered, setCityEntered] = useState("");
    const [citiesFound, setCitiesFound] = useState([]);
    const [showCal, setShowCal] = useState(false);
    const [cityChosen, setCityChosen] = useState("");

    const updateCity = (e) => {
        setCityEntered(e.target.value);
    }

    const searchCity = (e) => {
        if (cityEntered !== "") {
            e.preventDefault();
            fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityEntered}&limit=5&appid=c77a7a4b3db833e991269e38c96f8d5d&units=metric&lang=fr`)
                .then(res => res.json())
                .then(data => setCitiesFound(data))
        } else {
            e.preventDefault();
        }
    }

    const selectCity = (city) => {
        setCityChosen(city);
        setCitiesFound([]);
        setCityEntered("");
        setShowCal(true);
    }

    const selectDate = (date, dateIndex) => {
        fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${cityChosen.lat}&lon=${cityChosen.lon}&key=efcab29fd72a499ebc37f605f0cdb1af&lang=fr`)
            .then(res => res.json())
            .then(data => {
                setAllWeather((prev) => [...prev, { date, dateIndex, city: cityChosen.name, weather: data.data[dateIndex] }]);
                setShowCal(false);
            })
    }

    useEffect(() => {
        if (allWeather.length > 0) {
            let copyOfAllWeather = [];
            for (let d = 0; d < 14; d++) {
                for (let c = 0; c < allWeather.length; c++) {
                    if (allWeather[c].dateIndex === d) {
                        copyOfAllWeather.push(allWeather[c])
                    }
                }
            }
            setAllWeather(copyOfAllWeather);
        }
    }, [showCal])

    return (
        <Wrapper>
            <form onSubmit={searchCity}>
                <fieldset>
                    <input
                        type="text"
                        value={cityEntered}
                        onChange={updateCity}
                    ></input>
                    <button type="submit">Rechercher</button>
                </fieldset>
            </form>
            {
                citiesFound.length > 0 &&
                    <Choices>
                        {
                            citiesFound.map((element, index) => {
                                return (
                                    <Choice
                                        key={index}
                                        onClick={() => selectCity(element)}
                                    >
                                        <div>{element.name}, {element.state}, {element.country}</div>
                                        <div>lat : {element.lat.toFixed(2)}, lon : {element.lon.toFixed(2)}</div>
                                    </Choice>
                                )
                            })
                        }
                    </Choices>
            }
            {
                cityChosen !== "" &&
                <>
                    <div>{cityChosen.name}</div>
                    {
                        showCal &&
                        <DateChoices>
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
                        </DateChoices>
                    }
                    
                </>
                
            }
        </Wrapper>
    )
}

const Wrapper = styled.div`
    padding: 15px;
    fieldset {
        padding: 5px;
    }
`

const Choices = styled.div``

const Choice = styled.div`
    cursor: pointer;
    &:hover {
        background-color: var(--c-dark);
    }
`

const DateChoices = styled.div`
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

export default Form;