package de.webdev.backend.security.config;


import de.webdev.backend.security.AppuserRole;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	String apiMembers = "/api/members/**";

	@Bean
	public PasswordEncoder passwordEncoder() {
		return Argon2PasswordEncoder.defaultsForSpringSecurity_v5_8();
	}

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
				.csrf(AbstractHttpConfigurer::disable)
				.sessionManagement(sessionManagement ->
						sessionManagement
								.sessionCreationPolicy(SessionCreationPolicy.ALWAYS)
				)
				.authorizeHttpRequests(authorizeRequests ->
						authorizeRequests
								.requestMatchers(HttpMethod.POST, "api/users/register").permitAll()
								.requestMatchers(HttpMethod.DELETE, apiMembers).hasRole(AppuserRole.ADMIN.name())
								.requestMatchers(HttpMethod.GET, apiMembers).hasRole(AppuserRole.ADMIN.name())
								.requestMatchers(HttpMethod.POST, apiMembers).hasRole(AppuserRole.ADMIN.name())
								.requestMatchers(HttpMethod.PUT, apiMembers).hasRole(AppuserRole.ADMIN.name())
								.anyRequest().authenticated()
				)
				.httpBasic(httpSecurityHttpBasicConfigurer -> httpSecurityHttpBasicConfigurer.authenticationEntryPoint((request, response, authException) -> response.sendError(401)));
		return http.build();
	}

}