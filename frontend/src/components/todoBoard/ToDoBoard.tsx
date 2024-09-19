import axios from "axios";
import { useEffect, useState} from "react";
import {ToDo} from "../../types/ToDo";
import ToDoTask from "./ToDoTask";
import styled from "@emotion/styled";
import AddTask from "./AddTask";
import {AppUser} from "../../types/AppUser";

type ToDoBoardProps = {
	appUser: AppUser | null;
}

export default function ToDoBoard({appUser}: ToDoBoardProps) {
	const [toDoList, setToDoList] = useState<ToDo[] >([]);
	const [newTask, setNewTask] = useState<string>("");

	async function addTask() {
		try {
			await axios.post('/api/todo', {description: newTask, status: "OPEN", author: appUser?.id});
			setNewTask("");
			fetchToDoList();
		} catch (error) {
			console.error(error);
		}
	}

	const fetchToDoList = async () => {
		try {
			const response = await axios.get(`/api/todo/author/${appUser?.id}`);
			setToDoList(response.data);
		}
		catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchToDoList();
	}, []);
	return (
		<div className="ContentBox">
			<h2>Aufgaben</h2>
			<AddTask newTask={newTask} setNewTask={setNewTask} addTask={addTask}/>
			<List>
				{toDoList.length > 0 ? (
					toDoList.map((todo) =>(
						<ToDoTask key={todo.id} todo={todo} fetchToDo={fetchToDoList}/>
					))
				) : (
					<p>keine ToDo's vorhanden!</p>
				)}
			</List>
		</div>
	)
}

// Styles

const List = styled.div`
	display: flex;
	flex-direction: column-reverse;
`;

const Container = styled.div`
    background-color: var(--box-color);
    box-shadow: var(--box-shadow);
    border-radius: 1rem;
    padding: 5rem 10rem;
`;