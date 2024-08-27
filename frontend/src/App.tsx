
import { Routes, Route } from 'react-router-dom';
import Dashboard from "./components/Pages/Dashboard.tsx";
import Layout from "./components/Layout/Layout.tsx";


function App() {
    return (
            <Layout>
                <Routes>
                    <Route path="/" element={<Dashboard/>}/>
                </Routes>
            </Layout>
    )
}

export default App
