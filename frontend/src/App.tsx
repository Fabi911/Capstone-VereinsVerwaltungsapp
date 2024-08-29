
import { Routes, Route } from 'react-router-dom';
import Dashboard from "./Pages/Dashboard.tsx";
import Layout from "./components/Layout/Layout.tsx";
import MembersOverview from "./Pages/MembersOverview.tsx";
import MemberDetail from "./Pages/MemberDetail.tsx";


function App() {



    return (
            <Layout>
                <Routes>
                    <Route path="/" element={<Dashboard/>}/>
                    <Route path="/members" element={<MembersOverview/>}/>
                    <Route path="/members/:id" element={<MemberDetail/>}/>
                </Routes>
            </Layout>
    )
}

export default App
