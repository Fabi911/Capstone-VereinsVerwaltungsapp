import Form from "./Form.tsx";
import axios from "axios";
import {useParams} from "react-router-dom";
import {Booking, BookingForm,} from "../../types/booking.ts";
import {useEffect, useState} from "react";

export default function UpdateBookingForm() {
	const {id} = useParams();
	const [cashData, setCashData] = useState<Booking | null>(null);
	const fetchCashDataById = async () => {
		try {
			const res = await axios.get(`/api/cash-journal/${id}`)
			setCashData(res.data);
		} catch (error) {
			console.log(error);
		}
	}
	useEffect(() => {
		fetchCashDataById();
	}, [id]);
	const updateBooking = async (data: BookingForm) => {
		try {
			const res = await axios.put(`/api/cash-journal/${id}`, {
				date: data.date,
				description: data.description,
				amount: data.amount,
				category: data.category,
				type: data.type.toUpperCase()
			});
			console.log(res);
		} catch (e) {
			console.error(e);
		}
	}
	console.log(cashData)
	if (!cashData) {return <div>Loading...</div> }
	return (
		<>
			<h1>Buchung bearbeiten</h1>
			<Form defaultData={cashData} dataFetch={updateBooking}/>
		</>)
}