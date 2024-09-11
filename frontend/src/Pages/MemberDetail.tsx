import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Member} from "../types/member.ts";
import axios from "axios";
import styled from "@emotion/styled";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditNoteIcon from '@mui/icons-material/EditNote';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Modal from "../components/modual/Modal.tsx";
import EditMember from "../components/Forms/EditMember.tsx";

export default function MemberDetail() {
	const {id} = useParams();
	const [memberData, setMemberData] = useState<Member>();
	const [modal, setModal] = useState(false);
	const navigate = useNavigate()
	const [isRemoved, setIsRemoved] = useState<boolean>(false);

	async function getMember(): Promise<void> {
		try {
			const response = await axios.get(`/api/members/${id}`)
			setMemberData(response.data);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}

	function removeMember(id: string): void {
		axios.delete(`/api/members/${id}`)
			.then(() => navigate('/members'))
			.catch(error => {
				console.log(error);
			})
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
				<span>E-Mail: <a href={`mailto:${email}`}>{email}</a></span>
				<span>Geburtstag: {new Date(birthday).toLocaleDateString()}</span>
				<ButtonBox>
					<button onClick={() => setModal(true)}><EditNoteIcon fontSize="large"/></button>
					{modal && <Modal setModal={setModal}>
						<EditMember member={memberData} setModal={setModal} getMember={getMember}/>
					</Modal>}
					{!isRemoved &&
						<button onClick={() => setIsRemoved(true)}><PersonRemoveIcon fontSize="large"/></button>}
					{isRemoved && (
						<DeleteConfirmBox>
							<ConfirmDeleteText>Mitlglied wirklich löschen?</ConfirmDeleteText>
							<ConfirmDeleteButtons>
								<ButtonForConfirm onClick={() => removeMember(memberId)}>
									<CheckCircleIcon fontSize={"large"}/>
								</ButtonForConfirm>
								<ButtonForCancel onClick={() => setIsRemoved(false)}>
									<CancelIcon fontSize={"large"}/>
								</ButtonForCancel>
							</ConfirmDeleteButtons>
						</DeleteConfirmBox>
					)}
				</ButtonBox>
			</MemberBox>
		</DetailsBox>
	);
}
// Styling
const DetailsBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--box-color);
	box-shadow: var(--box-shadow);
	border-radius: 1rem;
    padding: 5rem 10rem;

`;
const BackLink = styled(Link)`
    align-self: flex-start;
    color: black;
    text-decoration: none;

`;
const MemberBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;
const ButtonBox = styled.div`
    display: flex;
    gap: 2rem;
    height: 5rem;
    align-items: flex-end;
    margin-top: 1rem;
    padding: 0.5rem;
    width: 50%;
`;
const DeleteConfirmBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 0;
`;
const ConfirmDeleteButtons = styled.p`
    display: flex;
    gap: 1rem;
    padding: 0;
    margin: 0;
    align-self: center;
`;
const ConfirmDeleteText = styled.p`
    color: #9a1515;
`;
const ButtonForConfirm = styled.button`
    border: none;
    background: none;
    color: green;
    cursor: pointer;
`;
const ButtonForCancel = styled.button`
    border: none;
    background: none;
    color: red;
    cursor: pointer;
`;