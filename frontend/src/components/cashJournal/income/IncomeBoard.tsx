import {Booking} from "../../../types/booking.ts";
import {DataGrid, GridColDef, GridRenderCellParams} from "@mui/x-data-grid";
import styled from "@emotion/styled";

type IncomeProps = {
	cashData: Booking[];
}
export default function IncomeBoard({cashData}: IncomeProps) {
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
		{field: 'amount', headerName: 'Betrag', width: 120},
	];
	return (
		<div>
			<h1>Einnahmen</h1>
			<StyledDataGrid columns={columns} rows={cashData.filter((booking) => booking.type === 'INCOME')} getRowId={(row) => row.id }
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