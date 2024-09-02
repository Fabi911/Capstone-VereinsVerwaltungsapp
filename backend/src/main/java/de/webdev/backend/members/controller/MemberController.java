package de.webdev.backend.members.controller;

import de.webdev.backend.members.models.Member;
import de.webdev.backend.members.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;


    @GetMapping
    public List<Member> getAllMembers() {
        return memberService.getAllMembers();
    }


    @PostMapping
    public Member addMember(@RequestBody Member member) {
        return memberService.addMember(member);
    }

    @GetMapping("{id}")
    public Member getMemberById(@PathVariable String id){
        return memberService.getMemberById(id);
    }

    @PutMapping("{id}")
    public Member updateMember(@RequestBody Member member, @PathVariable String id){
        return memberService.updateMember(member,id);
    }
}