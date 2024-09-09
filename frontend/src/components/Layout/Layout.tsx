import Footer from "./Footer.tsx";
import Header from "./Header.tsx";
import {ReactNode} from "react";

type LayoutProps = {
	children: ReactNode;
	logout: () => void;
	isUserLoggedIn: boolean;
};
export default function Layout({children, logout, isUserLoggedIn}: LayoutProps) {
	return (
		<>
			<Header logout={logout} isUserLoggedIn={isUserLoggedIn}/>
			<main>
				{children}
			</main>
			<Footer/>
		</>
	);
}