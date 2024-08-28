import {Link} from "react-router-dom";

export default function Dashboard() {

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome to the dashboard</p>
            <Link to="/members">Mitglieder - Übersicht</Link>
        </div>
    );
}