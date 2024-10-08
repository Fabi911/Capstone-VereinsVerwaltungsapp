package de.webdev.backend.security.models;

import de.webdev.backend.security.AppuserRole;

public record AppUserResponse(
		String id,
		String username,
		AppuserRole role
) {
}