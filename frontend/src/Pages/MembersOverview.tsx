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

	function fetchMembers(): void {
		axios.get('/api/members')
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
			const lowerCaseSearch = search.toLowerCase();
			return member.name.toLowerCase().includes(lowerCaseSearch) ||
				member.lastName.toLowerCase().includes(lowerCaseSearch) ||
				member.email.toLowerCase().includes(lowerCaseSearch) ||
				member.phoneNumber.toLowerCase().includes(lowerCaseSearch) ||
				/*member.address.street.toLowerCase().includes(lowerCaseSearch) ||
				member.address.zip.toLowerCase().includes(lowerCaseSearch) ||
				member.address.city.toLowerCase().includes(lowerCaseSearch) ||*/
				member.birthday.toString().includes(lowerCaseSearch) ||
				member.memberId.toString().toLowerCase().includes(lowerCaseSearch);
		}) || [];
	}

	return (
		<Container>
			<h1>Mitglieder</h1>

			<OverviewMenuBar>
				<AddButton onClick={() => setModal(true)}><PersonAddIcon fontSize="large"/></AddButton>
				<SearchField type="search" placeholder="Suche..." onChange={event => setSearch(event.target.value)}/>
			</OverviewMenuBar>
			{
				modal && <Modal setModal={setModal}>
					<AddMember setModal={setModal} fetchMembers={fetchMembers}/>
				</Modal>
			}
			{
				!membersDB && <p>Daten werden geladen...</p>
			}
			{
				!membersDB && <StyledStack spacing={1}>
					<Skeleton variant="text" sx={{fontSize: '3rem'}}/>
					<Skeleton variant="rectangular" height={60}/>
					<Skeleton variant="rectangular" height={60}/>
					<Skeleton variant="rectangular" height={60}/>
				</StyledStack>
			}
			{
				membersDB &&
				<StyledDataGrid rows={searchMembers()} columns={columns} getRowId={(row) => row.memberId}
				                initialState={{
					                pagination: {
						                paginationModel: {
							                pageSize: 10,
						                },
					                },
				                }}
				                sx={{fontSize: '1.4rem'}}/>
			}
		</Container>
	)
		;
}
// Styles
const StyledDataGrid = styled(DataGrid)`
    width: 90vw;
    margin-top: 2rem;
`;
const StyledStack = styled(Stack)`
    margin-top: 2rem;
    width: 90vw;
`;
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const OverviewMenuBar = styled.div`
    display: flex;
    justify-content: space-between;
    width: 90vw;
    padding: 0 0 1rem 0;
    border-bottom: 1px solid black;
`;
const AddButton = styled.button`
    align-self: flex-start;
`;
const SearchField = styled.input`
    width: 25rem;
    align-self: flex-end;
`;