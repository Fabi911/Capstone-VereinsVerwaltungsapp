package de.webdev.backend.todo.controller;


import de.webdev.backend.todo.models.ToDo;
import de.webdev.backend.todo.models.ToDoStatus;
import de.webdev.backend.todo.repository.ToDoRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;

import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;


import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class ToDoControllerTest {

	@Autowired
	MockMvc mockMvc;

	@Autowired
	private ToDoRepository toDoRepository;


	@DirtiesContext
	@Test
	void getToDos() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get("/api/todo"))
				.andExpect(status().isOk())
				.andExpect(content().json("[]"));
	}

	@DirtiesContext
	@Test
	void getToDoById() throws Exception {
		toDoRepository.save(new ToDo("1", "Buy milk from the store", ToDoStatus.OPEN));
		mockMvc.perform(get("/api/todo/1"))
				.andExpect(status().isOk())
				.andExpect(content().json("""
						{
							"description": "Buy milk from the store",
							"status": "OPEN"
						}
						"""));
	}

	@DirtiesContext
	@Test
	void createToDo() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.post("/api/todo")
						.contentType("application/json")
						.content("""
                        {
                            "description": "Buy milk from the store",
                            "status": "OPEN"
                        }
                        """))
				.andExpect(status().isOk())
				.andExpect(content().json("""
                        {
                            "description": "Buy milk from the store",
                            "status": "OPEN"
                        }
                        """))
				.andExpect(jsonPath("$.id").exists());
	}

	@DirtiesContext
	@Test
	void updateToDo() throws Exception {
		toDoRepository.save(new ToDo("1", "Buy milk from the store", ToDoStatus.OPEN));
		mockMvc.perform(MockMvcRequestBuilders.put("/api/todo/1")
						.contentType("application/json")
						.content("""
						{
							"description": "Buy milk from the store",
							"status": "IN_PROGRESS"
						}
						"""))
				.andExpect(status().isOk())
				.andExpect(content().json("""
						{
							"description": "Buy milk from the store",
							"status": "IN_PROGRESS"
						}
						"""));

	}

	@DirtiesContext
	@Test
	void deleteToDo() throws Exception {
		toDoRepository.save(new ToDo("1", "Buy milk from the store", ToDoStatus.OPEN));
		mockMvc.perform(MockMvcRequestBuilders.delete("/api/todo/1"))
				.andExpect(status().isOk());
	}
}