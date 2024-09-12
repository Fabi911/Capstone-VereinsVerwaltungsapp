package de.webdev.backend.cashjournal.service;

import de.webdev.backend.cashjournal.models.Booking;
import de.webdev.backend.cashjournal.models.Type;
import de.webdev.backend.cashjournal.repository.CashJournalRepository;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class CashJournalServiceTest {

	private final CashJournalRepository cashJournalRepository=mock(CashJournalRepository.class);

	@Test
	void getAllCashJournals() {
		// Given
		List<Booking> bookings = new ArrayList<>();
		bookings.add(new Booking("1", LocalDate.parse("2021-01-01"), "Test", 100, "Test", Type.INCOME));
		bookings.add(new Booking("2", LocalDate.parse("2021-01-02"), "Test", 100, "Test", Type.INCOME));
		bookings.add(new Booking("3", LocalDate.parse("2021-01-03"), "Test", 100, "Test", Type.INCOME));
		when(cashJournalRepository.findAll()).thenReturn(bookings);

		// When
		List<Booking> actual = cashJournalRepository.findAll();

		// Then
		assertEquals(bookings, actual);
		verify(cashJournalRepository).findAll();
	}

	@Test
	void getCashJournalById() {
		// Given
		Booking booking = new Booking("1", LocalDate.parse("2021-01-01"), "Test", 100, "Test", Type.INCOME);
		when(cashJournalRepository.findById("1")).thenReturn(java.util.Optional.of(booking));

		// When
		Booking actual = cashJournalRepository.findById("1").orElse(null);

		// Then
		assertEquals(booking, actual);
		verify(cashJournalRepository).findById("1");
	}

	@Test
	void saveBooking() {
		// Given
		Booking booking = new Booking("1", LocalDate.parse("2021-01-01"), "Test", 100, "Test", Type.INCOME);
		when(cashJournalRepository.save(booking)).thenReturn(booking);

		// When
		Booking actual = cashJournalRepository.save(booking);

		// Then
		assertEquals(booking, actual);
		verify(cashJournalRepository).save(booking);
	}

	@Test
	void deleteCashJournal() {
		// Given
		String id = "1";

		// When
		cashJournalRepository.deleteById(id);

		// Then

		verify(cashJournalRepository).deleteById(id);
	}

	@Test
	void updateBooking() {
		// Given
		Booking booking = new Booking("1", LocalDate.parse("2021-01-01"), "Test", 100, "Test", Type.INCOME);
		when(cashJournalRepository.findById("1")).thenReturn(java.util.Optional.of(booking));
		when(cashJournalRepository.save(booking)).thenReturn(booking);

		// When
		Booking actual = cashJournalRepository.findById("1")
				.map(existingBooking -> {
					Booking updatedBooking = new Booking(
							"1",
							LocalDate.parse("2021-01-01"),
							"Test",
							100,
							"Test",
							Type.INCOME
					);
					return cashJournalRepository.save(updatedBooking);
				})
				.orElseThrow(() -> new NoSuchElementException("Booking with ID 1 not found"));

		// Then
		assertEquals(booking, actual);
		verify(cashJournalRepository).findById("1");
		verify(cashJournalRepository).save(booking);
	}

}