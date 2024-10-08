package de.webdev.backend.members.controller;

import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;


@Nested
@AutoConfigureMockMvc
@SpringBootTest
class MemberControllerTest {

	@Autowired
	private MockMvc mockMvc;


	@DirtiesContext
	@Test
	@WithMockUser(roles = "ADMIN")
	void getMembers_shouldReturnEmptyList_whenCallInitially() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get("/api/members")).andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.content().json("[]"));
	}

	@DirtiesContext
	@Test
	@WithMockUser(roles = "ADMIN")
	void addMember_shouldReturnMember_whenAddMember() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.post("/api/members").contentType("application/json").content("""
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
				""")).andExpect(MockMvcResultMatchers.status().isOk()).andExpect(MockMvcResultMatchers.content().json("""
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

	@DirtiesContext
	@Test
	@WithMockUser(roles = "ADMIN")
	void getMemberById_shouldReturnMember_whenGetMemberById() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.post("/api/members").contentType("application/json").content("""
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
		mockMvc.perform(MockMvcRequestBuilders.get("/api/members/2024-002").contentType("application/json")).andExpect(MockMvcResultMatchers.status().isOk()).andExpect(MockMvcResultMatchers.content().json("""
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

	@DirtiesContext
	@Test
	@WithMockUser(roles = "ADMIN")
	void updateMember_shouldReturnUpdatedMember_whenUpdateMember() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.post("/api/members").contentType("application/json").content("""
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
		mockMvc.perform(MockMvcRequestBuilders.put("/api/members/2024-002").contentType("application/json").content("""
				{
				        "memberId": "2024-002",
				        "lastName": "Mustermann",
				        "name": "Erika",
				        "birthday": "1985-03-12",
				        "address": {
				            "street": "Musterstraße 5",
				            "zip": "12346",
				            "city": "Musterstadt"
				        },
				        "email": "test2@tester.com",
				        "phoneNumber": "987654321"
				     }
				""")).andExpect(MockMvcResultMatchers.status().isOk()).andExpect(MockMvcResultMatchers.content().json("""
				    {
				        "memberId": "2024-002",
				        "lastName": "Mustermann",
				        "name": "Erika",
				        "birthday": "1985-03-12",
				        "address": {
				            "street": "Musterstraße 5",
				            "zip": "12346",
				            "city": "Musterstadt"
				        },
				        "email": "test2@tester.com",
				        "phoneNumber": "987654321"
				    }
				"""));
	}

	@DirtiesContext
	@Test
	@WithMockUser(roles = "ADMIN")
	void deleteMember_shouldReturnHttpNoContent_whenDeleteExistingMember() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.post("/api/members").contentType("application/json").content("""
				{
				        "memberId": "2024-003",
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
		mockMvc.perform(MockMvcRequestBuilders.delete("/api/members/2024-003").contentType("application/json")).andExpect(MockMvcResultMatchers.status().isOk());
	}
}