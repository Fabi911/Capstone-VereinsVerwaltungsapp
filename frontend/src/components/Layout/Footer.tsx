import styled from "styled-components";

export default function Footer() {
    return (
        <StyledFooter>
            <p>&copy; 2024</p>
        </StyledFooter>
    );
}

// Styles

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