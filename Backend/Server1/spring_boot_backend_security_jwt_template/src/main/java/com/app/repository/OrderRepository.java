package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojo.Order;
import com.app.pojo.User;

public interface OrderRepository extends JpaRepository<Order, Long> {
	List<Order> findAllByCustomer(User customer);
}
