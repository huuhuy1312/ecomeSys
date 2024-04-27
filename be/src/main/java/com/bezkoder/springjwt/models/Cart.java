package com.bezkoder.springjwt.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Cart {
    @Id
    private long id;

    @OneToOne
    @JsonIgnore
    @MapsId
    @JoinColumn(name="customer_id")
    private Customer customer;

    @OneToMany(mappedBy = "cart")
    @JsonManagedReference
    private List<ItemInCart> items;

}
