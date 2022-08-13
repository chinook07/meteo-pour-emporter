import { useContext } from "react";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";

import { WeatherContext } from "./WeatherContext";
import Header from "./skelette/Header";
import Main from "./skelette/Main";
import About from "./skelette/About";
import Footer from "./skelette/Footer";

const App = () => {
    const { ready, showAbout } = useContext(WeatherContext);

    return (
        <Wrapper>
            <GlobalStyles />
            <Header />
            {
                ready
                    ? <Main />
                    : <div>Veuillez patienter...</div>
            }
            {
                showAbout &&
                <About />
            }
            <Footer />
        </Wrapper>
    );
}

const Wrapper = styled.main`
    color: var(--c-green);
`

export default App;