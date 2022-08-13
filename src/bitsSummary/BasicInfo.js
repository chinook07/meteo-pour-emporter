import styled from "styled-components";
import { RiCloseCircleLine } from "react-icons/ri";

const BasicInfo = ({ element, removeCity }) => {
    return (
        <Wrapper>
            <div>
                <div>{element.city}</div>
                <div>{element.date}</div>
            </div>
            <button onClick={() => removeCity(element)}>
                <RiCloseCircleLine size={25} title="Supprimer cette destination" />
            </button>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
    > div {
        font-weight: bold;
    }
    button {
        align-content: center;
        background-color: var(--c-light);
        border: 1px solid var(--c-dark);
        border-radius: 25%;
        cursor: pointer;
        display: flex;
        height: 100%;
        &:hover {
            background-color: var(--c-lemon);

        }
    }
`

export default BasicInfo;