package com.bezkoder.springjwt.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Entity(name = "orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private long totalPrice;
    private String status;
    private Date dateCreate;


    @ManyToOne
    @JsonManagedReference
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @ManyToOne
    @JsonManagedReference
    @JoinColumn(name = "shipment_id")
    private Shipment shipment;

    public Order(String status, Date dateCreate, Customer customer, Shipment shipment) {

        this.status = status;
        this.dateCreate = dateCreate;
        this.customer = customer;
        this.shipment = shipment;
    }
}
