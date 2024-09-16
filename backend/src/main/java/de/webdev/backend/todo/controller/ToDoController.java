package de.webdev.backend.todo.controller;

import de.webdev.backend.todo.models.ToDo;
import de.webdev.backend.todo.service.ToDoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todo")
@RequiredArgsConstructor
public class ToDoController {

	private final ToDoService toDoService;

	@GetMapping
	public List<ToDo> getToDos() {
		return toDoService.getAllToDos();
	}

	@GetMapping("/{id}")
	public ToDo getToDoById(@PathVariable String id) {
		return toDoService.getToDoById(id);
	}

	@GetMapping("/author/{author}")
	public List<ToDo> getToDosByAuthor(@PathVariable String author) {
		return toDoService.getToDosByAuthor(author);
	}

	@PostMapping
	public ToDo createToDo(@RequestBody ToDo toDo) {
		return toDoService.createToDo(toDo);
	}

	@PutMapping("/{id}")
	public ToDo updateToDo(@RequestBody ToDo toDo, @PathVariable String id) {
		return toDoService.updateToDo(toDo, id);
	}

	@DeleteMapping("/{id}")
	public void deleteToDo(@PathVariable String id) {
		toDoService.deleteToDoById(id);
	}
}