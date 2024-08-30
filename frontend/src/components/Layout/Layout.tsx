import Footer from "./Footer.tsx";
import Header from "./Header.tsx";
import {ReactNode} from "react";

type LayoutProps = {
    children: ReactNode;
};

export default function Layout({children}: LayoutProps) {
    return (
        <>
            <Header/>
            <main>
                {children}
            </main>
            <Footer/>
        </>
    );
}

