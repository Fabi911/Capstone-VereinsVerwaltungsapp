import Footer from "./Footer.tsx";
import Header from "./Header.tsx";
import {ReactNode} from "react";


type LayoutProps = {
	children: ReactNode;
	logout: () => void;
	isLoggedIn: boolean;
};
export default function Layout({children, logout, isLoggedIn}: LayoutProps) {
	return (
		<>
			<Header logout={logout} isLoggedIn={isLoggedIn}/>
			<main>
				{children}
			</main>
			<Footer/>
		</>
	);
}