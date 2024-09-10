package de.webdev.backend.security.service;

import de.webdev.backend.security.AppuserRole;
import de.webdev.backend.security.models.AppUser;
import de.webdev.backend.security.models.AppUserDTO;
import de.webdev.backend.security.models.AppUserResponse;
import de.webdev.backend.security.repository.AppuserRepository;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;
import java.util.UUID;

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

	@Mock
	private PasswordEncoder passwordEncoder;

	@Test
	void registerUserCreatesNewUserWhenUsernameIsUnique() {
		String testUsername = "testUser";
		String testPassword = "password";
		String encodedPassword = "encodedPassword"; // Mock encoding result

		AppUserDTO appUserDTO = new AppUserDTO(testUsername, testPassword);
		AppUser appUser = new AppUser();
		appUser.setId(UUID.randomUUID().toString());
		appUser.setUsername(testUsername);
		appUser.setPassword(encodedPassword); // Set encoded password
		appUser.setRole(AppuserRole.USER);
		AppUserResponse appUserResponse = new AppUserResponse(appUser.getId(), appUser.getUsername(), appUser.getRole());

		when(passwordEncoder.encode(testPassword)).thenReturn(encodedPassword); // Mock encoding
		when(appuserRepository.findByUsername(testUsername)).thenReturn(Optional.empty());
		when(appuserRepository.save(ArgumentMatchers.any(AppUser.class))).thenReturn(appUser);

		AppUserResponse result = appuserService.registerUser(appUserDTO);

		assertEquals(appUserResponse.id(), result.id());
		assertEquals(appUserResponse.username(), result.username());
		assertEquals(appUserResponse.role(), result.role());
		assertEquals(encodedPassword, appUser.getPassword()); // Verify password encoding
	}

	@Test
	void registerUserThrowsWhenUsernameIsNotUnique() {
		String testUsername = "testUser";
		String testPassword = "password";
		AppUserDTO appUserDTO = new AppUserDTO(testUsername, testPassword);
		AppUser existingUser = new AppUser();
		existingUser.setUsername(testUsername);
		existingUser.setPassword(testPassword);
		existingUser.setRole(AppuserRole.USER);

		when(appuserRepository.findByUsername(testUsername)).thenReturn(Optional.of(existingUser));

		assertThrows(DataIntegrityViolationException.class, () -> {
			appuserService.registerUser(appUserDTO);
		});
	}
}