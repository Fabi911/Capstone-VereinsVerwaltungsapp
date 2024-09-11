package de.webdev.backend.todo.models;

import org.springframework.data.mongodb.core.mapping.MongoId;

public record ToDo(
		@MongoId
		String id,
		String description,
		ToDoStatus status
) {
}