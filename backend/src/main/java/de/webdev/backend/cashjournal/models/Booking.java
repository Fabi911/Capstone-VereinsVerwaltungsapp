package de.webdev.backend.cashjournal.models;

import org.springframework.data.mongodb.core.mapping.MongoId;

import java.time.LocalDate;

public record Booking(
		@MongoId
		String id,
		LocalDate date,
		String description,
		double amount,
		String category,
		Type type
) {
}