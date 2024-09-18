import axios from "axios";
import {BookingForm} from "../../types/booking.ts";
import Form from "./Form.tsx";

export default function AddBookingForm() {
	function postBooking(data: BookingForm): void {
		axios.post('/api/cash-journal', {
			date: data.date,
			description: data.description,
			amount: data.amount,
			category: data.category,
			type: data.type.toUpperCase()
		})
			.then(response => {
				console.log(response);
			})
			.catch(error => {
				console.error(error);
			});
	}

	return (
		<>
			<h1>Neue Buchung</h1>
			<Form dataFetch={postBooking}/>
		</>
	)
}