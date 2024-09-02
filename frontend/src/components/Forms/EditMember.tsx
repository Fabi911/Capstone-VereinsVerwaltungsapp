import styled from "@emotion/styled";
import axios from "axios";
import {Member} from "../../types/member.ts";

export default function EditMember({member,setModal,getMember} : {member:Member,setModal: (value: boolean) => void, getMember: () => void}) {
    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        putMember(data);
        form.reset();
        setModal(false);
        setTimeout(() => getMember(), 500);
    }
    const putMember = (data:any):void =>{
        axios.put(`/api/members/${member.memberId}`, {
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


    const defaultBirthday = new Date(member.birthday).toISOString().split('T')[0];

    return (
            <div>
                <h1>Mitglied bearbeiten</h1>
                <Form onSubmit={handleFormSubmit}>
                    <Inputfield>
                        <label htmlFor="memberId">Mitgliedsnummer</label>
                        <input type="text" id="memberId" name="memberId" defaultValue={member.memberId}/>
                    </Inputfield>
                    <Inputfield>
                        <label htmlFor="name">Vorname</label>
                        <input type="text" id="name" name="name" defaultValue={member.name}/>
                    </Inputfield>
                    <Inputfield>
                        <label htmlFor="lastName">Nachname</label>
                        <input type="text" id="lastName" name="lastName" defaultValue={member.lastName}/>
                    </Inputfield>
                    <Inputfield>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" defaultValue={member.email}/>
                    </Inputfield>
                    <Inputfield>
                        <label htmlFor="phoneNumber">Telefon</label>
                        <input type="tel" id="phoneNumber" name="phoneNumber" defaultValue={member.phoneNumber}/>
                    </Inputfield>
                    <Inputfield>
                        <label htmlFor="street">Straße</label>
                        <input type="text" id="street" name="street" defaultValue={member.address.street}/>
                    </Inputfield>
                    <Inputfield>
                        <label htmlFor="zip">PLZ</label>
                        <input type="text" id="zip" name="zip" minLength={5} maxLength={5} defaultValue={member.address.zip}/>
                    </Inputfield>
                    <Inputfield>
                        <label htmlFor="city">Stadt</label>
                        <input type="text" id="city" name="city" defaultValue={member.address.city}/>
                    </Inputfield>
                    <Inputfield>
                        <label htmlFor="birthday">Geburtstag</label>
                        <input type="date" id="birthday" name="birthday" defaultValue={defaultBirthday}/>
                    </Inputfield>
                    <button type="submit">Speichern</button>
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