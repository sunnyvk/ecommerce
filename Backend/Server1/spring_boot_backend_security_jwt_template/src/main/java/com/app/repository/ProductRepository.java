package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.pojo.Product;
import com.app.pojo.User;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>{

	List<Product> findAllBySeller(User seller);
}
