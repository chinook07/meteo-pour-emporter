import styled from "styled-components";

const Footer = () => {
    return (
        <Wrapper>
            <div>Pied de page</div>
        </Wrapper>
    )
}

const Wrapper = styled.footer`
    background-color: var(--c-green);
    color: var(--c-light);
    width: 100%;
    div {
        padding: 15px;
    }
`

export default Footer;