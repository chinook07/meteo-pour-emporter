import styled from "styled-components";

const Forecast = ({ element }) => {
    return (
        <Wrapper>
            <div>Température °C</div>
            <Temp>
                <TempReel>
                    <MinR>{element.weather.min_temp}</MinR>
                    <MaxR>{element.weather.max_temp}</MaxR>
                </TempReel>
                <TempRess>
                    <MinS>{element.weather.app_min_temp}</MinS>
                    <TexteRess>Ressenti</TexteRess>
                    <MaxS>{element.weather.app_max_temp}</MaxS>
                </TempRess>
            </Temp>
            <img
                src={`https://www.weatherbit.io/static/img/icons/${element.weather.weather.icon}.png`}
                alt={element.weather.weather.description}
            ></img>
            <div>{element.weather.weather.description}</div>
            <div>Précip. : {element.weather.pop} %</div>
            {
                element.weather.precip === 0
                    ? <div>–––––––––––––</div>
                    : element.weather.precip >= 1
                        ? <div>{parseInt(element.weather.precip)} mm de précip.</div>
                        : <div>{`<`} 1 mm de précip.</div>
            }
            <div>Vents : {element.weather.wind_cdir}, {parseInt(element.weather.wind_spd * 3.6)} km/h.</div>
            {
                element.weather.wind_gust_spd &&
                <div>Rafales à {parseInt(element.weather.wind_gust_spd * 3.6)} km/h.</div>
            }
        </Wrapper>
    )
}

const Wrapper = styled.div`
    margin-top: 10px;
    text-align: center;
`

const Temp = styled.div`
    border-radius: 5px;
    color: var(--c-light);
    display: flex;
    flex-direction: column;
    margin: 5px 0;
    width: 100%;
    > div > div {
        padding: 10px;
    }
`

const TempReel = styled.div`
    display: flex;
    font-size: large;
`

const MinR = styled.div`
    background-color: blue;
    border-radius: 5px 0 0;
    width: 50%;
`

const MaxR = styled.div`
    background-color: red;
    border-radius: 0 5px 0 0;
    width: 50%;
`

const TempRess = styled.div`
    display: flex;
    opacity: 0.7;
`

const MinS = styled.div`
    background-color: blue;
    border-radius: 0 0 0 5px;
    width: 25%;
`

const TexteRess = styled.div`
    background-color: var(--c-dark);
    width: 50%;
`

const MaxS = styled.div`
    background-color: red;
    border-radius: 0 0 5px;
    width: 25%;
`

const TempMin = styled.div`
    display: flex;
    > div:first-child {
        background-color: var(--c-min-1);
        border-radius: 5px 0 0 5px;
        height: fit-content;
    }
    > div:last-child {
        background-color: var(--c-min-2);
        border-radius: 0 5px 5px 0;
        height: fit-content;
        margin: 20% 0 0 -10%;
        padding: 10px;
    }
`

const TempMax = styled.div`
    display: flex;
    > div:first-child {
        background-color: var(--c-max-1);
        border-radius: 5px 0 0 5px;
        height: fit-content;
    }
    > div:last-child {
        background-color: var(--c-max-2);
        border-radius: 0 5px 5px 0;
        height: fit-content;
        margin: 20% 0 0 -10%;
        padding: 10px;
    }
`

const TempNum = styled.div`
    font-size: large;
    margin: 15px 15px 15px 8px;
`

const TempDesc = styled.div`
    margin-bottom: 5px;
    text-align: center;
`

export default Forecast;