package de.webdev.backend.cashjournal.service;

import de.webdev.backend.cashjournal.models.Booking;

import de.webdev.backend.cashjournal.repository.CashJournalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;


@Service
@RequiredArgsConstructor
public class CashJournalService {

	private final CashJournalRepository cashJournalRepository;

	public List<Booking> getAllCashJournals() {
		return cashJournalRepository.findAll();
	}

	public Booking getCashJournalById(String id) {
		return cashJournalRepository.findById(id).orElse(null);
	}

	public Booking saveBooking(Booking booking) {
		return cashJournalRepository.save(booking);
	}

	public void deleteCashJournal(String id) {
		cashJournalRepository.deleteById(id);
	}

	public Booking updateBooking(String id, Booking booking) {
		Booking existingBooking = cashJournalRepository.findById(id).orElseThrow(NoSuchElementException::new);
		return cashJournalRepository.save(existingBooking
				.withDate(booking.date())
				.withDescription(booking.description())
				.withAmount(booking.amount())
				.withCategory(booking.category())
				.withType(booking.type()));
	}
}