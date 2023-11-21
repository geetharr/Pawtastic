package org.pawtasticpoohs.service;

import org.pawtasticpoohs.model.User;
import org.pawtasticpoohs.payload.NewPasswordRequest;
import org.pawtasticpoohs.payload.PasswordResetLinkResponseModel;

public interface UserService {
	public User addUser(User user);
	public User login(User user);

    User changepassword(String email,NewPasswordRequest newPasswordRequest);

	PasswordResetLinkResponseModel sendPasswordResetLink(String email);
}
