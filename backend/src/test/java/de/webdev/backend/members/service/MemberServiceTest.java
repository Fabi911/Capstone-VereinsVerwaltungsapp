package de.webdev.backend.members.service;

import de.webdev.backend.members.models.Member;
import de.webdev.backend.members.repository.MemberRepository;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class MemberServiceTest {

    private final MemberRepository memberRepository=mock(MemberRepository.class);


    @Test
    void testGetAllMembers_whenNoMembersExist() {
        when(memberRepository.findAll()).thenReturn(List.of());
        MemberService memberService = new MemberService(memberRepository);
        List<Member> result = memberService.getAllMembers();
        assertTrue(result.isEmpty(),"The list was supposed to be empty but it was not");
    }
 }


