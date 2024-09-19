import {Booking} from "../../types/booking.ts";
import {DataGrid, GridColDef, GridRenderCellParams} from "@mui/x-data-grid";
import axios from "axios";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditNoteIcon from "@mui/icons-material/EditNote";

type IncomeProps = {
	cashData: Booking[];
	type: string;
	fetchCashData: () => void;
}
export default function BookingTable({cashData, type, fetchCashData}: IncomeProps) {
	const deleteBooking = (id: string) => {
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
		{field: 'type', headerClassName: 'MuiDataGrid-columnHeaders',headerName: 'Buchungstyp', width: 150,renderCell: (params: GridRenderCellParams) => params.row.type === 'INCOME' ? 'Einnahme' : 'Ausgabe'},
		{field: 'description', headerClassName: 'MuiDataGrid-columnHeaders',headerName: 'Buchungstext', width: 250},
		{
			field: 'category', headerClassName: 'MuiDataGrid-columnHeaders',headerName: 'Kategorie', width: 250,
		},
		{
			field: 'date',
			headerClassName: 'MuiDataGrid-columnHeaders',
			headerName: 'Buchungsdatum',
			width: 150,
			renderCell: (params: GridRenderCellParams) => new Date(params.row.date).toLocaleDateString()
		},
		{
			field: 'amount',
			headerClassName: 'MuiDataGrid-columnHeaders',
			headerName: 'Betrag',
			width: 120,
			renderCell: (params: GridRenderCellParams) => `${params.row.amount} €`
		},
		{
			field: 'edit',
			headerClassName: 'MuiDataGrid-columnHeaders',
			headerName: 'Bearbeiten',
			width: 150,
			renderCell: (params: GridRenderCellParams) => <button
				onClick={() => window.location.href = `/cash-journal/update/${params.row.id}`}><EditNoteIcon fontSize="large"/></button>
		},
		{
			field: 'delete',
			headerClassName: 'MuiDataGrid-columnHeaders',
			headerName: 'Löschen',
			width: 150,
			renderCell: (params: GridRenderCellParams) => <button
				onClick={() => deleteBooking(params.row.id)}><DeleteForeverIcon fontSize="large"/></button>
		},
	];
	return (
		<div>
			<h3>{type}</h3>
			<DataGrid className="custom-header" columns={columns} rows={cashData} getRowId={(row) => row.id}
			                initialState={{
				                pagination: {
					                paginationModel: {
						                pageSize: 10,
					                },
				                },
			                }}
			                sx={{fontSize: '1.4rem', color:'var(--text-color)', borderColor: 'var(--box-border-color)'}}/>
		</div>
	)
}