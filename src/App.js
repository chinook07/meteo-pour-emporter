import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";

import Header from "./skelette/Header";
import Main from "./skelette/Main";
import Footer from "./skelette/Footer";

// import Main from "../mainComponents/Main";
// import Apropos from "../mainComponents/Apropos";
// import Contact from "../mainComponents/Contact";

const App = () => {
    return (
        <Wrapper>
            <GlobalStyles />
            <Header />
            <Main />
            <Footer />
        </Wrapper>
    );
}

const Wrapper = styled.main`
    color: var(--c-green);
`

export default App;