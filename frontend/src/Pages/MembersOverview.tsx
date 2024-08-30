import {useEffect, useState} from "react";
import Modal from "../components/modual/Modal.tsx";
import AddMember from "../components/Forms/AddMember.tsx";
import axios from "axios";
import {Member} from "../types/member.ts";
import {DataGrid, GridColDef, GridRenderCellParams} from '@mui/x-data-grid';
import styled from "@emotion/styled";
import {Link} from "react-router-dom";


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
    }, [modal]);

    const columns: GridColDef[] = [
        {
            field: 'link', headerName: 'Details', width: 100, renderCell: (params: GridRenderCellParams) => (
                <Link to={`/members/${params.row.memberId}`} className={"noDecoration"}>
                    Details
                </Link>
            )
        },
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
        {
            field: 'birthday',
            headerName: 'Geburtstag',
            width: 150,
            renderCell: (params: GridRenderCellParams) => new Date(params.row.birthday).toLocaleDateString()
        },
        {field: 'memberId', headerName: 'Mitgliedsnummer', width: 120},
    ];
    return (
        <div>
            <h1>Mitglieder</h1>
            <button onClick={() => setModal(true)}>Mitglied hinzufügen</button>
            {modal && <Modal setModal={setModal}><AddMember setModal={setModal}/></Modal>}

            <SyledDataGrid rows={membersDB} columns={columns} getRowId={(row) => row.memberId} initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: 10,
                    },
                },
            }}
                           sx={{fontSize: '1.4rem'}}/>
        </div>
    );
}

// Styles

const SyledDataGrid = styled(DataGrid)`
    width: 90vw;
    margin-top: 2rem;
`;

