package de.webdev.backend.members.models;

import org.springframework.data.mongodb.core.mapping.MongoId;

import java.time.LocalDate;



public record Member(
        @MongoId
        String memberId,
        String lastName,
        String name,
        LocalDate birthday,
        Address address,
        String email,
        String phoneNumber
) {

}
