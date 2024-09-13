package de.webdev.backend.cashjournal.controller;

import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;


@SpringBootTest
@AutoConfigureMockMvc

class FileUploadControllerTest {

	@Autowired
	MockMvc mockMvc;

	@Test
	@DirtiesContext
	@WithMockUser(roles = "ADMIN")
	void uploadFile_shouldReturnFileUrl_whenUploadFile() throws Exception {
		MockMultipartFile file = new MockMultipartFile("file", "test.txt", "text/plain", "Test content".getBytes());
		mockMvc.perform(MockMvcRequestBuilders.multipart("/api/files/upload")
						.file(file)
						.contentType(MediaType.MULTIPART_FORM_DATA))
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.content().string(Matchers.containsString("/api/files/download/test.txt")));
	}

	@Test
	@DirtiesContext
	@WithMockUser(roles = "ADMIN")
	void uploadFile_shouldReturnError_whenNoFileProvided() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.multipart("/api/files/upload"))
				.andExpect(MockMvcResultMatchers.status().isBadRequest());
	}

	@Test
	@DirtiesContext
	@WithMockUser(roles = "ADMIN")

	void downloadFile_shouldReturnFileContent_whenDownloadFile() throws Exception {
		MockMultipartFile file = new MockMultipartFile("file", "test.txt", "text/plain", "Test content".getBytes());
		mockMvc.perform(MockMvcRequestBuilders.multipart("/api/files/upload")
						.file(file)
						.contentType(MediaType.MULTIPART_FORM_DATA))
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.content().string(Matchers.containsString("/api/files/download/test.txt")));
		mockMvc.perform(MockMvcRequestBuilders.get("/api/files/download/test.txt"))
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.content().string("Test content"));
	}

}