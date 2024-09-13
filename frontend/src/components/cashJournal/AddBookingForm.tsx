import axios from "axios";
import {useNavigate} from "react-router-dom";
import {BookingForm, Type} from "../../types/booking.ts";

export default function AddBookingForm() {
	const navigate = useNavigate();
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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
		postBooking(bookingData);
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
		<div>
		<form onSubmit={handleSubmit}>
			<h1>Add Booking</h1>
			<div className="form-group">
				<label htmlFor="type">Buchungstyp</label>
				<select id="type" name="type" className="form-control" required>
					<option value="income">Income</option>
					<option value="expense">Expense</option>
				</select>
			</div>
			<div className="form-group">
				<label htmlFor="description">Buchungstext</label>
				<input type="text" id="description" name="description" className="form-control" required/>
			</div>
			<div className="form-group">
				<label htmlFor="category">Kategorie</label>
				<input type="text" id="category" name="category" className="form-control" required/>
			</div>
			<div className="form-group">
				<label htmlFor="date">Buchungsdatum</label>
				<input type="date" id="date" name="date" className="form-control" required/>
			</div>
			<div className="form-group">
				<label htmlFor="amount">Betrag</label>
				<input type="number" step="0.01" id="amount" name="amount" className="form-control" required/>
			</div>
			<button type="submit" className="btn btn-primary">Add</button>
		</form>

	</div>
	)
}