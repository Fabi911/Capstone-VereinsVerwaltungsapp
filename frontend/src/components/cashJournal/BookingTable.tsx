import {Booking} from "../../types/booking.ts";
import {DataGrid, GridColDef, GridRenderCellParams} from "@mui/x-data-grid";
import styled from "@emotion/styled";
import axios from "axios";

type IncomeProps = {
	cashData: Booking[];
	type: string;
	fetchCashData: () => void;

}
export default function BookingTable({cashData,type,fetchCashData}: IncomeProps) {

	const deleteBooking = (id:string) => {
		axios.delete(`/api/cash-journal/${id}`)
			.then(response => {
				console.log(response);
				fetchCashData()
			})
			.catch(error => {
				console.log(error);
			});
	}

	const columns: GridColDef[] = [
		{field: 'type', headerName: 'Buchungstyp', width: 150},
		{field: 'description', headerName: 'Buchungstext', width: 250},
		{
			field: 'category', headerName: 'Kategorie', width: 250,
		},
		{
			field: 'date',
			headerName: 'Buchungsdatum',
			width: 150,
			renderCell: (params: GridRenderCellParams) => new Date(params.row.date).toLocaleDateString()
		},
		{field: 'amount', headerName: 'Betrag', width: 120, renderCell: (params: GridRenderCellParams) => `${params.row.amount} €`},
		{field:'fileUrl', headerName: 'Beleg', width: 150, },
		{field:'delete', headerName: 'Löschen', width: 150, renderCell: (params: GridRenderCellParams) => <button onClick={()=>deleteBooking(params.row.id)}>Löschen</button>},
	];
	return (
		<div>
			<h3>{type}</h3>
			<StyledDataGrid columns={columns} rows={cashData} getRowId={(row) => row.id }
			                initialState={{
				                pagination: {
					                paginationModel: {
						                pageSize: 10,
					                },
				                },
			                }}
			                sx={{fontSize: '1.4rem'}}/>
		</div>
	)
}
const StyledDataGrid = styled(DataGrid)`
    margin-top: 2rem;
`;