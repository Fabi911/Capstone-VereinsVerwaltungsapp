import {Link} from "react-router-dom";
import styled from "styled-components";

export default function Header() {
    return (
        <StyledHeader>
           <StyledLink to={"/"}><h1>Vereinsverwaltung</h1></StyledLink>
        </StyledHeader>
    );
}

// Styles

const StyledHeader = styled.header`
    background-color: #333;
    color: white;
    padding: 1rem;
    text-align: center;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    box-shadow: 1rem 2rem 1rem rgba(0, 0, 0, 0.2);
`;

const StyledLink = styled(Link)`
    color: white;
    text-decoration: none;
`;