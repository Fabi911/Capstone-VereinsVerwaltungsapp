import {Link} from "react-router-dom";

export default function Header() {
    return (
        <StyledHeader>
           <Link to={"/"}><h1>My App</h1></Link>
        </StyledHeader>
    );
}

import styled from "styled-components";

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