package de.webdev.backend.members.models;

public record Member(
        String id,
        String lastName,
        String name,
        int birthday,
        Adress adress
) {

}
