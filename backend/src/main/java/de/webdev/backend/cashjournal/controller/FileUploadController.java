package de.webdev.backend.cashjournal.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/files")
public class FileUploadController {

	@Value("${file.upload-dir}")
	private  String uploadDir2;

	@PostMapping("/upload")
	public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) throws IOException {
		File uploadDir = new File(uploadDir2);
		if (!uploadDir.exists()) {
			uploadDir.mkdirs();
		}
		String fileName = file.getOriginalFilename();
			Path filePath = Paths.get(uploadDir2, fileName);
			file.transferTo(filePath.toFile());
			String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
					.path("/api/files/download/")
					.path(fileName)
					.toUriString();

			return ResponseEntity.ok( fileDownloadUri);
	}

	@GetMapping("/download/{fileName:.+}")
	public ResponseEntity<byte[]> downloadFile(@PathVariable String fileName) throws IOException {
			Path filePath = Paths.get(uploadDir2, fileName);
			byte[] fileContent = Files.readAllBytes(filePath);
			return ResponseEntity.ok()
					.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
					.body(fileContent);

	}
}