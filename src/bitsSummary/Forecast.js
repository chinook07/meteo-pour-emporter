import styled from "styled-components";

const Forecast = ({ element }) => {
    return (
        <Wrapper>
            <div>Température / ressenti °C</div>
            <Temp>
                <TempMin>
                    <div>
                        <TempNum>{element.weather.min_temp}</TempNum>
                        <TempDesc>MIN</TempDesc>
                    </div>
                    <div>{element.weather.app_min_temp}</div>
                </TempMin>
                <TempMax>
                    <div>
                        <TempNum>{element.weather.max_temp}</TempNum>
                        <TempDesc>MAX</TempDesc>
                    </div>
                    
                    <div>{element.weather.app_max_temp}</div>
                </TempMax>
            </Temp>
            
            <div>{element.weather.weather.description}</div>
            <img
                src={`https://www.weatherbit.io/static/img/icons/${element.weather.weather.icon}.png`}
                alt={element.weather.weather.description}
            ></img>
            <div>Précip. : {element.weather.pop} %</div>
            {
                element.weather.precip === 0
                    ? <div>Aucune précipitation</div>
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
`

const Temp = styled.div`
    color: var(--c-light);
    display: flex;
    margin: 5px 0;
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