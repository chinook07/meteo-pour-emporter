import { useContext } from "react";
import styled from "styled-components";
import { ExternalLink } from "react-external-link";

import { WeatherContext } from "../WeatherContext";

const Footer = () => {
    const { showAbout, setShowAbout } = useContext(WeatherContext);

    const showAboutBox = () => {
        showAbout ? setShowAbout(false) : setShowAbout(true);
    }

    return (
        <Wrapper>
            <Left>
                <ExternalLink href="https://www.linkedin.com/in/nicolazoghbi/">LinkedIn</ExternalLink>
                <ExternalLink href="https://github.com/chinook07/meteo-pour-emporter">GitHub</ExternalLink>
            </Left>
            <Right>
                <div onClick={showAboutBox}>À propos</div>
            </Right>
        </Wrapper>
    )
}

const Wrapper = styled.footer`
    background-color: var(--c-green);
    display: flex;
    justify-content: space-between;
    width: 100%;
`

const Left = styled.div`
    display: flex;
    padding: 15px;
    a {
        color: var(--c-light);
        margin-right: 20px;
        text-decoration: none;
        &:hover {
            opacity: 0.8;
        }
    }
`

const Right = styled.div`
    color: var(--c-light);
    cursor: pointer;
    display: flex;
    padding: 15px;
    &:hover {
        opacity: 0.8;
    }
`

export default Footer;