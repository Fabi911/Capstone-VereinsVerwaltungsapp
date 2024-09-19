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
    background-color: var(--bg-color-layout);
    color: var(--text-color-layout);
    padding: 0.1rem;
    text-align: center;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
	font-size: 1.2rem;
`;