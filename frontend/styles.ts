import  {css} from "@emotion/react";

// Define global styles
export const globalStyles = css`
    :root {
        font-size: 62.5%;
        font-family: worksans, sans-serif;
        --box-color: #e2e2e2;
        --bg-color-layout: rgb(9, 92, 202);
        --text-color-layout: #fff;
        --text-color: #222;
        --background-color: #f4f4f4;
        --box-border: 0.2rem solid #2a2f39;
        --box-shadow: 1rem 5rem 5rem rgba(0, 0, 0, 0.2);
        --hover-color: #c7c6c6;
        --IconsBookingTable-color: #000;

    }

    [data-theme="dark"] {
        --box-color: #333;
        --bg-color-layout: #0e203c;
        --text-color-layout: #fff;
        --text-color: #eff6fb;
        --background-color: #18222c;
        --box-border: 0.2rem solid #2a2f39;
        --box-border-color: #2a2f39;
        --box-shadow: 1rem 5rem 5rem rgba(0, 0, 0, 0.5);
        --hover-color: #222;
        --IconsBookingTable-color: #fff;
    }

    body {
        font-size: 1.6rem;
        background-color: var(--background-color);
        color: var(--text-color);
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0;
        margin: 0;
        position: relative;
    }

    .IconsBookingTable {
        color: var(--IconsBookingTable-color) !important;
    }

    .custom-header {
        color: var(--text-color-layout);
        margin-top: 2rem;
    }

    .custom-header .MuiDataGrid-filler {
        background-color: var(--bg-color-layout);
    }

    .custom-header .MuiDataGrid-headerContainer {
        background-color: var(--bg-color-layout);

    }

    .custom-header .MuiDataGrid-columnHeaders {
        background-color: var(--bg-color-layout);
        color: var(--text-color-layout);
    }

    .custom-header .MuiTablePagination-root, .custom-header .MuiSvgIcon-root {
        color: var(--text-color);
        cursor: pointer;
    }

    .noDecoration {
        text-decoration: none;
        color: black;
    }

    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        margin: 10rem 0 7rem 0;
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