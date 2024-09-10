import Footer from "./Footer.tsx";
import Header from "./Header.tsx";
import {ReactNode} from "react";
import {AppUser} from "../../App.tsx";

type LayoutProps = {
	children: ReactNode;
	logout: () => void;
	appUser: AppUser | null | undefined;
};
export default function Layout({children, logout, appUser}: LayoutProps) {
	return (
		<>
			<Header logout={logout} appUser={appUser}/>
			<main>
				{children}
			</main>
			<Footer/>
		</>
	);
}