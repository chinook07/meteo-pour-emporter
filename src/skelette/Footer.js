import styled from "styled-components";
import { ExternalLink } from "react-external-link";

const Footer = () => {
    return (
        <Wrapper>
            <ExternalLink href="https://www.linkedin.com/in/nicolazoghbi/">LinkedIn</ExternalLink>
            <ExternalLink href="https://github.com/chinook07">GitHub</ExternalLink>
        </Wrapper>
    )
}

const Wrapper = styled.footer`
    background-color: var(--c-green);
    display: flex;
    width: 100%;
    a {
        color: var(--c-light);
        padding: 15px;
        text-decoration: none;
        &:hover {
            opacity: 0.8;
        }
    }
`

export default Footer;