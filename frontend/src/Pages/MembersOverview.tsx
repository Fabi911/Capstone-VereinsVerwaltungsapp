import {Member} from "../types/member.ts";
import styled from "styled-components";

export default function MembersOverview({members}: {members: Member[]}) {
    console.log(members);
    return (
        <div>
            <h1>Mitglieder</h1>
            <Table>
                <thead>
                    <tr>
                        <th>Vorname</th>
                        <th>Nachname</th>
                        <th>E-Mail</th>
                        <th>Telefon</th>
                        <th>Adresse</th>
                        <th>Geburtstag</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map(member => (
                        <tr key={member.memberId}>
                            <td>{member.name}</td>
                            <td>{member.lastName}</td>
                            <td>{member.email}</td>
                            <td>{member.phoneNumber}</td>
                            <td>{member.address.street}, {member.address.zip} {member.address.city}</td>
                            <td>{member.birthday}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

// Styles

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    th {
        background-color: #f2f2f2;
        border: 1px solid #dddddd;
        padding: 8px;
        text-align: left;
    }
    td {
        border: 1px solid #dddddd;
        padding: 8px;
    }
    tr:nth-child(even) {
        background-color: #f2f2f2;
    }
    tr:hover {
        background-color: #f2f2f2;
    }
`