import {useEffect, useState} from "react";
import Modal from "../components/modual/Modal.tsx";
import AddMember from "../components/Forms/AddMember.tsx";
import axios from "axios";
import {Member} from "../types/member.ts";
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import styled from "styled-components";


export default function MembersOverview() {
    const [modal, setModal] = useState(false);
    const [membersDB, setMembersDB] = useState<Member[]>([]);

    function fetchMembers(): void {
        axios.get('api/members')
            .then(response => {
                setMembersDB(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        fetchMembers();
    }, []);

    const columns: GridColDef[] = [
        {field: 'name', headerName: 'Vorname', width: 150},
        {field: 'lastName', headerName: 'Nachname', width: 150},
        {field: 'email', headerName: 'E-Mail', width: 250},
        {field: 'phoneNumber', headerName: 'Telefon', width: 200},
        {
            field: 'address',
            headerName: 'Adresse',
            width: 350,
            renderCell: (params: { row: Member }) => {
                const address = params.row?.address;
                return address ? `${address.street}, ${address.zip} ${address.city}` : 'No Address';
            }
        },
        {field: 'birthday', headerName: 'Geburtstag', width: 150},
        {field: 'memberId', headerName: 'Mitgliedsnummer', width: 120},
    ];
    console.log(membersDB);
    return (
        <div>
            <h1>Mitglieder</h1>
            <button onClick={() => setModal(true)}>Mitglied hinzufügen</button>
            {modal && <Modal setModal={setModal}><AddMember setModal={setModal}/></Modal>}

            <SyledDataGrid rows={membersDB} columns={columns} getRowId={(row) => row.memberId} initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: 20,
                    },
                },
            }}
                           sx={{fontSize: '1.4rem'}}/>
        </div>
    );
}

// Styles

const SyledDataGrid = styled(DataGrid)`
    width: 100%;
    margin-top: 2rem;
`;
