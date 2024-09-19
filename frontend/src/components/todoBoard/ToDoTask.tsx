import styled from "@emotion/styled";
import {ToDo} from "../../types/ToDo.ts";
import axios from "axios";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {useState} from "react";

type TaskProps = {
	todo: ToDo;
	fetchToDo: () => void;
}
export default function ToDoTask({todo, fetchToDo}: TaskProps) {
	const [status, setStatus] = useState(todo.status);

	function changeStatus() {
		// Toggle the status
		const newStatus = status === "OPEN" ? "CLOSED" : "OPEN";
		axios.put(`/api/todo/${todo.id}`, {
			...todo,
			status: newStatus
		}).then(() => {
			// Update local state after successful PUT request
			setStatus(newStatus);
			fetchToDo();
		}).catch(error => {
			console.error(error);
		});
	}

	async function deleteTask() {
		try {
			await axios.delete(`/api/todo/${todo.id}`);
			fetchToDo();
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<TaskBox>
			<input type="checkbox" defaultChecked={status === "CLOSED"} onChange={changeStatus}/>
			<p>{todo.description}</p>
			<ButtonDelete onClick={deleteTask}><DeleteForeverIcon fontSize="large" sx={{ color: 'var(--text-color)' }}/></ButtonDelete>
		</TaskBox>
	)
}
// Styles
const TaskBox = styled.div`
    display: flex;
    justify-content: space-between;
    border: var(--box-border);
	color: var(--text-color);
    padding: 1rem;
    margin: 1rem;
`;
const ButtonDelete = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
`;