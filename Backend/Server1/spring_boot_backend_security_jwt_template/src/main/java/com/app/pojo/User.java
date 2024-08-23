package com.app.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users") 
@NoArgsConstructor
@Getter
@Setter
public class User extends BaseEntity{

	@Column(name = "first_name", length = 30)
	private String firstName;
	
	@Column(name = "last_name", length = 30)
	private String lastName;
	
	@Column(length = 30, unique = true) // =>unique
	private String email;
	
	@Column(nullable = false) // =>NOT NULL
	private String password;
	
	@Enumerated(EnumType.STRING)
	@Column(length = 10)
	private Role role;
	
	@Column(length = 10)
	private String mobile;
	
	@Enumerated(EnumType.STRING)
	@Column(length = 10)
	private UserStatus status;
}
