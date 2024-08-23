package com.app.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name="product_desc")
public class ProductDescription extends BaseEntity {

  @Column(name="description")
  private String desc;
  
  @OneToOne
  @JoinColumn(name="product_id")
  @MapsId
  private Product product; 
  
}