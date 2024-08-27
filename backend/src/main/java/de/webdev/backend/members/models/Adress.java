package de.webdev.backend.members.models;

public record Adress(
        String street,
        int postcode,
        String city
) {
}
