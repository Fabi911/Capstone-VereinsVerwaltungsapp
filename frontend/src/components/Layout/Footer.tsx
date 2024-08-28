export default function Footer() {
    return (
        <StyledFooter>
            <p>&copy; 2024</p>
        </StyledFooter>
    );
}

import styled from "styled-components";

const StyledFooter = styled.header`
    background-color: #333;
    color: white;
    padding: 1rem;
    text-align: center;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
`;