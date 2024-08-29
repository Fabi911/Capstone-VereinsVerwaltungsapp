import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Member} from "../types/member.ts";
import axios from "axios";

export default function MemberDetail() {
    const {id} = useParams();
    const [memberData, setMemberData] = useState<Member>();

    async function getMember(): Promise<void> {
        try {
            const response = await axios.get(`/api/members/${id}`)
            setMemberData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }

    }

    useEffect(() => {
        getMember().then(() => console.log('Member fetched'));
    }, [id]);

    if (!memberData) {
        return <div>Loading...</div>;
    }

    const {name, lastName, email, phoneNumber, address, birthday, memberId} = memberData;
    return (
        <div>
            <h1>{name} {lastName}</h1>
            <p>Adresse: <br/>{address.street}<br/> {address.zip} {address.city}</p>
            <p>Tel: {phoneNumber}</p>
            <p>E-Mail: {email}</p>
            <p>Geburtstag: {new Date(birthday).toLocaleDateString()}</p>
            <p>Mitgliedsnr.: {memberId}</p>
        </div>
    );
}