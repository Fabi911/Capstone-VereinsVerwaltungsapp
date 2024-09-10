package de.webdev.backend.security.service;


import de.webdev.backend.security.AppuserRole;
import de.webdev.backend.security.models.AppUser;
import de.webdev.backend.security.models.AppUserDTO;
import de.webdev.backend.security.models.AppUserResponse;
import de.webdev.backend.security.repository.AppuserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AppuserService {

	private final AppuserRepository appuserRepository;
	private final PasswordEncoder passwordEncoder;

	public AppUser findByUsername(String username) {
		return appuserRepository
				.findByUsername(username)
				.orElseThrow(() -> new UsernameNotFoundException("User not found"));
	}

	public AppUserResponse getLoggedInUser() {
		var principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		AppUser appUser = findByUsername(principal.getUsername());
		return new AppUserResponse(appUser.getId(), appUser.getUsername(),appUser.getRole());
	}

	public AppUserResponse registerUser(AppUserDTO appUserDTO) {
		AppUser appUser = new AppUser();
		appUser.setUsername(appUserDTO.username());
		appUser.setPassword(passwordEncoder.encode(appUserDTO.password()));
		appUser.setRole(AppuserRole.USER);
		appUser = appuserRepository.save(appUser);
		return new AppUserResponse(appUser.getId(), appUser.getUsername(), appUser.getRole());
	}
}