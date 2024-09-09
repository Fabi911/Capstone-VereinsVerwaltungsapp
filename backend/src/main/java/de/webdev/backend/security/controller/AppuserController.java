package de.webdev.backend.security.controller;


import de.webdev.backend.security.models.AppUserDTO;
import de.webdev.backend.security.models.AppUserResponse;
import de.webdev.backend.security.service.AppuserService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class AppuserController {
	private final AppuserService appuserService;

	@GetMapping("/me")
	public AppUserResponse getLoggedInUser() {
		return appuserService.getLoggedInUser();
	}

	@PostMapping("/login")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void login() {
		// This method is only used to trigger the login process
	}

	@PostMapping("/register")
	@ResponseStatus(HttpStatus.CREATED)
	public AppUserResponse register(@RequestBody AppUserDTO appUserDTO) {
		return appuserService.registerUser(appUserDTO);
	}

	@PostMapping("/logout")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void logout(HttpSession session) {
		session.invalidate();
		SecurityContextHolder.clearContext();
	}
}