package org.pawtasticpoohs.controller;

import org.pawtasticpoohs.model.User;
import org.pawtasticpoohs.payload.NewPasswordRequest;
import org.pawtasticpoohs.payload.PasswordResetLinkResponseModel;
import org.pawtasticpoohs.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/pawtasticpoohs/user")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/add")
	public User addUser(@RequestBody User user) {
		return userService.addUser(user);
	}
	
	@PostMapping("/login")
	public User login(@RequestBody User user) {
		return userService.login(user);
	}

	@PutMapping("/forgotPassword/{email}")
	public User resetPassword(@PathVariable String email, @RequestBody NewPasswordRequest newPasswordRequest){
		return  userService.changepassword(email,newPasswordRequest);
	}
	@PostMapping("/passwordResetLink/{email}")
	public ResponseEntity<PasswordResetLinkResponseModel> sendPasswordResetLink(@PathVariable String email) {
          return new ResponseEntity<>(userService.sendPasswordResetLink(email), HttpStatus.OK);
	}

}
