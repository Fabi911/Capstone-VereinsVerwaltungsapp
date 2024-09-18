import  {css} from "@emotion/react";

// Define global styles
export const globalStyles = css`
    :root {
        font-size: 62.5%;
        margin: 0;
        padding: 0;
        font-family: worksans, sans-serif;
        --box-color: #e2e2e2;
        --bg-color-layout: #555;
        --text-color-layout: #fff;
        --text-color: #222;
        --background-color: #f4f4f4;
        --box-border: 0.2rem solid #2a2f39;
        --box-shadow: 1rem 5rem 5rem rgba(0, 0, 0, 0.2);
        --hover-color: #c7c6c6;

    }

    [data-theme="dark"] {
        --box-color: #333;
        --bg-color-layout: #02040a;
        --text-color-layout: #fff;
        --text-color: #eff6fb;
        --background-color: #0e1217;
        --box-border: 0.2rem solid #2a2f39;
	    --box-border-color: #2a2f39;
        --box-shadow: 1rem 5rem 5rem rgba(0, 0, 0, 0.5);
        --hover-color: #222;
    }

    body {
        font-size: 1.6rem;
        background-color: var(--background-color);
        color: var(--text-color);
        margin: 15rem 0;
        display: flex;
        flex-direction: column;
        flex-direction: column;
        align-items: center;


    }
	
	.custom-header  {
		color: var(--text-color-layout);
		margin-top: 2rem;
    }
	
	.custom-header .MuiDataGrid-filler{
		background-color: var(--bg-color-layout);		
	}
	
    .custom-header .MuiDataGrid-columnHeaderTitleContainer {
        background-color: var(--bg-color-layout);
	    		color: var(--text-color-layout);
    }

    .custom-header .MuiDataGrid-columnHeaders {
        background-color: var(--bg-color-layout); 
    }
	
    .noDecoration {
        text-decoration: none;
        color: black;
    }

    main {
        width: 90vw;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .ContentBox {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin: 0;
        border: var(--box-border);
        border-radius: 1rem;
        padding: 5rem 10rem;
    }

`;