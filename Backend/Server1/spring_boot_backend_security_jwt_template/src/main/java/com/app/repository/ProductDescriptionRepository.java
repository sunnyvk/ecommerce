package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojo.Product;
import com.app.pojo.ProductDescription;

public interface ProductDescriptionRepository extends JpaRepository<ProductDescription, Long> {
	ProductDescription findByProduct(Product product);
}
