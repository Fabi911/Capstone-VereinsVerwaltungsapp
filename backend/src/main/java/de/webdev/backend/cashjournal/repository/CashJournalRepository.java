package de.webdev.backend.cashjournal.repository;

import de.webdev.backend.cashjournal.models.Booking;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CashJournalRepository extends MongoRepository<Booking, String> {
	List<Booking> findTop3ByOrderByDateDesc();
}