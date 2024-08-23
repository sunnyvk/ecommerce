package com.app.pojo;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "product_images") 
@NoArgsConstructor
@Getter
@Setter
public class ProductImage extends BaseEntity{
	
	@ManyToOne
	@JoinColumn(name = "product_id")
	private Product product;
	
	@Lob
	private byte[] image;
}
