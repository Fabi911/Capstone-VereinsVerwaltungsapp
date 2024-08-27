package de.webdev.backend.members.models;

import org.springframework.data.mongodb.core.mapping.MongoId;


public record Member(
        @MongoId
        String id,
        String lastName,
        String name,
        int birthday,
        Adress adress
) {

}
