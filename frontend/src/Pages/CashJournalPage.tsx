import {useEffect, useState} from "react";
import {Booking} from "../types/booking";
import axios from "axios";
import BookingTable from "../components/cashJournal/BookingTable.tsx";
import Skeleton from "@mui/material/Skeleton";
import styled from "@emotion/styled";
import {Stack} from "@mui/material";
import {Link} from "react-router-dom";

export default function CashJournalPage() {
	const [cashData, setCashData] = useState<Booking[] | null>(null);
	const [sumExpense, setSumExpense] = useState<number>(0);
	const [sumIncome, setSumIncome] = useState<number>(0);
	const fetchCashData = () => {
		try {
			axios.get(`/api/cash-journal`)
				.then((response) => {
					setCashData(response.data);
				});
		} catch (error) {
			console.log(error);
		}
	}
	useEffect(() => {
		fetchCashData();
	}, []);
	useEffect(() => {
		if (cashData !== null) {
			setSumIncome(parseFloat(cashData.filter((booking) => booking.type === 'INCOME').reduce((sum, booking) => sum + booking.amount, 0).toFixed(2)));
			setSumExpense(parseFloat(cashData.filter((booking) => booking.type === 'EXPENSE').reduce((sum, booking) => sum + booking.amount, 0).toFixed(2)));
		}
	}, [cashData]);
	if (cashData === null) {
		return <div>
			<h1>Kassenbuch</h1>
			<StyledStack spacing={1}>
				<Skeleton variant="text" sx={{fontSize: '3rem'}}/>
				<Skeleton variant="rectangular" height={60}/>
				<Skeleton variant="rectangular" height={60}/>
				<Skeleton variant="rectangular" height={60}/>
			</StyledStack>

			<StyledStack spacing={1}>
				<Skeleton variant="text" sx={{fontSize: '3rem'}}/>
				<Skeleton variant="rectangular" height={60}/>
				<Skeleton variant="rectangular" height={60}/>
				<Skeleton variant="rectangular" height={60}/>
			</StyledStack></div>
	}
	return (
		<div>
			<h1>Kassenbuch</h1>
			<Link to="/cash-journal/add">Buchung hinzufügen</Link>
			<BookingTable cashData={cashData.filter((booking) => booking.type === 'EXPENSE')} type={"Ausgaben"}
			              fetchCashData={fetchCashData}/>
			<p>Gesamtsumme der Ausgaben: {sumExpense} €</p>
			<br/>
			<BookingTable cashData={cashData.filter((booking) => booking.type === 'INCOME')} type={"Einnahmen"}
			              fetchCashData={fetchCashData}/>
			<p>Gesamtsumme der
				Einnahmen: {sumIncome} €</p>
			<h4>Differenz: {(sumIncome - sumExpense).toFixed(2)} €</h4>
		</div>
	)
}
// Styles
const StyledStack = styled(Stack)`
    margin-top: 2rem;
    width: 60vw;
`;