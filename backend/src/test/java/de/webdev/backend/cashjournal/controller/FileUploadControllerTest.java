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

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;


@SpringBootTest
@AutoConfigureMockMvc

class FileUploadControllerTest {

	@Autowired
	MockMvc mockMvc;

	@Test
	@DirtiesContext
	@WithMockUser(roles = "ADMIN")
	void uploadFile_shouldReturnFileUrl_whenUploadFile() throws Exception {
		Path filePath = Paths.get("documents/test.txt");
		Files.createDirectories(filePath.getParent());
		Files.write(filePath, "Test content".getBytes());

		MockMultipartFile file = new MockMultipartFile("file", "test.txt", "text/plain", "Test content".getBytes());
		mockMvc.perform(MockMvcRequestBuilders.multipart("/api/files/upload")
						.file(file)
						.contentType(MediaType.MULTIPART_FORM_DATA))
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.content().string(Matchers.containsString("/api/files/download/test.txt")));

		Files.deleteIfExists(filePath);
	}

	@Test
	@DirtiesContext
	@WithMockUser(roles = "ADMIN")
	void downloadFile_shouldReturnFileContent_whenDownloadFile() throws Exception {
		Path filePath = Paths.get("documents/test.txt");
		Files.createDirectories(filePath.getParent());
		Files.write(filePath, "Test content".getBytes());

		MockMultipartFile file = new MockMultipartFile("file", "test.txt", "text/plain", "Test content".getBytes());
		mockMvc.perform(MockMvcRequestBuilders.multipart("/api/files/upload")
						.file(file)
						.contentType(MediaType.MULTIPART_FORM_DATA))
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.content().string(Matchers.containsString("/api/files/download/test.txt")));

		mockMvc.perform(MockMvcRequestBuilders.get("/api/files/download/test.txt"))
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.content().string("Test content"));

		Files.deleteIfExists(filePath);
	}
}