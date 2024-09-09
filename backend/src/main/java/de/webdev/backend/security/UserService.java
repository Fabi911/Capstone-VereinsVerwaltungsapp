package de.webdev.backend.security;


import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;

	public AppUser findByUsername(String username) {
		return userRepository
				.findByUsername(username)
				.orElseThrow(() -> new UsernameNotFoundException("User not found"));
	}

	public AppUserResponse getLoggedInUser() {
		var principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		AppUser appUser= findByUsername(principal.getUsername());
		return new AppUserResponse(appUser.getId(), appUser.getUsername());
	}

	public AppUserResponse registerUser(AppUserDTO appUserDTO) {
		AppUser appUser = new AppUser();
		appUser.setUsername(appUserDTO.username());
		appUser.setPassword(passwordEncoder.encode(appUserDTO.password()));
		appUser= userRepository.save(appUser);
		return new AppUserResponse(appUser.getId(), appUser.getUsername());
	}
}