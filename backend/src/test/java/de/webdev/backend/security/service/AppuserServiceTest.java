package de.webdev.backend.security.service;

import de.webdev.backend.security.models.AppUser;
import de.webdev.backend.security.repository.AppuserRepository;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

@SpringBootTest
class AppuserServiceTest {

	@Mock
	private AppuserRepository appuserRepository;

	@InjectMocks
	private AppuserService appuserService;

	@Test
	void findByUsernameReturnsUserWhenUserExists() {
		String testUsername = "testUser";
		AppUser appUser = new AppUser();
		appUser.setUsername(testUsername);
		when(appuserRepository.findByUsername(testUsername)).thenReturn(Optional.of(appUser));

		AppUser returnedUser = appuserService.findByUsername(testUsername);

		assertEquals(appUser.getUsername(), returnedUser.getUsername(), "Returned user has the expected username");
	}

	@Test
	void findByUsernameThrowsWhenUserDoesNotExist() {
		String testUsername = "testUser";
		when(appuserRepository.findByUsername(testUsername)).thenReturn(Optional.empty());

		assertThrows(UsernameNotFoundException.class, () -> {
			appuserService.findByUsername(testUsername);
		}, "Expected findByUsername to throw, but it didn't");
	}
}