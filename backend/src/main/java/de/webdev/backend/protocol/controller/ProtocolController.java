package de.webdev.backend.protocol.controller;

import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.element.Paragraph;
import de.webdev.backend.protocol.model.Protocol;
import de.webdev.backend.protocol.model.ProtocolRequest;
import de.webdev.backend.protocol.service.ProtocolService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import com.itextpdf.layout.Document;
import org.springframework.http.HttpHeaders;

import java.io.ByteArrayOutputStream;

import java.util.Optional;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ProtocolController {
    private static final Logger log = LoggerFactory.getLogger(ProtocolController.class);
    private final ProtocolService protocolService;


    @PostMapping("/protocols")
    public ResponseEntity<Protocol> saveProtocol(@Validated @RequestBody Protocol protocol) {
        try {
            Protocol savedProtocol = protocolService.saveProtocol(protocol);
            return new ResponseEntity<>(savedProtocol, HttpStatus.CREATED);
        } catch (DataAccessException dae) {
            // log the exception and return an appropriate ResponseEntity
            log.error("Error occurred while saving protocol", dae);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/protocols/{id}")
    public ResponseEntity<Protocol> getProtocolById(@PathVariable String id) {
        Optional<Protocol> protocol = protocolService.getProtocolById(id);
        return protocol.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @DeleteMapping("/protocols/{id}")
    public ResponseEntity<Void> deleteProtocol(@PathVariable String id) {
        protocolService.deleteProtocol(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/exportToPdf")
    public ResponseEntity<byte[]> exportToPdf(@RequestBody ProtocolRequest request) {
        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            PdfWriter writer = new PdfWriter(outputStream);
            PdfDocument pdfDoc = new PdfDocument(writer);
            Document document = new Document(pdfDoc);


            document.add(new Paragraph(request.getContent()));
            document.close();

            byte[] pdfBytes = outputStream.toByteArray();

            // Setze die HTTP-Header für den PDF-Download
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("attachment", "protokoll.pdf");

            return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}