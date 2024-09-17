import Form from "./Form.tsx";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {Booking, BookingForm, Type} from "../../types/booking.ts";
import {useEffect, useState} from "react";

export default function UpdateBookingForm() {
	const { id } = useParams();
	const navigate = useNavigate();
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
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget;
		const formData = new FormData(form);
		const data = Object.fromEntries(formData);
		const bookingData: BookingForm = {
			date: new Date(data.date as string),
			description: data.description as string,
			amount: parseFloat(data.amount as string),
			category: data.category as string,
			type: (data.type as string).toUpperCase() as Type
		};
		await updateBooking(bookingData);
		form.reset();
		navigate('/cash-journal');
	}

	const updateBooking= async (data: BookingForm) => {
		try{
		const res = await axios.put(`/api/cash-journal/${id}`, {
			date: data.date,
			description: data.description,
			amount: data.amount,
			category: data.category,
			type: data.type.toUpperCase()
		});
			console.log(res);
	}catch (e) {
			console.error(e);
			}
	}

	console.log(cashData)
	if (!cashData) {return <div>Loading...</div> }
	return (
		<>
			<h1>Buchung bearbeiten</h1>
			<Form onSubmit={handleSubmit} defaultData={cashData}/>
		</>)
}