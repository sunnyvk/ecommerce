package com.app.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "reviews") 
@NoArgsConstructor
@Getter
@Setter
public class Review extends BaseEntity{

	@ManyToOne
	@JoinColumn(name = "customer_id")
	private User customer;
	
	@ManyToOne
	@JoinColumn(name = "product_id")
	private Product product;
	
	@Column(length = 150)
	private String review;
	
	@Column
	private int rating;
}
