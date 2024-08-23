package com.app;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	
	}

	@Bean 
	public ModelMapper mapper() {
		ModelMapper modelMapper = new ModelMapper();
		modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
		return modelMapper;
	}
	
//	@Bean
//	  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//	      http.authorizeRequests(authorizeRequests -> authorizeRequests.anyRequest()
//	        .permitAll())
//	        .csrf(AbstractHttpConfigurer::disable);
//	      return http.build();
//	  }
	
	@Bean
	  public WebMvcConfigurer corsConfigurer() {
	      return new WebMvcConfigurer() {
	          @Override
	          public void addCorsMappings(CorsRegistry registry) {
	              registry.addMapping("/**").allowedOrigins("http://localhost:3000");
	          }
	      };
	  }

}
