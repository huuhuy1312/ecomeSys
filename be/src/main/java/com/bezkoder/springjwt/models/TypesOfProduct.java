package com.bezkoder.springjwt.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class TypesOfProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Nullable
    private String label1;
    @Nullable
    private String label2;
    private int quantity;

    private long price;
    private long cost;

    @ManyToOne
    @JoinColumn(name="product_id")
    @JsonBackReference
    private Product product;
    @OneToOne(mappedBy = "typesOfProduct")
    @JsonBackReference
    private ItemInCart itemInCart;
    public TypesOfProduct(String label1, String label2, int quantity, long price, long cost, Product product) {
        this.label1 = label1;
        this.label2 = label2;
        this.quantity = quantity;
        this.price = price;
        this.cost = cost;
        this.product = product;
    }
}
