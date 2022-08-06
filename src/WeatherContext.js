import { createContext, useState, useEffect } from "react";
import { startOfToday, format, addDays, startOfDay } from "date-fns";
import { frCA } from "date-fns/locale";

export const WeatherContext = createContext();

const WeatherContextProvider = ({ children }) => {

    const [todayDate, setTodayDate] = useState();
    const [allDatesAvailable, setAllDatesAvailable] = useState();

    useEffect(() => {
        const today = (new Date());
        setTodayDate(format(startOfToday(today), "EEEE dd", { locale: frCA }));
        // 
    }, [])

    useEffect(() => {
        let allDatesTemp = [];
        for (let i = 0; i < 16; i++) {
            allDatesTemp[i] = (format(addDays(startOfToday(new Date()), i), "EEEE dd", {locale: frCA}))
        }
        setAllDatesAvailable(allDatesTemp);
    }, [todayDate])

    return (
        <WeatherContext.Provider
            value={{
                todayDate,
                allDatesAvailable
            }}
        >
            {children}
        </WeatherContext.Provider>
    )
}

export default WeatherContextProvider;