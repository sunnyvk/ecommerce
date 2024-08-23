package com.app.dto;

import java.util.List;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Range;

import com.app.pojo.ProductStatus;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter
@Setter
@ToString
public class ProductDTO {
	
	private Long id;
	
	@NotBlank(message = "Product name cannot be empty")
	private String name;
	
	@Range(min = 0)
	private double price;
	
	@Range(min = 1)
	private int quantity;
	
	private List<Long> productImageIds;
	
	@NotNull(message="SellerId cannot be blank")
	private Long sellerId; 
	
	@NotNull(message="CategoryId cannot be blank")
	private Long categoryId;
	
	private ProductStatus status;
}
