package org.pawtasticpoohs.service;



import javax.mail.internet.MimeMessage;
import org.pawtasticpoohs.model.User;
import org.pawtasticpoohs.payload.NewPasswordRequest;
import org.pawtasticpoohs.payload.PasswordResetLinkResponseModel;
import org.pawtasticpoohs.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;


import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private SpringTemplateEngine templateEngine;
	@Autowired
	private JavaMailSenderImpl mailSender;
	@Value("${spring.mail.username}")
	private String sender;
	
	public User addUser(User user) {
		return userRepository.saveAndFlush(user);
	}

	@Override
	public User login(User user) {
		System.out.println("User email : "+user.getEmail());
		User loggedInUser = userRepository.findByEmail(user.getEmail());
		System.out.println("Logged In User :"+loggedInUser.getId());
		if (loggedInUser != null && user.getUserPassword().equals(loggedInUser.getUserPassword()))
			return loggedInUser;
		else
			return null;
	}

	@Override
	public User changepassword(String email,NewPasswordRequest newPasswordRequest) {
		User user = userRepository.findByEmail(email);
		System.out.println("User before Update: " + user.getUserPassword());
		user.setUserPassword(newPasswordRequest.getUserPassword());
		System.out.println("User After Update: " + user.getUserPassword());
        return userRepository.save(user);
	}


	@Override
	public PasswordResetLinkResponseModel sendPasswordResetLink(String email) {
		User user = userRepository.findByEmail(email);

		try {
			MimeMessage message = mailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(message);

			helper.setFrom(sender, "pawtasticd");
			helper.setTo(user.getEmail());

			Context context = new Context();
			context.setVariable("receiverName", user.getFirstName() + " " + user.getLastName());
			context.setVariable("resetLink", "http://localhost:3000/resetPassword?email=" + user.getEmail());
			context.setVariable("user", user); // Add user details for the confirmation email

			String content = this.templateEngine.process("password_reset", context);
			helper.setText(content, true);
			helper.setSubject("Password reset link");

			helper.setText(content, true);
			mailSender.send(message);
		} catch (Exception e) {
			e.printStackTrace();
			// Handle exception or log the error
			return new PasswordResetLinkResponseModel(false);
		}

		return new PasswordResetLinkResponseModel(true);
	}

}
