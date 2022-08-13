import styled from "styled-components";

import Calendar from "../main/Calendar";
import Entry from "../main/Entry";
import Summary from "../main/Summary";

const Main = () => {
    return (
        <Wrapper>
            <Calendar />
            <Entry />
            <Summary />
        </Wrapper>
    )
}

const Wrapper = styled.main``

export default Main;