package com.app.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ProductDescDTO {
	  private Long id;
	  private String desc;
	  private Long productId;
}
