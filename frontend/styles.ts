import  {css} from "@emotion/react";

// Define global styles
export const globalStyles = css`
    :root {
        font-size: 62.5%;
        margin: 0;
        padding: 0;
        font-family: worksans, sans-serif;
        --box-color: #e2e2e2;

        --box-shadow: 1rem 5rem 5rem rgba(0, 0, 0, 0.2);

    }

    body {
        font-size: 1.6rem;
        background-color: #f4f4f4;
        color: #333;
        margin: 15rem 0;
        display: flex;
        flex-direction: column;
        flex-direction: column;
        align-items: center;


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

`;