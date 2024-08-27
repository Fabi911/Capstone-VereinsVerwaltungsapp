package de.webdev.backend.members.repository;

import de.webdev.backend.members.models.Member;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends MongoRepository<Member,String> {
}
