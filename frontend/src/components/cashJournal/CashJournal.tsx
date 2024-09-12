import {useEffect, useState} from "react";
import {Booking} from "../../types/booking.ts";
import axios from "axios";
import ExpenseBoard from "./expense/ExpenseBoard.tsx";
import IncomeBoard from "./income/IncomeBoard.tsx";

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
		<ExpenseBoard cashData={cashData} />
		<IncomeBoard cashData={cashData} />
	</div>
		)

}

// Styles