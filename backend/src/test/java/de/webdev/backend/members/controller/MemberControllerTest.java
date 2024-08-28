package de.webdev.backend.members.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;


@AutoConfigureMockMvc
@SpringBootTest
class MemberControllerTest {

    @Autowired
    private MockMvc mockMvc;


    @DirtiesContext
    @Test
    void getMembers_shouldReturnEmptyList_whenCallInitially() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/members"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("[]"));
    }

    @DirtiesContext
    @Test
    void addMember_shouldReturnMember_whenAddMember() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/members")
                .contentType("application/json")
                .content("""
 {
         "memberId": "2024-002",
         "lastName": "Muster",
         "name": "Fabian",
         "birthday": "1988-02-16",
         "address": {
             "street": "Musterstraße 4",
             "zip": "12345",
             "city": "Musterstadt"
         },
            "email": "test@tester.com",
            "phoneNumber": "123456789"
  }
"""
                ))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""

                        {
        "memberId": "2024-002",
        "lastName": "Muster",
        "name": "Fabian",
        "birthday": "1988-02-16",
        "address": {
            "street": "Musterstraße 4",
            "zip": "12345",
            "city": "Musterstadt"
        },
            "email": "test@tester.com",
            "phoneNumber": "123456789"
        }
        """));
 }

}