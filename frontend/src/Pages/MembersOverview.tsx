import styled from "styled-components";
import {useEffect, useState} from "react";
import Modal from "../components/modual/Modal.tsx";
import AddMember from "../components/Forms/AddMember.tsx";
import axios from "axios";
import {Member} from "../types/member.ts";

export default function MembersOverview() {
    const [modal, setModal] = useState(false);
    const [membersDB, setMembersDB] = useState <Member[]>([]);

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
    }, [modal]);
    return (
        <div>
            <h1>Mitglieder</h1>
             <button onClick={() => setModal(true)}>Mitglied hinzufügen</button>
            {modal &&<Modal setModal={setModal}><AddMember setModal={setModal}/></Modal>}
            <Table>
                <thead>
                    <tr>
                        <th>Vorname</th>
                        <th>Nachname</th>
                        <th>E-Mail</th>
                        <th>Telefon</th>
                        <th>Adresse</th>
                        <th>Geburtstag</th>
                        <th>Mitgliedsnummer</th>
                    </tr>
                </thead>
                <tbody>
                    {membersDB.map(member  => (
                        <tr key={member.memberId}>
                            <td>{member.name}</td>
                            <td>{member.lastName}</td>
                            <td>{member.email}</td>
                            <td>{member.phoneNumber}</td>
                            <td>{member.address.street}, {member.address.zip} {member.address.city}</td>
                            <td>{new Date(member.birthday).toLocaleDateString()}</td>
                            <td>{member.memberId}</td>
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