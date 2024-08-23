package com.app.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "available_addresses") 
@NoArgsConstructor
@Getter
@Setter
public class AvailableAddresses {
	
	@Id
	private Integer pincode;
	
	@Column(length = 20)
	private String city;
}
