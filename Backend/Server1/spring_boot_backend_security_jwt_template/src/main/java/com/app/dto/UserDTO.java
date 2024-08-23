package com.app.dto;

import java.time.LocalDateTime;

import javax.persistence.Column;

import com.app.pojo.UserStatus;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class UserDTO {
	
	private Long id;
	
	private String firstName;
	
	private String lastName;
	
	private String email;
	
	private String mobile;
	
	private String status;
	
	private String role;
}
