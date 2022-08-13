import styled from "styled-components";

const Choices = ({citiesFound, selectCity}) => {

    return (
        <Wrapper>
            {
                citiesFound.length > 1
                    ? <div>Voici les {citiesFound.length} résultats les plus probables.</div>
                    : <div>Voici le seul résultat :</div>
            }
            <AllChoices>
                {
                    citiesFound.map((element, index) => {
                        return (
                            <Choice
                                key={index}
                                onClick={() => selectCity(element)}
                            >
                                {
                                    element.state
                                        ? <div>{index + 1} – {element.name}, {element.state}, {element.country}</div>
                                        : <div>{index + 1} – {element.name}, {element.country}</div>
                                }
                                <div>lat : {element.lat.toFixed(2)}, lon : {element.lon.toFixed(2)}</div>
                            </Choice>
                        )
                    })
                }
            </AllChoices>
        </Wrapper>
        
    )
}

const Wrapper = styled.div`
    margin-top: 10px;
    
`

const AllChoices = styled.div`
    display: flex;
    flex-wrap: wrap;
    /* justify-content: center; */
    margin-top: 10px;
`

const Choice = styled.div`
    cursor: pointer;
    padding: 15px;
    min-width: calc(20% - 30px);
    &:hover {
        background-color: var(--c-dark);
    }
    &:nth-child(odd) {
        background-color: var(--c-lemon);
    }
    &:nth-child(even) {
        background-color: var(--c-light);
    }
`

export default Choices;