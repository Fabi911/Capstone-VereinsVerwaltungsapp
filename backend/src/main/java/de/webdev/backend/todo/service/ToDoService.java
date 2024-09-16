package de.webdev.backend.todo.service;

import de.webdev.backend.todo.models.ToDo;
import de.webdev.backend.todo.repository.ToDoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ToDoService {

	private final ToDoRepository toDoRepository;

	public List<ToDo> getAllToDos() {
		return toDoRepository.findAll();
	}

	public ToDo getToDoById(String id) {
		return toDoRepository.findById(id).orElse(null);
	}

	public List<ToDo> getToDosByAuthor(String author) {
		List<ToDo> authorToDos = new ArrayList<>();
		for (ToDo toDo : toDoRepository.findAll()) {
			if (Objects.equals(toDo.author(), author)) {
				authorToDos.add(toDo);
			}
		}
		return authorToDos;
	}

	public ToDo createToDo(ToDo toDo) {
		return toDoRepository.save(toDo);
	}

	public ToDo updateToDo(ToDo toDo, String id) {
		if (toDoRepository.existsById(id)) {
			toDoRepository.deleteById(id);
			ToDo toDoToUpdate = new ToDo(
					id,
					toDo.description(),
					toDo.status(),
					toDo.author()
			);
			return toDoRepository.save(toDoToUpdate);
		}
		return null;
	}

	public void deleteToDoById(String id) {
		toDoRepository.deleteById(id);
	}

}