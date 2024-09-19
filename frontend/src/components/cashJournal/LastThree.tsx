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
		{field: 'type', headerName: 'Buchungstyp', width: 150, renderCell: (params: GridRenderCellParams) => params.row.type === 'INCOME' ? 'Einnahme' : 'Ausgabe'},
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
		{
			field: 'amount',
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
			<DataGrid columns={columns} rows={bookings} getRowId={(row) => row.id} sx={{fontSize: '1.4rem'}}/>
		</div>
	);
}