import styled from "@emotion/styled";

export default function Footer() {
    return (
        <StyledFooter>
            <p>&copy; 2024 Fabian Döz. All rights reserved.</p>
        </StyledFooter>
    );
}

// Styles

const StyledFooter = styled.header`
    background-color: #959494;
    color: white;
    padding: 1rem;
    text-align: center;
    width: 100vw;
    position: fixed;
    bottom: 0;
    left: 0;
`;