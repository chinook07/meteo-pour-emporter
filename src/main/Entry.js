import { useContext, useState } from "react";
import styled from "styled-components";
import { format, compareAsc, parseISO } from "date-fns";
import { frCA } from "date-fns/locale";

import { WeatherContext } from "../WeatherContext";
import DestinationForm from "../bitsEntry/DestinationForm";
import Choices from "../bitsEntry/Choices";
import DateChoices from "../bitsEntry/DateChoices";

const { REACT_APP_CLE_METEO, REACT_APP_CLE_VILLE } = process.env;

const Entry = () => {
    const { allWeather, setAllWeather } = useContext(WeatherContext);

    const [cityEntered, setCityEntered] = useState("");
    const [citiesFound, setCitiesFound] = useState([]);
    const [noneFound, setNoneFound] = useState(false);
    const [showCal, setShowCal] = useState(false);
    const [multDates, setMultDates] = useState(false);
    const [cityChosen, setCityChosen] = useState("");

    const updateCity = (e) => {
        setCityEntered(e.target.value);
        noneFound === true && setNoneFound(false)
    }

    const searchCity = (e) => {
        if (cityEntered !== "") {
            e.preventDefault();
            setShowCal(false);
            fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityEntered}&limit=5&appid=${REACT_APP_CLE_VILLE}&units=metric&lang=fr`)
                .then(res => res.json())
                .then(data => {
                    setCitiesFound(data)
                    data.length === 0 && setNoneFound(true);
                })
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

    const handleMultDates = () => { setMultDates(!multDates) };

    const selectDate = (date, dateIndex) => {
        fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${cityChosen.lat}&lon=${cityChosen.lon}&key=${REACT_APP_CLE_METEO}&lang=fr`)
            .then(res => res.json())
            .then(data => {
                // Tenir compte des fuseaux horaires et du fait qu'il pourrait être mardi à destination et qu'il est lundi ici.
                const differenceInDay = compareAsc(parseISO(data.data[0].valid_date), parseISO(format(new Date(), "yyyy-MM-dd", { locale: frCA })));
                if (differenceInDay === 1) { dateIndex-- };
                if (differenceInDay === - 1) { dateIndex++ };
                
                let updatedForecast = [];
                if (allWeather && allWeather !== []) {
                    allWeather.forEach(element => {
                        updatedForecast.push(element)
                    });
                };
                updatedForecast.push({ date, dateIndex, city: cityChosen.name, weather: data.data[dateIndex] });

                // Tout remettre en ordre
                if (updatedForecast.length > 1) {
                    let copyOfAllWeather = [];
                    for (let d = 0; d < 14; d++) {
                        for (let c = 0; c < updatedForecast.length; c++) {
                            if (updatedForecast[c].dateIndex === d) {
                                copyOfAllWeather.push(updatedForecast[c])
                            }
                        }
                    }
                    updatedForecast = copyOfAllWeather;
                }

                localStorage.setItem("entireForecast", JSON.stringify(updatedForecast));
                setAllWeather(updatedForecast);
                if (!multDates) { setShowCal(false) }
            })
    }

    return (
        <Wrapper>
            <DestinationForm
                cityEntered={cityEntered}
                updateCity={updateCity}
                searchCity={searchCity}
            />
            {
                citiesFound.length > 0 &&
                <Choices
                    citiesFound={citiesFound}
                    selectCity={selectCity}
                />
            }
            {
                noneFound &&
                <Aucun>Aucun résultat!</Aucun>
            }
            {
                cityChosen !== "" && showCal &&
                    <QuandSerez>
                        <div>Quand serez-vous à <span>{cityChosen.name}</span>?</div>
                        <form>
                            <input
                                type="checkbox"
                                id="multiDates"
                                name="multiDates"
                                checked={multDates}
                                onChange={handleMultDates}
                            ></input>
                            <label htmlFor="multiDates">Dates multiples</label>
                        </form>
                    </QuandSerez>
                    
            }
            {
                showCal &&
                <DateChoices
                    selectDate={selectDate}
                />
            }
        </Wrapper>
    )
}

const Wrapper = styled.div`
    margin: 15px;
`

const Aucun = styled.div`
    color: var(--c-dark);
    font-size: large;
    font-weight: bold;
    margin-top: 10px;
    text-align: center;
`

const QuandSerez = styled.div`
    margin-top: 10px;
    label {
        padding: 10px;
    }
    span {
        font-weight: bold;
    }
`

export default Entry;