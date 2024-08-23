package com.app.dto;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class CartDto {
	
	private Long userId;
	
	private Long productId;
	
	private int quantity;
}
