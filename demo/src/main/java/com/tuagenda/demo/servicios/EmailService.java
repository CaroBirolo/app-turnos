package com.tuagenda.demo.servicios;

import com.tuagenda.demo.repositorios.UsuarioRepository;
import jakarta.validation.constraints.Email;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public void enviarCorreo(String email, String asunto, String mensaje) {
        // Validar que el correo exista en la base de datos
        usuarioRepository.findByEmail(email).orElseThrow(() ->
                new RuntimeException("El usuario con el correo " + email + " no existe"));

        // Configurar y enviar el correo
        SimpleMailMessage emailMessage = new SimpleMailMessage();
        emailMessage.setTo(email);
        emailMessage.setSubject(asunto);
        emailMessage.setText(mensaje);
        emailMessage.setFrom("carobirolo@gmail.com");

        mailSender.send(emailMessage);
        System.out.println("Correo enviado con éxito a " + email);
    }
}
