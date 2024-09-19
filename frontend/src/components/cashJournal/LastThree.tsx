import axios from "axios";
import {useEffect, useState} from "react";
import {Booking} from "../../types/booking.ts";
import {DataGrid, GridColDef, GridRenderCellParams} from "@mui/x-data-grid";

export default function LastThree() {
	const [bookings, setBookings] = useState<Booking[] | null>(null);
	useEffect(() => {
		axios.get('/api/cash-journal/dashboard')
			.then(response => {
				setBookings(response.data);
			})
			.catch(error => {
				console.error('Es gab ein Problem beim Abrufen der Daten:', error);
			});
	}, []);
	const columns: GridColDef[] = [
		{
			field: 'type',
			headerClassName: 'MuiDataGrid-columnHeaders',
			headerName: 'Buchungstyp',
			width: 150,
			renderCell: (params: GridRenderCellParams) => params.row.type === 'INCOME' ? 'Einnahme' : 'Ausgabe'
		},
		{field: 'description', headerClassName: 'MuiDataGrid-columnHeaders', headerName: 'Buchungstext', width: 250},
		{
			field: 'category', headerClassName: 'MuiDataGrid-columnHeaders',
			headerName: 'Kategorie', width: 250,
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
		}
	];
	if (!bookings) {
		return <div>Es sind keine Buchungen vorhanden.</div>;
	}
	console.log(bookings);
	return (
		<div className="ContentBox">
			<h2>Letzte drei Buchungen</h2>
			<DataGrid className="custom-header" columns={columns} rows={bookings} getRowId={(row) => row.id}
			          sx={{fontSize: '1.4rem', color: 'var(--text-color)', borderColor: 'var(--box-border-color)'}}/>
		</div>
	);
}