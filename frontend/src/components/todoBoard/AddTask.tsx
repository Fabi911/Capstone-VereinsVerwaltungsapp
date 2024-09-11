import styled from "@emotion/styled";

type AddTaskProps = {
	newTask: string;
	setNewTask: (newTask: string) => void;
	addTask: () => void;
}
export default function AddTask({newTask, setNewTask, addTask}: AddTaskProps) {
	return (
		<Container>
			<label htmlFor="task">Aufgabe hinzufügen:</label>
			<input type="text" id="task" name="task" value={newTask}
			       onChange={e => (setNewTask(e.target.value))}/>
			<button onClick={addTask}>Hinzufügen</button>
		</Container>
	)
}

// Styles

const Container = styled.div`
	display: flex;
	gap: 1rem;
`;