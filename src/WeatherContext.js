import { createContext, useState, useEffect } from "react";
import { startOfToday, format, addDays } from "date-fns";
import { frCA } from "date-fns/locale";

export const WeatherContext = createContext();

const WeatherContextProvider = ({ children }) => {

    const [todayDate, setTodayDate] = useState(JSON.parse(localStorage.getItem("date")));
    const [time, setTime] = useState(JSON.parse(localStorage.getItem("time")));
    const [allDatesAvailable, setAllDatesAvailable] = useState(JSON.parse(localStorage.getItem("allDatesAvailable")));
    const [allWeather, setAllWeather] = useState(JSON.parse(localStorage.getItem("entireForecast")));
    const [ready, setReady] = useState(false);

    // Trouver la date d'aujourd'hui, l'heure, et les 14 jours à venir.

    useEffect(() => {

        const today = new Date();
        const timeNow = today.getHours();
        const todayFormatted = format(startOfToday(today), "EEEE dd", { locale: frCA });
        
        if (time === timeNow && todayDate === todayFormatted) {
            setReady(true);
        } else {
            setAllWeather([]);
            localStorage.clear();
            localStorage.setItem("time", JSON.stringify(timeNow));
            localStorage.setItem("date", JSON.stringify(todayFormatted));
            let allDatesTemp = [];
            for (let i = 0; i < 14; i++) {
                allDatesTemp.push(format(addDays(startOfToday(today), i), "EEEE dd", {locale: frCA}))
            }
            localStorage.setItem("allDatesAvailable", JSON.stringify(allDatesTemp));
            setReady(true)
        }
        
    }, [])

    return (
        <WeatherContext.Provider
            value={{
                todayDate,
                allDatesAvailable,
                allWeather,
                setAllWeather,
                ready
            }}
        >
            {children}
        </WeatherContext.Provider>
    )
}

export default WeatherContextProvider;