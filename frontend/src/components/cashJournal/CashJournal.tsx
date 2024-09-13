import {useEffect, useState} from "react";
import {Booking} from "../../types/booking.ts";
import axios from "axios";
import BookingTable from "./BookingTable.tsx";
import Skeleton from "@mui/material/Skeleton";
import styled from "@emotion/styled";
import {Stack} from "@mui/material";

export default function CashJournal() {
	const [cashData, setCashData] = useState<Booking[] | null>(null);
	const fetchCashData = async () => {
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
			<BookingTable cashData={cashData.filter((booking) => booking.type === 'EXPENSE')} type={"Ausgaben"}/>
			<BookingTable cashData={cashData.filter((booking) => booking.type === 'INCOME')} type={"Einnahmen"}/>
		</div>
	)
}
// Styles
const StyledStack = styled(Stack)`
    margin-top: 2rem;
    width: 60vw;
`;