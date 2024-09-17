import {Booking, Type} from "../../types/booking.ts";
import {useState} from "react";

type FormProps = {
	onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
	defaultData?: Booking | null;
};
export default function Form({onSubmit, defaultData}: FormProps) {
	const [type, setType] = useState<Type>(defaultData?.type || "INCOME");
	const [description, setDescription] = useState(defaultData?.description || "");
	const [category, setCategory] = useState(defaultData?.category || "");
	const [date, setDate] = useState(defaultData ? new Date(defaultData.date).toISOString().split('T')[0] : "");
	const [amount, setAmount] = useState(defaultData?.amount || 0);
	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setType(event.target.value as Type);
	};
	return (
		<form onSubmit={onSubmit}>
			<div>
				<label htmlFor="type">Buchungstyp</label>
				<select id="type" name="type" value={type} onChange={handleChange} required>
					<option value="INCOME">Einnahmen</option>
					<option value="EXPENSE">Ausgaben</option>
				</select>
			</div>
			<div>
				<label htmlFor="description">Buchungstext</label>
				<input type="text" id="description" name="description"
				       value={description} onChange={e => setDescription(e.target.value)} required/>
			</div>
			<div>
				<label htmlFor="category">Kategorie</label>
				<input type="text" id="category" name="category"
				       value={category} onChange={e => setCategory(e.target.value)} required/>
			</div>
			<div>
				<label htmlFor="date">Buchungsdatum</label>
				<input type="date" id="date" name="date" value={date}
				       onChange={e => setDate(e.target.value)} required/>
			</div>
			<div>
				<label htmlFor="amount">Betrag</label>
				<input type="number" step="0.01" id="amount" name="amount"
				       value={amount} onChange={e => setAmount(parseFloat(e.target.value))} required/>
			</div>
			<button type="submit">{!defaultData ? "Hinzufügen" : "Speichern"} </button>
		</form>
	);
}