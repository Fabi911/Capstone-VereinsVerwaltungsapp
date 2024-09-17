import axios from "axios";
import {useNavigate} from "react-router-dom";
import {BookingForm, Type} from "../../types/booking.ts";
import Form from "./Form.tsx";

export default function AddBookingForm() {
	const navigate = useNavigate();
	const handleSubmit =  async (event: React.FormEvent<HTMLFormElement>) => {
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
		await postBooking(bookingData);
		form.reset();
		navigate('/cash-journal');
	}

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
			<Form onSubmit={handleSubmit}/>
			</>
	)
}