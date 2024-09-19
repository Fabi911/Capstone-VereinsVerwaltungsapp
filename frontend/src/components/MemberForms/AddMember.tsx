import styled from "@emotion/styled";
import axios from "axios";

export default function AddMember({setModal, fetchMembers}: {
	setModal: (value: boolean) => void,
	fetchMembers: () => void
}) {
	const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget;
		const formData = new FormData(form);
		const data = Object.fromEntries(formData);
		postMember(data);
		form.reset();
		setModal(false);
		setTimeout(() => fetchMembers(), 800);
	}
	const postMember = (data: any): void => {
		axios.post('api/members', {
			memberId: data.memberId,
			name: data.name,
			lastName: data.lastName,
			email: data.email,
			phoneNumber: data.phoneNumber,
			address: {
				street: data.street,
				zip: data.zip,
				city: data.city
			},
			birthday: data.birthday
		})
	}
	return (
		<div className="ContentBox">
			<h1>Neues Mitglied hinzufügen</h1>
			<FormStyled onSubmit={handleFormSubmit}>
				<InputField>
					<label htmlFor="memberId">Mitgliedsnummer</label>
					<input type="text" id="memberId" name="memberId"/>
				</InputField>
				<InputField>
					<label htmlFor="name">Vorname</label>
					<input type="text" id="name" name="name"/>
				</InputField>
				<InputField>
					<label htmlFor="lastName">Nachname</label>
					<input type="text" id="lastName" name="lastName"/>
				</InputField>
				<InputField>
					<label htmlFor="email">Email</label>
					<input type="email" id="email" name="email"/>
				</InputField>
				<InputField>
					<label htmlFor="phoneNumber">Telefon</label>
					<input type="tel" id="phoneNumber" name="phoneNumber"/>
				</InputField>
				<InputField>
					<label htmlFor="street">Straße</label>
					<input type="text" id="street" name="street"/>
				</InputField>
				<InputField>
					<label htmlFor="zip">PLZ</label>
					<input type="text" id="zip" name="zip" minLength={5} maxLength={5}/>
				</InputField>
				<InputField>
					<label htmlFor="city">Stadt</label>
					<input type="text" id="city" name="city"/>
				</InputField>
				<InputField>
					<label htmlFor="birthday">Geburtstag</label>
					<input type="date" id="birthday" name="birthday"/>
				</InputField>
				<button type="submit">Hinzufügen</button>
			</FormStyled>
		</div>
	);
}
// Styles
const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 300px;
    margin: 0;
    padding: 5rem 10rem;

`;
const InputField = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
`;