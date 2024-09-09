package de.webdev.backend.security.service;

import de.webdev.backend.security.models.AppUser;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AppUserDetailService implements UserDetailsService {

	private final AppuserService appuserService;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		AppUser appUser = appuserService.findByUsername(username);
		return new User(
				appUser.getUsername(),
				appUser.getPassword(),
				List.of(
						new SimpleGrantedAuthority("ROLE_" + appUser.getRole())
				)
		);
	}


}