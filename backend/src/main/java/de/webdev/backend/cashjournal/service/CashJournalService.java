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
		return cashJournalRepository.findById(id)
				.map(existingBooking -> {
					// Create a new Booking instance with updated values
					Booking updatedBooking = new Booking(
							id,
							booking.date(),
							booking.description(),
							booking.amount(),
							booking.category(),
							booking.type(),
							booking.fileUrl()
					);
					// Save the updated booking
					return cashJournalRepository.save(updatedBooking);
				})
				.orElseThrow(() -> new NoSuchElementException("Booking with ID " + id + " not found"));
	}
}