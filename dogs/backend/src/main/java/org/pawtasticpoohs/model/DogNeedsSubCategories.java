package org.pawtasticpoohs.model;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

@Table(name="dog_needs_sub_categories")
@Entity
public class DogNeedsSubCategories {
	
	@Id
	@Column(name="id")
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="category_id")
	private DogNeedsCategories dogNeedsCategories;
	
	@Column(name="sub_category_name")
	private String subCategoryName;
	
	@Column(name="price")
	private Double price;
	
	@CreationTimestamp
	@Column(name="last_modified")
	private Timestamp lastModified;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public DogNeedsCategories getDogNeedsCategories() {
		return dogNeedsCategories;
	}

	public void setDogNeedsCategoryId(DogNeedsCategories dogNeedsCategories) {
		this.dogNeedsCategories = dogNeedsCategories;
	}

	public String getSubCategoryName() {
		return subCategoryName;
	}

	public void setSubCategoryName(String subCategoryName) {
		this.subCategoryName = subCategoryName;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public Timestamp getLastModified() {
		return lastModified;
	}

	public void setLastModified(Timestamp lastModified) {
		this.lastModified = lastModified;
	}
	
}
