import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { format, compareAsc, parseISO } from "date-fns";
import { frCA } from "date-fns/locale";

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
                const differenceInDay = compareAsc(parseISO(data.data[0].valid_date), parseISO(format(new Date(), "yyyy-MM-dd", { locale: frCA })));
                if (differenceInDay === 1) { dateIndex-- };
                if (differenceInDay === - 1) { dateIndex++ };
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
                    <legend>
                        {
                            allWeather.length > 0
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
            </form>
            {
                citiesFound.length > 0 &&
                <Choices>
                        {
                            citiesFound.length > 1
                                ? <div>Voici les {citiesFound.length} résultats les plus probables.</div>
                                : <div>Voici le seul résultat :</div>
                        }
                        
                    {
                        citiesFound.map((element, index) => {
                            return (
                                <Choice
                                    key={index}
                                    onClick={() => selectCity(element)}
                                >
                                    <div>{index + 1} – {element.name}, {element.state}, {element.country}</div>
                                    <div>lat : {element.lat.toFixed(2)}, lon : {element.lon.toFixed(2)}</div>
                                </Choice>
                            )
                        })
                    }
                </Choices>
            }
            {
                cityChosen !== "" && showCal &&
                <div>Quand serez-vous à {cityChosen.name}?</div>
            }
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
            
        </Wrapper>
    )
}

const Wrapper = styled.div`
    margin: 15px;
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

const Choices = styled.div`
`

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