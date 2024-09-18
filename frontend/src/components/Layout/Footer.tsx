import styled from "@emotion/styled";
import ThemeToggle from "./ThemeToggle.tsx";

export default function Footer() {
    return (
        <StyledFooter>
            <p>&copy; 2024 Fabian Döz. All rights reserved.</p>
            <ThemeToggle/>
        </StyledFooter>
    );
}

// Styles

const StyledFooter = styled.header`
    background-color: var(--bg-color-layout);
    color: white;
    padding: 1rem;
    text-align: center;
    width: 100vw;
    position: fixed;
    bottom: 0;
    left: 0;
`;