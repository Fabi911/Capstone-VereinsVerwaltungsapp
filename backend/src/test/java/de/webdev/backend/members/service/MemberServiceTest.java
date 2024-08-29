package de.webdev.backend.members.service;

import de.webdev.backend.members.models.Address;
import de.webdev.backend.members.models.Member;
import de.webdev.backend.members.repository.MemberRepository;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class MemberServiceTest {

    private final MemberRepository memberRepository = mock(MemberRepository.class);


    @Test
    void testGetAllMembers_whenNoMembersExist() {
        // given
        when(memberRepository.findAll()).thenReturn(List.of());

        // when
        MemberService memberService = new MemberService(memberRepository);
        List<Member> actual = memberService.getAllMembers();

        // then
        assertTrue(actual.isEmpty());
        verify(memberRepository).findAll();
    }

    @Test
    void testGetAllMembers_whenMembersExist() {
        // given
        List<Member> members = List.of(
                new Member("2024-001", "John", "Doe", LocalDate.parse("1990-02-01"), new Address("Main Street 1", "12345", "Springfield"), "test@tester.com", "123456789"),
                new Member("2024-002", "Jane", "Doe", LocalDate.parse("1990-02-01"), new Address("Main Street 1", "12345", "Springfield"), "test@tester.com", "123456789"));
        when(memberRepository.findAll()).thenReturn(members);

        // when
        MemberService memberService = new MemberService(memberRepository);
        List<Member> actual = memberService.getAllMembers();

        // then
        assertFalse(actual.isEmpty());
        verify(memberRepository).findAll();
    }

    @Test
    void addMemberTest() {
        // given
        Member member = new Member("2024-001", "John", "Doe", LocalDate.parse("1990-02-01"), new Address("Main Street 1", "12345", "Springfield"), "test@tester.com", "123456789");
        when(memberRepository.save(member)).thenReturn(member);

        // when
        MemberService memberService = new MemberService(memberRepository);
        Member actual = memberService.addMember(member);

        // then
        assertEquals(member, actual);
        verify(memberRepository).save(member);
    }

    @Test
    void getMemberByIdTest() {
        // given
        Member member = new Member("2024-001", "John", "Doe", LocalDate.parse("1990-02-01"), new Address("Main Street 1", "12345", "Springfield"), "info@test.com", "123456789");
        when(memberRepository.findById("2024-001")).thenReturn(java.util.Optional.of(member));

        // when
        MemberService memberService = new MemberService(memberRepository);

        Member actual = memberService.getMemberById("2024-001");

        // then
        assertEquals(member, actual);
        verify(memberRepository).findById("2024-001");


    }


}


