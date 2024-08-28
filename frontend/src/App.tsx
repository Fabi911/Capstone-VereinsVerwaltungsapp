
import { Routes, Route } from 'react-router-dom';
import Dashboard from "./Pages/Dashboard.tsx";
import Layout from "./components/Layout/Layout.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
import MembersOverview from "./Pages/MembersOverview.tsx";


function App() {
   const [membersDB, setMembersDB] = useState([]);

   function fetchMembers():void {
        axios.get('api/members')
            .then(response => {
                setMembersDB(response.data);
            })
            .catch(error => {
                console.log(error);
   })}

    useEffect(() => {
        fetchMembers();
    }, []);


    return (
            <Layout>
                <Routes>
                    <Route path="/" element={<Dashboard/>}/>
                    <Route path="/members" element={<MembersOverview members={membersDB}/>}/>
                </Routes>
            </Layout>
    )
}

export default App
