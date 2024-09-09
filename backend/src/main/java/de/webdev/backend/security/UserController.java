package de.webdev.backend.security;


import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
	private final UserService userService;

	@GetMapping("/me")
	public AppUserResponse getLoggedInUser() {
		return userService.getLoggedInUser();
	}

	@PostMapping("/login")
	public void login() {
		// This method is only used to trigger the login process
	}

	@PostMapping("/register")
	@ResponseStatus(HttpStatus.CREATED)
	public AppUserResponse register(@RequestBody AppUserDTO appUserDTO) {
		return userService.registerUser(appUserDTO);
	}
}