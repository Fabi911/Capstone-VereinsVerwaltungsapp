package de.webdev.backend.cashjournal.controller;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;


@SpringBootTest
@AutoConfigureMockMvc
class CashJournalControllerTest {

	@Autowired
	MockMvc mockMvc;

	@Test
	@WithMockUser(roles = "ADMIN")
	@DirtiesContext
	void getAllCashJournals_shouldReturnEmptyList_whenCallInitially() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get("/api/cash-journal"))
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.content().json("[]"));
	}

	@Test
	@WithMockUser(roles = "ADMIN")
	@DirtiesContext
	void saveCashJournal_shouldReturnCashJournal_whenSaveCashJournal() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.post("/api/cash-journal").contentType("application/json").content("""
								{
						    "date": "2023-01-22",
						    "description": "Mitgliedsbeiträge",
						    "amount": 101.50,
						    "category": "Beiträge",
						    "type": "INCOME",
						    "fileUrl": "fileUrl"
						}
						"""))
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.content().json("""
						
								{
						    "date": "2023-01-22",
						    "description": "Mitgliedsbeiträge",
						    "amount": 101.50,
						    "category": "Beiträge",
						    "type": "INCOME",
    						"fileUrl": "fileUrl"
						}
						"""));
	}

	@Test
	@WithMockUser(roles = "ADMIN")
	void getCashJournalById_shouldReturnCashJournal_whenGetCashJournalById() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.post("/api/cash-journal").contentType("application/json").content("""
						{
					"id": "1",
				    "date": "2023-01-22",
				    "description": "Mitgliedsbeiträge",
				    "amount": 101.50,
				    "category": "Beiträge",
				    "type": "INCOME",
				    "fileUrl": "fileUrl"
				}
				"""));
		mockMvc.perform(MockMvcRequestBuilders.get("/api/cash-journal/1"))
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.content().json("""
						{
							"id": "1",
						    "date": "2023-01-22",
						    "description": "Mitgliedsbeiträge",
						    "amount": 101.50,
						    "category": "Beiträge",
						    "type": "INCOME",
    						"fileUrl": "fileUrl"
						}
						"""));
	}

	@Test
	@WithMockUser(roles = "ADMIN")
	@DirtiesContext
	void updateCashJournal_shouldReturnCashJournal_whenUpdateCashJournal() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.post("/api/cash-journal").contentType("application/json").content("""
						{
					"id": "1",
				    "date": "2023-01-22",
				    "description": "Mitgliedsbeiträge",
				    "amount": 101.50,
				    "category": "Beiträge",
				    "type": "INCOME",
				    "fileUrl": "fileUrl"
				}
				"""));
		mockMvc.perform(MockMvcRequestBuilders.put("/api/cash-journal/1").contentType("application/json").content("""
								{
							"id": "1",
						    "date": "2023-01-22",
						    "description": "Mitgliedsbeiträge",
						    "amount": 101.50,
						    "category": "Beiträge",
						    "type": "INCOME",
						    "fileUrl": "fileUrl"
						}
						"""))
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.content().json("""
						{
							"id": "1",
						    "date": "2023-01-22",
						    "description": "Mitgliedsbeiträge",
						    "amount": 101.50,
						    "category": "Beiträge",
						    "type": "INCOME",
    						"fileUrl": "fileUrl"
						}
						"""));
	}

	@Test
	@WithMockUser(roles = "ADMIN")
	@DirtiesContext
	void deleteCashJournal_shouldReturnNothing_whenDeleteCashJournal() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.post("/api/cash-journal").contentType("application/json").content("""
						{
						"id": "1",
				    "date": "2023-01-22",
				    "description": "Mitgliedsbeiträge",
				    "amount": 101.50,
				    "category": "Beiträge",
				    "type": "INCOME",
				    "fileUrl": "fileUrl"
				}
				"""));
		mockMvc.perform(MockMvcRequestBuilders.delete("/api/cash-journal/1"))
				.andExpect(MockMvcResultMatchers.status().isOk());
	}


}