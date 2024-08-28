import styled from "styled-components";
import axios from "axios";

export default function AddMember({setModal} : {setModal: (value: boolean) => void}) {
    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        postMember(data);
        console.log(data);
        form.reset();
        setModal(false);

    }
    const postMember = (data:any):void =>{
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
            <div>
                <h1>Neues Mitglied hinzufügen</h1>
                <Form onSubmit={handleFormSubmit}>
                    <Inputfield>
                        <label htmlFor="memberId">Mitgliedsnummer</label>
                        <input type="text" id="memberId" name="memberId"/>
                    </Inputfield>
                    <Inputfield>
                        <label htmlFor="name">Vorname</label>
                        <input type="text" id="name" name="name"/>
                    </Inputfield>
                    <Inputfield>
                        <label htmlFor="lastName">Nachname</label>
                        <input type="text" id="lastName" name="lastName"/>
                    </Inputfield>
                    <Inputfield>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email"/>
                    </Inputfield>
                    <Inputfield>
                        <label htmlFor="phoneNumber">Telefon</label>
                        <input type="tel" id="phoneNumber" name="phoneNumber"/>
                    </Inputfield>
                    <Inputfield>
                        <label htmlFor="street">Straße</label>
                        <input type="text" id="street" name="street"/>
                    </Inputfield>
                    <Inputfield>
                        <label htmlFor="zip">PLZ</label>
                        <input type="text" id="zip" name="zip" minLength={5} maxLength={5}/>
                    </Inputfield>
                    <Inputfield>
                        <label htmlFor="city">Stadt</label>
                        <input type="text" id="city" name="city"/>
                    </Inputfield>
                    <Inputfield>
                        <label htmlFor="birthday">Geburtstag</label>
                        <input type="date" id="birthday" name="birthday"/>
                    </Inputfield>
                    <button type="submit">Hinzufügen</button>
                </Form>
            </div>
        );
    }

// Styles

    const Form = styled.form`
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    `
    const Inputfield = styled.div`
        display: flex;
        justify-content: space-between;
        width: 70%;
    `