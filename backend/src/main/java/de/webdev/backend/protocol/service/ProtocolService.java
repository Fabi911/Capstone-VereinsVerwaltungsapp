package de.webdev.backend.protocol.service;

import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.element.Paragraph;
import de.webdev.backend.protocol.model.Protocol;
import de.webdev.backend.protocol.repository.ProtocolRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.itextpdf.layout.Document;
import java.io.ByteArrayOutputStream;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProtocolService {

    private final ProtocolRepository protocolRepository;



        public Protocol saveProtocol(Protocol protocol) {
            return protocolRepository.save(protocol);
        }

        public Optional<Protocol> getProtocolById(String id) {
            return protocolRepository.findById(id);
        }

        public void deleteProtocol(String id) {
            protocolRepository.deleteById(id);
        }
}