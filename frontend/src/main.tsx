import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import GlobalStyles from "../styles.ts"
import {BrowserRouter} from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <GlobalStyles/>
        <BrowserRouter>
            <App/>
        </BrowserRouter>

    </StrictMode>,
)
