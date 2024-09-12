package de.webdev.backend.cashjournal.controller;

import de.webdev.backend.cashjournal.models.Booking;
import de.webdev.backend.cashjournal.service.CashJournalService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/cash-journal")
public class CashJournalController {

	private final CashJournalService cashJournalService;

	public List<Booking> getAllCashJournals() {
		return cashJournalService.getAllCashJournals();
	}

	public Booking getCashJournalById(String id) {
		return cashJournalService.getCashJournalById(id);
	}

	public Booking saveCashJournal(Booking booking) {
		return cashJournalService.saveCashJournal(booking);
	}

	public void deleteCashJournal(String id) {
		cashJournalService.deleteCashJournal(id);
	}

	public Booking updateBooking(String id, Booking booking) {
		return cashJournalService.updateBooking(id, booking);
	}
}