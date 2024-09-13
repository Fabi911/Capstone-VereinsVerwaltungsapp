package de.webdev.backend.cashjournal.models;

import java.time.LocalDate;

public record BookingDTO(
		LocalDate date,
		String description,
		double amount,
		String category,
		Type type,
		String fileUrl
) {
}