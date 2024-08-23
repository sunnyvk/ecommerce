package com.app.service;

import java.util.List;

import com.app.dto.ApiResponse;
import com.app.dto.LoginDTO;
import com.app.dto.UserDTO;
import com.app.pojo.Cart;
import com.app.pojo.Role;
import com.app.pojo.User;
import com.app.pojo.UserStatus;

public interface UserService {
	ApiResponse addNewUser(User user);
	List<UserDTO> getAllUsers();
	List<UserDTO> getAllSellers(Role role, UserStatus status);
	UserDTO findUserById(Long id);
	ApiResponse updateUser(User user);
	User loginUser(LoginDTO credentials);
	List<Cart> getCart(Long userId);
	User authenitcateUser(String email);
	Long findUserId(String userName);
}
