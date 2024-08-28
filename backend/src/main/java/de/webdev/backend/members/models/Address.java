package de.webdev.backend.members.models;

public record Address(
        String street,
        int zip,
        String city
) {
}
