package com.app.dto;

import javax.persistence.Column;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class ReviewDTO {
	
	@JsonProperty(access = Access.READ_ONLY)
	private Long id;
	
	private Long customerId;
	
	private Long productId;
	
	private String review;
	
	private int rating;
}
