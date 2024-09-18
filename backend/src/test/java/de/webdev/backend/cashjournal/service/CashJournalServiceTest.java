package de.webdev.backend.cashjournal.service;

import de.webdev.backend.cashjournal.models.Booking;
import de.webdev.backend.cashjournal.models.Type;
import de.webdev.backend.cashjournal.repository.CashJournalRepository;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class CashJournalServiceTest {

	private final CashJournalRepository cashJournalRepository = mock(CashJournalRepository.class);

	private final CashJournalService cashJournalService = new CashJournalService(cashJournalRepository);

	@Test
	void getAllCashJournals() {
		// Given
		List<Booking> bookings = new ArrayList<>();
		bookings.add(new Booking("1", LocalDate.parse("2021-01-01"), "Test", 100, "Test", Type.INCOME));
		bookings.add(new Booking("2", LocalDate.parse("2021-01-02"), "Test", 100, "Test", Type.INCOME));
		bookings.add(new Booking("3", LocalDate.parse("2021-01-03"), "Test", 100, "Test", Type.INCOME));
		when(cashJournalRepository.findAll()).thenReturn(bookings);

		// When
		List<Booking> actual = cashJournalService.getAllCashJournals();

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
		Booking actual = cashJournalService.getCashJournalById("1");

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
		Booking actual = cashJournalService.saveBooking(booking);

		// Then
		assertEquals(booking, actual);
		verify(cashJournalRepository).save(booking);
	}

	@Test
	void deleteCashJournal() {
		// Given
		String id = "1";

		// When
		cashJournalService.deleteCashJournal(id);

		// Then

		verify(cashJournalRepository).deleteById(id);
	}


	@Test
	void updateCashJournal() {
		// Given
		Booking originalBooking = new Booking("1", LocalDate.parse("2021-01-01"), "Test", 100, "Test", Type.INCOME);
		Booking updatedBooking = new Booking("1", LocalDate.parse("2021-01-02"), "Updated Test", 200, "Updated Test",
				Type.EXPENSE);
		when(cashJournalRepository.findById("1")).thenReturn(java.util.Optional.of(originalBooking));
		when(cashJournalRepository.save(updatedBooking)).thenReturn(updatedBooking);

		// When
		Booking actual = cashJournalService.updateBooking("1", updatedBooking);

		// Then
		assertEquals(updatedBooking, actual);
		verify(cashJournalRepository).findById("1");
		verify(cashJournalRepository).save(updatedBooking);
	}

	@Test
	void getLastThreeBookings() {
		// Given
		List<Booking> bookings = new ArrayList<>();
		bookings.add(new Booking("1", LocalDate.parse("2021-01-01"), "Test", 100, "Test", Type.INCOME));
		bookings.add(new Booking("2", LocalDate.parse("2021-01-02"), "Test", 100, "Test", Type.INCOME));
		bookings.add(new Booking("3", LocalDate.parse("2021-01-03"), "Test", 100, "Test", Type.INCOME));
		when(cashJournalRepository.findTop3ByOrderByDateDesc()).thenReturn(bookings);

		// When
		List<Booking> actual = cashJournalService.getLastThreeBookings();

		// Then
		assertEquals(bookings, actual);
		verify(cashJournalRepository).findTop3ByOrderByDateDesc();
	}
}