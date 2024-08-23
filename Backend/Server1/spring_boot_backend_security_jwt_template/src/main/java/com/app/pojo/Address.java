package com.app.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="address")
@NoArgsConstructor
@Getter
@Setter
public class Address extends BaseEntity{
	
	@Column(length = 100)
	private String address;
	
	@ManyToOne
	@JoinColumn(name = "pincode")
	private AvailableAddresses availableaddresses;
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
}

