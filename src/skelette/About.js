import { useContext } from "react";
import styled from "styled-components";
import { ExternalLink } from "react-external-link";

import { WeatherContext } from "../WeatherContext";
import { RiCloseCircleLine } from "react-icons/ri";

const About = () => {
    const { setShowAbout } = useContext(WeatherContext);
    const fermerBoite = () => setShowAbout(false);

    return (
        <Wrapper>
            <button onClick={fermerBoite}>
                <RiCloseCircleLine size={30} title="Fermer" />
            </button>
            <p>Météo pour emporter est un mini-projet pour étendre mes connaissances en développement web, tout en répondant à un besoin existant. Cette application vous permet de rechercher les prévisions météo pour plusieurs villes le long de votre itinéraire. C'est parfait pour une croisière, un <span>road trip</span>, un périple de cyclotourisme, ou tout autre voyage multi-villes. Puisque les prévisions changent rapidement, les données ne seront conservées en stockage local dans votre navigateur que pendant environ une heure.</p>
            <p>Les prévisions sont faites à l'aide de l'<span>API</span> <ExternalLink href="https://www.weatherbit.io/">Weatherbit</ExternalLink>, et sont mises à jour fréquemment. Si vous remarquez des problèmes avec ce site web, n'hésitez pas à me contacter <ExternalLink href="https://github.com/chinook07/meteo-pour-emporter">via GitHub</ExternalLink>.</p>
        </Wrapper>
    )
}

const Wrapper = styled.aside`
    background-color: var(--c-yellow);
    color: var(--c-dark);
    padding: 15px;
    button {
        background-color: inherit;
        border: none;
        display: block;
        margin: 0 0 0 auto;
    }
    p {
        span {
            font-style: italic;
        }
        a {
            text-decoration: none;
        }
    }
`

export default About;