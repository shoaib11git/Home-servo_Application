package com.jsp.HomeServo.dto;

import java.sql.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
@Entity
@Data
public class Work {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String type;
	private Date startDate;
	private Date endDate;
	@OneToOne(cascade = CascadeType.ALL)
	private Address address;
	@ManyToMany(cascade = CascadeType.ALL)
	private List<Vendor> vendors;
	
	@JoinColumn
	@JsonIgnore
	@ManyToOne(cascade = CascadeType.ALL)
	private Customer customer;
	@OneToOne
	private ServiceCost cost;
}
