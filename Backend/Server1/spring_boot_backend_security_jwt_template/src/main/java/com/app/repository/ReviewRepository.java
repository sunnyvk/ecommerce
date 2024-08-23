package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojo.Product;
import com.app.pojo.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {
	List<Review> findAllByProduct(Product product);
}
