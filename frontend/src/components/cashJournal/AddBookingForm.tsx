import axios from "axios";
import {useNavigate} from "react-router-dom";
import {BookingForm, Type} from "../../types/booking.ts";
import React, {useState} from "react";

export default function AddBookingForm() {
	const navigate = useNavigate();
	const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
	const handleSubmit =  async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget;
		const formData = new FormData(form);
		const data = Object.fromEntries(formData);
		const fileUrl=await handleUpload();
		if (!fileUrl) {
			console.error("fileUrl ist leer");
			return;
		}
		const bookingData: BookingForm = {
			date: new Date(data.date as string),
			description: data.description as string,
			amount: parseFloat(data.amount as string),
			category: data.category as string,
			type: (data.type as string).toUpperCase() as Type,
			fileUrl: fileUrl
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
			type: data.type.toUpperCase(),
			fileUrl: data.fileUrl
		})
			.then(response => {
				console.log(response);
			})
			.catch(error => {
				console.error(error);
			});
	}


	const handleUpload = async () => {
		if (!selectedFile) return;
		const formData = new FormData();
		formData.append("file", selectedFile);  // 'file' ist der Parametername
		try {
			const response = await axios.post("/api/files/upload", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			console.log("Datei erfolgreich hochgeladen", response.data);
			return response.data;
		} catch (error) {
			console.error("Fehler beim Hochladen der Datei", error);
		}
	};
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
				<div className="form-group">
					<label htmlFor="file">Datei</label>
					<input type="file" id="file" name="file" className="form-control" onChange={(e)=>setSelectedFile(e.target.files?.[0])}/>
				</div>
				<button type="submit" className="btn btn-primary">Hinzufügen</button>
			</form>
		</div>
	)
}