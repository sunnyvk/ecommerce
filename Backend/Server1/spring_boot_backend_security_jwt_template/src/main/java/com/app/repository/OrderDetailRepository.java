package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojo.Order;
import com.app.pojo.OrderDetail;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long>{
	List<OrderDetail> findAllByOrder(Order order);
}
