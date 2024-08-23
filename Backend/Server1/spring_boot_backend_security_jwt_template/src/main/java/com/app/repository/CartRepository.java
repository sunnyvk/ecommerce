package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.pojo.Cart;
import com.app.pojo.Product;
import com.app.pojo.User;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long>{
	List<Cart> findByUser(User user);
	Cart findByUserAndProduct(User user,Product product);
}
