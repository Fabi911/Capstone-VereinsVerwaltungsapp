import {useEffect, useState} from "react";
import Modal from "../components/modual/Modal.tsx";
import AddMember from "../components/Forms/AddMember.tsx";
import axios from "axios";
import {Member} from "../types/member.ts";
import {DataGrid, GridColDef, GridRenderCellParams} from '@mui/x-data-grid';
import Skeleton from '@mui/material/Skeleton';
import styled from "@emotion/styled";
import {Link} from "react-router-dom";
import {Stack} from "@mui/material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AccountBoxIcon from '@mui/icons-material/AccountBox';


export default function MembersOverview() {
    const [modal, setModal] = useState(false);
    const [membersDB, setMembersDB] = useState<Member[] | null>(null);
    const [search, setSearch] = useState<string>('');
    console.log(searchMembers());

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
                    <AccountBoxIcon fontSize="large"/>
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

    function searchMembers(): Member[] {
        return membersDB?.filter(member => {
            return member.name.toLowerCase().includes(search.toLowerCase()) ||
                member.lastName.toLowerCase().includes(search.toLowerCase()) ||
                member.email.toLowerCase().includes(search.toLowerCase()) ||
                member.phoneNumber.toLowerCase().includes(search.toLowerCase()) ||
                member.address.street.toLowerCase().includes(search.toLowerCase()) ||
                member.address.zip.toLowerCase().includes(search.toLowerCase()) ||
                member.address.city.toLowerCase().includes(search.toLowerCase()) ||
                member.birthday.toLowerCase().includes(search.toLowerCase()) ||
                member.memberId.toString().toLowerCase().includes(search.toLowerCase());
        }) || [];
    }

    searchMembers();

    return (
        <Container>
            <h1>Mitglieder</h1>
            <AddButton onClick={() => setModal(true)}><PersonAddIcon fontSize="large"/></AddButton>

            {modal && <Modal setModal={setModal}><AddMember setModal={setModal} fetchMembers={fetchMembers}/></Modal>}
            <input type="search" placeholder="Suche..." onChange={event => setSearch(event.target.value)}/>
            {!membersDB && <p>Daten werden geladen...</p>}
            {!membersDB && <StyledStack spacing={1}>
                <Skeleton variant="text" sx={{fontSize: '3rem'}}/>
                <Skeleton variant="rectangular" width={410} height={60}/>
                <Skeleton variant="rectangular" width={410} height={60}/>
                <Skeleton variant="rectangular" width={410} height={60}/>
            </StyledStack>}

            {membersDB &&
                <SyledDataGrid rows={searchMembers()} columns={columns} getRowId={(row) => row.memberId} initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
                               sx={{fontSize: '1.4rem'}}/>}
        </Container>
    );
}

// Styles

const SyledDataGrid = styled(DataGrid)`
    width: 90vw;
    margin-top: 2rem;
`;

const StyledStack = styled(Stack)`
    margin-top: 2rem;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const AddButton = styled.button`
    align-self: flex-start;
`