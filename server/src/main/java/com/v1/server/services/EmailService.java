package com.v1.server.services;

import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import com.v1.server.enumerate.EmailTemplateName;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailService {
    
    private final JavaMailSender mailSender;
    private final SpringTemplateEngine templateEngine;

    @Value("${email.sender:mail}")
    private String mail;

    public void sendEmail(
        String to,
        String username,
        String name,
        EmailTemplateName emailTemplate,
        String confirmationUrl,
        String activactionCode,
        String subject
    ) throws MessagingException{
        String templateName;
        if (emailTemplate == null) {
            templateName = "confirm-email";
        }else{
            templateName = emailTemplate.name();
        }

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(
                    message,
                    MimeMessageHelper.MULTIPART_MODE_MIXED,
                    StandardCharsets.UTF_8.name()
        );
        Map<String, Object> properties = new HashMap<>();
        properties.put("username", username);
        properties.put("name", name);
        properties.put("confirmationUrl", confirmationUrl);
        properties.put("activation_code", activactionCode);

        Context context =  new Context();
        context.setVariables(properties);

        helper.setFrom(mail);
        helper.setTo(to);
        helper.setSubject(subject);

        String template = templateEngine.process(templateName, context);

        helper.setText(template, true);

        mailSender.send(message);
    }
}
