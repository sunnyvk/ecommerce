package com.app.controllers;

import java.util.List;

import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ApiResponse;
import com.app.dto.LoginDTO;
import com.app.dto.UserDTO;
import com.app.pojo.User;
import com.app.service.OrderService;
import com.app.service.ProductService;
import com.app.service.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class CustomerController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	OrderService orderService;
	
	@Autowired
	ProductService productService;
	
	
	@PostMapping("/register")
	public ResponseEntity<?> addNewCustomer(@RequestBody User user) {
		ApiResponse res = userService.addNewUser(user);
		return ResponseEntity.status(HttpStatus.CREATED).body(res);
	}
	
	@GetMapping
	public List<UserDTO> getAllCustomers() {
		return userService.getAllUsers();
	}
	
	@GetMapping("/{id}")
	public UserDTO findUserById(@RequestParam Long id) {
		return userService.findUserById(id);
	}
	
	@GetMapping("/userToUpdate/{id}")
	public UserDTO findUserToUpdate(@RequestParam Long id) {
		return userService.findUserById(id);
	}
	
	@PutMapping
	public ResponseEntity<?> updateUser(@RequestBody User user) {
		return ResponseEntity.status(HttpStatus.OK).body(userService.updateUser(user));
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@RequestBody @Valid LoginDTO credentials) {
		return ResponseEntity.status(HttpStatus.OK).body(userService.loginUser(credentials));
	}
	
	@GetMapping("/checkout/{id}")
	public ResponseEntity<?> checkout(@PathVariable Long id) {
		return ResponseEntity.status(HttpStatus.OK).body(orderService.confirmPayment(id));
	}
	
	@GetMapping("/cart/{id}")
	public ResponseEntity<?> showCart(@PathVariable Long id) {
		return ResponseEntity.status(HttpStatus.OK).body(userService.getCart(id));
	}
	
	@GetMapping("/getCategories")
	public ResponseEntity<?> getCategories() {
		return ResponseEntity.status(HttpStatus.OK).body(productService.getCategories());
	}
	
	@GetMapping("/orders/{userId}")
	public ResponseEntity<?> getAllOrders(@PathVariable Long userId) {
		return ResponseEntity.status(HttpStatus.OK).body(orderService.getOrders(userId));
	}
	
	@GetMapping("/orders")
	public ResponseEntity<?> getAllOrders() {
		return ResponseEntity.status(HttpStatus.OK).body(orderService.getOrders());
	}
	
	@GetMapping("/orderDetails/{orderId}")
	public ResponseEntity<?> getOrderDetails(@PathVariable Long orderId) {
		System.out.println("in orderDetails");
		return ResponseEntity.status(HttpStatus.OK).body(orderService.getAllOrderDetails(orderId));
	}
}
