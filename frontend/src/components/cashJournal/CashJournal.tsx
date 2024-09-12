import {useEffect, useState} from "react";
import {Booking} from "../../types/booking.ts";
import axios from "axios";
import BookingTable from "./BookingTable.tsx";

export default function CashJournal() {
	const[cashData, setCashData] = useState<Booking[]|null>(null);

	const fetchCashData = async () => {
		try{
			axios.get(`/api/cash-journal`)
				.then((response) => {
					setCashData(response.data);
				});
		}
		catch(error){
			console.log(error);
		}
	}

	useEffect(() => {
		fetchCashData();
	}, []);

	if(cashData === null){
		return <div>Loading...</div>
	}

	return (
	<div>
		<BookingTable cashData={cashData.filter((booking) => booking.type === 'EXPENSE')} type={"Ausgaben"} />
		<BookingTable cashData={cashData.filter((booking) => booking.type === 'INCOME')} type={"Einnahmen"} />
	</div>
		)

}

// Styles