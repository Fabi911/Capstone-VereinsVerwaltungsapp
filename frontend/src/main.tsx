import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import {globalStyles} from "../styles.ts"
import {Global} from "@emotion/react";
import {BrowserRouter} from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Global styles={globalStyles}/>
        <BrowserRouter>
            <App/>
        </BrowserRouter>

    </StrictMode>,
)