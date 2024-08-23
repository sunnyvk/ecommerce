package com.app.service;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.customException.ResourceNotFoundException;
import com.app.dto.ApiResponse;
import com.app.dto.LoginDTO;
import com.app.dto.UserDTO;
import com.app.pojo.Cart;
import com.app.pojo.Role;
import com.app.pojo.User;
import com.app.pojo.UserStatus;
import com.app.repository.CartRepository;
import com.app.repository.UserRepository;

@Service
@Transactional
public class UserServiceImpl implements UserService{
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private ModelMapper mapper;
	
	@Autowired
	private CartRepository cartRepository;
	
	@Autowired
	private PasswordEncoder encoder;

	@Override
	public ApiResponse addNewUser(User user) {
		user.setPassword(encoder.encode(user.getPassword()));
		userRepository.save(user);
		ApiResponse res = new ApiResponse("User added successfully!");
		
		if(user.getRole() == Role.SELLER) {
			res.setMessage("Registration Successfull, pending for Admin approval");
			user.setStatus(UserStatus.PENDING);
		}
		else if(user.getRole() == Role.CUSTOMER)  res.setMessage("Registration Successfull");
		return res;
	}

	@Override
	public List<UserDTO> getAllUsers() {
		List<User> users = userRepository.findAll();
		return users.stream()
				.map(user -> mapper.map(user, UserDTO.class))
				.collect(Collectors.toList());
	}

	@Override
	public List<UserDTO> getAllSellers(Role role, UserStatus status) {
		List<User> sellers = userRepository.findByRoleAndStatus(role, status);
		return sellers.stream()
				.map(seller -> mapper.map(seller, UserDTO.class))
				.collect(Collectors.toList());
	}

//	@Override
//	public User findUserById(Long id) {
//		// TODO add custom exception
//		return userRepository.findById(id).orElseThrow();
//	}

	@Override
	public ApiResponse updateUser(User user) {
		userRepository.save(user);
		return new ApiResponse("User updated successfully!");
	}

	@Override
	public User loginUser(LoginDTO credentials) {
		return userRepository.findByEmailAndPassword(credentials.getEmail(), credentials.getPassword()).orElseThrow(() -> 	new ResourceNotFoundException("Invalid Email or Password"));
	}

	@Override
	public List<Cart> getCart(Long userId) {
		User user = userRepository.findById(userId).orElseThrow();
		return cartRepository.findByUser(user);
		
	}
	
	@Override
	public User authenitcateUser(String email) {
		
		return userRepository.findByEmail(email)
				.orElseThrow(()-> new RuntimeException("Invalid Email"));
	}


	@Override
	public UserDTO findUserById(Long userId) {
		User user = userRepository.findById(userId)
				.orElseThrow(()-> new RuntimeException("Invalid User Id"));
		
		UserDTO userDTO = mapper.map(user, UserDTO.class);
		return userDTO;
	}
	
	@Override
	public Long findUserId(String userName) {
		User user = userRepository.findByEmail(userName)
				.orElseThrow(()-> new RuntimeException("Invalid Email"));
		
		return user.getId();
	}
	
	
}
