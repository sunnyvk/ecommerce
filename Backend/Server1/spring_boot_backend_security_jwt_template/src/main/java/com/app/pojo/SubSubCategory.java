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
@Table(name="sub_sub_categories")
@NoArgsConstructor
@Getter
@Setter
public class SubSubCategory extends BaseEntity{

  @Column(name="name",length = 20)
  private String subSubCatName;
  
  @ManyToOne
  @JoinColumn(name = "sub_category_id")
  private SubCategory subCategory;

}