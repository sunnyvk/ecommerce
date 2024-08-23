package com.app.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.UserDTO;
import com.app.pojo.Role;
import com.app.pojo.UserStatus;
import com.app.service.UserService;

@RestController
@RequestMapping("/seller")
public class SellerController {

	@Autowired
	private UserService userService;
	
	@GetMapping("/allActiveSellers")
	public List<UserDTO> getAllApprovedSellers() {
		return userService.getAllSellers(Role.SELLER, UserStatus.APPROVED);
	}
	
	@GetMapping("/allPendingSellers")
	public List<UserDTO> getAllPendingSellers() {
		return userService.getAllSellers(Role.SELLER, UserStatus.PENDING);
	}
}
