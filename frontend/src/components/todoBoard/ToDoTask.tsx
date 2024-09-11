import styled from "@emotion/styled";
import {ToDo} from "../../types/ToDo.ts";
import axios from "axios";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

type TaskProps = {
	todo: ToDo;
	fetchToDo: () => void;
}

export default function ToDoTask({todo,fetchToDo}: TaskProps) {

	function changeStatus() {
		axios.put(`/api/todo/${todo.id}`, { ...todo, status: todo.status === "OPEN" ? "CLOSED" : "OPEN" ||  todo.status === "CLOSED" ? "OPEN" : "CLOSED" });
	}

	async function deleteTask() {
		try{
			await axios.delete(`/api/todo/${todo.id}`);
			fetchToDo();
		}
		catch(error){
			console.error(error);
		}
	}

	return(
		<TaskBox>
			<input type="checkbox" defaultChecked={todo.status==="CLOSED"} onChange={changeStatus}/>
			<p>{todo.description}</p>
			<ButtonDelete onClick={deleteTask}><DeleteForeverIcon fontSize="large"/></ButtonDelete>
		</TaskBox>
	)
}

// Styles

const TaskBox = styled.div`
	display: flex;
	justify-content: space-between;
	border: 0.1rem solid black;
	padding: 1rem;
	margin: 1rem;
`;

const ButtonDelete = styled.button`
	background-color: transparent;
	border: none;
	cursor: pointer;
`;