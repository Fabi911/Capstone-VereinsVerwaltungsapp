import {Booking, BookingForm, Type} from "../../types/booking.ts";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import styled from "@emotion/styled";

type FormProps = {
	dataFetch: (data: BookingForm) => void;
	defaultData?: Booking | null;
};
export default function Form({dataFetch, defaultData}: FormProps) {
	const [type, setType] = useState<Type>(defaultData?.type || "INCOME");
	const [description, setDescription] = useState(defaultData?.description || "");
	const [category, setCategory] = useState(defaultData?.category || "");
	const [date, setDate] = useState(defaultData ? new Date(defaultData.date).toISOString().split('T')[0] : "");
	const [amount, setAmount] = useState(defaultData?.amount || 0);
	const navigate = useNavigate();
	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setType(event.target.value as Type);
	};
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
		await dataFetch(bookingData);
		form.reset();
		navigate('/cash-journal');
	}
	return (
		<FormStyled className="ContentBox" onSubmit={handleSubmit}>
			<InputField>
				<label htmlFor="type">Buchungstyp</label>
				<select id="type" name="type" value={type} onChange={handleChange} required>
					<option value="INCOME">Einnahme</option>
					<option value="EXPENSE">Ausgabe</option>
				</select>
			</InputField>
			<InputField>
				<label htmlFor="description">Buchungstext</label>
				<input type="text" id="description" name="description"
				       value={description} onChange={e => setDescription(e.target.value)} required/>
			</InputField>
			<InputField>
				<label htmlFor="category">Kategorie</label>
				<input type="text" id="category" name="category"
				       value={category} onChange={e => setCategory(e.target.value)} required/>
			</InputField>
			<InputField>
				<label htmlFor="date">Buchungsdatum</label>
				<input type="date" id="date" name="date" value={date}
				       onChange={e => setDate(e.target.value)} required/>
			</InputField>
			<InputField>
				<label htmlFor="amount">Betrag</label>
				<input type="number" step="0.01" id="amount" name="amount"
				       value={amount} onChange={e => setAmount(parseFloat(e.target.value))} required/>
			</InputField>
			<button type="submit">{!defaultData ? "Hinzufügen" : "Speichern"} </button>
		</FormStyled>
	);
}

// styles

const InputField = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 1rem;
`;

const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 300px;
    margin: 0;
    padding: 5rem 10rem;
`;