package de.webdev.backend.members.service;

import de.webdev.backend.members.models.Member;
import de.webdev.backend.members.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MemberService {


    private final MemberRepository memberRepository;


    public List<Member> getAllMembers() {
        return memberRepository.findAll();
    }


    public Member addMember(Member member) {
        return memberRepository.save(member);
    }

    public Member getMemberById(String id){
        return memberRepository.findById(id).orElse(null);
    }

}
