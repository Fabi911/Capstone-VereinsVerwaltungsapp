package de.webdev.backend.cashjournal.controller;

import de.webdev.backend.cashjournal.models.Booking;
import de.webdev.backend.cashjournal.service.CashJournalService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cash-journal")
@RequiredArgsConstructor
public class CashJournalController {

	private final CashJournalService cashJournalService;

	@GetMapping
	public List<Booking> getAllCashJournals() {
		return cashJournalService.getAllCashJournals();
	}

	@GetMapping("/{id}")
	public Booking getCashJournalById(@PathVariable String id) {
		return cashJournalService.getCashJournalById(id);
	}

	@PostMapping
	public Booking saveCashJournal(@RequestBody Booking booking) {
		return cashJournalService.saveBooking(booking);
	}

	@DeleteMapping("/{id}")
	public void deleteCashJournal(@PathVariable String id) {
		cashJournalService.deleteCashJournal(id);
	}

	@PutMapping("/{id}")
	public Booking updateBooking(@PathVariable String id,@RequestBody Booking booking) {
		return cashJournalService.updateBooking(id, booking);
	}

	@GetMapping("/dashboard")
	public List<Booking> showDashboard() {
		return cashJournalService.getLastThreeBookings();
	}
}