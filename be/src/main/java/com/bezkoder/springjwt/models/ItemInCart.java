package com.bezkoder.springjwt.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class ItemInCart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne
    @JoinColumn(name="top_id")
    @JsonManagedReference
    private TypesOfProduct typesOfProduct;


    @ManyToOne
    @JoinColumn(name="cart_id")
    @JsonBackReference
    private Cart cart;

    private int quantity;

    public ItemInCart(TypesOfProduct typesOfProduct, Cart cart, int quantity) {
        this.typesOfProduct = typesOfProduct;
        this.cart = cart;
        this.quantity = quantity;
    }


}
