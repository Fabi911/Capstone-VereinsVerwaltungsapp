import axios from "axios";
import {useEffect, useState} from "react";
import {ToDo} from "../../types/ToDo.ts";
import ToDoTask from "./ToDoTask.tsx";
import styled from "@emotion/styled";
import AddTask from "./AddTask.tsx";

export default function ToDoBoard() {
	const [toDoList, setToDoList] = useState<ToDo[] | null>(null);
	const [newTask, setNewTask] = useState<string>("");

	async function addTask() {
		try {
			await axios.post('/api/todo', {description: newTask, status: "OPEN"})
			setNewTask("");
			fetchToDoList();
		} catch (error) {
			console.error(error);
		}
	}

	function fetchToDoList() {
		axios.get('/api/todo')
			.then((response) => {
				setToDoList(response.data);
			})
			.catch((error) => {console.error(error)});
	}

	useEffect(() => {
		fetchToDoList();
	}, []);
	if (!toDoList) {
		return <h1>Loading...</h1>
	}
	return (
		<Container>
			<h2>Aufgaben</h2>
			<AddTask newTask={newTask} setNewTask={setNewTask} addTask={addTask}/>
			<List>
				{toDoList.map((todo) =>
					<ToDoTask key={todo.id} todo={todo} fetchToDo={fetchToDoList}/>
				)}
			</List>
		</Container>
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