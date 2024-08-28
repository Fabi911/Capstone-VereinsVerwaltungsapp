import  {createGlobalStyle} from "styled-components";

// Define global styles
export default createGlobalStyle`
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
        
    }

`;