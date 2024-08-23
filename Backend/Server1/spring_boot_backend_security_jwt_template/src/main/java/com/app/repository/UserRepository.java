package com.app.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.dto.LoginDTO;
import com.app.pojo.Role;
import com.app.pojo.User;
import com.app.pojo.UserStatus;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
	List<User> findByRoleAndStatus(Role role, UserStatus status);
	Optional<User> findByEmailAndPassword(String email, String password);
	Optional<User> findByEmail(String email);
}
