import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {Member} from "../types/member.ts";
import axios from "axios";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styled from "@emotion/styled";
import EditNoteIcon from '@mui/icons-material/EditNote';
import Modal from "../components/modual/Modal.tsx";
import EditMember from "../components/Forms/EditMember.tsx";

export default function MemberDetail() {
    const {id} = useParams();
    const [memberData, setMemberData] = useState<Member>();
    const [modal, setModal] = useState(false);

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
        <DetailsBox>
            <BackLink to={"/members"}><ArrowBackIcon fontSize="large"/></BackLink>
            <MemberBox>
                <h1>{name} {lastName}</h1>
                <span>Mitgliedsnr.: {memberId}</span>
                <span>Adresse: <br/>{address.street}<br/> {address.zip} {address.city}</span>
                <span>Tel: {phoneNumber}</span>
                <span>E-Mail: {email}</span>
                <span>Geburtstag: {new Date(birthday).toLocaleDateString()}</span>
<EditButton onClick={() => setModal(true)}><EditNoteIcon fontSize="large"/> </EditButton>
                {modal && <Modal setModal={setModal}><EditMember member={memberData} setModal={setModal} getMember={getMember}/></Modal>}
            </MemberBox>
        </DetailsBox>
    );
}

const DetailsBox = styled.div`
    width: 50vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    /*background-color: #808080;*/
    padding: 1rem;
`;

const BackLink = styled(Link)`
    align-self: flex-start;
    color: black;
    text-decoration: none;

`;

const MemberBox = styled.div`
    width: 75%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const EditButton = styled.button`
align-self: flex-start;
`