package com.bezkoder.springjwt.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.Optional;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    @Lob
    @Column(columnDefinition = "longtext")
    private String description;
    private double rate_star;
    private long quantity;
    
    private long revenue;
    private int sold_quantity;
    private long priceMin;
    private long priceMax;
    private String title1;
    private String title2;
    @ManyToOne
    @JoinColumn(name="seller_id")
    @JsonIgnore
    private Seller seller;

    @OneToMany(mappedBy = "product",cascade = CascadeType.ALL,orphanRemoval = true)
    @JsonManagedReference
    private List<TypesOfProduct> typesOfProducts;

    @ManyToOne
    @JsonManagedReference
    @JoinColumn(name="category_id")
    private Category category;


    @OneToMany(mappedBy = "product")
    @JsonIgnore
    private List<Rates> rates;

    @ManyToOne
    @JsonManagedReference
    @JoinColumn(name="supplier_id")
    private Supplier supplier;

    @OneToMany(mappedBy = "product",cascade = CascadeType.ALL,orphanRemoval = true)
    @JsonManagedReference
    private List<Image_Product> imageProducts;

    @OneToMany(mappedBy = "product",cascade = CascadeType.ALL,orphanRemoval = true)
    @JsonManagedReference
    private List<ImageClassifications1> imageClassifications1List;


    public Product(String name, String description,String title1, String title2) {
        this.name = name;
        this.description = description;
        this.title1 = title1;
        this.title2 = title2;
    }



    public Product(long id, String name, String description, double rateStar, long quantity, long revenue, int soldQuantity, long priceMin, long priceMax, String title1, String title2, Category category, Supplier supplier) {
        this.id = id;
        this.name =name;
        this.description = description;
        this.rate_star = rateStar;
        this.quantity = quantity;
        this.revenue = revenue;
        this.sold_quantity = soldQuantity;
        this.priceMin = priceMin;
        this.priceMax = priceMax;
        this.title1 = title1;
        this.title2 = title2;
        this.category = category;
        this.supplier = supplier;

    }

    public Product(String name, String description, long quantity, long priceMin, long priceMax, String title1, String title2, Seller seller, List<TypesOfProduct> typesOfProducts, Category category, Supplier supplier, List<Image_Product> imageProducts, List<ImageClassifications1> imageClassifications1List) {
        this.name = name;
        this.description = description;
        this.quantity = quantity;
        this.priceMin = priceMin;
        this.priceMax = priceMax;
        this.title1 = title1;
        this.title2 = title2;
        this.seller = seller;
        this.typesOfProducts = typesOfProducts;
        this.category = category;
        this.supplier = supplier;
        this.imageProducts = imageProducts;
        this.imageClassifications1List = imageClassifications1List;
    }
}
