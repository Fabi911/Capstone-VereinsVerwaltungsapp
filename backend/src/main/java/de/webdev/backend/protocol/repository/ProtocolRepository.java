package de.webdev.backend.protocol.repository;


import de.webdev.backend.protocol.model.Protocol;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProtocolRepository extends MongoRepository<Protocol, String> {

}