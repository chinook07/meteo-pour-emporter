import styled from "styled-components";
import { WiSunrise } from "react-icons/wi"
import {TiWeatherCloudy, TiWeatherSunny, TiWeatherDownpour, TiWeatherPartlySunny, TiWeatherWindyCloudy} from "react-icons/ti"
import {IconArrowWaveRightUp} from "@tabler/icons";

const Header = () => {
    return (
        <Wrapper>
            <Line1>
                <Title>
                    <WiSunrise/>
                    <h1>Météo pour emporter</h1>
                </Title>
            </Line1>

            <Logo>
                <div>Vos prévisions personnalisées pour votre voyage</div>
                <IconGalore>
                    <TiWeatherCloudy />
                    <IconArrowWaveRightUp />
                    <TiWeatherSunny />
                    <IconArrowWaveRightUp />
                    <TiWeatherDownpour />
                    <IconArrowWaveRightUp />
                    <TiWeatherPartlySunny />
                    <IconArrowWaveRightUp />
                    <TiWeatherWindyCloudy />
                </IconGalore>
            </Logo>
        </Wrapper>
    )
}

const Wrapper = styled.header`
    background-image: linear-gradient(to top right, var(--c-green), var(--c-lemon));
    color: var(--c-light);
`

const Line1 = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    nav {
        display: flex;
        justify-content: center;
        a {
            background-color: var(--c-lemon);
            color: var(--c-dark);
            padding: 10px;
            text-decoration: none;
            &:hover {
                background-color: var(--c-light);
            }
        }
        .active {
            background-color: var(--c-green);
            color: var(--c-light);
            cursor: default;
            &:hover {
                background-color: var(--c-green);
            }
        }
    }
`

const Title = styled.div`
    align-items: center;
    display: flex;
    font-size: 26px;
    h1 {
        font-size: 26px;
    }
`

const Logo = styled.div`
    font-size: 22px;
    padding: 40px 10px;
    text-align: center;
`

const IconGalore = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin-top: 10px;
`

export default Header;