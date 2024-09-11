package de.webdev.backend.todo.service;

import de.webdev.backend.todo.models.ToDo;
import de.webdev.backend.todo.models.ToDoStatus;
import de.webdev.backend.todo.repository.ToDoRepository;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class ToDoServiceTest {


	private final ToDoRepository toDoRepository=mock(ToDoRepository.class);

	@Test
	void getAllToDos() {
		//GIVEN
		when(toDoRepository.findAll()).thenReturn(List.of());

		ToDoService toDoService = new ToDoService(toDoRepository);
		//WHEN
		List<ToDo> actual = toDoService.getAllToDos();
		//THEN
		assertTrue(actual.isEmpty());

	}

	@Test
	void getToDoById() {
		//GIVEN
		ToDo toDo = new ToDo("123", "Test ToDo", ToDoStatus.OPEN);
		when(toDoRepository.findById("123")).thenReturn(java.util.Optional.of(toDo));

		ToDoService toDoService = new ToDoService(toDoRepository);
		//WHEN
		ToDo actual = toDoService.getToDoById("123");
		//THEN
		assertEquals(toDo, actual);
	}

	@Test
	void createToDo() {
		//GIVEN
		ToDo toDo = new ToDo("123", "Test ToDo", ToDoStatus.OPEN);
		when(toDoRepository.save(toDo)).thenReturn(toDo);

		ToDoService toDoService = new ToDoService(toDoRepository);
		//WHEN
		ToDo actual = toDoService.createToDo(toDo);
		//THEN
		assertEquals(toDo, actual);
	}

	@Test
	void updateToDo() {
		//GIVEN
		String existingID="123";
		ToDo updatedToDo=new ToDo("123456", "Test ToDo", ToDoStatus.OPEN);
		when(toDoRepository.existsById(existingID)).thenReturn(true);
		doNothing().when(toDoRepository).deleteById(existingID);
		when(toDoRepository.save(any(ToDo.class))).thenReturn(updatedToDo);

		ToDoService toDoService = new ToDoService(toDoRepository);
		//WHEN
		ToDo actual = toDoService.updateToDo(updatedToDo,existingID);
		//THEN
		assertEquals("123456", actual.id());
		assertEquals("Test ToDo", actual.description());
		assertEquals(ToDoStatus.OPEN, actual.status());
	}

	@Test
	void deleteToDoById() {
		//GIVEN
		String id="123";
		doNothing().when(toDoRepository).deleteById(id);

		ToDoService toDoService = new ToDoService(toDoRepository);
		//WHEN
		toDoService.deleteToDoById(id);
		//THEN
		verify(toDoRepository).deleteById(id);
	}
}