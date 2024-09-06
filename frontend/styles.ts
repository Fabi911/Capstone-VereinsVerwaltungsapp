import  {css} from "@emotion/react";

// Define global styles
export const globalStyles = css`
    :root {
        font-size: 62.5%;
        margin: 0;
        padding: 0;
        font-family: worksans, sans-serif;

        --box-shadow-default: 0 0 10px rgba(0, 0, 0, 0.1);

    }

    body {
        font-size: 1.6rem;
        background-color: #f0f0f0;
        color: #333;
        margin: 15rem 0;
        display: flex;
        flex-direction: column;
        align-items: center;

    }

    .noDecoration {
        text-decoration: none;
        color: black;
    }

`;