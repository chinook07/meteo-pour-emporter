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
    const [cityChosen, setCityChosen] = useState("");

    const updateCity = (e) => {
        setCityEntered(e.target.value);
        noneFound === true && setNoneFound(false)
    }

    const searchCity = (e) => {
        if (cityEntered !== "") {
            e.preventDefault();
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

    const selectDate = (date, dateIndex) => {
        fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${cityChosen.lat}&lon=${cityChosen.lon}&key=${REACT_APP_CLE_METEO}&lang=fr`)
            .then(res => res.json())
            .then(data => {
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
                setAllWeather(updatedForecast)
                setShowCal(false);
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
                <div>Aucun résultat!</div>
            }
            {
                cityChosen !== "" && showCal &&
                <QuandSerez>Quand serez-vous à <span>{cityChosen.name}</span>?</QuandSerez>
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

const QuandSerez = styled.div`
    margin-top: 10px;
    span {
        font-weight: bold;
    }
`

export default Entry;