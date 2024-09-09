package de.webdev.backend.security.repository;

import de.webdev.backend.security.models.AppUser;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface AppuserRepository extends MongoRepository<AppUser, String> {
	Optional<AppUser> findByUsername(String username);
}