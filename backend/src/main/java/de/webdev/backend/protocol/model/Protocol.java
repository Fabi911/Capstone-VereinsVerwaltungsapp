package de.webdev.backend.protocol.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "protocols")
public class Protocol {

    @Id
    private String id;
    private String content;
}