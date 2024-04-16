package app.service;

import jakarta.mail.Authenticator;
import jakarta.mail.Message;
import jakarta.mail.MessagingException;
import jakarta.mail.PasswordAuthentication;
import jakarta.mail.Session;
import jakarta.mail.Transport;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.Properties;
import java.util.UUID;

@Component
@Service
public class EmailConfirmationService {

    @Value(value = "${spring.mail.username")
    private String emailUsername;

    @Value(value = "${spring.mail.password}")
    private String emailPassword;
    public String generateConfirmationToken() {
        return UUID.randomUUID().toString();
    }

    public void sendConfirmationEmail(String email, String confirmationToken) {
        // Email properties
        String host = System.getenv("spring.mail.host");
        int port = Integer.parseInt(System.getenv("spring.mail.port"));
        String fromEmail = emailUsername;


        // Email content
        String subject = "Email Confirmation Required ";
        String confirmationLink = "https://localhost:8080/confirm-email?token=" + confirmationToken;
        String body = "Click the following link to confirm your email: " + confirmationLink;

        // Set up JavaMail properties
        Properties properties = new Properties();
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.starttls.enable", "true");
        properties.put("mail.smtp.host", host);
        properties.put("mail.smtp.port", port);
        // Create a session with authentication
        Session session = Session.getInstance(properties, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(emailUsername, emailPassword);
            }
        });

        try {
            // Create a MimeMessage object
            MimeMessage message = new MimeMessage(session);

            // Set From: header field of the header.
            message.setFrom(new InternetAddress(fromEmail));

            // Set To: header field of the header.
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(email));

            // Set Subject: header field
            message.setSubject(subject);

            // Set the actual message
            message.setText(body);

            // Send message
            Transport.send(message);
            System.out.println("Confirmation email sent successfully.");
        } catch (MessagingException mex) {
            mex.printStackTrace();
        }
    }
}