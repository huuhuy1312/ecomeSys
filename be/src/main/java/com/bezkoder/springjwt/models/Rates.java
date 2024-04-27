package com.bezkoder.springjwt.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Rates {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private int rateStar;
    private String rateReview;


    @ManyToOne
    @JoinColumn(name = "product_id")
    @JsonIgnore
    private Product product;

    @ManyToOne
    @JoinColumn(name="customer_id")
    @JsonManagedReference
    private Customer customer;
    public Rates(int rateStar, String rateReview, Product product,Customer customer) {
        this.rateStar = rateStar;
        this.rateReview = rateReview;
        this.product = product;
        this.customer = customer;
    }
}
