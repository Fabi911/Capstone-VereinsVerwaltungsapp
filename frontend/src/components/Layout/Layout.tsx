import Footer from "./Footer.tsx";
import Header from "./Header.tsx";
import {ReactNode} from "react";
import styled from "styled-components";

type LayoutProps = {
    children: ReactNode;
};

export default function Layout({children}: LayoutProps) {
    return (
        <>
            <Header/>
            <Main>
                {children}
            </Main>
            <Footer/>
        </>
    );
}

const Main = styled.main`
    margin: 13rem;
    
   
`;