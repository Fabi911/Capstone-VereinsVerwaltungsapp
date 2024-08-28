package de.webdev.backend.members.models;

public record Address(
        String street,
        String zip,
        String city
) {
}
