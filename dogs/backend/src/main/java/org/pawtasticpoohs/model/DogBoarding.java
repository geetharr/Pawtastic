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

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

@Table(name="dog_boarding")
@Entity
@Data
public class DogBoarding {
	
	@Id
	@Column(name="id")
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;
	
//	@ManyToOne(fetch = FetchType.EAGER)
//	@JoinColumn(name="user_id")
//	private User user;
	
	@Column(name="dog_name")
	private String dogName;
	
	@Column(name="breed")
	private String breed;
	@Column(name="email")
	private String email;
	
	@CreationTimestamp
	@Column(name="dog_boarding_date")
	private Timestamp dogBoardingDate;
	
	@CreationTimestamp
	@Column(name="last_modified")
	private Timestamp lastModified;

//	public User getUser() {
//		return user;
//	}
//
//	public void setUser(User user) {
//		this.user = user;
//	}

	public String getDogName() {
		return dogName;
	}

	public void setDogName(String dogName) {
		this.dogName = dogName;
	}

	public String getBreed() {
		return breed;
	}

	public void setBreed(String breed) {
		this.breed = breed;
	}

	public Timestamp getLastModified() {
		return lastModified;
	}

	public void setLastModified(Timestamp lastModified) {
		this.lastModified = lastModified;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Timestamp getDogBoardingDate() {
		return dogBoardingDate;
	}

	public void setDogBoardingDate(Timestamp dogBoardingDate) {
		this.dogBoardingDate = dogBoardingDate;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
}
