package com.app.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.customException.ResourceNotFoundException;
import com.app.dto.ApiResponse;
import com.app.pojo.Cart;
import com.app.pojo.Order;
import com.app.pojo.OrderDetail;
import com.app.pojo.Product;
import com.app.pojo.User;
import com.app.repository.CartRepository;
import com.app.repository.OrderDetailRepository;
import com.app.repository.OrderRepository;
import com.app.repository.ProductRepository;
import com.app.repository.UserRepository;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {
	
	@Autowired
	CartRepository cartRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	OrderRepository orderRepository;
	
	@Autowired 
	ProductRepository productRepository;
	
	@Autowired
	OrderDetailRepository orderDetailRepository;


	@Override
	public ApiResponse confirmPayment(Long id) {
		
		User user = userRepository.findById(id).orElseThrow();
		
		List<Cart> carts = cartRepository.findByUser(user);
		List<Product> products = new ArrayList<>();
		List<Integer> quantities = new ArrayList<>();
		
		int total = 0;
		for(Cart cart : carts) {
			total += cart.getProduct().getPrice() * cart.getQuantity();
			Product product = productRepository.findById(cart.getProduct().getId()).orElseThrow();
			product.setQuantity(product.getQuantity() - cart.getQuantity());
			products.add(product);
			quantities.add(cart.getQuantity());
		}
		
		Order order = new Order();
		
		order.setCustomer(user);
		order.setTotal(total);
		order.setOrderDate(LocalDate.now());
		
		Order savedOrder = orderRepository.save(order);
		System.out.println("sed ->" + savedOrder.getId());
		
		for(int i=0; i<carts.size(); i++) {
			OrderDetail orderDetail = new OrderDetail();
			orderDetail.setOrder(savedOrder);
			orderDetail.setProduct(products.get(i));
			orderDetail.setQuantity(quantities.get(i));
			orderDetailRepository.save(orderDetail);
		}
		
		cartRepository.deleteAll(carts);
		
		return new ApiResponse("Order placed successfully");
	}


	@Override
	public List<Order> getOrders(Long userId) {
		User customer = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("Invalid userId"));
		return orderRepository.findAllByCustomer(customer);
	}


	@Override
	public List<OrderDetail> getAllOrderDetails(Long orderId) {
		Order order = orderRepository.findById(orderId).orElseThrow(() -> new ResourceNotFoundException("Invalid orderId"));
		return orderDetailRepository.findAllByOrder(order);
	}


	@Override
	public List<Order> getOrders() {
		// TODO Auto-generated method stub
		return orderRepository.findAll();
	}
}
