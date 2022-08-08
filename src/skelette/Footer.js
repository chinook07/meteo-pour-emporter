import styled from "styled-components";

const Footer = () => {
    return (
        <Wrapper>
            Pied de page
        </Wrapper>
    )
}

const Wrapper = styled.footer`
    background-color: var(--c-green);
    color: var(--c-light);
    padding: 15px;
`

export default Footer;